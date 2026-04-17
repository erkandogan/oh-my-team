/**
 * Oh My Team — Dashboard
 *
 * Vanilla JS, no framework. A small `state` object holds everything the
 * UI needs; `render()` diff-patches the DOM from it. Events arrive over
 * /ws/events and mutate the state, triggering a render.
 *
 * Features in this commit: session sidebar, top-bar chips, live status
 * dots. Activity/Logs/Info/Terminal tabs gain behavior in follow-ups.
 */

import { events } from "./lib/events.js";
import { sessionsStore, CURRENT, IDLE } from "./lib/sessions.js";
import { mountActivity, renderActivity } from "./lib/activity.js";
import { mountLogs, setLogsVisible } from "./lib/logs.js";
import { mountTerminal, openTerminal, closeTerminal } from "./lib/terminal.js";

// ── DOM lookups (cached at module load) ────────────────────────────────────

const el = {
  platformChip: document.querySelector('[data-chip="platform"]'),
  routerChip: document.querySelector('[data-chip="router"]'),
  sessionsContainer: document.querySelector('[data-slot="sessions"]'),
  sessionsEmpty: document.querySelector('[data-slot="sessions-empty"]'),
  sessionCount: document.querySelector('[data-slot="session-count"]'),
  mainEmpty: document.querySelector('[data-slot="main-empty"]'),
  sessionView: document.querySelector('[data-slot="session-view"]'),
  sessionName: document.querySelector('[data-slot="session-name"]'),
  sessionPath: document.querySelector('[data-slot="session-path"]'),
  infoThread: document.querySelector('[data-slot="info-thread"]'),
  infoPort: document.querySelector('[data-slot="info-port"]'),
  infoPath: document.querySelector('[data-slot="info-path"]'),
  infoStarted: document.querySelector('[data-slot="info-started"]'),
  activity: document.querySelector('[data-slot="activity"]'),
  logs: document.querySelector('[data-slot="logs"]'),
  terminal: document.querySelector('[data-slot="terminal"]'),
};

// ── State ───────────────────────────────────────────────────────────────────
// Declared before the mount calls below because mountActivity() invokes
// its getter immediately during its initial render pass, which would hit
// the TDZ if the variable were hoisted below.

let selectedName = null;

// ── Feature modules ────────────────────────────────────────────────────────

mountActivity(el.activity, () => selectedName);
mountLogs(el.logs);
// Terminal module loads xterm.js bundles lazily — fire and forget
void mountTerminal(el.terminal);

// ── Top-bar chips ──────────────────────────────────────────────────────────

async function refreshPlatformChip() {
  try {
    const res = await fetch("/api/config");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { platform } = await res.json();
    const label = platform.charAt(0).toUpperCase() + platform.slice(1);
    el.platformChip.querySelector(".chip-label").textContent = label;
    el.platformChip.dataset.state = "ok";
  } catch {
    el.platformChip.querySelector(".chip-label").textContent = "unknown";
    el.platformChip.dataset.state = "warn";
  }
}

async function refreshRouterChip() {
  try {
    const res = await fetch("/health", { cache: "no-store" });
    el.routerChip.dataset.state = res.ok ? "ok" : "down";
  } catch {
    el.routerChip.dataset.state = "down";
  }
}

// Ping health every 5s so a killed router shows up in the UI without a refresh.
setInterval(refreshRouterChip, 5000);

// ── Sidebar render ─────────────────────────────────────────────────────────

function renderSessions() {
  const list = sessionsStore.listUserVisible();
  el.sessionCount.textContent = String(list.length);

  // Empty state toggle
  el.sessionsEmpty.style.display = list.length === 0 ? "" : "none";

  // Remove items that are no longer in the list
  const existingNames = new Set();
  for (const node of el.sessionsContainer.querySelectorAll(".session-item")) {
    existingNames.add(node.dataset.name);
  }
  for (const name of existingNames) {
    if (!list.find((s) => s.name === name)) {
      el.sessionsContainer.querySelector(`.session-item[data-name="${CSS.escape(name)}"]`)?.remove();
    }
  }

  // Add / update items — preserve DOM order matching list order
  for (const session of list) {
    let node = el.sessionsContainer.querySelector(
      `.session-item[data-name="${CSS.escape(session.name)}"]`
    );
    if (!node) {
      node = document.createElement("div");
      node.className = "session-item";
      node.dataset.name = session.name;
      node.innerHTML = `
        <span class="dot"></span>
        <div class="session-item-body">
          <span class="session-item-name"></span>
          <span class="session-item-path"></span>
        </div>
      `;
      node.addEventListener("click", () => selectSession(session.name));
      el.sessionsContainer.appendChild(node);
    }
    node.querySelector(".session-item-name").textContent = session.name;
    node.querySelector(".session-item-path").textContent = shortPath(session.path);
    node.dataset.state = session.status === CURRENT ? "working" : IDLE;
    node.classList.toggle("is-active", session.name === selectedName);
  }
}

function renderSelected() {
  const session = selectedName ? sessionsStore.get(selectedName) : null;
  if (!session) {
    el.mainEmpty.style.display = "";
    el.sessionView.hidden = true;
    return;
  }
  el.mainEmpty.style.display = "none";
  el.sessionView.hidden = false;
  el.sessionName.textContent = session.name;
  el.sessionPath.textContent = session.path;
  el.infoThread.textContent = session.threadDisplayName || session.threadId;
  el.infoPort.textContent = String(session.bridgePort);
  el.infoPath.textContent = session.path;
  el.infoStarted.textContent = formatTime(session.startedAt);

  for (const btn of el.sessionView.querySelectorAll("[data-action]")) {
    btn.disabled = false;
  }
}

// ── Selection ──────────────────────────────────────────────────────────────

function selectSession(name) {
  if (selectedName === name) return;
  selectedName = name;
  // If the terminal tab was open for the previous session, disconnect so
  // we don't keep a PTY for a session the user is no longer looking at.
  closeTerminal();
  renderSessions();
  renderSelected();
  renderActivity();
}

// ── Action buttons (stop / restart) ────────────────────────────────────────

el.sessionView.addEventListener("click", async (ev) => {
  const btn = ev.target.closest("[data-action]");
  if (!btn || btn.disabled || !selectedName) return;
  const action = btn.dataset.action;
  btn.disabled = true;
  try {
    await fetch(`/api/sessions/${encodeURIComponent(selectedName)}/${action}`, {
      method: "POST",
    });
  } finally {
    // The events stream will reflect the new state shortly; re-enable so
    // the user isn't stuck if nothing changes.
    setTimeout(() => (btn.disabled = false), 1500);
  }
});

// ── Tabs (client-side only) ────────────────────────────────────────────────

for (const btn of document.querySelectorAll(".tab")) {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("is-active", b === btn));
    document.querySelectorAll(".panel").forEach((p) => {
      p.classList.toggle("is-active", p.dataset.panel === target);
    });
    // Let feature modules start / stop their work based on visibility so
    // inactive tabs don't waste network or timers.
    setLogsVisible(target === "logs");
    if (target === "terminal" && selectedName) {
      openTerminal(selectedName);
    } else {
      closeTerminal();
    }
  });
}

// ── Event stream ───────────────────────────────────────────────────────────

events.on("session.registered", (e) => {
  sessionsStore.upsert({
    name: e.name,
    path: e.path,
    bridgePort: e.bridgePort,
    threadId: e.threadId,
    threadDisplayName: e.threadDisplayName,
    startedAt: e.startedAt,
  });
  renderSessions();
  if (selectedName === e.name) renderSelected();
});

events.on("session.removed", (e) => {
  sessionsStore.remove(e.name);
  if (selectedName === e.name) selectedName = null;
  renderSessions();
  renderSelected();
});

events.on("session.status", (e) => {
  sessionsStore.updateStatus(e.name, CURRENT);
  renderSessions();
});

events.on("session.status.cleared", (e) => {
  sessionsStore.updateStatus(e.name, IDLE);
  renderSessions();
});

// ── Helpers ────────────────────────────────────────────────────────────────

function shortPath(p) {
  // Can't know $HOME from the browser, but shortening the obvious prefixes
  // keeps the sidebar readable.
  return p.replace(/^\/Users\/[^/]+/, "~").replace(/^\/home\/[^/]+/, "~");
}

function formatTime(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

// ── Boot ──────────────────────────────────────────────────────────────────

async function bootstrap() {
  await Promise.all([refreshPlatformChip(), refreshRouterChip(), hydrateSessions()]);
  renderSessions();
  renderSelected();
  events.connect();
}

async function hydrateSessions() {
  try {
    const res = await fetch("/sessions");
    if (!res.ok) return;
    const data = await res.json();
    for (const [name, info] of Object.entries(data)) {
      sessionsStore.upsert({ ...info, name });
    }
  } catch {
    // Router is probably down — chip already reflects that.
  }
}

bootstrap();
