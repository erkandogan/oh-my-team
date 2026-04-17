/**
 * Zustand mirror of the authoritative session registry owned by the router.
 *
 * Pure read-through: events from /ws/events drive every mutation; UI code
 * only calls selectors. Dockview layout state lives elsewhere — this store
 * holds session metadata only.
 */
import { create } from "zustand";
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
  return useSessionsStore((state) => {
    const all = Object.values(state.byName).filter((s) => s.name !== "hub");
    const q = filter?.trim().toLowerCase();
    const matched = q
      ? all.filter((s) => s.name.toLowerCase().includes(q) || s.path.toLowerCase().includes(q))
      : all;
    return matched.sort((a, b) => a.name.localeCompare(b.name));
  });
}

export function useSession(name: string): Session | undefined {
  return useSessionsStore((state) => state.byName[name]);
}

let initialized = false;
export function initSessionsStore(): void {
  if (initialized) return;
  initialized = true;
  const { upsert, remove, setStatus } = useSessionsStore.getState();

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
