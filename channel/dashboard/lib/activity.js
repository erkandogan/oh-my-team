/**
 * Per-session activity feed.
 *
 * Accumulates tool events as they stream in over /ws/events. Rendering is
 * scoped to the currently-selected session — switching sessions swaps the
 * feed in place. Each session keeps its last N events so jumping back to
 * a previous session still shows recent history.
 */

import { events } from "./events.js";

const MAX_PER_SESSION = 60;

/** @type {Map<string, {ts: number, current: string|null, done: string[]}>} */
const snapshots = new Map();

/** Render targets — set by the app shell. */
let container = null;
let getSelected = () => null;

export function mountActivity(el, selectedGetter) {
  container = el;
  getSelected = selectedGetter;
  render();
}

export function renderActivity() {
  render();
}

events.on("session.status", (msg) => {
  const snapshot = {
    ts: Date.now(),
    current: msg.current,
    done: msg.done.slice(-MAX_PER_SESSION),
  };
  snapshots.set(msg.name, snapshot);
  if (msg.name === getSelected()) render();
});

events.on("session.status.cleared", (msg) => {
  const existing = snapshots.get(msg.name);
  if (existing) existing.current = null;
  if (msg.name === getSelected()) render();
});

events.on("session.removed", (msg) => {
  snapshots.delete(msg.name);
  if (msg.name === getSelected()) render();
});

function render() {
  if (!container) return;
  const name = getSelected();
  if (!name) {
    container.innerHTML = "";
    return;
  }

  const snap = snapshots.get(name);
  if (!snap || (!snap.current && snap.done.length === 0)) {
    container.innerHTML = `<p class="panel-hint">Waiting for activity…</p>`;
    return;
  }

  // Build DOM incrementally so existing "done" items don't re-animate.
  const frag = document.createDocumentFragment();
  for (const item of snap.done) {
    frag.appendChild(activityNode("done", "✓", item));
  }
  if (snap.current) {
    frag.appendChild(activityNode("current", "⏳", snap.current));
  }

  container.replaceChildren(frag);
  // Keep the latest item in view
  container.scrollTop = container.scrollHeight;
}

function activityNode(state, icon, text) {
  const node = document.createElement("div");
  node.className = "activity-item";
  node.dataset.state = state;
  node.innerHTML = `<span class="icon"></span><code></code>`;
  node.querySelector(".icon").textContent = icon;
  node.querySelector("code").textContent = text;
  return node;
}
