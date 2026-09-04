import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Brand, Action, Icon, Trilingual } from '../components/PublicUI';
import '../public.css';

const TITLES = {
  '/': 'Start where your skills are',
  '/jobs': 'Browse opportunities',
  '/employers': 'Hire early-career talent',
  '/login': 'Log in',
  '/register': 'Create your account',
};

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
    document.title = `${TITLES[pathname] || 'Opportunity'} · SkillBridge LK`;
  }, [pathname, hash]);

  return (
    <div className="sb-public">
      <a className="sb-skip" href="#main-content">Skip to content</a>

      <header className="sb-header">
        <div className="sb-container sb-nav">
          <Brand />
          <nav className="sb-desktop-nav" aria-label="Main">
            <NavLink to="/jobs">Find opportunities</NavLink>
            <Link to="/#how-it-works">How it works</Link>
            <NavLink to="/employers">For employers</NavLink>
          </nav>
          <div className="sb-nav-actions">
            <Link className="sb-sign-in" to="/login">Log in</Link>
            <Action to="/register">Create account <Icon size={16} /></Action>
          </div>
          <button
            type="button"
            className="sb-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="sb-mobile-nav" aria-label="Mobile">
            <Link to="/jobs">Find opportunities</Link>
            <Link to="/#how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
            <Link to="/employers">For employers</Link>
            <Link to="/login">Log in</Link>
            <Link to="/register">Create account</Link>
          </nav>
        )}
      </header>

      <main id="main-content"><Outlet /></main>

      <footer className="sb-footer">
        <div className="sb-container">
          <div className="sb-footer-top">
            <div>
              <Brand />
              <p>
                Skill-matched internships, part-time work and entry-level roles
                for people starting out in Sri Lanka.
              </p>
              <Trilingual si="ඔබේ ඊළඟ පියවර" ta="உங்கள் அடுத்த படி" en="Your next step" />
            </div>
            <div>
              <h3>For candidates</h3>
              <Link to="/jobs">Browse opportunities</Link>
              <Link to="/register?role=candidate">Create your profile</Link>
              <Link to="/#how-it-works">How matching works</Link>
            </div>
            <div>
              <h3>For employers</h3>
              <Link to="/employers">Why SkillBridge</Link>
              <Link to="/register?role=employer">Post a vacancy</Link>
              <Link to="/login">Employer log in</Link>
            </div>
            <div>
              <h3>About</h3>
              <p>
                Built for SE3090 Software Engineering Frameworks
                as a mini-hackathon project.
              </p>
            </div>
          </div>
          <div className="sb-footer-bottom">
            <span>© {new Date().getFullYear()} SkillBridge LK</span>
            <span>Colombo · Kandy · Galle · Jaffna · Kurunegala</span>
            <a href="#main-content">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
