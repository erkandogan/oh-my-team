/**
 * <TerminalPane> — xterm.js + PTY WebSocket glue.
 *
 * The component accepts a DOM node (`mountEl`) as a prop rather than owning
 * its own container. This lets a TerminalPool (T11b) hoist xterm DOM above
 * React's tree so tabs can switch without tearing down the terminal state.
 */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { openPtySocket, type PtyHandle } from "@/lib/pty-client";

export interface TerminalPaneProps {
  sessionName: string;
  mountEl: HTMLElement;
}

export interface TerminalPaneHandle {
  focus(): void;
  dispose(): void;
  resize(cols: number, rows: number): void;
}

const TerminalPane = forwardRef<TerminalPaneHandle, TerminalPaneProps>(
  ({ sessionName, mountEl }, ref) => {
    const terminalRef = useRef<Terminal | null>(null);
    const fitAddonRef = useRef<FitAddon | null>(null);
    const ptyRef = useRef<PtyHandle | null>(null);
    const resizeObsRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
      const terminal = new Terminal({
        fontFamily: "monospace",
        fontSize: 14,
        cursorBlink: true,
        theme: {
          background: "#0a0a0a",
          foreground: "#f0f0f0",
          cursor: "#00dcd0",
        },
      });
      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      terminal.open(mountEl);
      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;

      const pty = openPtySocket(
        sessionName,
        (data) => terminal.write(data),
        () => {
          // Socket closed permanently (after dispose). Nothing to do —
          // the terminal will be torn down by the unmount path.
        },
      );
      ptyRef.current = pty;

      const dataSub = terminal.onData((data) => pty.write(data));

      // Send initial size and keep PTY cols/rows in sync with the xterm fit.
      const syncSize = () => {
        try {
          fitAddon.fit();
        } catch {
          // mountEl may not be laid out yet
          return;
        }
        pty.resize(terminal.cols, terminal.rows);
      };
      // Defer first fit to after layout so getBoundingClientRect is non-zero.
      const rafId = requestAnimationFrame(syncSize);

      const observer = new ResizeObserver(() => syncSize());
      observer.observe(mountEl);
      resizeObsRef.current = observer;

      return () => {
        cancelAnimationFrame(rafId);
        observer.disconnect();
        resizeObsRef.current = null;
        dataSub.dispose();
        pty.dispose();
        terminal.dispose();
        ptyRef.current = null;
        fitAddonRef.current = null;
        terminalRef.current = null;
      };
    }, [sessionName, mountEl]);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          terminalRef.current?.focus();
        },
        dispose() {
          ptyRef.current?.dispose();
          terminalRef.current?.dispose();
        },
        resize(cols: number, rows: number) {
          terminalRef.current?.resize(cols, rows);
          ptyRef.current?.resize(cols, rows);
        },
      }),
      [],
    );

    return null;
  },
);

TerminalPane.displayName = "TerminalPane";

export default TerminalPane;
