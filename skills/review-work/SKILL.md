---
name: review-work
description: "5-agent parallel review gate using agent teams. Spawns Goal Verification, QA Execution, Code Quality, Security Audit, and Context Mining teammates. ALL must pass."
---

# Review Work - 5-Agent Parallel Review

## Step 1: Gather context

Collect all review inputs before spawning agents:

```bash
# Get changed files
CHANGED=$(git diff --name-only HEAD~1)
# Get diff
DIFF=$(git diff HEAD~1)
```

Then read the full content of each changed file AND 1-2 neighboring files to show existing patterns.

Also extract from conversation history:
- **GOAL**: The original objective the user requested
- **CONSTRAINTS**: Rules, requirements, limitations discussed
- **BACKGROUND**: Why this work was needed

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

**IMPORTANT**: Oracle agents cannot read files — embed ALL file contents and diffs directly in their prompts. Hephaestus/Explorer agents CAN read files — give them pointers.

```
Agent(
  prompt="GOAL & CONSTRAINT VERIFICATION

  Original goal: [GOAL from conversation]
  Constraints: [CONSTRAINTS]
  Background: [BACKGROUND]
  Changed files: [list]

  [EMBED FULL FILE CONTENTS HERE — Oracle cannot read files]
  [EMBED FULL DIFF HERE]

  Review checklist:
  1. Break goal into sub-requirements. Mark each ACHIEVED/MISSED/PARTIAL.
  2. Verify every constraint with specific code evidence.
  3. Flag over-engineering or scope creep.
  4. Walk through 3+ scenarios for behavioral correctness.

  Output: <verdict>PASS/FAIL</verdict> <summary>1-3 sentences</summary> <blocking_issues>list or empty</blocking_issues>",
  subagent_type="oracle",
  team_name="review",
  name="goal-verifier"
)

Agent(
  prompt="QA EXECUTION — Run the application and test it hands-on.

  Goal: [GOAL]
  Changed files: [list]
  Run command: [detect from package.json scripts or Makefile]

  Process:
  1. Brainstorm 15-30 test scenarios (happy paths, edge cases, error paths, regressions)
  2. Prioritize: P0 (must pass), P1 (should pass), P2 (nice to pass)
  3. Execute P0 first, then P1
  4. For each test: execute, compare expected vs actual, mark PASS/FAIL

  Output: <verdict>PASS/FAIL</verdict> <scenario_coverage>total/passed/failed</scenario_coverage> <blocking_issues>P0/P1 failures</blocking_issues>",
  subagent_type="hephaestus",
  team_name="review",
  name="qa-tester"
)

Agent(
  prompt="CODE QUALITY REVIEW

  [EMBED FULL FILE CONTENTS + NEIGHBORING FILES showing existing patterns]
  [EMBED DIFF]

  Review across 10 dimensions: correctness, pattern consistency, naming, error handling, type safety, performance, abstraction level, testing, API design, tech debt.

  Categorize findings: CRITICAL (bugs/crashes), MAJOR (fix before merge), MINOR (improvement), NITPICK (style).

  Output: <verdict>PASS/FAIL</verdict> <findings>categorized list</findings> <blocking_issues>CRITICAL+MAJOR only</blocking_issues>",
  subagent_type="reviewer",
  team_name="review",
  name="code-reviewer"
)

Agent(
  prompt="SECURITY REVIEW

  [EMBED FULL FILE CONTENTS]
  [EMBED DIFF]

  Check: input validation, auth/authz, secrets in code, data exposure, dependencies/CVEs, crypto usage, path traversal, network config, error leakage, supply chain.

  Only CRITICAL/HIGH findings produce a FAIL.

  Output: <verdict>PASS/FAIL</verdict> <severity>CRITICAL/HIGH/MEDIUM/LOW/NONE</severity> <findings>list with remediation</findings>",
  subagent_type="security-auditor",
  team_name="review",
  name="security-reviewer"
)

Agent(
  prompt="CONTEXT MINING — Search for missed context that should have informed this implementation.

  Goal: [GOAL]
  Changed files: [list]

  Search these sources:
  1. git log --oneline -20 -- [each changed file] (recent changes and reasons)
  2. git blame [critical sections] (who wrote what)
  3. git log --all --grep='[keywords from goal]' (related commits)
  4. If gh CLI available: gh issue list --search '[keywords]', gh pr list --search '[keywords]'
  5. Files that import or reference changed modules
  6. Documentation (README, docs/, comments) referencing changed behavior

  Output: <verdict>PASS/FAIL</verdict> <discovered_context>source + finding + relevance</discovered_context> <missed_requirements>list or empty</missed_requirements>",
  subagent_type="explorer",
  team_name="review",
  name="context-miner"
)
```

## Step 5: Collect verdicts and synthesize

Track each teammate's verdict as they report back:

| # | Review Area | Teammate | Verdict |
|---|------------|----------|---------|
| 1 | Goal Verification | goal-verifier | pending |
| 2 | QA Execution | qa-tester | pending |
| 3 | Code Quality | code-reviewer | pending |
| 4 | Security | security-reviewer | pending |
| 5 | Context Mining | context-miner | pending |

**Do NOT deliver the final report until ALL 5 have completed.**

**Verdict logic**: ALL 5 PASS = REVIEW PASSED. ANY FAIL = REVIEW FAILED.

Final report format:
```
# Review Work - Final Report

## Overall Verdict: PASSED / FAILED

[verdict table with all 5 results]

## Blocking Issues
[aggregated from all agents, deduplicated, priority-ordered]

## Key Findings
[top 5-10 across all agents]

## Recommendations
[if FAILED: exactly what to fix, in order]
[if PASSED: non-blocking suggestions]
```
