import { useCallback } from "react";
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
import { useKeyboardBindings } from "@/hooks/useKeyboardBindings";
import type { KeyAction } from "@/lib/keybindings";

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

  const handleKeyAction = useCallback((action: KeyAction) => {
    if (!dockviewApi) return;
    switch (action) {
      case "focus-next-right":
      case "focus-next-left":
      case "focus-next-up":
      case "focus-next-down": {
        const panels = dockviewApi.panels;
        if (panels.length <= 1) return;
        const activeIdx = panels.findIndex((p) => p.api.isActive);
        if (activeIdx === -1) return;
        const delta =
          action === "focus-next-right" || action === "focus-next-down" ? 1 : -1;
        const nextIdx = (activeIdx + delta + panels.length) % panels.length;
        panels[nextIdx].focus();
        break;
      }
      case "close-focused-panel": {
        const active = dockviewApi.activePanel;
        if (active) dockviewApi.removePanel(active);
        break;
      }
      case "minimize-focused-panel":
        break;
      case "open-minimized-tray":
        break;
      case "open-command-palette":
        break;
    }
  }, []);

  useKeyboardBindings(handleKeyAction);

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
