import { applySchema } from '../validators/schemas.js';
import * as applicationService from '../services/applicationService.js';

export async function applyToJob(req, res, next) {
  const parsed = applySchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  try {
    const application = await applicationService.applyToJob(
      req.params.jobId,
      req.user.id,
      parsed.data.message,
    );
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
}

export async function getMyApplications(req, res, next) {
  try {
    const applications = await applicationService.getMyApplications(req.user.id);
    res.json(applications);
  } catch (err) {
    next(err);
  }
}

export async function getJobApplications(req, res, next) {
  try {
    const applicants = await applicationService.getJobApplications(
      req.params.jobId,
      req.user.id,
    );
    res.json(applicants);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const application = await applicationService.updateApplicationStatus(
      req.params.applicationId,
      req.user.id,
      req.body.status,
    );
    res.json(application);
  } catch (err) {
    next(err);
  }
}
