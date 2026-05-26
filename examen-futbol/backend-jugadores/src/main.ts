import { JugadorService } from "./application/JugadorService";

const jugadorService = new JugadorService();

const PORT = Number(process.env.PORT) || 3002;

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
          mensaje: "API REST de Jugadores funcionando",
        });
      }

      if (path === "/equipos" && method === "GET") {
        const equipos = await jugadorService.obtenerEquipos();
        return respuestaJSON(equipos);
      }

      if (path === "/jugadores" && method === "GET") {
        const jugadores = await jugadorService.obtenerTodos();
        return respuestaJSON(jugadores);
      }

      if (path.startsWith("/jugadores/") && method === "GET") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const jugador = await jugadorService.obtenerPorId(id);

        if (!jugador) {
          return respuestaError("Jugador no encontrado", 404);
        }

        return respuestaJSON(jugador);
      }

      if (path === "/jugadores" && method === "POST") {
        const data = await req.json();
        const nuevoJugador = await jugadorService.crear(data);
        return respuestaJSON(nuevoJugador, 201);
      }

      if (path.startsWith("/jugadores/") && method === "PUT") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const data = await req.json();
        const jugadorActualizado = await jugadorService.actualizar(id, data);

        if (!jugadorActualizado) {
          return respuestaError("Jugador no encontrado", 404);
        }

        return respuestaJSON(jugadorActualizado);
      }

      if (path.startsWith("/jugadores/") && method === "DELETE") {
        const id = Number(path.split("/")[2]);

        if (isNaN(id)) {
          return respuestaError("ID inválido", 400);
        }

        const eliminado = await jugadorService.eliminar(id);

        if (!eliminado) {
          return respuestaError("Jugador no encontrado", 404);
        }

        return respuestaJSON({
          mensaje: "Jugador eliminado correctamente",
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

console.log(`Backend Jugadores corriendo en puerto ${PORT}`);
