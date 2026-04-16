/**
 * Oh My Team — Dashboard PTY Bridge
 *
 * Bridges a browser WebSocket to a `tmux attach-session` subprocess running
 * under a pseudo-terminal, giving users a real interactive terminal inside
 * the dashboard. node-pty is loaded lazily so a missing native binary only
 * disables this one feature instead of crashing the router.
 *
 * Wire protocol (client ⇄ server on the same WebSocket):
 *   - Data frames: binary / text streams of terminal bytes (both directions).
 *   - Control frames: JSON text starting with `\x1e`  (ASCII Record Separator,
 *     harmless inside tmux).
 *         `{"kind":"resize","cols":80,"rows":24}`
 *
 * Separating control frames by prefix byte keeps the hot path (PTY output)
 * unaltered — no JSON wrapping for every chunk of stdout.
 */

import type { ServerWebSocket } from "bun";
import type { IPty } from "node-pty";
import type { DashboardWsData } from "./dashboard-server";

const CONTROL_PREFIX = "\x1e"; // ASCII Record Separator

let nodePty: typeof import("node-pty") | null = null;
let nodePtyLoadError: Error | null = null;

/** Load node-pty lazily. Cached, safe to call repeatedly. */
async function loadNodePty(): Promise<typeof import("node-pty") | null> {
  if (nodePty) return nodePty;
  if (nodePtyLoadError) return null;
  try {
    nodePty = await import("node-pty");
    return nodePty;
  } catch (err) {
    nodePtyLoadError = err instanceof Error ? err : new Error(String(err));
    process.stderr.write(
      `omt-router: node-pty unavailable — terminal disabled (${nodePtyLoadError.message})\n`
    );
    return null;
  }
}

/** Is the terminal feature available on this install? */
export async function isPtyAvailable(): Promise<boolean> {
  return (await loadNodePty()) !== null;
}

/**
 * Attach a PTY running `tmux attach-session -t omt-<sessionName>` to the
 * given WebSocket. Stores the pty handle on ws.data so the message / close
 * handlers can reach it.
 *
 * If node-pty isn't available, sends a user-friendly error and closes the
 * socket.
 */
export async function attachTmuxPty(
  ws: ServerWebSocket<DashboardWsData>,
  sessionName: string
): Promise<void> {
  const pty = await loadNodePty();
  if (!pty) {
    sendControl(ws, {
      kind: "error",
      message: "Terminal unavailable — node-pty native binary is missing.",
    });
    ws.close(1011, "node-pty unavailable");
    return;
  }

  // Verify the tmux session exists before spawning — gives a clearer error
  // than "tmux attach" failing with an exit code.
  const check = Bun.spawnSync(
    ["tmux", "has-session", "-t", `omt-${sessionName}`],
    { stdout: "ignore", stderr: "ignore" }
  );
  if (check.exitCode !== 0) {
    sendControl(ws, {
      kind: "error",
      message: `Session "${sessionName}" is not running in tmux.`,
    });
    ws.close(1011, "session not running");
    return;
  }

  // Spawn tmux under a PTY. `-u` forces UTF-8 which matches xterm.js defaults.
  // The initial cols/rows are placeholders — the client sends a resize event
  // immediately after the terminal mounts so they get set correctly.
  const term: IPty = pty.spawn("tmux", ["attach-session", "-t", `omt-${sessionName}`, "-u"], {
    name: "xterm-256color",
    cols: 80,
    rows: 24,
    cwd: process.env.HOME || "/tmp",
    env: {
      ...process.env,
      TERM: "xterm-256color",
    },
  });

  if (ws.data.kind === "tmux") ws.data.pty = term;

  // PTY output → WS. Send as text; xterm.js doesn't care as long as the
  // bytes are UTF-8 and don't start with our control prefix (tmux won't
  // emit RS bytes in normal operation).
  term.onData((data) => {
    try {
      ws.send(data);
    } catch {
      // Client disconnected between our reads — the close handler will
      // tear down the PTY shortly.
    }
  });

  term.onExit(({ exitCode }) => {
    sendControl(ws, { kind: "exit", exitCode });
    try {
      ws.close(1000, "pty exited");
    } catch {
      // socket already closed — nothing to do
    }
  });
}

/**
 * Handle a message from the browser. Text frames starting with the control
 * prefix are treated as JSON commands (resize, etc.); everything else goes
 * straight into the PTY stdin.
 */
export function handleTmuxMessage(
  ws: ServerWebSocket<DashboardWsData>,
  msg: string | Buffer
): void {
  if (ws.data.kind !== "tmux" || !ws.data.pty) return;
  const term = ws.data.pty;

  if (typeof msg === "string" && msg.startsWith(CONTROL_PREFIX)) {
    handleTmuxControl(term, msg.slice(CONTROL_PREFIX.length));
    return;
  }

  // Binary or plain text — forward as-is. node-pty's `write` accepts strings;
  // for Buffer we convert. xterm.js sends strings by default.
  if (typeof msg === "string") {
    term.write(msg);
  } else {
    term.write(msg.toString("utf-8"));
  }
}

/** Kill the PTY when the WebSocket closes. */
export function closeTmuxPty(ws: ServerWebSocket<DashboardWsData>): void {
  if (ws.data.kind !== "tmux" || !ws.data.pty) return;
  try {
    ws.data.pty.kill();
  } catch {
    // Already gone — that's fine.
  }
  ws.data.pty = undefined;
}

// ── Control protocol ──────────────────────────────────────────────────────

interface ResizeControl {
  kind: "resize";
  cols: number;
  rows: number;
}

type ServerControl =
  | { kind: "error"; message: string }
  | { kind: "exit"; exitCode: number };

function handleTmuxControl(term: IPty, raw: string): void {
  let msg: ResizeControl;
  try {
    msg = JSON.parse(raw);
  } catch {
    return;
  }
  if (msg.kind === "resize" && Number.isFinite(msg.cols) && Number.isFinite(msg.rows)) {
    // Clamp to sane bounds. Very small sizes break tmux redraw, very large
    // sizes waste bandwidth redrawing empty space.
    const cols = Math.min(Math.max(10, Math.floor(msg.cols)), 500);
    const rows = Math.min(Math.max(5, Math.floor(msg.rows)), 200);
    try {
      term.resize(cols, rows);
    } catch {
      // pty may have exited between the client resize and our write
    }
  }
}

function sendControl(
  ws: ServerWebSocket<DashboardWsData>,
  payload: ServerControl
): void {
  try {
    ws.send(CONTROL_PREFIX + JSON.stringify(payload));
  } catch {
    // socket closed
  }
}
