import pool from "../config/db.js";

export const createImport = async (filename, status) => {
  const result = await pool.query(
    "INSERT INTO imports (filename, status) VALUES ($1, $2) RETURNING *",
    [filename, status]
  );

  return result.rows[0];
};
