import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const poolConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(poolConfig);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("⚡ Conexión exitosa a la base de datos MySQL de DataGrip");
    connection.release();
  } catch (err) {
    console.error("❌ Error crítico al conectar a MySQL:", err);
  }
})();
