import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors ${
          isActive ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar({ links = [], showAuth = true }) {
  const { isAuthenticated, signOut, profile } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold text-brand-700">
          SkillBridge LK
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavItem key={link.to} to={link.to}>
              {link.label}
            </NavItem>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {showAuth && !isAuthenticated && (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
          {showAuth && isAuthenticated && (
            <>
              {profile?.full_name && (
                <span className="hidden text-sm text-gray-600 sm:inline">
                  {profile.full_name}
                </span>
              )}
              <Button variant="secondary" size="sm" onClick={signOut}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
