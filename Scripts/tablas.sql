CREATE DATABASE IF NOT EXISTS QuienEsElMasFuerte;
USE QuienEsElMasFuerte;

CREATE TABLE series_origen (
    id_serie int auto_increment primary key,
    nombre_serie VARCHAR(100),
    autor_obra VARCHAR (100),
    anio_estreno int,
    estudio VARCHAR (100),
    país_origen VARCHAR (100) 
    );

