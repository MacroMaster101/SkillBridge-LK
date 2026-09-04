import { supabase } from '../config/supabase.js';
import { AppError } from './errors.js';

export async function getEmployerByOwnerId(ownerId) {
  const { data, error } = await supabase
    .from('employers')
    .select('*')
    .eq('owner_id', ownerId)
    .maybeSingle();

  if (error) {
    throw new AppError(500, error.message);
  }

  return data;
}

export async function assertJobOwnership(jobId, ownerId) {
  const employer = await getEmployerByOwnerId(ownerId);

  if (!employer) {
    throw new AppError(403, 'Employer profile not found');
  }

  const { data: job, error } = await supabase
    .from('jobs')
    .select('id, employer_id')
    .eq('id', jobId)
    .maybeSingle();

  if (error) {
    throw new AppError(500, error.message);
  }

  if (!job) {
    throw new AppError(404, 'Job not found');
  }

  if (Number(job.employer_id) !== Number(employer.id)) {
    throw new AppError(403, 'You do not have access to this resource');
  }

  return { job, employer };
}

export async function assertApplicationOwnership(applicationId, ownerId) {
  const { data: application, error } = await supabase
    .from('applications')
    .select('id, job_id, status, candidate_id, message, applied_at')
    .eq('id', applicationId)
    .maybeSingle();

  if (error) {
    throw new AppError(500, error.message);
  }

  if (!application) {
    throw new AppError(404, 'Application not found');
  }

  await assertJobOwnership(application.job_id, ownerId);

  return application;
}
