import { supabase } from "../config/supabase.js";

export async function getCandidateProfile(userId) {
  const [{ data: profile }, { data: candidate }, { data: skills }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("candidate_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("candidate_skills")
      .select("skills(id, name)")
      .eq("user_id", userId),
  ]);

  return {
    full_name: profile?.full_name || "",
    role: profile?.role || "candidate",
    user_id: userId,
    user_type: candidate?.user_type || "",
    education_level: candidate?.education_level || "",
    field_of_study: candidate?.field_of_study || "",
    location: candidate?.location || "",
    preferred_work_mode: candidate?.preferred_work_mode || "",
    preferred_job_types: candidate?.preferred_job_types || [],
    onboarding_completed: candidate?.onboarding_completed ?? false,
    skills: (skills || []).map((row) => row.skills).filter(Boolean),
  };
}

export async function upsertCandidateProfile(userId, input) {
  await supabase.from("profiles")
    .update({ full_name: input.full_name }).eq("id", userId);

  const { error } = await supabase.from("candidate_profiles").upsert({
    user_id: userId,
    user_type: input.user_type,
    education_level: input.education_level,
    field_of_study: input.field_of_study,
    location: input.location,
    preferred_work_mode: input.preferred_work_mode,
    preferred_job_types: input.preferred_job_types || [],
    onboarding_completed: true,
  });
  if (error) throw new Error(error.message);
  return getCandidateProfile(userId);
}

export async function setCandidateSkills(userId, skillIds) {
  await supabase.from("candidate_skills").delete().eq("user_id", userId);

  const rows = skillIds.map((skill_id) => ({ user_id: userId, skill_id }));
  const { error } = await supabase.from("candidate_skills").insert(rows);
  if (error) throw new Error(error.message);
  return getCandidateProfile(userId);
}
