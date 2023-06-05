export interface UserBase {
  CorreoElectronico: string;
  Contrasena?: string;
}

export interface User extends UserBase {
  ID?: number;
  Matricula?: string;
  Nombre?: string;
  ApellidoPaterno?: string;
  ApellidoMaterno?: string;
  Activo?: boolean;
}
