import { useEffect } from "react";
import { KEYBINDINGS, matchesBinding, type KeyAction } from "@/lib/keybindings";

type ActionHandler = (action: KeyAction) => void;

export function useKeyboardBindings(onAction: ActionHandler): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      for (const binding of KEYBINDINGS) {
        if (matchesBinding(e, binding)) {
          e.preventDefault();
          e.stopPropagation();
          onAction(binding.action);
          return;
        }
      }
    };
    window.addEventListener("keydown", handler, { capture: true });
    return () => window.removeEventListener("keydown", handler, { capture: true });
  }, [onAction]);
}
