---
name: plan
description: "Strategic planning workflow. Creates an agent team with Prometheus for interview-based requirements gathering, Explorers for codebase research, and Librarians for external knowledge. Generates detailed work plans to .sisyphus/plans/."
argument-hint: "[task description]"
---

# Strategic Planning Workflow

Create an agent team for planning. Follow these EXACT steps:

## Step 1: Create the team

```
TeamCreate(team_name="plan-$ARGUMENTS", description="Strategic planning for: $ARGUMENTS")
```

## Step 2: Spawn Prometheus as the planner

```
Agent(
  prompt="You are leading the planning for: $ARGUMENTS

  Your process:
  1. First, spawn Explorer and Librarian teammates to research in parallel
  2. Interview the user to gather requirements
  3. Record decisions in .sisyphus/drafts/ as you go
  4. Consult Metis before finalizing (spawn a Metis teammate)
  5. Generate the plan to .sisyphus/plans/{name}.md
  6. Offer Momus review for high-accuracy mode

  Start by researching the current project state and the target.",
  subagent_type="prometheus",
  team_name="plan-$ARGUMENTS",
  name="prometheus"
)
```

## Step 3: Spawn research teammates in parallel

```
Agent(
  prompt="Research the current codebase structure, existing patterns, and technology stack. Report findings.",
  subagent_type="explorer",
  team_name="plan-$ARGUMENTS",
  name="explorer-1"
)

Agent(
  prompt="Research external best practices, documentation, and production examples relevant to: $ARGUMENTS",
  subagent_type="librarian",
  team_name="plan-$ARGUMENTS",
  name="librarian-1"
)
```

## Step 4: Coordinate

Prometheus interviews the user, incorporates research findings, and generates the plan. When complete, inform the user: "Plan saved. Run `/oh-my-team:start-work {name}` to begin execution."
