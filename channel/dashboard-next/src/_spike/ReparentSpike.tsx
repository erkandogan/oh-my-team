/**
 * T11a SPIKE — THROWAWAY.
 *
 * Proves DOM-reparenting of an xterm.js terminal between two parent elements
 * preserves scrollback, PTY connection and re-fits correctly. Deleted at T24.
 */
import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { openPtySocket, type PtyHandle } from "@/lib/pty-client";

interface Singleton {
  terminal: Terminal;
  fitAddon: FitAddon;
  pty: PtyHandle;
  host: HTMLDivElement;
}

let singleton: Singleton | null = null;

function getSingleton(log: (msg: string) => void): Singleton {
  if (singleton) return singleton;
  const host = document.createElement("div");
  host.style.width = "100%";
  host.style.height = "100%";
  const terminal = new Terminal({
    fontFamily: "monospace",
    fontSize: 14,
    cursorBlink: true,
    theme: { background: "#0a0a0a", foreground: "#f0f0f0", cursor: "#00dcd0" },
  });
  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  terminal.open(host);
  const pty = openPtySocket(
    "hub",
    (data) => terminal.write(data),
    () => log("pty socket closed"),
  );
  terminal.onData((data) => pty.write(data));
  singleton = { terminal, fitAddon, pty, host };
  return singleton;
}

export default function ReparentSpike() {
  const aRef = useRef<HTMLDivElement | null>(null);
  const bRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const startRef = useRef(performance.now());

  const log = (msg: string) => {
    const t = ((performance.now() - startRef.current) / 1000).toFixed(1);
    setLogs((prev) => [...prev, `[${t}s] ${msg}`]);
  };

  const reparent = (target: "A" | "B") => {
    const s = getSingleton(log);
    const parent = target === "A" ? aRef.current : bRef.current;
    if (!parent) return;
    parent.appendChild(s.host);
    observerRef.current?.disconnect();
    const obs = new ResizeObserver(() => {
      log(`ResizeObserver fired in ${target}`);
      try {
        s.fitAddon.fit();
        s.pty.resize(s.terminal.cols, s.terminal.rows);
      } catch {
        /* parent not laid out yet */
      }
    });
    obs.observe(parent);
    observerRef.current = obs;
    requestAnimationFrame(() => {
      try {
        s.fitAddon.fit();
        s.pty.resize(s.terminal.cols, s.terminal.rows);
      } catch {
        /* parent not laid out yet */
      }
    });
    log(`Reparented to ${target} (cols=${s.terminal.cols} rows=${s.terminal.rows})`);
  };

  useEffect(() => {
    reparent("A");
    return () => {
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#111", color: "#eee", fontFamily: "monospace" }}>
      <div style={{ padding: 8, borderBottom: "1px solid #333", display: "flex", gap: 8 }}>
        <strong>T11a reparent spike</strong>
        <button onClick={() => reparent("A")} style={btn}>Reparent → A</button>
        <button onClick={() => reparent("B")} style={btn}>Reparent → B</button>
        <span style={{ opacity: 0.6 }}>session: hub</span>
      </div>
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <div style={{ flex: 1, border: "1px dashed #444", margin: 4, position: "relative" }}>
          <div style={label}>A</div>
          <div ref={aRef} style={slot} />
        </div>
        <div style={{ flex: 1, border: "1px dashed #444", margin: 4, position: "relative" }}>
          <div style={label}>B</div>
          <div ref={bRef} style={slot} />
        </div>
      </div>
      <pre style={{ maxHeight: 140, overflow: "auto", margin: 0, padding: 8, borderTop: "1px solid #333", background: "#000" }}>
        {logs.join("\n")}
      </pre>
    </div>
  );
}

const btn: React.CSSProperties = {
  background: "#222",
  color: "#eee",
  border: "1px solid #444",
  padding: "2px 10px",
  cursor: "pointer",
};
const label: React.CSSProperties = {
  position: "absolute",
  top: 4,
  left: 6,
  opacity: 0.5,
  pointerEvents: "none",
  zIndex: 1,
};
const slot: React.CSSProperties = {
  position: "absolute",
  inset: 20,
};
