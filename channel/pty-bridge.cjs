#!/usr/bin/env node
/**
 * Oh My Team — PTY Bridge
 *
 * A tiny Node.js helper that owns the node-pty <-> tmux pseudo-terminal.
 * The router (running under Bun) spawns one of these per dashboard terminal
 * WebSocket and bridges their stdio to the client.
 *
 * Why a separate Node process?
 * node-pty uses a small native `spawn-helper` binary that reads from a
 * pseudo-tty FD. Under Bun that read path currently doesn't propagate
 * data back into userland — the PTY spawns fine but onData never fires,
 * so the terminal appears frozen with a blinking caret. Node's libuv
 * event loop handles it correctly. Isolating the PTY in a Node process
 * sidesteps the incompatibility cleanly without changing the runtime
 * of anything else.
 *
 * Wire protocol (over stdin/stdout):
 *   - Every stdout chunk is raw terminal output. Clients can treat the
 *     stream as bytes destined for xterm.js.
 *   - Stdin is the same, reversed: raw bytes become keystrokes, with
 *     one exception — control frames begin with \x1e (Record Separator)
 *     and end at the next \n. They carry JSON: {"kind":"resize","cols":N,"rows":M}.
 *
 * Env in:
 *   OMT_PTY_SESSION   — the omt session name (e.g. "latte-dev")
 *   OMT_PTY_GROUP     — the grouped tmux session name to create
 *   OMT_PTY_COLS      — initial column count (optional, default 120)
 *   OMT_PTY_ROWS      — initial row count    (optional, default 30)
 */

const pty = require("node-pty");

const CONTROL_PREFIX = "\x1e";

const sessionName = process.env.OMT_PTY_SESSION;
const groupName = process.env.OMT_PTY_GROUP;
const cols = Number(process.env.OMT_PTY_COLS) || 120;
const rows = Number(process.env.OMT_PTY_ROWS) || 30;

if (!sessionName || !groupName) {
  process.stderr.write("pty-bridge: OMT_PTY_SESSION and OMT_PTY_GROUP are required\n");
  process.exit(2);
}

// Build a clean env — Node inherits process.env fine, but we override TERM.
const env = { ...process.env, TERM: "xterm-256color" };
delete env.OMT_PTY_SESSION;
delete env.OMT_PTY_GROUP;
delete env.OMT_PTY_COLS;
delete env.OMT_PTY_ROWS;

// `new-session -t` creates a new session grouped with the target. Grouped
// sessions share windows but keep independent per-client sizes, so the
// dashboard won't shrink the user's real terminal.
let term;
try {
  term = pty.spawn(
    "tmux",
    ["new-session", "-s", groupName, "-t", `omt-${sessionName}`, "-x", String(cols), "-y", String(rows)],
    {
      name: "xterm-256color",
      cols,
      rows,
      cwd: process.env.HOME || "/tmp",
      env,
    }
  );
} catch (err) {
  process.stderr.write(`pty-bridge: spawn failed: ${err?.message || err}\n`);
  process.exit(3);
}

// ── pty → stdout (terminal output to the router) ─────────────────────────
term.onData((data) => {
  // Write raw UTF-8; xterm.js accepts it directly.
  process.stdout.write(data);
});

term.onExit(({ exitCode }) => {
  process.exit(exitCode || 0);
});

// ── stdin → pty (input + control frames) ──────────────────────────────────
// Buffer so we can find full \x1e...\n control frames split across chunks.
let pending = "";
process.stdin.on("data", (chunk) => {
  pending += chunk.toString("utf8");
  while (true) {
    const ctrlStart = pending.indexOf(CONTROL_PREFIX);
    if (ctrlStart === -1) {
      // No control frame in sight — flush everything as input.
      if (pending.length > 0) {
        term.write(pending);
        pending = "";
      }
      break;
    }
    // Write anything before the control prefix as normal input first.
    if (ctrlStart > 0) {
      term.write(pending.slice(0, ctrlStart));
      pending = pending.slice(ctrlStart);
    }
    const nl = pending.indexOf("\n");
    if (nl === -1) {
      // Incomplete control frame — wait for more.
      break;
    }
    const raw = pending.slice(CONTROL_PREFIX.length, nl);
    pending = pending.slice(nl + 1);
    handleControl(raw);
  }
});

process.stdin.on("end", () => {
  try {
    term.kill();
  } catch {
    // already gone
  }
});

function handleControl(raw) {
  let msg;
  try {
    msg = JSON.parse(raw);
  } catch {
    return;
  }
  if (msg.kind === "resize" && Number.isFinite(msg.cols) && Number.isFinite(msg.rows)) {
    const c = Math.min(Math.max(10, Math.floor(msg.cols)), 500);
    const r = Math.min(Math.max(5, Math.floor(msg.rows)), 200);
    try {
      term.resize(c, r);
    } catch {
      // pty might have exited
    }
  }
}
