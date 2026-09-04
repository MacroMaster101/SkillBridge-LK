import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import CandidateLayout from '../layouts/CandidateLayout';
import EmployerLayout from '../layouts/EmployerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public pages
import LandingPage from '../features/auth/pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import AdminLoginPage from '../features/auth/pages/AdminLoginPage';
import EmployersPage from '../features/auth/pages/EmployersPage';

// Job pages (shared)
import JobsPage from '../features/jobs/pages/JobsPage';
import JobDetailsPage from '../features/jobs/pages/JobDetailsPage';
import RecommendedJobsPage from '../features/jobs/pages/RecommendedJobsPage';

// Candidate pages (AppUI)
import OnboardingPage from '../features/onboarding/pages/OnboardingPage';
import CandidateDashboardPage from '../features/onboarding/pages/CandidateDashboardPage';
import CandidateApplicationsPage from '../features/applications/pages/CandidateApplicationsPage';

// Employer pages
import EmployerSetupPage from '../features/employer/pages/EmployerSetupPage';
import EmployerDashboardPage from '../features/employer/pages/EmployerDashboardPage';
import PostJobPage from '../features/employer/pages/PostJobPage';
import EmployerJobsPage from '../features/employer/pages/EmployerJobsPage';
import ApplicantsPage from '../features/employer/pages/ApplicantsPage';

// Admin pages
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route path="employers" element={<EmployersPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:id" element={<JobDetailsPage />} />
      </Route>

      {/* Candidate routes */}
      <Route path="candidate" element={<CandidateLayout />}>
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="dashboard" element={<CandidateDashboardPage />} />
        <Route path="recommended" element={<RecommendedJobsPage />} />
        <Route path="applications" element={<CandidateApplicationsPage />} />
      </Route>

      {/* Employer routes */}
      <Route path="employer" element={<EmployerLayout />}>
        <Route path="setup" element={<EmployerSetupPage />} />
        <Route path="dashboard" element={<EmployerDashboardPage />} />
        <Route path="post-job" element={<PostJobPage />} />
        <Route path="jobs" element={<EmployerJobsPage />} />
        <Route path="jobs/:jobId/applicants" element={<ApplicantsPage />} />
      </Route>

      {/* Admin routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  );
}
