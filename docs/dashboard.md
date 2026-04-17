# Oh My Team — Dashboard

A local web dashboard for monitoring and controlling hub sessions. Served
by the router at `http://localhost:8800/dashboard`.

## Opening it

```bash
omt dashboard        # hub must already be running
```

`omt hub start` also opens the dashboard automatically in your default
browser. To suppress the auto-open (e.g. over SSH or in scripts):

```bash
omt hub start --no-browser
# or
OMT_NO_BROWSER=1 omt hub start
```

The CLI detects SSH sessions and headless Linux automatically — no flag
needed in those environments.

## What's in it

### Sessions sidebar
Every registered project session with a live status dot:
- **green pulsing** — currently working on a tool call
- **teal solid** — idle, waiting for input
- **dim** — stopped (tmux killed, registry preserved)

Click any session to select it.

### Top bar
Platform badge (Telegram / Slack) and router health dot. The router chip
polls `/health` every 5 seconds so a dead router surfaces without a
refresh.

### Activity tab
Live tool feed per session. Completed actions show with `✓`, the current
action with `⏳`. Same data the status hooks push to Telegram, without
the throttling — localhost can handle every event.

### Terminal tab
Interactive xterm.js attached to `tmux attach-session -t omt-<name>`.
Full keyboard input, ANSI colors, copy/paste, resize. Behaves exactly
like `omt hub attach <name>` — but in the browser.

Terminal is connected only while the tab is visible; switching away
tears down the PTY so inactive sessions don't accumulate.

### Logs tab
Tails `router.log` with a 2-second poll. Auto-scrolls while you're at
the bottom; preserves position if you scroll up.

### Info tab
Static session metadata: thread ID, bridge port, full path, started-at.

### Restart / Stop buttons
Buttons in the session header call the REST API:
- **Stop** — kills tmux only; registry stays (session can be restored
  with `omt hub start` or the Restart button)
- **Restart** — stops then `omt hub add <path> --continue`

The `hub` session itself is locked — use `omt hub stop` / `omt hub start`
for it.

## API reference

| Route | Description |
|---|---|
| `GET /dashboard` | Serve the dashboard HTML |
| `GET /dashboard/assets/*` | Vite build assets (JS, CSS) |
| `GET /api/config` | Platform, router port, hub dir |
| `GET /api/logs?tail=N` | Recent router log lines (capped at 1000) |
| `POST /api/sessions/:name/stop` | Kill tmux, keep registry |
| `POST /api/sessions/:name/restart` | Stop + restart with `--continue` |
| `WS /ws/events` | Live events (see below) |
| `WS /ws/tmux/:name` | PTY bridge for interactive terminal |

### Event stream

`/ws/events` broadcasts JSON messages:

```jsonc
{ "type": "session.registered", "name": "my-app", "path": "...", "threadId": "...", "bridgePort": 8802, "threadDisplayName": "my-app", "startedAt": "2026-04-16T..." }
{ "type": "session.removed", "name": "my-app" }
{ "type": "session.status", "name": "my-app", "current": "Running npm test", "done": ["Read package.json"], "elapsedMs": 12000 }
{ "type": "session.status.cleared", "name": "my-app" }
```

Client reconnects with exponential backoff (500ms → 10s cap) so a
`omt hub stop` → `start` cycle recovers without a page refresh.

## Access

Localhost only (bind to `127.0.0.1`). No auth. For remote access, use
an SSH tunnel:

```bash
ssh -L 8800:localhost:8800 user@host
```

Then open `http://localhost:8800/dashboard` on your local machine.

## Build artifact

`channel/dashboard/dist/` is a build artifact that ships inside the npm
tarball. Run `npm run build:dashboard` after modifying the dashboard source.

## Requirements

- `tmux` (same as the rest of the hub)
- `bun` (same as the rest of the hub)
- `node-pty` native binary — installed automatically by `bun install`
  inside `~/.oh-my-team/channel/` on first `omt hub start`. Prebuilt
  binaries exist for macOS arm64 / x64, Linux x64 / arm64, Windows x64.
  If the binary fails to load on your platform, the terminal tab shows
  an error; everything else in the dashboard still works.
