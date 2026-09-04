import ApplicationCard from '../components/ApplicationCard';

// TODO: Replace with API call — GET /api/applications/me
const PLACEHOLDER_APPLICATIONS = [
  {
    id: 1,
    jobTitle: 'Frontend Development Intern',
    company: 'Pixel Lanka',
    status: 'UNDER_REVIEW',
    appliedAt: '04 Sep 2026',
    matchPercentage: 80,
  },
];

export default function CandidateApplicationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
      <p className="mt-2 text-gray-600">Track the status of your job applications.</p>

      <div className="mt-8 grid gap-4">
        {PLACEHOLDER_APPLICATIONS.length === 0 ? (
          <p className="text-gray-500">You haven&apos;t applied to any jobs yet.</p>
        ) : (
          PLACEHOLDER_APPLICATIONS.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))
        )}
      </div>
    </div>
  );
}
