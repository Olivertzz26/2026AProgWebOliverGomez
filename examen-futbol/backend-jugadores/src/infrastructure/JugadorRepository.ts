import { Pool } from "pg";
import type { Jugador } from "../domain/Jugador";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "futbol_user",
  password: process.env.DB_PASSWORD || "futbol_pass",
  database: process.env.DB_NAME || "futbol_db",
});

export class JugadorRepository {
  async obtenerTodos(): Promise<Jugador[]> {
    const resultado = await pool.query(`
      SELECT 
        jugadores.id,
        jugadores.nombre,
        jugadores.posicion,
        jugadores.numero,
        jugadores.equipo_id,
        equipos.nombre AS equipo_nombre
      FROM jugadores
      LEFT JOIN equipos ON jugadores.equipo_id = equipos.id
      ORDER BY jugadores.id ASC
    `);

    return resultado.rows;
  }

  async obtenerPorId(id: number): Promise<Jugador | null> {
    const resultado = await pool.query(
      `
      SELECT 
        jugadores.id,
        jugadores.nombre,
        jugadores.posicion,
        jugadores.numero,
        jugadores.equipo_id,
        equipos.nombre AS equipo_nombre
      FROM jugadores
      LEFT JOIN equipos ON jugadores.equipo_id = equipos.id
      WHERE jugadores.id = $1
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return null;
    }

    return resultado.rows[0];
  }

  async crear(jugador: Jugador): Promise<Jugador> {
    const resultado = await pool.query(
      "INSERT INTO jugadores (nombre, posicion, numero, equipo_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [jugador.nombre, jugador.posicion, jugador.numero, jugador.equipo_id]
    );

    return resultado.rows[0];
  }

  async actualizar(id: number, jugador: Jugador): Promise<Jugador | null> {
    const resultado = await pool.query(
      "UPDATE jugadores SET nombre = $1, posicion = $2, numero = $3, equipo_id = $4 WHERE id = $5 RETURNING *",
      [jugador.nombre, jugador.posicion, jugador.numero, jugador.equipo_id, id]
    );

    if (resultado.rows.length === 0) {
      return null;
    }

    return resultado.rows[0];
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await pool.query(
      "DELETE FROM jugadores WHERE id = $1",
      [id]
    );

    return resultado.rowCount !== null && resultado.rowCount > 0;
  }
  
  async obtenerEquipos() {
    const resultado = await pool.query(
      "SELECT id, nombre FROM equipos ORDER BY nombre ASC"
    );

    return resultado.rows;
  }
}
