---
name: plan
description: "Strategic planning workflow. Creates an agent team with Prometheus (interview), Metis (gap analysis), and optionally Momus (plan review). Generates detailed work plans to .sisyphus/plans/."
argument-hint: "[task description]"
---

# Strategic Planning Workflow

Create an agent team for the full planning pipeline: Prometheus → Metis → (optional Momus) → Plan.

## Plan naming convention

The plan name is derived from the task description, slugified:
- "Add OAuth authentication" → `oauth-authentication`
- "Refactor the auth module" → `auth-module-refactor`
- "Build REST API for tasks" → `rest-api-tasks`

Plan file: `.sisyphus/plans/{plan-name}.md`
Draft file: `.sisyphus/drafts/{plan-name}.md`

## Step 1: Create the team

```
TeamCreate(team_name="plan-{plan-name}", description="Strategic planning for: $ARGUMENTS")
```

## Step 2: Spawn research teammates in parallel

Launch research immediately — Prometheus will use these findings during the interview.

```
Agent(
  prompt="Research the current codebase: directory structure, existing patterns, technology stack, similar implementations. Report file paths and key patterns found.",
  subagent_type="explorer",
  team_name="plan-{plan-name}",
  name="explorer-1"
)

Agent(
  prompt="Research external best practices, official documentation, and production examples relevant to: $ARGUMENTS. Focus on authoritative sources, not tutorials.",
  subagent_type="librarian",
  team_name="plan-{plan-name}",
  name="librarian-1"
)
```

## Step 3: Spawn Prometheus as the planner

```
Agent(
  prompt="You are Prometheus, leading the planning for: $ARGUMENTS
  Plan name: {plan-name}

  Your process:
  1. Wait for explorer-1 and librarian-1 research results (they're already running)
  2. Interview the user to gather requirements — classify intent first (trivial/refactor/build/architecture/research)
  3. Record all decisions in .sisyphus/drafts/{plan-name}.md
  4. Run the clearance checklist after each interview turn
  5. When all requirements are clear, generate the plan to .sisyphus/plans/{plan-name}.md
  6. After generating the plan, tell the team lead: 'Plan generated. Ready for Metis gap analysis.'

  Do NOT consult Metis yourself — the team lead will spawn Metis separately.",
  subagent_type="prometheus",
  team_name="plan-{plan-name}",
  name="prometheus"
)
```

## Step 4: After Prometheus generates the plan — spawn Metis

When Prometheus reports the plan is ready, spawn Metis to analyze it:

```
Agent(
  prompt="You are Metis, the gap analyzer. Read the plan at .sisyphus/plans/{plan-name}.md.

  Analyze for:
  1. Hidden intentions and unstated requirements
  2. Ambiguities that could derail implementation
  3. AI-slop risks: scope inflation, premature abstraction, over-validation, documentation bloat, helper-function bloat, over-generic abstractions, unnecessary error handling for impossible cases, config for things that never change
  4. Missing acceptance criteria
  5. Tasks that are too large (should be split)
  6. Missing dependency declarations between tasks

  Output your findings as directives: MUST / MUST NOT / PATTERN / TOOL recommendations.

  Send findings to team lead when done.",
  subagent_type="metis",
  team_name="plan-{plan-name}",
  name="metis"
)
```

After receiving Metis findings, update the plan to incorporate them. Then ask the user:

> "Plan updated with Metis's gap analysis. Want Momus to review it for executability, or proceed to `/oh-my-team:start-work {plan-name}`?"

## Step 5 (optional): Momus review

If the user wants high-accuracy mode, spawn Momus:

```
Agent(
  prompt="Review the plan at .sisyphus/plans/{plan-name}.md for executability.

  Check ONLY:
  1. Do referenced files exist?
  2. Can each task be started (enough context)?
  3. Any blocking contradictions?
  4. Do tasks have QA scenarios?

  Verdict: [OKAY] or [REJECT] with max 3 blocking issues.
  Approval bias — 80% clear is good enough.",
  subagent_type="momus",
  team_name="plan-{plan-name}",
  name="momus"
)
```

If Momus rejects, update the plan to fix the blocking issues and resubmit. Max 2 revision rounds.

## Step 6: Completion

When the plan is approved (by self-review, Metis incorporation, and optional Momus):

> "Plan saved to `.sisyphus/plans/{plan-name}.md`. Run `/oh-my-team:start-work {plan-name}` to begin execution."
