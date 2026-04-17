import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { clearSavedLayout } from "@/lib/layout-persistence";

let clearWorkspaceCallback: (() => void) | null = null;

export function registerClearWorkspace(fn: () => void): void {
  clearWorkspaceCallback = fn;
}

export default function ResetLayoutButton() {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    clearSavedLayout();
    clearWorkspaceCallback?.();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-muted-foreground h-6 px-2"
        onClick={() => setOpen(true)}
      >
        Reset layout
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset workspace?</DialogTitle>
            <DialogDescription>
              This will close all open panels and clear your saved layout. You
              can reopen sessions from the sidebar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
