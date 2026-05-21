USE gym_heroes;

-- TRIGGER 1: Auditoría Automática de Modificación de Peso
-- Tabla Afectada: Medidas_Fisicas (AFTER UPDATE)
-- Propósito: Monitorea variaciones reales en el kilaje de los héroes y registra
-- de forma reactiva el histórico en la tabla de auditoría, calculando un ID
-- incremental seguro sin depender de AUTO_INCREMENT.
DELIMITER //

DROP TRIGGER IF EXISTS tr_auditoria_peso_actualizar //

CREATE TRIGGER tr_auditoria_peso_actualizar
AFTER UPDATE ON Medidas_Fisicas
FOR EACH ROW
BEGIN
    DECLARE v_siguiente_id INT;

    -- Se activa únicamente si el peso sufrió una alteración real
    IF OLD.Peso_kg <> NEW.Peso_kg THEN
        -- Generación secuencial de llave primaria manual para cumplir esquema físico
        SELECT COALESCE(MAX(id_auditoria), 0) + 1 INTO v_siguiente_id FROM auditoria_peso;

        INSERT INTO auditoria_peso (id_auditoria, id_heroe, peso_ant, peso_nue, fecha)
        VALUES (v_siguiente_id, NEW.ID_P, OLD.Peso_kg, NEW.Peso_kg, NOW());
    END IF;
END //

DELIMITER ;


-- PROCEDIMIENTO 1: Registro Centralizado de Bitácora de Entrenamiento
-- Parámetros: ID Héroe, ID Ejercicio, Series, Repeticiones, Carga/Intensidad
-- Propósito: Automatiza la inserción de rutinas en la bitácora calculando
-- dinámicamente la llave primaria correlativa (ID_Bit) y sellando la fecha actual.
DELIMITER //

DROP PROCEDURE IF EXISTS sp_registrar_entrenamiento //

CREATE PROCEDURE sp_registrar_entrenamiento(
    IN p_id_heroe INT,
    IN p_id_ejercicio INT,
    IN p_series INT,
    IN p_reps INT,
    IN p_carga VARCHAR(50)
)
BEGIN
    DECLARE v_siguiente_id_bit INT;

    -- Cálculo seguro de clave secuencial para la bitácora
    SELECT COALESCE(MAX(ID_Bit), 0) + 1 INTO v_siguiente_id_bit FROM bitacora_entrenamiento;

    INSERT INTO bitacora_entrenamiento (ID_Bit, ID_P, ID_Ejerc, Series, Repeticiones, Carga_Intensidad, Fecha_Entreno)
    VALUES (v_siguiente_id_bit, p_id_heroe, p_id_ejercicio, p_series, p_reps, p_carga, CURDATE());
END //

DELIMITER ;


-- FUNCIÓN 1: Validación Semántica de Aptitud Médica para Combate
-- Parámetros: ID Estatus de Salud (cat_estatus_salud)
-- Retorna: VARCHAR ('APTO' / 'EN REPOSO')
-- Propósito: Función determinística que valida si el estatus médico actual
-- de un personaje le concede el permiso legal de entrenamiento y despliegue.
DELIMITER //

DROP FUNCTION IF EXISTS fn_puede_combatir //

CREATE FUNCTION fn_puede_combatir(p_id_estatus INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE v_permiso VARCHAR(2);
    SELECT Permite_Entrenar INTO v_permiso FROM cat_estatus_salud WHERE ID_Estatus = p_id_estatus;

    -- Normalización insensible a mayúsculas para blindaje de reglas de negocio
    IF UPPER(v_permiso) = 'SI' THEN
        RETURN 'APTO';
    ELSE
        RETURN 'EN REPOSO';
    END IF;
END //

DELIMITER ;


-- PROCEDIMIENTO 2: Control Operativo de Uso y Desgaste de Maquinaria
-- Parámetros: ID Uso, ID Equipo, ID Héroe, Duración, Estados, Limpieza, Notas
-- Propósito: Restringe el uso de equipamiento bloqueando inserciones si el
-- hardware está inoperativo, registrando el log y actualizando el estatus del equipo.
DELIMITER $$

DROP PROCEDURE IF EXISTS sp_registrar_uso_maquinaria $$

CREATE PROCEDURE sp_registrar_uso_maquinaria(
    IN p_id_uso INT,
    IN p_id_equipo INT,
    IN p_id_heroe INT,
    IN p_duracion INT,
    IN p_estado_ini VARCHAR(50),
    IN p_estado_final VARCHAR(50),
    IN p_limpio BOOLEAN,
    IN p_notas TEXT
)
BEGIN
    DECLARE v_condicion_actual VARCHAR(50);

    -- Validación del estado actual del hardware deportivo
    SELECT condicion INTO v_condicion_actual
    FROM Equipamineto
    WHERE id_equipo = p_id_equipo;

    IF v_condicion_actual = 'Mantenimiento' OR v_condicion_actual = 'Inoperativo' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CRITICAL ERROR: No se puede registrar el uso. La maquinaria está fuera de servicio.';
    END IF;

    -- Guardado del historial transaccional
    INSERT INTO Uso_Equipamiento (id_uso, id_equipo, id_heroe, fecha, duracion_min, estado_ini, estado_final, limpio, notas_adicionales)
    VALUES (p_id_uso, p_id_equipo, p_id_heroe, NOW(), p_duracion, p_estado_ini, p_estado_final, p_limpio, p_notas);

    -- Actualización reactiva de las condiciones físicas de la máquina
    UPDATE Equipamineto
    SET condicion = p_estado_final
    WHERE id_equipo = p_id_equipo;
END $$

DELIMITER ;


-- PROCEDIMIENTO 3: Sincronización Antropométrica Completa
-- Parámetros: ID Seguimiento, ID Héroe, Peso, Pecho, Cintura, % Grasa, Notas
-- Propósito: Ejecuta una actualización transaccional dual. Altera el historial
-- evolutivo clínico y sincroniza la tabla maestra de medidas (disparando el trigger).

DELIMITER $$

DROP PROCEDURE IF EXISTS sp_registrar_antropometria_completa $$

CREATE PROCEDURE sp_registrar_antropometria_completa(
    IN p_id_seg INT,
    IN p_id_heroe INT,
    IN p_peso_nuevo DECIMAL(5,2),
    IN p_pecho INT,
    IN p_cintura INT,
    IN p_grasa VARCHAR(10),
    IN p_notas TEXT
)
BEGIN
    -- 1. Inserción cronológica en el log médico de seguimiento
    INSERT INTO seguimiento_antropometrico (ID_Seg, ID_P, Fecha_Visita, Peso_Actual_kg, Pecho_Actual_cm, Cintura_Actual_cm, Grasa_Actual_Pct, Notas_Progreso)
    VALUES (p_id_seg, p_id_heroe, CURRENT_DATE, p_peso_nuevo, p_pecho, p_cintura, p_grasa, p_notas);

    -- 2. Sincronización instantánea de la ficha maestra de medidas del personaje
    UPDATE Medidas_Fisicas
    SET Peso_kg = p_peso_nuevo,
        Pecho_cm = p_pecho,
        Cintura_cm = p_cintura,
        Grasa_Pct = p_grasa
    WHERE ID_P = p_id_heroe;
END $$

DELIMITER ;

-- EVENTO 1: Daemon Diario de Monitoreo de Infraestructura
-- Ejecución: Cada 24 horas a las 00:00:00
-- Propósito: Evalúa de forma asíncrona la bitácora operativa diaria de uso.
-- Si detecta fallas o desgastes reportados por los usuarios, cambia el estado
-- del equipo automáticamente a 'Revisión Requerida'.
SET GLOBAL event_scheduler = ON;

DELIMITER $$

DROP EVENT IF EXISTS ev_limpieza_automatica_gym $$

CREATE EVENT ev_limpieza_automatica_gym
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE, '00:00:00')
COMMENT 'Monitorea el estado final de los equipos usados en el día y actualiza reportes automáticos.'
DO
BEGIN
    UPDATE Equipamineto e
    JOIN (
        SELECT id_equipo, estado_final
        FROM Uso_Equipamiento
        WHERE DATE(fecha) = CURRENT_DATE()
    ) sub ON e.id_equipo = sub.id_equipo
    SET e.condicion = 'Revisión Requerida'
    WHERE sub.estado_final LIKE '%Malo%'
       OR sub.estado_final LIKE '%Desgastado%'
       OR sub.estado_final LIKE '%Falla%';
END $$

DELIMITER ;
-- CONTROL DE ACCESO (DCL): Inicialización y Asignación de Roles del Sistema
-- Propósito: Garantiza el principio de menor privilegio aislando accesos por
-- nivel de responsabilidad (Administrativo, Clínico/Operativo y Consumo de API).

-- Limpieza preventiva de usuarios existentes en el servidor local
DROP USER IF EXISTS 'admin_gym'@'localhost';
DROP USER IF EXISTS 'staff_operativo'@'localhost';
DROP USER IF EXISTS 'front_api_user'@'localhost';

-- USUARIO 1: Administrador General de Infraestructura
-- Permisos: Control absoluto transaccional y estructural (DDL, DML, DCL).

CREATE USER 'admin_gym'@'localhost' IDENTIFIED BY 'SuperHeroAdmin2026!';
GRANT ALL PRIVILEGES ON gym_heroes.* TO 'admin_gym'@'localhost' WITH GRANT OPTION;

-- USUARIO 2: Staff Clínico y Entrenadores Operativos
-- Permisos: Inserción y actualización restringida a bitácoras, dietas,
-- evolución corporal y log de maquinarias. Lectura bloqueada a accesos sensibles.
CREATE USER 'staff_operativo'@'localhost' IDENTIFIED BY 'StaffSecureAccess44!';
GRANT SELECT, INSERT, UPDATE ON gym_heroes.bitacora_entrenamiento TO 'staff_operativo'@'localhost';
GRANT SELECT, INSERT, UPDATE ON gym_heroes.seguimiento_antropometrico TO 'staff_operativo'@'localhost';
GRANT SELECT, INSERT, UPDATE ON gym_heroes.asignacion_dietas_detalle TO 'staff_operativo'@'localhost';
GRANT SELECT, INSERT, UPDATE ON gym_heroes.Uso_Equipamiento TO 'staff_operativo'@'localhost';
GRANT SELECT, UPDATE ON gym_heroes.Medidas_Fisicas TO 'staff_operativo'@'localhost';
GRANT SELECT ON gym_heroes.Heroes TO 'staff_operativo'@'localhost';
GRANT SELECT ON gym_heroes.Equipamineto TO 'staff_operativo'@'localhost';

-- USUARIO 3: Conector del Servidor Frontend (Node.js/React API)
-- Permisos: Lectura exclusiva y estrictamente acotada a la tabla de accesos
-- y las vistas desnormalizadas del negocio. Inmune a ataques destructivos de SQL Injection.
CREATE USER 'front_api_user'@'localhost' IDENTIFIED BY 'ReactReaderToken99#';
GRANT SELECT ON gym_heroes.credenciales_access TO 'front_api_user'@'localhost';
GRANT SELECT ON gym_heroes.vista_inventario_gym TO 'front_api_user'@'localhost';
GRANT SELECT ON gym_heroes.vista_dieta_heroe TO 'front_api_user'@'localhost';
GRANT SELECT ON gym_heroes.vista_perfil_heroe TO 'front_api_user'@'localhost';

-- Consolidación y refresco instantáneo de la matriz de privilegios en el motor
FLUSH PRIVILEGES;