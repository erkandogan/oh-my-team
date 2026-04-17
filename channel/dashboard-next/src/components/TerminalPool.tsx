/**
 * TerminalPool — module-scope singleton pool of long-lived xterm terminals.
 *
 * One Terminal + FitAddon + PtyHandle per session. The xterm DOM subtree lives
 * on a detached "host" div, created once and opened against a hidden parking
 * root so the initial render has real (hidden) dimensions. Mount-points
 * (TerminalMountPoint / useTerminalMount) move the host between React-rendered
 * slots with a plain `appendChild`; on cleanup the host is parked again. This
 * preserves scrollback, WebSocket, and renderer state across tab switches.
 *
 * See `.sisyphus/notepads/dashboard-workspace-t11a.md` for the contract.
 */
import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { openPtySocket, type PtyHandle } from "@/lib/pty-client";

interface PoolEntry {
  host: HTMLDivElement;
  terminal: Terminal;
  fitAddon: FitAddon;
  pty: PtyHandle;
}

let parkingRoot: HTMLDivElement | null = null;

function getParkingRoot(): HTMLDivElement {
  if (parkingRoot) return parkingRoot;
  const root = document.createElement("div");
  root.setAttribute("data-terminal-pool-parking", "");
  root.style.cssText =
    "position:absolute;visibility:hidden;left:-99999px;top:-99999px;width:600px;height:400px;";
  document.body.appendChild(root);
  parkingRoot = root;
  return root;
}

const pool = new Map<string, PoolEntry>();

function ensureEntry(sessionName: string): PoolEntry {
  const existing = pool.get(sessionName);
  if (existing) return existing;

  const host = document.createElement("div");
  host.style.cssText = "width:100%;height:100%;";

  const terminal = new Terminal({
    fontFamily: "monospace, 'Courier New'",
    fontSize: 14,
    cursorBlink: true,
    theme: {
      background: "#0a0a0a",
      foreground: "#f0f0f0",
      cursor: "#00dcd0",
    },
    allowProposedApi: true,
  });
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);

  getParkingRoot().appendChild(host);
  terminal.open(host);

  const pty = openPtySocket(
    sessionName,
    (data) => terminal.write(data),
    () => {
      // Socket closed — leave the terminal alive so a reconnect can resume it.
    },
  );
  terminal.onData((data) => pty.write(data));

  const entry: PoolEntry = { host, terminal, fitAddon, pty };
  pool.set(sessionName, entry);
  return entry;
}

/**
 * Tear down a pooled session. Only called by explicit "close session" UI —
 * mounting/unmounting a MountPoint does NOT dispose.
 */
export function disposeEntry(sessionName: string): void {
  const entry = pool.get(sessionName);
  if (!entry) return;
  entry.pty.dispose();
  entry.terminal.dispose();
  entry.host.remove();
  pool.delete(sessionName);
}

/**
 * Mount the pool entry for `sessionName` into `slot` for the duration of the
 * effect. On cleanup, the host returns to the parking root so the terminal
 * keeps running and can be remounted elsewhere.
 */
export function useTerminalMount(
  sessionName: string,
  slot: HTMLElement | null,
  options?: { focusOnMount?: boolean },
): void {
  const focusOnMount = options?.focusOnMount ?? false;

  useEffect(() => {
    if (!slot) return;
    const entry = ensureEntry(sessionName);

    let observer: ResizeObserver | null = null;
    let cancelled = false;

    const doFit = () => {
      try {
        entry.fitAddon.fit();
      } catch {
        // slot not laid out yet — next RO callback will retry.
        return;
      }
      const dims = entry.fitAddon.proposeDimensions();
      if (dims) entry.pty.resize(dims.cols, dims.rows);
    };

    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;
      slot.appendChild(entry.host);
      if (focusOnMount) entry.terminal.focus();
      doFit();
      observer = new ResizeObserver(doFit);
      observer.observe(slot);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      getParkingRoot().appendChild(entry.host);
    };
  }, [sessionName, slot, focusOnMount]);
}

/**
 * Drop-in mount-point for panel bodies. Renders an empty flex-sized div and
 * hosts the pooled terminal inside it for the component's lifetime.
 */
export function TerminalMountPoint({
  sessionName,
  focusOnMount,
}: {
  sessionName: string;
  focusOnMount?: boolean;
}) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [slot, setSlot] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    setSlot(slotRef.current);
  }, []);
  useTerminalMount(sessionName, slot, { focusOnMount });
  return <div ref={slotRef} className="w-full h-full" />;
}
