import { IDockviewPanelProps } from "dockview-react";
import { TerminalMountPoint } from "@/components/TerminalPool";

export interface TerminalPanelParams {
  sessionName: string;
}

export function TerminalPanelComponent({ params }: IDockviewPanelProps<TerminalPanelParams>) {
  const { sessionName } = params;
  return (
    <div className="w-full h-full bg-background">
      <TerminalMountPoint sessionName={sessionName} />
    </div>
  );
}
