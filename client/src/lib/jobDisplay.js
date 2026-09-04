const COLORS = ['lavender', 'peach', 'lime', 'blue', 'pink', 'sand'];

export function companyInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toLowerCase();
  return (parts[0]?.slice(0, 2) || '?').toLowerCase();
}

export function companyColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash + name.charCodeAt(i)) % COLORS.length;
  return COLORS[hash];
}

export function formatPostedDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-LK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function enrichJob(job) {
  const company = job.company || 'Unknown';
  return {
    ...job,
    company,
    initials: companyInitials(company),
    color: companyColor(company),
    skills: job.skills || [],
  };
}
