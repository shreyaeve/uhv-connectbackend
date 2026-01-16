console.log("✅ volunteer routes loaded");
import { Router } from "express";
import { protect } from "../middleware/auth";
import { getMyProfile, updateMyProfile, searchUsers, getUserById } from "../controller/volunteer.controller";

const router = Router();


router.get("/profile", protect, getMyProfile);
router.put("/profile", protect, updateMyProfile);

router.get("/search", searchUsers);
router.get("/:id", getUserById);

export default router;
