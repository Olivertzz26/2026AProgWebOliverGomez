export interface Partido {
  id?: number;
  fecha: string;
  equipo_local_id: number;
  equipo_visitante_id: number;
  goles_local: number;
  goles_visitante: number;
}
