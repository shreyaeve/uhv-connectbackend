import { Router } from "express";
import { getProjects, getProject, createProject } from "../controller/project.controller";
import { protect } from "../middleware/auth";

const router = Router();
router.get("/", protect, getProjects);
router.get("/:id", protect, getProject);
router.post("/", protect, createProject);
export default router;
