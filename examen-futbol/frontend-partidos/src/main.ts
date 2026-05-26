const PORT = 5173;

Bun.serve({
  port: PORT,

  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    if (path === "/") {
      path = "/index.html";
    }

    const file = Bun.file(`src${path}`);

    if (await file.exists()) {
      return new Response(file);
    }

    return new Response("Archivo no encontrado", {
      status: 404,
    });
  },
});

console.log(`Frontend Partidos corriendo en http://localhost:${PORT}`);
