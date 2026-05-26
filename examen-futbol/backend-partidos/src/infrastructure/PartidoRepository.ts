import { Pool } from "pg";
import type { Partido } from "../domain/Partido";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "futbol_user",
  password: process.env.DB_PASSWORD || "futbol_pass",
  database: process.env.DB_NAME || "futbol_db",
});

export class PartidoRepository {
  async obtenerTodos(): Promise<Partido[]> {
    const resultado = await pool.query(`
      SELECT 
        partidos.id,
        partidos.fecha,
        partidos.equipo_local_id,
        local.nombre AS equipo_local_nombre,
        partidos.equipo_visitante_id,
        visitante.nombre AS equipo_visitante_nombre,
        partidos.goles_local,
        partidos.goles_visitante
      FROM partidos
      LEFT JOIN equipos AS local 
        ON partidos.equipo_local_id = local.id
      LEFT JOIN equipos AS visitante 
        ON partidos.equipo_visitante_id = visitante.id
      ORDER BY partidos.id ASC
    `);

    return resultado.rows;
  }

  async obtenerPorId(id: number): Promise<Partido | null> {
    const resultado = await pool.query(
      `
      SELECT 
        partidos.id,
        partidos.fecha,
        partidos.equipo_local_id,
        local.nombre AS equipo_local_nombre,
        partidos.equipo_visitante_id,
        visitante.nombre AS equipo_visitante_nombre,
        partidos.goles_local,
        partidos.goles_visitante
      FROM partidos
      LEFT JOIN equipos AS local 
        ON partidos.equipo_local_id = local.id
      LEFT JOIN equipos AS visitante 
        ON partidos.equipo_visitante_id = visitante.id
      WHERE partidos.id = $1
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return null;
    }

    return resultado.rows[0];
  }

  async crear(partido: Partido): Promise<Partido> {
    const resultado = await pool.query(
      `INSERT INTO partidos 
      (fecha, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [
        partido.fecha,
        partido.equipo_local_id,
        partido.equipo_visitante_id,
        partido.goles_local,
        partido.goles_visitante,
      ]
    );

    return resultado.rows[0];
  }

  async actualizar(id: number, partido: Partido): Promise<Partido | null> {
    const resultado = await pool.query(
      `UPDATE partidos 
      SET fecha = $1, 
          equipo_local_id = $2, 
          equipo_visitante_id = $3, 
          goles_local = $4, 
          goles_visitante = $5 
      WHERE id = $6 
      RETURNING *`,
      [
        partido.fecha,
        partido.equipo_local_id,
        partido.equipo_visitante_id,
        partido.goles_local,
        partido.goles_visitante,
        id,
      ]
    );

    if (resultado.rows.length === 0) {
      return null;
    }

    return resultado.rows[0];
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await pool.query(
      "DELETE FROM partidos WHERE id = $1",
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
