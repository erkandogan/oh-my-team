/**
 * Tiny event bus wrapping the /ws/events WebSocket.
 *
 * The connection is module-scope so every component that calls useEventStream
 * shares one socket. Reconnects with exponential backoff (500ms → 10s) so a
 * router restart doesn't leave the dashboard permanently stale.
 */
import { useEffect } from "react";
import type { DashboardEvent, EventType } from "@/lib/event-types";

type Listener = (event: DashboardEvent) => void;

const listeners = new Map<EventType, Set<Listener>>();
let socket: WebSocket | null = null;
let retryDelayMs = 500;
const MAX_DELAY_MS = 10_000;
const HEARTBEAT_MS = 5_000;

declare global {
  interface Window {
    __omtEvents?: { log: DashboardEvent[] };
  }
}

function emit(event: DashboardEvent) {
  if (import.meta.env.DEV) {
    const buf = (window.__omtEvents ??= { log: [] });
    buf.log.push(event);
    if (buf.log.length > 50) buf.log.shift();
  }
  const set = listeners.get(event.type);
  if (!set) return;
  for (const fn of set) fn(event);
}

function connect() {
  if (socket && socket.readyState <= 1) return;
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  socket = new WebSocket(`${proto}//${location.host}/ws/events`);

  socket.addEventListener("open", () => {
    retryDelayMs = 500;
  });

  socket.addEventListener("message", (ev) => {
    let msg: unknown;
    try {
      msg = JSON.parse(ev.data);
    } catch {
      return;
    }
    if (msg && typeof (msg as { type?: unknown }).type === "string") {
      emit(msg as DashboardEvent);
    }
  });

  socket.addEventListener("close", () => {
    setTimeout(connect, retryDelayMs);
    retryDelayMs = Math.min(retryDelayMs * 2, MAX_DELAY_MS);
  });

  socket.addEventListener("error", () => {
    // close fires next and owns the reconnect.
  });
}

let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
function startHeartbeat() {
  if (heartbeatTimer) return;
  heartbeatTimer = setInterval(() => {
    if (socket && socket.readyState === 1) {
      emit({ type: "system.heartbeat", ts: Date.now() });
    }
  }, HEARTBEAT_MS);
}

export function connectEventStream(): void {
  connect();
  startHeartbeat();
}

export function onEvent<T extends DashboardEvent>(
  type: T["type"],
  handler: (event: T) => void,
): () => void {
  let set = listeners.get(type);
  if (!set) {
    set = new Set();
    listeners.set(type, set);
  }
  const fn = handler as Listener;
  set.add(fn);
  return () => {
    set!.delete(fn);
  };
}

export function useEventStream<T extends DashboardEvent>(
  type: T["type"],
  handler: (event: T) => void,
): void {
  useEffect(() => onEvent<T>(type, handler), [type, handler]);
}
