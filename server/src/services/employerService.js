import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/errors.js';
import { getEmployerByOwnerId } from '../utils/employerAuth.js';

function toEmployerResponse(row) {
  return {
    id: row.id,
    companyName: row.company_name,
    businessCategory: row.business_category,
    description: row.description,
    location: row.location,
    contactEmail: row.contact_email,
    phone: row.phone,
  };
}

export async function createEmployerProfile(ownerId, body) {
  const existing = await getEmployerByOwnerId(ownerId);

  if (existing) {
    throw new AppError(409, 'Employer profile already exists');
  }

  const { data, error } = await supabase
    .from('employers')
    .insert({
      owner_id: ownerId,
      company_name: body.companyName,
      business_category: body.businessCategory || null,
      description: body.description || null,
      location: body.location || null,
      contact_email: body.contactEmail || null,
      phone: body.phone || null,
    })
    .select('*')
    .single();

  if (error) {
    throw new AppError(500, error.message);
  }

  return toEmployerResponse(data);
}

export async function getEmployerDashboard(ownerId) {
  const employer = await getEmployerByOwnerId(ownerId);

  if (!employer) {
    throw new AppError(404, 'Employer profile not found');
  }

  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .select('id, title, status')
    .eq('employer_id', employer.id);

  if (jobsError) {
    throw new AppError(500, jobsError.message);
  }

  const activeJobs = jobs.filter((job) => job.status === 'ACTIVE');
  const jobIds = jobs.map((job) => job.id);

  let totalApplications = 0;
  const applicantCounts = {};

  if (jobIds.length > 0) {
    const { data: applications, error: appsError } = await supabase
      .from('applications')
      .select('id, job_id')
      .in('job_id', jobIds);

    if (appsError) {
      throw new AppError(500, appsError.message);
    }

    totalApplications = applications.length;

    for (const app of applications) {
      applicantCounts[app.job_id] = (applicantCounts[app.job_id] || 0) + 1;
    }
  }

  return {
    ...toEmployerResponse(employer),
    activeJobsCount: activeJobs.length,
    totalApplications,
    jobs: jobs.map((job) => ({
      id: job.id,
      title: job.title,
      status: job.status,
      applicantCount: applicantCounts[job.id] || 0,
    })),
  };
}
