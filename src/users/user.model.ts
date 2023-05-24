export interface UserBase {
  email: string;
  password?: string;
}

export interface User extends UserBase{
  id?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
}
