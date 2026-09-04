import { supabase } from "../config/supabase.js";
import { shapeJob, getCandidateSkillIds } from "./jobService.js";

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