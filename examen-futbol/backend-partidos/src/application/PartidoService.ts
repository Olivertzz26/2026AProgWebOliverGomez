import type { Partido } from "../domain/Partido";
import { PartidoRepository } from "../infrastructure/PartidoRepository";

export class PartidoService {
  private repository: PartidoRepository;

  constructor() {
    this.repository = new PartidoRepository();
  }

  async obtenerTodos() {
    return await this.repository.obtenerTodos();
  }

  async obtenerPorId(id: number) {
    return await this.repository.obtenerPorId(id);
  }

  async crear(data: Partido) {
    if (
      !data.fecha ||
      !data.equipo_local_id ||
      !data.equipo_visitante_id ||
      data.goles_local === undefined ||
      data.goles_visitante === undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    if (data.equipo_local_id === data.equipo_visitante_id) {
      throw new Error("El equipo local y visitante no pueden ser el mismo");
    }

    if (data.goles_local < 0 || data.goles_visitante < 0) {
      throw new Error("Los goles no pueden ser negativos");
    }

    return await this.repository.crear(data);
  }

  async actualizar(id: number, data: Partido) {
    if (
      !data.fecha ||
      !data.equipo_local_id ||
      !data.equipo_visitante_id ||
      data.goles_local === undefined ||
      data.goles_visitante === undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    if (data.equipo_local_id === data.equipo_visitante_id) {
      throw new Error("El equipo local y visitante no pueden ser el mismo");
    }

    if (data.goles_local < 0 || data.goles_visitante < 0) {
      throw new Error("Los goles no pueden ser negativos");
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
