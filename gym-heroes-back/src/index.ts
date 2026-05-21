import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  const { pool } = await import("./db/index.ts");

  console.log(" Registrando rutas en Express...");

  app.get("/api/heroes", async (req, res) => {
    try {
      const [rows]: any = await pool.query(`
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
        LEFT JOIN medidas_fisicas mf ON h.ID_P = mf.ID_P
      `);

      const processedHeroes = rows.map((hero: any) => {
        let grasaNum = 0;
        if (hero.grasa_pct) {
          grasaNum = Number(String(hero.grasa_pct).replace("%", "").trim());
        }
        return {
          id_p: Number(hero.id_p),
          nombre: hero.nombre,
          alias: hero.alias || "Héroe en Entrenamiento",
          imagen_url: hero.imagen_url || "assets/heroes/default.png",
          id_serie: Number(hero.id_serie),
          text_titulo: hero.serie_titulo,
          color_hex: hero.color_hex,
          estatus_salud: hero.estatus_salud,
          permite_entrenar: hero.permite_entrenar,
          tipo_cuerpo: hero.tipo_cuerpo,
          faccion: hero.faccion,
          rango: hero.rango || "B",
          peso: hero.peso ? Number(hero.peso) : 0,
          pecho: hero.pecho ? Number(hero.pecho) : 0,
          cintura: hero.cintura ? Number(hero.cintura) : 0,
          grasa_pct: grasaNum,
        };
      });

      res.json(processedHeroes);
    } catch (error: any) {
      console.error(" Error en GET /api/heroes:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", detalle: error.message });
    }
  });
  app.get("/api/nutrition/all", async (req, res) => {
    try {
      console.log("Petición recibida en GET /api/nutrition/all");

      const [rows]: any = await pool.query(`
        SELECT 
          COALESCE(add_d.ID_P, 0) AS id_p,
          COALESCE(p.Nombre_Plan, 'Plan Temporal') AS plan_nombre,
          COALESCE(p.Objetivo_Fisico, 'Mantenimiento') AS objetivo,
          a.Nombre AS aliento_nombre,
          a.Categoria AS aliento_categoria,
          COALESCE(add_d.Porcion_Gramos, 100) AS porcion,
          COALESCE(add_d.Frecuencia_Dia, '1 vez al día') AS frecuencia,
          a.*
        FROM cat_alimentos a
        LEFT JOIN asignacion_dietas_detalle add_d ON a.ID_Alimento = add_d.ID_Alimento
        LEFT JOIN cat_planes_nutricion p ON add_d.ID_Plan = p.ID_Plan
      `);

      const cleanNutritionValue = (val: any): number => {
        if (val === null || val === undefined) return 0;
        const str = String(val).toLowerCase();
        const cleaned = str.replace(/[^\d.]/g, "");
        const num = Number(cleaned);
        return isNaN(num) ? 0 : num;
      };

      const processedRows = rows.map((row: any) => {
        return {
          id_p: Number(row.id_p),
          plan_nombre: row.plan_nombre,
          objetivo: row.objetivo,
          aliento_nombre: row.aliento_nombre || "Alimento sin nombre",
          aliento_categoria: row.aliento_categoria || "General",
          porcion: Number(row.porcion),
          frecuencia: row.frecuencia,

          calorias: cleanNutritionValue(row.Calorias_U),
          proteinas: cleanNutritionValue(row.Proteina_g),
          carbohidratos: cleanNutritionValue(row.Carbo_g),
          grasas: cleanNutritionValue(row.Grasa_g),
        };
      });

      res.json(processedRows);
    } catch (error: any) {
      console.error(" Error crítico en GET /api/nutrition/all:", error);
      res
        .status(500)
        .json({ error: "Error en base de datos", detalle: error.message });
    }
  });

  app.get("/api/nutrition/supplements", async (req, res) => {
    try {
      console.log(" Petición recibida en GET /api/nutrition/supplements");

      const [rows]: any = await pool.query(`
        SELECT 
          COALESCE(asu.ID_P, 0) AS id_p,
          cs.Nombre_Suplemento AS nombre,
          COALESCE(cs.Marca_Base, 'Genérico') AS marca,
          COALESCE(cs.Tipo_Suple, 'Polvo') AS tipo,
          COALESCE(cs.Contenido_Neto, 'N/A') AS contenido,
          COALESCE(cs.Costo_Aprox_USD, 0.0) AS costo,
          COALESCE(cs.Beneficio_Principal, 'Suplementación Base') AS objetivo,
          COALESCE(asu.Cantidad_Dosis, '1 porción') AS porcion,
          COALESCE(asu.Frecuencia, 'Post-Entreno') AS timing
        FROM cat_suplementos cs
        LEFT JOIN asignacion_suplementos asu ON cs.ID_Suple = asu.ID_Suple
      `);
      res.json(rows);
    } catch (error: any) {
      console.error(" Error en GET /api/nutrition/supplements:", error);
      res
        .status(500)
        .json({ error: "Error en suplementos", detalle: error.message });
    }
  });

  app.get("/api/facility/equipment", async (req, res) => {
    try {
      console.log(" Petición recibida en GET /api/facility/equipment");

      const [rows]: any = await pool.query(`
        SELECT 
          ID_Equipo AS id_equipo, 
          Nombre AS nombre, 
          Categoria AS categoria, 
          Condicion AS condicion, 
          Ultimo_Mantenimineto AS ultimo_mantenimineto, 
          Ubicacion AS ubicacion 
        FROM equipamineto
      `);

      const fixedEquipment = rows.map((eq: any) => {
        const ubicacionRaw = eq.ubicacion;
        const tieneFechaEnUbicacion =
          ubicacionRaw && String(ubicacionRaw).includes("-");

        let zonaReal = ubicacionRaw || "Zona Común";
        let fechaReal = eq.ultimo_mantenimineto;

        if (tieneFechaEnUbicacion) {
          fechaReal = ubicacionRaw;
          const catLower = (eq.categoria || "").toLowerCase();
          if (catLower.includes("libre")) zonaReal = "Sector Pesos Libres";
          else if (catLower.includes("cardio"))
            zonaReal = "Cuadrante de Cardio";
          else if (catLower.includes("recupera"))
            zonaReal = "Módulo de Sanación";
          else if (catLower.includes("ia") || catLower.includes("mística"))
            zonaReal = "Cámara de Simulación";
          else zonaReal = "Área Operativa Central";
        }

        return {
          id_equipo: eq.id_equipo ? Number(eq.id_equipo) : 0,
          nombre: eq.nombre || "Dispositivo no identificado",
          categoria: eq.categoria || "General",
          condicion: eq.condicion || "Operativo",
          ultimo_mantenimineto: fechaReal || "No registrado",
          ubicacion: zonaReal,
        };
      });

      res.json(fixedEquipment);
    } catch (error: any) {
      console.error(" Error en GET /api/facility/equipment:", error);
      res.status(500).json({
        error: "Error al mapear infraestructura",
        detalle: error.message,
      });
    }
  });

  app.get("/api/facility/usage", async (req, res) => {
    try {
      console.log(" Petición recibida en GET /api/facility/usage");

      // Estandarizamos todas las columnas a minúsculas con AS
      const [rows]: any = await pool.query(`
        SELECT 
          ID_Uso AS id_uso, 
          ID_Equipo AS id_equipo, 
          ID_Heroe AS id_heroe, 
          DATE_FORMAT(Fecha, '%Y-%m-%d %H:%i:%s') AS fecha, 
          Duracion_Min AS duracion_min, 
          Estado_Ini AS estado_ini, 
          Estado_Final AS estado_final, 
          Limpio AS limpio, 
          Notas_Adicionales AS notas_adicionales 
        FROM uso_equipamiento
        ORDER BY Fecha DESC
      `);

      res.json(rows);
    } catch (error: any) {
      console.error("❌ Error en GET /api/facility/usage:", error);
      res.status(500).json({
        error: "Error al consultar bitácora",
        detalle: error.message,
      });
    }
  });

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor activo y conectado en http://localhost:${PORT}`);
  });
}

startServer().catch((err) => console.error("❌ Error de arranque:", err));
