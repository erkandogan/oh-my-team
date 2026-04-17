/**
 * Events pushed to dashboard clients over /ws/events. Mirrors the server's
 * DashboardEvent union in channel/dashboard-server.ts, plus a client-generated
 * `system.heartbeat` variant used to detect a stalled connection.
 */
export type DashboardEvent =
  | { type: "session.registered"; name: string; path: string; threadId: string; bridgePort: number; threadDisplayName: string; startedAt: string }
  | { type: "session.removed"; name: string }
  | { type: "session.status"; name: string; current: string | null; done: string[]; elapsedMs: number }
  | { type: "session.status.cleared"; name: string }
  | { type: "router.log"; line: string }
  | { type: "system.heartbeat"; ts: number };

export type EventType = DashboardEvent["type"];
