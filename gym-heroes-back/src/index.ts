import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Función para inicializar el servidor después de conectar la base de datos de forma dinámica
async function startServer() {
  // Truco maestro definitivo: Carga la DB dinámicamente evitando el chequeo de extensiones de TS
  const { pool } = await import("./db/index.ts");
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
        LEFT JOIN series_origin s ON h.ID_Serie = s.ID_Serie
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
    } catch (error) {
      console.error("❌ Error en GET /api/heroes:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // =========================================================================
  // 2. ENDPOINT: NUTRICIÓN
  // =========================================================================
  app.get("/api/nutrition/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [rows]: any = await pool.query(
        `
        SELECT 
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
        JOIN cat_planes_nutricion p ON add_d.ID_Plan = p.ID_Plan
        JOIN cat_alimentos a ON add_d.ID_Alimento = a.ID_Alimento
        WHERE add_d.ID_P = ?
      `,
        [id],
      );

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Este héroe no tiene un plan asignado" });
      }

      res.json(rows[0]);
    } catch (error) {
      console.error("❌ Error en GET /api/nutrition:", error);
      res.status(500).json({ error: "Error al obtener nutrición" });
    }
  });

  // =========================================================================
  // 3. ENDPOINT: FACILITIES / EQUIPAMIENTO
  // =========================================================================
  app.get("/api/facilities", async (req, res) => {
    try {
      // Ajustado al nombre exacto de tu tabla con el error ortográfico 'equipamineto'
      const [rows]: any = await pool.query("SELECT * FROM equipamineto");
      res.json(rows);
    } catch (error) {
      console.error("❌ Error en GET /api/facilities:", error);
      res.status(500).json({ error: "Error al obtener equipamiento" });
    }
  });

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor ESM corriendo perfectamente en http://localhost:${PORT}`,
    );
  });
}

// Arrancamos el flujo
startServer().catch((err) =>
  console.error("❌ Error al iniciar el servidor:", err),
);
