Title: I made Claude Code's experimental features actually usable — remote sessions from Telegram, multi-agent teams, and multi-project management

Body:

Hey everyone,

Like many of you, I moved back to Claude Code after subscriptions stopped working with external tools. But I really missed the orchestration experience from the oh-my-opencode plugin I was using with OpenCode — the multi-agent workflow, the delegation, the parallel execution. So I built Oh My Team (OMT) to bring that experience to Claude Code natively, using its own experimental features.

What it does:

Team Orchestration — Instead of hoping Claude auto-delegates, you use the /team command. It spawns the right combination of agents from a pool of 12 (Planner, Architect, parallel Builders, Reviewers, Security Auditor) into proper tmux panes. You see each agent working in real time.

Channel Hub — This is the part I'm most excited about. Claude Code has an experimental channel system, but out of the box it's limited: one terminal connected to one bot. OMT changes that. It creates a Telegram group where each project gets its own topic — start new sessions, talk to each project's Claude directly in its own thread, approve permission prompts, all from wherever you are. No need for OpenClaw or similar tools — it's built on Claude Code's own channel protocol. More channel adapters (Slack, Discord) are coming soon.

Zero Overhead — The hub is a lightweight session that only manages your other sessions — starting, stopping, routing. It only uses tokens for management tasks. All actual project work goes through dedicated bridges straight to each session, so you're not paying double.

The whole thing is lightweight — Markdown files for agents and skills, plus a small TypeScript MCP bridge for the Telegram connection. No massive dependency tree, no build step for the core plugin.

Install: npm i -g oh-my-team
GitHub: https://github.com/erkandogan/oh-my-team
Website: https://ohmyteam.cc

Would love to hear what you think — especially if you try the hub.
