import { useCallback, useState, useEffect, useRef } from "react";
import { IDockviewPanelProps } from "dockview-react";
import { useEventStream } from "@/hooks/useEventStream";

export interface ActivityPanelParams {
  sessionName: string;
}

interface ActivityEntry {
  ts: number;
  type: string;
  text: string;
}

export function ActivityPanelComponent({ params }: IDockviewPanelProps<ActivityPanelParams>) {
  const { sessionName } = params;
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handlers are wrapped in useCallback so `useEventStream` doesn't tear
  // down and re-subscribe on every state update — entries change on every
  // received event, which would otherwise churn the subscription list.
  const addEntry = useCallback((type: string, text: string) => {
    setEntries((prev) => [...prev.slice(-99), { ts: Date.now(), type, text }]);
  }, []);

  const onStatus = useCallback(
    (e: { name: string; current: string | null }) => {
      if (e.name !== sessionName) return;
      addEntry("status", e.current ? `Working: ${e.current}` : "Idle");
    },
    [sessionName, addEntry],
  );

  const onRegistered = useCallback(
    (e: { name: string; path: string }) => {
      if (e.name !== sessionName) return;
      addEntry("registered", `Session registered at ${e.path}`);
    },
    [sessionName, addEntry],
  );

  const onCleared = useCallback(
    (e: { name: string }) => {
      if (e.name !== sessionName) return;
      addEntry("cleared", "Status cleared");
    },
    [sessionName, addEntry],
  );

  useEventStream("session.status", onStatus);
  useEventStream("session.registered", onRegistered);
  useEventStream("session.status.cleared", onCleared);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-3 py-2 border-b border-border text-xs text-muted-foreground shrink-0">
        Activity — {sessionName}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-1">
        {entries.length === 0 ? (
          <p className="text-xs text-muted-foreground">Waiting for activity…</p>
        ) : (
          entries.map((e, i) => (
            <div key={i} className="text-xs flex gap-2">
              <span className="text-muted-foreground shrink-0">
                {new Date(e.ts).toLocaleTimeString()}
              </span>
              <span className="text-foreground">{e.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
