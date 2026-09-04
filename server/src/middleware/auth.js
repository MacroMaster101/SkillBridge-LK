import { supabase } from '../config/supabase.js';

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];

  if (!supabase) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = user;
  next();
}

export function requireRole(role) {
  return async (req, res, next) => {
    if (!supabase) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', req.user.id)
      .single();

    if (error || !profile) {
      return res.status(403).json({ error: 'Profile not found' });
    }

    if (profile.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    req.profile = profile;
    next();
  };
}
