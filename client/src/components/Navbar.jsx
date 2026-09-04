import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Icon } from './PublicUI';
import { useAuth } from '../hooks/useAuth';

/* The signed-in header. Mirrors the public one: the same brand mark, and the
   current section carries a marigold station dot on the wayfinding line. */
export default function Navbar({ links = [], showAuth = false }) {
  const [open, setOpen] = useState(false);
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();

  const name = profile?.full_name || user?.email || 'Account';
  const role = profile?.role ? profile.role[0].toUpperCase() + profile.role.slice(1) : 'Signed in';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `relative py-1.5 text-sm transition-colors after:absolute after:bottom-[-9px] after:left-1/2 after:-ml-[3.5px] after:h-[7px] after:w-[7px] after:rounded-full after:bg-marigold after:transition-transform ${
      isActive
        ? 'font-semibold text-ink after:scale-100'
        : 'font-medium text-ink-soft after:scale-0 hover:text-ink'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[74px] max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="mr-auto flex items-center gap-2.5 font-display text-lg font-extrabold tracking-[-0.04em] text-ink">
          <span className="flex h-[26px] w-[26px] flex-none items-end gap-[2px] rounded-[3px] bg-ink px-[3px] py-1" aria-hidden="true">
            <i className="flex-1 rounded-[1px] bg-marigold" style={{ height: '40%' }} />
            <i className="flex-1 rounded-[1px] bg-marigold" style={{ height: '68%' }} />
            <i className="flex-1 rounded-[1px] bg-marigold" style={{ height: '100%' }} />
          </span>
          SkillBridge
          <span className="self-center rounded-[2px] bg-petrol px-1.5 pb-0.5 pt-[3px] font-mono text-[0.6rem] font-bold tracking-[0.06em] text-paper">
            LK
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {showAuth && (
          <div className="hidden items-center gap-4 md:flex">
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-ink-soft">{role}</p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded border border-line-strong bg-card px-3 py-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.06em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              Sign out
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded border border-line-strong bg-card text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="app-mobile-nav"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      {open && (
        <nav id="app-mobile-nav" className="flex flex-col border-t border-line px-4 pb-5 sm:px-6 md:hidden" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 font-medium text-ink"
            >
              {link.label}
            </Link>
          ))}
          {showAuth && (
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 self-start rounded border border-line-strong bg-card px-3 py-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.06em] text-ink-soft"
            >
              Sign out · {name}
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
