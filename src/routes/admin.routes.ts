import { Router } from "express";
import { protect } from "../middleware/auth";
import { getStats, getPendingApplications, reviewApplication } from "../controller/admin.controller";

const router = Router();

// (Later we’ll add admin-only middleware)
router.get("/stats", protect, getStats);
router.get("/applications/pending", protect, getPendingApplications);
router.put("/applications/:id", protect, reviewApplication);

export default router;
