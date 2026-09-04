import { updateProfileSchema } from "../validators/candidate.js";
import * as service from "../services/candidateService.js";

export async function getMe(req, res) {
  try {
    const profile = await service.getCandidateProfile(req.user.id);
    res.json(profile);
  } catch (e) {
    res.status(500).json({ message: "Unable to load profile." });
  }
}

export async function updateMe(req, res) {
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }
  try {
    const profile = await service.upsertCandidateProfile(req.user.id, parsed.data);
    res.json(profile);
  } catch (e) {
    res.status(500).json({ message: "Unable to save profile." });
  }
}