import { DockviewApi, positionToDirection } from "dockview-react";
import { terminalPanelId } from "@/lib/panel-ids";

const MIME = "application/omt-session";

type SpawnPayload = { kind: "spawn-session"; name: string };

function readPayload(e: DragEvent): SpawnPayload | null {
  const raw = e.dataTransfer?.getData(MIME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SpawnPayload;
    if (parsed.kind !== "spawn-session" || typeof parsed.name !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setupWorkspaceDnd(api: DockviewApi): () => void {
  const acceptOverlay = api.onUnhandledDragOverEvent((event) => {
    if (event.nativeEvent.dataTransfer?.types.includes(MIME)) {
      event.accept();
    }
  });

  const handleDrop = api.onDidDrop((event) => {
    const payload = readPayload(event.nativeEvent);
    if (!payload) return;

    const id = terminalPanelId(payload.name);
    const existing = api.getPanel(id);
    if (existing) {
      existing.focus();
      return;
    }

    const direction = positionToDirection(event.position);
    api.addPanel({
      id,
      component: "terminal",
      title: payload.name,
      params: { sessionName: payload.name },
      position: event.group
        ? { referenceGroup: event.group, direction }
        : { direction: direction === "within" ? "right" : direction },
    });
  });

  return () => {
    acceptOverlay.dispose();
    handleDrop.dispose();
  };
}
