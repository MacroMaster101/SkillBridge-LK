import { supabase, isSupabaseConfigured } from '../../../services/supabase';
import { ROLES } from '../../../constants';

export function getHomeRoute(role) {
  switch (role) {
    case ROLES.ADMIN:
      return '/admin/dashboard';
    case ROLES.EMPLOYER:
      return '/employer/dashboard';
    case ROLES.CANDIDATE:
    default:
      return '/candidate/dashboard';
  }
}

export function getPostRegisterRoute(role) {
  switch (role) {
    case ROLES.EMPLOYER:
      return '/employer/setup';
    case ROLES.CANDIDATE:
    default:
      return '/candidate/onboarding';
  }
}

export async function signUp({ email, password, fullName, role }) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Check your client .env file.');
  }

  if (role === ROLES.ADMIN) {
    throw new Error('Admin accounts cannot be created through public registration.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signIn({ email, password }) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Check your client .env file.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem('access_token');
}

export async function fetchProfile(userId) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchCandidateProfile(userId) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('candidate_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function ensureCandidateProfile(userId) {
  const existing = await fetchCandidateProfile(userId);
  if (existing) return existing;

  const { data, error } = await supabase
    .from('candidate_profiles')
    .upsert(
      {
        user_id: userId,
        user_type: 'Pending onboarding',
        onboarding_completed: false,
      },
      { onConflict: 'user_id' },
    )
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

/**
 * Returns the user's profile, creating one if the signup trigger did not run.
 * Also creates candidate_profiles row when role is candidate.
 */
export async function ensureProfile(user, fallback = {}) {
  let profile = await fetchProfile(user.id);

  if (!profile) {
    const fullName = user.user_metadata?.full_name || fallback.fullName || 'User';
    const role = user.user_metadata?.role || fallback.role || ROLES.CANDIDATE;

    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          full_name: fullName,
          role,
        },
        { onConflict: 'id' },
      )
      .select('*')
      .maybeSingle();

    if (error) {
      throw new Error(
        'Account signed in, but no profile exists. Run supabase/schema.sql in Supabase (including the handle_new_user trigger).',
      );
    }

    if (!data) {
      throw new Error('Could not load your profile. Please try again.');
    }

    profile = data;
  }

  if (profile.role === ROLES.CANDIDATE) {
    await ensureCandidateProfile(user.id);
  }

  return profile;
}
