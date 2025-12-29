import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ ADD THIS

import importRoutes from "./routes/importRoutes.js";

dotenv.config();

const app = express();

/* =========================
   Middleware
========================= */
app.use(cors());            // ✅ ADD THIS
app.use(express.json());

/* =========================
   Health Check
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "api-service",
    uptime: process.uptime(),
  });
});

/* =========================
   Routes
========================= */
app.use("/api/import", importRoutes);
app.get("/", (req, res) => {
  res.send("🚀 Scalable Image Import API is running");
});


export default app;

