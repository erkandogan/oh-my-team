import { useState } from "react";
import { IDockviewPanelProps } from "dockview-react";
import { MoreHorizontal } from "lucide-react";
import { TerminalMountPoint } from "@/components/TerminalPool";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { openActivityPanel, openInfoPanel } from "@/components/Workspace";

export interface TerminalPanelParams {
  sessionName: string;
}

export function TerminalPanelComponent({ params, api }: IDockviewPanelProps<TerminalPanelParams>) {
  const { sessionName } = params;
  const [stopOpen, setStopOpen] = useState(false);

  return (
    <div className="flex flex-col w-full h-full bg-background">
      <div className="flex items-center justify-between h-8 px-3 border-b border-border shrink-0 bg-card">
        <span className="text-xs text-muted-foreground">{sessionName}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => openActivityPanel(sessionName)}>
              + Activity
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => apiClient.restart(sessionName)}>
              Restart
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setStopOpen(true)}
              className="text-destructive"
            >
              Stop
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => api.close()}>Close</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 min-h-0">
        <TerminalMountPoint sessionName={sessionName} />
      </div>

      <Dialog open={stopOpen} onOpenChange={setStopOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stop session?</DialogTitle>
            <DialogDescription>
              This will terminate the {sessionName} session. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStopOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                apiClient.stop(sessionName);
                setStopOpen(false);
              }}
            >
              Stop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
