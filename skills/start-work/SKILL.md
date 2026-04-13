---
name: start-work
description: "Execute a work plan using Atlas orchestration with agent teams. Reads plan from .sisyphus/plans/, creates a team, spawns specialized teammates to execute tasks in parallel waves."
argument-hint: "[plan-name]"
---

# Start Work - Atlas Orchestrated Execution

Execute a plan using agent teams. Follow these EXACT steps:

## Step 1: Locate and read the plan

If "$ARGUMENTS" is provided, read `.sisyphus/plans/$ARGUMENTS.md`.
If not provided, list files in `.sisyphus/plans/` and ask the user which plan to execute.
If no plans exist, suggest running `/oh-my-team:plan` first and stop.

**You MUST read the entire plan file content now.** Store it — you'll embed it in the Atlas briefing.

## Step 2: Extract plan name and tasks

The plan name is the filename without `.md` extension (e.g., `auth-api` from `auth-api.md`).

Parse all TODO items from the plan. Each `- [ ]` line is a task.

## Step 3: Create the team

```
TeamCreate(team_name="exec-{plan-name}", description="Executing plan: {plan-name}")
```

## Step 4: Create tasks from the plan

For each TODO item in the plan:
```
TaskCreate(subject="[TODO title from plan]", description="[TODO details from plan]")
```

Set up dependencies between tasks using `TaskUpdate(taskId="...", addBlockedBy=["..."])` where the plan indicates ordering.

## Step 5: Spawn Atlas as the conductor

**CRITICAL: Embed the FULL plan content in Atlas's prompt. Atlas cannot read files outside its briefing.**

```
Agent(
  prompt="You are Atlas, conducting the execution of a work plan.

  ## THE PLAN (embedded — this is your source of truth)

  [PASTE THE ENTIRE PLAN FILE CONTENT HERE]

  ## YOUR PROTOCOL

  1. Read the plan above carefully. Identify all tasks and their dependencies.
  2. Group independent tasks into parallel waves.
  3. For each task, spawn the appropriate teammate:
     - Implementation/coding → subagent_type='hephaestus'
     - Research/investigation → subagent_type='explorer'
     - Architecture decisions → subagent_type='oracle'
  4. Brief each teammate with the 6-section format:
     TASK, EXPECTED OUTCOME, MUST DO, MUST NOT DO, CONTEXT
  5. After each teammate completes: READ the changed files yourself. Verify the work.
  6. Only mark a task complete after verification passes.
  7. If verification fails: send feedback to the teammate (max 3 retries).
  8. After all tasks: run final verification (build/test commands if available).
  9. Report completion to the team lead.

  ## RULES
  - NEVER write code yourself. Delegate everything.
  - NEVER skip verification. Read every changed file.
  - NEVER proceed if a critical task failed.",
  subagent_type="atlas",
  team_name="exec-{plan-name}",
  name="atlas"
)
```

## Step 6: Monitor

Atlas handles the orchestration from here. Monitor progress via the task list (Ctrl+T). Atlas will spawn workers, assign tasks, and verify results.

When Atlas reports completion, optionally suggest: "Run `/oh-my-team:review-work` for a comprehensive 5-agent review."
