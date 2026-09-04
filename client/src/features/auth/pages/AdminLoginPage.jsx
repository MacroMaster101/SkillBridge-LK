import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eyebrow, Icon } from '../../../components/PublicUI';
import { signIn, signOut, ensureProfile, getHomeRoute } from '../services/authService';
import { isSupabaseConfigured } from '../../../services/supabase';
import { ROLES } from '../../../constants';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!isSupabaseConfigured) {
      setError('Authentication is not configured. Add Supabase keys to client/.env');
      return;
    }

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    setLoading(true);

    try {
      const { user } = await signIn({ email, password });

      if (!user) {
        setError('Login failed. Please try again.');
        return;
      }

      const profile = await ensureProfile(user);

      if (profile?.role !== ROLES.ADMIN) {
        await signOut();
        setError('This account does not have super admin access.');
        return;
      }

      navigate(getHomeRoute(ROLES.ADMIN));
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sb-container sb-auth-layout">
      <aside className="sb-auth-story">
        <Eyebrow>SkillBridge LK · Admin</Eyebrow>
        <h1>Platform <em>oversight.</em></h1>
        <p>
          Super admin access for managing users, employers, job listings and
          platform activity. Not for employer hiring workflows.
        </p>
        <p className="sb-auth-caption">
          <span className="sb-live-dot" />
          Restricted access only
        </p>
      </aside>

      <div className="sb-auth-form">
        <Link className="sb-back-link" to="/">← Back to home</Link>
        <h2>Super admin login</h2>
        <p>Sign in with your platform administrator account.</p>

        <form onSubmit={handleSubmit}>
          <label className="sb-field">
            Admin email
            <input name="email" type="email" autoComplete="email" placeholder="admin@example.com" required />
          </label>

          <label className="sb-field">
            Password
            <span className="sb-password">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                <Icon name="eye" size={18} />
              </button>
            </span>
          </label>

          {error && (
            <p className="sb-form-feedback sb-form-error" role="alert">
              {error}
            </p>
          )}

          <button className="sb-button sb-auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in as admin'}
            {!loading && <Icon size={18} />}
          </button>
        </form>

        <p className="sb-auth-switch">
          Not an admin? <Link to="/login">User / employer login</Link>
        </p>
      </div>
    </section>
  );
}
