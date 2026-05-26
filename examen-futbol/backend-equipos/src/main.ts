import { EquipoService } from "./application/EquipoService";

const equipoService = new EquipoService();

const PORT = Number(process.env.PORT) || 3001;

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
          mensaje: "API REST de Equipos funcionando",
        });
      }

      if (path === "/equipos" && method === "GET") {
        const equipos = await equipoService.obtenerTodos();
        return respuestaJSON(equipos);
      }

      if (path.startsWith("/equipos/") && method === "GET") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const equipo = await equipoService.obtenerPorId(id);

        if (!equipo) {
          return respuestaError("Equipo no encontrado", 404);
        }

        return respuestaJSON(equipo);
      }

      if (path === "/equipos" && method === "POST") {
        const data = await req.json();
        const nuevoEquipo = await equipoService.crear(data);
        return respuestaJSON(nuevoEquipo, 201);
      }

      if (path.startsWith("/equipos/") && method === "PUT") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const data = await req.json();
        const equipoActualizado = await equipoService.actualizar(id, data);

        if (!equipoActualizado) {
          return respuestaError("Equipo no encontrado", 404);
        }

        return respuestaJSON(equipoActualizado);
      }

      if (path.startsWith("/equipos/") && method === "DELETE") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const eliminado = await equipoService.eliminar(id);

        if (!eliminado) {
          return respuestaError("Equipo no encontrado", 404);
        }

        return respuestaJSON({
          mensaje: "Equipo eliminado correctamente",
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

console.log(`Backend Equipos corriendo en puerto ${PORT}`);
