export const PANEL_PREFIX = "terminal:";

export function terminalPanelId(sessionName: string): string {
  return `${PANEL_PREFIX}${sessionName}`;
}

export function sessionNameFromPanelId(panelId: string): string | null {
  return panelId.startsWith(PANEL_PREFIX) ? panelId.slice(PANEL_PREFIX.length) : null;
}
