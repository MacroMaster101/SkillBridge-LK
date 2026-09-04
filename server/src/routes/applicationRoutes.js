import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import * as applicationController from '../controllers/applicationController.js';

const router = Router();

router.get('/me', authenticate, requireRole('candidate'), applicationController.getMyApplications);
router.patch('/:applicationId/status', authenticate, requireRole('employer'), applicationController.updateStatus);

export default router;
