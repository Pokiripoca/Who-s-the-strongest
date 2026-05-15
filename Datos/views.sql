CREATE VIEW vista_roster_filtrable AS
SELECT
    h.ID_P,
    h.Nombre,
    h.Rango_Poder,
    h.Imagen_URL,
    s.ID_Serie,
    s.Titulo AS Serie,
    f.ID_Faccion,
    f.Nombre_Faccion AS Faccion,
    e.ID_Estatus,
    e.Nombre_Estatus AS Estado_Salud
FROM Heroes h
JOIN Series_origen s ON h.ID_Serie = s.ID_Serie
JOIN cat_facciones f ON h.ID_Faccion = f.ID_Faccion
JOIN cat_estatus_salud e ON h.ID_Estatus = e.ID_Estatus;

CREATE VIEW vista_perfil_heroe AS
SELECT
    h.ID_P,
    h.Nombre,
    h.Genero,
    s.Titulo AS Serie,
    f.Nombre_Faccion AS Faccion,
    e.Nombre_Estatus AS Salud,
    h.Rol_Ocupacion,
    h.Rango_Poder,
    h.Imagen_URL
FROM Heroes h
JOIN Series_origen s ON h.ID_Serie = s.ID_Serie
JOIN cat_facciones f ON h.ID_Faccion = f.ID_Faccion
JOIN cat_estatus_salud e ON h.ID_Estatus = e.ID_Estatus;

CREATE VIEW vista_uso_maquinas AS
SELECT
    u.id_uso,
    h.Nombre AS Heroe,
    eq.nombre AS Equipo,
    eq.categoria AS Categoria_Equipo,
    u.fecha,
    u.duracion_min,
    u.estado_final,
    u.notas_adicionales
FROM Uso_Equipamiento u
JOIN Heroes h ON u.id_heroe = h.ID_P
JOIN Equipamineto eq ON u.id_equipo = eq.id_equipo;

CREATE VIEW vista_progreso_peso AS
SELECT
    a.id_auditoria,
    h.Nombre AS Heroe,
    a.peso_ant AS Peso_Anterior,
    a.peso_nue AS Peso_Nuevo,
    (a.peso_nue - a.peso_ant) AS Diferencia,
    a.fecha
FROM auditoria_peso a
JOIN Heroes h ON a.id_heroe = h.ID_P;

CREATE VIEW vista_dieta_heroe AS
SELECT
    h.Nombre AS Heroe,
    p.Nombre_Plan,
    p.Objetivo_Fisico,
    al.Nombre AS Alimento,
    ad.Porcion_Gramos,
    ad.Frecuencia_Dia
FROM asignacion_dietas_detalle ad
JOIN Heroes h ON ad.ID_P = h.ID_P
JOIN cat_planes_nutricion p ON ad.ID_Plan = p.ID_Plan
JOIN cat_alimentos al ON ad.ID_Alimento = al.ID_Alimento;

CREATE VIEW vista_perfil_fisico_actual AS
SELECT
    h.Nombre,
    h.Rango_Poder,
    mf.Peso_kg,
    mf.Altura_cm,
    mf.Grasa_Pct,
    mf.Pecho_cm,
    mf.Cintura_cm,
    mf.Somatotipo_Asignado,
    ROUND(mf.Peso_kg / (POWER(mf.Altura_cm/100, 2)), 2) AS IMC
FROM Heroes h
JOIN Medidas_Fisicas mf ON h.ID_P = mf.ID_P;

CREATE VIEW vista_seguimiento_progreso AS
SELECT
    h.Nombre,
    sa.Fecha_Visita,
    sa.Peso_Actual_kg,
    sa.Pecho_Actual_cm,
    sa.Cintura_Actual_cm,
    sa.Grasa_Actual_Pct,
    sa.Notas_Progreso
FROM seguimiento_antropometrico sa
JOIN Heroes h ON sa.ID_P = h.ID_P;
