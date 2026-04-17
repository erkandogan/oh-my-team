/**
 * Thin WebSocket client for the /ws/tmux/:name PTY bridge.
 *
 * The server-side protocol (see channel/dashboard-pty.ts and pty-bridge.cjs):
 *   - Data frames: raw terminal bytes, both directions.
 *   - Control frames: text starting with \x1e (Record Separator), ending at \n.
 *     Carry JSON — e.g. {"kind":"resize","cols":N,"rows":M}.
 * We only ever SEND control frames (resize, exit); frames received from the
 * server are informational (error / exit) and ignored by the terminal itself.
 */

const CONTROL_PREFIX = "\x1e";
const BACKOFF_MIN_MS = 500;
const BACKOFF_MAX_MS = 10_000;

export interface PtyHandle {
  write(data: string): void;
  resize(cols: number, rows: number): void;
  dispose(): void;
}

export function openPtySocket(
  sessionName: string,
  onData: (data: string) => void,
  onClose: () => void,
): PtyHandle {
  let socket: WebSocket | null = null;
  let disposed = false;
  let hasConnectedOnce = false;
  let retryDelayMs = BACKOFF_MIN_MS;
  let retryTimer: ReturnType<typeof setTimeout> | null = null;
  const pendingSends: string[] = [];

  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  const url = `${proto}//${location.host}/ws/tmux/${encodeURIComponent(sessionName)}`;

  function connect() {
    if (disposed) return;
    socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      hasConnectedOnce = true;
      retryDelayMs = BACKOFF_MIN_MS;
      for (const msg of pendingSends) socket?.send(msg);
      pendingSends.length = 0;
    });

    socket.addEventListener("message", (ev) => {
      const data = typeof ev.data === "string" ? ev.data : "";
      if (!data) return;
      // Server-originated control frames are informational — skip them so
      // xterm doesn't render the RS byte or JSON payload.
      if (data.startsWith(CONTROL_PREFIX)) return;
      onData(data);
    });

    socket.addEventListener("close", (ev) => {
      socket = null;
      if (disposed) {
        onClose();
        return;
      }
      // If we never successfully opened a session (e.g. the server returned
      // a protocol error on upgrade — tmux session missing, path rejected),
      // don't retry forever. This commonly happens when a restored layout
      // references a session that no longer exists; backing off for 10s per
      // phantom panel forever would waste network / logs / router attention.
      if (!hasConnectedOnce && (ev.code === 1011 || ev.code === 1006)) {
        disposed = true;
        onClose();
        return;
      }
      retryTimer = setTimeout(connect, retryDelayMs);
      retryDelayMs = Math.min(retryDelayMs * 2, BACKOFF_MAX_MS);
    });

    socket.addEventListener("error", () => {
      // close fires next and owns the reconnect.
    });
  }

  function send(msg: string) {
    if (socket && socket.readyState === 1) {
      socket.send(msg);
    } else if (!disposed) {
      pendingSends.push(msg);
    }
  }

  connect();

  return {
    write(data: string) {
      send(data);
    },
    resize(cols: number, rows: number) {
      send(
        CONTROL_PREFIX +
          JSON.stringify({ kind: "resize", cols, rows }) +
          "\n",
      );
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
      if (socket && socket.readyState === 1) {
        try {
          socket.send(
            CONTROL_PREFIX + JSON.stringify({ kind: "exit" }) + "\n",
          );
        } catch {
          // already closing
        }
      }
      try {
        socket?.close(1000, "client dispose");
      } catch {
        // already closed
      }
      socket = null;
    },
  };
}
