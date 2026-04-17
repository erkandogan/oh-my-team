async function sessionAction(name: string, action: "restart" | "stop"): Promise<void> {
  await fetch(`/api/sessions/${encodeURIComponent(name)}/${action}`, { method: "POST" });
}

export const apiClient = {
  restart: (name: string) => sessionAction(name, "restart"),
  stop: (name: string) => sessionAction(name, "stop"),
};
