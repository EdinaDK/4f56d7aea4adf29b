// Import necessary modules
import pg from "pg";
import fs from "fs";
import { connectPool } from "./connectPool.js";
// Define a PostgreSQL connection pool
const pool = connectPool;
// Read the migration SQL script from a file
const migrationScript = fs.readFileSync("./migration.sql", "utf8");

// Execute the migration script using the PostgreSQL connection pool
export const migrateDB = async () => {
  pool
    .query(migrationScript) //читает скрипт и отправляет запрос к датабазе
    .then(() => console.log("Migration successful"))
    .catch((error) => console.error("Migration error:", error.message))
    .finally(() => pool.end());
};
migrateDB();
