(function () {
  const currentPage = document.body.dataset.page || "";

  function getActiveClass(page) {
    return currentPage === page ? "active" : "";
  }

  const headerHTML = `
  <div class="site-header-wrap" id="siteHeaderWrap">
    <div class="header-top" id="headerTop">
      <div class="top-announcement">
        <div class="announcement-track" id="announcementTrack">
          <span class="announcement-item active">Envíos GRATIS por compras superiores a $199.900</span>
          <span class="announcement-item">Perfumes 100% originales con garantía</span>
          <span class="announcement-item">Asesoría personalizada por WhatsApp</span>
        </div>
      </div>

      <div class="info-bar">
        <div class="info-left">
          <a href="https://www.instagram.com/perfumeria.origen?igsh=MXExdmpqNTl1NnZrZg==" target="_blank" class="info-link">
            <i class="fa-brands fa-instagram"></i> @origenperfumeria
          </a>
          <a href="https://wa.me/573145661788" target="_blank" class="info-link">
            <i class="fa-brands fa-whatsapp"></i> Asesoría personalizada
          </a>
        </div>
      </div>
    </div>

    <div class="sticky-header">
      <div class="main-header">
        <div class="search-box">
          <form id="searchFormHeader">
            <input type="text" id="searchInputHeaderGlobal" placeholder="Buscar productos">
          </form>
        </div>

        <div class="header-logo">
          <a href="index.html">
            <img src="logo.png" alt="Origen Perfumería">
          </a>
        </div>

        <div class="header-icons">
          <a href="cuenta.html" title="Cuenta">
            <i class="fa-regular fa-user"></i>
          </a>
          <a href="favoritos.html" title="Favoritos" class="favorites-link">
            <i class="fa-regular fa-heart"></i>
            <span class="favorites-count-badge" id="favoritesCountBadge"></span>
          </a>
          <a href="#" id="openCart" title="Carrito" class="cart-icon-wrap">
            <i class="fa-solid fa-bag-shopping"></i>
            <span id="cartCount" class="cart-count">0</span>
          </a>
        </div>
      </div>

      <nav class="main-menu">
        <a href="index.html" class="${getActiveClass("inicio")}">INICIO</a>
        <a href="todos.html" class="${getActiveClass("todos")}">TODOS LOS PERFUMES</a>
        <a href="hombre.html" class="${getActiveClass("hombre")}">HOMBRE</a>
        <a href="mujer.html" class="${getActiveClass("mujer")}">MUJER</a>
        <a href="unisex.html" class="${getActiveClass("unisex")}">UNISEX</a>
      </nav>

      <div class="mobile-category-tabs">
        <a href="todos.html" class="${getActiveClass("todos")}">Todos</a>
        <a href="hombre.html" class="${getActiveClass("hombre")}">Hombre</a>
        <a href="mujer.html" class="${getActiveClass("mujer")}">Mujer</a>
        <a href="unisex.html" class="${getActiveClass("unisex")}">Unisex</a>
      </div>
    </div>
  </div>
  `;

  const mountPoint = document.getElementById("origen-header");
  if (mountPoint) {
    mountPoint.innerHTML = headerHTML;
  }

  function actualizarContadorFavoritosHeader() {
    const badge = document.getElementById("favoritesCountBadge");
    if (!badge) return;

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length > 0) {
      badge.textContent = favoritos.length;
      badge.classList.add("show");
    } else {
      badge.textContent = "";
      badge.classList.remove("show");
    }
  }

  function initSearchHeader() {
    const form = document.getElementById("searchFormHeader");
    const input = document.getElementById("searchInputHeaderGlobal");

    if (!form || !input) return;

    const params = new URLSearchParams(window.location.search);
    const buscarActual = params.get("buscar") || "";
    input.value = buscarActual;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const texto = input.value.trim();

      if (texto) {
        window.location.href = `todos.html?buscar=${encodeURIComponent(texto)}`;
      } else {
        window.location.href = "todos.html";
      }
    });
  }

  function initStickyHeader() {
    const siteHeaderWrap = document.getElementById("siteHeaderWrap");
    if (!siteHeaderWrap) return;

    let ticking = false;

    
function handleScroll() {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > 10) {
    siteHeaderWrap.classList.add("show-shadow");
  } else {
    siteHeaderWrap.classList.remove("show-shadow");
  }

  if (currentScroll > 40) {
    siteHeaderWrap.classList.add("scrolled");
    document.body.classList.add("header-compact");
  } else {
    siteHeaderWrap.classList.remove("scrolled");
    document.body.classList.remove("header-compact");
  }

  ticking = false;
}

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(handleScroll);
          ticking = true;
        }
      },
      { passive: true }
    );

    handleScroll();
  }

  function initAnnouncement() {
    const announcementItems = document.querySelectorAll(".announcement-item");
    if (!announcementItems.length) return;

    let announcementIndex = 0;

    setInterval(() => {
      announcementItems[announcementIndex].classList.remove("active");
      announcementIndex = (announcementIndex + 1) % announcementItems.length;
      announcementItems[announcementIndex].classList.add("active");
    }, 3500);
  }

  actualizarContadorFavoritosHeader();
  initSearchHeader();
  initStickyHeader();
  initAnnouncement();
})();