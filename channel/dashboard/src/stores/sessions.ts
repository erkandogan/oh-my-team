/**
 * Zustand mirror of the authoritative session registry owned by the router.
 *
 * Pure read-through: events from /ws/events drive every mutation; UI code
 * only calls selectors. Dockview layout state lives elsewhere — this store
 * holds session metadata only.
 */
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { onEvent } from "../hooks/useEventStream";

export interface Session {
  name: string;
  path: string;
  bridgePort: number;
  threadId: string;
  threadDisplayName?: string;
  startedAt?: string;
  status?: "working" | "idle";
}

interface SessionsState {
  byName: Record<string, Session>;
  upsert: (row: Partial<Session> & { name: string }) => void;
  remove: (name: string) => void;
  setStatus: (name: string, status: Session["status"]) => void;
}

const useSessionsStore = create<SessionsState>((set) => ({
  byName: {},
  upsert: (row) =>
    set((state) => ({
      byName: {
        ...state.byName,
        [row.name]: { ...state.byName[row.name], ...row } as Session,
      },
    })),
  remove: (name) =>
    set((state) => {
      if (!(name in state.byName)) return state;
      const next = { ...state.byName };
      delete next[name];
      return { byName: next };
    }),
  setStatus: (name, status) =>
    set((state) => {
      const existing = state.byName[name];
      if (!existing || existing.status === status) return state;
      return { byName: { ...state.byName, [name]: { ...existing, status } } };
    }),
}));

export function useSessions(filter?: string): Session[] {
  // useShallow makes the derived array identity-stable when the underlying
  // sessions haven't changed — critical, because this selector returns a
  // freshly-allocated filtered+sorted array on every call, and zustand's
  // default referential equality would otherwise trigger an infinite render
  // loop (React #185) as every state tick produces a new array reference.
  return useSessionsStore(
    useShallow((state) => {
      const all = Object.values(state.byName).filter((s) => s.name !== "hub");
      const q = filter?.trim().toLowerCase();
      const matched = q
        ? all.filter(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.path.toLowerCase().includes(q),
          )
        : all;
      return matched.sort((a, b) => a.name.localeCompare(b.name));
    }),
  );
}

export function useSession(name: string): Session | undefined {
  return useSessionsStore((state) => state.byName[name]);
}

let initialized = false;
export function initSessionsStore(): void {
  if (initialized) return;
  initialized = true;
  const { upsert, remove, setStatus } = useSessionsStore.getState();

  // One-time hydration of sessions that already exist before we connected.
  // The event stream only fires for state CHANGES after subscription, so
  // without this the sidebar appears empty on a reload even when sessions
  // are running.
  void fetch("/sessions")
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (!data || typeof data !== "object") return;
      for (const [name, info] of Object.entries(data as Record<string, Partial<Session>>)) {
        upsert({ name, ...info });
      }
    })
    .catch(() => {
      // Router may be unreachable at boot; the event stream will catch up later.
    });

  onEvent("session.registered", (e) =>
    upsert({
      name: e.name,
      path: e.path,
      bridgePort: e.bridgePort,
      threadId: e.threadId,
      threadDisplayName: e.threadDisplayName,
      startedAt: e.startedAt,
    }),
  );
  onEvent("session.removed", (e) => remove(e.name));
  onEvent("session.status", (e) => setStatus(e.name, e.current ? "working" : "idle"));
  onEvent("session.status.cleared", (e) => setStatus(e.name, "idle"));
}
