import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/errors.js';

export async function getPlatformStats() {
  const [
    { count: totalUsers, error: usersError },
    { count: candidates, error: candidatesError },
    { count: employerProfiles, error: employersError },
    { count: activeJobs, error: jobsError },
    { count: totalApplications, error: appsError },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'candidate'),
    supabase.from('employers').select('*', { count: 'exact', head: true }),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE'),
    supabase.from('applications').select('*', { count: 'exact', head: true }),
  ]);

  const firstError = usersError || candidatesError || employersError || jobsError || appsError;
  if (firstError) {
    throw new AppError(500, firstError.message);
  }

  return {
    totalUsers: totalUsers ?? 0,
    candidates: candidates ?? 0,
    employers: employerProfiles ?? 0,
    activeJobs: activeJobs ?? 0,
    totalApplications: totalApplications ?? 0,
  };
}
