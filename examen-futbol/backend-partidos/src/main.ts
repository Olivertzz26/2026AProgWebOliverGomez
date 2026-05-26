import { PartidoService } from "./application/PartidoService";

const partidoService = new PartidoService();

const PORT = Number(process.env.PORT) || 3003;

function respuestaJSON(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function respuestaError(mensaje: string, status = 500) {
  return respuestaJSON({ error: mensaje }, status);
}

Bun.serve({
  port: PORT,

  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    try {
      if (path === "/") {
        return respuestaJSON({
          mensaje: "API REST de Partidos funcionando",
        });
      }

      if (path === "/equipos" && method === "GET") {
        const equipos = await partidoService.obtenerEquipos();
        return respuestaJSON(equipos);
      }

      if (path === "/partidos" && method === "GET") {
        const partidos = await partidoService.obtenerTodos();
        return respuestaJSON(partidos);
      }

      if (path.startsWith("/partidos/") && method === "GET") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const partido = await partidoService.obtenerPorId(id);

        if (!partido) {
          return respuestaError("Partido no encontrado", 404);
        }

        return respuestaJSON(partido);
      }

      if (path === "/partidos" && method === "POST") {
        const data = await req.json();
        const nuevoPartido = await partidoService.crear(data);
        return respuestaJSON(nuevoPartido, 201);
      }

      if (path.startsWith("/partidos/") && method === "PUT") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const data = await req.json();
        const partidoActualizado = await partidoService.actualizar(id, data);

        if (!partidoActualizado) {
          return respuestaError("Partido no encontrado", 404);
        }

        return respuestaJSON(partidoActualizado);
      }

      if (path.startsWith("/partidos/") && method === "DELETE") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const eliminado = await partidoService.eliminar(id);

        if (!eliminado) {
          return respuestaError("Partido no encontrado", 404);
        }

        return respuestaJSON({
          mensaje: "Partido eliminado correctamente",
        });
      }

      return respuestaError("Ruta no encontrada", 404);
    } catch (error) {
      if (error instanceof Error) {
        return respuestaError(error.message, 500);
      }

      return respuestaError("Error interno del servidor", 500);
    }
  },
});

console.log(`Backend Partidos corriendo en puerto ${PORT}`);
