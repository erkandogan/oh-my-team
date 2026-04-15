# Oh My Team — Telegram Hub Setup

> **For LLM agents**: Follow every step. Steps marked "User action required" need the human to do something in Telegram — prompt them clearly.
>
> **For humans**: Let your LLM agent guide you. It will tell you what to click.

---

## Overview

The Telegram hub uses **Forum Topics** for session isolation:
- **General topic** — Hub session (manages other sessions)
- **Named topics** — One per project, messages go directly to that Claude session

## Step 1: Create a Telegram Bot

> **User action required** — these steps happen in Telegram.

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Choose a name (e.g., "My Dev Team")
4. Choose a username (e.g., "mydevteam_bot")
5. Copy the **bot token** BotFather gives you

**Important — disable Group Privacy:**
6. In BotFather, send `/mybots` → select your bot
7. **Bot Settings → Group Privacy → Turn OFF**

The bot must read all group messages, not just /commands.

## Step 2: Create a Telegram Group

> **User action required** — these steps happen in Telegram.

1. Create a new group (name it e.g., "Oh My Team Hub")
2. Add your bot to the group
3. Make the bot **admin** (Group Settings → Administrators → Add)
4. Enable **Topics** (Group Settings → Topics → ON)
5. Send any message in the group (so the bot can detect the chat ID)

## Step 3: Configure Oh My Team

### Option A: Interactive (recommended)

```bash
omt hub init
```

Choose **Telegram**, paste the bot token, and it auto-detects the group.

### Option B: Non-interactive

```bash
omt hub init --telegram --token BOT_TOKEN --chat-id CHAT_ID
```

The chat ID starts with `-100` (e.g., `-1001234567890`). If you don't know it:
```bash
curl -s "https://api.telegram.org/botYOUR_TOKEN/getUpdates" | python3 -m json.tool
```
Look for `"chat": {"id": -100XXXXXXXXXX}`.

## Step 4: Start the Hub

```bash
omt hub start
```

This starts:
1. **Router** — message broker on port 8800
2. **Hub session** — Claude Code with the Hub agent

You'll be attached to the hub's tmux session. Accept any trust/channel prompts, then **Ctrl+B, D** to detach.

## Step 5: Add Projects

### From terminal:
```bash
omt hub add ~/projects/my-app
```

### From Telegram (in the General topic):
```
start ~/projects/my-app
```

A new topic appears for the project. Messages there go directly to its Claude session.

## Sharing images and files

Photos, documents, voice messages, and other files you send in a topic are
downloaded by the hub and made available to the Claude session. The session
sees a message like:

```
<your caption, if any>

<attachments count="1">
  <file kind="image" name="screenshot.png" mime="image/png" size=12345
        path="/Users/you/.oh-my-team/attachments/<thread>/<file>" />
</attachments>
```

Claude can then use the `Read` tool on the path to view the file. This is how
you share error screenshots, diagrams, PDFs, or voice notes from your phone.

**Limits:**
- Max file size: **20 MB** (Telegram Bot API cap on `getFile`).
- Files are deleted automatically 24 hours after upload, or when you run
  `omt hub remove <session>`.

## Troubleshooting

### Bot doesn't read messages
- Group Privacy must be **OFF** (BotFather → Bot Settings → Group Privacy)
- Bot must be **admin** in the group

### Can't detect chat ID
- Make sure you sent a message in the group AFTER adding the bot
- Try the getUpdates URL manually (see Step 3, Option B)

### Hub not registered
If `omt hub status` shows 0 sessions, register manually:
```bash
curl -s -X POST http://localhost:8800/sessions \
  -H "Content-Type: application/json" \
  -d '{"name":"hub","path":"'$HOME'","bridgePort":8801,"isHub":true}'
```
