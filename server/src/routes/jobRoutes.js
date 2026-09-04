import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { jobSchema } from '../validators/schemas.js';
import * as jobController from '../controllers/jobController.js';
import * as applicationController from '../controllers/applicationController.js';

const router = Router();

// Public job browsing
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Employer — create a job
router.post('/', authenticate, requireRole('employer'), validate(jobSchema), jobController.createJob);

// Feature 4 — Candidate applies to a job
router.post('/:jobId/apply', authenticate, requireRole('candidate'), applicationController.applyToJob);

// Employer — view applicants for a job
router.get('/:jobId/applications', authenticate, requireRole('employer'), applicationController.getJobApplications);

export default router;
