import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TerminalPane from "@/components/TerminalPane";
import { useTerminalMount } from "@/components/TerminalPool";
import TopBar from "@/components/TopBar";
import Workspace from "@/components/Workspace";
import CommandPalette from "@/components/CommandPalette";
import ReparentSpike from "@/_spike/ReparentSpike";

export default function App() {
  if (window.location.pathname === "/workspace/__terminal-test") {
    return <TerminalTestRoute />;
  }
  if (window.location.pathname === "/workspace/__pool-test") {
    return <PoolTestRoute />;
  }
  if (window.location.pathname === "/workspace/_spike") {
    return <ReparentSpike />;
  }
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <Workspace />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}

function TerminalTestRoute() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mountEl, setMountEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMountEl(containerRef.current);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a0a",
        color: "#f0f0f0",
        fontFamily: "monospace",
      }}
    >
      <p style={{ margin: 0, padding: "8px 12px", borderBottom: "1px solid #222" }}>
        Session: hub
      </p>
      <div ref={containerRef} style={{ flex: 1, minHeight: 0 }}>
        {mountEl && <TerminalPane sessionName="hub" mountEl={mountEl} />}
      </div>
    </div>
  );
}

function PoolTestRoute() {
  const slotARef = useRef<HTMLDivElement | null>(null);
  const slotBRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<"A" | "B">("A");
  const [activeSlot, setActiveSlot] = useState<HTMLDivElement | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const startRef = useRef(performance.now());

  useEffect(() => {
    setActiveSlot(active === "A" ? slotARef.current : slotBRef.current);
    const t = ((performance.now() - startRef.current) / 1000).toFixed(2);
    setLogs((prev) => [...prev, `[${t}s] reparent -> ${active}`]);
  }, [active]);

  useTerminalMount("hub", activeSlot);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#111",
        color: "#eee",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          padding: 8,
          borderBottom: "1px solid #333",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <strong>T11b pool test</strong>
        <button
          onClick={() => setActive(active === "A" ? "B" : "A")}
          style={{
            background: "#222",
            color: "#eee",
            border: "1px solid #444",
            padding: "4px 12px",
            cursor: "pointer",
          }}
        >
          Show in Slot {active === "A" ? "B" : "A"}
        </button>
        <span style={{ opacity: 0.6 }}>
          session: hub · active: {active}
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, padding: 8 }}>
        <div
          style={{
            flex: 1,
            height: 300,
            border:
              active === "A" ? "1px solid #00dcd0" : "1px dashed #444",
            position: "relative",
          }}
        >
          <div style={poolLabel}>Slot A</div>
          <div ref={slotARef} style={poolSlot} />
        </div>
        <div
          style={{
            flex: 1,
            height: 300,
            border:
              active === "B" ? "1px solid #00dcd0" : "1px dashed #444",
            position: "relative",
          }}
        >
          <div style={poolLabel}>Slot B</div>
          <div ref={slotBRef} style={poolSlot} />
        </div>
      </div>
      <pre
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          margin: 0,
          padding: 8,
          borderTop: "1px solid #333",
          background: "#000",
        }}
      >
        {logs.join("\n")}
      </pre>
    </div>
  );
}

const poolLabel: React.CSSProperties = {
  position: "absolute",
  top: 4,
  left: 6,
  opacity: 0.5,
  pointerEvents: "none",
  zIndex: 1,
};
const poolSlot: React.CSSProperties = {
  position: "absolute",
  inset: 24,
};
