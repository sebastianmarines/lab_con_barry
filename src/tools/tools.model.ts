export interface Tool {
  Matricula: string;
  ID_Herramienta: number;
  Nombre: string;
  Estatus_activo: boolean;
  Fecha_hora_reserva: Date;
  Fecha_hora_regreso: Date;
  Cantidad: number;
}

export interface Reservation {
  ID_Herramienta: number;
  Matricula: string;
  Fecha_hora_reserva: Date;
  Fecha_hora_regreso?: Date;
  Cantidad: number;
  Nombre?: string;
}

export interface ReservationMaquina {
  ID_Maquina: number;
  Matricula: string;
  Fecha_hora_reserva: Date;
  Fecha_hora_regreso?: Date;
  Cantidad: number;
  Nombre?: string;
}
