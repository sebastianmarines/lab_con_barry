CREATE DATABASE LabConBarry;

USE LabConBarry;


create table Alumno
(
    ID                INT IDENTITY PRIMARY KEY NOT NULL,
    Matricula         VARCHAR(15)              NOT NULL,
    Nombre            VARCHAR(50)              NOT NULL,
    ApellidoPaterno   VARCHAR(25),
    ApellidoMaterno   VARCHAR(25),
    Contrasena        VARCHAR(100),
    CorreoElectronico VARCHAR(100),
    Activo            bit,
);


create table Certificado
(
    ID_Certificado  INT IDENTITY PRIMARY KEY NOT NULL,
    FechaDeCreacion DATETIME,
    Calificacion    INT
);

alter table Alumno
    add ID_Certificado INT FOREIGN KEY REFERENCES Certificado (ID_Certificado);


create table Herramientas
(
    ID_Herramienta      INT IDENTITY PRIMARY KEY NOT NULL,
    Nombre              VARCHAR(100)             NOT NULL,
    Nombre_encargado    VARCHAR(50),
    ApPaterno_encargado VARCHAR(25),
    ApMaterno_encargado VARCHAR(25),
    Inventario          INT                      NOT NULL
);


CREATE TABLE Reserva_Herramientas
(
    Matricula          VARCHAR(15),
    ID_Herramienta     INT,
    Estatus_activo     bit,
    Fecha_hora_reserva DATETIME,
    Fecha_hora_regreso DATETIME,
    Cantidad           INT,
    PRIMARY KEY (Matricula, ID_Herramienta),
    FOREIGN KEY (Matricula) REFERENCES Alumno (Matricula),
    FOREIGN KEY (ID_Herramienta) REFERENCES Herramientas (ID_Herramienta)
);


CREATE TABLE Alumnos_Herramientas
(
    Matricula          VARCHAR(15),
    ID_Herramienta     INT,
    Fecha_hora_pedido  DATETIME,
    Fecha_hora_regreso DATETIME,
    Cantidad           INT,
    PRIMARY KEY (Matricula, ID_Herramienta),
    FOREIGN KEY (Matricula) REFERENCES Alumno (Matricula),
    FOREIGN KEY (ID_Herramienta) REFERENCES Herramientas (ID_Herramienta)
);
