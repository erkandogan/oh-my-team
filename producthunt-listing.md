# Product Hunt Listing — Oh My Team

## Product Name
Oh My Team

## Tagline (60 chars max)
Turn Claude Code into a full AI development team

## Description

Claude Code is powerful — but it's one AI doing everything: research, planning, coding, reviewing its own work. That's like having one developer play every role on a team.

Oh My Team gives Claude Code 12 specialized agents that work in parallel. A planner that interviews you. Builders that implement in parallel tmux panes. A 5-agent review gate where independent reviewers catch what a single agent misses. A security auditor. An architecture consultant.

But the feature I'm most proud of is the **Hub** — remote multi-project management from your phone.

Each project gets its own Telegram topic or Slack thread. Start sessions, send instructions, approve permissions, check progress — all from wherever you are. Close your laptop, sessions keep running in tmux. Come back, everything's still there.

The architecture is intentionally simple: Markdown files for agent definitions, a small TypeScript bridge for messaging, and Claude Code's own plugin system. No massive dependencies. No build step for the core plugin.

**One install, full team:**
```
npm i -g oh-my-team
```

### What you get:

**12 Specialized Agents**
- Sisyphus (team lead) orchestrates automatically
- Prometheus (planner) interviews you and researches your codebase
- Hephaestus (builder) implements end-to-end with full tool access
- 5-agent review gate: goals, QA, code quality, security, context mining
- Explorer + Librarian for fast research

**Hub — Remote Control**
- One Telegram group or Slack channel, multiple projects
- Each project in its own topic/thread — zero cross-talk
- Permission prompts forwarded to your phone
- Sessions persist in tmux — survive laptop closing
- Zero extra token cost — hub only routes, never reads project context

**8 Slash Commands**
- `/team` — spawn parallel agents for any task
- `/plan` → `/start-work` → `/review-work` — full planning-to-review pipeline
- `/deep-debug` — multi-hypothesis parallel debugging

## Topics/Categories
- Developer Tools
- Artificial Intelligence
- Open Source
- Productivity
- CLI Tools

## Links
- Website: https://ohmyteam.cc
- GitHub: https://github.com/erkandogan/oh-my-team
- npm: https://www.npmjs.com/package/oh-my-team

## Pricing
Free / Open Source (MIT License)

## Platforms
macOS, Linux

---

## Maker Comment (first comment on the PH post)

Hey Product Hunt!

I built Oh My Team because I was frustrated with single-agent AI workflows. I'd been using Claude Code as my primary dev tool for months, but asking one AI to plan, build, AND objectively review its own work doesn't produce great results. We don't do that with human teams — why do it with AI?

The turning point was Claude Code's experimental channel system. It lets you connect a messaging bot to your terminal. But it's limited to one bot, one terminal — close the terminal, session dies. I wanted to manage 3-5 projects from my phone without setting up separate bots for each one.

So I built a router on top of the channel protocol. One Telegram group, multiple projects, each in its own topic. The hub session manages everything — start/stop sessions, route messages, forward permission prompts. Each project has its own bridge, so the hub never touches project context. Zero extra token cost.

The agent system is the other half. 12 agents with focused roles. The review workflow is my favorite — 5 independent agents review from different angles (goals, QA, quality, security, context). They catch real issues that a single self-reviewing agent misses.

The whole thing is lightweight — Markdown files for agents, a small TypeScript channel bridge, and a bash CLI. MIT licensed. PRs welcome, especially if anyone wants to build the Discord adapter.

Would love to hear what you think, especially if you try the Hub. That's where the real value is.

— Erkan

---

## Gallery Images (suggested)

1. **Hero/Main** — Terminal showing tmux panes with multiple agents working (or the showcase.gif from GitHub)
2. **Hub Flow** — Telegram screenshot showing the topic structure (General + project topics)
3. **Architecture Diagram** — The ASCII architecture from the README, rendered clean
4. **Review Gate** — Terminal showing 5 review agents running in parallel
5. **One-line Install** — Clean terminal showing `npm i -g oh-my-team` and the first team spawn

---

## Launch Checklist

- [ ] Record a 1-2 minute demo video or animated GIF showing hub in action
- [ ] Take Telegram screenshots showing multi-project management
- [ ] Verify npm download count and GitHub stars are visible on README badges
- [ ] Update version number on ohmyteam.cc hero to match latest
- [ ] Prepare 2-3 "first day" responses for common questions
- [ ] Schedule launch for Tuesday or Wednesday, 12:01 AM PST
- [ ] Share with existing Reddit/dev.to audience for initial upvotes
- [ ] Have a "What's next" roadmap ready (Discord adapter, etc.)
