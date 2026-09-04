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

let cachedAccessToken = localStorage.getItem('access_token');

export function syncAuthSession(session) {
  cachedAccessToken = session?.access_token ?? null;
  if (cachedAccessToken) {
    localStorage.setItem('access_token', cachedAccessToken);
    return;
  }
  localStorage.removeItem('access_token');
}

export function getCachedAccessToken() {
  return cachedAccessToken;
}

export async function getAccessToken() {
  if (cachedAccessToken) {
    return cachedAccessToken;
  }

  if (!supabase) {
    return localStorage.getItem('access_token');
  }

  const { data: { session } } = await supabase.auth.getSession();
  syncAuthSession(session);
  return cachedAccessToken;
}

if (supabase) {
  supabase.auth.onAuthStateChange((_event, session) => {
    syncAuthSession(session);
  });
}
