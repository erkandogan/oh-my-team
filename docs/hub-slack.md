# Oh My Team — Slack Hub Setup

> **For LLM agents**: Follow every step. Steps marked "User action required" need the human to do something in the Slack dashboard or Slack app — prompt them clearly and wait for the values.
>
> **For humans**: Let your LLM agent guide you. It will tell you what to click.

---

## Overview

The Slack hub uses **threads in a single channel** for session isolation:
- **Channel root messages** — Hub session (manages other sessions)
- **Threads** — One per project, messages go directly to that Claude session

Connection uses **Socket Mode** (WebSocket) — no public URL needed, works behind firewalls.

## Step 1: Create the Slack App (one-click)

> **User action required** — open this URL in a browser.

Open this link to create a pre-configured Slack App with all required settings:

[Create Oh My Team Slack App](https://api.slack.com/apps?new_app=1&manifest_json=%7B%22display_information%22%3A%20%7B%22name%22%3A%20%22Oh%20My%20Team%22%2C%20%22description%22%3A%20%22Multi-agent%20orchestration%20hub%20for%20Claude%20Code%22%7D%2C%20%22features%22%3A%20%7B%22bot_user%22%3A%20%7B%22display_name%22%3A%20%22Oh%20My%20Team%22%2C%20%22always_online%22%3A%20true%7D%7D%2C%20%22oauth_config%22%3A%20%7B%22scopes%22%3A%20%7B%22bot%22%3A%20%5B%22chat%3Awrite%22%2C%20%22channels%3Ahistory%22%2C%20%22channels%3Aread%22%2C%20%22groups%3Ahistory%22%2C%20%22groups%3Aread%22%2C%20%22pins%3Awrite%22%2C%20%22users%3Aread%22%5D%7D%7D%2C%20%22settings%22%3A%20%7B%22event_subscriptions%22%3A%20%7B%22bot_events%22%3A%20%5B%22message.channels%22%2C%20%22message.groups%22%5D%7D%2C%20%22socket_mode_enabled%22%3A%20true%2C%20%22org_deploy_enabled%22%3A%20false%2C%20%22token_rotation_enabled%22%3A%20false%7D%7D)

This pre-configures:
- Socket Mode (WebSocket connection)
- All required bot scopes (`chat:write`, `channels:history`, `channels:read`, `groups:history`, `groups:read`, `pins:write`, `users:read`)
- Event subscriptions (`message.channels`, `message.groups`)

**Pick your workspace** when prompted, review the summary, and click **Create**.

> **Alternative**: Go to https://api.slack.com/apps → Create New App → From manifest → paste the YAML from [`channel/slack-manifest.yml`](../channel/slack-manifest.yml).

## Step 2: Generate the App-Level Token

> **User action required** — this happens in the Slack App dashboard.

1. In your new app's settings, go to **Basic Information**
2. Scroll to **App-Level Tokens** → click **Generate Token**
3. Name: `omt`
4. Scope: select `connections:write`
5. Click **Generate**
6. **Copy the token** (starts with `xapp-`)

## Step 3: Install to Workspace

> **User action required** — this happens in the Slack App dashboard.

1. Go to **OAuth & Permissions** in the sidebar
2. Click **Install to Workspace** → **Allow**
3. **Copy the Bot User OAuth Token** (starts with `xoxb-`)

## Step 4: Create a Channel and Invite the Bot

> **User action required** — this happens in the Slack app.

1. Create a new channel (e.g., `#omt`) — can be public or private
2. Invite the bot by typing in the channel: `/invite @Oh My Team`
3. Get the **Channel ID**:
   - Click the channel name at the top
   - Scroll to the bottom of the About panel
   - Copy the ID (starts with `C`, e.g., `C0ABC123DEF`)

## Step 5: Configure Oh My Team

### Option A: Non-interactive (recommended for LLM agents)

```bash
omt hub init --slack \
  --token xoxb-YOUR-BOT-TOKEN \
  --app-token xapp-YOUR-APP-TOKEN \
  --channel-id C0YOUR-CHANNEL-ID
```

Replace the three values with what you copied in Steps 2-4.

### Option B: Interactive

```bash
omt hub init
```

Choose **Slack** (option 2), then paste each token when prompted.

**Verify output says:**
```
Hub configured!
Platform: Slack
```

## Step 6: Start the Hub

```bash
omt hub start
```

This starts:
1. **Router** — message broker on port 8800 (connects to Slack via Socket Mode WebSocket)
2. **Hub session** — Claude Code with the Hub agent

You'll be attached to the hub's tmux session. Accept any trust/channel prompts, then **Ctrl+B, D** to detach.

## Step 7: Add Projects

### From terminal:
```bash
omt hub add ~/projects/my-app
```

### From Slack (in the channel, not a thread):
```
start ~/projects/my-app
```

A new **pinned thread** appears in the channel for the project. Reply in that thread to talk to the Claude session.

## How It Works

```
Slack Channel: #omt
+-- Root messages          <-- Hub: manage sessions
+-- Thread: "my-app"       <-- Bridge: direct to Claude (my-app)
+-- Thread: "backend"      <-- Bridge: direct to Claude (backend)
+-- Thread: "mobile"       <-- Bridge: direct to Claude (mobile)
```

- The **hub session** listens on channel root messages. It manages sessions via CLI.
- Each **project session** gets its own thread + bridge (MCP channel server).
- You reply in a **project thread** and the bridge forwards directly to that Claude session.
- Claude responds in the **same thread**. Hub never sees it — zero extra token cost.
- **Permission prompts** appear in the thread — reply `yes <code>` or `no <code>`.

## Sharing images and files

Any files you upload in a thread (images, PDFs, voice clips, etc.) are
downloaded by the hub and their local paths are passed to the Claude session.
Claude can then use its `Read` tool to view them.

**Limits:**
- Max file size: **20 MB** per attachment.
- Files live under `~/.oh-my-team/attachments/<thread>/` and are deleted
  automatically 24 hours later, or immediately when the session is removed.

## Troubleshooting

### Bot doesn't receive messages
- Make sure **Event Subscriptions** has both `message.channels` AND `message.groups` (private channels need `message.groups`)
- Make sure the app is **installed to workspace** (OAuth & Permissions → Install/Reinstall)
- Make sure the bot is **invited to the channel** (`/invite @Oh My Team`)

### `missing_scope` error
- Go to OAuth & Permissions → check all scopes are present
- **Reinstall** the app after adding scopes (the bot token changes)
- Copy the **new** bot token and re-run `omt hub init`

### Hub session not registered
If `omt hub status` shows 0 sessions after starting:
```bash
curl -s -X POST http://localhost:8800/sessions \
  -H "Content-Type: application/json" \
  -d '{"name":"hub","path":"'$HOME'","bridgePort":8801,"isHub":true}'
```

### `invalid_arguments` on channel verification
- Double-check the Channel ID starts with `C`
- Make sure you're copying from the **About** panel (not the URL, which may show a different format)

### Socket Mode connection fails
- Verify the App Token (`xapp-`) has `connections:write` scope
- Check Socket Mode is **enabled** in app settings (Settings → Socket Mode)

## Required Slack App Configuration Summary

| Setting | Value |
|---------|-------|
| Socket Mode | Enabled |
| App Token scope | `connections:write` |
| Bot scopes | `chat:write`, `channels:history`, `channels:read`, `groups:history`, `groups:read`, `pins:write`, `users:read` |
| Bot events | `message.channels`, `message.groups` |
