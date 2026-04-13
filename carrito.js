/* =========================
   CARRITO GLOBAL ORIGEN
========================= */
const CARRITO_KEY = "origen_carrito";

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

function contarItemsCarrito() {
  const carrito = obtenerCarrito();
  return carrito.reduce((acc, item) => acc + Number(item.cantidad || 0), 0);
}

function totalCarrito() {
  const carrito = obtenerCarrito();
  return carrito.reduce((acc, item) => {
    return acc + (Number(item.precio || 0) * Number(item.cantidad || 0));
  }, 0);
}

function formatPriceCarrito(value) {
  return "$" + Number(value).toLocaleString("es-CO");
}

function agregarAlCarrito(producto, cantidad = 1) {
  if (!producto || !producto.id) {
    console.error("Producto inválido para agregar al carrito");
    return;
  }

  const carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === producto.id);
  const cantidadNum = Number(cantidad) || 1;

  if (index >= 0) {
    carrito[index].cantidad += cantidadNum;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre || "Producto",
      precio: Number(producto.precio) || 0,
      imagen: producto.imagen || "",
      url: producto.url || "#",
      categoria: producto.categoria || "",
      cantidad: cantidadNum
    });
  }

  guardarCarrito(carrito);
  actualizarCarritoUI();
  abrirCarrito();

  if (typeof subirCarritoASupabase === "function") {
    subirCarritoASupabase();
  }
}

function cambiarCantidadCarrito(id, cambio) {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);

  if (index === -1) return;

  carrito[index].cantidad += Number(cambio);

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarCarrito(carrito);
  actualizarCarritoUI();

  if (typeof subirCarritoASupabase === "function") {
    subirCarritoASupabase();
  }
}

function eliminarDelCarrito(id) {
  const carrito = obtenerCarrito().filter(item => item.id !== id);
  guardarCarrito(carrito);
  actualizarCarritoUI();

  if (typeof subirCarritoASupabase === "function") {
    subirCarritoASupabase();
  }
}

function vaciarCarrito() {
  localStorage.removeItem(CARRITO_KEY);
  actualizarCarritoUI();

  if (typeof subirCarritoASupabase === "function") {
    subirCarritoASupabase();
  }
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("cartCount");
  if (!contador) return;

  const totalItems = contarItemsCarrito();
  contador.textContent = totalItems;
  contador.style.display = totalItems > 0 ? "flex" : "none";
}

function renderCarritoSidebar() {
  const cartBody = document.querySelector(".cart-body");
  const cartFooter = document.querySelector(".cart-footer");

  if (!cartBody || !cartFooter) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    cartBody.innerHTML = `<p>Tu carrito está vacío</p>`;
    cartFooter.innerHTML = `<a href="todos.html" class="btn-primary">Seguir comprando</a>`;
    return;
  }

  cartBody.innerHTML = carrito.map(item => `
    <div class="cart-item">
      <a href="${item.url}" class="cart-item-image">
        <img src="${item.imagen}" alt="${item.nombre}">
      </a>
      <div class="cart-item-info">
        <a href="${item.url}" class="cart-item-name">${item.nombre}</a>
        <div class="cart-item-price">${formatPriceCarrito(item.precio)}</div>
        <div class="cart-item-controls">
          <button type="button" onclick="cambiarCantidadCarrito('${item.id}', -1)">−</button>
          <span>${item.cantidad}</span>
          <button type="button" onclick="cambiarCantidadCarrito('${item.id}', 1)">+</button>
        </div>
        <button type="button" class="cart-remove-btn" onclick="eliminarDelCarrito('${item.id}')">
          Eliminar
        </button>
      </div>
    </div>
  `).join("");

  cartFooter.innerHTML = `
    <div class="cart-total">
      <strong>Total:</strong>
      <span>${formatPriceCarrito(totalCarrito())}</span>
    </div>
    <a href="checkout.html" class="btn-primary">Finalizar compra</a>
    <button type="button" class="cart-clear-btn" onclick="vaciarCarrito()">Vaciar carrito</button>
  `;
}

function actualizarCarritoUI() {
  actualizarContadorCarrito();
  renderCarritoSidebar();
}

function abrirCarrito() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartSidebar) cartSidebar.classList.add("active");
  if (cartOverlay) cartOverlay.classList.add("active");
}

function cerrarCarrito() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartSidebar) cartSidebar.classList.remove("active");
  if (cartOverlay) cartOverlay.classList.remove("active");
}

function iniciarCarritoGlobal() {
  const cartBtn = document.getElementById("openCart");
  const closeCart = document.getElementById("closeCart");
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartBtn) {
    cartBtn.addEventListener("click", function(e) {
      e.preventDefault();
      abrirCarrito();
    });
  }

  if (closeCart) {
    closeCart.addEventListener("click", cerrarCarrito);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", cerrarCarrito);
  }

  actualizarCarritoUI();
}

/* Hacer funciones accesibles globalmente */
window.obtenerCarrito = obtenerCarrito;
window.guardarCarrito = guardarCarrito;
window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidadCarrito = cambiarCantidadCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.vaciarCarrito = vaciarCarrito;
window.actualizarCarritoUI = actualizarCarritoUI;
window.abrirCarrito = abrirCarrito;
window.cerrarCarrito = cerrarCarrito;

document.addEventListener("DOMContentLoaded", iniciarCarritoGlobal);