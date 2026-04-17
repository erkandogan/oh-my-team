import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSessions } from "@/stores/sessions";
import { openOrFocusTerminal } from "@/components/Workspace";

let togglePaletteCallback: (() => void) | null = null;

export function registerTogglePalette(fn: () => void): void {
  togglePaletteCallback = fn;
}

export function toggleCommandPalette(): void {
  togglePaletteCallback?.();
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const sessions = useSessions();

  useEffect(() => {
    registerTogglePalette(() => setOpen((v) => !v));
    return () => {
      togglePaletteCallback = null;
    };
  }, []);

  const handleSelect = (sessionName: string) => {
    openOrFocusTerminal(sessionName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 max-w-lg">
        <Command className="rounded-lg">
          <CommandInput placeholder="Search sessions…" />
          <CommandList>
            <CommandEmpty>No sessions found.</CommandEmpty>
            <CommandGroup heading="Sessions">
              {sessions.map((s) => (
                <CommandItem
                  key={s.name}
                  value={s.name}
                  onSelect={handleSelect}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="ml-2 text-muted-foreground text-xs truncate">
                    {s.path}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
