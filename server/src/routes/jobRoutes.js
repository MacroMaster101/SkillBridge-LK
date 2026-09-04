import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { jobSchema } from '../validators/schemas.js';
import * as jobController from '../controllers/jobController.js';
import * as applicationController from '../controllers/applicationController.js';

const router = Router();

// Browsing is public — the landing and jobs pages rely on it without a session.
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

router.post('/', authenticate, requireRole('employer'), validate(jobSchema), jobController.createJob);
router.post('/:jobId/apply', authenticate, requireRole('candidate'), applicationController.applyToJob);
router.get('/:jobId/applications', authenticate, requireRole('employer'), applicationController.getJobApplications);

export default router;
