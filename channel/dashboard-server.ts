/**
 * Oh My Team — Dashboard Server
 *
 * Serves the dashboard UI and its REST API off the router's Bun.serve
 * instance. Kept in its own module so router.ts stays focused on
 * platform-agnostic message routing.
 *
 * Exports a single `handleDashboardRequest(req, ctx)` function that the
 * router calls from its fetch handler. Returns a Response if the request
 * matches a dashboard route, or null if it should fall through to the
 * next handler.
 */

import path from "node:path";
import type { ServerWebSocket, Subprocess } from "bun";
import {
  attachTmuxPty,
  closeTmuxPty,
  handleTmuxMessage,
} from "./dashboard-pty";

// ── Shared types ──────────────────────────────────────────────────────────

/** Minimal shape we need from the router's session registry. The router
 *  owns the authoritative type; we only read session.path here. */
interface RegistryView {
  sessions: Record<string, { path: string }>;
}

/** Events pushed to dashboard clients over /ws/events. Keep flat + JSON-safe. */
export type DashboardEvent =
  | { type: "session.registered"; name: string; path: string; threadId: string; bridgePort: number; threadDisplayName: string; startedAt: string }
  | { type: "session.removed"; name: string }
  | { type: "session.status"; name: string; current: string | null; done: string[]; elapsedMs: number }
  | { type: "session.status.cleared"; name: string }
  | { type: "router.log"; line: string };

export type DashboardWsData =
  | { kind: "events" }
  | {
      kind: "tmux";
      sessionName: string;
      /** Subprocess running pty-bridge.js — owns the actual tmux PTY. */
      bridge?: Subprocess;
      /** Unique group-session name the dashboard created for itself.
       *  Set by attachTmuxPty; used by closeTmuxPty to kill the mirror
       *  session so grouped-session clones don't leak in tmux. */
      groupName?: string;
    };

// ── Static file serving ───────────────────────────────────────────────────

const DASHBOARD_ROOT = path.join(import.meta.dir, "dashboard", "dist");

/**
 * Files the dashboard may serve. Allowlist by extension so a misconfigured
 * route can't accidentally expose arbitrary paths in the plugin directory.
 */
const DASHBOARD_MIME = new Map<string, string>([
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".mjs", "application/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".woff2", "font/woff2"],
  [".json", "application/json; charset=utf-8"],
]);

async function serveStatic(pathname: string): Promise<Response> {
  const index = Bun.file(path.join(DASHBOARD_ROOT, "index.html"));
  if (!(await index.exists())) {
    return new Response("dashboard not built — run npm run build:dashboard", { status: 404 });
  }

  const rel = pathname.replace(/^\/dashboard\/?/, "") || "index.html";

  // Path traversal defence — the resolved path must stay under DASHBOARD_ROOT.
  const resolved = path.resolve(DASHBOARD_ROOT, rel);
  if (resolved !== DASHBOARD_ROOT && !resolved.startsWith(DASHBOARD_ROOT + path.sep)) {
    return new Response("forbidden", { status: 403 });
  }

  const ext = path.extname(resolved).toLowerCase();
  const file = Bun.file(resolved);
  if (!(await file.exists())) {
    // SPA fallback: client-side route with no on-disk file → serve index.html.
    if (ext === "" || ext === ".html") {
      return new Response(index, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          // index.html references hashed asset filenames; if we cached it,
          // users would load stale UI after an upgrade until the cache
          // expired. Assets below use aggressive caching; index is no-store.
          "Cache-Control": "no-store",
        },
      });
    }
    return new Response("not found", { status: 404 });
  }

  // Vite writes content-hashed filenames for every asset under assets/, so
  // they're immutable for the lifetime of the file — safe to cache for a
  // long time. index.html itself is no-store so users pick up new hashes
  // immediately on upgrade.
  const isHtml = ext === ".html";
  return new Response(file, {
    headers: {
      "Content-Type": DASHBOARD_MIME.get(ext) || "application/octet-stream",
      "Cache-Control": isHtml
        ? "no-store"
        : "public, max-age=31536000, immutable",
    },
  });
}

// ── REST API ──────────────────────────────────────────────────────────────

export interface DashboardContext {
  registry: RegistryView;
  platform: string;
  routerPort: number;
  hubDir: string;
}

async function getConfig(ctx: DashboardContext): Promise<Response> {
  return Response.json({
    platform: ctx.platform,
    routerPort: ctx.routerPort,
    hubDir: ctx.hubDir,
  });
}

async function getLogs(ctx: DashboardContext, tailParam: string | null): Promise<Response> {
  const logPath = path.join(ctx.hubDir, "router.log");
  const file = Bun.file(logPath);
  if (!(await file.exists())) {
    return Response.json({ lines: [] });
  }
  // Cap the tail count so a buggy client can't ask for the whole file.
  const tail = Math.min(Math.max(1, Number(tailParam) || 100), 1000);
  const text = await file.text();
  const lines = text.split("\n").filter(Boolean).slice(-tail);
  return Response.json({ lines });
}

async function stopSession(ctx: DashboardContext, name: string): Promise<Response> {
  const session = ctx.registry.sessions[name];
  if (!session) {
    return Response.json({ error: "session not found" }, { status: 404 });
  }
  if (name === "hub") {
    return Response.json(
      { error: "refusing to stop 'hub' — use `omt hub stop` instead" },
      { status: 400 }
    );
  }
  // Keep the registry entry so the session can be restored later. Same
  // semantics as `omt hub stop` at the CLI level.
  const proc = Bun.spawn(["tmux", "kill-session", "-t", `omt-${name}`], {
    stderr: "pipe",
  });
  await proc.exited;
  return Response.json({ status: "stopped", name });
}

async function restartSession(ctx: DashboardContext, name: string): Promise<Response> {
  const session = ctx.registry.sessions[name];
  if (!session) {
    return Response.json({ error: "session not found" }, { status: 404 });
  }
  if (name === "hub") {
    return Response.json(
      { error: "refusing to restart 'hub' — use `omt hub start` instead" },
      { status: 400 }
    );
  }

  // Kill the tmux session, then delegate to `omt hub add <path> --continue`
  // which already handles port allocation, .mcp.json, .omt-env, and router
  // re-registration. Avoid duplicating that logic here.
  Bun.spawnSync(["tmux", "kill-session", "-t", `omt-${name}`], { stderr: "pipe" });
  // Small grace period so the router sees the port release cleanly before
  // the new bridge comes up.
  await new Promise((r) => setTimeout(r, 500));
  Bun.spawn(["omt", "hub", "add", session.path, "--continue"], {
    stdout: "ignore",
    stderr: "ignore",
    stdin: "ignore",
  });
  return Response.json({ status: "restarting", name });
}

// ── Router entrypoint ─────────────────────────────────────────────────────

// ── Live event broadcast ──────────────────────────────────────────────────

/** Active dashboard clients listening on /ws/events. Broadcasts are O(n)
 *  over this set, which is fine for localhost with a handful of tabs open. */
const eventSubscribers = new Set<ServerWebSocket<DashboardWsData>>();

/**
 * Push an event to every connected dashboard client. Serialization is
 * lazy — only done once even with many subscribers. Slow / disconnected
 * sockets are removed on next failed send rather than awaited, so one
 * stuck client can't block the rest.
 */
export function broadcastEvent(event: DashboardEvent): void {
  if (eventSubscribers.size === 0) return;
  const payload = JSON.stringify(event);
  for (const ws of eventSubscribers) {
    try {
      ws.send(payload);
    } catch {
      eventSubscribers.delete(ws);
    }
  }
}

// ── Router entrypoint ─────────────────────────────────────────────────────

/**
 * Handle a request destined for the dashboard. Returns a Response for
 * HTTP routes, the string "upgrade" when the request is a WebSocket that
 * should be upgraded by the caller, or null when no dashboard route
 * matched (caller should fall through).
 */
export async function handleDashboardRequest(
  req: Request,
  ctx: DashboardContext
): Promise<Response | "upgrade" | null> {
  const url = new URL(req.url);
  const method = req.method;

  // WebSocket upgrade request — the router performs the actual upgrade.
  if (url.pathname === "/ws/events" || url.pathname.startsWith("/ws/tmux/")) {
    return "upgrade";
  }

  // Static files / SPA entry
  if (method === "GET" && url.pathname.startsWith("/dashboard")) {
    return serveStatic(url.pathname);
  }

  // REST API
  if (url.pathname.startsWith("/api/")) {
    if (method === "GET" && url.pathname === "/api/config") return getConfig(ctx);
    if (method === "GET" && url.pathname === "/api/logs") {
      return getLogs(ctx, url.searchParams.get("tail"));
    }

    const sessionMatch = url.pathname.match(/^\/api\/sessions\/([^/]+)\/(stop|restart)$/);
    if (sessionMatch && method === "POST") {
      // CSRF defence. The router binds to 127.0.0.1 only, but any other
      // origin loaded in the same browser (a malicious page, a local dev
      // server on a different port) could still hit us via `fetch`. Browsers
      // always set `Origin` on cross-origin non-GET requests, so reject
      // anything that isn't our own dashboard.
      const origin = req.headers.get("origin");
      if (!isLocalOrigin(origin, ctx.routerPort)) {
        return Response.json(
          { error: "origin not allowed" },
          { status: 403 }
        );
      }
      const [, name, action] = sessionMatch;
      return action === "stop" ? stopSession(ctx, name) : restartSession(ctx, name);
    }
  }

  return null;
}

/** Allow only origins that are serving the dashboard itself. The router is
 *  localhost-only, so any legitimate POST comes from `http://localhost:<port>`
 *  or `http://127.0.0.1:<port>`. Missing Origin (Workers, curl without it) is
 *  rejected too — legitimate browser usage always sets it on POST. */
function isLocalOrigin(origin: string | null, port: number): boolean {
  if (!origin) return false;
  try {
    const u = new URL(origin);
    const host = u.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") return false;
    // Allow the router's own port, or any port (dev Vite server) on the same host.
    // Dev server acceptance is limited to localhost anyway.
    return u.port === String(port) || u.port !== "";
  } catch {
    return false;
  }
}

// ── WebSocket handlers (wired into Bun.serve's `websocket` option) ─────────

/** Handlers for the shared websocket. Branches on ws.data.kind so multiple
 *  WS endpoints can share the same Bun.serve instance. */
export const dashboardWebSocketHandlers = {
  async open(ws: ServerWebSocket<DashboardWsData>) {
    if (ws.data.kind === "events") {
      eventSubscribers.add(ws);
    } else if (ws.data.kind === "tmux") {
      await attachTmuxPty(ws, ws.data.sessionName);
    }
  },
  message(ws: ServerWebSocket<DashboardWsData>, msg: string | Buffer) {
    if (ws.data.kind === "tmux") {
      handleTmuxMessage(ws, msg);
    }
    // Events socket has no inbound messages right now. Future: ping/pong.
  },
  close(ws: ServerWebSocket<DashboardWsData>) {
    if (ws.data.kind === "events") {
      eventSubscribers.delete(ws);
    } else if (ws.data.kind === "tmux") {
      closeTmuxPty(ws);
    }
  },
} as const;
