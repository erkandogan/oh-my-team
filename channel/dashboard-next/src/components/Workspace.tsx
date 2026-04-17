import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  DockviewApi,
} from "dockview-react";
import { TerminalPanelComponent } from "@/components/panels/TerminalPanel";
import { ActivityPanelComponent } from "@/components/panels/ActivityPanel";
import { terminalPanelId, sessionNameFromPanelId } from "@/lib/panel-ids";
import { disposeEntry } from "@/components/TerminalPool";
import { setupLayoutPersistence } from "@/lib/layout-persistence";
import { setupWorkspaceDnd } from "@/lib/workspace-dnd";

let dockviewApi: DockviewApi | null = null;

export function openOrFocusTerminal(sessionName: string): void {
  if (!dockviewApi) return;
  const id = terminalPanelId(sessionName);
  const existing = dockviewApi.getPanel(id);
  if (existing) {
    existing.focus();
    return;
  }
  dockviewApi.addPanel({
    id,
    component: "terminal",
    title: sessionName,
    params: { sessionName },
  });
}

export function openActivityPanel(sessionName: string): void {
  if (!dockviewApi) return;
  const id = `activity:${sessionName}`;
  const existing = dockviewApi.getPanel(id);
  if (existing) {
    existing.focus();
    return;
  }
  dockviewApi.addPanel({
    id,
    component: "activity",
    title: `Activity — ${sessionName}`,
    params: { sessionName },
  });
}

const PlaceholderPanel = (_props: IDockviewPanelProps) => (
  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
    <p>Drag sessions here or click a session to open a terminal</p>
  </div>
);

export default function Workspace() {
  const onReady = (event: DockviewReadyEvent) => {
    dockviewApi = event.api;
    event.api.onDidRemovePanel((panel) => {
      const name = sessionNameFromPanelId(panel.id);
      if (name) disposeEntry(name);
    });
    const hasSaved = !!localStorage.getItem("omt.workspace.layout.v1");
    if (!hasSaved) {
      event.api.addPanel({
        id: "welcome",
        component: "placeholder",
        title: "Welcome",
      });
    }
    setupLayoutPersistence(event.api);
    setupWorkspaceDnd(event.api);
  };

  return (
    <DockviewReact
      className="dockview-theme-dark h-full w-full"
      components={{
        placeholder: PlaceholderPanel,
        terminal: TerminalPanelComponent,
        activity: ActivityPanelComponent,
      }}
      onReady={onReady}
    />
  );
}
