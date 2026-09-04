export function calculateSkillMatch(candidateSkills, jobSkills) {
  if (!jobSkills || jobSkills.length === 0) return 0;

  const normalized = candidateSkills.map(s => s.trim().toLowerCase());
  const matched = jobSkills.filter(skill =>
    normalized.includes(skill.trim().toLowerCase())
  );

  return Math.round((matched.length / jobSkills.length) * 100);
}

export function matchLabel(percent) {
  if (percent >= 80) return "Excellent Match";
  if (percent >= 60) return "Good Match";
  if (percent >= 40) return "Partial Match";
  return "Low Match";
}
