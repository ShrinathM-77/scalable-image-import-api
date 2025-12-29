import express from "express";
import pool from "../config/db.js";
import redis from "../config/redis.js";

const router = express.Router();

/**
 * GET /api/import
 */
router.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Import route is working 🚀",
  });
});

/**
 * 📄 GET /api/import/list
 * Returns all import records
 */
router.get("/list", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, source, source_url, status, created_at FROM imports ORDER BY id DESC"
    );

    res.json({
      status: "OK",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ERROR",
      message: "Failed to fetch imports",
    });
  }
});


/**
 * 🚀 POST /api/import/google-drive
 */
router.post("/google-drive", async (req, res) => {
  const { folderUrl } = req.body;

  if (!folderUrl) {
    return res.status(400).json({
      status: "ERROR",
      message: "folderUrl is required",
    });
  }

  try {
    // 1️⃣ Save import record
    const result = await pool.query(
      "INSERT INTO imports (source, source_url, status) VALUES ($1, $2, $3) RETURNING *",
      ["google_drive", folderUrl, "pending"]
    );

    const importJob = result.rows[0];

    // 2️⃣ Push job to Redis queue
  console.log("➡️ About to push job to Redis...");

const pushResult = await redis.lpush(
  "import_queue",
  JSON.stringify({
    importId: importJob.id,
    folderUrl,
  })
);

console.log("✅ Job pushed to Redis. Queue length:", pushResult);


    // 3️⃣ Respond immediately
    res.status(202).json({
      status: "OK",
      message: "Google Drive import queued 🚀",
      importId: importJob.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "ERROR",
      message: "Failed to create import job",
    });
  }
});

export default router;
