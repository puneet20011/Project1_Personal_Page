const STORAGE_KEY = "prefers-theme";

export function initThemeToggle() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", current);
    localStorage.setItem(STORAGE_KEY, current);
  });
}
