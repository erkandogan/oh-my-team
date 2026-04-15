#!/usr/bin/env bash
# Oh My Team — Status Hook (lightweight, no python dependency)
#
# Called by Claude Code hooks. Reads event JSON from stdin, extracts
# a status line, and POSTs to the router via curl.
#
# Uses jq-like parsing via built-in bash string ops + simple grep/sed.
# Falls back gracefully if fields are missing.

# Read stdin into temp file
TMPFILE=$(mktemp)
cat > "$TMPFILE"

# Extract cwd and source .omt-env
CWD=$(grep -o '"cwd":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)
[ -n "$CWD" ] && [ -f "$CWD/.omt-env" ] && source "$CWD/.omt-env"
[ -z "$ROUTER_URL" ] && { rm -f "$TMPFILE"; exit 0; }
[ -z "$SESSION_NAME" ] && { rm -f "$TMPFILE"; exit 0; }

# Extract event fields
EVENT=$(grep -o '"hook_event_name":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)
TOOL=$(grep -o '"tool_name":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)

# Extract commonly used input fields
FILE_PATH=$(grep -o '"file_path":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)
FNAME=$(basename "$FILE_PATH" 2>/dev/null)
COMMAND=$(grep -o '"command":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)
PATTERN=$(grep -o '"pattern":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)
SKILL=$(grep -o '"skill":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)
DESCRIPTION=$(grep -o '"description":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)
STOP_REASON=$(grep -o '"stop_reason":"[^"]*"' "$TMPFILE" | head -1 | cut -d'"' -f4)

STATUS=""
STYPE="done"

# Truncate helper
trunc() { local s="${1:0:$2}"; [ ${#1} -gt $2 ] && s="$s..."; echo "$s"; }

case "$EVENT" in
  PreToolUse)
    STYPE="current"
    case "$TOOL" in
      Read)  [ -n "$FNAME" ] && STATUS="Reading $FNAME" ;;
      Edit)  [ -n "$FNAME" ] && STATUS="Editing $FNAME" ;;
      Write) [ -n "$FNAME" ] && STATUS="Writing $FNAME" ;;
      Bash)  [ -n "$COMMAND" ] && STATUS="Running $(trunc "$COMMAND" 50)" ;;
      Grep)  [ -n "$PATTERN" ] && STATUS="Searching $(trunc "$PATTERN" 30)" ;;
      Glob)  [ -n "$PATTERN" ] && STATUS="Finding $(trunc "$PATTERN" 30)" ;;
      Agent) STATUS="Spawning agent"; [ -n "$DESCRIPTION" ] && STATUS="$STATUS — $(trunc "$DESCRIPTION" 40)" ;;
      Skill) [ -n "$SKILL" ] && STATUS="Running /$SKILL" ;;
    esac
    ;;
  PostToolUse)
    STYPE="done"
    case "$TOOL" in
      Read)  [ -n "$FNAME" ] && STATUS="Read $FNAME" ;;
      Edit)  [ -n "$FNAME" ] && STATUS="Edited $FNAME" ;;
      Write) [ -n "$FNAME" ] && STATUS="Wrote $FNAME" ;;
      Bash)  [ -n "$COMMAND" ] && STATUS="Ran $(trunc "$COMMAND" 50)" ;;
      Grep)  [ -n "$PATTERN" ] && STATUS="Searched $(trunc "$PATTERN" 30)" ;;
      Glob)  [ -n "$PATTERN" ] && STATUS="Found $(trunc "$PATTERN" 30)" ;;
      Agent) STATUS="Agent finished" ;;
      Skill) [ -n "$SKILL" ] && STATUS="Ran /$SKILL" ;;
    esac
    ;;
  SubagentStart)
    STYPE="current"
    STATUS="Agent working"
    ;;
  SubagentStop)
    STYPE="done"
    STATUS="Agent finished"
    ;;
  Stop)
    if [ "$STOP_REASON" = "end_turn" ]; then
      STYPE="stop"
      STATUS="done"
    else
      rm -f "$TMPFILE"; exit 0
    fi
    ;;
esac

[ -z "$STATUS" ] && { rm -f "$TMPFILE"; exit 0; }

# POST to router — simple curl, no python needed
curl -s -X POST "$ROUTER_URL/status" \
  -H "Content-Type: application/json" \
  -d "{\"sessionName\":\"$SESSION_NAME\",\"text\":\"$STATUS\",\"type\":\"$STYPE\"}" \
  > /dev/null 2>&1

rm -f "$TMPFILE"
exit 0
