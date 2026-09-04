import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase, isSupabaseConfigured, syncAuthSession } from '../services/supabase';
import { ROLES } from '../constants';
import { signOut as authSignOut, ensureProfile } from '../features/auth/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileCacheRef = useRef({ userId: null, profile: null, promise: null });

  const loadProfile = useCallback(async (authUser) => {
    const userId = authUser.id;

    if (profileCacheRef.current.userId === userId && profileCacheRef.current.profile) {
      return profileCacheRef.current.profile;
    }

    if (profileCacheRef.current.userId === userId && profileCacheRef.current.promise) {
      return profileCacheRef.current.promise;
    }

    const promise = ensureProfile(authUser)
      .then((profileData) => {
        profileCacheRef.current = { userId, profile: profileData, promise: null };
        return profileData;
      })
      .catch(() => null);

    profileCacheRef.current = { userId, profile: null, promise };
    return promise;
  }, []);

  const applySession = useCallback(async (session, { reloadProfile = true } = {}) => {
    syncAuthSession(session);
    const nextUser = session?.user ?? null;
    setUser(nextUser);

    if (!nextUser) {
      profileCacheRef.current = { userId: null, profile: null, promise: null };
      setProfile(null);
      return;
    }

    if (!reloadProfile && profileCacheRef.current.userId === nextUser.id && profileCacheRef.current.profile) {
      setProfile(profileCacheRef.current.profile);
      return;
    }

    const profileData = await loadProfile(nextUser);
    setProfile(profileData);
  }, [loadProfile]);

  const completeAuth = useCallback((authUser, profileData) => {
    profileCacheRef.current = {
      userId: authUser.id,
      profile: profileData,
      promise: null,
    };
    setUser(authUser);
    setProfile(profileData);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    let initialised = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const shouldReloadProfile = event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED';

      setTimeout(() => {
        if (!active) return;

        applySession(session, { reloadProfile: shouldReloadProfile })
          .finally(() => {
            if (!active || initialised) return;
            initialised = true;
            setLoading(false);
          });
      }, 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const signOut = useCallback(async () => {
    await authSignOut();
    profileCacheRef.current = { userId: null, profile: null, promise: null };
    setUser(null);
    setProfile(null);
  }, []);

  const value = useMemo(() => ({
    user,
    profile,
    loading,
    signOut,
    completeAuth,
    isCandidate: profile?.role === ROLES.CANDIDATE,
    isEmployer: profile?.role === ROLES.EMPLOYER,
    isAdmin: profile?.role === ROLES.ADMIN,
    isAuthenticated: Boolean(user),
  }), [user, profile, loading, signOut, completeAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
