# Oh My Team — Installation Guide

> **For LLM agents**: Fetch this file and follow every step.
> **For humans**: Copy the command below into your LLM agent and let it handle the rest.
>
> ```
> Install and configure oh-my-team by following the instructions here:
> https://raw.githubusercontent.com/erkandogan/oh-my-team/master/docs/install.md
> ```

---

## Step 1: Check prerequisites

Run each command. If any fails, install it in Step 2.

```bash
node --version    # Need v18+
tmux -V           # Any version
```

Optional (only needed for Hub — remote control via Telegram/Slack):
```bash
bun --version     # Any version
```

## Step 2: Install missing prerequisites

### tmux (required — enables split-pane agent view)

**macOS:**
```bash
brew install tmux
```

**Ubuntu / Debian:**
```bash
sudo apt update && sudo apt install -y tmux
```

**Arch:**
```bash
sudo pacman -S tmux
```

**Verify:** `tmux -V` should print a version.

### Bun (optional — only for Hub features)

```bash
curl -fsSL https://bun.sh/install | bash
```

After install, reload your shell or run:
```bash
source ~/.bashrc   # or ~/.zshrc
```

**Verify:** `bun --version` should print a version.

### Node.js (if not installed)

```bash
curl -fsSL https://fnm.vercel.app/install | bash  # Fast Node Manager
fnm install --lts
```

**Verify:** `node --version` should print v18+.

## Step 3: Install Oh My Team

```bash
npm i -g oh-my-team
```

This does everything:
- Installs the `omt` CLI
- Copies the plugin to `~/.oh-my-team/`
- Enables experimental agent teams in Claude Code settings
- Sets tmux split-pane mode for agent visibility

**Verify:**
```bash
omt help
```

Should print the CLI help with available commands.

### Troubleshooting

**`omt: command not found`** — npm's global bin isn't in PATH:
```bash
# Find where npm puts global binaries
npm config get prefix
# Add that path's /bin to your shell profile:
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## Step 4: Start using Oh My Team

### Local mode (no setup needed)

```bash
omt           # Start with Sisyphus orchestrator in tmux
omt -d        # Start with auto-approve (skip permission prompts)
omt -c        # Continue last session
```

Inside the session, trigger team mode:
```
/oh-my-team:team Build a REST API with authentication
```

This spawns specialized agents in parallel tmux panes — planner, builders, reviewers — all coordinated automatically.

### Hub mode (remote control — optional)

The Hub lets you control multiple Claude Code sessions from Telegram or Slack. Each project gets its own thread. Skip this if you only want local mode.

**Choose your platform and follow the guide:**

- **Telegram**: [Hub Telegram Setup](https://raw.githubusercontent.com/erkandogan/oh-my-team/master/docs/hub-telegram.md)
- **Slack**: [Hub Slack Setup](https://raw.githubusercontent.com/erkandogan/oh-my-team/master/docs/hub-slack.md)

Or run the interactive wizard:
```bash
omt hub init    # Walks you through platform selection and configuration
omt hub start   # Starts the router + hub session
```

---

## Quick reference

| Command | What it does |
|---------|-------------|
| `omt` | Start interactive session |
| `omt -d` | Start with auto-approve |
| `omt -c` | Continue last session |
| `omt hub init` | Configure hub (Telegram/Slack) |
| `omt hub start` | Start router + hub |
| `omt hub add <dir>` | Add a project session |
| `omt hub list` | List active sessions |
| `omt hub attach [name]` | Attach to a session |
| `omt hub stop` | Stop everything |

## Available skills (slash commands)

| Skill | Purpose |
|-------|---------|
| `/oh-my-team:team <task>` | Spawn parallel agent team |
| `/oh-my-team:plan <task>` | Strategic planning pipeline |
| `/oh-my-team:start-work <plan>` | Execute a saved plan |
| `/oh-my-team:review-work` | 5-agent parallel review |
| `/oh-my-team:deep-debug <issue>` | Multi-hypothesis debugging |
| `/oh-my-team:git-master` | Atomic commit workflow |
| `/oh-my-team:ai-slop-remover` | Clean AI code patterns |

## 12 agents

| Layer | Agents |
|-------|--------|
| Hub | Hub (session manager) |
| Orchestration | Sisyphus (team lead), Atlas (plan conductor) |
| Planning | Prometheus (planner), Metis (gap analysis), Momus (plan review) |
| Workers | Hephaestus (builder), Explorer (search), Librarian (research), Oracle (architecture) |
| Review | Reviewer (code quality), Security Auditor (security) |
