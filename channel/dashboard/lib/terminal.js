/**
 * Interactive terminal — xterm.js attached to a tmux PTY over WebSocket.
 *
 * Lifecycle:
 *   mountTerminal(containerEl)         — called once at boot
 *   openTerminal(sessionName)          — called when the Terminal tab
 *                                        becomes visible for a session
 *   closeTerminal()                    — called on tab hide / session switch
 *
 * The PTY connection is created lazily and torn down when the user leaves
 * the tab, so inactive terminals don't consume resources.
 */

// Globals exposed by the vendored UMD builds. Loaded dynamically in mount()
// so a missing xterm bundle doesn't block the rest of the dashboard.
let Terminal = null;
let FitAddon = null;

const CONTROL_PREFIX = "\x1e"; // matches channel/dashboard-pty.ts

let container = null;
let term = null;
let fit = null;
let socket = null;
let resizeObserver = null;
let currentSession = null;

export async function mountTerminal(el) {
  container = el;
  if (Terminal && FitAddon) return;
  try {
    await loadVendorStyles();
    // xterm and the fit addon ship as UMD — loading the script attaches
    // `window.Terminal` / `window.FitAddon` which we grab below.
    await loadScript("/dashboard/vendor/xterm/xterm.js");
    await loadScript("/dashboard/vendor/xterm/addon-fit.js");
    // eslint-disable-next-line no-undef
    Terminal = window.Terminal;
    // eslint-disable-next-line no-undef
    FitAddon = window.FitAddon?.FitAddon || window.FitAddon;
  } catch (err) {
    console.error("[omt] terminal assets failed to load:", err);
  }
}

export function openTerminal(sessionName) {
  if (!container || !Terminal) return;
  if (currentSession === sessionName && term) return; // already attached

  closeTerminal(); // tear down any previous session

  currentSession = sessionName;
  container.innerHTML = "";

  term = new Terminal({
    cursorBlink: true,
    fontSize: 13,
    fontFamily:
      '"SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", Menlo, monospace',
    theme: {
      background: "#000000",
      foreground: "#f2f2f2",
      cursor: "#00dcd0",
      selectionBackground: "rgba(0, 220, 208, 0.3)",
    },
    scrollback: 10_000,
    allowTransparency: false,
  });
  fit = new FitAddon();
  term.loadAddon(fit);
  term.open(container);
  fit.fit();

  // Connect the PTY WebSocket
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  const url = `${proto}//${location.host}/ws/tmux/${encodeURIComponent(sessionName)}`;
  socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";

  socket.addEventListener("open", () => {
    sendResize();
    term.focus();
  });

  socket.addEventListener("message", (ev) => {
    const data = typeof ev.data === "string" ? ev.data : new TextDecoder().decode(ev.data);
    // Control frames are JSON prefixed with RS (\x1e). Everything else is
    // raw terminal output.
    if (data.startsWith(CONTROL_PREFIX)) {
      handleControl(data.slice(CONTROL_PREFIX.length));
    } else {
      term.write(data);
    }
  });

  socket.addEventListener("close", () => {
    term?.write("\r\n\x1b[2;33m[disconnected]\x1b[0m\r\n");
  });

  // Client input → PTY stdin
  term.onData((data) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    }
  });

  // Auto-fit on container resize (e.g. sidebar collapse, window resize)
  resizeObserver = new ResizeObserver(() => {
    fit?.fit();
    sendResize();
  });
  resizeObserver.observe(container);
}

export function closeTerminal() {
  currentSession = null;
  if (socket) {
    try {
      socket.close();
    } catch {
      // already closed
    }
    socket = null;
  }
  resizeObserver?.disconnect();
  resizeObserver = null;
  term?.dispose();
  term = null;
  fit = null;
  if (container) container.innerHTML = "";
}

// ── Helpers ────────────────────────────────────────────────────────────────

function sendResize() {
  if (!term || !socket || socket.readyState !== WebSocket.OPEN) return;
  const payload = JSON.stringify({
    kind: "resize",
    cols: term.cols,
    rows: term.rows,
  });
  socket.send(CONTROL_PREFIX + payload);
}

function handleControl(raw) {
  let msg;
  try {
    msg = JSON.parse(raw);
  } catch {
    return;
  }
  if (msg.kind === "error") {
    term.write(`\r\n\x1b[2;31m[error]\x1b[0m ${msg.message}\r\n`);
  }
  if (msg.kind === "exit") {
    term.write(`\r\n\x1b[2;33m[pty exited: ${msg.exitCode}]\x1b[0m\r\n`);
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false; // preserve order
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`failed to load ${src}`));
    document.head.appendChild(s);
  });
}

function loadVendorStyles() {
  return new Promise((resolve, reject) => {
    // Idempotent — don't double-inject on rapid tab switches
    if (document.querySelector('link[data-xterm-css]')) return resolve();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/dashboard/vendor/xterm/xterm.css";
    link.dataset.xtermCss = "true";
    link.onload = () => resolve();
    link.onerror = () => reject(new Error("failed to load xterm.css"));
    document.head.appendChild(link);
  });
}
