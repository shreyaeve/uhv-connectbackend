import { Router } from "express";
import { getFeed, createPost } from "../controller/feed.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", protect, getFeed);
router.post("/post", protect, createPost);

export default router;
