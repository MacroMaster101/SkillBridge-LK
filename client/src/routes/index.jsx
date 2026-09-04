import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RequireCandidate from '../components/RequireCandidate';

// Pages
import Onboarding from '../pages/Onboarding';
import JobFeed from '../pages/JobFeed';
import JobDetails from '../pages/JobDetails';
import ApplyForm from '../pages/ApplyForm';
import Dashboard from '../pages/Dashboard';

function CandidateLayout() {
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
      <Route path="/onboarding" element={<Onboarding />} />

      <Route element={<CandidateLayout />}>
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
    </Routes>
  );
}
