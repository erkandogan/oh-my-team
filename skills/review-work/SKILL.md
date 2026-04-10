---
name: review-work
description: "5-agent parallel review gate using agent teams. Spawns Goal Verification, QA Execution, Code Quality, Security Audit, and Context Mining teammates. ALL must pass."
---

# Review Work - 5-Agent Parallel Review

## Step 1: Gather context

```bash
git diff --name-only HEAD~1
git diff HEAD~1
```

Read the full content of each changed file.

## Step 2: Create the review team

```
TeamCreate(team_name="review", description="5-agent parallel review of recent changes")
```

## Step 3: Create review tasks

```
TaskCreate(subject="Goal & constraint verification", description="Verify implementation matches original goal")
TaskCreate(subject="QA execution", description="Run and test the application hands-on")
TaskCreate(subject="Code quality review", description="Review code across 10 dimensions")
TaskCreate(subject="Security audit", description="Check for security vulnerabilities")
TaskCreate(subject="Context mining", description="Search git/GitHub/docs for missed context")
```

## Step 4: Spawn ALL 5 reviewers in parallel

```
Agent(prompt="GOAL VERIFICATION: Review these changes against the original goal... [embed goal, constraints, diff, file contents]", subagent_type="oracle", team_name="review", name="goal-verifier")

Agent(prompt="QA EXECUTION: Run the application and test it hands-on... [embed goal, changed files, run command]", subagent_type="hephaestus", team_name="review", name="qa-tester")

Agent(prompt="CODE QUALITY: Review code across 10 dimensions... [embed diff, file contents, neighboring files]", subagent_type="reviewer", team_name="review", name="code-reviewer")

Agent(prompt="SECURITY REVIEW: Check for vulnerabilities... [embed diff, file contents]", subagent_type="security-auditor", team_name="review", name="security-reviewer")

Agent(prompt="CONTEXT MINING: Search git history, GitHub issues, related files for missed context... [embed goal, changed files]", subagent_type="hephaestus", team_name="review", name="context-miner")
```

## Step 5: Collect and report

Wait for all 5. ALL PASS = REVIEW PASSED. ANY FAIL = REVIEW FAILED.

Report with: verdict table, blocking issues, key findings, recommendations.
