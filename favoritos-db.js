  async function obtenerFavoritosDB() {
    const user = await obtenerUsuarioActual();
    if (!user) return [];

    const { data, error } = await supabase
      .from("favoritos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  }

  async function agregarFavoritoDB(producto) {
    const user = await obtenerUsuarioActual();
    if (!user) {
      alert("Debes iniciar sesión para guardar favoritos.");
      window.location.href = "cuenta.html";
      return;
    }

    const { data: existente } = await supabase
      .from("favoritos")
      .select("id")
      .eq("user_id", user.id)
      .eq("producto_id", producto.id)
      .maybeSingle();

    if (existente) return;

    const { error } = await supabase.from("favoritos").insert({
      user_id: user.id,
      producto_id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      url: producto.url,
      categoria: producto.categoria
    });

    if (error) console.error(error);
  }

  async function eliminarFavoritoDB(productoId) {
    const user = await obtenerUsuarioActual();
    if (!user) return;

    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("user_id", user.id)
      .eq("producto_id", productoId);

    if (error) console.error(error);
  }

