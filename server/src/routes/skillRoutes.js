import { Router } from 'express';
import { listSkills } from '../services/skillService.js';

const router = Router();

// Public: the frontend uses this to render the skill picker
router.get('/', async (_req, res) => {
  try {
    const skills = await listSkills();
    res.json(skills);
  } catch (e) {
    res.status(500).json({ message: 'Unable to load skills.' });
  }
});

export default router;
