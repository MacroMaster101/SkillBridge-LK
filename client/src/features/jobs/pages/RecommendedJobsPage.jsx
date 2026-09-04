import { JobCard } from '../components/JobFilters';
import LoadingSpinner from '../../../components/LoadingSpinner';

// TODO: Replace with API call — GET /api/candidates/me/recommendations
const PLACEHOLDER_JOBS = [
  {
    id: 1,
    title: 'Frontend Development Intern',
    company: 'Pixel Lanka',
    category: 'Software / IT',
    jobType: 'Internship',
    location: 'Colombo',
    workMode: 'Hybrid',
    skills: ['React', 'JavaScript', 'CSS', 'Git'],
    matchPercentage: 80,
  },
];

export default function RecommendedJobsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Recommended For You</h1>
      <p className="mt-2 text-gray-600">Jobs sorted by skill-match percentage.</p>

      <div className="mt-8 grid gap-4">
        {PLACEHOLDER_JOBS.length === 0 ? (
          <p className="text-gray-500">Complete your profile to see recommendations.</p>
        ) : (
          PLACEHOLDER_JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}
