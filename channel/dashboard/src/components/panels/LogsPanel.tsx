/**
 * Logs panel — tails the router log file in real time.
 *
 * Polls /api/logs?tail=200 every second. Polling keeps the server side
 * simple (no broadcast plumbing for log lines) and is cheap for a single
 * localhost client, matching the legacy dashboard/lib/logs.js behaviour.
 *
 * Auto-scrolls to the bottom when the user was already at the bottom, so
 * scrolling up to inspect older lines isn't yanked away on the next tick.
 */
import { useState, useEffect, useRef } from "react";
import { IDockviewPanelProps } from "dockview-react";

export interface LogsPanelParams {
  sessionName: string;
}

const POLL_MS = 1000;
const TAIL = 200;

export function LogsPanelComponent({ params }: IDockviewPanelProps<LogsPanelParams>) {
  const { sessionName } = params;
  const [lines, setLines] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wasAtBottomRef = useRef(true);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      try {
        const res = await fetch(`/api/logs?tail=${TAIL}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { lines: string[] };
        if (cancelled) return;
        setError(null);
        const el = scrollRef.current;
        wasAtBottomRef.current = el
          ? el.scrollTop + el.clientHeight >= el.scrollHeight - 20
          : true;
        setLines(data.lines);
      } catch {
        if (!cancelled) setError("Router unavailable");
      }
    };

    void refresh();
    const timer = setInterval(refresh, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (wasAtBottomRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-3 py-2 border-b border-border text-xs text-muted-foreground shrink-0">
        Logs — {sessionName}
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-3 font-mono text-xs leading-relaxed"
      >
        {error ? (
          <p className="text-destructive">{error}</p>
        ) : lines.length === 0 ? (
          <p className="text-muted-foreground">(empty)</p>
        ) : (
          lines.map((line, i) => (
            <div key={i} className="whitespace-pre text-foreground">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
