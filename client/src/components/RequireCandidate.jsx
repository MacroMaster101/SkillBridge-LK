import { Navigate } from 'react-router-dom';
import { hasCandidate } from '../lib/candidateStorage';

export default function RequireCandidate({ children }) {
  if (!hasCandidate()) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
