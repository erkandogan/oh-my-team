/**
 * Derived system status — router liveness from heartbeat staleness and
 * one-shot platform info fetched at boot.
 *
 * Router status is not its own event: client-side `system.heartbeat` pings
 * fire every 5s while the /ws/events socket is open, so a stale timestamp
 * means the socket died (i.e. router went down). No polling required.
 */
import { useEffect, useState } from "react";
import { onEvent } from "@/hooks/useEventStream";

const STALE_MS = 10_000;
const TICK_MS = 5_000;

let lastHeartbeatAt = 0;
onEvent("system.heartbeat", (e) => {
  lastHeartbeatAt = e.ts;
});

export type RouterStatus = "up" | "down";

export function useRouterStatus(): RouterStatus {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);
  return lastHeartbeatAt && Date.now() - lastHeartbeatAt < STALE_MS ? "up" : "down";
}

export interface PlatformInfo {
  platform: string;
  routerPort?: number;
  hubDir?: string;
}

let platformInfo: PlatformInfo | null = null;
let platformPromise: Promise<void> | null = null;

export function initPlatformInfo(): Promise<void> {
  if (platformPromise) return platformPromise;
  platformPromise = fetch("/api/config")
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`config ${r.status}`))))
    .then((data: PlatformInfo) => {
      platformInfo = data;
    })
    .catch(() => {
      // Non-fatal: the chip will fall back to "unknown" and a later page
      // refresh will retry. No reason to spam the user with toasts.
      platformInfo = { platform: "unknown" };
    });
  return platformPromise;
}

export function usePlatformInfo(): PlatformInfo | null {
  const [info, setInfo] = useState<PlatformInfo | null>(platformInfo);
  useEffect(() => {
    if (info) return;
    let cancelled = false;
    initPlatformInfo().then(() => {
      if (!cancelled) setInfo(platformInfo);
    });
    return () => {
      cancelled = true;
    };
  }, [info]);
  return info;
}
