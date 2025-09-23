const PROJECTS = [
  {
    title: "Interactive Canvas Hero",
    desc: "Particle network in vanilla JS.",
    img: "./assets/images/placeholder_1.png",
    link: "./index.html#home",
  },
  {
    title: "Responsive Layouts",
    desc: "Accessible, mobile-first patterns.",
    img: "./assets/images/placeholder_2.png",
    link: "./about.html",
  },
  {
    title: "Scroll Spy + Reveal",
    desc: "IntersectionObserver techniques.",
    img: "./assets/images/placeholder_1.png",
    link: "./projects.html",
  },
];

export function renderProjects(selector = "#project-grid") {
  const grid = document.querySelector(selector);
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(
    (p) => `
    <div class="col-12 col-sm-6 col-lg-4">
      <a class="text-decoration-none" href="${p.link}">
        <div class="card h-100 shadow-sm">
          <img src="${p.img}" class="card-img-top" alt="${p.title} preview">
          <div class="card-body">
            <h3 class="h6">${p.title}</h3>
            <p class="text-body-secondary mb-0">${p.desc}</p>
          </div>
        </div>
      </a>
    </div>`
  ).join("");
}
