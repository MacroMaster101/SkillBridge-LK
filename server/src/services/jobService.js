import { supabase } from '../config/supabase.js';
import { AppError } from '../utils/errors.js';
import { getEmployerByOwnerId } from '../utils/employerAuth.js';

const JOB_SELECT = `
  id,
  title,
  description,
  category,
  job_type,
  location,
  work_mode,
  minimum_education,
  deadline,
  status,
  created_at,
  employers ( company_name ),
  job_skills ( skills ( name ) )
`;

function extractSkills(jobSkills) {
  return (jobSkills || [])
    .map((entry) => entry.skills?.name)
    .filter(Boolean);
}

function toJobListItem(row) {
  return {
    id: row.id,
    title: row.title,
    company: row.employers?.company_name || '',
    category: row.category,
    jobType: row.job_type,
    location: row.location,
    workMode: row.work_mode,
    skills: extractSkills(row.job_skills),
    postedDate: row.created_at,
  };
}

function toJobDetail(row) {
  return {
    ...toJobListItem(row),
    description: row.description,
    minimumEducation: row.minimum_education,
    deadline: row.deadline,
    status: row.status,
  };
}

async function resolveSkillIds(skillNames) {
  const normalized = [...new Set(skillNames.map((s) => s.trim()).filter(Boolean))];

  if (normalized.length === 0) {
    throw new AppError(400, 'At least one required skill is needed');
  }

  const { data: existing, error: fetchError } = await supabase
    .from('skills')
    .select('id, name')
    .in('name', normalized);

  if (fetchError) {
    throw new AppError(500, fetchError.message);
  }

  const foundByName = new Map(
    (existing || []).map((skill) => [skill.name.toLowerCase(), skill.id]),
  );

  const skillIds = [];

  for (const name of normalized) {
    const existingId = foundByName.get(name.toLowerCase());

    if (existingId) {
      skillIds.push(existingId);
      continue;
    }

    const { data: created, error: createError } = await supabase
      .from('skills')
      .insert({ name })
      .select('id')
      .single();

    if (createError) {
      throw new AppError(500, createError.message);
    }

    skillIds.push(created.id);
  }

  return skillIds;
}

export async function createJob(ownerId, body) {
  const employer = await getEmployerByOwnerId(ownerId);

  if (!employer) {
    throw new AppError(403, 'Employer profile not found. Create your business profile first.');
  }

  const skillIds = await resolveSkillIds(body.skills);

  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .insert({
      employer_id: employer.id,
      title: body.title,
      description: body.description,
      category: body.category,
      job_type: body.jobType,
      location: body.location || null,
      work_mode: body.workMode || null,
      minimum_education: body.minimumEducation || null,
      deadline: body.deadline || null,
      status: 'ACTIVE',
    })
    .select('*')
    .single();

  if (jobError) {
    throw new AppError(500, jobError.message);
  }

  const { error: skillsError } = await supabase
    .from('job_skills')
    .insert(skillIds.map((skillId) => ({ job_id: job.id, skill_id: skillId })));

  if (skillsError) {
    throw new AppError(500, skillsError.message);
  }

  return {
    id: job.id,
    title: job.title,
    company: employer.company_name,
    description: job.description,
    category: job.category,
    jobType: job.job_type,
    location: job.location,
    workMode: job.work_mode,
    minimumEducation: job.minimum_education,
    deadline: job.deadline,
    status: job.status,
    skills: body.skills,
    createdAt: job.created_at,
  };
}

export async function getActiveJobs(filters = {}) {
  let query = supabase
    .from('jobs')
    .select(JOB_SELECT)
    .eq('status', 'ACTIVE')
    .order('created_at', { ascending: false });

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.jobType) {
    query = query.eq('job_type', filters.jobType);
  }

  if (filters.workMode) {
    query = query.eq('work_mode', filters.workMode);
  }

  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new AppError(500, error.message);
  }

  let jobs = (data || []).map(toJobListItem);

  if (filters.search) {
    const search = filters.search.toLowerCase();
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.category.toLowerCase().includes(search),
    );
  }

  return jobs;
}

export async function getActiveJobById(jobId) {
  const { data, error } = await supabase
    .from('jobs')
    .select(JOB_SELECT)
    .eq('id', jobId)
    .eq('status', 'ACTIVE')
    .maybeSingle();

  if (error) {
    throw new AppError(500, error.message);
  }

  if (!data) {
    throw new AppError(404, 'Job not found');
  }

  return toJobDetail(data);
}

export async function getJobSkills(jobId) {
  const { data, error } = await supabase
    .from('job_skills')
    .select('skills ( name )')
    .eq('job_id', jobId);

  if (error) {
    throw new AppError(500, error.message);
  }

  return extractSkills(data);
}
