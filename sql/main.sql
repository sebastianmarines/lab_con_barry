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

alter table Alumno
    add constraint UQ_Matricula unique (Matricula);


create table Certificado
(
    ID_Certificado  INT IDENTITY PRIMARY KEY NOT NULL,
    FechaDeCreacion DATETIME,
    Calificacion    INT
);

alter table Alumno
    add ID_Certificado INT FOREIGN KEY REFERENCES Certificado (ID_Certificado);


create table Herramienta
(
    ID_Herramienta      INT IDENTITY PRIMARY KEY NOT NULL,
    Nombre              VARCHAR(100)             NOT NULL,
    Nombre_encargado    VARCHAR(50),
    ApPaterno_encargado VARCHAR(25),
    ApMaterno_encargado VARCHAR(25),
    Inventario          INT                      NOT NULL
);

INSERT INTO Herramienta (Nombre, Nombre_encargado, ApPaterno_encargado, ApMaterno_encargado, Inventario)
VALUES ('Martillo', 'Juan', 'Perez', 'Garcia', 10),
       ('Desarmador', 'Pedro', 'Gonzalez', 'Garcia', 10),
       ('Pinzas', 'Luis', 'Garcia', 'Garcia', 10),
       ('Cinta Metrica', 'Jose', 'Garcia', 'Garcia', 10),
       ('Cautin', 'Ricardo', 'Garcia', 'Garcia', 10);


CREATE TABLE Reserva
(
    ID                 INT IDENTITY PRIMARY KEY NOT NULL,
    Matricula          VARCHAR(15),
    ID_Herramienta     INT,
    Estatus_activo     bit,
    Fecha_hora_reserva DATETIME,
    Fecha_hora_regreso DATETIME,
    Cantidad           INT,
    FOREIGN KEY (Matricula) REFERENCES Alumno (Matricula),
    FOREIGN KEY (ID_Herramienta) REFERENCES Herramienta (ID_Herramienta)
);

INSERT INTO Reserva (Matricula, ID_Herramienta, Estatus_activo, Fecha_hora_reserva, Fecha_hora_regreso, Cantidad)
VALUES ('A01383056', 1, 1, '2023-06-05 10:00:00', '2023-06-06 11:00:00', 1);


CREATE TABLE Alumnos_Herramientas
(
    Matricula          VARCHAR(15),
    ID_Herramienta     INT,
    Fecha_hora_pedido  DATETIME,
    Fecha_hora_regreso DATETIME,
    Cantidad           INT,
    PRIMARY KEY (Matricula, ID_Herramienta),
    FOREIGN KEY (Matricula) REFERENCES Alumno (Matricula),
    FOREIGN KEY (ID_Herramienta) REFERENCES Herramienta (ID_Herramienta)
);

ALTER TABLE Reserva
    ADD ID_Alumno INT FOREIGN KEY REFERENCES Alumno (ID);

CREATE TABLE ReservaMaquina
(
    ID                 INT IDENTITY PRIMARY KEY NOT NULL,
    Matricula          VARCHAR(15),
    ID_Maquina         INT,
    Estatus_activo     bit,
    Fecha_hora_reserva DATETIME,
    Fecha_hora_regreso DATETIME,
    Cantidad           INT,
    FOREIGN KEY (Matricula) REFERENCES Alumno (Matricula),
);
