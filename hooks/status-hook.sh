#!/usr/bin/env bash
# Oh My Team — Status Hook
#
# Called by Claude Code hooks for PreToolUse, PostToolUse, SubagentStart,
# SubagentStop, and Stop events. Extracts a human-readable status line
# and POSTs it to the router for live progress display in the chat thread.
#
# Protocol: POST /status { sessionName, text, type }
#   type: "current" = action in progress (shown with ⏳)
#   type: "done"    = action completed (shown with ✓)
#   type: "stop"    = turn ended (clean up status message)
#
# Claude Code doesn't pass custom env vars to hooks. We read ROUTER_URL
# and SESSION_NAME from .omt-env in the session's CWD (extracted from
# the hook's stdin JSON "cwd" field).

# Read stdin into temp file first (contains the event JSON with cwd)
TMPFILE=$(mktemp)
cat > "$TMPFILE"

# Extract cwd from the JSON and source .omt-env from there
SESSION_CWD=$(python3 -c "import json,sys; print(json.load(open(sys.argv[1])).get('cwd',''))" "$TMPFILE" 2>/dev/null)
[ -n "$SESSION_CWD" ] && [ -f "$SESSION_CWD/.omt-env" ] && source "$SESSION_CWD/.omt-env"

# If still no ROUTER_URL, this isn't a hub session — exit silently
[ -z "$ROUTER_URL" ] && { rm -f "$TMPFILE"; exit 0; }
[ -z "$SESSION_NAME" ] && { rm -f "$TMPFILE"; exit 0; }

python3 << 'PYEOF' "$TMPFILE" "$ROUTER_URL" "$SESSION_NAME"
import sys, json, urllib.request, os

tmpfile, router_url, session_name = sys.argv[1], sys.argv[2], sys.argv[3]

try:
    with open(tmpfile) as f:
        d = json.load(f)
except:
    sys.exit(0)

event = d.get("hook_event_name", "")
tool = d.get("tool_name", "")
inp = d.get("tool_input", {})
status = ""
stype = "done"

def trunc(s, n=40):
    s = str(s).replace("\n", " ").strip()
    return (s[:n] + "...") if len(s) > n else s

def fname(path):
    return os.path.basename(str(path)) if path else ""

# ─── PreToolUse: "currently doing..." ────────────────────────────────
if event == "PreToolUse":
    stype = "current"
    if tool == "Read":
        f = fname(inp.get("file_path", ""))
        if f: status = f"Reading {f}"
    elif tool == "Edit":
        f = fname(inp.get("file_path", ""))
        if f: status = f"Editing {f}"
    elif tool == "Write":
        f = fname(inp.get("file_path", ""))
        if f: status = f"Writing {f}"
    elif tool == "Bash":
        cmd = trunc(inp.get("command", ""), 50)
        if cmd: status = f"Running `{cmd}`"
    elif tool == "Grep":
        pat = trunc(inp.get("pattern", ""), 30)
        if pat: status = f"Searching `{pat}`"
    elif tool == "Glob":
        pat = trunc(inp.get("pattern", ""), 30)
        if pat: status = f"Finding `{pat}`"
    elif tool == "Agent":
        st = inp.get("subagent_type", "agent")
        desc = trunc(inp.get("description", ""), 40)
        status = f"Spawning {st}"
        if desc: status += f" -- {desc}"
    elif tool == "Skill":
        skill = inp.get("skill", "")
        if skill: status = f"Running /{skill}"
    elif tool == "TaskCreate":
        subj = trunc(inp.get("subject", ""), 50)
        if subj: status = f"Creating task: {subj}"

# ─── PostToolUse: "just finished" ────────────────────────────────────
elif event == "PostToolUse":
    stype = "done"
    if tool == "Read":
        f = fname(inp.get("file_path", ""))
        if f: status = f"Read {f}"
    elif tool == "Edit":
        f = fname(inp.get("file_path", ""))
        if f: status = f"Edited {f}"
    elif tool == "Write":
        f = fname(inp.get("file_path", ""))
        if f: status = f"Wrote {f}"
    elif tool == "Bash":
        cmd = trunc(inp.get("command", ""), 50)
        if cmd: status = f"Ran `{cmd}`"
    elif tool == "Grep":
        pat = trunc(inp.get("pattern", ""), 30)
        if pat: status = f"Searched `{pat}`"
    elif tool == "Glob":
        pat = trunc(inp.get("pattern", ""), 30)
        if pat: status = f"Found `{pat}`"
    elif tool == "Agent":
        st = inp.get("subagent_type", "agent")
        n = inp.get("name", "")
        desc = trunc(inp.get("description", ""), 40)
        status = f"Spawned {st}"
        if n: status += f" ({n})"
        elif desc: status += f" -- {desc}"
    elif tool == "TaskCreate":
        subj = trunc(inp.get("subject", ""), 50)
        if subj: status = f"Task: {subj}"
    elif tool == "TaskUpdate":
        s = inp.get("status", "")
        subj = trunc(inp.get("subject", inp.get("taskId", "")), 50)
        if s == "completed": status = f"Done: {subj}"
        elif s == "in_progress": status = f"Started: {subj}"
    elif tool == "Skill":
        skill = inp.get("skill", "")
        if skill: status = f"Ran /{skill}"

# ─── SubagentStart ────────────────────────────────────────────────────
elif event == "SubagentStart":
    stype = "current"
    at = d.get("agent_type", "agent")
    status = f"Agent {at} working"

# ─── SubagentStop ─────────────────────────────────────────────────────
elif event == "SubagentStop":
    stype = "done"
    at = d.get("agent_type", "agent")
    status = f"Agent {at} finished"

# ─── Stop (end_turn only — not intermediate tool_use stops) ──────────
elif event == "Stop":
    reason = d.get("stop_reason", "")
    if reason == "end_turn":
        stype = "stop"
        status = "done"
    else:
        sys.exit(0)

if not status:
    sys.exit(0)

payload = json.dumps({
    "sessionName": session_name,
    "text": status,
    "type": stype,
}).encode()
req = urllib.request.Request(
    f"{router_url}/status",
    data=payload,
    headers={"Content-Type": "application/json"},
    method="POST",
)
try:
    urllib.request.urlopen(req, timeout=2)
except:
    pass
PYEOF

rm -f "$TMPFILE"
exit 0
