/* =========================
   FAVORITOS GLOBAL
========================= */
function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem("origen_favoritos")) || [];
}

function guardarFavoritos(lista) {
  localStorage.setItem("origen_favoritos", JSON.stringify(lista));
}

function estaEnFavoritos(id) {
  return obtenerFavoritos().some(item => item.id === id);
}

function toggleFavorito(producto) {
  let favoritos = obtenerFavoritos();
  const index = favoritos.findIndex(item => item.id === producto.id);

  if (index !== -1) {
    favoritos.splice(index, 1);
    guardarFavoritos(favoritos);
    actualizarContadorFavoritos();
    return false;
  } else {
    favoritos.push(producto);
    guardarFavoritos(favoritos);
    actualizarContadorFavoritos();
    return true;
  }
}

function contarFavoritos() {
  return obtenerFavoritos().length;
}

function actualizarContadorFavoritos() {
  const contador = document.getElementById("favoritosCount");
  if (contador) {
    const total = contarFavoritos();
    contador.textContent = total;
    contador.style.display = total > 0 ? "flex" : "none";
  }
}