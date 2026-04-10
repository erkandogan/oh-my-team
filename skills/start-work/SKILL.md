---
name: start-work
description: "Execute a work plan using Atlas orchestration with agent teams. Reads plan from .sisyphus/plans/, creates a team, spawns specialized teammates to execute tasks in parallel waves."
argument-hint: "[plan-name]"
---

# Start Work - Atlas Orchestrated Execution

Execute a plan using agent teams. Follow these EXACT steps:

## Step 1: Locate the plan

If "$ARGUMENTS" is provided, read `.sisyphus/plans/$ARGUMENTS.md`.
If not, list `.sisyphus/plans/` and ask which plan to execute.
If no plans exist, suggest running `/oh-my-team:plan` first.

## Step 2: Create the team

```
TeamCreate(team_name="exec-$ARGUMENTS", description="Executing plan: $ARGUMENTS")
```

## Step 3: Create tasks from the plan

Read the plan file and create a TaskCreate for each TODO item in the plan.

## Step 4: Spawn Atlas as the conductor

```
Agent(
  prompt="You are conducting the execution of plan: .sisyphus/plans/$ARGUMENTS.md

  Read the plan. For each task:
  1. Spawn the appropriate teammate (Hephaestus for implementation, Explorer for research, Oracle for decisions)
  2. Assign the task to the teammate
  3. Verify every result by reading changed files
  4. Mark tasks complete only after verification
  5. Run final verification when all tasks done",
  subagent_type="atlas",
  team_name="exec-$ARGUMENTS",
  name="atlas"
)
```

## Step 5: Atlas spawns workers

Atlas will spawn Hephaestus/Explorer/Oracle teammates as needed, all within the same team. Monitor progress via the task list (Ctrl+T).
