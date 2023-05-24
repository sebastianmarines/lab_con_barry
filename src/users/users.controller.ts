import { Body, Controller, Get, HttpException, Post, Render, Res, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from "bcrypt";
import { UserLoginDto, UserRegisterDto } from "./user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @Get('login')
  @Render('users/login')
  async login(): Promise<any> {}

  @Post('login')
  async loginPost(@Res() res, @Body() body: UserLoginDto, @Session() session): Promise<any> {
    const user = await this.usersService.findUserByEmail(body.email);

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', 401);
    }

    session.user = user;

    return res.redirect('/');
  }

  @Get('register')
  @Render('users/register')
  async register(): Promise<any> {}

  @Post('register')
  async registerPost(@Body() body: UserRegisterDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(body.email);

    if (user) {
      throw new HttpException('El usuario ya existe', 409);
    }

    const _user = await this.usersService.createUser(body);
    delete _user.password;

    return _user;
  }
}
