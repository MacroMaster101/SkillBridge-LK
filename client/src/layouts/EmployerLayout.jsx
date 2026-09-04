import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const employerLinks = [
  { to: '/employer/dashboard', label: 'Dashboard' },
  { to: '/employer/post-job', label: 'Post Job' },
  { to: '/employer/jobs', label: 'My Jobs' },
];

export default function EmployerLayout() {
  const { loading, isAuthenticated, isEmployer } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isEmployer) {
    return <Navigate to="/candidate/dashboard" replace />;
  }

  return (
    <div className="min-h-screen">
      <Navbar links={employerLinks} showAuth />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
