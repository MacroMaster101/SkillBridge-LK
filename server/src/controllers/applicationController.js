import { applySchema } from '../validators/schemas.js';
import * as service from '../services/applicationService.js';

// Candidate — apply to a job
export async function applyToJob(req, res, next) {
  const parsed = applySchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  try {
    const application = await service.applyToJob(
      req.user.id,
      req.params.jobId,
      parsed.data.message,
    );
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
}

// Candidate — application dashboard
export async function getMyApplications(req, res, next) {
  try {
    const applications = await service.getMyApplications(req.user.id);
    res.json(applications);
  } catch (err) {
    next(err);
  }
}

// Employer — list applicants for one of their jobs
export async function getJobApplications(req, res, next) {
  try {
    const applicants = await service.getJobApplications(
      req.params.jobId,
      req.user.id,
    );
    res.json(applicants);
  } catch (err) {
    next(err);
  }
}

// Employer — update an application's status
export async function updateStatus(req, res, next) {
  try {
    const application = await service.updateApplicationStatus(
      req.params.applicationId,
      req.user.id,
      req.body.status,
    );
    res.json(application);
  } catch (err) {
    next(err);
  }
}
