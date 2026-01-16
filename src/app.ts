import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import feedRoutes from "./routes/feed.routes";
import volunteerRoutes from "./routes/volunteer.routes";

const app = express();

// middlewares FIRST
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/volunteers", volunteerRoutes);

// health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

export default app;
