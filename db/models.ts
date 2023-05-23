import knex from './connect';
import bcrypt from 'bcrypt';

export interface UserModel {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password: string;
}

export interface IUser {
  createUser: (user: UserModel) => Promise<UserModel>;
  findUserByEmail: (email: string) => Promise<UserModel>;
}

export class User implements IUser {
  private static tableName = 'usuarios';

  private createUser: (user: UserModel) => Promise<UserModel>;
  private findUserByEmail: (email: string) => Promise<UserModel>;

  constructor() {
    this.createUser = User.createUser;
    this.findUserByEmail = User.findUserByEmail;
  }

  static async createUser(user: UserModel): Promise<UserModel> {
    user.password = await bcrypt.hash(user.password, 10);

    if (user.id) {
      delete user.id;
    }

    const [id] = await knex(User.tableName).insert(user);
    return {...user, id};
  }

  static async findUserByEmail(email: string): Promise<UserModel> {
    return knex(User.tableName).where({email}).first();
  }
}
