--Eliminar Tablas
DROP TABLE rol;

DROP TABLE usuario;

DROP TABLE ruta;

--Crear Tablas
CREATE TABLE rol(
rolID int IDENTITY(0,1) 
CONSTRAINT ck_rol_rolID CHECK ((rolID >= 0 ) AND ( rolID IS NOT NULL)),
tipoRol varchar(50) NOT NULL,
CONSTRAINT pk_rol_rolID PRIMARY KEY (RolID),
CONSTRAINT ck_rol_tipoRol CHECK ( tipoRol IS NOT NULL )
);

CREATE TABLE usuario(
usuarioID int IDENTITY(0,1)
CONSTRAINT ck_usuario_usuarioID CHECK ((usuarioID >= 0) AND (usuarioID IS NOT NULL)),
usuario VARCHAR(100) NOT NULL,
contrasenia VARCHAR(100) NOT NULL,
nombre VARCHAR(50) NOT NULL,
apellido1 VARCHAR(50) NOT NULL,
apellido2 VARCHAR(50),
fechaNacimiento DATE,
rolID INT  NULL,
metodoPagoID INT,
activo char(1) DEFAULT 'A',
CONSTRAINT pk_usuario_usuarioID PRIMARY KEY ( usuarioID ),
CONSTRAINT ck_usuario_usuario CHECK ( usuario IS NOT NULL),
CONSTRAINT fk_usuario_rolID FOREIGN KEY (rolID) References rol(rolID),
CONSTRAINT ck_usuario_activo CHECK (activo IN ('A', 'I'))
);

CREATE TABLE ruta(
rutaID int IDENTITY(0,1)
CONSTRAINT ck_ruta_rutaID CHECK ((rutaID >= 0 )AND(rutaID IS NOT NULL)),
CTP int NOT NULL,
nombreRuta VARCHAR (100) NOT NULL,
provincia VARCHAR (50) NOT NULL,
canton VARCHAR (50) NOT NULL,
precio MONEY NOT NULL,
CONSTRAINT pk_ruta_rutaID PRIMARY KEY ( rutaID )
);

--Datos prueba
--INSERT INTO VALUES ; 

INSERT INTO rol VALUES ('Administrador');
INSERT INTO rol VALUES ('Chofer');
INSERT INTO rol VALUES ('Usuario');

INSERT INTO usuario VALUES ('admin', '1234', 'admin', 'admin', null, NULL, 0, null, 'A'); 

INSERT INTO usuario VALUES ('prueba', '1234', 'admin', 'admin', null, NULL, 0, null, 'I'); 