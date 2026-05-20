use gym_heroes;
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

CREATE VIEW vista_planes_maestros AS
SELECT
    p.ID_Plan,
    p.Nombre_Plan,
    p.Objetivo_Fisico,
    p.Total_Calorias_Dia,
    COUNT(ad.ID_P) AS Total_Heroes_Asignados
FROM cat_planes_nutricion p
LEFT JOIN (SELECT DISTINCT ID_P, ID_Plan FROM asignacion_dietas_detalle) ad ON p.ID_Plan = ad.ID_Plan
GROUP BY p.ID_Plan;

CREATE VIEW vista_suplementos_heroes AS
SELECT
    h.ID_P,
    h.Nombre AS Heroe,
    s.Nombre_Suplemento,
    s.Tipo_Suple,
    s.Beneficio_Principal,
    asig.Cantidad_Dosis,
    asig.Frecuencia
FROM asignacion_suplementos asig
JOIN Heroes h ON asig.ID_P = h.ID_P
JOIN cat_suplementos s ON asig.ID_Suple = s.ID_Suple;

CREATE VIEW vista_inventario_gym AS
SELECT
    id_equipo,
    nombre,
    categoria,
    condicion,
    ubicacion,
    ultimo_mantenimineto
FROM Equipamineto;

CREATE VIEW vista_rutinas_musculares AS
SELECT
    ID_Ejerc,
    Nombre_Ejercicio,
    Grupo_Muscular,
    Tipo_Movimiento,
    Intensidad_Sugerida,
    Gasto_Estimado
FROM Rutina_ejercicios;


CREATE OR REPLACE VIEW vista_api_heroes_completa AS
SELECT
    h.ID_P AS id_p,
    h.Nombre AS nombre,
    h.Rol_Ocupacion AS alias,
    h.Imagen_URL AS imagen_url,
    h.Rango_Poder AS rango,
    h.ID_Serie AS id_serie,
    COALESCE(s.Titulo, 'Universo Desconocido') AS serie_titulo,
    COALESCE(s.Color_Hex, '#06b6d4') AS color_hex,
    COALESCE(e.Nombre_Estatus, 'Óptimo') AS estatus_salud,
    COALESCE(e.Permite_Entrenar, 'Sí') AS permite_entrenar,
    COALESCE(b.Nombre_Tipo, 'No definido') AS tipo_cuerpo,
    COALESCE(f.Nombre_Faccion, 'Independiente') AS faccion,
    COALESCE(sa.Peso_Actual_kg, 0.0) AS peso,
    COALESCE(sa.Pecho_Actual_cm, 0) AS pecho,
    COALESCE(sa.Cintura_Actual_cm, 0) AS cintura,
    COALESCE(sa.Grasa_Actual_Pct, '0%') AS grasa_pct
FROM heroes h
LEFT JOIN series_origen s ON h.ID_Serie = s.ID_Serie
LEFT JOIN cat_estatus_salud e ON h.ID_Estatus = e.ID_Estatus
LEFT JOIN cat_tipos_cuerpo b ON h.ID_Biotipo = b.ID_Tipo
LEFT JOIN cat_facciones f ON h.ID_Faccion = f.ID_Faccion
LEFT JOIN (
    SELECT ID_P, Peso_Actual_kg, Pecho_Actual_cm, Cintura_Actual_cm, Grasa_Actual_Pct
    FROM seguimiento_antropometrico
    WHERE (ID_P, Fecha_Visita) IN (
        SELECT ID_P, MAX(Fecha_Visita)
        FROM seguimiento_antropometrico
        GROUP BY ID_P
    )
) sa ON h.ID_P = sa.ID_P;

CREATE OR REPLACE VIEW vista_api_heroes_completa AS
SELECT
  h.ID_P AS id_p,
  h.Nombre AS nombre,
  h.Rol_Ocupacion AS alias,
  h.Imagen_URL AS imagen_url,
  h.Rango_Poder AS rango,
  h.ID_Serie AS id_serie,
  COALESCE(s.Titulo, 'Universo Desconocido') AS serie_titulo,
  COALESCE(s.Color_Hex, '#06b6d4') AS color_hex,
  COALESCE(e.Nombre_Estatus, 'Óptimo') AS estatus_salud,
  COALESCE(e.Permite_Entrenar, 'Sí') AS permite_entrenar,
  COALESCE(b.Nombre_Tipo, 'No definido') AS tipo_cuerpo,
  COALESCE(f.Nombre_Faccion, 'Independiente') AS faccion,

  COALESCE(mf.Peso_kg, 0.0) AS peso,
  COALESCE(mf.Pecho_cm, 0) AS pecho,
  COALESCE(mf.Cintura_cm, 0) AS cintura,
  COALESCE(mf.Grasa_Pct, '0%') AS grasa_pct
FROM heroes h
LEFT JOIN series_origen s ON h.ID_Serie = s.ID_Serie
LEFT JOIN cat_estatus_salud e ON h.ID_Estatus = e.ID_Estatus
LEFT JOIN cat_tipos_cuerpo b ON h.ID_Biotipo = b.ID_Tipo
LEFT JOIN cat_facciones f ON h.ID_Faccion = f.ID_Faccion
LEFT JOIN medidas_fisicas mf ON h.ID_P = mf.ID_P;

CREATE OR REPLACE VIEW vista_api_heroes_completa AS
SELECT
  h.ID_P AS id_p,
  h.Nombre AS nombre,
  h.Rol_Ocupacion AS alias,
  h.Imagen_URL AS imagen_url,
  h.Rango_Poder AS rango,
  h.ID_Serie AS id_serie,
  COALESCE(s.Titulo, 'Universo Desconocido') AS serie_titulo,
  COALESCE(s.Color_Hex, '#06b6d4') AS color_hex,
  COALESCE(e.Nombre_Estatus, 'Óptimo') AS estatus_salud,
  COALESCE(e.Permite_Entrenar, 'Sí') AS permite_entrenar,
  COALESCE(b.Nombre_Tipo, 'No definido') AS tipo_cuerpo,
  COALESCE(f.Nombre_Faccion, 'Independiente') AS faccion,

  COALESCE(mf.Peso_kg, 0.0) AS peso,
  COALESCE(mf.Pecho_cm, 0) AS pecho,
  COALESCE(mf.Cintura_cm, 0) AS cintura,
  COALESCE(mf.Grasa_Pct, '0%') AS grasa_pct
FROM heroes h
LEFT JOIN series_origen s ON h.ID_Serie = s.ID_Serie
LEFT JOIN cat_estatus_salud e ON h.ID_Estatus = e.ID_Estatus
LEFT JOIN cat_tipos_cuerpo b ON h.ID_Biotipo = b.ID_Tipo
LEFT JOIN cat_facciones f ON h.ID_Faccion = f.ID_Faccion
LEFT JOIN medidas_fisicas mf ON h.ID_P = mf.ID_P; 