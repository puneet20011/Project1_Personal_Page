export function mountFooter() {
  const target = document.getElementById("site-footer");
  if (!target) return;
  const year = new Date().getFullYear();

  target.innerHTML = `
    <footer>
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <small>&copy; ${year} Sourav Das · <a class="link-secondary" href="./LICENSE" target="_blank" rel="noopener">MIT License</a></small>
        <div class="d-flex gap-3">
          <a class="link-secondary" href="https://www.linkedin.com/in/sourav-das-cs/" target="_blank" rel="noopener">LinkedIn</a>
          <a class="link-secondary" href="https://github.com/dashboard" target="_blank" rel="noopener">GitHub</a>
          <a class="link-secondary" href="mailto:das.sour@northeastern.edu">Email</a>
        </div>
      </div>
    </footer>
  `;
}
