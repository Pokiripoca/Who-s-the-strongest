import express from "express";
import cors from "cors";
import { pool } from "./config/db.js"; // Ajusta la extensión según tu config (.ts o .js)

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/heroes", async (req, res) => {
  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM vista_api_heroes_completa",
    );
    console.log("=== DATOS CRUDOS DE LA VISTA EN MYSQL ===", rows);
    const formattedRows = rows.map((hero: any) => {
      // 1. Limpieza de Grasa Corporal (Quitamos el '%' si viene de la DB)
      let grasaNum = 0;
      if (hero.grasa_pct) {
        grasaNum = Number(String(hero.grasa_pct).replace("%", "").trim());
      }

      // 2. Imagen de Respaldo
      let img = hero.imagen_url;
      if (img && img.startsWith("assets/")) {
        img = `http://localhost:5173/${hero.imagen_url}`;
      }

      // 3. RETORNO SEGURO: Mapeamos asegurando que si es NULL en la DB, use un número válido
      return {
        id_p: Number(hero.id_p),
        nombre: hero.nombre,
        alias: hero.alias || "Héroe en Entrenamiento",
        imagen_url:
          img ||
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300",
        id_serie: Number(hero.id_serie),
        serie_titulo: hero.serie_titulo,
        color_hex: hero.color_hex,
        estatus_salud: hero.estatus_salud,
        permite_entrenar: hero.permite_entrenar,
        tipo_cuerpo: hero.tipo_cuerpo,
        faccion: hero.faccion,
        rango: hero.rango || "B",

        // CORRECCIÓN DIRECTA AQUÍ:
        // Tu HeroProfile.tsx busca adentro de hero.stats.peso, hero.stats.pecho...
        stats: {
          peso:
            hero.peso !== undefined && hero.peso !== null
              ? Number(hero.peso)
              : 0,
          pecho:
            hero.pecho !== undefined && hero.pecho !== null
              ? Number(hero.pecho)
              : 0,
          cintura:
            hero.cintura !== undefined && hero.cintura !== null
              ? Number(hero.cintura)
              : 0,
          grasa_pct: grasaNum || 0,
        },
      };
    });

    res.json(formattedRows);
  } catch (error) {
    console.error("❌ Error general en la API:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend listo en http://localhost:${PORT}`);
});
