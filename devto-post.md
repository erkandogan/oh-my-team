---
title: Claude Code's channel system is limited to one bot, one terminal — here's how I fixed it
published: false
tags: claudecode, ai, opensource, productivity
---

Claude Code recently shipped an experimental channel system. The idea is great — connect a messaging bot to your terminal so you can talk to Claude from your phone. But in practice, it's one bot connected to one terminal. Close the terminal, session dies. Want two projects? Two bots. There's no session management, no routing, no persistence.

I've been using Claude Code as my primary dev tool for months. I wanted to manage multiple projects from my phone without setting up separate bots for each one. So I built a router on top of Claude Code's channel protocol.

## The problem

Claude Code's channel feature gives you:

- One bot ↔ one terminal session
- Close the terminal, lose the session
- No way to run multiple projects through the same bot
- No session management (start, stop, list, switch)

If you're working on one thing at a time and sitting at your desk, it works fine. But I'm usually juggling 3-5 projects and I want to check on them from my couch, from my phone, from wherever.

## What I built

**Oh My Team** is a Claude Code plugin that adds three things:

### 1. A session router

A lightweight router sits between your messaging platform and Claude Code sessions. One bot, multiple sessions, each isolated in its own thread/topic.

```
Telegram Group: "Oh My Team Hub"
+-- General topic     ← Hub: start/stop/list sessions
+-- Topic: frontend   ← Bridge → Claude (frontend project)
+-- Topic: backend    ← Bridge → Claude (backend project)
+-- Topic: mobile     ← Bridge → Claude (mobile project)
```

Or with Slack:

```
Slack Channel: #omt
+-- Root messages      ← Hub: manage sessions
+-- Thread: "my-app"   ← Bridge → Claude (my-app)
+-- Thread: "backend"  ← Bridge → Claude (backend)
```

Each project gets its own MCP bridge. Messages go directly from your chat thread to that Claude session — the hub never sees project messages, so there's zero extra token cost.

### 2. Persistent sessions via tmux

Every session runs inside tmux. Close your laptop, sessions keep running. Come back, reattach. The hub manages the lifecycle — starting sessions, registering them with the router, tearing them down.

```bash
omt hub add ~/projects/my-app   # starts a session in tmux
omt hub attach my-app            # jump in
# Ctrl+B, D to detach
```

Or just type `start ~/projects/my-app` in the Telegram General topic.

### 3. Multi-agent teams

This part came from frustration with single-agent workflows. One agent doing research, planning, coding, and reviewing its own work is like one person doing all the roles on a team.

Oh My Team has 12 specialized agent definitions. When you invoke `/oh-my-team:team`, it spawns the right combination into tmux panes — you can watch each agent working in parallel.

The one I actually use most: `/oh-my-team:review-work`. It spawns 5 independent agents that review the code from different angles — goal verification, QA, code quality, security, and context mining. All 5 must pass. It catches things a single agent won't catch about its own output.

```
/oh-my-team:team Build OAuth with RBAC

# 5 tmux panes open:
# explorer-1: researching existing auth patterns
# librarian-1: checking OAuth best practices
# hephaestus-1: implementing the feature
# hephaestus-2: writing tests
# reviewer: reviewing output
```

## How the router works

The architecture is intentionally simple:

1. **Router** (TypeScript, runs on Bun) — HTTP server on port 8800. Maintains a session registry. Receives messages from the platform adapter, looks up which session owns that thread, forwards to the right bridge.

2. **Platform adapter** — implements a `ChannelAdapter` interface (~150 lines). Currently Telegram (Forum Topics) and Slack (Socket Mode). Adding Discord would be one more adapter file.

3. **Bridge** (one per session) — MCP channel server that Claude Code connects to. Translates between the router's HTTP calls and Claude Code's channel protocol.

4. **Hub session** — a Claude Code session running the Hub agent. Listens on the General topic/channel root. It manages sessions via the `omt` CLI — it's just Claude running bash commands.

```
Phone → Telegram/Slack → Adapter → Router → Bridge → Claude Code
                                                ↑
                                          MCP channel protocol
```

The key insight: each bridge is an independent MCP server. The router just routes. Project sessions never share context. The hub session only handles management — "start X", "stop Y", "what's running".

## Permission prompts

This was the tricky part. Claude Code asks for permission before risky operations (file writes, bash commands). In a terminal, it's a prompt. Through channels, it needs to work asynchronously.

When Claude asks for permission, the bridge forwards it to your chat thread with a code:

```
Claude wants to: Run bash command "npm install express"
Reply: yes abc123 / no abc123
```

You reply from your phone, the bridge relays back, Claude continues. Works across all platforms.

## Setup

```bash
npm i -g oh-my-team          # install
omt hub init                  # interactive wizard: pick Telegram or Slack, paste tokens
omt hub start                 # starts router + hub
```

For Slack, there's a one-click app manifest that pre-configures all the scopes and Socket Mode settings.

For local use without any messaging platform:

```bash
omt -d                        # start with auto-permissions
/oh-my-team:team do the thing # spawn agents
```

## What I learned building this

- **Claude Code's channel protocol is actually well-designed.** The MCP-based approach made it straightforward to build bridges. The limitation is the 1:1 mapping, not the protocol itself.

- **Agents reviewing other agents' work produces genuinely better output.** One agent can't objectively evaluate its own code. Five independent reviewers catch real issues.

- **tmux is underrated for AI agent management.** Split panes give you visibility into what each agent is doing. It's not a black box.

- **Token cost doesn't multiply with agents.** Each agent gets its own context. The hub only processes management commands. Project sessions are independent. You're not paying for a mega-context that includes everything.

## Links

- GitHub: [github.com/erkandogan/oh-my-team](https://github.com/erkandogan/oh-my-team)
- Website: [ohmyteam.cc](https://ohmyteam.cc)
- npm: [npmjs.com/package/oh-my-team](https://www.npmjs.com/package/oh-my-team)

It's MIT licensed. The whole thing is Markdown files for agents/skills + a small TypeScript channel system. PRs welcome — especially if anyone wants to build the Discord adapter.
