// TODO: Implement application flow with Supabase

export async function applyToJob(req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: `POST /api/jobs/${req.params.jobId}/apply — submit application`,
  });
}

export async function getMyApplications(_req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: 'GET /api/applications/me — fetch candidate applications',
  });
}

export async function getJobApplications(req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: `GET /api/jobs/${req.params.jobId}/applications — fetch applicants for job`,
  });
}

export async function updateStatus(req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: `PATCH /api/applications/${req.params.applicationId}/status — update application status`,
  });
}
