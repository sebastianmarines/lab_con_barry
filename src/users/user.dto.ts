import { IsEmail, IsString } from 'class-validator';
import { User, UserBase } from './user.model';

export class UserLoginDto implements UserBase {
  @IsEmail()
  CorreoElectronico: string;

  @IsString()
  Contrasena: string;
}

export class UserRegisterDto implements User {
  @IsEmail()
  // TODO: Validar que el email sea @tec.mx
  CorreoElectronico: string;

  @IsString()
  Contrasena: string;

  @IsString()
  Nombre: string;

  @IsString()
  ApellidoPaterno: string;

  @IsString()
  ApellidoMaterno: string;

  @IsString()
  Matricula: string;
}
