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

// ── Shared types ──────────────────────────────────────────────────────────

/** Minimal shape we need from the router's session registry. The router
 *  owns the authoritative type; we only read session.path here. */
interface RegistryView {
  sessions: Record<string, { path: string }>;
}

// ── Static file serving ───────────────────────────────────────────────────

const DASHBOARD_ROOT = path.join(import.meta.dir, "dashboard");

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
  // `/dashboard` and `/dashboard/` → index.html
  // `/dashboard/app.js`            → app.js
  // `/dashboard/vendor/xterm.js`   → vendor/xterm.js
  const rel = pathname.replace(/^\/dashboard\/?/, "") || "index.html";

  // Path traversal defence — the resolved path must stay under DASHBOARD_ROOT.
  const resolved = path.resolve(DASHBOARD_ROOT, rel);
  if (resolved !== DASHBOARD_ROOT && !resolved.startsWith(DASHBOARD_ROOT + path.sep)) {
    return new Response("forbidden", { status: 403 });
  }

  const ext = path.extname(resolved).toLowerCase();
  const mime = DASHBOARD_MIME.get(ext);
  if (!mime && ext !== "") {
    return new Response("not found", { status: 404 });
  }

  const file = Bun.file(resolved);
  if (!(await file.exists())) {
    // SPA fallback: if the client navigated to a route we don't have,
    // serve index.html so client-side routing can take over.
    if (ext === "" || ext === ".html") {
      const index = Bun.file(path.join(DASHBOARD_ROOT, "index.html"));
      if (await index.exists()) {
        return new Response(index, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
    }
    return new Response("not found", { status: 404 });
  }

  return new Response(file, {
    headers: {
      "Content-Type": mime || "application/octet-stream",
      // Short cache — long enough to avoid re-fetching every click,
      // short enough that a user isn't stuck on stale UI after an upgrade.
      "Cache-Control": "public, max-age=60",
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

/**
 * Handle a request destined for the dashboard. Returns null when the URL
 * doesn't match any dashboard route — the caller should fall through to
 * the next handler.
 */
export async function handleDashboardRequest(
  req: Request,
  ctx: DashboardContext
): Promise<Response | null> {
  const url = new URL(req.url);
  const method = req.method;

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
      const [, name, action] = sessionMatch;
      return action === "stop" ? stopSession(ctx, name) : restartSession(ctx, name);
    }
  }

  return null;
}
