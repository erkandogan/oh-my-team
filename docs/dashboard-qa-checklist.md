# Dashboard QA Checklist — Panel Reorder & Split

## Prerequisites

Have `omt hub start` running with at least 2 sessions registered. Open `http://localhost:8800/workspace/` in Chrome.

## Checklist — Panel reorder & split

1. Click a session in the sidebar → terminal panel opens with a live shell prompt.
   - Pass: prompt renders and accepts input within 1s.
2. Click a second session → second terminal panel opens side-by-side (or tabbed).
   - Pass: both panels visible, each with its own prompt.
3. Click the same session again → existing panel is focused, no duplicate opened.
   - Pass: panel count unchanged, focused panel matches the clicked session.
4. Drag a panel header onto the right edge of another panel → panels split (right/left).
   - Pass: dockview drop indicator appears, layout becomes horizontal split.
5. Drag a panel header onto the bottom edge of another panel → panels split (top/bottom).
   - Pass: dockview drop indicator appears, layout becomes vertical split.
6. Drag a panel's tab onto a different panel group → tab moves to that group.
   - Pass: tab disappears from source group and appears in target group.
7. Reorder tabs within a group by dragging one tab before another.
   - Pass: tab order updates to match drop position, active tab preserved.
8. Close a panel via middle-click on its tab → panel closes, terminal PTY cleaned up.
   - Pass: panel removed from DOM; `omt hub start` logs show PTY exit for that session.
9. After step 8, click the sidebar entry for the closed session → new panel opens (PTY reconnects).
   - Pass: fresh shell prompt appears; prior scrollback is not required.
10. Drag a session from the sidebar onto an empty area of the workspace → new panel spawns at drop location.
    - Pass: panel is created at the drop position, not appended to an existing group.
11. Use keyboard: after step 1, press `Ctrl+Shift+→` → focus moves to the next panel (if two panels are open).
    - Pass: active panel border moves to the neighbouring panel.
12. Resize the browser window while a terminal is open → terminal adapts its rows/cols (verify with `stty size` in the shell).
    - Pass: `stty size` output changes to match the new pixel dimensions.

## Time budget

This checklist should take ≤ 5 minutes to execute.
