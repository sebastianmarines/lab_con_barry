import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Reservation, Tool } from './tools.model';

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
}
