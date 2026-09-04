import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eyebrow, Icon } from '../../../components/PublicUI';

const ROLES = [
  { value: 'candidate', label: 'Find work', icon: 'people' },
  { value: 'employer', label: 'Hire someone', icon: 'briefcase' },
];

export default function AuthPage({ register = false }) {
  const [params, setParams] = useSearchParams();
  const role = params.get('role') === 'employer' ? 'employer' : 'candidate';
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState('');

  const hiring = register && role === 'employer';

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback(
      register
        ? 'Accounts are not connected yet in this preview. Browse the sample opportunities in the meantime.'
        : 'Log in is not connected yet in this preview. You can browse the sample opportunities without an account.',
    );
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
                    onChange={() => { setParams({ role: item.value }, { replace: true }); setFeedback(''); }}
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

          {register && <p className="sb-field-hint">Use at least 8 characters.</p>}

          {feedback && (
            <p className="sb-form-feedback" role="status">
              {feedback} <Link to="/jobs">Browse opportunities →</Link>
            </p>
          )}

          <button className="sb-button sb-auth-submit" type="submit">
            {register ? 'Create account' : 'Log in'}
            <Icon size={18} />
          </button>
          <p className="sb-preview-form-note">Preview build · Accounts not connected yet</p>
        </form>

        <p className="sb-auth-switch">
          {register ? 'Already have an account? ' : 'New here? '}
          <Link to={register ? '/login' : '/register'}>
            {register ? 'Log in' : 'Create an account'}
          </Link>
        </p>

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
