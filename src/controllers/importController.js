import pool from "../config/db.js";
import redis from "../config/redis.js";

/**
 * POST /api/import/google-drive
 */
export const importFromGoogleDrive = async (req, res) => {
  const { folderUrl } = req.body;

  if (!folderUrl) {
    return res.status(400).json({
      status: "ERROR",
      message: "folderUrl is required",
    });
  }

  try {
    // 1️⃣ Insert pending import
    const result = await pool.query(
      "INSERT INTO imports (status) VALUES ($1) RETURNING *",
      ["pending"]
    );

    const job = {
      importId: result.rows[0].id,
      folderUrl,
    };

    // 2️⃣ Push job to Redis queue
    await redis.lpush("import_queue", JSON.stringify(job));

    res.status(202).json({
      status: "OK",
      message: "Google Drive import queued 🚀",
      importId: result.rows[0].id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ERROR",
      message: "Failed to queue import",
    });
  }
};
