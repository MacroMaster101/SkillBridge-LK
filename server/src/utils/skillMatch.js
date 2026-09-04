/**
 * Calculate skill match percentage between candidate and job skills.
 * MVP formula: matchedJobSkills / totalJobSkills × 100
 */
export function calculateSkillMatch(candidateSkills, jobSkills) {
  if (!jobSkills?.length) return 0;

  const candidateSet = new Set(
    candidateSkills.map((s) => s.toLowerCase().trim()),
  );

  const matched = jobSkills.filter((skill) =>
    candidateSet.has(skill.toLowerCase().trim()),
  );

  return Math.round((matched.length / jobSkills.length) * 100);
}

export function getMatchedAndMissingSkills(candidateSkills, jobSkills) {
  const candidateSet = new Set(
    candidateSkills.map((s) => s.toLowerCase().trim()),
  );

  const matched = [];
  const missing = [];

  for (const skill of jobSkills) {
    if (candidateSet.has(skill.toLowerCase().trim())) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  }

  return { matched, missing };
}
