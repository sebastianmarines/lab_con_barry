import KnexBase from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knexConfig = {
  client: 'mssql',
  connection: {
    host : process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '1433'),
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'reto',
  }
}

export default KnexBase(knexConfig);
