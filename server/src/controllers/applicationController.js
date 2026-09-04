import { applySchema } from "../validators/schemas.js";
import * as service from "../services/applicationService.js";

export async function applyToJob(req, res) {
  const parsed = applySchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }
  try {
    const result = await service.applyToJob(
      req.user.id, Number(req.params.jobId), parsed.data.message
    );
    res.status(201).json(result);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message || "Application failed." });
  }
}

export async function getMyApplications(req, res) {
  try {
    const apps = await service.getMyApplications(req.user.id);
    res.json(apps);
  } catch (e) {
    res.status(500).json({ message: "Unable to load applications." });
  }
}