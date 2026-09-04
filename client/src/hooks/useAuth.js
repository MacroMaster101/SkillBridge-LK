import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { ROLES } from '../constants';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    if (!supabase) return null;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return data;
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const profileData = await fetchProfile(session.user.id);
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
        const profileData = await fetchProfile(session.user.id);
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
  }, [fetchProfile]);

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('access_token');
    setUser(null);
    setProfile(null);
  };

  const isCandidate = profile?.role === ROLES.CANDIDATE;
  const isEmployer = profile?.role === ROLES.EMPLOYER;

  return {
    user,
    profile,
    loading,
    signOut,
    isCandidate,
    isEmployer,
    isAuthenticated: Boolean(user),
  };
}
