import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  const { pool } = await import("./db/index.ts");

  // ==========================================
  // 1. ENDPOINT: CATÁLOGO DE HÉROES
  // ==========================================
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
          serie_titulo: hero.serie_titulo,
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
      console.error("❌ Error en GET /api/heroes:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", detalle: error.message });
    }
  });

  // ==========================================
  // 2. ENDPOINT: NUTRICIÓN GENERAL (Para el Dashboard Colectivo)
  // ==========================================
  app.get("/api/nutrition/all", async (req, res) => {
    try {
      const [rows]: any = await pool.query(`
        SELECT 
          add_d.ID_P AS id_p,
          p.Nombre_Plan AS plan_nombre,
          p.Objetivo_Fisico AS objetivo,
          p.Total_Calorias_Dia AS calorias,
          p.Ratio_Proteina AS ratio_proteina,
          p.Descripcion_Menu AS descripcion,
          a.Nombre AS alimento_nombre,
          a.Categoria AS alimento_categoria,
          add_d.Porcion_Gramos AS porcion,
          add_d.Frecuencia_Dia AS frecuencia
        FROM asignacion_dietas_detalle add_d
        INNER JOIN cat_planes_nutricion p ON add_d.ID_Plan = p.ID_Plan
        INNER JOIN cat_alimentos a ON add_d.ID_Alimento = a.ID_Alimento
      `);
      res.json(rows);
    } catch (error: any) {
      console.error("❌ Error en GET /api/nutrition/all:", error);
      res
        .status(500)
        .json({ error: "Error en base de datos", detalle: error.message });
    }
  });

  // ==========================================
  // 3. ENDPOINT: DIAGNÓSTICO DE DIETAS POR ID
  // ==========================================
  app.get("/api/nutrition/:id", async (req, res) => {
    try {
      const [rows]: any = await pool.query(`
        SELECT 
          add_d.ID_P AS id_p,
          p.Nombre_Plan AS plan_nombre,
          p.Objetivo_Fisico AS objetivo,
          p.Total_Calorias_Dia AS calorias,
          p.Ratio_Proteina AS ratio_proteina,
          p.Descripcion_Menu AS descripcion,
          a.Nombre AS alimento_nombre,
          a.Categoria AS alimento_categoria,
          add_d.Porcion_Gramos AS porcion,
          add_d.Frecuencia_Dia AS frecuencia
        FROM asignacion_dietas_detalle add_d
        INNER JOIN cat_planes_nutricion p ON add_d.ID_Plan = p.ID_Plan
        INNER JOIN cat_alimentos a ON add_d.ID_Alimento = a.ID_Alimento
      `);
      res.json(rows);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error en diagnóstico", detalle: error.message });
    }
  });

  // ==========================================
  // 4. ENDPOINT: INFRAESTRUCTURA (Mapeado e Intercambio de Columnas)
  // ==========================================
  app.get("/api/facility/equipment", async (req, res) => {
    try {
      const [rows]: any = await pool.query(`
        SELECT 
          id_equipo,
          nombre,
          categoria,
          condicion,
          ultimo_mantenimineto,
          ubicacion
        FROM equipamineto
      `);

      const fixedEquipment = rows.map((eq: any) => {
        const tieneFechaEnUbicacion =
          eq.ubicacion && String(eq.ubicacion).includes("-");

        let zonaReal = eq.ubicacion;
        let fechaReal = eq.ultimo_mantenimineto;

        if (tieneFechaEnUbicacion) {
          fechaReal = eq.ubicacion;

          if (eq.categoria.toLowerCase().includes("libre"))
            zonaReal = "Sector Pesos Libres";
          else if (eq.categoria.toLowerCase().includes("cardio"))
            zonaReal = "Cuadrante de Cardio";
          else if (eq.categoria.toLowerCase().includes("recupera"))
            zonaReal = "Módulo de Sanación";
          else if (
            eq.categoria.toLowerCase().includes("ia") ||
            eq.categoria.toLowerCase().includes("mística")
          )
            zonaReal = "Cámara de Simulación";
          else zonaReal = "Área Operativa Central";
        }

        return {
          id_equipo: eq.id_equipo,
          nombre: eq.nombre,
          categoria: eq.categoria,
          condicion: eq.condicion || "Operativo",
          ultimo_mantenimineto: fechaReal || "No registrado",
          ubicacion: zonaReal,
        };
      });

      res.json(fixedEquipment);
    } catch (error: any) {
      console.error("❌ Error en GET /api/facility/equipment:", error);
      res.status(500).json({
        error: "Error al mapear infraestructura",
        detalle: error.message,
      });
    }
  });

  // ESCUCHA DEL SERVIDOR (Ubicado correctamente dentro de la función asíncrona)
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor activo y conectado en http://localhost:${PORT}`);
  });
}

// INICIALIZACIÓN FUERA DEL CUERPO DE LA FUNCIÓN
startServer().catch((err) => console.error("❌ Error de arranque:", err));
