import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { Card, ErrorNote, Icon, PageHeader, Panel, SectionCard, StatCard } from '../../../components/AppUI';
import api from '../../../services/api';

const ADMIN_ACTIONS = [
  'Review registered users and the role each one holds',
  'Monitor employer businesses and their published vacancies',
  'Take down inappropriate or fake listings',
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Could not load platform stats.'))
      .finally(() => setLoading(false));
  }, []);

  const tiles = [
    { label: 'Total users', value: stats?.totalUsers },
    { label: 'Candidates', value: stats?.candidates },
    { label: 'Employers', value: stats?.employers },
    { label: 'Active vacancies', value: stats?.activeJobs },
    { label: 'Applications', value: stats?.totalApplications },
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Platform admin"
        title="How SkillBridge LK is being used."
        lead="A read-only view of accounts, vacancies and applications across the platform."
      />

      {loading && <LoadingSpinner className="py-16" size="lg" />}

      {!loading && error && (
        <ErrorNote>
          {error} Check that you are signed in as an admin and the API is reachable.
        </ErrorNote>
      )}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tiles.map((tile) => <StatCard key={tile.label} {...tile} />)}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard title="What an admin can do">
          <ul className="flex flex-col gap-3">
            {ADMIN_ACTIONS.map((action) => (
              <li key={action} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <Icon name="check" size={16} className="mt-0.5 flex-none text-petrol" />
                {action}
              </li>
            ))}
          </ul>
        </SectionCard>

        <Panel rail="Account security" foot="Admin accounts are provisioned manually">
          <p className="text-sm leading-relaxed text-paper/80">
            Admin accounts are created directly in Supabase and cannot be obtained through public
            registration. There is no self-service path to this role.
          </p>
          <p className="mt-4 flex items-start gap-2.5 rounded border border-paper/15 bg-white/5 px-3.5 py-3 text-[0.8rem] leading-relaxed text-paper/70">
            <Icon name="spark" size={15} className="mt-0.5 flex-none text-marigold" />
            The service role key stays on the backend. This dashboard only ever reads through the
            authenticated API.
          </p>
        </Panel>
      </div>

      <Card className="p-6">
        <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">Moderation</h2>
        <p className="mt-1.5 max-w-2xl text-sm text-ink-soft">
          Listing takedown and user management are not built yet. They are the stretch goals for this
          role, deliberately left out of the MVP scope.
        </p>
      </Card>
    </div>
  );
}
