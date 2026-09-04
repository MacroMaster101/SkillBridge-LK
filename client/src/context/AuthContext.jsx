import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, isSupabaseConfigured, syncAuthSession } from '../services/supabase';
import { ROLES } from '../constants';
import { signOut as authSignOut, ensureProfile } from '../features/auth/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
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
      return undefined;
    }

    let active = true;

    const applySession = async (session) => {
      syncAuthSession(session);
      const nextUser = session?.user ?? null;
      setUser(nextUser);

      if (nextUser) {
        const profileData = await loadProfile(nextUser);
        if (active) setProfile(profileData);
      } else if (active) {
        setProfile(null);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      applySession(session).finally(() => {
        if (active) setLoading(false);
      });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer Supabase calls to avoid auth deadlocks during token refresh.
      setTimeout(() => {
        if (!active) return;
        applySession(session);
      }, 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await authSignOut();
    setUser(null);
    setProfile(null);
  }, []);

  const value = useMemo(() => ({
    user,
    profile,
    loading,
    signOut,
    isCandidate: profile?.role === ROLES.CANDIDATE,
    isEmployer: profile?.role === ROLES.EMPLOYER,
    isAdmin: profile?.role === ROLES.ADMIN,
    isAuthenticated: Boolean(user),
  }), [user, profile, loading, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
