export interface KeyBinding {
  key: string;
  ctrl: boolean;
  shift: boolean;
  meta: boolean;
  action: KeyAction;
}

export type KeyAction =
  | "focus-next-right"
  | "focus-next-left"
  | "focus-next-up"
  | "focus-next-down"
  | "close-focused-panel"
  | "minimize-focused-panel"
  | "open-minimized-tray"
  | "open-command-palette";

export const KEYBINDINGS: KeyBinding[] = [
  { key: "ArrowRight", ctrl: true, shift: true, meta: false, action: "focus-next-right" },
  { key: "ArrowLeft", ctrl: true, shift: true, meta: false, action: "focus-next-left" },
  { key: "ArrowUp", ctrl: true, shift: true, meta: false, action: "focus-next-up" },
  { key: "ArrowDown", ctrl: true, shift: true, meta: false, action: "focus-next-down" },
  { key: "W", ctrl: true, shift: true, meta: false, action: "close-focused-panel" },
  { key: "M", ctrl: true, shift: true, meta: false, action: "minimize-focused-panel" },
  { key: "R", ctrl: true, shift: true, meta: false, action: "open-minimized-tray" },
  { key: "k", ctrl: false, shift: false, meta: true, action: "open-command-palette" },
];

export function matchesBinding(e: KeyboardEvent, binding: KeyBinding): boolean {
  return (
    e.key === binding.key &&
    e.ctrlKey === binding.ctrl &&
    e.shiftKey === binding.shift &&
    e.metaKey === binding.meta
  );
}
