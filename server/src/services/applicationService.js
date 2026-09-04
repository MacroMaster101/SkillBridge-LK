import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/errors.js';
import { assertJobOwnership, assertApplicationOwnership } from '../utils/employerAuth.js';
import { calculateSkillMatch } from '../utils/skillMatch.js';
import { getJobSkills } from './jobService.js';

export async function getJobApplications(jobId, ownerId) {
  await assertJobOwnership(jobId, ownerId);

  const jobSkills = await getJobSkills(jobId);

  const { data: applications, error } = await supabase
    .from('applications')
    .select(`
      id,
      status,
      applied_at,
      candidate_id,
      candidate_profiles (
        user_type,
        education_level,
        field_of_study,
        profiles ( full_name ),
        candidate_skills ( skills ( name ) )
      )
    `)
    .eq('job_id', jobId)
    .order('applied_at', { ascending: false });

  if (error) {
    throw new AppError(500, error.message);
  }

  return (applications || []).map((app) => {
    const profile = app.candidate_profiles;
    const candidateSkillNames = (profile?.candidate_skills || [])
      .map((entry) => entry.skills?.name)
      .filter(Boolean);

    const education = [profile?.education_level, profile?.field_of_study]
      .filter(Boolean)
      .join(' — ');

    return {
      id: app.id,
      name: profile?.profiles?.full_name || 'Unknown',
      userType: profile?.user_type || '',
      education: education || '',
      skills: candidateSkillNames,
      matchPercentage: calculateSkillMatch(candidateSkillNames, jobSkills),
      status: app.status,
      appliedAt: app.applied_at,
    };
  });
}

export async function updateApplicationStatus(applicationId, ownerId, status) {
  await assertApplicationOwnership(applicationId, ownerId);

  const { data, error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', applicationId)
    .select('id, job_id, candidate_id, status, message, applied_at')
    .single();

  if (error) {
    throw new AppError(500, error.message);
  }

  return {
    id: data.id,
    jobId: data.job_id,
    candidateId: data.candidate_id,
    status: data.status,
    message: data.message,
    appliedAt: data.applied_at,
  };
}
