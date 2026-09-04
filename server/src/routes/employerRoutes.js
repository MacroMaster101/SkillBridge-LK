import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { employerSchema } from '../validators/schemas.js';
import * as employerController from '../controllers/employerController.js';

const router = Router();

router.post('/', authenticate, requireRole('employer'), validate(employerSchema), employerController.createEmployer);
router.put('/me', authenticate, requireRole('employer'), validate(employerSchema), employerController.updateEmployer);
router.get('/me', authenticate, requireRole('employer'), employerController.getMe);

export default router;
