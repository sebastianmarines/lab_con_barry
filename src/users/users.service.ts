import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import {InjectConnection} from "nest-knexjs";

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<any> {
    return this.knex('usuarios').select('*');
  }
}
