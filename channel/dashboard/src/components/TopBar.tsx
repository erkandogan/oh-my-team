import { useRouterStatus, usePlatformInfo } from "@/lib/system-status";
import ResetLayoutButton from "@/components/ResetLayoutButton";
import MinimizedTray from "@/components/MinimizedTray";

export default function TopBar() {
  const routerStatus = useRouterStatus();
  const platform = usePlatformInfo();

  return (
    <header className="h-10 flex items-center px-4 gap-4 border-b border-border bg-card shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-sm text-foreground">
          oh<span className="text-primary">my</span>team
        </span>
        <span className="text-xs text-muted-foreground">workspace</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <StatusChip label={platform?.platform ?? "…"} status="neutral" />
        <StatusChip label="router" status={routerStatus} />
        <MinimizedTray />
        <ResetLayoutButton />
      </div>
    </header>
  );
}

function StatusChip({
  label,
  status,
}: {
  label: string;
  status: "up" | "down" | "neutral";
}) {
  const dot =
    status === "up"
      ? "bg-green-500"
      : status === "down"
        ? "bg-red-500"
        : "bg-muted-foreground";
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
      <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <span>{label}</span>
    </div>
  );
}
