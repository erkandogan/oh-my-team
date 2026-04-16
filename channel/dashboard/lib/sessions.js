/**
 * In-memory session store for the dashboard.
 *
 * The server (router) owns the authoritative registry; this is just a
 * local mirror that reacts to /ws/events messages. Kept separate from
 * app.js so it can be swapped / unit-tested independently if needed.
 */

export const CURRENT = "working";
export const IDLE = "idle";

/**
 * @typedef {Object} SessionRow
 * @property {string} name
 * @property {string} path
 * @property {number} bridgePort
 * @property {string} threadId
 * @property {string} [threadDisplayName]
 * @property {string} [startedAt]
 * @property {"working"|"idle"} [status]
 */

const sessions = new Map();

function upsert(row) {
  const existing = sessions.get(row.name);
  sessions.set(row.name, { ...existing, ...row });
}

function remove(name) {
  sessions.delete(name);
}

function updateStatus(name, status) {
  const row = sessions.get(name);
  if (row) row.status = status;
}

function get(name) {
  return sessions.get(name) || null;
}

/** All sessions except the hub, sorted by name for stable UI ordering. */
function listUserVisible() {
  return [...sessions.values()]
    .filter((s) => s.name !== "hub")
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const sessionsStore = { upsert, remove, updateStatus, get, listUserVisible };
