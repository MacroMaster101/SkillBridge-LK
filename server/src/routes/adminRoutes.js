import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.js';
import * as adminController from '../controllers/adminController.js';

const router = Router();

router.get('/stats', authenticate, requireRole('admin'), adminController.getStats);

export default router;
