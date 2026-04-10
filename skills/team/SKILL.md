---
name: team
description: "Force agent team mode. Creates a named team with tmux split panes and spawns specialized teammates. Use this when you want visible, persistent teammates instead of background subagents."
argument-hint: "[task description]"
---

# Team Mode — Persistent Agent Team with tmux Panes

The user wants a full agent team with visible tmux panes for this task: "$ARGUMENTS"

## You MUST follow these exact steps:

**Step 1** — Create the team:
```
TeamCreate(team_name="descriptive-short-name", description="$ARGUMENTS")
```

**Step 2** — Create tasks for the work:
```
TaskCreate(subject="Research: ...", description="...")
TaskCreate(subject="Implement: ...", description="...")
```

**Step 3** — Spawn teammates INTO the team (use team_name parameter):

For research tasks:
```
Agent(prompt="Your task: ...", subagent_type="explorer", team_name="the-team-name", name="researcher-1")
```

For implementation tasks:
```
Agent(prompt="Your task: ...", subagent_type="hephaestus", team_name="the-team-name", name="builder-1")
```

For review tasks:
```
Agent(prompt="Your task: ...", subagent_type="oracle", team_name="the-team-name", name="reviewer-1")
```

**Step 4** — Assign tasks to teammates:
```
TaskUpdate(taskId="1", owner="researcher-1")
TaskUpdate(taskId="2", owner="builder-1")
```

**Step 5** — Coordinate: receive messages, verify results, send follow-ups via SendMessage.

## CRITICAL RULES:
- You MUST call TeamCreate FIRST — this is what creates the tmux session
- Every Agent call MUST include team_name and name parameters
- Do NOT use Agent without team_name — that creates subagents, not teammates
- Spawn at least 2-3 teammates for the task
