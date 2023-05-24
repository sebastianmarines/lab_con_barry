import { IsString, IsEmail } from 'class-validator';
import { User, UserBase } from "./user.model";

export class UserLoginDto implements UserBase{
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserRegisterDto implements User {
  @IsEmail()
  // TODO: Validar que el email sea @tec.mx
  email: string;

  @IsString()
  password: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido_paterno: string;

  @IsString()
  apellido_materno: string;
}

