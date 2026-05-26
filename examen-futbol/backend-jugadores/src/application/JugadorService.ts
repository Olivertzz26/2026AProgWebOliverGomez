import type { Jugador } from "../domain/Jugador";
import { JugadorRepository } from "../infrastructure/JugadorRepository";

export class JugadorService {
  private repository: JugadorRepository;

  constructor() {
    this.repository = new JugadorRepository();
  }

  async obtenerTodos() {
    return await this.repository.obtenerTodos();
  }

  async obtenerPorId(id: number) {
    return await this.repository.obtenerPorId(id);
  }

  async crear(data: Jugador) {
    if (!data.nombre || !data.posicion || !data.numero || !data.equipo_id) {
      throw new Error("Todos los campos son obligatorios");
    }

    if (data.numero <= 0) {
      throw new Error("El número del jugador debe ser mayor a 0");
    }

    return await this.repository.crear(data);
  }

  async actualizar(id: number, data: Jugador) {
    if (!data.nombre || !data.posicion || !data.numero || !data.equipo_id) {
      throw new Error("Todos los campos son obligatorios");
    }

    if (data.numero <= 0) {
      throw new Error("El número del jugador debe ser mayor a 0");
    }

    return await this.repository.actualizar(id, data);
  }

  async eliminar(id: number) {
    return await this.repository.eliminar(id);
  }

  async obtenerEquipos() {
    return await this.repository.obtenerEquipos();
  }
}
