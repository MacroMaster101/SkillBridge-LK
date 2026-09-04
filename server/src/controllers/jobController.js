// TODO: Implement job CRUD with Supabase

export async function getJobs(_req, res) {
  res.json([
    {
      id: 1,
      title: 'Frontend Development Intern',
      company: 'Pixel Lanka',
      category: 'Software / IT',
      jobType: 'Internship',
      location: 'Colombo',
      workMode: 'Hybrid',
      skills: ['React', 'JavaScript', 'CSS', 'Git'],
    },
  ]);
}

export async function getJobById(req, res) {
  res.json({
    id: req.params.id,
    title: 'Frontend Development Intern',
    company: 'Pixel Lanka',
    category: 'Software / IT',
    jobType: 'Internship',
    location: 'Colombo',
    workMode: 'Hybrid',
    description: 'Join our team to build modern web applications using React.',
    skills: ['React', 'JavaScript', 'CSS', 'Git'],
  });
}

export async function createJob(_req, res) {
  res.status(501).json({
    error: 'Not implemented',
    message: 'POST /api/jobs — create a new job posting',
  });
}
