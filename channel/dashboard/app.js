/**
 * Oh My Team — Dashboard bootstrap
 *
 * Minimal placeholder. Each feature lands in its own commit:
 *   - sessions sidebar + live WS wiring
 *   - activity / logs / info tabs
 *   - xterm.js terminal tab
 */

console.info("[omt] dashboard loaded. Feature wiring lands in follow-up commits.");

// Toggle tabs locally (no session data yet — the UI is static).
for (const btn of document.querySelectorAll(".tab")) {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("is-active", b === btn));
    document.querySelectorAll(".panel").forEach((p) => {
      p.classList.toggle("is-active", p.dataset.panel === target);
    });
  });
}
