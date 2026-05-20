// src/index.ts (CÓDIGO AJUSTADO PARA CORREGIR SERIES Y MEDIDAS)
import express from "express";
import cors from "cors";
import { pool } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/heroes", async (req, res) => {
  try {
    const queryText = `
      SELECT 
        h.ID_P as id_p,
        h.Nombre as nombre,
        h.Rol_Ocupacion as alias,
        h.Imagen_URL as imagen_url,
        h.Rango_Poder as rango,
        h.ID_Serie as id_serie,
        s.Titulo as serie_titulo,
        s.Color_Hex as color_hex,
        e.Nombre_Estatus as estatus_salud,
        e.Permite_Entrenar as permite_entrenar,
        b.Nombre_Tipo as tipo_cuerpo,
        f.Nombre_Faccion as faccion,
        m.Peso_kg as peso,
        m.Pecho_cm as pecho,
        m.Cintura_cm as cintura,
        m.Grasa_Pct as grasa_pct
      FROM Heroes h
      LEFT JOIN Series_origen s ON h.ID_Serie = s.ID_Serie
      LEFT JOIN cat_estatus_salud e ON h.ID_Estatus = e.ID_Estatus
      LEFT JOIN cat_tipos_cuerpo b ON h.ID_Biotipo = b.ID_Tipo
      LEFT JOIN cat_facciones f ON h.ID_Faccion = f.ID_Faccion
      LEFT JOIN Medidas_Fisicas m ON h.ID_P = m.ID_P;
    `;

    const [rows]: any = await pool.query(queryText);

    const formattedRows = rows.map((hero: any) => {
      // Limpiamos el porcentaje de grasa si viene como texto (ej: "12%")
      let grasaNum = 0;
      if (hero.grasa_pct) {
        grasaNum = Number(String(hero.grasa_pct).replace("%", "").trim());
      }

      return {
        id_p: Number(hero.id_p),
        nombre: hero.nombre || "Héroe sin Nombre",
        alias: hero.alias || "Sin Ocupación", // Esto pintará "Comandante Pirata" abajo del nombre
        imagen_url:
          hero.imagen_url ||
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300",
        id_serie: hero.id_serie ? Number(hero.id_serie) : 1, // Si está null, le ponemos 1 por defecto para que no desaparezca de los universos
        serie_titulo: hero.serie_titulo || "Universo Desconocido",
        color_hex: hero.color_hex || "#06b6d4",
        estatus_salud: hero.estatus_salud || "Óptimo",
        permite_entrenar: hero.permite_entrenar || "Si",
        tipo_cuerpo: hero.tipo_cuerpo || "No definido",
        faccion: hero.faccion || "Independiente",
        rango: hero.rango || "C",
        stats: {
          peso: hero.peso ? Number(hero.peso) : 0,
          pecho: hero.pecho ? Number(hero.pecho) : 0,
          cintura: hero.cintura ? Number(hero.cintura) : 0,
          grasa_pct: grasaNum,
        },
      };
    });

    res.json(formattedRows);
  } catch (error) {
    console.error("❌ Error en consulta MySQL:", error);
    res.status(500).json({ error: "Error interno del servidor en el Back" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SERVIDOR MYSQL OPERATIVO EN: http://localhost:${PORT}`);
});
