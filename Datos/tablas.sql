CREATE DATABASE gym_heroes;
USE gym_heroes;

CREATE TABLE Series_origen (
    ID_Serie INT PRIMARY KEY,
    Nombre_Serie VARCHAR(100),
    Autor VARCHAR(100),
    Estudio_Animacion VARCHAR(100),
    Pais_Origen VARCHAR(50),
    Anio_Estreno INT
);

CREATE TABLE cat_tipos_cuerpo (
    ID_Tipo INT PRIMARY KEY,
    Nombre_Tipo VARCHAR(50),
    Descripcion_Fisica TEXT,
    Factor_Metabolico VARCHAR(50),
    Recomendacion_Gimnasio TEXT,
    Dificultad_Hipertrofia VARCHAR(20)
);
CREATE TABLE cat_facciones (
    ID_Faccion INT PRIMARY KEY,
    Nombre_Faccion VARCHAR(100),
    Lider_Actual VARCHAR(100),
    Ubicacion_Sede VARCHAR(100),
    Alineacion VARCHAR(50),
    Objetivo_Principal TEXT
);

CREATE TABLE cat_planes_nutricion (
    ID_Plan INT PRIMARY KEY,
    Nombre_Plan VARCHAR(50),
    Objetivo_Fisico VARCHAR(100),
    Total_Calorias_Dia VARCHAR(20),
    Ratio_Proteina VARCHAR(20),
    Descripcion_Menu TEXT
);

CREATE TABLE cat_alimentos (
    ID_Alimento INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Categoria VARCHAR(50),
    Unidad_Medida VARCHAR(20),
    Calorias_U INT,
    Proteina_g DECIMAL(5,2)
);

CREATE TABLE Rutina_ejercicios (
    ID_Ejerc INT PRIMARY KEY,
    Nombre_Ejercicio VARCHAR(100),
    Tipo_Movimiento VARCHAR(50),
    Grupo_Muscular VARCHAR(50),
    Intensidad_Sujeta VARCHAR(50),
    Gasto_Estimado VARCHAR(50)
);

CREATE TABLE cat_suplementos (
    ID_Suple INT PRIMARY KEY,
    Nombre_Suplemento VARCHAR(100),
    Marca VARCHAR(50),
    Tipo_Suple VARCHAR(50),
    Contenido_Neto VARCHAR(50),
    Beneficio_Principal TEXT
);

CREATE TABLE cat_equipamiento_gym (
    ID_Equipo INT PRIMARY KEY,
    Nombre_Equipo VARCHAR(100),
    Categoria VARCHAR(50),
    Estado_Actual VARCHAR(50),
    Ultimo_Mantenimiento DATE,
    Ubicacion_Sala VARCHAR(50)
);

CREATE TABLE cat_estatus_salud (
    ID_Estatus INT PRIMARY KEY,
    Nombre_Estatus VARCHAR(50),
    Nivel_Riesgo VARCHAR(50),
    Permite_Entrenar VARCHAR(2),
    Accion_Recomendada TEXT,
    Prioridad VARCHAR(20)
);

CREATE TABLE Heroes (
    ID_P INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Genero CHAR(1), -- 'M' para Masculino, 'F' para Femenino
    ID_Serie INT,
    ID_Biotipo INT,
    ID_Faccion INT,
    Rol_Ocupacion VARCHAR(100),
    Rango_Poder CHAR(1),
    Estatus_Socio VARCHAR(20),
    FOREIGN KEY (ID_Serie) REFERENCES Series_origen(ID_Serie),
    FOREIGN KEY (ID_Biotipo) REFERENCES cat_tipos_cuerpo(ID_Tipo),
    FOREIGN KEY (ID_Faccion) REFERENCES cat_facciones(ID_Faccion)
);
CREATE TABLE Medidas_Fisicas (
    ID_Medida INT PRIMARY KEY,
    ID_P INT,
    Peso_kg DECIMAL(5,2),
    Altura_cm INT,
    Grasa_Pct VARCHAR(10),
    Pecho_cm INT,
    Cintura_cm INT,
    Somatotipo_Asignado VARCHAR(50),
    FOREIGN KEY (ID_P) REFERENCES Heroes(ID_P)
);

CREATE TABLE seguimiento_antropometrico (
    ID_Seg INT PRIMARY KEY,
    ID_P INT,
    Fecha_Visita DATE,
    Peso_Actual_kg DECIMAL(5,2),
    Pecho_Actual_cm INT,
    Cintura_Actual_cm INT,
    Grasa_Actual_Pct VARCHAR(10),
    Notas_Progreso TEXT,
    FOREIGN KEY (ID_P) REFERENCES Heroes(ID_P)
);

CREATE TABLE bitacora_entrenamiento (
    ID_Bit INT PRIMARY KEY,
    ID_P INT,
    ID_Ejerc INT,
    Series INT,
    Repeticiones INT,
    Carga_Intensidad VARCHAR(50),
    Fecha_Entreno DATE,
    FOREIGN KEY (ID_P) REFERENCES Heroes(ID_P),
    FOREIGN KEY (ID_Ejerc) REFERENCES Rutina_ejercicios(ID_Ejerc)
);

CREATE TABLE asignacion_dietas_detalle (
    ID_Asig_D INT PRIMARY KEY,
    ID_P INT,
    ID_Plan INT,
    ID_Alimento INT,
    Porcion_Gramos INT,
    Frecuencia_Dia VARCHAR(50),
    FOREIGN KEY (ID_P) REFERENCES Heroes(ID_P),
    FOREIGN KEY (ID_Plan) REFERENCES cat_planes_nutricion(ID_Plan),
    FOREIGN KEY (ID_Alimento) REFERENCES cat_alimentos(ID_Alimento)
);

CREATE TABLE asignacion_suplementos (
    ID_Asig_S INT PRIMARY KEY,
    ID_P INT,
    ID_Suple INT,
    Cantidad_Dosis VARCHAR(50),
    Frecuencia VARCHAR(50),
    Objetivo_Entreno TEXT,
    FOREIGN KEY (ID_P) REFERENCES Heroes(ID_P),
    FOREIGN KEY (ID_Suple) REFERENCES cat_suplementos(ID_Suple)
);