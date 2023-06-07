import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Tool } from './tools.model';

@Injectable()
export class ToolsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<Array<Tool>> {
    return this.knex('Herramienta').select('*');
  }
}
