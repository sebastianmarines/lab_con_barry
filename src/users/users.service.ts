import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly tableName = 'usuarios';

  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<Array<User>> {
    return this.knex(this.tableName).select('*');
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.knex(this.tableName).where({ email }).first();
  }

  async createUser(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);

    const [id] = await this.knex<User>(this.tableName).insert(user);

    return { ...user, id };
  }
}
