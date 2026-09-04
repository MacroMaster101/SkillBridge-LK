import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { ROLES } from '../constants';
import { signOut as authSignOut, ensureProfile } from '../features/auth/services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (authUser) => {
    try {
      return await ensureProfile(authUser);
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const profileData = await loadProfile(session.user);
        setProfile(profileData);
        if (session.access_token) {
          localStorage.setItem('access_token', session.access_token);
        }
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const profileData = await loadProfile(session.user);
        setProfile(profileData);
        if (session.access_token) {
          localStorage.setItem('access_token', session.access_token);
        }
      } else {
        setProfile(null);
        localStorage.removeItem('access_token');
      }
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const signOut = async () => {
    await authSignOut();
    setUser(null);
    setProfile(null);
  };

  const isCandidate = profile?.role === ROLES.CANDIDATE;
  const isEmployer = profile?.role === ROLES.EMPLOYER;
  const isAdmin = profile?.role === ROLES.ADMIN;

  return {
    user,
    profile,
    loading,
    signOut,
    isCandidate,
    isEmployer,
    isAdmin,
    isAuthenticated: Boolean(user),
  };
}
