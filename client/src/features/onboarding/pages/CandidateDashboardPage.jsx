import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

export default function CandidateDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Candidate Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome back! Here&apos;s an overview of your job search.</p>

      {/* TODO: Fetch recommended jobs and application stats from API */}
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {[
          { label: 'Applications', value: '—' },
          { label: 'Under Review', value: '—' },
          { label: 'Recommended Jobs', value: '—' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-brand-700">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended For You</h2>
          <Link to="/candidate/recommended">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Complete your onboarding to see personalized job recommendations.
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/jobs"><Button>Browse Jobs</Button></Link>
        <Link to="/candidate/onboarding"><Button variant="secondary">Complete Profile</Button></Link>
      </div>
    </div>
  );
}
