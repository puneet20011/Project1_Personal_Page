(function initOpenBook() {
  const book = document.getElementById("open-book");
  if (!book) return;

  const store = document.getElementById("page-store");
  const allPages = Array.from(store.querySelectorAll(".page"));

  if (allPages.length % 2 !== 0) {
    const blank = document.createElement("article");
    blank.className = "page";
    blank.dataset.title = "";
    blank.innerHTML = "<div class='text-body-secondary small'>&nbsp;</div>";
    allPages.push(blank);
  }

  const leftLeafInner = document.getElementById("leaf-left-inner");
  const rightLeafInner = document.getElementById("leaf-right-inner");
  const leftLeaf = document.getElementById("leaf-left");
  const rightLeaf = document.getElementById("leaf-right");
  const cover = document.getElementById("cover-leaf");

  const btnPrev = book.querySelector("[data-action='prev']");
  const btnNext = book.querySelector("[data-action='next']");
  const progress = document.getElementById("page-current");
  const total = document.getElementById("page-total");
  const title = document.getElementById("page-title");

  const FLIP_OPEN_MS = 420; 
  let index = 0; 
  let opened = false;

  function render() {
    leftLeafInner.innerHTML = "";
    rightLeafInner.innerHTML = "";
    leftLeafInner.appendChild(allPages[index].cloneNode(true));
    rightLeafInner.appendChild(allPages[index + 1].cloneNode(true));

    progress.textContent = `${index + 1}–${index + 2}`;
    total.textContent = String(allPages.length);
    title.textContent =
      allPages[index].dataset.title && allPages[index + 1].dataset.title
        ? `${allPages[index].dataset.title} / ${ allPages[index + 1].dataset.title
        }`
        : allPages[index].dataset.title ||
          allPages[index + 1].dataset.title ||
          "";

    btnPrev.disabled = !opened || index === 0;
    btnNext.disabled = !opened || index >= allPages.length - 2;
  }

  function openBook() {
    if (opened) return;
    cover.style.display = "grid";
    cover.classList.remove("flip-back");
    cover.classList.add("flip-next");
    setTimeout(() => {
      opened = true;
      book.classList.remove("is-closed");
      book.classList.add("is-open");
      cover.style.display = "none";
      cover.classList.remove("flip-next");
      render();
      rightLeaf.focus();
    }, FLIP_OPEN_MS);
  }

  function closeBook() {
    if (!opened) return;
    cover.style.display = "grid";
    cover.classList.remove("flip-next");
    cover.classList.add("flip-back");
    setTimeout(() => {
      opened = false;
      index = 0; 
      render();
      book.classList.remove("is-open");
      book.classList.add("is-closed");
      cover.classList.remove("flip-back");
      cover.focus?.();
    }, FLIP_OPEN_MS);
  }

  function nextPage() {
    if (!opened) return openBook();
    if (index >= allPages.length - 2) return;
    rightLeaf.classList.add("flip-next");
    setTimeout(() => {
      index += 2;
      render();
      rightLeaf.classList.remove("flip-next");
    }, FLIP_OPEN_MS);
  }

  function prevPage() {
    if (!opened) return openBook();
    if (index === 0) return closeBook();
    leftLeaf.classList.add("flip-prev");
    setTimeout(() => {
      index -= 2;
      render();
      leftLeaf.classList.remove("flip-prev");
    }, FLIP_OPEN_MS);
  }

  // Click zones
  leftLeaf.addEventListener("click", prevPage);
  rightLeaf.addEventListener("click", nextPage);
  cover.addEventListener("click", openBook);

  // Buttons
  btnPrev.addEventListener("click", prevPage);
  btnNext.addEventListener("click", nextPage);

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!book.contains(document.activeElement)) return;
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") prevPage();
  });

  // Initial
  render();
})();
