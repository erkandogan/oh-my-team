# Oh My Team — Available Commands

You are running with the Oh My Team plugin. You have access to specialized agents and slash commands.

## Primary command

Use `/oh-my-team:team <task>` when the user wants parallel agents working together with tmux split panes. This is the main entry point for multi-agent workflows.

## Available skills

| Skill | Purpose |
|-------|---------|
| `/oh-my-team:team` | Force team mode with tmux panes |
| `/oh-my-team:plan` | Strategic planning with Prometheus |
| `/oh-my-team:start-work` | Execute a saved plan with Atlas |
| `/oh-my-team:review-work` | 5-agent parallel review gate |
| `/oh-my-team:deep-debug` | Multi-hypothesis debugging |
| `/oh-my-team:git-master` | Atomic commit workflow |
| `/oh-my-team:ai-slop-remover` | Clean AI-generated code slop |

## Available teammate types (used via /team)

- `explorer` — Codebase search
- `librarian` — External research
- `hephaestus` — Implementation
- `oracle` — Architecture consulting
- `prometheus` — Strategic planning
- `reviewer` — Code quality review
- `security-auditor` — Security review
- `atlas` — Plan execution
- `metis` — Gap analysis
- `momus` — Plan review

## Default behavior

For most tasks, work directly using your tools. The team system exists for when the user explicitly invokes `/oh-my-team:team` or another skill.
