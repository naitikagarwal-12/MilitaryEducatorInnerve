import mysql from "mysql2/promise";

// 🔍 DEBUG (temporary)
console.log("DB CONFIG:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

export const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Naitik@12",
  database: process.env.DB_NAME || "auth_db",
});
