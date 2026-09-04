import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getMe, updateMe } from "../controllers/candidateController.js";
import { updateSkills } from "../controllers/candidateSkillsController.js"; // Feature 2

const router = Router();
router.get("/me", requireAuth, getMe);
router.put("/me", requireAuth, updateMe);
router.put("/me/skills", requireAuth, updateSkills); // Feature 2
export default router;