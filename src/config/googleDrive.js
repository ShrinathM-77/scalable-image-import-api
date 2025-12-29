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

  // 🔹 Extract folder ID from Google Drive URL
  const match = folderUrl.match(/folders\/([a-zA-Z0-9_-]+)/);

  if (!match) {
    return res.status(400).json({
      status: "ERROR",
      message: "Invalid Google Drive folder URL",
    });
  }

  const folderId = match[1];

  try {
    // 🔹 Save import job in DB
    const result = await pool.query(
      "INSERT INTO imports (filename, status) VALUES ($1, $2) RETURNING *",
      [folderId, "pending"]
    );

    res.status(201).json({
      status: "OK",
      message: "Google Drive import job created 🚀",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({
      status: "ERROR",
      message: "Failed to create import job",
    });
  }
});
