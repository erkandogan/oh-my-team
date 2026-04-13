---
name: deep-debug
description: "Multi-hypothesis parallel debugging with agent teams. Spawns multiple investigators to test competing theories simultaneously. They challenge each other's findings."
argument-hint: "[bug description or error]"
---

# Deep Debug - Multi-Hypothesis Parallel Investigation

## Step 1: Formulate 3-5 hypotheses about the root cause of: "$ARGUMENTS"

## Step 2: Create the debug team

```
TeamCreate(team_name="debug", description="Multi-hypothesis debugging: $ARGUMENTS")
```

## Step 3: Create a task per hypothesis

```
TaskCreate(subject="Hypothesis 1: [theory]", description="Investigate and find evidence for/against")
TaskCreate(subject="Hypothesis 2: [theory]", description="Investigate and find evidence for/against")
TaskCreate(subject="Hypothesis 3: [theory]", description="Investigate and find evidence for/against")
```

## Step 4: Spawn one investigator per hypothesis

```
Agent(
  prompt="HYPOTHESIS: [theory 1]
  
  Investigate this theory about: $ARGUMENTS
  1. What evidence would CONFIRM this?
  2. What evidence would DISPROVE this?
  3. Search for both. Don't just confirm.
  4. Share findings with other teammates via SendMessage.
  5. If disproved, say so clearly.",
  subagent_type="explorer",
  team_name="debug",
  name="investigator-1"
)

Agent(
  prompt="HYPOTHESIS: [theory 2] ...",
  subagent_type="explorer",
  team_name="debug",
  name="investigator-2"
)

Agent(
  prompt="HYPOTHESIS: [theory 3] ...",
  subagent_type="explorer",
  team_name="debug",
  name="investigator-3"
)
```

## Step 5: Synthesize findings

After all investigators report, resolve conflicts:

1. **Collect all evidence** — confirming AND disconfirming from every investigator
2. **Identify convergence** — did multiple investigators independently point to the same root cause?
3. **Resolve contradictions** — if investigator-1 says "it's a race condition" and investigator-2 says "it's a null pointer":
   - Which has stronger evidence (code paths, stack traces, reproducible steps)?
   - Can both be true (multi-cause bug)?
   - Spawn an Oracle teammate to adjudicate if evidence is equally strong
4. **Rank hypotheses** by surviving evidence: CONFIRMED / LIKELY / DISPROVED
5. **Apply the minimal fix** for the highest-ranked confirmed hypothesis
6. **Verify** the fix resolves the original bug before reporting completion

**NEVER apply fixes for multiple hypotheses simultaneously.** Fix one, verify, then address the next if needed.
