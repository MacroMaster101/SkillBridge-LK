import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { applicationStatusSchema } from '../validators/schemas.js';
import * as applicationController from '../controllers/applicationController.js';

const router = Router();

router.get('/me', authenticate, requireRole('candidate'), applicationController.getMyApplications);
router.patch('/:applicationId/status', authenticate, requireRole('employer'), validate(applicationStatusSchema), applicationController.updateStatus);

export default router;
