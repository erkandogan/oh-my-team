# Contributing to Oh My Team

Thanks for wanting to contribute! Oh My Team is a simple plugin — 23 Markdown files, zero build step. Contributing should be just as simple.

## How to contribute

1. Fork the repo
2. Create a branch: `git checkout -b my-feature`
3. Make your changes
4. Test locally: `claude --plugin-dir ./oh-my-team`
5. Submit a PR

## What to contribute

### New agents
Create `agents/your-agent.md` with YAML frontmatter (`name`, `description`, `model`, `tools`) and a focused system prompt. Keep prompts under 100 lines — shorter is better.

### New skills
Create `skills/your-skill/SKILL.md` with frontmatter and instructions. Skills should leverage `TeamCreate` and `Agent` tools for team-based workflows.

### Improvements to existing agents
The agent prompts are the core value. If you find a way to make an agent more effective, more concise, or better at delegating — that's a high-value PR.

### Bug fixes
If something doesn't work as documented, fix it.

## Guidelines

- **Keep it simple.** The entire plugin is Markdown files. No build system, no dependencies, no TypeScript. That's the point.
- **Keep prompts short.** Every token in a system prompt costs money on every request. If you can say it in 50 lines, don't use 200.
- **Test with `claude --plugin-dir`** before submitting. Verify your agent/skill works.
- **One PR, one thing.** Don't bundle unrelated changes.

## What NOT to contribute

- Build systems, package.json, TypeScript compilation
- Dependencies on external tools (beyond tmux and jq)
- Agent prompts longer than 200 lines
- Changes that break existing agent behavior without discussion

## Reporting issues

Open a GitHub issue with:
1. What you expected
2. What happened
3. Your Claude Code version (`claude --version`)
4. Whether you used `omt` or `claude --plugin-dir`
