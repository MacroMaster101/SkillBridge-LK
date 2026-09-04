import { Router } from 'express';
import candidateRoutes from './candidateRoutes.js';
import jobRoutes from './jobRoutes.js';
import applicationRoutes from './applicationRoutes.js';
import employerRoutes from './employerRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router();

router.use('/candidates', candidateRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/employers', employerRoutes);
router.use('/admin', adminRoutes);

export default router;
