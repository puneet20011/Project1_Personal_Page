import { mountHeader } from "./modules/header.js";
import { mountFooter } from "./modules/footer.js";
import { initThemeToggle } from "./modules/themeToggle.js";
import { initScrollFeatures } from "./modules/nav.js";
import { initRevealOnScroll } from "./modules/revealOnScroll.js";
import { startParticles } from "./modules/particleHeader.js";
import { renderProjects } from "./modules/projectsData.js";

const active = window.location.pathname.split("/").pop().replace(".html", "") || "index";

mountHeader(active);
mountFooter();
initThemeToggle();
initScrollFeatures();
initRevealOnScroll();

if (active === "projects") {
  startParticles("projects-canvas");
  renderProjects("#project-grid");
}
