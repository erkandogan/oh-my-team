/**
 * Router log tail.
 *
 * Polls /api/logs when the logs tab is visible. Polling keeps the server
 * side simple (no broadcast plumbing for log lines) and is cheap for a
 * single localhost client.
 */

const POLL_MS = 2000;

let container = null;
let timer = null;

export function mountLogs(el) {
  container = el;
}

export function setLogsVisible(visible) {
  if (visible) {
    if (timer) return; // already polling
    void refresh();
    timer = setInterval(refresh, POLL_MS);
  } else if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

async function refresh() {
  if (!container) return;
  try {
    const res = await fetch("/api/logs?tail=200", { cache: "no-store" });
    if (!res.ok) return;
    const { lines } = await res.json();
    const wasAtBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - 20;
    container.textContent = lines.join("\n") || "(empty)";
    if (wasAtBottom) container.scrollTop = container.scrollHeight;
  } catch {
    // router probably went away; status chip will reflect that
  }
}
