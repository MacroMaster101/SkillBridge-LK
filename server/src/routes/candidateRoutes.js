import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import * as candidateController from '../controllers/candidateController.js';

const router = Router();

router.get('/me', authenticate, requireRole('candidate'), candidateController.getMe);
router.put('/me', authenticate, requireRole('candidate'), candidateController.updateMe);
router.put('/me/skills', authenticate, requireRole('candidate'), candidateController.updateSkills);
router.get('/me/recommendations', authenticate, requireRole('candidate'), candidateController.getRecommendations);

export default router;
