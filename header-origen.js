 document.addEventListener("DOMContentLoaded", () => {
 const headerHTML = `
  <div class="top-announcement">
    <div class="announcement-track">
      <span class="announcement-item active">Envíos GRATIS por compras superiores a $199.900</span>
      <span class="announcement-item">Perfumes 100% originales con garantía</span>
      <span class="announcement-item">Asesoría personalizada por WhatsApp</span>
    </div>
  </div>

  <div class="info-bar">
    <div class="info-left">
      <a href="https://www.instagram.com/perfumeria.origen" target="_blank" class="info-link">
        <i class="fa-brands fa-instagram"></i> @origenperfumeria
      </a>
      <a href="https://wa.me/573145661788" target="_blank" class="info-link">
        <i class="fa-brands fa-whatsapp"></i> Asesoría personalizada
      </a>
    </div>
  </div>

  <div class="sticky-header" id="stickyHeader">
    <div class="main-header">

      <div class="search-box">
        <form id="searchForm">
          <input type="text" id="searchInputHeader" placeholder="Buscar productos">
        </form>
      </div>

      <div class="header-logo">
        <a href="index.html">
          <img src="logo.png" alt="Origen Perfumería">
        </a>
      </div>

      <div class="header-icons">
  <a href="cuenta.html"><i class="fa-regular fa-user"></i></a>

  <a href="favoritos.html" class="cart-icon-wrap">
    <i class="fa-regular fa-heart"></i>
    <span id="favCount" class="cart-count">0</span>
  </a>

  <a href="#" id="openCart" class="cart-icon-wrap">
    <i class="fa-solid fa-bag-shopping"></i>
    <span id="cartCount" class="cart-count">0</span>
  </a>
</div>

    </div>

    <nav class="main-menu">
      <a href="index.html">INICIO</a>
      <a href="todos.html">TODOS LOS PERFUMES</a>
      <a href="hombre.html">HOMBRE</a>
      <a href="mujer.html">MUJER</a>
      <a href="unisex.html">UNISEX</a>
    </nav>
  </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // 🔥 ANUNCIO ROTATIVO (IGUAL AL TUYO)
  const items = document.querySelectorAll(".announcement-item");
  let i = 0;

  setInterval(() => {
    items[i].classList.remove("active");
    i = (i + 1) % items.length;
    items[i].classList.add("active");
  }, 3500);

  // 🔥 BUSCADOR (IGUAL)
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInputHeader");

  if(searchForm){
    searchForm.addEventListener("submit", function(e){
      e.preventDefault();
      const texto = searchInput.value.trim();

      if(texto !== ""){
        window.location.href = `todos.html?buscar=${encodeURIComponent(texto)}`;
      } else {
        window.location.href = "todos.html";
      }
    });
  }

  // 🔥 EFECTO SCROLL HEADER (IGUAL)
  const stickyHeader = document.getElementById("stickyHeader");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if(currentScroll > 60){
      stickyHeader.classList.add("show-shadow");
    } else {
      stickyHeader.classList.remove("show-shadow");
    }

    if(window.innerWidth > 768){
      if(currentScroll > lastScrollTop && currentScroll > 140){
        stickyHeader.classList.add("hide-header");
      } else {
        stickyHeader.classList.remove("hide-header");
      }
    } else {
      stickyHeader.classList.remove("hide-header");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // 🔥 ACTIVAR MENÚ SEGÚN LA PÁGINA
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".main-menu a").forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

function updateFavoritesCount() {
  const favorites = JSON.parse(localStorage.getItem("favoritos")) || [];
  const count = favorites.length;

  const badge = document.getElementById("favCount");
  if (!badge) return;

  badge.textContent = count;

  if (count > 0) {
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

updateFavoritesCount();
});