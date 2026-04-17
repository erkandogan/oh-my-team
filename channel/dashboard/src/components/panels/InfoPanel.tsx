import { IDockviewPanelProps } from "dockview-react";
import { useSession } from "@/stores/sessions";

export interface InfoPanelParams {
  sessionName: string;
}

export function InfoPanelComponent({ params }: IDockviewPanelProps<InfoPanelParams>) {
  const { sessionName } = params;
  const session = useSession(sessionName);

  const fields: Array<{ label: string; value: string | number | undefined }> = [
    { label: "Thread", value: session?.threadDisplayName ?? session?.threadId },
    { label: "Bridge port", value: session?.bridgePort },
    { label: "Path", value: session?.path },
    {
      label: "Started",
      value: session?.startedAt ? new Date(session.startedAt).toLocaleString() : undefined,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-3 py-2 border-b border-border text-xs text-muted-foreground shrink-0">
        Info — {sessionName}
      </div>
      <dl className="p-4 space-y-3">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="text-sm text-foreground font-mono mt-0.5 break-all">
              {value ?? "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
