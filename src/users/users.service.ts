import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly tableName = 'Alumno';

  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<Array<User>> {
    return this.knex(this.tableName).select('*');
  }

  async findUserByEmail(CorreoElectronico: string): Promise<User> {
    return this.knex(this.tableName).where({ CorreoElectronico }).first();
  }

  async createUser(user: User): Promise<User> {
    user.Contrasena = await bcrypt.hash(user.Contrasena, 10);

    const [ID] = await this.knex<User>(this.tableName).insert(user);

    return { ...user, ID };
  }
}
