document.addEventListener("DOMContentLoaded", () => {

  const headerHTML = `
    <div class="top-announcement">
      <div class="announcement-track">
        <span class="announcement-item active">Envíos GRATIS por compras superiores a $199.900</span>
        <span class="announcement-item">Perfumes 100% originales</span>
        <span class="announcement-item">Asesoría por WhatsApp</span>
      </div>
    </div>

    <div class="info-bar">
      <div class="info-left">
        <a href="#" class="info-link">Instagram</a>
        <a href="#" class="info-link">WhatsApp</a>
      </div>
    </div>

    <div class="sticky-header">
      <div class="main-header">
        <div class="search-box">
          <input type="text" placeholder="Buscar productos">
        </div>

        <div class="header-logo">
          <a href="index.html">
            <img src="logo.png">
          </a>
        </div>

        <div class="header-icons">
          <a href="#">👤</a>
          <a href="#">❤</a>
          <a href="#">🛒</a>
        </div>
      </div>

      <nav class="main-menu">
        <a href="index.html">INICIO</a>
        <a href="todos.html">TODOS</a>
        <a href="hombre.html">HOMBRE</a>
        <a href="mujer.html">MUJER</a>
        <a href="unisex.html">UNISEX</a>
      </nav>
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // ANIMATION ANNOUNCEMENT
  const items = document.querySelectorAll(".announcement-item");
  let i = 0;

  setInterval(() => {
    items[i].classList.remove("active");
    i = (i + 1) % items.length;
    items[i].classList.add("active");
  }, 3000);
});