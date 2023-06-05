import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Render,
  Res,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto, UserRegisterDto } from './user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @Get('login')
  @Render('users/login')
  async login(): Promise<any> {
    return {};
  }

  @Post('login')
  async loginPost(
    @Res() res,
    @Body() body: UserLoginDto,
    @Session() session,
  ): Promise<any> {
    const user = await this.usersService.findUserByEmail(
      body.CorreoElectronico,
    );

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const isPasswordValid = await bcrypt.compare(
      body.Contrasena,
      user.Contrasena,
    );

    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', 401);
    }

    session.user = user;

    return res.redirect('/');
  }

  @Post('/api/login')
  async loginPostApi(
    @Body() body: UserLoginDto,
    @Session() session,
  ): Promise<any> {
    const user = await this.usersService.findUserByEmail(
      body.CorreoElectronico,
    );

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const isPasswordValid = await bcrypt.compare(
      body.Contrasena,
      user.Contrasena,
    );

    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', 401);
    }

    session.user = user;

    return '';
  }

  @Get('register')
  @Render('users/register')
  async register(): Promise<any> {
    return {};
  }

  @Post('register')
  async registerPost(@Body() body: UserRegisterDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(
      body.CorreoElectronico,
    );

    if (user) {
      throw new HttpException('El usuario ya existe', 409);
    }

    const _user = await this.usersService.createUser(body);
    delete _user.Contrasena;

    return _user;
  }
}
