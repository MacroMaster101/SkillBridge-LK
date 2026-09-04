import { Router } from 'express';
import { requireAuth, authenticate, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { applicationStatusSchema } from '../validators/schemas.js';
import * as applicationController from '../controllers/applicationController.js';

const router = Router();

// Feature 5 — Candidate application dashboard
router.get('/me', requireAuth, applicationController.getMyApplications);

// Employer — update an application's status
router.patch(
  '/:applicationId/status',
  authenticate,
  requireRole('employer'),
  validate(applicationStatusSchema),
  applicationController.updateStatus,
);

export default router;
