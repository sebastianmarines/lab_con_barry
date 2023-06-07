export interface Tool {
  Matricula: string;
  ID_Herramienta: number;
  Nombre: string;
  Estatus_activo: boolean;
  Fecha_hora_reserva: Date;
  Fecha_hora_regreso: Date;
  Cantidad: number;
}
