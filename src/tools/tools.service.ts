import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Reservation, ReservationMaquina, Tool } from './tools.model';

@Injectable()
export class ToolsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<Array<Tool>> {
    return this.knex('Herramienta').select('*');
  }

  async createReservation(reservation: Reservation): Promise<boolean> {
    const [ID] = await this.knex<Reservation>('Reserva').insert(reservation);

    return true;
  }

  async findAllReservations(): Promise<Array<Reservation>> {
    return this.knex('Reserva')
      .where('Reserva.Fecha_hora_regreso', null)
      .select('*');
  }

  async returnReservation(ID_Reserva: number): Promise<boolean> {
    await this.knex<Reservation>('Reserva')
      .where('ID', ID_Reserva)
      .update({ Fecha_hora_regreso: new Date() });

    return true;
  }

  async createReservationMaquina(
    reservation: ReservationMaquina,
  ): Promise<boolean> {
    const [ID] = await this.knex<ReservationMaquina>('ReservaMaquina').insert(
      reservation,
    );

    return true;
  }

  async findAllReservationsMaquinas(): Promise<Array<ReservationMaquina>> {
    return this.knex('ReservaMaquina')
      .where('ReservaMaquina.Fecha_hora_regreso', null)
      .select('*');
  }

  async returnReservationMaquina(ID_Reserva: number): Promise<boolean> {
    await this.knex<ReservationMaquina>('ReservaMaquina')
      .where('ID', ID_Reserva)
      .update({ Fecha_hora_regreso: new Date() });

    return true;
  }
}
