import { useCallback, useEffect } from "react";
import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  DockviewApi,
} from "dockview-react";
import { TerminalPanelComponent } from "@/components/panels/TerminalPanel";
import { ActivityPanelComponent } from "@/components/panels/ActivityPanel";
import { InfoPanelComponent } from "@/components/panels/InfoPanel";
import { LogsPanelComponent } from "@/components/panels/LogsPanel";
import { terminalPanelId, sessionNameFromPanelId } from "@/lib/panel-ids";
import { disposeEntry } from "@/components/TerminalPool";
import { setupLayoutPersistence } from "@/lib/layout-persistence";
import { setupWorkspaceDnd } from "@/lib/workspace-dnd";
import { useKeyboardBindings } from "@/hooks/useKeyboardBindings";
import type { KeyAction } from "@/lib/keybindings";
import { registerClearWorkspace } from "@/components/ResetLayoutButton";
import { toggleCommandPalette } from "@/components/CommandPalette";
import {
  minimizeActivePanel,
  openMinimizedTray,
  registerMinimizeActive,
} from "@/components/MinimizedTray";
import { useTrayStore } from "@/stores/tray";
import { onEvent } from "@/hooks/useEventStream";

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

export function openLogsPanel(sessionName: string): void {
  if (!dockviewApi) return;
  const id = `logs:${sessionName}`;
  const existing = dockviewApi.getPanel(id);
  if (existing) {
    existing.focus();
    return;
  }
  dockviewApi.addPanel({
    id,
    component: "logs",
    title: `Logs — ${sessionName}`,
    params: { sessionName },
  });
}

export function openInfoPanel(sessionName: string): void {
  if (!dockviewApi) return;
  const id = `info:${sessionName}`;
  const existing = dockviewApi.getPanel(id);
  if (existing) {
    existing.focus();
    return;
  }
  dockviewApi.addPanel({
    id,
    component: "info",
    title: `Info — ${sessionName}`,
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
      if (!name) return;
      // Minimize removes the panel from the view but keeps the PTY alive in
      // the pool; only dispose when the removal wasn't a minimize.
      if (useTrayStore.getState().minimized.has(name)) return;
      disposeEntry(name);
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
    registerClearWorkspace(() => {
      event.api.clear();
      event.api.addPanel({
        id: "welcome",
        component: "placeholder",
        title: "Welcome",
      });
    });
    registerMinimizeActive(() => {
      if (!dockviewApi) return;
      const active = dockviewApi.activePanel;
      if (!active) return;
      const name = sessionNameFromPanelId(active.id);
      if (!name) return;
      useTrayStore.getState().minimize(name);
      dockviewApi.removePanel(active);
    });
  };

  // Subscriptions that don't belong inside onReady (which may fire more than
  // once under React 19 StrictMode). We set them up in a proper effect so
  // they're torn down on unmount and never double-register.
  useEffect(() => {
    const unsubTray = useTrayStore.subscribe((state, prev) => {
      for (const name of prev.minimized) {
        if (!state.minimized.has(name)) openOrFocusTerminal(name);
      }
    });

    // When the router tells us a session has been removed (explicit
    // `omt hub remove`, not a stop), drop its pooled terminal so we don't
    // keep a dead PTY alive.
    const offRemoved = onEvent("session.removed", (e) => {
      disposeEntry(e.name);
    });

    return () => {
      unsubTray();
      offRemoved();
    };
  }, []);

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
        minimizeActivePanel();
        break;
      case "open-minimized-tray":
        openMinimizedTray();
        break;
      case "open-command-palette":
        toggleCommandPalette();
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
        info: InfoPanelComponent,
        logs: LogsPanelComponent,
      }}
      onReady={onReady}
    />
  );
}
