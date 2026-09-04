import { supabase } from '../config/supabase.js';

export async function listSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('id, name')
    .order('name', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}
