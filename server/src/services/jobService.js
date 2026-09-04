import { supabase } from "../config/supabase.js";

export async function listJobs(filters, candidateId) {
  let query = supabase
    .from("jobs")
    .select(`
      id, title, description, category, job_type, location, work_mode,
      minimum_education, deadline, status, created_at,
      employers ( company_name ),
      job_skills ( skills ( id, name ) )
    `)
    .eq("status", "ACTIVE");

  if (filters.category)  query = query.eq("category", filters.category);
  if (filters.job_type)  query = query.eq("job_type", filters.job_type);
  if (filters.work_mode) query = query.eq("work_mode", filters.work_mode);
  if (filters.location)  query = query.ilike("location", `%${filters.location}%`);


  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  // candidate's skill ids for match calc
  const candidateSkillIds = await getCandidateSkillIds(candidateId);

  let jobs = (data || []).map((job) => shapeJob(job, candidateSkillIds));

  // company search (post-filter, since it lives on the joined table)
  if (filters.q) {
    const q = filters.q.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q)
    );
  }
  if (filters.minMatch) {
    jobs = jobs.filter((j) => j.matchPercentage >= Number(filters.minMatch));
  }
  return jobs;
}

async function getCandidateSkillIds(candidateId) {
  const { data } = await supabase
    .from("candidate_skills").select("skill_id").eq("user_id", candidateId);
  return new Set((data || []).map((r) => r.skill_id));
}

function shapeJob(job, candidateSkillIds) {
  const jobSkills = (job.job_skills || []).map((r) => r.skills);
  const total = jobSkills.length;
  const matched = jobSkills.filter((s) => candidateSkillIds.has(s.id));
  const matchPercentage =
    total === 0 ? 0 : Math.round((matched.length / total) * 100);

  return {
    id: job.id,
    title: job.title,
    company: job.employers?.company_name ?? "Unknown",
    category: job.category,
    jobType: job.job_type,
    location: job.location,
    workMode: job.work_mode,
    deadline: job.deadline,
    postedDate: job.created_at,
    skills: jobSkills.map((s) => s.name),
    matchedSkills: matched.map((s) => s.name),
    missingSkills: jobSkills.filter((s) => !candidateSkillIds.has(s.id)).map((s) => s.name),
    matchPercentage,
  };
}

export { shapeJob, getCandidateSkillIds };