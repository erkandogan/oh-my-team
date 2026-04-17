import { useState } from "react";
import { useSessions, type Session } from "@/stores/sessions";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { openOrFocusTerminal } from "@/components/Workspace";

export default function Sidebar() {
  const [filter, setFilter] = useState("");
  const sessions = useSessions(filter);

  return (
    <aside className="w-64 flex flex-col bg-card border-r border-border h-full">
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-foreground">Sessions</span>
          <span className="text-xs text-muted-foreground ml-auto">{sessions.length}</span>
        </div>
        <Input
          placeholder="Filter sessions…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-7 text-xs"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <EmptyState hasFilter={filter.length > 0} />
        ) : (
          <ul>
            {sessions.map((s) => (
              <SessionItem key={s.name} session={s} />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

function SessionItem({ session }: { session: Session }) {
  const isWorking = session.status === "working";
  const shortPath = lastSegment(session.path);

  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData(
      "application/omt-session",
      JSON.stringify({ kind: "spawn-session", name: session.name }),
    );
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <li
      draggable
      onClick={() => openOrFocusTerminal(session.name)}
      onDragStart={onDragStart}
      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted border-b border-border/50"
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full flex-shrink-0",
          isWorking ? "bg-primary" : "bg-muted-foreground",
        )}
      />
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-semibold text-foreground truncate">{session.name}</span>
        <span className="text-xs text-muted-foreground truncate">{shortPath}</span>
      </div>
    </li>
  );
}

function EmptyState({ hasFilter }: { hasFilter: boolean }) {
  if (hasFilter) {
    return (
      <div className="p-4 text-xs text-muted-foreground">No sessions match your filter</div>
    );
  }
  return (
    <div className="p-4 text-xs text-muted-foreground space-y-2">
      <p className="font-medium text-foreground">No sessions yet</p>
      <p>
        Start one with <code className="text-foreground">omt hub add &lt;path&gt;</code> or send{" "}
        <code className="text-foreground">start ~/project</code> in your messaging app.
      </p>
    </div>
  );
}

function lastSegment(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  const idx = trimmed.lastIndexOf("/");
  return idx >= 0 ? trimmed.slice(idx + 1) : trimmed;
}
