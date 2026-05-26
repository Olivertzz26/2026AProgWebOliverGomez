import { Pool } from "pg";
import type { Equipo } from "../domain/Equipo";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "futbol_user",
  password: process.env.DB_PASSWORD || "futbol_pass",
  database: process.env.DB_NAME || "futbol_db",
});

export class EquipoRepository {
  async obtenerTodos(): Promise<Equipo[]> {
    const resultado = await pool.query("SELECT * FROM equipos ORDER BY id ASC");
    return resultado.rows;
  }

  async obtenerPorId(id: number): Promise<Equipo | null> {
    const resultado = await pool.query(
      "SELECT * FROM equipos WHERE id = $1",
      [id]
    );

    if (resultado.rows.length === 0) {
      return null;
    }

    return resultado.rows[0];
  }

  async crear(equipo: Equipo): Promise<Equipo> {
    const resultado = await pool.query(
      "INSERT INTO equipos (nombre, ciudad, estadio) VALUES ($1, $2, $3) RETURNING *",
      [equipo.nombre, equipo.ciudad, equipo.estadio]
    );

    return resultado.rows[0];
  }

  async actualizar(id: number, equipo: Equipo): Promise<Equipo | null> {
    const resultado = await pool.query(
      "UPDATE equipos SET nombre = $1, ciudad = $2, estadio = $3 WHERE id = $4 RETURNING *",
      [equipo.nombre, equipo.ciudad, equipo.estadio, id]
    );

    if (resultado.rows.length === 0) {
      return null;
    }

    return resultado.rows[0];
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await pool.query(
      "DELETE FROM equipos WHERE id = $1",
      [id]
    );

    return resultado.rowCount !== null && resultado.rowCount > 0;
  }
}
