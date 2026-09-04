import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import api from '../../../services/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load platform stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner className="py-12" size="lg" />;
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
        <p className="mt-4 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Platform overview for SkillBridge LK.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Users', value: stats?.totalUsers ?? '—' },
          { label: 'Candidates', value: stats?.candidates ?? '—' },
          { label: 'Employers', value: stats?.employers ?? '—' },
          { label: 'Active Jobs', value: stats?.activeJobs ?? '—' },
          { label: 'Applications', value: stats?.totalApplications ?? '—' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-brand-700">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Admin actions</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>View all registered users and their roles</li>
          <li>Monitor employer businesses and job listings</li>
          <li>Disable inappropriate or fake job posts (stretch)</li>
        </ul>
        <p className="mt-4 text-xs text-gray-500">
          Super admin accounts are created manually in Supabase — not via public registration.
        </p>
      </div>
    </div>
  );
}
