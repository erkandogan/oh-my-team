---
name: git-master
description: "Utility: Atomic commit workflow. Analyzes changes, groups into logical commits, writes clear commit messages. Solo operation, no team needed."
disable-model-invocation: true
argument-hint: "[optional: commit message override]"
---

# Git Master - Atomic Commit Workflow

Create clean, atomic commits from the current changes.

## Protocol

### Step 1: Analyze Changes

```bash
git status
git diff --stat
git diff
```

Understand what changed and why.

### Step 2: Group Into Logical Commits

If changes span multiple concerns, group them:
- Each commit should be **one logical change**
- Each commit should leave the codebase in a **buildable state**
- Order commits so dependencies come first

### Step 3: Write Commit Messages

Format:
```
<type>(<scope>): <description>

<body - what and why, not how>
```

Types: feat, fix, refactor, test, docs, chore, perf, style

Rules:
- Subject line: imperative mood, lowercase, no period, under 72 chars
- Body: explain WHY, not WHAT (the diff shows what)
- Reference issues if applicable

### Step 4: Stage and Commit

For each logical group:
1. Stage specific files: `git add <files>`
2. Commit with the prepared message
3. Verify: `git log --oneline -1`

### Step 5: Verify

- Run `git log --oneline -5` to show recent commits
- Confirm each commit is atomic and self-contained

## Anti-Patterns

- NEVER `git add .` blindly
- NEVER commit .env, credentials, or secrets
- NEVER create empty commits
- NEVER amend published commits without asking
- NEVER force push without explicit permission
