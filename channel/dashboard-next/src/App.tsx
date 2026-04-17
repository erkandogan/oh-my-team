import { useEffect, useRef, useState } from "react";
import TerminalPane from "@/components/TerminalPane";

export default function App() {
  if (window.location.pathname === "/workspace/__terminal-test") {
    return <TerminalTestRoute />;
  }
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <p className="text-primary">oh<span>my</span>team workspace</p>
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
