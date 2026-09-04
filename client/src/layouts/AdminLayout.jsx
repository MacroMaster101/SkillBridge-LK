import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../constants';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
];

export default function AdminLayout() {
  const { loading, isAuthenticated, profile } = useAuth();
  const isAdmin = profile?.role === ROLES.ADMIN;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    if (profile?.role === ROLES.EMPLOYER) {
      return <Navigate to="/employer/dashboard" replace />;
    }
    return <Navigate to="/candidate/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navbar links={adminLinks} showAuth />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
