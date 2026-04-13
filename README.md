<p align="center">
  <img src="image.svg" alt="Oh My Team" width="200">
  <h1 align="center">Oh My Team</h1>
  <p align="center">
    Multi-agent orchestration for Claude Code.<br/>
    12 specialized agents. Parallel execution. Remote control from your phone.
  </p>
  <p align="center">
    <a href="https://www.npmjs.com/package/oh-my-team"><img src="https://img.shields.io/npm/v/oh-my-team?color=red" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/oh-my-team"><img src="https://img.shields.io/npm/dm/oh-my-team?color=orange" alt="npm downloads"></a>
    <a href="https://github.com/erkandogan/oh-my-team/stargazers"><img src="https://img.shields.io/github/stars/erkandogan/oh-my-team?style=flat&color=yellow" alt="GitHub stars"></a>
    <a href="https://github.com/erkandogan/oh-my-team/blob/main/LICENSE"><img src="https://img.shields.io/github/license/erkandogan/oh-my-team?color=blue" alt="License: MIT"></a>
    <a href="https://github.com/erkandogan/oh-my-team/issues"><img src="https://img.shields.io/github/issues/erkandogan/oh-my-team?color=green" alt="Issues"></a>
    <a href="https://github.com/erkandogan/oh-my-team/commits/main"><img src="https://img.shields.io/github/last-commit/erkandogan/oh-my-team" alt="Last commit"></a>
  </p>
  <p align="center">
    <a href="https://ohmyteam.cc">Website</a> &middot;
    <a href="#installation">Install</a> &middot;
    <a href="#quick-start">Quick Start</a> &middot;
    <a href="#hub">Hub</a> &middot;
    <a href="#agents">Agents</a> &middot;
    <a href="#skills">Skills</a>
  </p>
</p>

---

<p align="center">
  <img src="showcase.gif" alt="Oh My Team in action" width="700">
</p>

**Oh My Team** gives Claude Code a full development team — 12 specialized agents working in parallel across tmux panes. Plan, build, review, and debug with dedicated specialists instead of one AI doing everything. Run it locally, or deploy the **Hub** for always-alive multi-project sessions you control from Telegram.

```
Telegram Group: "Oh My Team Hub"

General topic:
  You: start ~/projects/my-app
  Hub: Started. Talk to it in its topic.

my-app topic:
  You: fix the login bug and add rate limiting
  Claude: [spawns explorer + hephaestus agents, works in parallel]
  Claude: Fixed. auth.ts updated, rate limiter added to middleware.
  
  You: run the review
  Claude: [spawns 5 review agents: goals, QA, quality, security, context]
  Claude: REVIEW PASSED. 0 blocking issues, 2 minor suggestions.
```

Or use it locally — no Telegram required:

```
omt -d
> /oh-my-team:team Build an authentication system with OAuth and RBAC

5 tmux panes open. Agents research, build, and review in parallel.
```

## Two Ways to Use It

| | Local Mode | Hub Mode |
|---|---|---|
| **Start** | `omt -d` | `omt hub start` |
| **Interface** | Terminal + tmux panes | Telegram (or terminal) |
| **Projects** | One at a time | Multiple, always alive |
| **Remote** | No | Yes, from your phone |
| **Best for** | Active coding sessions | Background work, monitoring, multi-project |

## Why Oh My Team?

| Without | With Oh My Team |
|---------|----------------|
| One AI, one project, one terminal | Multiple projects, always running |
| Close laptop = work stops | Hub keeps sessions alive |
| No visibility while away | Telegram shows progress + asks permission |
| One agent does everything | 12 specialists work in parallel |
| No quality gates | 5-agent review catches what you miss |

## Installation

### Claude Code Plugin (recommended)

Inside a Claude Code session:

```
/plugin marketplace add erkandogan/oh-my-team
/plugin install oh-my-team
```

Then run `/reload-plugins` to activate.

### npm

```bash
npm i -g oh-my-team
```

Installs the `omt` CLI and configures Claude Code automatically.

### Git clone

```bash
git clone https://github.com/erkandogan/oh-my-team.git
cd oh-my-team
./install.sh
```

The installer:
- Copies the plugin to `~/.oh-my-team/`
- Creates the `omt` CLI wrapper at `~/.local/bin/omt`
- Enables experimental agent teams in Claude Code settings
- Sets tmux split-pane mode for teammate visibility
- Installs a custom status line showing active agents and teams
- Checks for tmux (required for split-pane view)

### Requirements

- [Claude Code](https://claude.com/code) v2.1.80+
- [tmux](https://github.com/tmux/tmux/wiki) (for split-pane view and persistent sessions)
- [Bun](https://bun.sh) (for hub/channel features only)

```bash
brew install tmux  # macOS
curl -fsSL https://bun.sh/install | bash  # Bun (optional, for hub)
```

### Uninstall

```bash
rm -rf ~/.oh-my-team ~/.local/bin/omt
```

## Quick Start

```bash
# Start Oh My Team (launches inside tmux automatically)
omt

# With auto-approve permissions
omt -d          # shortcut for --dangerously-skip-permissions
omt --danger    # same thing

# Continue last session
omt -c

# All claude flags work
omt -d -c       # danger mode + continue
```

### Your first team

1. Start: `omt -d`
2. Trigger team mode with the `/oh-my-team:team` command:

```
/oh-my-team:team Build a REST API with user authentication
```

Sisyphus creates the team, spawns specialized agents in tmux panes, and coordinates them through completion.

### When to use `/team` vs direct prompts

- **Use `/oh-my-team:team`** when you want multiple agents working in parallel — research, implementation, review
- **Use a direct prompt** (no skill) for single-step tasks: "fix this typo", "explain how X works", "add error handling to this function"

Without `/team`, Claude Code will handle simple tasks directly — which is often faster. Use the skill when the task benefits from parallel specialists.

## Agents

Oh My Team provides 12 specialized agents, each with a focused role and optimized system prompt.

### Hub Layer

| Agent | Role | Model |
|-------|------|-------|
| **Hub** | Session manager. Manages multiple project sessions remotely via Telegram/Discord. Never writes code. | Sonnet |

### Orchestration Layer

| Agent | Role | Model |
|-------|------|-------|
| **Sisyphus** | Team lead. Proposes teams, delegates work, coordinates, verifies results. Never codes directly. | Opus |
| **Atlas** | Plan conductor. Reads work plans, delegates to workers in parallel waves, verifies every result. | Sonnet |

### Planning Layer

| Agent | Role | Model |
|-------|------|-------|
| **Prometheus** | Strategic planner. Interviews users, researches codebase, generates detailed work plans. Read-only. | Opus |
| **Metis** | Gap analyzer. Catches hidden intentions, ambiguities, and scope creep risks before plan generation. | Opus |
| **Momus** | Plan reviewer. Validates plans for executability. Approval-biased -- only rejects for true blockers. | Opus |

### Worker Layer

| Agent | Role | Model |
|-------|------|-------|
| **Hephaestus** | Autonomous implementation worker. Full tool access. Explores patterns, implements end-to-end. | Opus |
| **Explorer** | Fast codebase search. Finds files, patterns, and code structure. Multiple can run in parallel. | Haiku |
| **Librarian** | Documentation and OSS research. Finds official docs, best practices, production patterns. | Haiku |
| **Oracle** | Architecture consultant. Read-only. Pragmatic minimalism. Use for hard debugging and design decisions. | Opus |

### Review Layer

| Agent | Role | Model |
|-------|------|-------|
| **Reviewer** | Code quality across 10 dimensions: correctness, patterns, naming, errors, types, performance, abstraction, testing, API design, tech debt. | Opus |
| **Security Auditor** | 10-point security checklist: input validation, auth/authz, secrets, data exposure, dependencies, crypto, path traversal, error leakage. | Opus |

## Skills

Skills are slash commands that trigger workflows.

### Team skills (spawn agent teams)

| Skill | Purpose |
|-------|---------|
| `/oh-my-team:team` | Spawn an agent team with tmux panes for any task |
| `/oh-my-team:plan` | Prometheus interview + Metis gap analysis + optional Momus review |
| `/oh-my-team:start-work` | Atlas reads a plan and orchestrates execution with workers |
| `/oh-my-team:review-work` | 5-agent parallel review: goals, QA, quality, security, context |
| `/oh-my-team:deep-debug` | Multi-hypothesis parallel debugging with competing investigators |

### Utility skills (no team, solo operation)

| Skill | Purpose |
|-------|---------|
| `/oh-my-team:git-master` | Atomic commit workflow with logical grouping |
| `/oh-my-team:ai-slop-remover` | Detect and remove AI-generated code patterns |
| `/oh-my-team:frontend-ui-ux` | Frontend development guidance (auto-loaded for UI work) |

### Workflow: Plan, Execute, Review

```
1. /oh-my-team:plan "Add OAuth authentication"
   -> Prometheus interviews you, researches codebase, generates plan

2. /oh-my-team:start-work auth-plan
   -> Atlas reads plan, spawns workers, executes in parallel waves

3. /oh-my-team:review-work
   -> 5 agents review in parallel: goals, QA, quality, security, context
```

### Workflow: Deep Debug

```
/oh-my-team:deep-debug "Login returns 500 after token refresh"
-> Spawns 3-5 investigators with competing hypotheses
-> They challenge each other's findings
-> Converge on the root cause
```

## Architecture

```
+-------------------------------------------------+
|              Oh My Team Plugin                   |
+-------------------------------------------------+
|                                                  |
|  Hub            Hub agent (session manager)      |
|  Layer          Router + Bridge + Adapters       |
|                 Telegram | Discord | Slack        |
|                                                  |
|  Orchestration  Sisyphus (lead)                  |
|  Layer          Atlas (conductor)                |
|                                                  |
|  Planning       Prometheus -> Metis ->           |
|  Layer          Momus (review)                   |
|                                                  |
|  Worker         Hephaestus (build)               |
|  Layer          Explorer (search)                |
|                 Librarian (research)             |
|                 Oracle (consult)                 |
|                                                  |
|  Review         Reviewer (quality)               |
|  Layer          Security Auditor (security)      |
|                                                  |
+-------------------------------------------------+
|  Team       plan | start-work | review-work      |
|  Skills     team | deep-debug                     |
+-------------------------------------------------+
|  Utility    git-master | ai-slop-remover          |
|  Skills     frontend-ui-ux                        |
+-------------------------------------------------+
|  Status    Agent name | Team | Members            |
|  Line      Context bar | Cost | Rate limits       |
+-------------------------------------------------+
             Claude Code Plugin System
```

### How it works

Oh My Team is a Claude Code plugin with a lightweight channel system. The core is pure Markdown (agents + skills), the hub adds a small TypeScript bridge for remote control. It leverages Claude Code's native systems:

- **Agents** (`agents/*.md`) -- 12 specialized agents with model and tool configurations
- **Skills** (`skills/*/SKILL.md`) -- 8 slash commands that trigger workflows
- **Channel system** (`channel/`) -- Hub, router, bridge, and platform adapters for remote control
- **Agent Teams** -- Claude Code's experimental multi-session coordination
- **Status Line** -- Custom status bar showing active agents and teams

## Hub — Remote Multi-Project Management

Control multiple projects from your phone. The hub runs on your machine and connects to Telegram (Discord, Slack coming soon). Each project gets its own topic — zero cross-talk, zero extra token cost.

```
Telegram Group: "Oh My Team Hub"
+-- General topic     <-- Hub: manage sessions
+-- Topic: frontend   <-- Bridge: direct to Claude (frontend)
+-- Topic: backend    <-- Bridge: direct to Claude (backend)
+-- Topic: mobile     <-- Bridge: direct to Claude (mobile)
```

### How it works

- **Hub session** listens on General topic. Manages sessions via CLI.
- **Each project** gets its own Telegram topic + bridge (MCP channel server).
- **You talk in a project's topic** and the bridge forwards directly to that Claude session.
- **Claude responds** directly in the topic. Hub is never involved — zero extra token cost.

### Setup (one-time)

```bash
# 1. Create a Telegram bot via @BotFather, get the token
# 2. Create a Telegram group, add bot as admin, enable Topics
# 3. Get the group chat ID (forward a msg to @userinfobot)

# 4. Configure the hub
omt hub init --telegram --token <BOT_TOKEN> --chat-id <CHAT_ID>

# 5. Start everything
omt hub start
```

### Daily usage

```bash
# Add a project session (creates a Telegram topic automatically)
omt hub add ~/projects/my-app

# List active sessions
omt hub list

# Jump into any session's terminal
omt hub attach my-app

# Stop a session (closes its Telegram topic)
omt hub remove my-app

# Stop everything
omt hub stop
```

From Telegram:
- **General topic**: "start ~/projects/my-app", "list", "stop backend"
- **Project topic**: talk directly to that project's Claude session
- **Permission prompts**: reply `yes <code>` or `no <code>` right in the topic

### Supported platforms

| Platform | Status | Thread model |
|----------|--------|-------------|
| Telegram | Available | Forum Topics |
| Discord | Coming soon | Channels or Threads |
| Slack | Coming soon | Threads |
| WhatsApp | Planned | -- |

Adding a new platform = one adapter file (~150 lines) implementing the `ChannelAdapter` interface. Bridge and router are platform-agnostic.

### Requirements

- [Bun](https://bun.sh) runtime (for the channel server)
- Claude Code v2.1.80+ with claude.ai login
- tmux (for persistent sessions)

> **Note**: Channels are a Claude Code research preview feature. Custom channels require the `--dangerously-load-development-channels` flag.

## Status Line

Oh My Team installs a custom status line at the bottom of Claude Code:

```
@sisyphus [my-team] 4 agents: explorer-1 librarian-1 builder-1 builder-2
|||||||________ 45% | $1.23 | 5m30s | 5h:18% 7d:5%
```

Shows: active agent, team name, teammate count, context usage (color-coded), session cost, duration, and rate limits.

## Project Structure

```
oh-my-team/
+-- .claude-plugin/
|   +-- plugin.json              # Plugin manifest
+-- agents/                      # 12 specialized agents
|   +-- sisyphus.md              # Team lead / orchestrator
|   +-- hub.md                   # Session manager (remote control)
|   +-- prometheus.md            # Strategic planner
|   +-- atlas.md                 # Plan conductor
|   +-- oracle.md                # Architecture consultant
|   +-- hephaestus.md            # Implementation worker
|   +-- explorer.md              # Codebase search
|   +-- librarian.md             # Documentation research
|   +-- reviewer.md              # Code quality review
|   +-- security-auditor.md      # Security review
|   +-- metis.md                 # Gap analyzer
|   +-- momus.md                 # Plan reviewer
+-- skills/                      # 8 slash commands
|   +-- team/SKILL.md            # Force team mode
|   +-- plan/SKILL.md            # Planning workflow
|   +-- start-work/SKILL.md      # Execution workflow
|   +-- review-work/SKILL.md     # 5-agent review gate
|   +-- deep-debug/SKILL.md      # Multi-hypothesis debugging
|   +-- git-master/SKILL.md      # Commit workflow (utility)
|   +-- ai-slop-remover/SKILL.md # Code cleanup (utility)
|   +-- frontend-ui-ux/SKILL.md  # Frontend guidance (auto-loaded)
+-- channel/                     # Hub channel system
|   +-- bridge.ts                # MCP channel server (per-session)
|   +-- router.ts                # Session registry + message broker
|   +-- adapters/
|   |   +-- types.ts             # ChannelAdapter interface
|   |   +-- telegram.ts          # Telegram Topics adapter
|   |   +-- index.ts             # Adapter registry
|   +-- bridge.mcp.json          # MCP config for bridge
|   +-- package.json             # Channel dependencies
+-- bin/
|   +-- omt                      # CLI (sessions + hub management)
+-- hooks/hooks.json             # Session lifecycle hooks
+-- settings.json                # Activates Sisyphus as default
+-- CLAUDE.md                    # Project instructions
+-- install.sh                   # One-command installer
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Adding a new agent

Create `agents/your-agent.md` with frontmatter:

```yaml
---
name: your-agent
description: "What this agent does and when to use it"
model: opus  # or sonnet, haiku
tools: [Read, Grep, Glob, Bash]  # tool restrictions
---

Your agent's system prompt here.
```

### Adding a new skill

Create `skills/your-skill/SKILL.md` with frontmatter:

```yaml
---
name: your-skill
description: "What this skill does"
argument-hint: "[arguments]"
---

Instructions for the skill.
```

### Adding a new channel adapter

Create `channel/adapters/your-platform.ts` implementing the `ChannelAdapter` interface from `types.ts`. Register it in `adapters/index.ts` and add a case in `router.ts`. See `telegram.ts` for a complete reference implementation.

## License

[MIT](LICENSE) -- Use it, fork it, make it yours.

## Credits

Inspired by [Oh My OpenCode](https://github.com/code-yeongyu/oh-my-opencode) by YeonGyu Kim. Built for [Claude Code](https://claude.com/code) by Anthropic.
