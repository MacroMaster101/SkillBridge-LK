// TODO: Implement employer profile CRUD with Supabase

export async function createEmployer(_req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: 'POST /api/employers — create employer business profile',
  });
}

export async function getMe(_req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: 'GET /api/employers/me — fetch employer profile and stats',
  });
}
