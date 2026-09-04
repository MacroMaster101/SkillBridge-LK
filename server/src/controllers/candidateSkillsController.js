import { updateSkillsSchema } from '../validators/candidate.js';
import { setCandidateSkills } from '../services/candidateService.js';
import { resolveSkillIds } from '../services/skillService.js';

export async function updateSkills(req, res) {
  const parsed = updateSkillsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }
  try {
    const skillIds = parsed.data.skillIds
      ?? await resolveSkillIds(parsed.data.skillNames);
    const profile = await setCandidateSkills(req.user.id, skillIds);
    res.json(profile);
  } catch (e) {
    res.status(500).json({ message: 'Unable to save skills.' });
  }
}
