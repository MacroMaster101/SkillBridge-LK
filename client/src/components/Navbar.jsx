import { Link, NavLink } from 'react-router-dom';
import { getCandidate } from '../lib/candidateStorage';

export default function Navbar() {
  const candidate = getCandidate();

  return (
    <div className="navbar">
      <div>
        <Link to="/" style={{ marginRight: '24px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
          SkillBridge LK
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Jobs
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          My Applications
        </NavLink>
      </div>
      {candidate && (
        <span style={{ fontSize: '0.95rem' }}>Hi, {candidate.name}</span>
      )}
    </div>
  );
}
