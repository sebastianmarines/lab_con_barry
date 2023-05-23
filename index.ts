import express, {Express, Request, Response} from 'express';
import knex from './db/connect';
import dotenv from 'dotenv';

dotenv.config();


interface User {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password: string;
}

async function getLastUser(): Promise<User> {
  return knex('usuario')
    .select('*')
    .orderBy('id', 'desc')
    .first();
}

const app: Express = express();
const port = process.env.PORT || 8080;

app.get('/', async (req: Request, res: Response) => {
  console.log('GET /');
  const user = await getLastUser();

  res.send(user);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
