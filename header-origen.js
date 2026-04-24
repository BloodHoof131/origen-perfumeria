(function () {
  // 1. Configuración de la página actual
  // Asegúrate de que en tu HTML tengas: <body data-page="caballeros">
  const currentPage = document.body.dataset.page || "inicio";

  // Función para determinar si un link debe estar activo
  function getActiveClass(page) {
    return currentPage === page ? "active" : "";
  }

  // 2. Definición del Template con Template Literals para clases dinámicas
  const headerHTML = `
    <header class="sticky-header" id="mainHeader">
      <div class="top-announcement">
        <div class="announcement-track" id="announcementTrack">
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
            <i class="fa-brands fa-whatsapp"></i> Asesoría Personalizada
          </a>
        </div>
      </div>

      <div class="main-header">
        <div class="search-box">
          <form action="/search" method="GET">
            <input type="text" name="q" placeholder="Buscar fragancia..." aria-label="Buscar">
          </form>
        </div>
        <div class="header-logo">
          <a href="/">
            <img src="img/logo.png" alt="Origen Perfumería Logo">
          </a>
        </div>
        <div class="header-icons">
          <a href="/cuenta" title="Mi Cuenta"><i class="fa-regular fa-user"></i></a>
          <a href="#" class="cart-icon-wrap" id="cartTrigger">
            <i class="fa-solid fa-bag-shopping"></i>
            <span class="cart-count">0</span>
          </a>
        </div>
      </div>

      <nav class="main-menu">
        <a href="/" class="${getActiveClass('inicio')}">INICIO</a>
        <a href="/caballeros" class="${getActiveClass('caballeros')}">CABALLEROS</a>
        <a href="/damas" class="${getActiveClass('damas')}">DAMAS</a>
        <a href="/unisex" class="${getActiveClass('unisex')}">UNISEX</a>
        <a href="/nichos" class="${getActiveClass('nichos')}">NICHOS</a>
        <a href="/ofertas" class="${getActiveClass('ofertas')}">OFERTAS</a>
      </nav>

      <div class="mobile-category-tabs">
        <a href="/caballeros" class="${getActiveClass('caballeros')}">Caballeros</a>
        <a href="/damas" class="${getActiveClass('damas')}">Damas</a>
        <a href="/unisex" class="${getActiveClass('unisex')}">Unisex</a>
        <a href="/nichos" class="${getActiveClass('nichos')}">Nichos</a>
      </div>
    </header>
  `;

  // 3. Inyección en el DOM e Inicialización de eventos
  document.addEventListener('DOMContentLoaded', () => {
    // Insertamos el header al principio del body (o en un contenedor específico)
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    const header = document.getElementById('mainHeader');
    const items = document.querySelectorAll('.announcement-item');
    let current = 0;
    let lastScroll = 0;

    // --- Rotación de Anuncios ---
    if (items.length > 0) {
      setInterval(() => {
        items[current].classList.remove('active');
        current = (current + 1) % items.length;
        items[current].classList.add('active');
      }, 4000);
    }

    // --- Efecto Sticky Hide/Show ---
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 100) {
        header.classList.remove('hide-header', 'show-shadow');
        return;
      }

      if (currentScroll > lastScroll && !header.classList.contains('hide-header')) {
        header.classList.add('hide-header');
      } else if (currentScroll < lastScroll && header.classList.contains('hide-header')) {
        header.classList.remove('hide-header');
        header.classList.add('show-shadow');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  });
})();