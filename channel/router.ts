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

// ── Configuration ──────────────────────────────────────────────────────────

const ROUTER_PORT = Number(process.env.ROUTER_PORT) || 8800;
const OMT_HUB_DIR =
  process.env.OMT_HUB_DIR || `${process.env.HOME}/.oh-my-team`;
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

interface SessionStatus {
  messageId: string | null;       // platform message ID for the editable status msg
  current: string | null;         // current action in progress (from PreToolUse)
  done: string[];                 // completed actions (from PostToolUse)
  startedAt: number;              // timestamp for elapsed time display
  typingInterval: ReturnType<typeof setInterval> | null;
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
    };
    sessionStatus.set(name, status);
  }
  return status;
}

function clearSessionStatus(name: string): void {
  const status = sessionStatus.get(name);
  if (status) {
    if (status.typingInterval) clearInterval(status.typingInterval);
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

// ── HTTP server: API for bridges and CLI ───────────────────────────────────

Bun.serve({
  port: ROUTER_PORT,
  hostname: "127.0.0.1",

  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

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

      if (registry.sessions[name] || pendingRegistrations.has(name)) {
        return Response.json(
          { error: `session "${name}" already exists or is being created` },
          { status: 409 }
        );
      }

      // Lock this name to prevent race conditions
      pendingRegistrations.add(name);

      let threadId: string;
      let threadDisplayName: string;

      if (isHub) {
        // Hub session listens on the General topic — no new thread needed
        threadId = "__general__";
        threadDisplayName = "General (Hub)";
      } else {
        // Create a thread in the adapter for this session
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

      delete registry.sessions[name];
      saveRegistry(registry);

      process.stderr.write(`omt-router: Unregistered session "${name}"\n`);

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

      // Clean up status message and typing indicator
      const status = sessionStatus.get(sessionName);
      if (status) {
        if (status.messageId && adapter.deleteStatusMessage) {
          adapter.deleteStatusMessage(session.threadId, status.messageId).catch(() => {});
        }
        clearSessionStatus(sessionName);
      }

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
        // Turn complete — clean up status message
        if (status.messageId && adapter.deleteStatusMessage) {
          adapter.deleteStatusMessage(session.threadId, status.messageId).catch(() => {});
        }
        clearSessionStatus(sessionName);
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

      const formatted = formatStatus(status);

      if (status.messageId && adapter.updateStatusMessage) {
        adapter.updateStatusMessage(session.threadId, status.messageId, formatted).catch(() => {});
      } else if (adapter.sendStatusMessage) {
        adapter.sendStatusMessage(session.threadId, formatted)
          .then((msgId) => {
            status.messageId = msgId;
          })
          .catch(() => {});
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
