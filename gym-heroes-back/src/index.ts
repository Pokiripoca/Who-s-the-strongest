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
      SELECT h.*, 
             JSON_OBJECT(
               'peso', s.peso, 
               'pecho', s.pecho, 
               'cintura', s.cintura, 
               'grasa_pct', s.grasa_pct
             ) AS stats
      FROM heroes h
      LEFT JOIN stats_heroes s ON h.id_p = s.id_hero;
    `;

    const [rows] = await pool.query(queryText);
    res.json(rows);
  } catch (error) {
    console.error("Error en MySQL:", error);
    res.status(500).json({ error: "Error interno del servidor en el Back" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SERVIDOR MYSQL OPERATIVO EN: http://localhost:${PORT}`);
});
