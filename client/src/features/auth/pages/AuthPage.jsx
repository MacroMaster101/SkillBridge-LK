import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eyebrow, Icon } from '../../../components/PublicUI';
import {
  signUp,
  signIn,
  ensureProfile,
  getHomeRoute,
  getPostRegisterRoute,
} from '../services/authService';
import { isSupabaseConfigured } from '../../../services/supabase';
import { authCandidateRegisterSchema, authLoginSchema, authRegisterSchema } from '../../../lib/validation';
import { isPasswordValid, PasswordValidation } from '../components/PasswordValidation';
import { useAuth } from '../../../hooks/useAuth';

const ROLES = [
  { value: 'candidate', label: 'Find work', icon: 'people' },
  { value: 'employer', label: 'Hire someone', icon: 'briefcase' },
];

export default function AuthPage({ register = false }) {
  const navigate = useNavigate();
  const { completeAuth } = useAuth();
  const [params, setParams] = useSearchParams();
  const role = params.get('role') === 'employer' ? 'employer' : 'candidate';
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const hiring = register && role === 'employer';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setFeedback('');

    if (!isSupabaseConfigured) {
      setError('Authentication is not configured. Add Supabase keys to client/.env');
      return;
    }

    const formData = new FormData(event.target);
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString();
    const fullName = formData.get('fullName')?.toString().trim();

    const validation = register
      ? (role === 'candidate'
        ? authCandidateRegisterSchema
        : authRegisterSchema
      ).safeParse({ fullName, email, password })
      : authLoginSchema.safeParse({ email, password });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Please check your details.');
      return;
    }

    setLoading(true);

    try {
      if (register) {
        const { session, user } = await signUp({
          email,
          password,
          fullName,
          role,
        });

        if (session && user) {
          const profile = await ensureProfile(user, { fullName, role });
          completeAuth(user, profile);
          navigate(getPostRegisterRoute(profile.role));
          return;
        }

        setFeedback('Account created. Check your email to confirm, then log in.');
        return;
      }

      const { user } = await signIn({ email, password });

      if (!user) {
        setError('Login failed. Please try again.');
        return;
      }

      const profile = await ensureProfile(user);
      completeAuth(user, profile);
      navigate(getHomeRoute(profile.role));
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sb-container sb-auth-layout">
      <aside className="sb-auth-story">
        <Eyebrow>SkillBridge LK</Eyebrow>
        <h1>
          {hiring
            ? <>Your next hire is <em>just starting out.</em></>
            : <>Your skills are further along <em>than you think.</em></>}
        </h1>
        <p>
          {hiring
            ? 'Post a vacancy, list the skills it needs, and see applicants ranked by how closely they match.'
            : 'Add your skills once. Every role you open then tells you how much of it you already cover.'}
        </p>

        <div className="sb-auth-art" aria-hidden="true">
          <span className="sb-art-track" />
          <span className="sb-art-pier one" />
          <span className="sb-art-pier two" />
          <span className="sb-art-pier three" />
          <span className="sb-art-stop one" />
          <span className="sb-art-stop two" />
          <span className="sb-art-stop here" />
          <span className="sb-art-label">You are here</span>
        </div>

        <p className="sb-auth-caption">
          <span className="sb-live-dot" />
          {hiring ? 'Built for small Sri Lankan teams' : 'Built for Sri Lanka’s first-time job seekers'}
        </p>
      </aside>

      <div className="sb-auth-form">
        <Link className="sb-back-link" to="/">← Back to home</Link>
        <h2>{register ? 'Create your account' : 'Log in'}</h2>
        <p>
          {register
            ? 'Pick what you are here to do, then add your details.'
            : 'Pick up where you left off.'}
        </p>

        <form onSubmit={handleSubmit}>
          {register && (
            <fieldset className="sb-role-selector">
              <legend>I want to</legend>
              {ROLES.map((item) => (
                <label key={item.value} className={role === item.value ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="accountRole"
                    value={item.value}
                    checked={role === item.value}
                    onChange={() => { setParams({ role: item.value }, { replace: true }); setFeedback(''); setError(''); }}
                  />
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </label>
              ))}
            </fieldset>
          )}

          {register && (
            <label className="sb-field">
              {hiring ? 'Business name' : 'Full name'}
              <input
                name="fullName"
                autoComplete={hiring ? 'organization' : 'name'}
                placeholder={hiring ? 'Your business name' : 'Your full name'}
                required
                maxLength={100}
              />
            </label>
          )}

          <label className="sb-field">
            Email address
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>

          <label className="sb-field">
            Password
            <span className="sb-password">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={register ? 'new-password' : 'current-password'}
                placeholder={register ? 'Create a password' : 'Enter your password'}
                required
                minLength={register ? 8 : undefined}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError('');
                }}
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
            <PasswordValidation password={password} register={register} role={role} />
          </label>

          {error && (
            <p className="sb-form-feedback sb-form-error" role="alert">
              {error}
            </p>
          )}

          {feedback && (
            <p className="sb-form-feedback" role="status">
              {feedback}
            </p>
          )}

          <button
            className="sb-button sb-auth-submit"
            type="submit"
            disabled={loading || (password.length > 0 && !isPasswordValid(password, register, role))}
          >
            {loading ? 'Please wait…' : register ? 'Create account' : 'Log in'}
            {!loading && <Icon size={18} />}
          </button>
        </form>

        <p className="sb-auth-switch">
          {register ? 'Already have an account? ' : 'New here? '}
          <Link to={register ? `/login${role === 'employer' ? '?role=employer' : ''}` : `/register${role === 'employer' ? '?role=employer' : ''}`}>
            {register ? 'Log in' : 'Create an account'}
          </Link>
        </p>

        {!register && (
          <p className="sb-auth-switch">
            Platform admin? <Link to="/admin/login">Super admin login</Link>
          </p>
        )}

        <p className="sb-auth-bottom">
          <Icon name="spark" size={17} />
          <span>
            {!register
              ? 'Browsing opportunities does not need an account.'
              : hiring
                ? 'Set up your business once, then post as many roles as you need.'
                : 'No experience needed to join. That is rather the point.'}
          </span>
        </p>
      </div>
    </section>
  );
}
