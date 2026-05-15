DELIMITER //
CREATE TRIGGER tr_auditoria_peso_actualizar
AFTER UPDATE ON Medidas_Fisicas
FOR EACH ROW
BEGIN
    IF OLD.Peso_kg <> NEW.Peso_kg THEN
        INSERT INTO auditoria_peso (id_heroe, peso_ant, peso_nue, fecha)
        VALUES (NEW.ID_P, OLD.Peso_kg, NEW.Peso_kg, NOW());
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_registrar_entrenamiento(
    IN p_id_heroe INT,
    IN p_id_ejercicio INT,
    IN p_series INT,
    IN p_reps INT,
    IN p_carga VARCHAR(50)
)
BEGIN
    INSERT INTO bitacora_entrenamiento (ID_P, ID_Ejerc, Series, Repeticiones, Carga_Intensidad, Fecha_Entreno)
    VALUES (p_id_heroe, p_id_ejercicio, p_series, p_reps, p_carga, CURDATE());
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION fn_puede_combatir(p_id_estatus INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE v_permiso VARCHAR(2);
    SELECT Permite_Entrenar INTO v_permiso FROM cat_estatus_salud WHERE ID_Estatus = p_id_estatus;

    IF v_permiso = 'SI' THEN
        RETURN 'APTO';
    ELSE
        RETURN 'EN REPOSO';
    END IF;
END //
DELIMITER ;