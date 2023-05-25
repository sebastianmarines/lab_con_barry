CREATE DATABASE reto;

USE reto;

CREATE TABLE dbo.herramientas
(
    id                  int IDENTITY (1, 1) PRIMARY KEY CLUSTERED NOT NULL,
    nombre              varchar(50)                               NOT NULL,
    nombre_encargado    varchar(50)                               NOT NULL,
    apellidop_encargado varchar(50)                               NOT NULL,
    apellidom_encargado varchar(50)                               NOT NULL,
    inventario          int                                       NOT NULL,
    agenda              varchar(50)                               NOT NULL,
    certificado_id      int,
    FOREIGN KEY (certificado_id) REFERENCES dbo.certificados (id)
)

CREATE TABLE dbo.usuarios
(
    id               int IDENTITY (1, 1) PRIMARY KEY CLUSTERED NOT NULL,
    nombre           VARCHAR(50)                               NOT NULL,
    apellido_paterno VARCHAR(50)                               NOT NULL,
    apellido_materno VARCHAR(50)                               NOT NULL,
    email            varchar(50)                               NOT NULL,
    password         VARCHAR(500)                              NOT NULL
)
CREATE INDEX usuario_email_index
    ON dbo.usuarios (email)

CREATE TABLE dbo.certificados
(
    id           int IDENTITY (1, 1) PRIMARY KEY CLUSTERED NOT NULL,
    fecha        DATE                                      NOT NULL,
    calificacion int                                       NOT NULL,
    usuario_id   int                                       NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES dbo.usuarios (id)
)

SELECT TOP 1 *
FROM dbo.usuarios;

INSERT INTO dbo.certificados (fecha, calificacion, usuario_id)
VALUES ('2020-01-01', 10, 12);

SELECT TOP 1 *
FROM dbo.certificados;
