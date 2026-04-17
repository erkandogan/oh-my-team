/**
 * Logs panel — tails the shared router log file in real time.
 *
 * The router log captures everything — session events, adapter traffic,
 * errors — for the whole hub, not per-session. So this panel shows the
 * router's view, optionally filtered by a session name. If the panel
 * params include `sessionName`, lines are filtered client-side to ones
 * that mention it; otherwise the unfiltered tail is shown.
 *
 * Polling /api/logs?tail=200 once a second keeps the server side simple
 * (no broadcast plumbing for log lines) and is cheap for localhost.
 *
 * Auto-scrolls to the bottom when the user was already at the bottom, so
 * scrolling up to inspect older lines isn't yanked away on the next tick.
 */
import { useState, useEffect, useMemo, useRef } from "react";
import { IDockviewPanelProps } from "dockview-react";

export interface LogsPanelParams {
  /** Optional — when set, lines are filtered to ones mentioning the name. */
  sessionName?: string;
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

  // Filter client-side to lines that mention the session name. Cheap because
  // TAIL is 200 — no point sending a per-session request to the server.
  const visibleLines = useMemo(() => {
    if (!sessionName) return lines;
    const needle = sessionName.toLowerCase();
    return lines.filter((l) => l.toLowerCase().includes(needle));
  }, [lines, sessionName]);

  useEffect(() => {
    if (wasAtBottomRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-3 py-2 border-b border-border text-xs text-muted-foreground shrink-0">
        {sessionName ? `Router logs — ${sessionName}` : "Router logs"}
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-3 font-mono text-xs leading-relaxed"
      >
        {error ? (
          <p className="text-destructive">{error}</p>
        ) : visibleLines.length === 0 ? (
          <p className="text-muted-foreground">
            {sessionName ? `(no router lines mention "${sessionName}")` : "(empty)"}
          </p>
        ) : (
          visibleLines.map((line, i) => (
            <div key={i} className="whitespace-pre text-foreground">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
