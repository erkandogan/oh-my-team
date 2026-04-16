/**
 * Tiny event bus wrapping the /ws/events WebSocket.
 *
 * Reconnects with exponential backoff so a killed router (or a `omt hub
 * stop` → `start` cycle) doesn't leave the dashboard permanently stale.
 */

const listeners = new Map(); // event type → Set<fn>
let socket = null;
let retryDelayMs = 500;
const MAX_DELAY_MS = 10_000;

function emit(type, payload) {
  const set = listeners.get(type);
  if (!set) return;
  for (const fn of set) {
    try {
      fn(payload);
    } catch (err) {
      console.error(`[omt] listener for ${type} threw:`, err);
    }
  }
}

function connect() {
  if (socket && socket.readyState <= 1) return; // already connecting / open
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  const url = `${proto}//${location.host}/ws/events`;
  socket = new WebSocket(url);

  socket.addEventListener("open", () => {
    retryDelayMs = 500; // reset backoff once we've reconnected
    emit("ws.open", null);
  });

  socket.addEventListener("message", (ev) => {
    let msg;
    try {
      msg = JSON.parse(ev.data);
    } catch {
      return;
    }
    if (msg && typeof msg.type === "string") {
      emit(msg.type, msg);
    }
  });

  socket.addEventListener("close", () => {
    emit("ws.close", null);
    // Reconnect after backoff. Doubling the delay each time caps at 10s so
    // we don't hammer a router that's permanently gone.
    setTimeout(connect, retryDelayMs);
    retryDelayMs = Math.min(retryDelayMs * 2, MAX_DELAY_MS);
  });

  socket.addEventListener("error", () => {
    // Don't emit; the close handler will fire next and handle reconnect.
  });
}

export const events = {
  connect,
  on(type, fn) {
    let set = listeners.get(type);
    if (!set) {
      set = new Set();
      listeners.set(type, set);
    }
    set.add(fn);
    return () => set.delete(fn);
  },
};
