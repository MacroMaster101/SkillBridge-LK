import { supabase } from "../config/supabase.js";

export async function getCandidateProfile(userId) {
  const { data: profile } = await supabase
    .from("profiles").select("full_name, role").eq("id", userId).single();

  const { data: candidate } = await supabase
    .from("candidate_profiles").select("*").eq("user_id", userId).single();

  const { data: skills } = await supabase
    .from("candidate_skills")
    .select("skills(id, name)")
    .eq("user_id", userId);

  return {
    ...profile,
    ...candidate,
    skills: (skills || []).map((r) => r.skills),
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
    onboarding_completed: true,
  });
  if (error) throw new Error(error.message);
  return getCandidateProfile(userId);
}