import bcrypt from "bcrypt";
import knex from "../connect";


const tableName = 'usuarios';

export interface UserModel {
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password?: string;
}

interface IUser {
  createUser: (user: UserModel) => Promise<UserModel>;
  findUserByEmail: (email: string) => Promise<UserModel>;
}

const createUser = async (user: UserModel): Promise<UserModel> => {
  if (!user.password) {
    throw new Error('Password is required');
  }

  user.password = await bcrypt.hash(user.password, 10);

  if (user.id) {
    delete user.id;
  }

  const [id] = await knex(tableName).insert(user);
  return {...user, id};
}

const findUserByEmail = async (email: string): Promise<UserModel> => {
  return knex(tableName).where({email}).first();
}

export default <IUser>{
  createUser,
  findUserByEmail
};
