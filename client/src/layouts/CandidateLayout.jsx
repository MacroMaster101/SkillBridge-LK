import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../constants';

const candidateLinks = [
  { to: '/candidate/dashboard', label: 'Dashboard' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/candidate/recommended', label: 'Recommended' },
  { to: '/candidate/applications', label: 'Applications' },
];

export default function CandidateLayout() {
  const { loading, isAuthenticated, isCandidate, profile } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isCandidate) {
    if (profile?.role === ROLES.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/employer/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navbar links={candidateLinks} showAuth />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
