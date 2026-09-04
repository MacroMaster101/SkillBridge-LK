import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

export default function EmployerDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
      <p className="mt-2 text-gray-600">Manage your job postings and applicants.</p>

      {/* TODO: Fetch stats from API */}
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {[
          { label: 'Active Jobs', value: '—' },
          { label: 'Total Applications', value: '—' },
          { label: 'Total Applicants', value: '—' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-brand-700">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Jobs</h2>
          <Link to="/employer/post-job">
            <Button size="sm">Create Job</Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          No jobs posted yet. Create your first job listing to start receiving applications.
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to="/employer/setup"><Button variant="secondary">Complete Profile</Button></Link>
        <Link to="/employer/post-job"><Button>Post a Job</Button></Link>
      </div>
    </div>
  );
}
