const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.getAllImages = async () => {
  const res = await pool.query('SELECT * FROM images ORDER BY created_at DESC');
  return res.rows;
};

exports.saveImage = async (img) => {
  const { name, google_drive_id, size, mime_type, storage_path, source } = img;
  const res = await pool.query(
    `INSERT INTO images (name, google_drive_id, size, mime_type, storage_path, source) 
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, google_drive_id, size, mime_type, storage_path, source || 'google_drive']
  );
  return res.rows[0];
};
