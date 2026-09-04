import { supabase } from '../config/supabase.js';

export async function listSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function resolveSkillIds(skillNames) {
  const normalized = [...new Set(skillNames.map((name) => name.trim()).filter(Boolean))];

  if (normalized.length === 0) {
    throw new Error('At least one skill is required');
  }

  const { data: existing, error: fetchError } = await supabase
    .from('skills')
    .select('id, name')
    .in('name', normalized);

  if (fetchError) {
    throw new Error(fetchError.message);
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
      throw new Error(createError.message);
    }

    skillIds.push(created.id);
  }

  return skillIds;
}
