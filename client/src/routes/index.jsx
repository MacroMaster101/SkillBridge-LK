import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RequireCandidate from '../components/RequireCandidate';
import PublicLayout from '../layouts/PublicLayout';
import CandidateLayout from '../layouts/CandidateLayout';
import EmployerLayout from '../layouts/EmployerLayout';

// Candidate Pages
import Onboarding from '../pages/Onboarding';
import JobFeed from '../pages/JobFeed';
import JobDetails from '../pages/JobDetails';
import ApplyForm from '../pages/ApplyForm';
import Dashboard from '../pages/Dashboard';

// Public pages
import LandingPage from '../features/auth/pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import EmployersPage from '../features/auth/pages/EmployersPage';

// Job pages (shared)
import JobsPage from '../features/jobs/pages/JobsPage';
import JobDetailsPage from '../features/jobs/pages/JobDetailsPage';
import RecommendedJobsPage from '../features/jobs/pages/RecommendedJobsPage';

// Employer pages
import EmployerSetupPage from '../features/employer/pages/EmployerSetupPage';
import EmployerDashboardPage from '../features/employer/pages/EmployerDashboardPage';
import PostJobPage from '../features/employer/pages/PostJobPage';
import EmployerJobsPage from '../features/employer/pages/EmployerJobsPage';
import ApplicantsPage from '../features/employer/pages/ApplicantsPage';

// Candidate-only layout
function CandidateSideLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="employers" element={<EmployersPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:id" element={<JobDetailsPage />} />
      </Route>

      {/* Candidate routes - New UI */}
      <Route path="/candidate-new" element={<CandidateSideLayout />}>
        <Route path="onboarding" element={<Onboarding />} />
        <Route
          index
          element={
            <RequireCandidate>
              <JobFeed />
            </RequireCandidate>
          }
        />
        <Route
          path="jobs/:id"
          element={
            <RequireCandidate>
              <JobDetails />
            </RequireCandidate>
          }
        />
        <Route
          path="apply/:id"
          element={
            <RequireCandidate>
              <ApplyForm />
            </RequireCandidate>
          }
        />
        <Route
          path="dashboard"
          element={
            <RequireCandidate>
              <Dashboard />
            </RequireCandidate>
          }
        />
      </Route>

      {/* Candidate routes - Old structure */}
      <Route path="candidate" element={<CandidateLayout />}>
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="recommended" element={<RecommendedJobsPage />} />
        <Route path="applications" element={<Dashboard />} />
      </Route>

      {/* Employer routes */}
      <Route path="employer" element={<EmployerLayout />}>
        <Route path="setup" element={<EmployerSetupPage />} />
        <Route path="dashboard" element={<EmployerDashboardPage />} />
        <Route path="post-job" element={<PostJobPage />} />
        <Route path="jobs" element={<EmployerJobsPage />} />
        <Route path="jobs/:jobId/applicants" element={<ApplicantsPage />} />
      </Route>
    </Routes>
  );
}
