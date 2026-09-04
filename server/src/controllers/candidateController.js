// TODO: Implement candidate profile retrieval from Supabase

export async function getMe(req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: 'GET /api/candidates/me — fetch candidate profile with skills',
    userId: req.user.id,
  });
}

export async function updateMe(req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: 'PUT /api/candidates/me — update candidate onboarding profile',
  });
}

export async function updateSkills(req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: 'PUT /api/candidates/me/skills — update candidate skills',
  });
}

export async function getRecommendations(req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: 'GET /api/candidates/me/recommendations — return jobs sorted by skill match',
  });
}
