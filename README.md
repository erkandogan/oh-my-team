<p align="center">
  <h1 align="center">Oh My Team</h1>
  <p align="center">
    Multi-agent orchestration plugin for Claude Code.<br/>
    Turn your AI coding session into a coordinated development team.
  </p>
  <p align="center">
    <a href="https://ohmyteam.cc">Website</a> &middot;
    <a href="#installation">Install</a> &middot;
    <a href="#quick-start">Quick Start</a> &middot;
    <a href="#agents">Agents</a> &middot;
    <a href="#skills">Skills</a>
  </p>
</p>

---

**Oh My Team** transforms Claude Code into a coordinated development team. Instead of one AI doing everything sequentially, you get specialized agents working in parallel — researchers exploring your codebase, architects consulting on design, builders implementing features, and reviewers auditing code quality — all visible in tmux split panes.

```
omt -d
> Build an authentication system with OAuth and RBAC

Sisyphus: I detect implementation intent. Proposed team:
| Teammate      | Type       | Task                           |
|---------------|------------|--------------------------------|
| researcher-1  | explorer   | Analyze existing auth patterns |
| researcher-2  | librarian  | Research OAuth best practices  |
| builder-auth  | hephaestus | Implement OAuth flow           |
| builder-rbac  | hephaestus | Implement role-based access    |
| reviewer      | reviewer   | Code quality review            |

Say "go" to create this team.

> go

[Team created — 5 tmux panes open, each agent working on their task]
```

## Why Oh My Team?

| Without | With Oh My Team |
|---------|----------------|
| One agent does everything sequentially | Specialized agents work in parallel |
| No visibility into what's happening | tmux panes show each agent live |
| Generic approach to every task | Right specialist for each job |
| No quality gates | 5-agent parallel review catches everything |
| Agent does work without planning | Structured: plan, execute, verify |

### Inspired by Oh My OpenCode

Oh My Team brings the multi-agent orchestration experience pioneered by [Oh My OpenCode](https://github.com/code-yeongyu/oh-my-opencode) to Claude Code's native plugin system. But where OMO requires 1,146 TypeScript files and a build system, Oh My Team achieves it with **23 Markdown files** — zero dependencies, zero build step. The platform does the heavy lifting.

## Installation

### One-liner

```bash
git clone https://github.com/erkan/oh-my-team.git /tmp/oh-my-team && /tmp/oh-my-team/install.sh
```

### Manual

```bash
git clone https://github.com/erkan/oh-my-team.git
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

- [Claude Code](https://claude.com/code) v2.1.32+
- [tmux](https://github.com/tmux/tmux/wiki) (for split-pane teammate view)

```bash
brew install tmux  # macOS
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
2. Give a task: `Build a REST API with user authentication`
3. Sisyphus proposes a team structure
4. Say `go` — agents spawn in tmux panes
5. Watch them work, or use `/oh-my-team:team` to force team mode

### Force team mode

If Sisyphus handles something directly that you'd prefer delegated:

```
/oh-my-team:team <your task description>
```

This explicitly creates an agent team with tmux panes.

## Agents

Oh My Team provides 11 specialized agents, each with a focused role and optimized system prompt.

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

Skills are slash commands that trigger specific workflows.

| Skill | Purpose |
|-------|---------|
| `/oh-my-team:team` | Force agent team mode with tmux panes |
| `/oh-my-team:plan` | Strategic planning with Prometheus interview |
| `/oh-my-team:start-work` | Execute a plan with Atlas orchestration |
| `/oh-my-team:review-work` | 5-agent parallel review gate |
| `/oh-my-team:git-master` | Atomic commit workflow |
| `/oh-my-team:ai-slop-remover` | Detect and remove AI-generated code slop |
| `/oh-my-team:deep-debug` | Multi-hypothesis parallel debugging |
| `/oh-my-team:frontend-ui-ux` | Frontend development guidance (auto-loaded) |

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
|  Orchestration    Sisyphus (lead)                |
|  Layer            Atlas (conductor)              |
|                                                  |
|  Planning         Prometheus -> Metis ->         |
|  Layer            Momus (review)                 |
|                                                  |
|  Worker           Hephaestus (build)             |
|  Layer            Explorer (search)              |
|                   Librarian (research)           |
|                   Oracle (consult)               |
|                                                  |
|  Review           Reviewer (quality)             |
|  Layer            Security Auditor (security)    |
|                                                  |
+-------------------------------------------------+
|  Skills    plan | start-work | review-work       |
|            team | deep-debug | git-master         |
+-------------------------------------------------+
|  Hooks     UserPromptSubmit (auto-team)          |
|            PostToolUse (verify)                   |
|            TaskCompleted (check)                  |
+-------------------------------------------------+
|  Status    Agent name | Team | Members            |
|  Line      Context bar | Cost | Rate limits       |
+-------------------------------------------------+
             Claude Code Plugin System
```

### How it works

Oh My Team is a **pure Claude Code plugin** -- 23 Markdown files, zero build step, zero dependencies. It leverages Claude Code's native systems:

- **Agents** (`agents/*.md`) -- System prompts with model and tool configurations
- **Skills** (`skills/*/SKILL.md`) -- Slash commands that trigger workflows
- **Hooks** (`hooks/hooks.json`) -- Auto-inject team creation reminders via `UserPromptSubmit`
- **Agent Teams** -- Claude Code's experimental multi-session coordination
- **Status Line** -- Custom status bar showing active agents and teams

### Comparison

| | Oh My OpenCode | OMO Slim | **Oh My Team** |
|---|---|---|---|
| Files | 1,146 TypeScript | 98 TypeScript | **23 Markdown** |
| Build step | Bun + TypeScript | Bun + TypeScript | **None** |
| Dependencies | 50+ npm packages | 20+ npm packages | **Zero** |
| Agents | 65+ variants | 6 + Council | **11 focused** |
| System prompt tokens | ~50K+ | ~10-15K | **~2-5K** |
| Platform | OpenCode | OpenCode | **Claude Code** |
| Install | npm install + config | npm install + config | **One script** |

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
+-- settings.json                # Activates Sisyphus as default agent
+-- CLAUDE.md                    # Project instructions (team creation rules)
+-- agents/
|   +-- sisyphus.md              # Team lead / orchestrator
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
+-- skills/
|   +-- team/SKILL.md            # Force team mode
|   +-- plan/SKILL.md            # Planning workflow
|   +-- start-work/SKILL.md      # Execution workflow
|   +-- review-work/SKILL.md     # 5-agent review gate
|   +-- git-master/SKILL.md      # Commit workflow
|   +-- ai-slop-remover/SKILL.md # Code cleanup
|   +-- deep-debug/SKILL.md      # Multi-hypothesis debugging
|   +-- frontend-ui-ux/SKILL.md  # Frontend guidance
+-- hooks/
|   +-- hooks.json               # Auto-team injection hook
+-- install.sh                   # One-command installer
+-- README.md
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

## License

[MIT](LICENSE) -- Use it, fork it, make it yours.

## Credits

Inspired by [Oh My OpenCode](https://github.com/code-yeongyu/oh-my-opencode) by YeonGyu Kim. Built for [Claude Code](https://claude.com/code) by Anthropic.
