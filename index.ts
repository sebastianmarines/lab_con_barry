import express, {Express, Request, Response} from 'express';
import { UserModel, User } from './db/models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  console.log('GET /');

  res.send("User");
});

app.post('/user', async (req: Request, res: Response) => {
  console.log('POST /user');

  const body: UserModel = req.body;

  const user: UserModel = await User.createUser(body);

  delete user.password;

  res.send(user);
});

app.post('/login', async (req: Request, res: Response) => {
  console.log('POST /login');

  const {email, password} = req.body;

  const user: UserModel = await User.findUserByEmail(email);

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).send('Invalid password');
    return;
  }

  delete user.password;

  res.send(user);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
