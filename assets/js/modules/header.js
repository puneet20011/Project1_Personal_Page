export function mountHeader(activePage = "index") {
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;

  const nav = [
    { href: "index.html",     text: "Home",      key: "index" },
    { href: "about.html",     text: "About",     key: "about" },
    { href: "education.html", text: "Education", key: "education" },
    { href: "projects.html",  text: "Projects",  key: "projects" },
    { href: "team.html",      text: "Team",      key: "team" }
  ];

  const links = nav
    .map(
      (n) => `
      <li class="nav-item">
        <a class="nav-link ${n.key === activePage ? "active" : ""}" href="${n.href}">${n.text}</a>
      </li>`
    )
    .join("");

  headerTarget.innerHTML = `
    <header class="py-3">
      <nav class="container navbar navbar-expand-md">
        <a class="site-brand navbar-brand" href="index.html">Sourav Das</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto mb-2 mb-md-0">
            ${links}
            <li class="nav-item ms-2">
              <button id="theme-toggle" class="btn btn-sm btn-outline-secondary theme-btn" type="button" aria-label="Toggle theme">T</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `;
}
