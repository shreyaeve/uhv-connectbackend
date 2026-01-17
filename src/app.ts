import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import feedRoutes from "./routes/feed.routes";
import volunteerRoutes from "./routes/volunteer.routes";
import adminRoutes from "./routes/admin.routes";
import aiRoutes from "./routes/ai.routes";

const app = express();

// middlewares FIRST
const allowedOrigins = [
  'https://uhv-connectbackend-leek8137z-shreyas-projects-f6f2a2b.vercel.app',
  'http://localhost:3000', // for development
  process.env.FRONTEND_URL
].filter((origin): origin is string => Boolean(origin));

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

// health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

export default app;
