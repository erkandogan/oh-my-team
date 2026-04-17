/**
 * Oh My Team — Dashboard PTY Bridge
 *
 * Bridges a browser WebSocket to an interactive `tmux` session via a small
 * Node.js helper (`pty-bridge.cjs`). The helper is spawned once per WS
 * connection and owns the node-pty ↔ tmux pseudo-terminal; we only proxy
 * bytes between the WebSocket and the helper's stdio.
 *
 * Why a Node helper instead of calling node-pty directly? node-pty's native
 * `spawn-helper` reads from the pty FD using libuv; under Bun the read
 * path doesn't propagate data back into userland, so the terminal looks
 * attached but no output arrives. Running the PTY under Node sidesteps
 * that incompatibility cleanly.
 *
 * Wire protocol (client ⇄ router ⇄ helper):
 *   - Data frames: raw terminal bytes, both directions.
 *   - Control frames: JSON text starting with \x1e (ASCII Record Separator).
 *     `{"kind":"resize","cols":80,"rows":24}`   client → server → helper
 *     `{"kind":"error",   "message":"..."}`    server → client
 *     `{"kind":"exit",    "exitCode":N}`       server → client
 *   Helper stdin accepts control frames via the same prefix, so the router
 *   just forwards them through without interpretation.
 */

import type { ServerWebSocket, Subprocess } from "bun";
import path from "node:path";
import type { DashboardWsData } from "./dashboard-server";

const CONTROL_PREFIX = "\x1e";
const PTY_BRIDGE_PATH = path.join(import.meta.dir, "pty-bridge.cjs");

/**
 * Attach a WebSocket to a tmux session. Spawns the pty-bridge helper under
 * `node`, wires its stdio to the socket, and stores the subprocess on
 * ws.data so the message / close handlers can reach it.
 */
export async function attachTmuxPty(
  ws: ServerWebSocket<DashboardWsData>,
  sessionName: string
): Promise<void> {
  // Verify the tmux session exists before spawning — gives the user a
  // clearer error than an opaque helper exit code.
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

  // Unique grouped-session name so multiple dashboard clients don't
  // collide with each other. Cleaned up when the bridge exits.
  const groupName = `omt-${sessionName}-dash-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;

  let bridge: Subprocess;
  try {
    bridge = Bun.spawn({
      cmd: ["node", PTY_BRIDGE_PATH],
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
      env: {
        ...(process.env as Record<string, string>),
        OMT_PTY_SESSION: sessionName,
        OMT_PTY_GROUP: groupName,
        OMT_PTY_COLS: "120",
        OMT_PTY_ROWS: "30",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    process.stderr.write(`omt-router: pty-bridge spawn failed: ${msg}\n`);
    sendControl(ws, {
      kind: "error",
      message: `Failed to start terminal: ${msg}`,
    });
    ws.close(1011, "bridge spawn failed");
    return;
  }

  if (ws.data.kind === "tmux") {
    ws.data.bridge = bridge;
    ws.data.groupName = groupName;
  }

  // ── helper stdout → ws ──────────────────────────────────────────────
  // Pipe the helper's terminal output (raw bytes, typically UTF-8) to the
  // browser. One reader for the lifetime of the bridge.
  pumpOutput(bridge, ws);

  // ── helper stderr → router log ──────────────────────────────────────
  pumpErr(bridge);

  // ── helper exit → notify client ─────────────────────────────────────
  bridge.exited.then((code) => {
    sendControl(ws, { kind: "exit", exitCode: code ?? 0 });
    try {
      ws.close(1000, "bridge exited");
    } catch {
      // already closed
    }
  });
}

/**
 * Handle a message from the browser. Forward it to the helper's stdin.
 * Control frames use the same `\x1e...\n` encoding, so the helper parses
 * them natively — no extra work here.
 */
export function handleTmuxMessage(
  ws: ServerWebSocket<DashboardWsData>,
  msg: string | Buffer
): void {
  if (ws.data.kind !== "tmux" || !ws.data.bridge) return;
  const stdin = ws.data.bridge.stdin;
  if (!stdin || typeof stdin === "number") return;

  // Control frames are string; ensure they end with a newline so the
  // helper knows the frame is complete. (xterm.js sends strings.)
  let toWrite: string | Buffer;
  if (typeof msg === "string" && msg.startsWith(CONTROL_PREFIX)) {
    toWrite = msg.endsWith("\n") ? msg : msg + "\n";
  } else {
    toWrite = msg;
  }

  try {
    (stdin as WritableStreamDefaultWriter | any).write?.(toWrite);
  } catch {
    // bridge stdin closed — nothing to do, the exited promise will fire
  }
}

/** Kill the helper + grouped tmux session when the WebSocket closes. */
export function closeTmuxPty(ws: ServerWebSocket<DashboardWsData>): void {
  if (ws.data.kind !== "tmux") return;
  const { bridge, groupName } = ws.data;
  if (bridge) {
    try {
      bridge.kill();
    } catch {
      // already exited
    }
    ws.data.bridge = undefined;
  }
  if (groupName) {
    // Fire-and-forget; already-dead sessions produce a harmless error.
    Bun.spawnSync(["tmux", "kill-session", "-t", groupName], {
      stdout: "ignore",
      stderr: "ignore",
    });
  }
}

// ── Control protocol ─────────────────────────────────────────────────────

type ServerControl =
  | { kind: "error"; message: string }
  | { kind: "exit"; exitCode: number };

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

// ── Stream pumps ─────────────────────────────────────────────────────────

/**
 * Continuously forward bytes from the helper's stdout to the WebSocket.
 * Stops on stream end or error — Bun handles back-pressure via the
 * reader's await so a slow client just slows the pump, it doesn't buffer.
 */
async function pumpOutput(
  bridge: Subprocess,
  ws: ServerWebSocket<DashboardWsData>
): Promise<void> {
  const stdout = bridge.stdout;
  if (!stdout || typeof stdout === "number") return;
  const reader = (stdout as ReadableStream<Uint8Array>).getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) return;
      if (!value || value.length === 0) continue;
      // xterm.js accepts strings; binary is valid too but decoding once here
      // avoids the client having to do it.
      const text = decoder.decode(value, { stream: true });
      try {
        ws.send(text);
      } catch {
        return; // socket closed
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // already released
    }
  }
}

/** Drain the helper's stderr into the router log with a clear prefix. */
async function pumpErr(bridge: Subprocess): Promise<void> {
  const stderr = bridge.stderr;
  if (!stderr || typeof stderr === "number") return;
  const reader = (stderr as ReadableStream<Uint8Array>).getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) return;
      if (value && value.length > 0) {
        process.stderr.write(`pty-bridge: ${decoder.decode(value)}`);
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // already released
    }
  }
}
