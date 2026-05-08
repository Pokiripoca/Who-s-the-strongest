use gym_heroes;
-- Relación 1:1
CREATE TABLE Credenciales_Acceso (
    ID_P INT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Password_Hash VARCHAR(255),
    Nivel_Acceso VARCHAR(20),
    FOREIGN KEY (ID_P) REFERENCES Heroes(ID_P)
);

-- Relación N:M (Tabla Intermedia)
CREATE TABLE Uso_Equipamiento (
    ID_Uso INT PRIMARY KEY AUTO_INCREMENT,
    ID_P INT,
    ID_Equipo INT,
    Fecha_Uso DATETIME,
    Duracion_Minutos INT,
    FOREIGN KEY (ID_P) REFERENCES Heroes(ID_P),
    FOREIGN KEY (ID_Equipo) REFERENCES cat_equipamiento_gym(ID_Equipo)
);

-- Vista 1: Dashboard de Progreso (Une héroe con su último pesaje)
CREATE OR REPLACE VIEW vw_dashboard_progreso AS
SELECT
    h.Nombre,
    s.Nombre_Serie,
    m.Peso_kg AS Peso_Inicial,
    sa.Peso_Actual_kg,
    ROUND((sa.Peso_Actual_kg - m.Peso_kg), 2) AS Diferencia_Peso
FROM Heroes h
JOIN Series_origen s ON h.ID_Serie = s.ID_Serie -- AQUÍ ESTABA EL ERROR (Faltaba esta línea)
JOIN Medidas_Fisicas m ON h.ID_P = m.ID_P
JOIN seguimiento_antropometrico sa ON h.ID_P = sa.ID_P;

-- Vista 2: Reporte de Dietas (Ideal para mostrar en la interfaz de nutrición)
CREATE VIEW vw_reporte_dietas AS
SELECT h.Nombre, p.Nombre_Plan, a.Nombre AS Alimento, d.Porcion_Gramos, d.Frecuencia_Dia
FROM Heroes h
JOIN asignacion_dietas_detalle d ON h.ID_P = d.ID_P
JOIN cat_planes_nutricion p ON d.ID_Plan = p.ID_Plan
JOIN cat_alimentos a ON d.ID_Alimento = a.ID_Alimento;

-- Procedure 1: Actualizar Estatus de Salud (Útil para un botón de "Alta Médica")
DELIMITER //
CREATE PROCEDURE sp_ActualizarSalud(IN p_id INT, IN p_nuevo_estatus INT)
BEGIN
    UPDATE Heroes SET Estatus_Socio = (SELECT Nombre_Estatus FROM cat_estatus_salud WHERE ID_Estatus = p_nuevo_estatus)
    WHERE ID_P = p_id;
END //
DELIMITER ;



DELIMITER //


-- Procedure 2: Registrar nuevo héroe con validación de edad
CREATE PROCEDURE sp_RegistrarHeroe(
    IN p_id INT, IN p_nom VARCHAR(100), IN p_gen CHAR(1), IN p_edad INT, IN p_serie INT
)
BEGIN
    IF p_edad < 15 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El héroe es demasiado joven para el gimnasio.';
    ELSE
        INSERT INTO Heroes (ID_P, Nombre, Genero, Edad, ID_Serie, Estatus_Socio)
        VALUES (p_id, p_nom, p_gen, p_edad, p_serie, 'Activo');
    END IF;
END //
DELIMITER ;

DELIMITER //


-- Trigger 1: Auditoría de cambios de peso
CREATE TABLE auditoria_peso (ID_Auditoria INT PRIMARY KEY AUTO_INCREMENT, ID_P INT, Peso_Anterior DECIMAL(5,2), Peso_Nuevo DECIMAL(5,2), Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

DELIMITER //
CREATE TRIGGER tg_auditoria_peso
AFTER UPDATE ON seguimiento_antropometrico
FOR EACH ROW
BEGIN
    IF OLD.Peso_Actual_kg <> NEW.Peso_Actual_kg THEN
        INSERT INTO auditoria_peso (ID_P, Peso_Anterior, Peso_Nuevo)
        VALUES (NEW.ID_P, OLD.Peso_Actual_kg, NEW.Peso_Actual_kg);
    END IF;
END //
DELIMITER ;

-- Trigger 2: Bloqueo de equipo en mal estado
DELIMITER //
CREATE TRIGGER tg_verificar_equipo
BEFORE INSERT ON Uso_Equipamiento
FOR EACH ROW
BEGIN
    IF (SELECT Estado_Actual FROM cat_equipamiento_gym WHERE ID_Equipo = NEW.ID_Equipo) = 'Mantenimiento' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este equipo está fuera de servicio.';
    END IF;
END //
DELIMITER ;

-- Trigger 1: Auditoría de cambios de peso
CREATE TABLE auditoria_peso (ID_Auditoria INT PRIMARY KEY AUTO_INCREMENT, ID_P INT, Peso_Anterior DECIMAL(5,2), Peso_Nuevo DECIMAL(5,2), Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

DELIMITER //
CREATE TRIGGER tg_auditoria_peso
AFTER UPDATE ON seguimiento_antropometrico
FOR EACH ROW
BEGIN
    IF OLD.Peso_Actual_kg <> NEW.Peso_Actual_kg THEN
        INSERT INTO auditoria_peso (ID_P, Peso_Anterior, Peso_Nuevo)
        VALUES (NEW.ID_P, OLD.Peso_Actual_kg, NEW.Peso_Actual_kg);
    END IF;
END //
DELIMITER ;

-- Trigger 2: Bloqueo de equipo en mal estado
DELIMITER //
CREATE TRIGGER tg_verificar_equipo
BEFORE INSERT ON Uso_Equipamiento
FOR EACH ROW
BEGIN
    IF (SELECT Estado_Actual FROM cat_equipamiento_gym WHERE ID_Equipo = NEW.ID_Equipo) = 'Mantenimiento' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Este equipo está fuera de servicio.';
    END IF;
END //
DELIMITER ;

CREATE OR REPLACE VIEW vw_dashboard_progreso AS
SELECT
    h.Nombre,
    s.Nombre_Serie, -- Aquí usas la 's'
    m.Peso_kg AS Peso_Inicial,
    sa.Peso_Actual_kg,
    (sa.Peso_Actual_kg - m.Peso_kg) AS Diferencia_Peso
FROM Heroes h
JOIN Series_origen s ON h.ID_Serie = s.ID_Serie -- ¡Aquí es donde justificas la 's'!
JOIN Medidas_Fisicas m ON h.ID_P = m.ID_P
JOIN seguimiento_antropometrico sa ON h.ID_P = sa.ID_P;

-- Filtro por nombre de personaje o nombre de serie
SELECT Nombre, Nombre_Serie, Peso_Actual_kg, Diferencia_Peso
FROM vw_dashboard_progreso
WHERE Nombre LIKE '%Deku%' OR Nombre_Serie LIKE '%Boku no Hero%';

-- Consulta para el buscador dinámico
SELECT
    h.Nombre AS Personaje,
    s.Nombre_Serie AS Serie,
    h.Rango_Poder,
    h.Estatus_Socio
FROM Heroes h
JOIN Series_origen s ON h.ID_Serie = s.ID_Serie
WHERE h.Nombre LIKE '%{busqueda}%' OR s.Nombre_Serie LIKE '%{busqueda}%';

ALTER TABLE Series_origen ADD COLUMN Color_Hex VARCHAR(7) DEFAULT '#000000';

UPDATE Series_origen SET Color_Hex = '#ff7300' WHERE Nombre_Serie = 'Dragon Ball Z'; -- Naranja Goku
UPDATE Series_origen SET Color_Hex = '#047947' WHERE Nombre_Serie = 'Boku no Hero Academia'; -- Azul Midoriya
UPDATE Series_origen SET Color_Hex = '#800080' WHERE Nombre_Serie = 'Jujutsu Kaisen'; -- Morado Hechicería
UPDATE Series_origen SET Color_Hex = '#1E90FF' WHERE Nombre_Serie = 'One Piece'; -- Verde Zoro

CREATE OR REPLACE VIEW vw_dashboard_progreso AS
SELECT
    h.Nombre,
    s.Nombre_Serie,
    s.Color_Hex, 
    m.Peso_kg AS Peso_Inicial,
    sa.Peso_Actual_kg,
    (sa.Peso_Actual_kg - m.Peso_kg) AS Diferencia_Peso
FROM Heroes h
JOIN Series_origen s ON h.ID_Serie = s.ID_Serie
JOIN Medidas_Fisicas m ON h.ID_P = m.ID_P
JOIN seguimiento_antropometrico sa ON h.ID_P = sa.ID_P;