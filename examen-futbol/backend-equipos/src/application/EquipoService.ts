import type { Equipo } from "../domain/Equipo";
import { EquipoRepository } from "../infrastructure/EquipoRepository";

export class EquipoService {
  private repository: EquipoRepository;

  constructor() {
    this.repository = new EquipoRepository();
  }

  async obtenerTodos() {
    return await this.repository.obtenerTodos();
  }

  async obtenerPorId(id: number) {
    return await this.repository.obtenerPorId(id);
  }

  async crear(data: Equipo) {
    if (!data.nombre || !data.ciudad || !data.estadio) {
      throw new Error("Todos los campos son obligatorios");
    }

    return await this.repository.crear(data);
  }

  async actualizar(id: number, data: Equipo) {
    if (!data.nombre || !data.ciudad || !data.estadio) {
      throw new Error("Todos los campos son obligatorios");
    }

    return await this.repository.actualizar(id, data);
  }

  async eliminar(id: number) {
    return await this.repository.eliminar(id);
  }
}
