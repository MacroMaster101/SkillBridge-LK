import * as applicationService from '../services/applicationService.js';

export async function applyToJob(req, res, next) {
  try {
    res.status(501).json({
      error: 'Not implemented',
      message: `POST /api/jobs/${req.params.jobId}/apply — submit application`,
    });
  } catch (err) {
    next(err);
  }
}

export async function getMyApplications(_req, res, next) {
  try {
    res.status(501).json({
      error: 'Not implemented',
      message: 'GET /api/applications/me — fetch candidate applications',
    });
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
