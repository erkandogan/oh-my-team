import { DockviewReact, DockviewReadyEvent, IDockviewPanelProps } from "dockview-react";

const PlaceholderPanel = (_props: IDockviewPanelProps) => (
  <div className="flex items-center justify-center h-full text-muted-foreground">
    <p>Drag sessions here to open terminals</p>
  </div>
);

export default function Workspace() {
  const onReady = (event: DockviewReadyEvent) => {
    event.api.addPanel({
      id: "welcome",
      component: "placeholder",
      title: "Welcome",
    });
  };

  return (
    <DockviewReact
      className="dockview-theme-dark h-full w-full"
      components={{ placeholder: PlaceholderPanel }}
      onReady={onReady}
    />
  );
}
