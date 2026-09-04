import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import * as applicationController from '../controllers/applicationController.js';

const router = Router();

// Feature 5 — Candidate application dashboard
router.get('/me', requireAuth, applicationController.getMyApplications);

// Employer-side status update belongs here too (teammate's controller):
// router.patch('/:applicationId/status', authenticate, requireRole('employer'), applicationController.updateStatus);

export default router;
