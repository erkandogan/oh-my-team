import { useEffect, useState } from "react";
import { useTrayStore } from "@/stores/tray";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

let openTrayCallback: (() => void) | null = null;
export function registerOpenTray(fn: () => void): void {
  openTrayCallback = fn;
}
export function openMinimizedTray(): void {
  openTrayCallback?.();
}

let minimizeActiveCallback: (() => void) | null = null;
export function registerMinimizeActive(fn: () => void): void {
  minimizeActiveCallback = fn;
}
export function minimizeActivePanel(): void {
  minimizeActiveCallback?.();
}

export default function MinimizedTray() {
  const minimized = useTrayStore((s) => s.minimized);
  const restore = useTrayStore((s) => s.restore);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    registerOpenTray(() => setOpen(true));
    return () => registerOpenTray(() => {});
  }, []);

  if (minimized.size === 0) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
          Minimized ({minimized.size})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[...minimized].map((name) => (
          <DropdownMenuItem key={name} onSelect={() => restore(name)}>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
