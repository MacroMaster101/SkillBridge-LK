import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import * as jobController from '../controllers/jobController.js';
import * as applicationController from '../controllers/applicationController.js';

const router = Router();

router.get('/', requireAuth, jobController.getJobs);
router.post('/:jobId/apply', requireAuth, applicationController.applyToJob);

export default router;
