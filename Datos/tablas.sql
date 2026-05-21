create database gym_heroes;
USE gym_heroes;

-- SECCIÓN 1: Catálogos e Infraestructura Base (Tablas Independientes)

-- 1. Catálogo de Series (Soporte Front-end: Doble Autor y Color Temático)
CREATE TABLE Series_origen (
    ID_Serie INT PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Autor VARCHAR(100) NOT NULL,
    Autor2 VARCHAR(100) DEFAULT NULL,
    Estudio_Animacion VARCHAR(100),
    Pais_Origen VARCHAR(50),
    Anio_Estreno INT,
    Color_Hex VARCHAR(7) DEFAULT '#FFFFFF'
);

-- 2. Catálogo de Biotipos Corporales
CREATE TABLE cat_tipos_cuerpo (
    ID_Tipo INT PRIMARY KEY,
    Nombre_Tipo VARCHAR(50) NOT NULL,
    Descripcion_Fisica TEXT,
    Factor_Metabolico VARCHAR(50),
    Recomendacion_Gimnasio TEXT,
    Dificultad_Hipertrofia VARCHAR(20)
);

-- 3. Catálogo de Facciones / Alianzas
CREATE TABLE cat_facciones (
    ID_Faccion INT PRIMARY KEY,
    Nombre_Faccion VARCHAR(100) NOT NULL,
    Lider_Actual VARCHAR(100),
    Ubicacion_Sede VARCHAR(100),
    Alineacion VARCHAR(50),
    Objetivo_Principal TEXT
);

-- 4. Catálogo de Estatus de Salud y Restricciones Médicas
CREATE TABLE cat_estatus_salud (
    ID_Estatus INT PRIMARY KEY,
    Nombre_Estatus VARCHAR(50) NOT NULL,
    Nivel_Riesgo VARCHAR(50),
    Permite_Entrenar VARCHAR(2), -- Almacena 'SI' o 'NO'
    Accion_Recomendada TEXT,
    Prioridad VARCHAR(20)
);

-- 5. Catálogo de Alimentos (Unidades y Macronutrientes)
CREATE TABLE cat_alimentos (
    ID_Alimento INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Categoria VARCHAR(50),
    Unidad_Medida VARCHAR(20),
    Calorias_U INT,
    Proteina_g DECIMAL(5,2),
    Carbo_g DECIMAL(5,2),
    Grasa_g DECIMAL(5,2),
    Foto_URL VARCHAR(255) DEFAULT 'default_food.png'
);

-- 6. Catálogo de Planes de Nutrición Maestros
CREATE TABLE cat_planes_nutricion (
    ID_Plan INT PRIMARY KEY,
    Nombre_Plan VARCHAR(50) NOT NULL,
    Objetivo_Fisico VARCHAR(100),
    Total_Calorias_Dia VARCHAR(20), -- Almacena texto como '2500 kcal' protegido por REGEXP en API
    Ratio_Proteina VARCHAR(20),
    Descripcion_Menu TEXT
);

-- 7. Catálogo de Rutinas y Ejercicios
CREATE TABLE Rutina_ejercicios (
    ID_Ejerc INT PRIMARY KEY,
    Nombre_Ejercicio VARCHAR(100) NOT NULL,
    Tipo_Movimiento VARCHAR(50),
    Grupo_Muscular VARCHAR(50),
    Intensidad_Sugerida VARCHAR(50),
    Gasto_Estimado VARCHAR(50)
);

-- 8. Catálogo de Suplementos Clínicos
CREATE TABLE cat_suplementos (
    ID_Suple INT PRIMARY KEY,
    Nombre_Suplemento VARCHAR(100) NOT NULL,
    Marca_Base VARCHAR(100),
    Tipo_Suple VARCHAR(50),
    Contenido_Neto VARCHAR(50),
    Horario_Sugerido VARCHAR(50),
    Costo_Aprox_USD DECIMAL(10,2),
    Alergenos VARCHAR(100),
    Beneficio_Principal TEXT
);

-- 9. Inventario de Equipamiento de Gym (Tabla Padre de Infraestructura)
CREATE TABLE Equipamineto (
    id_equipo INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    condicion VARCHAR(50) NOT NULL, -- Evaluada por el Evento Diario
    ultimo_mantenimineto DATE NULL,
    ubicacion VARCHAR(100) NOT NULL
);



-- SECCIÓN 2: Entidad Central (HÉROES) y Tablas Dependientes Colectivas

-- 10. Tabla Principal: Héroes
CREATE TABLE Heroes (
    ID_P INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Genero CHAR(1),
    ID_Serie INT,
    ID_Biotipo INT,
    ID_Faccion INT,
    ID_Estatus INT,
    Rol_Ocupacion VARCHAR(100),
    Rango_Poder VARCHAR(5),
    Imagen_URL VARCHAR(255) DEFAULT 'default_hero.png',
    FOREIGN KEY (ID_Serie) REFERENCES Series_origen(ID_Serie),
    FOREIGN KEY (ID_Biotipo) REFERENCES cat_tipos_cuerpo(ID_Tipo),
    FOREIGN KEY (ID_Faccion) REFERENCES cat_facciones(ID_Faccion),
    FOREIGN KEY (ID_Estatus) REFERENCES cat_estatus_salud(ID_Estatus)
);

-- 11. Medidas Físicas Actuales (Ficha Maestra vinculada al TRIGGER de Auditoría)
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

-- 12. Historial de Seguimiento Antropométrico (Evolutivo Clínico)
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

-- 13. Asignación de Dietas Detallada (Tabla de Rompimiento de Muchos a Muchos)
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

-- 14. Bitácora Transaccional de Entrenamiento (Alimentada por el SP_Registrar)
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

-- 15. Asignación de Suplementos por Objetivo
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

-- 16. Registro Transaccional de Uso de Equipamiento (Relación Máquina-Héroe)
CREATE TABLE Uso_Equipamiento (
    id_uso INT PRIMARY KEY,
    id_equipo INT,
    id_heroe INT, -- Declarada e indexada correctamente desde el inicio
    fecha DATETIME NOT NULL,
    duracion_min INT NOT NULL,
    estado_ini VARCHAR(50) NOT NULL,
    estado_final VARCHAR(50) NOT NULL,
    limpio BOOLEAN NOT NULL,
    notas_adicionales TEXT,
    FOREIGN KEY (id_equipo) REFERENCES Equipamineto(id_equipo),
    FOREIGN KEY (id_heroe) REFERENCES Heroes(ID_P)
);

-- 17. Tabla de Registro Histórico de Cambios de Peso (Poblada exclusivamente por el TRIGGER)
CREATE TABLE auditoria_peso (
    id_auditoria INT PRIMARY KEY,
    id_heroe INT,
    peso_ant DECIMAL(5,2),
    peso_nue DECIMAL(5,2),
    fecha DATETIME,
    FOREIGN KEY (id_heroe) REFERENCES Heroes(ID_P)
);

-- 18. Seguridad de Sistema: Credenciales de Acceso para Login del Front-end
CREATE TABLE credenciales_access (
    id_credenciales INT PRIMARY KEY,
    id_heroe INT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Soporta cadenas HASH seguras (bcrypt/argon2) de la API
    ultimo_acceso DATETIME,
    FOREIGN KEY (id_heroe) REFERENCES Heroes(ID_P)
);