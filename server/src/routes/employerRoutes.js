import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import * as employerController from '../controllers/employerController.js';

const router = Router();

router.post('/', authenticate, requireRole('employer'), employerController.createEmployer);
router.get('/me', authenticate, requireRole('employer'), employerController.getMe);

export default router;
