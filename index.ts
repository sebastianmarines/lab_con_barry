import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User, {UserModel} from "./db/models/User";
import {engine} from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})

declare module 'express-session' {
  // noinspection JSUnusedGlobalSymbols
  interface SessionData {
    user: UserModel;
  }
}

app.use(express.static('public'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

const auth = (req: Request, res: Response, next: Function) => {
  if (req.session.user) next()
  else next('route')
}

app.get('/', async (req: Request, res: Response) => {
  console.log('GET /');

  if (req.session.user) {
    console.log(req.session.user)
  }

  console.log(req.session.user)

  res.render('index');
});

app.get('/iniciar-sesion', async (req: Request, res: Response) => {
  console.log('GET /iniciar-sesion');

  res.render('iniciaSesion');
});

app.post('/iniciar-sesion', urlencodedParser, async (req: Request, res: Response, next: Function) => {
  const {email, password} = req.body;

  const user: UserModel = await User.findUserByEmail(email);

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  if (!user.password) {
    res.status(400).send('Password is required');
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).send('Invalid password');
    return;
  }

  delete user.password;

  req.session.regenerate(function (err) {
    if (err) next(err)

    // store user information in session, typically a user id
    req.session.user = user

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save(function (err) {
      if (err) return next(err)
      res.redirect('/')
    })
  })
});

app.get('/registrarse', async (req: Request, res: Response) => {
  console.log('GET /registrarse');

  res.render('registro');
});

app.post('/registrarse', urlencodedParser, async (req: Request, res: Response) => {
  console.log('POST /registrarse');

  const body: UserModel = req.body;
  console.log(body)

  const user: UserModel = await User.createUser(body);

  // Redirect to login
  res.redirect('/iniciar-sesion');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
