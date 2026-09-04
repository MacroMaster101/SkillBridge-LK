import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: localStorage,
        },
      })
    : null;

export const isSupabaseConfigured = Boolean(supabase);

export function syncAuthSession(session) {
  if (session?.access_token) {
    localStorage.setItem('access_token', session.access_token);
    return;
  }
  localStorage.removeItem('access_token');
}

export async function getAccessToken() {
  if (!supabase) {
    return localStorage.getItem('access_token');
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    syncAuthSession(session);
    return session.access_token;
  }

  return null;
}
