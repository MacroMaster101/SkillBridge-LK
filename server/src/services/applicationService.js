
import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/errors.js';
import { assertJobOwnership, assertApplicationOwnership } from '../utils/employerAuth.js';
import { calculateSkillMatch, getMatchedAndMissingSkills } from '../utils/skillMatch.js';
import { getJobSkills } from './jobService.js';

function parseJobId(jobId) {
  const parsed = Number(jobId);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(400, 'Invalid job id.');
  }
  return parsed;
}

// Candidate applies to a job
export async function applyToJob(jobId, candidateId, message = '') {
  const numericJobId = parseJobId(jobId);

  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('id, status')
    .eq('id', numericJobId)
    .maybeSingle();

  if (jobError) {
    throw new AppError(500, jobError.message);
  }

  if (!job) {
    throw new AppError(404, 'Job not found.');
  }

  if (job.status !== 'ACTIVE') {
    throw new AppError(400, 'This job is no longer active.');
  }

  const { data: existing } = await supabase
    .from('applications')
    .select('id')
    .eq('job_id', numericJobId)
    .eq('candidate_id', candidateId)
    .maybeSingle();

  if (existing) {
    throw new AppError(409, 'You have already applied for this job.');
  }

  const { data, error } = await supabase
    .from('applications')
    .insert({
      job_id: numericJobId,
      candidate_id: candidateId,
      message: message ?? null,
      status: 'APPLIED',
    })
    .select('id, job_id, candidate_id, status, message, applied_at')
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new AppError(409, 'You have already applied for this job.');
    }
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

// Candidate application dashboard
export async function getMyApplications(candidateId) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      id,
      status,
      message,
      applied_at,
      jobs (
        id,
        title,
        category,
        job_type,
        location,
        work_mode,
        employers ( company_name ),
        job_skills ( skills ( name ) )
      )
    `)
    .eq('candidate_id', candidateId)
    .order('applied_at', { ascending: false });

  if (error) {
    throw new AppError(500, error.message);
  }

  const { data: candidateSkills } = await supabase
    .from('candidate_skills')
    .select('skills ( name )')
    .eq('user_id', candidateId);

  const candidateSkillNames = (candidateSkills || [])
    .map((entry) => entry.skills?.name)
    .filter(Boolean);

  return (data || []).map((app) => {
    const job = app.jobs;
    const jobSkillNames = (job?.job_skills || [])
      .map((entry) => entry.skills?.name)
      .filter(Boolean);

    return {
      id: app.id,
      status: app.status,
      appliedAt: app.applied_at,
      jobTitle: job?.title || 'Unknown role',
      company: job?.employers?.company_name || '',
      matchPercentage: calculateSkillMatch(candidateSkillNames, jobSkillNames),
      job: {
        id: job?.id,
        title: job?.title,
        company: job?.employers?.company_name ?? 'Unknown',
        category: job?.category,
        jobType: job?.job_type,
        location: job?.location,
        workMode: job?.work_mode,
      },
    };
  });

import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/errors.js";
import { assertJobOwnership, assertApplicationOwnership } from "../utils/employerAuth.js";
import { calculateSkillMatch } from "../utils/skillMatch.js";
import { getJobSkills } from "./jobService.js";

// Feature 4 — Candidate applies to a job
export async function applyToJob(candidateId, jobId, message) {
  const { data: job } = await supabase
    .from("jobs").select("id, status").eq("id", jobId).single();
  if (!job) throw { status: 404, message: "Job not found." };
  if (job.status !== "ACTIVE") throw { status: 400, message: "This job is no longer active." };

  const { error } = await supabase.from("applications").insert({
    job_id: jobId,
    candidate_id: candidateId,
    message: message ?? null,
    status: "APPLIED",
  });

  if (error) {
    // 23505 = unique_violation → already applied
    if (error.code === "23505") {
      throw { status: 409, message: "You have already applied for this job." };
    }
    throw { status: 500, message: "Application failed. Please try again." };
  }
  return { message: "Application submitted successfully." };
}

// Feature 5 — Candidate application dashboard
export async function getMyApplications(candidateId) {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      id, status, message, applied_at,
      jobs ( id, title, category, job_type, location, work_mode,
             employers ( company_name ) )
    `)
    .eq("candidate_id", candidateId)
    .order("applied_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data || []).map((a) => ({
    id: a.id,
    status: a.status,
    appliedAt: a.applied_at,
    job: {
      id: a.jobs?.id,
      title: a.jobs?.title,
      company: a.jobs?.employers?.company_name ?? "Unknown",
      category: a.jobs?.category,
      jobType: a.jobs?.job_type,
      location: a.jobs?.location,
      workMode: a.jobs?.work_mode,
    },
  }));

}

// Employer — list applicants for one of their jobs
export async function getJobApplications(jobId, ownerId) {
  const numericJobId = parseJobId(jobId);
  await assertJobOwnership(numericJobId, ownerId);

  const jobSkills = await getJobSkills(numericJobId);

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
    .eq('job_id', numericJobId)
    .order('applied_at', { ascending: false });

  if (error) {
    throw new AppError(500, error.message);
  }

  return (applications || []).map((app) => {
    const profile = app.candidate_profiles;
    const candidateSkillNames = (profile?.candidate_skills || [])
      .map((entry) => entry.skills?.name)
      .filter(Boolean);

    const { matched, missing } = getMatchedAndMissingSkills(candidateSkillNames, jobSkills);

    const education = [profile?.education_level, profile?.field_of_study]
      .filter(Boolean)
      .join(' — ');

    return {
      id: app.id,
      name: profile?.profiles?.full_name || 'Unknown',
      userType: profile?.user_type || '',
      education: education || '',
      skills: candidateSkillNames,
      jobSkills,
      matchedSkills: matched,
      missingSkills: missing,
      matchPercentage: calculateSkillMatch(candidateSkillNames, jobSkills),
      status: app.status,
      appliedAt: app.applied_at,
    };
  });
}

// Employer — update an application's status
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
