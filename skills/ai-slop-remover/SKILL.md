---
name: ai-slop-remover
description: "Utility: Detect and remove AI-generated code slop. Finds unnecessary comments, over-engineering, verbose error handling, premature abstractions. Solo operation, no team needed."
disable-model-invocation: true
argument-hint: "[file or directory to clean]"
---

# AI Slop Remover

Scan code for AI-generated patterns and clean them up. Your goal: make the code indistinguishable from what a senior engineer would write.

## What to Find and Remove

### 1. Unnecessary Comments
- Comments that restate the code: `// increment counter` above `counter++`
- Comments explaining obvious operations
- Redundant JSDoc on self-documenting functions
- "This function does X" comments where the function name already says X

### 2. Over-Engineering
- Abstractions used only once
- Factory patterns for a single implementation
- Strategy patterns with one strategy
- Configuration for things that never change
- Generic type parameters that add no value

### 3. Verbose Error Handling
- Try/catch around code that can't throw
- Validation for impossible states
- Null checks on definitely-not-null values
- Error messages that duplicate the error type

### 4. Premature Abstractions
- Utility files with 1-2 functions
- Base classes with one child
- Interfaces implemented by one class
- Helper functions called from one place

### 5. Documentation Bloat
- README sections nobody will read
- Inline docs for internal functions
- Type annotations on variables where types are obvious
- Changelog entries for trivial changes

### 6. Filler Patterns
- `console.log('Starting...')` / `console.log('Done!')`
- Empty catch blocks or `catch(e) { throw e }`
- Return type annotations TypeScript can infer
- Explicit `undefined` returns

## Process

1. Read the target files
2. Identify slop patterns
3. Present findings grouped by category
4. Ask for approval before making changes
5. Apply changes, preserving all functional code
6. Run diagnostics to verify nothing broke

## Rules

- NEVER remove functional code
- NEVER change behavior
- ONLY remove genuine slop - when in doubt, leave it
- Preserve comments that explain WHY (not WHAT)
- Keep documentation for public APIs
