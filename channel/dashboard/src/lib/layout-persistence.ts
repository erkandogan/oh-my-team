import { DockviewApi } from "dockview-react";

const STORAGE_KEY = "omt.workspace.layout.v1";
const DEBOUNCE_MS = 500;

export function setupLayoutPersistence(api: DockviewApi): () => void {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      api.fromJSON(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  const save = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(api.toJSON()));
      } catch {
        // localStorage full — ignore
      }
    }, DEBOUNCE_MS);
  };

  const unsub = api.onDidLayoutChange(save);
  return () => {
    if (timer) clearTimeout(timer);
    unsub.dispose();
  };
}

export function clearSavedLayout(): void {
  localStorage.removeItem(STORAGE_KEY);
}
