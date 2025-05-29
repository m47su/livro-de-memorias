const pages = document.querySelectorAll(".page");
const prevButton = document.querySelector(".arrow.prev");
const nextButton = document.querySelector(".arrow.next");
const pageNumbers = document.getElementById("page-numbers");
const btnSumario = document.getElementById("btn-toggle-sumario");
const listaSumario = document.getElementById("sumario-lista");
let currentPage = 0;
let lastPage = 0;

// === PÁGINAS ===

function showPage(index) {
  if (index < 0 || index >= pages.length) return;

  pages[currentPage].classList.remove("active");

  setTimeout(() => {
    pages.forEach((page, idx) => {
      page.style.display = idx === index ? "block" : "none";
    });

    pages[index].classList.add("active");
    currentPage = index;

    updateNavButtons();
    updatePageNumbers();
  }, 300);
}

function updateNavButtons() {
  prevButton.style.visibility = currentPage === 0 ? "hidden" : "visible";
  nextButton.style.visibility =
    currentPage === pages.length - 1 ? "hidden" : "visible";
}

function updatePageNumbers() {
  pageNumbers.innerHTML = "";
  const firstNumber = currentPage * 2 + 1;
  const secondNumber = firstNumber + 1;

  const li1 = document.createElement("li");
  li1.textContent = firstNumber;
  pageNumbers.appendChild(li1);

  const li2 = document.createElement("li");
  li2.textContent = secondNumber;
  pageNumbers.appendChild(li2);
}

prevButton.addEventListener("click", () => showPage(currentPage - 1));
nextButton.addEventListener("click", () => showPage(currentPage + 1));

pages.forEach((page, idx) => {
  page.style.display = idx === 0 ? "block" : "none";
});
pages[0].classList.add("active");
updateNavButtons();
updatePageNumbers();

// === ESTRELAS ===
function criarEstrelas() {
  const container = document.querySelector(".estrelas-container");

  const config = [
    { class: "estrelas-pequenas", count: 500, size: 2 },
    { class: "estrelas-medias", count: 200, size: 3 },
    { class: "estrelas-grandes", count: 100, size: 4 },
  ];

  config.forEach(({ class: className, count, size }) => {
    const layer = document.createElement("div");
    layer.className = `camada-estrelas ${className}`;

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.style.position = "absolute";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = "white";
      star.style.borderRadius = "50%";
      star.style.opacity = "0.8";
      layer.appendChild(star);
    }

    container.appendChild(layer);
  });
}

window.addEventListener("load", criarEstrelas);

// === SUMÁRIO ===
btnSumario.addEventListener("click", () => {
  const isVisible = listaSumario.style.display === "block";
  listaSumario.style.display = isVisible ? "none" : "block";
});

// === LINKS DO SUMÁRIO ===
document.querySelectorAll("#sumario-lista a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageId = link.getAttribute("href").replace("#page-", "");
    const pageIndex = parseInt(pageId) - 1;

    if (!isNaN(pageIndex)) {
      showPage(pageIndex);
      listaSumario.style.display = "none";
    }
  });
});

// === MODAL usando SweetAlert2 ===

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".polaroid img");

  images.forEach((img) => {
    img.addEventListener("click", function () {
      const title = this.getAttribute("data-title") || "Título padrão";
      const description = this.getAttribute("data-description") || "";

      Swal.fire({
        title: title,
        text: description,
        imageUrl: this.src,
        imageAlt: "Imagem ampliada",
        width: "600px",
        padding: "2em",
        imageAlt: "Custom image",
        showConfirmButton: false,
        didOpen: () => {
          const popup = Swal.getPopup();
          popup.style.fontFamily =
            '"Helvetica Neue", Helvetica, Arial, sans-serif';
        },
      });
    });
  });
});

// === TELA DE CARREGAMENTO ===
const loadingScreen = document.getElementById("loading-screen");
const progressBar = document.getElementById("progress-bar");

// === ABRIR LIVRO ===
const coverBook = document.getElementById("cover-book");
const openBook = document.getElementById("open-book");
const sumario = document.getElementById("sumario");
const btnAbrirLivro = document.getElementById("open-book-btn");
const setas = document.querySelectorAll(".page-nav");

coverBook.classList.add("active");
openBook.style.display = "none";
sumario.style.display = "none";
loadingScreen.style.display = "none";

setas.forEach((seta) => {
  seta.style.opacity = "0";
  seta.style.visibility = "hidden";
  seta.style.pointerEvents = "none";

  seta.querySelectorAll(".arrow").forEach((btn) => {
    btn.style.pointerEvents = "none";
  });
});

btnAbrirLivro.addEventListener("click", () => {
  loadingScreen.style.display = "flex";
  loadingScreen.classList.add("show");

  coverBook.style.display = "none";

  let progress = 0;
  progressBar.style.width = "0%";

  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress > 100) progress = 100;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(loadInterval);

      setTimeout(() => {
        loadingScreen.classList.remove("show");

        openBook.style.display = "block";
        setTimeout(() => {
          openBook.style.opacity = "1";
        }, 110);

        sumario.style.display = "block";

        setas.forEach((seta) => {
          seta.style.opacity = "1";
          seta.style.visibility = "visible";
          seta.style.pointerEvents = "all";

          seta.querySelectorAll(".arrow").forEach((btn) => {
            btn.style.pointerEvents = "all";
          });
        });
      }, 800);
    }
  }, 300);
});
