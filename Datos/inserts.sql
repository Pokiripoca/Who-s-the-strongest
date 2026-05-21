INSERT INTO cat_alimentos (ID_Alimento, Nombre, Categoria, Unidad_Medida, Calorias_U, Proteina_g, Carbo_g, Grasa_g)
VALUES
(1, 'Pechuga de Pollo', 'Proteína Magra', '100g', 165, 31.0, 0.0, 3.6),
(2, 'Salmón Salvaje', 'Proteína/Grasa', '100g', 208, 20.0, 0.0, 13.0),
(3, 'Arroz al Vapor', 'Carbohidrato', '100g', 130, 2.7, 28.0, 0.3),
(4, 'Camote Horneado', 'Carbohidrato', '100g', 86, 1.6, 20.0, 0.1),
(5, 'Batido de Proteína', 'Suplemento', '1 Scoop', 120, 24.0, 3.0, 1.5),
(6, 'Aceite de Oliva', 'Grasa Saludable', '1 Cucharada', 119, 0.0, 0.0, 13.5),
(7, 'Huevo Completo', 'Proteína/Grasa', '1 Pieza', 78, 6.0, 0.6, 5.0),
(8, 'Carne de Res (Corte)', 'Proteína Roja', '100g', 250, 26.0, 0.0, 15.0);

INSERT INTO Series_origen (ID_Serie, Titulo, Autor, Autor2, Estudio_Animacion, Pais_Origen, Anio_Estreno, Color_Hex)
VALUES
(1, 'Boku no Hero Academia', 'Kohei Horikoshi', NULL, 'Studio BONES', 'Japón', 2016, '#00ff00'),
(2, 'Kimetsu no Yaiba', 'Koyoharu Gotouge', NULL, 'ufotable', 'Japón', 2019, '#ff0000'),
(3, 'One Piece', 'Eiichiro Oda', NULL, 'Toei Animation', 'Japón', 1999, '#ffff00'),
(4, 'Jujutsu Kaisen', 'Gege Akutami', NULL, 'MAPPA', 'Japón', 2020, '#0000ff'),
(5, 'Inuyasha', 'Rumiko Takahashi', NULL, 'Sunrise', 'Japón', 2000, '#ff00ff'),
(6, 'Ranma ½', 'Rumiko Takahashi', NULL, 'Studio DEEN', 'Japón', 1989, '#ffa500'),
(7, 'Naruto', 'Masashi Kishimoto', NULL, 'Studio Perriot', 'Japón', 1999, '#ffa500'),
(8, 'Avatar', 'Michael Dante DiMartino', 'Bryan Konietzko', 'Nickelodeon Animation Studio', 'EUA', 2005, '#00ffff'),
(9, 'Dragon Ball', 'Akira Toriyama', NULL, 'Toei Animation', 'Japón', 1986, '#ff4500'),
(10, 'Baki de Grappler', 'Keisuke Itagaki', NULL, 'TMS Entertainment', 'Japón', 2001, '#8B0000');
INSERT INTO Heroes (ID_P, Nombre, Genero, ID_Serie, ID_Biotipo, ID_Faccion, ID_Estatus, Rol_Ocupacion, Rango_Poder)
VALUES
(1, 'All Might', 'M', 1, 4, 1, 6, 'Símbolo de Paz', 'S'), -- Recuperación
(2, 'Endeavor', 'M', 1, 3, 1, 1, 'Héroe No. 1', 'S'),
(3, 'Bakugo', 'M', 1, 2, 1, 1, 'Estudiante', 'S'),
(4, 'Kirishima', 'M', 1, 2, 1, 1, 'Estudiante', 'A'),
(5, 'Shoto Todoroki', 'M', 1, 2, 1, 1, 'Estudiante', 'S'),
(6, 'Deku (Izuku)', 'M', 1, 2, 1, 1, 'Estudiante', 'S'),
(7, 'Goku', 'M', 9, 4, 3, 1, 'Guerrero Z', 'SS'),
(8, 'Vegeta', 'M', 9, 4, 3, 1, 'Príncipe Saiyan', 'SS'),
(9, 'Trunks', 'M', 9, 2, 3, 1, 'Guerrero del Futuro', 'SS'),
(10, 'Portgas D. Ace', 'M', 3, 2, 6, 1, 'Comandante Pirata', 'S'),
(11, 'Gyomei Himejima', 'M', 2, 4, 4, 1, 'Pilar de la Roca', 'A'),
(12, 'Tengen Uzui', 'M', 2, 4, 4, 1, 'Pilar del Sonido', 'A'),
(13, 'Giyu Tomioka', 'M', 2, 2, 4, 1, 'Pilar del Agua', 'A'),
(14, 'Tanjiro Kamado', 'M', 2, 2, 4, 1, 'Cazador', 'A'),
(15, 'Inosuke', 'M', 2, 2, 4, 1, 'Cazador', 'B'),
(16, 'Maki Zenin', 'F', 4, 2, 5, 1, 'Hechicera', 'A'),
(17, 'Baki Hanma', 'M', 10, 4, 10, 1, 'Luchador', 'A'),
(18, 'Doppo Orochi', 'M', 10, 3, 10, 1, 'Maestro Karate', 'B'),
(19, 'Roronoa Zoro', 'M', 3, 4, 6, 2, 'Espadachín', 'S'), -- Fatiga
(20, 'Sanji', 'M', 3, 2, 6, 1, 'Cocinero/Luchador', 'S'),
(21, 'Tarafalgar Law', 'M', 3, 1, 6, 3, 'Cirujano', 'S'),   -- Lesión Leve
(22, 'Miruko', 'F', 1, 2, 1, 1, 'Héroe Profesional', 'A'),
(23, 'Satoru Gojo', 'M', 4, 1, 5, 1, 'Hechicero Grado Esp.', 'SS'),
(24, 'Yuji Itadori', 'M', 4, 2, 5, 1, 'Recipiente', 'A'),
(25, 'Sukuna', 'M', 4, 4, 11, 1, 'Rey de Maldiciones', 'SS'),
(26, 'Toji Fushiguro', 'M', 4, 4, 11, 1, 'Asesino de Hechiceros', 'S'),
(27, 'Nanami Kento', 'M', 4, 4, 5, 1, 'Hechicero / Oficinista', 'A'),
(28, 'Dabi', 'M', 1, 1, 8, 4, 'Villano / Liga', 'S'),    -- Lesión Grave
(29, 'Shota Aizawa', 'M', 1, 1, 1, 1, 'Maestro U.A.', 'B'),
(30, 'Hitoshi Shinso', 'M', 1, 1, 2, 1, 'Estudiante Gen Ed', 'B'),
(31, 'Hawks', 'M', 1, 1, 1, 1, 'Héroe No. 2', 'S'),
(32, 'Kyoshi', 'F', 8, 1, 9, 1, 'Avatar', 'SS'),
(33, 'Koga', 'F', 5, 2, 11, 1, 'Lider de tribu Lobo', 'A'),
(34, 'Sango', 'F', 5, 1, 12, 1, 'Exterminadora Yokai', 'B'),
(35, 'Inuyasha', 'M', 5, 2, 12, 1, 'Híbrido', 'S'),
(36, 'Toph Beifong', 'F', 8, 1, 9, 1, 'Maestra Tierra', 'A'),
(37, 'Zuko', 'M', 8, 1, 9, 1, 'Principe de la nacion de Fuego', 'A'),
(38, 'Naruto Uzumaki', 'M', 7, 2, 7, 1, 'Ninja de la aldea de la hoja', 'SS'),
(39, 'Neji Hyuga', 'M', 7, 2, 7, 1, 'shinobi de elite', 'A'),
(40, 'Sasuke Uchiha', 'M', 7, 2, 7, 1, 'ninja vengador', 'SS'),
(41, 'Kakashi Hatake', 'M', 7, 1, 7, 1, 'lider del equipo 7', 'S'),
(42, 'Rock Lee', 'M', 7, 1, 7, 5, 'Maestro de taijutsu', 'A'), -- Sobreentrenamiento
(43, 'Tsunade', 'F', 7, 4, 7, 1, 'Quinta Hokage', 'S'),
(44, 'Ranma Saotome', 'M', 6, 1, 13, 1, 'Maestro de artes marciales', 'B'),
(45, 'Ryoga Hibiki', 'M', 6, 2, 13, 1, 'Artista marcial', 'B'),
(46, 'Akane Tendo', 'F', 6, 1, 13, 1, 'estudiante de artes marciales', 'B');


INSERT INTO cat_estatus_salud (ID_Estatus, Nombre_Estatus, Nivel_Riesgo, Permite_Entrenar, Accion_Recomendada, Prioridad)
VALUES
(1, 'Óptimo', 'Nulo', 'Sí', 'Continuar Plan Actual', 'Baja'),
(2, 'Fatiga Muscular', 'Bajo', 'Leve', 'Reducir Cargas 20%', 'Media'),
(3, 'Lesión Leve', 'Medio', 'Cardio', 'Fisioterapia Preventiva', 'Media'),
(4, 'Lesión Grave', 'Alto', 'No', 'Reposo Total / Cirugía', 'Alta'),
(5, 'Sobreentrenamiento', 'Medio', 'No', 'Semana de Descarga', 'Alta'),
(6, 'Recuperación', 'Bajo', 'Guiado', 'Reintroducción Progresiva', 'Media');

INSERT INTO cat_planes_nutricion (ID_Plan, Nombre_Plan, Objetivo_Fisico, Total_Calorias_Dia, Ratio_Proteina, Descripcion_Menu)
VALUES
(1, 'Volumen Sucio', 'Ganancia masiva de masa', '5,000+ kcal', '30%', 'Altas grasas y carbohidratos'),
(2, 'Definición Extrema', 'Marcar músculo (Ripped)', '2,200 kcal', '50%', 'Baja en carbohidratos, alta en fibra'),
(3, 'Mantenimiento Atlético', 'Resistencia y agilidad', '3,000 kcal', '35%', 'Balanceado para guerreros híbridos'),
(4, 'Ayuno de Combate', 'Claridad mental y ligereza', '1,800 kcal', '40%', 'Ventanas de 16 horas sin comer'),
(5, 'Dieta de Regeneración', 'Recuperación de lesiones', '3,500 kcal', '45%', 'Alta en colágeno y micronutrientes'),
(6, 'Superávit Limpio', 'Músculo sin grasa', '3,800 kcal', '40%', 'Carbohidratos complejos y proteína magra');

INSERT INTO seguimiento_antropometrico (ID_Seg, ID_P, Fecha_Visita, Peso_Actual_kg, Pecho_Actual_cm, Cintura_Actual_cm, Grasa_Actual_Pct, Notas_Progreso)
VALUES
(1, 1, '2026-03-01', 257.0, 127, 84, '4.8%', 'Masa muscular aumentada'),
(2, 2, '2026-03-01', 120.0, 117, 89, '7.5%', 'Mayor densidad ósea'),
(3, 3, '2026-03-02', 71.0, 102, 73, '8.5%', 'Definición mejorada'),
(4, 4, '2026-03-02', 73.0, 105, 77, '9.5%', 'Resistencia aumentada'),
(5, 5, '2026-03-03', 69.0, 100, 71, '7.5%', 'Hipertrofia limpia'),
(6, 6, '2026-03-03', 78.5, 103, 74, '11.0%', 'Control de fuerza y One For All'),
(7, 7, '2026-03-04', 82.0, 112, 75, '6.5%', 'Superávit calórico - Post Entrenamiento Wiss'),
(8, 8, '2026-03-04', 58.0, 97, 69, '5.8%', 'Entrenamiento en cámara de gravedad'),
(9, 9, '2026-03-05', 61.5, 94, 71, '6.5%', 'Mejora en velocidad y agilidad'),
(10, 10, '2026-03-05', 72.0, 102, 75, '7.8%', 'Resistencia al calor mejorada'),
(11, 11, '2026-03-06', 132.0, 137, 94, '9.5%', 'Fuerza física absoluta'),
(12, 12, '2026-03-06', 96.5, 122, 84, '6.8%', 'Entrenamiento excéntrico finalizado'),
(13, 13, '2026-03-07', 70.0, 100, 74, '8.5%', 'Concentración total constante'),
(14, 14, '2026-03-07', 62.5, 92, 71, '9.0%', 'Mejora en capacidad pulmonar'),
(15, 15, '2026-03-08', 64.0, 107, 73, '7.5%', 'Flexibilidad articular extrema'),
(16, 16, '2026-03-08', 55.5, 87, 64, '11.5%', 'Restricción celestial activa'),
(17, 17, '2026-03-09', 72.5, 117, 67, '3.8%', 'Densidad muscular sobrehumana'),
(18, 18, '2026-03-09', 111.0, 132, 91, '11.8%', 'Endurecimiento de nudillos'),
(19, 19, '2026-03-10', 95.5, 120, 79, '6.5%', 'Entrenamiento de tres espadas (cuello)'),
(20, 20, '2026-03-10', 78.0, 104, 75, '7.5%', 'Poder de piernas (Diable Jambe)'),
(21, 21, '2026-03-11', 76.5, 100, 77, '8.5%', 'Recuperación post-operatoria'),
(22, 22, '2026-03-11', 53.0, 94, 61, '9.5%', 'Potencia de salto aumentada'),
(23, 23, '2026-03-12', 83.0, 107, 77, '5.5%', 'Seis ojos en equilibrio metabólico'),
(24, 24, '2026-03-12', 81.5, 110, 75, '8.5%', 'Control de energía maldita'),
(25, 25, '2026-03-13', 81.0, 112, 73, '4.5%', 'Regeneración tisular completa'),
(26, 26, '2026-03-13', 92.0, 122, 77, '3.5%', 'Estado físico pináculo'),
(27, 27, '2026-03-14', 86.0, 107, 81, '9.5%', 'Reducción de estrés laboral'),
(28, 28, '2026-03-14', 61.5, 90, 69, '10.5%', 'Tratamiento de quemaduras'),
(29, 29, '2026-03-15', 69.5, 94, 74, '12.5%', 'Recuperación de fatiga ocular'),
(30, 30, '2026-03-15', 65.0, 92, 72, '11.5%', 'Acondicionamiento físico general'),
(31, 31, '2026-03-16', 76.0, 102, 71, '7.5%', 'Aerodinámica mejorada'),
(32, 32, '2026-03-16', 56.5, 87, 62, '10.5%', 'Conexión espiritual estable'),
(33, 33, '2026-03-17', 66.5, 97, 69, '8.5%', 'Velocidad de carrera aumentada'),
(34, 34, '2026-03-17', 51.5, 84, 59, '13.5%', 'Resistencia ósea mejorada'),
(35, 35, '2026-03-18', 66.5, 100, 73, '7.5%', 'Poder demoníaco estable'),
(36, 36, '2026-03-18', 46.5, 82, 57, '14.5%', 'Densidad mineral ósea'),
(37, 37, '2026-03-19', 64.5, 94, 69, '9.5%', 'Control de respiración de fuego'),
(38, 38, '2026-03-19', 68.0, 104, 74, '8.5%', 'Modo Sabio: Energía natural balanceada'),
(39, 39, '2026-03-20', 65.5, 97, 71, '9.5%', 'Puntos de presión optimizados'),
(40, 40, '2026-03-20', 68.5, 100, 72, '7.5%', 'Fuerza ocular y muscular'),
(41, 41, '2026-03-21', 77.5, 107, 77, '9.5%', 'Copia de movimientos finalizada'),
(42, 42, '2026-03-21', 71.5, 110, 73, '6.5%', 'Apertura de puertas internas (Gate 1)'),
(43, 43, '2026-03-22', 59.5, 97, 64, '14.5%', 'Sello de fuerza de un centenar'),
(44, 44, '2026-03-22', 66.0, 100, 73, '10.5%', 'Equilibrio de artes marciales'),
(45, 45, '2026-03-23', 69.5, 102, 75, '11.5%', 'Sentido de orientación mejorado (Leve)'),
(46, 46, '2026-03-23', 49.5, 86, 61, '13.5%', 'Agilidad defensiva aumentada');

INSERT INTO cat_facciones (ID_Faccion, Nombre_Faccion, Lider_Actual, Ubicacion_Sede, Alineacion, Objetivo_Principal)
VALUES
(1, 'Héroes profesionales', 'Endeavor', 'Japón', 'Héroe', 'Mantener el órden social'),
(2, 'Academia U.A.', 'Nezu / All Might', 'Musutafu, Japón', 'Héroe', 'Formar nuevos profesionales'),
(3, 'Guerreros Z', 'Goku', 'La Tierra', 'Bien', 'Defender la Tierra y el Universo'),
(4, 'Cuerpo de Cazadores', 'Kagaya Ubuyashiki', 'Finca Ubuyashiki', 'Bien', 'Exterminar a Muzan Kibutsuji'),
(5, 'Colegio de Hechicería', 'Masamichi Yaga', 'Tokio, Japón', 'Neutral', 'Exorcizar maldiciones'),
(6, 'Piratas Sombrero Paja', 'Monkey D. Luffy', 'Thousand Sunny', 'Anti-Héroe', 'Encontrar el One Piece'),
(7, 'Aldea Oculta de la Hoja', 'Tsunade', 'País del Fuego', 'Bien', 'Preservar la paz de la aldea'),
(8, 'Liga de Villanos', 'Tomura Shigaraki', 'Escondite móvil', 'Villano', 'Destruir la sociedad actual'),
(9, 'Equipo Avatar', 'Aang', 'Nómadas', 'Héroe', 'Restaurar el equilibrio entre las naciones'),
(10, 'Arena del Torneo Subterráneo', 'Mitsunari Tokugawa', 'Cúpula de Tokio', 'Neutral', 'Organizar las peleas más brutales del mundo'),
(11, 'Independientes', 'N/A', 'Varios', 'Neutral', 'Objetivos personales'),
(12, 'Equipo de Inuyasha', 'Inuyasha', 'Japón Feudal', 'Héroe', 'Encontrar los fragmentos de la perla de Shikon'),
(13, 'Dojo Tendo', 'Soun Tendo', 'Barrio de Furinkan', 'Neutro', 'Practicar Artes Marciales de estilo libre');

INSERT INTO cat_tipos_cuerpo (ID_Tipo, Nombre_Tipo, Descripcion_Fisica, Factor_Metabolico, Recomendacion_Gimnasio, Dificultad_Hipertrofia)
VALUES
(1, 'Ectomorfo', 'Delgado, huesos finos', 'Muy Rápido', 'Entrenamientos cortos e intensos', 'Alta'),
(2, 'Mesomorfo', 'Atlético, hombros anchos', 'Eficiente', 'Variedad de pesos y repeticiones', 'Baja'),
(3, 'Endomorfo', 'Robusto, extremidades cortas', 'Lento', 'Mucho volumen y control calórico', 'Media'),
(4, 'Hipertrófico', 'Masa muscular extrema', 'Especial', 'Mantenimiento de fuerza límite', 'N/A (Ya es máximo)');

INSERT INTO Rutina_ejercicios (ID_Ejerc, Nombre_Ejercicio, Tipo_Movimiento, Grupo_Muscular, Intensidad_Sugerida, Gasto_Estimado)
VALUES
(1, 'Press Militar', 'Empuje Vertical', 'Hombros', 'Alta', '200 kcal/h'),
(2, 'Peso Muerto', 'Tracción', 'Espalda / Pierna', 'Muy Alta', '500 kcal/h'),
(3, 'Dominadas Lastradas', 'Tracción Vertical', 'Espalda (Dorsales)', 'Media-Alta', '300 kcal/h'),
(4, 'Sprints de 100m', 'Explosivo', 'Tren Inferior', 'Extrema', '600 kcal/h'),
(5, 'Fondos en Paralelas', 'Empuje', 'Pecho / Tríceps', 'Media', '250 kcal/h'),
(6, 'Plancha Abdominal', 'Isométrico', 'Core', 'Baja-Media', '100 kcal/h'),
(7, 'Sentadilla Búlgara', 'Empuje Unilateral', 'Pierna (Cuádriceps)', 'Alta', '350 kcal/h'),
(8, 'Curl de Bíceps (Barra)', 'Tracción Aislada', 'Brazos (Bíceps)', 'Media', '150 kcal/h'),
(9, 'Press de Banca', 'Empuje Horizontal', 'Pecho', 'Alta', '300 kcal/h'),
(10, 'Rompecráneos (EZ)', 'Extensión', 'Brazos (Tríceps)', 'Media', '180 kcal/h'),
(11, 'Remo con Barra', 'Tracción Horizontal', 'Espalda Media', 'Alta', '320 kcal/h'),
(12, 'Elevación de Talones', 'Aislamiento', 'Pierna (Pantorrilla)', 'Baja', '80 kcal/h'),
-- Completando a 30 registros con ejercicios temáticos:
(13, 'Flexiones Diamante', 'Empuje', 'Tríceps', 'Media', '150 kcal/h'),
(14, 'Zancadas Explosivas', 'Pliométrico', 'Piernas', 'Alta', '400 kcal/h'),
(15, 'Burpees de Acero', 'Cuerpo Completo', 'Cardio/Fuerza', 'Extrema', '550 kcal/h'),
(16, 'Shadow Boxing', 'Aeróbico', 'Hombros/Cardio', 'Media', '300 kcal/h'),
(17, 'Paseo del Granjero', 'Funcional', 'Core/Agarre', 'Alta', '250 kcal/h'),
(18, 'Dominadas Explosivas', 'Potencia', 'Espalda', 'Muy Alta', '350 kcal/h'),
(19, 'Sentadilla con Salto', 'Pliométrico', 'Piernas', 'Alta', '420 kcal/h'),
(20, 'Escaladores (Mountain Climbers)', 'Cardio', 'Core', 'Media', '280 kcal/h'),
(21, 'Press inclinado con mancuerna', 'Empuje Horizontal', 'Pecho Superior', 'Alta', '290 kcal/h'),
(22, 'Rueda Abdominal', 'Anti-extensión', 'Core', 'Alta', '120 kcal/h'),
(23, 'Clean and Jerk', 'Olímpico', 'Cuerpo Completo', 'Extrema', '650 kcal/h'),
(24, 'Snatch', 'Olímpico', 'Cuerpo Completo', 'Extrema', '600 kcal/h'),
(25, 'Cuerdas de Batalla', 'Resistencia', 'Brazos/Hombros', 'Alta', '450 kcal/h'),
(26, 'Puente de Glúteo', 'Extensión Cadera', 'Glúteo', 'Media', '140 kcal/h'),
(27, 'Golpe de Mazo a Neumático', 'Funcional', 'Cuerpo Completo', 'Muy Alta', '500 kcal/h'),
(28, 'Box Jumps (Salto al cajón)', 'Potencia', 'Piernas', 'Alta', '380 kcal/h'),
(29, 'Vuelo Lateral', 'Aislamiento', 'Hombros', 'Baja-Media', '110 kcal/h'),
(30, 'Crunches en Polea', 'Flexión', 'Core', 'Media', '100 kcal/h');

INSERT INTO cat_suplementos (ID_Suple, Nombre_Suplemento, Marca_Base, Tipo_Suple, Contenido_Neto, Horario_Sugerido, Costo_Aprox_USD, Alergenos, Beneficio_Principal)
VALUES
(1, 'Ultra Wey Pro', 'Proteína de Suero', 'Recuperación', '30g', 'Post-Entreno', 60.00, 'Lácteos', 'Aumento de masa muscular y recuperación rápida.'),
(2, 'Titan Creatine', 'Creatina Monohidrato', 'Fuerza Explosiva', '5g', 'Diario', 25.00, 'Ninguno', 'Mejora el rendimiento en ejercicios de alta intensidad.'),
(3, 'Berserk Pre-Work', 'Cafeína / Beta-Alanina', 'Energía', '1 scoop', 'Pre-Entreno', 45.00, 'Hipertensión', 'Aumento de enfoque y resistencia durante la sesión.'),
(4, 'Zen-Magnesium', 'Citrato de Magnesio', 'Descanso/Sueño', '400mg', 'Noche', 20.00, 'Sensibilidad', 'Relajación muscular y mejora de la calidad del sueño.'),
(5, 'Recovery BCAA', 'Aminoácidos', 'Anti-Catabólico', '10g', 'Durante Entreno', 35.00, 'Ninguno', 'Protección del tejido muscular durante el esfuerzo.'),
(6, 'Vital-Vits', 'Multivitamínico', 'Salud General', '1 cápsula', 'Mañana', 30.00, 'Ninguno', 'Soporte inmunológico y micronutrientes esenciales.');

REPLACE INTO cat_planes_nutricion (ID_Plan, Nombre_Plan, Objetivo_Fisico, Total_Calorias_Dia, Ratio_Proteina, Descripcion_Menu)
VALUES
(1, 'Volumen Sucio', 'Ganancia masiva de masa', '5,000+ kcal', '30%', 'Altas grasas y carbohidratos'),
(2, 'Definición Extrema', 'Marcar músculo (Ripped)', '2,200 kcal', '50%', 'Baja en carbohidratos, alta en fibra'),
(3, 'Mantenimiento Atlético', 'Resistencia y agilidad', '3,000 kcal', '35%', 'Balanceado para guerreros híbridos'),
(4, 'Ayuno de Combate', 'Claridad mental y ligereza', '1,800 kcal', '40%', 'Ventanas de 16 horas sin comer'),
(5, 'Dieta de Regeneración', 'Recuperación de lesiones', '3,500 kcal', '45%', 'Alta en colágeno y micronutrientes'),
(6, 'Superávit Limpio', 'Músculo sin grasa', '3,800 kcal', '40%', 'Carbohidratos complejos y proteína magra');

TRUNCATE TABLE asignacion_dietas_detalle;

INSERT INTO asignacion_dietas_detalle (ID_Asig_D, ID_P, ID_Plan, ID_Alimento, Porcion_Gramos, Frecuencia_Dia)
VALUES
(1, 1, 1, 8, 800, '4 veces al día'),   -- All Might
(2, 2, 6, 1, 300, '3 veces al día'),   -- Endeavor
(3, 3, 2, 1, 250, '4 veces al día'),   -- Bakugo
(4, 4, 3, 8, 400, '3 veces al día'),   -- Kirishima
(5, 5, 2, 2, 200, '3 veces al día'),   -- Shoto
(6, 6, 6, 7, 150, '5 veces al día'),   -- Deku
(7, 7, 1, 3, 500, '4 veces al día'),   -- Goku
(8, 8, 6, 1, 150, '2 veces al día'),   -- Vegeta
(9, 9, 3, 2, 200, '3 veces al día'),   -- Trunks
(10, 10, 3, 4, 200, '2 veces al día'),  -- Ace
(11, 11, 1, 8, 1000, '3 veces al día'), -- Gyomei
(12, 12, 6, 1, 300, '4 veces al día'),  -- Tengen
(13, 13, 3, 2, 250, '2 veces al día'),  -- Tomioka
(14, 14, 3, 3, 400, '4 veces al día'),  -- Tanjiro
(15, 15, 1, 8, 600, '3 veces al día'),  -- Inosuke
(16, 16, 2, 3, 300, '3 veces al día'),  -- Maki
(17, 17, 1, 8, 700, '4 veces al día'),  -- Baki
(18, 18, 1, 4, 250, '2 veces al día'),  -- Doppo
(19, 19, 6, 2, 350, '3 veces al día'),  -- Zoro
(20, 20, 3, 8, 500, '3 veces al día'),  -- Sanji
(21, 21, 5, 5, 60, '2 veces al día'),   -- Law
(22, 22, 2, 1, 300, '4 veces al día'),  -- Miruko
(23, 23, 6, 5, 80, '3 veces al día'),   -- Gojo
(24, 24, 3, 4, 100, '1 vez al día'),    -- Itadori
(25, 25, 1, 8, 900, '3 veces al día'),  -- Sukuna
(26, 26, 6, 1, 200, '3 veces al día'),  -- Toji
(27, 27, 3, 3, 200, '3 veces al día'),  -- Nanami
(28, 28, 5, 7, 120, '2 veces al día'),  -- Dabi
(29, 29, 3, 8, 400, '2 veces al día'),  -- Aizawa
(30, 30, 3, 3, 250, '3 veces al día');  -- Shinso

INSERT INTO bitacora_entrenamiento (ID_Bit, ID_P, ID_Ejerc, Series, Repeticiones, Carga_Intensidad, Fecha_Entreno)
VALUES
(1, 1, 9, 5, 5, '500 kg', '2026-03-01'),           -- All Might: Press de Banca
(2, 2, 1, 4, 8, '140 kg', '2026-03-01'),           -- Endeavor: Press Militar
(3, 3, 3, 4, 12, 'Lastre 30 kg', '2026-03-01'),    -- Bakugo: Dominadas
(4, 4, 2, 5, 5, '220 kg', '2026-03-01'),           -- Kirishima: Peso Muerto
(5, 5, 6, 4, 1, 'Resistencia Térmica', '2026-03-01'), -- Shoto: Plancha (1 min)
(6, 6, 7, 5, 10, '180 kg (Shoot Style)', '2026-03-01'), -- Deku: Sentadilla Búlgara
(7, 7, 2, 10, 1, '10,000 kg (Gravedad)', '2026-03-02'), -- Goku: Peso Muerto
(8, 8, 9, 8, 3, '8,000 kg', '2026-03-02'),         -- Vegeta: Press de Banca
(9, 9, 11, 4, 10, '100 kg', '2026-03-02'),         -- Trunks: Remo con Barra
(10, 10, 1, 4, 12, '80 kg', '2026-03-02'),         -- Ace: Press Militar
(11, 11, 2, 3, 1, '400 kg (Roca)', '2026-03-02'),  -- Gyomei: Peso Muerto
(12, 12, 10, 4, 15, 'Extravagante', '2026-03-02'), -- Tengen: Rompecráneos
(13, 13, 3, 5, 20, 'Calistenia Fluida', '2026-03-02'), -- Tomioka: Dominadas
(14, 14, 9, 4, 10, '90 kg', '2026-03-02'),         -- Tanjiro: Press de Banca
(15, 15, 7, 6, 15, '140 kg (Montaña)', '2026-03-02'), -- Inosuke: Sentadilla Búlgara
(16, 16, 3, 5, 15, 'Lastre 40 kg', '2026-03-03'),  -- Maki: Dominadas
(17, 17, 10, 10, 50, 'Peso Corporal', '2026-03-03'), -- Baki: Rompecráneos
(18, 18, 9, 3, 5, '160 kg', '2026-03-03'),         -- Doppo: Press de Banca
(19, 19, 11, 5, 5, '250 kg (Agarre)', '2026-03-03'), -- Zoro: Remo con Barra
(20, 20, 7, 8, 20, 'Pierna del Diablo', '2026-03-03'), -- Sanji: Sentadilla Búlgara
(21, 21, 6, 3, 2, 'Precisión Quirúrgica', '2026-03-03'), -- Law: Plancha (2 min)
(22, 22, 7, 5, 5, '200 kg (Explosivo)', '2026-03-03'), -- Miruko: Sentadilla Búlgara
(23, 23, 6, 1, 0, 'Infinito', '2026-03-04'),       -- Gojo: Plancha
(24, 24, 9, 5, 5, '180 kg (Divergente)', '2026-03-04'), -- Itadori: Press de Banca
(25, 25, 2, 1, 1, '1,000 kg', '2026-03-04'),       -- Sukuna: Peso Muerto
(26, 26, 3, 5, 30, 'Sin Energía Maldita', '2026-03-04'), -- Toji: Dominadas
(27, 27, 11, 4, 10, '110 kg (Hora Extra)', '2026-03-04'), -- Nanami: Remo con Barra
(28, 28, 1, 3, 8, '60 kg', '2026-03-04'),          -- Dabi: Press Militar
(29, 29, 3, 4, 15, 'Agarre de Bufanda', '2026-03-04'), -- Aizawa: Dominadas
(30, 30, 6, 3, 2, 'Control Mental', '2026-03-04'), -- Shinso: Plancha (1.5 min)
(31, 31, 4, 10, 10, 'Alta Velocidad', '2026-03-05'), -- Hawks: Sprints
(32, 32, 9, 4, 8, '85 kg', '2026-03-05'),          -- Kyoshi: Press de Banca
(33, 33, 10, 4, 12, 'Hilo de Acero', '2026-03-05'), -- Koga: Rompecráneos
(34, 34, 3, 6, 20, 'Élite Ackerman', '2026-03-05'), -- Sango: Dominadas
(35, 35, 2, 5, 5, '150 kg (Híbrido)', '2026-03-05'); -- Inuyasha: Peso Muerto

INSERT INTO asignacion_suplementos (ID_Asig_S, ID_P, ID_Suple, Cantidad_Dosis, Frecuencia, Objetivo_Entreno)
VALUES
(1, 1, 1, '30g', 'Diario', 'Recuperación Masiva'),
(2, 2, 2, '5g', 'Diario', 'Fuerza Explosiva'),
(3, 3, 3, '1 scoop', 'Cada 2 dias', 'Agresividad Controlada'),
(4, 4, 2, '5g', 'Diario', 'Resistencia de Impacto'),
(5, 5, 4, '400mg', 'Semanal', 'Recuperación Térmica'),
(6, 6, 1, '30g', 'Diario', 'Reparación de Fibras'),
(7, 7, 2, '10g', 'Diario', 'Romper Límites'),
(8, 8, 5, '10g', 'Intra-Entreno', 'Evitar Catabolismo'),
(9, 9, 6, '1 cap', 'Mañana', 'Refuerzo Inmune'),
(10, 10, 4, '400mg', 'Noche', 'Fatiga Ocular/Mental'),
(11, 11, 2, '10g', 'Diario', 'Poder Telúrico'),
(12, 12, 3, '1.5 scoops', 'Pre-Entreno', 'Enfoque Extravagante'),
(13, 13, 5, '10g', 'Diario', 'Concentración Serena'),
(14, 14, 1, '25g', 'Post-Entreno', 'Mantener Espíritu'),
(15, 15, 3, '1 scoop', 'Pre-Entreno', 'Energía de Jabalí'),
(16, 16, 6, '1 cap', 'Mañana', 'Salud Pulmonar'),
(17, 17, 2, '5g', 'Diario', 'Hipertrofia Baki'),
(18, 18, 4, '400mg', 'Noche', 'Relajación de Forja'),
(19, 19, 2, '5g', 'Diario', 'Fuerza de Agarre'),
(20, 20, 5, '10g', 'Intra-Entreno', 'Resistencia Ígnea'),
(21, 21, 6, '1 cap', 'Mañana', 'Agudeza Médica'),
(22, 22, 1, '30g', 'Diario', 'Juventud de Acero'),
(23, 23, 4, '800mg', 'Noche', 'Sueño Infinito'),
(24, 24, 3, '1 scoop', 'Pre-Entreno', 'Absorción de Energía'),
(25, 25, 2, '10g', 'Diario', 'Maldición de Poder'),
(26, 26, 1, '40g', 'Diario', 'Densidad Física'),
(27, 27, 6, '1 cap', 'Mañana', 'Salud Laboral'),
(28, 28, 5, '10g', 'Diario', 'Adaptación de Energía'),
(29, 35, 2, '5g', 'Diario', 'Resistencia Híbrida'),
(30, 44, 6, '1 cap', 'Mañana', 'Equilibrio Marcial');


-- 18. Credenciales de Acceso
INSERT INTO credenciales_access (id_credenciales, id_heroe, username, password, ultimo_acceso) VALUES
(1, 1, 'all_might', 'AllMight2024!', NOW()),
(2, 2, 'endeavor', 'Endeavor2024!', NOW()),
(3, 3, 'bakugo', 'Bakugo2024!', NOW()),
(4, 4, 'kirishima', 'Kirishima2024!', NOW()),
(5, 5, 'todoroki', 'Todoroki2024!', NOW()),
(6, 6, 'deku', 'Deku2024!', NOW()),
(7, 7, 'goku', 'Goku2024!', NOW()),
(8, 8, 'vegeta', 'Vegeta2024!', NOW()),
(9, 9, 'trunks', 'Trunks2024!', NOW()),
(10, 10, 'ace', 'Ace2024!', NOW()),
(11, 11, 'gyomei', 'Gyomei2024!', NOW()),
(12, 12, 'tengen', 'Tengen2024!', NOW()),
(13, 13, 'giyu', 'Giyu2024!', NOW()),
(14, 14, 'tanjiro', 'Tanjiro2024!', NOW()),
(15, 15, 'inosuke', 'Inosuke2024!', NOW()),
(16, 16, 'maki', 'Maki2024!', NOW()),
(17, 17, 'baki', 'Baki2024!', NOW()),
(18, 18, 'doppo', 'Doppo2024!', NOW()),
(19, 19, 'zoro', 'Zoro2024!', NOW()),
(20, 20, 'sanji', 'Sanji2024!', NOW()),
(21, 21, 'law', 'Law2024!', NOW()),
(22, 22, 'miruko', 'Miruko2024!', NOW()),
(23, 23, 'gojo', 'Gojo2024!', NOW()),
(24, 24, 'itadori', 'Itadori2024!', NOW()),
(25, 25, 'sukuna', 'Sukuna2024!', NOW()),
(26, 26, 'toji', 'Toji2024!', NOW()),
(27, 27, 'nanami', 'Nanami2024!', NOW()),
(28, 28, 'dabi', 'Dabi2024!', NOW()),
(29, 29, 'aizawa', 'Aizawa2024!', NOW()),
(30, 30, 'shinso', 'Shinso2024!', NOW()),
(31, 31, 'hawks', 'Hawks2024!', NOW()),
(32, 32, 'kyoshi', 'Kyoshi2024!', NOW()),
(33, 33, 'koga', 'Koga2024!', NOW()),
(34, 34, 'sango', 'Sango2024!', NOW()),
(35, 35, 'inuyasha', 'Inuyasha2024!', NOW()),
(36, 36, 'toph', 'Toph2024!', NOW()),
(37, 37, 'zuko', 'Zuko2024!', NOW()),
(38, 38, 'naruto', 'Naruto2024!', NOW()),
(39, 39, 'neji', 'Neji2024!', NOW()),
(40, 40, 'sasuke', 'Sasuke2024!', NOW()),
(41, 41, 'kakashi', 'Kakashi2024!', NOW()),
(42, 42, 'rock_lee', 'RockLee2024!', NOW()),
(43, 43, 'tsunade', 'Tsunade2024!', NOW()),
(44, 44, 'ranma', 'Ranma2024!', NOW()),
(45, 45, 'ryoga', 'Ryoga2024!', NOW()),
(46, 46, 'akane', 'Akane2024!', NOW());
-- 17. Auditoría de Peso
INSERT INTO auditoria_peso (id_auditoria, id_heroe, peso_ant, peso_nue, fecha) VALUES
(1, 1, 255.00, 252.50, '2024-01-10 08:00:00'),
(2, 2, 95.00, 96.20, '2024-01-11 09:00:00'),
(3, 3, 77.00, 78.50, '2024-01-12 10:30:00'),
(4, 4, 83.00, 85.00, '2024-01-13 07:45:00'),
(5, 5, 75.00, 76.00, '2024-01-14 08:15:00'),
(6, 6, 68.00, 71.20, '2024-01-15 09:20:00'),
(7, 7, 80.00, 82.50, '2024-01-16 11:00:00'),
(8, 8, 75.00, 77.00, '2024-01-17 12:00:00'),
(9, 9, 70.00, 72.00, '2024-01-18 10:00:00'),
(10, 10, 82.00, 81.50, '2024-01-19 08:30:00'),
(11, 11, 120.00, 122.00, '2024-01-20 07:00:00'),
(12, 12, 95.00, 95.00, '2024-01-21 09:45:00'),
(13, 13, 73.00, 74.20, '2024-01-22 10:15:00'),
(14, 14, 61.00, 63.00, '2024-01-23 08:00:00'),
(15, 15, 76.00, 78.50, '2024-01-24 11:30:00'),
(16, 16, 65.00, 67.00, '2024-01-25 07:20:00'),
(17, 17, 82.00, 85.00, '2024-01-26 12:45:00'),
(18, 18, 110.00, 112.50, '2024-01-27 10:00:00'),
(19, 19, 81.00, 83.20, '2024-01-28 09:10:00'),
(20, 20, 77.00, 78.00, '2024-01-29 08:40:00'),
(21, 21, 72.00, 73.50, '2024-01-30 11:00:00'),
(22, 22, 62.00, 64.00, '2024-01-31 07:55:00'),
(23, 23, 70.00, 70.00, '2024-02-01 09:00:00'),
(24, 24, 80.00, 82.50, '2024-02-02 10:20:00'),
(25, 25, 92.00, 95.00, '2024-02-03 12:00:00'),
(26, 26, 88.00, 90.00, '2024-02-04 08:15:00'),
(27, 27, 78.00, 79.50, '2024-02-05 07:30:00'),
(28, 28, 74.00, 73.20, '2024-02-06 11:45:00'),
(29, 29, 77.00, 77.50, '2024-02-07 09:00:00'),
(30, 30, 65.00, 67.00, '2024-02-08 10:10:00'),
(31, 31, 72.00, 73.00, '2024-02-09 08:35:00'),
(32, 32, 60.00, 61.50, '2024-02-10 12:00:00'),
(33, 33, 68.00, 69.20, '2024-02-11 07:20:00'),
(34, 34, 58.00, 59.50, '2024-02-12 09:40:00'),
(35, 35, 75.00, 77.00, '2024-02-13 11:15:00'),
(36, 36, 52.00, 54.00, '2024-02-14 08:50:00'),
(37, 37, 70.00, 72.00, '2024-02-15 10:00:00'),
(38, 38, 66.00, 69.50, '2024-02-16 07:45:00'),
(39, 39, 68.00, 70.00, '2024-02-17 09:30:00'),
(40, 40, 67.00, 69.20, '2024-02-18 11:00:00'),
(41, 41, 81.00, 81.50, '2024-02-19 08:20:00'),
(42, 42, 68.00, 71.00, '2024-02-20 07:10:00'),
(43, 43, 62.00, 63.50, '2024-02-21 12:00:00'),
(44, 44, 60.00, 62.00, '2024-02-22 10:15:00'),
(45, 45, 75.00, 78.00, '2024-02-23 09:40:00'),
(46, 46, 55.00, 57.00, '2024-02-24 08:30:00');


INSERT INTO Equipamineto (id_equipo, nombre, categoria, condicion, ultimo_mantenimineto, ubicacion)
VALUES
(1, 'Cámara de Gravedad Aumentada (x100)', 'Mística/Tecnológica', 'Excelente', '2026-03-15', 'Domo de Entrenamiento'),
(2, 'Prensa Hidráulica Anti-Kryptoniana', 'Máquinas Pesadas', 'Operativo', '2026-02-10', 'Zona de Fuerza Bruta'),
(3, 'Cinta de Correr de Velocidad Luz', 'Cardio Avanzado', 'Mantenimiento', '2026-03-25', 'Pista de Velocistas'),
(4, 'Banco de Press de Adamantium Puro', 'Pesos Libres', 'Indestructible', '2026-01-10', 'Forja de Héroes'),
(5, 'Set de Mancuernas de Enano Blanco (1 Ton+)', 'Pesos Libres', 'Operativo', '2026-02-01', 'Zona de Pesos Prohibidos'),
(6, 'Simulador de Combate Holográfico (Danger Room)', 'Funcional/IA', 'Excelente', '2026-04-01', 'Área de Simulación'),
(7, 'Barra Olímpica de Vibranium (Absorbe Impacto)', 'Pesos Libres', 'Excelente', '2026-03-01', 'Zona de Levantamiento'),
(8, 'Tanque de Recuperación Médica (Bacta/Líquido)', 'Recuperación', 'Operativo', '2026-03-28', 'Ala Médica'),
(9, 'Plataforma de Salto Gravitacional', 'Funcional', 'Operativo', '2026-01-20', 'Área de Agilidad'),
(10, 'Saco de Boxeo de Piel de Kaiju (Reforzado)', 'Boxeo/MMA', 'Excelente', '2026-02-15', 'Dojo Central');

INSERT INTO Uso_Equipamiento (id_uso, id_equipo, id_heroe, fecha, duracion_min, estado_ini, estado_final, limpio, notas_adicionales)
VALUES
(1, 7, 1, '2026-05-01 08:30:00', 45, 'Excelente', 'Excelente', 1, 'All Might usó la barra de Vibranium para press militar.'),
(2, 3, 6, '2026-05-01 09:15:00', 30, 'Excelente', 'Excelente', 1, 'Deku entrenó control de velocidad en la cinta luz.'),
(3, 10, 3, '2026-05-01 10:00:00', 60, 'Excelente', 'Desgastado', 0, 'Bakugo sobrecalentó el saco de Kaiju con explosiones.'),
(4, 2, 22, '2026-05-02 11:00:00', 40, 'Bueno', 'Bueno', 1, 'Miruko probó la prensa Anti-Kryptoniana al máximo.'),
(5, 1, 7, '2026-05-02 12:30:00', 120, 'Excelente', 'Excelente', 1, 'Goku realizó entrenamiento de gravedad x100.'),
(6, 6, 23, '2026-05-03 07:00:00', 50, 'Excelente', 'Excelente', 1, 'Satoru Gojo probó la Danger Room con IA avanzada.'),
(7, 4, 42, '2026-05-03 08:00:00', 90, 'Bueno', 'Desgastado', 0, 'Rock Lee hizo 5000 repeticiones en el banco de Adamantium.'),
(8, 8, 14, '2026-05-04 09:00:00', 35, 'Operativo', 'Excelente', 1, 'Tanjiro usó el tanque de Bacta tras una misión intensa.'),
(9, 9, 36, '2026-05-04 10:30:00', 45, 'Operativo', 'Operativo', 1, 'Toph probó la plataforma gravitacional para equilibrio.'),
(10, 5, 37, '2026-05-05 12:00:00', 30, 'Excelente', 'Excelente', 1, 'Zuko entrenó con las mancuernas de Enano Blanco.');

ALTER TABLE medidas_fisicas
MODIFY COLUMN ID_Medida INT AUTO_INCREMENT;
INSERT INTO medidas_fisicas (ID_P, Peso_kg, Altura_cm, Grasa_Pct, Pecho_cm, Cintura_cm, Somatotipo_Asignado)
VALUES
(1, 257.00, 220.00, '4.8%', 127, 84, 'Hipertrófico'),
(2, 120.00, 195.00, '7.5%', 117, 89, 'Endomorfo'),
(3, 71.00, 172.00, '8.5%', 102, 73, 'Mesomorfo'),
(4, 73.00, 175.00, '9.5%', 105, 77, 'Mesomorfo'),
(5, 69.00, 176.00, '7.5%', 100, 71, 'Mesomorfo'),
(6, 78.50, 166.00, '11.0%', 103, 74, 'Mesomorfo'),
(7, 82.00, 175.00, '6.5%', 112, 75, 'Hipertrófico'),
(8, 58.00, 164.00, '5.8%', 97, 69, 'Hipertrófico'),
(9, 61.50, 170.00, '6.5%', 94, 71, 'Mesomorfo'),
(10, 72.00, 185.00, '7.8%', 102, 75, 'Mesomorfo'),
(11, 132.00, 220.00, '9.5%', 137, 94, 'Hipertrófico'),
(12, 96.50, 198.00, '6.8%', 122, 84, 'Hipertrófico'),
(13, 70.00, 176.00, '8.5%', 100, 74, 'Mesomorfo'),
(14, 62.50, 165.00, '9.0%', 92, 71, 'Mesomorfo'),
(15, 64.00, 164.00, '7.5%', 107, 73, 'Mesomorfo'),
(16, 55.50, 170.00, '11.5%', 87, 64, 'Mesomorfo'),
(17, 72.50, 167.00, '3.8%', 117, 67, 'Hipertrófico'),
(18, 111.00, 178.00, '11.8%', 132, 91, 'Endomorfo'),
(19, 95.50, 181.00, '6.5%', 120, 79, 'Hipertrófico'),
(20, 78.00, 180.00, '7.5%', 104, 75, 'Mesomorfo'),
(21, 76.50, 191.00, '8.5%', 100, 77, 'Ectomorfo'),
(22, 53.00, 159.00, '9.5%', 94, 61, 'Mesomorfo'),
(23, 83.00, 190.00, '5.5%', 107, 77, 'Ectomorfo'),
(24, 81.50, 173.00, '8.5%', 110, 75, 'Mesomorfo'),
(25, 81.00, 173.00, '4.5%', 112, 73, 'Hipertrófico'),
(26, 92.00, 185.00, '3.5%', 122, 77, 'Hipertrófico'),
(27, 86.00, 184.00, '9.5%', 107, 81, 'Hipertrófico'),
(28, 61.50, 175.00, '10.5%', 90, 69, 'Ectomorfo'),
(29, 69.50, 183.00, '12.5%', 94, 74, 'Ectomorfo'),
(30, 65.00, 177.00, '11.5%', 92, 72, 'Ectomorfo'),
(31, 76.00, 172.00, '7.5%', 102, 71, 'Ectomorfo'),
(32, 56.50, 180.00, '10.5%', 87, 62, 'Ectomorfo'),
(33, 66.50, 173.00, '8.5%', 97, 69, 'Mesomorfo'),
(34, 51.50, 163.00, '13.5%', 84, 59, 'Ectomorfo'),
(35, 66.50, 168.00, '7.5%', 100, 73, 'Mesomorfo'),
(36, 46.50, 140.00, '14.5%', 82, 57, 'Ectomorfo'),
(37, 64.50, 160.00, '9.5%', 94, 69, 'Ectomorfo'),
(38, 68.00, 166.00, '8.5%', 104, 74, 'Mesomorfo'),
(39, 65.50, 172.00, '9.5%', 97, 71, 'Mesomorfo'),
(40, 68.50, 168.00, '7.5%', 100, 72, 'Mesomorfo'),
(41, 77.50, 181.00, '9.5%', 107, 77, 'Ectomorfo'),
(42, 71.50, 172.00, '6.5%', 110, 73, 'Ectomorfo'),
(43, 59.50, 163.00, '14.5%', 97, 64, 'Hipertrófico'),
(44, 66.00, 164.00, '10.5%', 100, 73, 'Ectomorfo'),
(45, 69.50, 173.00, '11.5%', 102, 75, 'Mesomorfo'),
(46, 49.50, 156.00, '13.5%', 86, 61, 'Ectomorfo')
ON DUPLICATE KEY UPDATE
  Peso_kg = VALUES(Peso_kg),
  Grasa_Pct = VALUES(Grasa_Pct),
  Pecho_cm = VALUES(Pecho_cm),
  Cintura_cm = VALUES(Cintura_cm);