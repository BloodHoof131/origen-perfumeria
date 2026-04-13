 async function subirCarritoASupabase() {
    const user = await obtenerUsuarioActual();
    if (!user) return;

    const carrito = obtenerCarrito();

    await supabase.from("carritos").delete().eq("user_id", user.id);

    if (!carrito.length) return;

    const rows = carrito.map(item => ({
      user_id: user.id,
      producto_id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      imagen: item.imagen,
      url: item.url,
      categoria: item.categoria,
      cantidad: item.cantidad
    }));

    const { error } = await supabase.from("carritos").insert(rows);
    if (error) console.error(error);
  }

  async function bajarCarritoDeSupabase() {
    const user = await obtenerUsuarioActual();
    if (!user) return;

    const { data, error } = await supabase
      .from("carritos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    const carrito = (data || []).map(item => ({
      id: item.producto_id,
      nombre: item.nombre,
      precio: Number(item.precio),
      imagen: item.imagen,
      url: item.url,
      categoria: item.categoria,
      cantidad: Number(item.cantidad)
    }));

    guardarCarrito(carrito);
    actualizarCarritoUI();
  }
