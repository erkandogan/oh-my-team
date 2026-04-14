#!/usr/bin/env bash
# Oh My Team — Status Hook
#
# Called by Claude Code PostToolUse hooks for Agent, TaskCreate, TaskUpdate, Skill.
# Reads tool event from stdin, extracts a human-readable status line,
# and POSTs it to the router for display in the chat thread.
#
# Only active for hub sessions (ROUTER_URL and SESSION_NAME must be set).

[ -z "$ROUTER_URL" ] && exit 0
[ -z "$SESSION_NAME" ] && exit 0

# Read the full event JSON from stdin into a temp file (stdin may have special chars)
TMPFILE=$(mktemp)
cat > "$TMPFILE"

# Extract status line and POST to router
python3 << 'PYEOF' "$TMPFILE" "$ROUTER_URL" "$SESSION_NAME"
import sys, json, urllib.request

tmpfile, router_url, session_name = sys.argv[1], sys.argv[2], sys.argv[3]

try:
    with open(tmpfile) as f:
        d = json.load(f)
except:
    sys.exit(0)

t = d.get("tool_name", "")
i = d.get("tool_input", {})
status = ""

if t == "Agent":
    st = i.get("subagent_type", "agent")
    n = i.get("name", "")
    desc = i.get("description", "")
    status = f"> spawned {st}"
    if n:
        status += f" ({n})"
    if desc:
        status += f" -- {desc}"
elif t == "TaskCreate":
    subj = i.get("subject", "")
    if subj:
        status = f"> task: {subj}"
elif t == "TaskUpdate":
    s = i.get("status", "")
    subj = i.get("subject", i.get("taskId", ""))
    if s == "completed":
        status = f"> done: {subj}"
    elif s == "in_progress":
        status = f"> started: {subj}"
elif t == "Skill":
    skill = i.get("skill", "")
    if skill:
        status = f"> running /{skill}"

if not status:
    sys.exit(0)

payload = json.dumps({"sessionName": session_name, "text": status}).encode()
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
