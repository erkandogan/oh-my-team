#!/bin/bash
# Oh My Team — Installer
# Installs the plugin globally and creates the `omt` CLI wrapper

set -e

CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
BOLD='\033[1m'
RESET='\033[0m'

INSTALL_DIR="$HOME/.oh-my-team"
BIN_DIR="$HOME/.local/bin"
CLAUDE_SETTINGS="$HOME/.claude/settings.json"
CLAUDE_CONFIG="$HOME/.claude.json"

echo -e "${CYAN}${BOLD}"
echo "  ╔══════════════════════════════════════╗"
echo "  ║         Oh My Team Installer       ║"
echo "  ║   Multi-agent orchestration plugin   ║"
echo "  ╚══════════════════════════════════════╝"
echo -e "${RESET}"

# Find the source directory (where this script lives)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Step 1: Copy plugin to global location
echo -e "${YELLOW}[1/5]${RESET} Installing plugin to ${INSTALL_DIR}..."
if [ -d "$INSTALL_DIR" ]; then
    echo -e "  ${YELLOW}Updating existing installation...${RESET}"
    rm -rf "$INSTALL_DIR"
fi
cp -r "$SCRIPT_DIR" "$INSTALL_DIR"
rm -f "$INSTALL_DIR/install.sh"  # Don't need installer in the installed copy
echo -e "  ${GREEN}Done${RESET}"

# Step 2: Create bin directory
echo -e "${YELLOW}[2/5]${RESET} Creating CLI wrapper..."
mkdir -p "$BIN_DIR"

# Step 3: Create the `omt` wrapper
cat > "$BIN_DIR/omt" << 'WRAPPER'
#!/bin/bash
# omt — Oh My Team CLI wrapper
# Launches Claude Code with the Oh My Team plugin inside tmux
# This ensures agent team teammates appear as split panes automatically

PLUGIN_DIR="$HOME/.oh-my-team"

if [ ! -d "$PLUGIN_DIR" ]; then
    echo "Error: Oh My Team not installed. Run the installer first."
    exit 1
fi

# Expand shortcuts before passing to claude
ARGS=()
for arg in "$@"; do
    case "$arg" in
        -d|--danger) ARGS+=("--dangerously-skip-permissions") ;;
        *)           ARGS+=("$arg") ;;
    esac
done

# If already inside tmux, just run claude directly
if [ -n "$TMUX" ]; then
    exec claude --plugin-dir "$PLUGIN_DIR" "${ARGS[@]}"
fi

# If tmux is available, launch claude inside a new tmux session
if command -v tmux &>/dev/null; then
    SESSION_NAME="omt-$$"
    INNER_CMD="claude --plugin-dir '$PLUGIN_DIR'"
    for a in "${ARGS[@]}"; do
        INNER_CMD="$INNER_CMD '$a'"
    done
    exec tmux new-session -s "$SESSION_NAME" "$INNER_CMD; echo 'Press any key to exit...'; read -n1"
else
    exec claude --plugin-dir "$PLUGIN_DIR" "${ARGS[@]}"
fi
WRAPPER
chmod +x "$BIN_DIR/omt"
echo -e "  ${GREEN}Created ${BIN_DIR}/omt${RESET}"

# Step 4: Enable agent teams in Claude settings
echo -e "${YELLOW}[3/5]${RESET} Configuring Claude Code settings..."
mkdir -p "$HOME/.claude"

if [ -f "$CLAUDE_SETTINGS" ]; then
    # Check if agent teams already enabled
    if grep -q "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS" "$CLAUDE_SETTINGS" 2>/dev/null; then
        echo -e "  ${GREEN}Agent teams already enabled${RESET}"
    else
        # Add env section if not present
        if grep -q '"env"' "$CLAUDE_SETTINGS" 2>/dev/null; then
            # env exists, add the variable
            python3 -c "
import json
with open('$CLAUDE_SETTINGS') as f:
    cfg = json.load(f)
cfg.setdefault('env', {})['CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS'] = '1'
with open('$CLAUDE_SETTINGS', 'w') as f:
    json.dump(cfg, f, indent=2)
" 2>/dev/null && echo -e "  ${GREEN}Enabled agent teams${RESET}" || echo -e "  ${YELLOW}Please add CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 to settings manually${RESET}"
        else
            python3 -c "
import json
with open('$CLAUDE_SETTINGS') as f:
    cfg = json.load(f)
cfg['env'] = cfg.get('env', {})
cfg['env']['CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS'] = '1'
with open('$CLAUDE_SETTINGS', 'w') as f:
    json.dump(cfg, f, indent=2)
" 2>/dev/null && echo -e "  ${GREEN}Enabled agent teams${RESET}" || echo -e "  ${YELLOW}Please add CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 to settings manually${RESET}"
        fi
    fi
else
    echo '{"env":{"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS":"1"}}' | python3 -m json.tool > "$CLAUDE_SETTINGS"
    echo -e "  ${GREEN}Created settings with agent teams enabled${RESET}"
fi

# Step 5: Set tmux teammate mode
echo -e "${YELLOW}[4/5]${RESET} Configuring tmux teammate mode..."
if [ -f "$CLAUDE_CONFIG" ]; then
    if grep -q '"teammateMode"' "$CLAUDE_CONFIG" 2>/dev/null; then
        echo -e "  ${GREEN}Teammate mode already configured${RESET}"
    else
        python3 -c "
import json
with open('$CLAUDE_CONFIG') as f:
    cfg = json.load(f)
cfg['teammateMode'] = 'tmux'
with open('$CLAUDE_CONFIG', 'w') as f:
    json.dump(cfg, f, indent=2)
" 2>/dev/null && echo -e "  ${GREEN}Set teammateMode to tmux${RESET}" || echo -e "  ${YELLOW}Please add teammateMode: tmux to ~/.claude.json manually${RESET}"
    fi
else
    echo -e "  ${YELLOW}~/.claude.json not found (will be created on first claude run)${RESET}"
fi

# Step 6: Add to PATH
echo -e "${YELLOW}[5/5]${RESET} Checking PATH..."
if echo "$PATH" | grep -q "$BIN_DIR"; then
    echo -e "  ${GREEN}${BIN_DIR} already in PATH${RESET}"
else
    # Detect shell and add to appropriate rc file
    SHELL_NAME=$(basename "$SHELL")
    case "$SHELL_NAME" in
        zsh)  RC_FILE="$HOME/.zshrc" ;;
        bash) RC_FILE="$HOME/.bashrc" ;;
        fish) RC_FILE="$HOME/.config/fish/config.fish" ;;
        *)    RC_FILE="$HOME/.profile" ;;
    esac

    if [ "$SHELL_NAME" = "fish" ]; then
        echo "set -gx PATH $BIN_DIR \$PATH" >> "$RC_FILE"
    else
        echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$RC_FILE"
    fi
    echo -e "  ${GREEN}Added ${BIN_DIR} to PATH in ${RC_FILE}${RESET}"
    echo -e "  ${YELLOW}Run: source ${RC_FILE} (or restart terminal)${RESET}"
fi

# Step 6: Install status line
echo -e "${YELLOW}[+]${RESET} Installing status line..."
cp "$INSTALL_DIR/hooks/../README.md" /dev/null 2>&1 || true
# Copy statusline script
cat > "$HOME/.claude/oh-my-team-statusline.sh" << 'STATUSLINE'
#!/bin/bash
input=$(cat)
CYAN='\033[36m'; GREEN='\033[32m'; YELLOW='\033[33m'; RED='\033[31m'; MAGENTA='\033[35m'; DIM='\033[2m'; BOLD='\033[1m'; RESET='\033[0m'
MODEL=$(echo "$input" | jq -r '.model.display_name // "?"')
AGENT=$(echo "$input" | jq -r '.agent.name // empty')
DIR=$(echo "$input" | jq -r '.workspace.current_dir // "?"')
PCT=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
COST=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
DURATION_MS=$(echo "$input" | jq -r '.cost.total_duration_ms // 0')
FIVE_H=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
SEVEN_D=$(echo "$input" | jq -r '.rate_limits.seven_day.used_percentage // empty')
COST_FMT=$(printf '$%.2f' "$COST")
MINS=$((DURATION_MS / 60000)); SECS=$(((DURATION_MS % 60000) / 1000))
if [ "$PCT" -ge 90 ]; then BAR_COLOR="$RED"; elif [ "$PCT" -ge 70 ]; then BAR_COLOR="$YELLOW"; else BAR_COLOR="$GREEN"; fi
BAR_WIDTH=15; FILLED=$((PCT * BAR_WIDTH / 100)); EMPTY=$((BAR_WIDTH - FILLED)); BAR=""
[ "$FILLED" -gt 0 ] && printf -v FILL "%${FILLED}s" && BAR="${FILL// /█}"
[ "$EMPTY" -gt 0 ] && printf -v PAD "%${EMPTY}s" && BAR="${BAR}${PAD// /░}"
[ -n "$AGENT" ] && AGENT_DISPLAY="${MAGENTA}${BOLD}@${AGENT}${RESET}" || AGENT_DISPLAY="${MAGENTA}${BOLD}@sisyphus${RESET} ${DIM}(plugin)${RESET}"
TEAM_DISPLAY=""
TEAMS_DIR="$HOME/.claude/teams"
if [ -d "$TEAMS_DIR" ]; then
    for tf in "$TEAMS_DIR"/*/config.json; do [ -f "$tf" ] || continue
        TN=$(jq -r '.name // empty' "$tf" 2>/dev/null); MC=$(jq -r '.members | length // 0' "$tf" 2>/dev/null)
        [ -n "$TN" ] && [ "$MC" -gt 0 ] && TEAM_DISPLAY="${CYAN}[${TN}]${RESET} ${GREEN}${MC} agents${RESET}" && break
    done
fi
RATE=""
[ -n "$FIVE_H" ] && FI=$(printf '%.0f' "$FIVE_H") && { [ "$FI" -ge 80 ] && RATE="${RED}5h:${FI}%${RESET}" || { [ "$FI" -ge 50 ] && RATE="${YELLOW}5h:${FI}%${RESET}" || RATE="${DIM}5h:${FI}%${RESET}"; }; }
[ -n "$SEVEN_D" ] && SI=$(printf '%.0f' "$SEVEN_D") && { [ -n "$RATE" ] && RATE="$RATE "; [ "$SI" -ge 80 ] && RATE="${RATE}${RED}7d:${SI}%${RESET}" || { [ "$SI" -ge 50 ] && RATE="${RATE}${YELLOW}7d:${SI}%${RESET}" || RATE="${RATE}${DIM}7d:${SI}%${RESET}"; }; }
BRANCH=""; git rev-parse --git-dir > /dev/null 2>&1 && BRANCH=" 🌿 $(git branch --show-current 2>/dev/null)"
[ -n "$TEAM_DISPLAY" ] && echo -e "${AGENT_DISPLAY} ${TEAM_DISPLAY}" || echo -e "${AGENT_DISPLAY} ${DIM}${MODEL}${RESET} 📁 ${DIR##*/}${BRANCH}"
RP=""; [ -n "$RATE" ] && RP=" | ${RATE}"
echo -e "${BAR_COLOR}${BAR}${RESET} ${PCT}% | ${YELLOW}${COST_FMT}${RESET} | ⏱ ${MINS}m${SECS}s${RP}"
STATUSLINE
chmod +x "$HOME/.claude/oh-my-team-statusline.sh"

# Add statusline to settings if not present
if ! grep -q "oh-my-team-statusline" "$CLAUDE_SETTINGS" 2>/dev/null; then
    python3 -c "
import json
with open('$CLAUDE_SETTINGS') as f:
    cfg = json.load(f)
cfg['statusLine'] = {'type': 'command', 'command': '~/.claude/oh-my-team-statusline.sh', 'refreshInterval': 3}
with open('$CLAUDE_SETTINGS', 'w') as f:
    json.dump(cfg, f, indent=2)
" 2>/dev/null && echo -e "  ${GREEN}Status line installed${RESET}" || echo -e "  ${YELLOW}Add statusLine manually to settings${RESET}"
else
    echo -e "  ${GREEN}Status line already configured${RESET}"
fi

# Check tmux
echo ""
if command -v tmux &>/dev/null; then
    TMUX_VER=$(tmux -V)
    echo -e "${GREEN}tmux installed: ${TMUX_VER}${RESET}"
else
    echo -e "${YELLOW}tmux not installed. Install for split-pane teammate view:${RESET}"
    echo -e "  brew install tmux"
fi

# Done
echo ""
echo -e "${GREEN}${BOLD}Installation complete!${RESET}"
echo ""
echo -e "  ${BOLD}Usage:${RESET}"
echo -e "    ${CYAN}omt${RESET}                              # Start Oh My Team"
echo -e "    ${CYAN}omt -d${RESET}                            # Start with auto-approve"
echo -e "    ${CYAN}omt -c${RESET}                            # Continue last session"
echo ""
echo -e "  ${BOLD}Workflow:${RESET}"
echo -e "    Give Sisyphus a task → it proposes a team → say 'go' → teammates work in tmux panes"
echo ""
echo -e "  ${BOLD}Skills:${RESET}"
echo -e "    /oh-my-team:plan          Strategic planning with Prometheus"
echo -e "    /oh-my-team:start-work    Execute plan with Atlas orchestration"
echo -e "    /oh-my-team:review-work   5-agent parallel review gate"
echo -e "    /oh-my-team:git-master    Atomic commit workflow"
echo -e "    /oh-my-team:deep-debug    Multi-hypothesis debugging"
echo ""
echo -e "  ${BOLD}Uninstall:${RESET}"
echo -e "    rm -rf ~/.oh-my-team ~/.local/bin/omt"
echo ""
