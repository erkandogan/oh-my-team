#!/usr/bin/env bun
/**
 * Oh My Team — Router
 *
 * Central message broker between channel adapters and project bridges.
 * Platform-agnostic: works with any adapter implementing ChannelAdapter.
 *
 * Responsibilities:
 *   - Session registry (which sessions exist, their bridge ports, thread IDs)
 *   - Route inbound messages from adapter → correct bridge
 *   - Route outbound replies from bridge → adapter
 *   - Route permission prompts/responses between bridges and adapter
 *
 * Env vars:
 *   ROUTER_PORT   - HTTP port (default: 8800)
 *   OMT_HUB_DIR   - Config directory (default: ~/.oh-my-team)
 */

import type {
  ChannelAdapter,
  InboundMessage,
} from "./adapters/types";
import { removeAttachmentDir } from "./adapters/media";
import {
  handleDashboardRequest,
  broadcastEvent,
  dashboardWebSocketHandlers,
} from "./dashboard-server";
import path from "node:path";

// ── Configuration ──────────────────────────────────────────────────────────

const ROUTER_PORT = Number(process.env.ROUTER_PORT) || 8800;
// Resolve the hub directory defensively: when HOME is unset the naive
// template would stringify to "undefined/.oh-my-team" and silently write
// the registry to a bogus path. bridge.ts and media.ts use the same
// `HOME || "."` fallback.
const OMT_HUB_DIR =
  process.env.OMT_HUB_DIR ||
  path.join(process.env.HOME || ".", ".oh-my-team");
const REGISTRY_PATH = `${OMT_HUB_DIR}/hub-registry.json`;
const CONFIG_PATH = `${OMT_HUB_DIR}/hub-config.json`;

// ── Types ──────────────────────────────────────────────────────────────────

interface SessionEntry {
  name: string;
  path: string;
  bridgePort: number;
  threadId: string;
  threadDisplayName: string;
  startedAt: string;
}

interface Registry {
  sessions: Record<string, SessionEntry>;
}

interface HubConfig {
  platform: string;
  hubThreadId?: string;
  credentials: Record<string, string>;
}

// ── Registry persistence ───────────────────────────────────────────────────

const { readFileSync, writeFileSync, mkdirSync, existsSync } = await import("fs");

function loadRegistry(): Registry {
  try {
    const raw = readFileSync(REGISTRY_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { sessions: {} };
  }
}

function saveRegistry(registry: Registry): void {
  if (!existsSync(OMT_HUB_DIR)) {
    mkdirSync(OMT_HUB_DIR, { recursive: true });
  }
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
}

function loadConfig(): HubConfig {
  try {
    const raw = readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    process.stderr.write(
      `omt-router: Config not found at ${CONFIG_PATH}. Run: omt hub init\n`
    );
    process.exit(1);
  }
}

// ── Adapter loading ────────────────────────────────────────────────────────

async function loadAdapter(platform: string): Promise<ChannelAdapter> {
  switch (platform) {
    case "telegram": {
      const { TelegramAdapter } = await import("./adapters/telegram");
      return new TelegramAdapter();
    }
    case "slack": {
      const { SlackAdapter } = await import("./adapters/slack");
      return new SlackAdapter();
    }
    // Future adapters:
    // case "discord": {
    //   const { DiscordAdapter } = await import("./adapters/discord");
    //   return new DiscordAdapter();
    // }
    default:
      process.stderr.write(
        `omt-router: Unknown platform "${platform}". Supported: telegram, slack\n`
      );
      process.exit(1);
  }
}

// ── Status tracking per session ────────────────────────────────────────────

/** Minimum interval between Telegram/Slack API calls for status edits.
 *  Hooks fire on every PreToolUse + PostToolUse — 10 bash calls produce
 *  ~20 POSTs within seconds. Without debouncing we'd hit Telegram's
 *  20 msg/min group limit almost instantly. */
const STATUS_DEBOUNCE_MS = 1000;

interface SessionStatus {
  messageId: string | null;       // platform message ID for the editable status msg
  current: string | null;         // current action in progress (from PreToolUse)
  done: string[];                 // completed actions (from PostToolUse)
  startedAt: number;              // timestamp for elapsed time display
  typingInterval: ReturnType<typeof setInterval> | null;
  /** Timer ID for the next debounced flush. null means no pending flush. */
  flushTimer: ReturnType<typeof setTimeout> | null;
  /** Set to true when a flush is needed (data changed since last send). */
  dirty: boolean;
}

const sessionStatus = new Map<string, SessionStatus>();

function getOrCreateStatus(name: string): SessionStatus {
  let status = sessionStatus.get(name);
  if (!status) {
    status = {
      messageId: null,
      current: null,
      done: [],
      startedAt: Date.now(),
      typingInterval: null,
      flushTimer: null,
      dirty: false,
    };
    sessionStatus.set(name, status);
  }
  return status;
}

function clearSessionStatus(name: string): void {
  const status = sessionStatus.get(name);
  if (status) {
    if (status.typingInterval) clearInterval(status.typingInterval);
    if (status.flushTimer) clearTimeout(status.flushTimer);
    sessionStatus.delete(name);
  }
}

function formatStatus(status: SessionStatus): string {
  const elapsed = Math.round((Date.now() - status.startedAt) / 1000);
  const elapsedStr =
    elapsed >= 60
      ? `${Math.floor(elapsed / 60)}m${String(elapsed % 60).padStart(2, "0")}s`
      : `${elapsed}s`;

  const lines: string[] = [`_Working... (${elapsedStr})_`];

  // Show completed items (cap at 8 most recent to keep message compact)
  const maxDone = 8;
  const doneSlice = status.done.slice(-maxDone);
  if (status.done.length > maxDone) {
    lines.push(`  _...${status.done.length - maxDone} earlier steps_`);
  }
  for (const item of doneSlice) {
    lines.push(`  ✓ ${item}`);
  }

  // Current action at bottom (most visible in chat)
  if (status.current) {
    lines.push(`⏳ ${status.current}`);
  }

  return lines.join("\n");
}

// ── State ──────────────────────────────────────────────────────────────────

let registry = loadRegistry();
const pendingRegistrations = new Set<string>();
const config = loadConfig();
const adapter = await loadAdapter(config.platform);

// ── Connect adapter ────────────────────────────────────────────────────────

await adapter.connect({
  platform: config.platform,
  credentials: config.credentials,
});

process.stderr.write(
  `omt-router: Connected to ${config.platform}. Port ${ROUTER_PORT}.\n`
);

// ── Handle inbound messages from adapter ───────────────────────────────────

adapter.onMessage((message: InboundMessage) => {
  // Find which session this thread belongs to
  const session = Object.values(registry.sessions).find(
    (s) => s.threadId === message.threadId
  );

  if (!session) {
    // Message is in the hub thread or unknown thread — ignore at router level.
    // Hub session handles its own messages via its own Telegram channel.
    return;
  }

  // Start typing indicator + status message
  const status = getOrCreateStatus(session.name);

  // Send initial typing indicator
  if (adapter.sendTypingIndicator) {
    adapter.sendTypingIndicator(session.threadId).catch(() => {});
  }

  // Send initial status message with elapsed timer
  if (adapter.sendStatusMessage && !status.messageId) {
    adapter.sendStatusMessage(session.threadId, formatStatus(status))
      .then((msgId) => {
        status.messageId = msgId;
      })
      .catch(() => {});
  }

  // Heartbeat: re-send typing indicator every 4 seconds
  if (status.typingInterval) clearInterval(status.typingInterval);
  status.typingInterval = setInterval(() => {
    if (adapter.sendTypingIndicator) {
      adapter.sendTypingIndicator(session.threadId).catch(() => {});
    }
  }, 4000);

  // Forward to the correct bridge
  fetch(`http://localhost:${session.bridgePort}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: message.text,
      sender: message.senderName,
      senderId: message.senderId,
      messageId: message.messageId,
      timestamp: message.timestamp,
      attachments: message.attachments,
    }),
  }).catch((err) => {
    process.stderr.write(
      `omt-router: Failed to forward to ${session.name}: ${err.message}\n`
    );
  });
});

// ── Handle permission responses from adapter ───────────────────────────────

adapter.onPermissionResponse((requestId: string, allow: boolean) => {
  // We need to find which session this permission belongs to.
  // For now, broadcast to all sessions — only the one with the matching
  // request_id will accept it, others will ignore.
  for (const session of Object.values(registry.sessions)) {
    fetch(`http://localhost:${session.bridgePort}/permission-response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, allow }),
    }).catch(() => {
      // Session might be down — ignore
    });
  }
});

// ── Debounced status flush ─────────────────────────────────────────────────
//
// Instead of calling adapter.updateStatusMessage on every hook event, we
// batch updates within STATUS_DEBOUNCE_MS. This function is the "flush":
// it reads the current accumulated status, formats it, and sends one edit.

function flushStatus(sessionName: string, threadId: string): void {
  const status = sessionStatus.get(sessionName);
  if (!status || !status.dirty) return;

  status.flushTimer = null;
  status.dirty = false;

  const formatted = formatStatus(status);

  if (status.messageId && adapter.updateStatusMessage) {
    adapter.updateStatusMessage(threadId, status.messageId, formatted).catch(() => {});
  } else if (adapter.sendStatusMessage) {
    adapter.sendStatusMessage(threadId, formatted)
      .then((msgId) => { status.messageId = msgId; })
      .catch(() => {});
  }
}

// ── HTTP server: API for bridges and CLI ───────────────────────────────────

Bun.serve({
  port: ROUTER_PORT,
  hostname: "127.0.0.1",

  websocket: dashboardWebSocketHandlers,

  async fetch(req, server) {
    const url = new URL(req.url);
    const method = req.method;

    // Dashboard routes may return "upgrade" to hand off to WebSocket.
    // Doing this at the top of fetch() keeps all WS routing in one place.
    if (url.pathname.startsWith("/ws/")) {
      const dashDecision = await handleDashboardRequest(req, {
        registry,
        platform: config.platform,
        routerPort: ROUTER_PORT,
        hubDir: OMT_HUB_DIR,
      });
      if (dashDecision === "upgrade") {
        // Pick the right data payload based on the URL so the WS handlers
        // know whether this is an event stream or a PTY attachment.
        let wsData: { kind: "events" } | { kind: "tmux"; sessionName: string };
        if (url.pathname === "/ws/events") {
          wsData = { kind: "events" };
        } else {
          const sessionName = url.pathname.slice("/ws/tmux/".length);
          if (!sessionName || !registry.sessions[sessionName]) {
            return new Response("session not found", { status: 404 });
          }
          wsData = { kind: "tmux", sessionName };
        }
        if (server.upgrade(req, { data: wsData })) return undefined;
        return new Response("upgrade failed", { status: 400 });
      }
      if (dashDecision instanceof Response) return dashDecision;
    }

    // ── Health check ─────────────────────────────────────────────────

    if (method === "GET" && url.pathname === "/health") {
      return Response.json({
        status: "ok",
        platform: config.platform,
        sessions: Object.keys(registry.sessions).length,
      });
    }

    // ── List all sessions ────────────────────────────────────────────

    if (method === "GET" && url.pathname === "/sessions") {
      return Response.json(registry.sessions);
    }

    // ── Get one session ──────────────────────────────────────────────

    if (method === "GET" && url.pathname.startsWith("/sessions/")) {
      const name = url.pathname.split("/")[2];
      const session = registry.sessions[name];
      if (!session) {
        return Response.json({ error: "session not found" }, { status: 404 });
      }
      return Response.json(session);
    }

    // ── Register a new session ───────────────────────────────────────

    if (method === "POST" && url.pathname === "/sessions") {
      const body = await req.json();
      const { name, path, bridgePort, isHub } = body as {
        name: string;
        path: string;
        bridgePort: number;
        isHub?: boolean;
      };

      if (!name || !path || !bridgePort) {
        return Response.json(
          { error: "name, path, and bridgePort are required" },
          { status: 400 }
        );
      }

      // ── Re-registration: session exists in registry from a previous run ──
      // When hub_start restores sessions after a stop, the registry still
      // has the old entries (threadId, displayName). We update the mutable
      // fields (bridgePort, startedAt, path) and reopen the thread.
      const existing = registry.sessions[name];
      if (existing) {
        // Reopen the thread in the adapter (e.g. reopenForumTopic on Telegram)
        if (adapter.reopenThread) {
          try {
            await adapter.reopenThread(existing.threadId, name);
          } catch (err) {
            process.stderr.write(
              `omt-router: Failed to reopen thread for "${name}": ${err}\n`
            );
          }
        }

        // Update mutable fields — the bridge port changes on restart
        existing.bridgePort = bridgePort;
        existing.startedAt = new Date().toISOString();
        existing.path = path;
        saveRegistry(registry);

        process.stderr.write(
          `omt-router: Re-registered session "${name}" → port ${bridgePort} (reused thread ${existing.threadId})\n`
        );

        broadcastEvent({
          type: "session.registered",
          name,
          path: existing.path,
          threadId: existing.threadId,
          bridgePort: existing.bridgePort,
          threadDisplayName: existing.threadDisplayName,
          startedAt: existing.startedAt,
        });

        return Response.json(existing, { status: 200 });
      }

      if (pendingRegistrations.has(name)) {
        return Response.json(
          { error: `session "${name}" is being created` },
          { status: 409 }
        );
      }

      // ── New registration: create a fresh thread ──────────────────────
      pendingRegistrations.add(name);

      let threadId: string;
      let threadDisplayName: string;

      if (isHub) {
        threadId = "__general__";
        threadDisplayName = "General (Hub)";
      } else {
        let threadInfo;
        try {
          threadInfo = await adapter.createThread(name);
        } catch (err) {
          pendingRegistrations.delete(name);
          const message = err instanceof Error ? err.message : String(err);
          return Response.json(
            { error: `failed to create thread: ${message}` },
            { status: 500 }
          );
        }
        threadId = threadInfo.threadId;
        threadDisplayName = threadInfo.displayName;
      }

      const entry: SessionEntry = {
        name,
        path,
        bridgePort,
        threadId,
        threadDisplayName,
        startedAt: new Date().toISOString(),
      };

      registry.sessions[name] = entry;
      saveRegistry(registry);
      pendingRegistrations.delete(name);

      process.stderr.write(
        `omt-router: Registered session "${name}" → port ${bridgePort}, thread ${threadId}\n`
      );

      broadcastEvent({
        type: "session.registered",
        name: entry.name,
        path: entry.path,
        threadId: entry.threadId,
        bridgePort: entry.bridgePort,
        threadDisplayName: entry.threadDisplayName,
        startedAt: entry.startedAt,
      });

      return Response.json(entry, { status: 201 });
    }

    // ── Unregister a session ─────────────────────────────────────────

    if (method === "DELETE" && url.pathname.startsWith("/sessions/")) {
      const name = url.pathname.split("/")[2];
      const session = registry.sessions[name];

      if (!session) {
        return Response.json({ error: "session not found" }, { status: 404 });
      }

      // Close the thread in the adapter
      try {
        await adapter.closeThread(session.threadId);
      } catch (err) {
        process.stderr.write(
          `omt-router: Failed to close thread for "${name}": ${err}\n`
        );
      }

      // Remove any attachments stored for this thread. Best-effort — never throws.
      await removeAttachmentDir(session.threadId);

      delete registry.sessions[name];
      saveRegistry(registry);

      process.stderr.write(`omt-router: Unregistered session "${name}"\n`);

      broadcastEvent({ type: "session.removed", name });

      return Response.json({ status: "removed" });
    }

    // ── Reply from a bridge → adapter ────────────────────────────────

    if (method === "POST" && url.pathname === "/reply") {
      const body = await req.json();
      const { sessionName, text } = body as {
        sessionName: string;
        text: string;
      };

      const session = registry.sessions[sessionName];
      if (!session) {
        return Response.json(
          { error: `session "${sessionName}" not found` },
          { status: 404 }
        );
      }

      // Finalize status message (keep it visible, don't delete)
      const status = sessionStatus.get(sessionName);
      if (status && status.messageId && adapter.updateStatusMessage) {
        const elapsed = Math.round((Date.now() - status.startedAt) / 1000);
        const elapsedStr =
          elapsed >= 60
            ? `${Math.floor(elapsed / 60)}m${String(elapsed % 60).padStart(2, "0")}s`
            : `${elapsed}s`;
        const lines: string[] = [`Done (${elapsedStr})`];
        const maxDone = 8;
        const doneSlice = status.done.slice(-maxDone);
        if (status.done.length > maxDone) {
          lines.push(`  ...${status.done.length - maxDone} earlier steps`);
        }
        for (const item of doneSlice) {
          lines.push(`  ✓ ${item}`);
        }
        adapter.updateStatusMessage(session.threadId, status.messageId, lines.join("\n")).catch(() => {});
      }
      clearSessionStatus(sessionName);

      try {
        await adapter.send(session.threadId, text);
        return Response.json({ status: "sent" });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return Response.json(
          { error: `send failed: ${message}` },
          { status: 500 }
        );
      }
    }

    // ── Status update from hooks → adapter ──────────────────────────
    //
    // Protocol: { sessionName, text, type }
    //   type "current" — action in progress (shown with ⏳ at bottom)
    //   type "done"    — action completed (shown with ✓ in list)
    //   type "stop"    — turn ended, clean up status message

    if (method === "POST" && url.pathname === "/status") {
      const body = await req.json();
      const { sessionName, text: statusText, type: statusType } = body as {
        sessionName: string;
        text: string;
        type?: string;
      };

      const session = registry.sessions[sessionName];
      if (!session) {
        return Response.json({ status: "ignored" });
      }

      const status = getOrCreateStatus(sessionName);

      if (statusType === "stop") {
        // Turn complete — finalize status message (keep visible)
        if (status.messageId && adapter.updateStatusMessage) {
          const elapsed = Math.round((Date.now() - status.startedAt) / 1000);
          const elapsedStr =
            elapsed >= 60
              ? `${Math.floor(elapsed / 60)}m${String(elapsed % 60).padStart(2, "0")}s`
              : `${elapsed}s`;
          const lines: string[] = [`Done (${elapsedStr})`];
          for (const item of status.done.slice(-8)) {
            lines.push(`  ✓ ${item}`);
          }
          adapter.updateStatusMessage(session.threadId, status.messageId, lines.join("\n")).catch(() => {});
        }
        clearSessionStatus(sessionName);
        broadcastEvent({ type: "session.status.cleared", name: sessionName });
        return Response.json({ status: "cleared" });
      }

      if (statusType === "current") {
        // New current action (from PreToolUse / SubagentStart)
        status.current = statusText;
      } else {
        // "done" or legacy (no type) — completed action
        status.current = null;
        status.done.push(statusText);
      }

      // Push to dashboard immediately — unlike the platform adapter which
      // rate-limits to avoid Telegram/Slack throttling, localhost clients
      // can handle a steady stream of events.
      broadcastEvent({
        type: "session.status",
        name: sessionName,
        current: status.current,
        done: status.done,
        elapsedMs: Date.now() - status.startedAt,
      });

      // Mark status as dirty and schedule a debounced flush. Instead of
      // calling updateStatusMessage on every single hook event (~20 calls
      // for 10 bash commands), we batch updates within STATUS_DEBOUNCE_MS
      // and send one consolidated edit. This keeps us well under Telegram's
      // 20 msg/min group limit.
      status.dirty = true;
      if (!status.flushTimer) {
        status.flushTimer = setTimeout(() => {
          flushStatus(sessionName, session.threadId);
        }, STATUS_DEBOUNCE_MS);
      }

      return Response.json({ status: "updated" });
    }

    // ── Permission request from bridge → adapter ─────────────────────

    if (method === "POST" && url.pathname === "/permission-request") {
      const body = await req.json();
      const { sessionName, requestId, toolName, description, inputPreview } =
        body as {
          sessionName: string;
          requestId: string;
          toolName: string;
          description: string;
          inputPreview: string;
        };

      const session = registry.sessions[sessionName];
      if (!session) {
        return Response.json(
          { error: `session "${sessionName}" not found` },
          { status: 404 }
        );
      }

      try {
        await adapter.sendPermissionPrompt(session.threadId, {
          requestId,
          toolName,
          description,
          inputPreview,
        });
        return Response.json({ status: "sent" });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return Response.json(
          { error: `permission prompt failed: ${message}` },
          { status: 500 }
        );
      }
    }

    // ── Dashboard (UI + REST API) ────────────────────────────────────
    // WebSocket paths already short-circuited at the top of fetch.
    const dashResponse = await handleDashboardRequest(req, {
      registry,
      platform: config.platform,
      routerPort: ROUTER_PORT,
      hubDir: OMT_HUB_DIR,
    });
    if (dashResponse instanceof Response) return dashResponse;

    // ── 404 ──────────────────────────────────────────────────────────

    return Response.json({ error: "not found" }, { status: 404 });
  },
});

// ── Graceful shutdown ──────────────────────────────────────────────────────

process.on("SIGINT", async () => {
  process.stderr.write("omt-router: Shutting down...\n");
  await adapter.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await adapter.disconnect();
  process.exit(0);
});

// ── Safety net ─────────────────────────────────────────────────────────────
// An uncaught error from anywhere in the HTTP/WebSocket handlers (dashboard
// code, adapters, etc.) used to take the whole router down with it, severing
// every bridge. Log and keep running — sessions stay alive, a bad handler
// fails isolated to its request.

process.on("uncaughtException", (err) => {
  process.stderr.write(
    `omt-router: UNCAUGHT EXCEPTION: ${err.stack || err.message}\n`
  );
});
process.on("unhandledRejection", (reason) => {
  const msg =
    reason instanceof Error ? reason.stack || reason.message : String(reason);
  process.stderr.write(`omt-router: UNHANDLED REJECTION: ${msg}\n`);
});
