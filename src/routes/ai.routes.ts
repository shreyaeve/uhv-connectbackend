import { Router } from "express";
import { protect } from "../middleware/auth";

const router = Router();

// Dummy AI match endpoint
router.get("/match/:projectId", protect, async (req, res) => {
  res.json({
    score: Math.floor(Math.random() * 30) + 70,
    reasoning: "Volunteer skills align well with project requirements"
  });
});

export default router;
