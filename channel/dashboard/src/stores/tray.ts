import { create } from "zustand";

interface TrayState {
  minimized: Set<string>;
  minimize: (sessionName: string) => void;
  restore: (sessionName: string) => void;
}

export const useTrayStore = create<TrayState>((set) => ({
  minimized: new Set(),
  minimize: (name) =>
    set((s) => ({ minimized: new Set([...s.minimized, name]) })),
  restore: (name) =>
    set((s) => {
      const next = new Set(s.minimized);
      next.delete(name);
      return { minimized: next };
    }),
}));
