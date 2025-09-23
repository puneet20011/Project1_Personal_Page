export function initScrollFeatures() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^=\"#\"]");
    if (!link) return;
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  const sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  const navLinks = new Map();
  document
    .querySelectorAll("a.nav-link[href$=\"index.html\"], a.nav-link[href^=\"#\"]")
    .forEach((a) => {
      const raw = a.getAttribute("href");
      const hash = raw.startsWith("#") ? raw.slice(1) : "home";
      navLinks.set(hash, a);
    });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = navLinks.get(id);
        if (!link) return;
        if (entry.isIntersecting) {
          document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach((s) => io.observe(s));
}
