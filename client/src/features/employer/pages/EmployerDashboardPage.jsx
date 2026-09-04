import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  Badge, Card, EmptyState, ErrorNote, Icon, InfoNote, PageHeader, Panel, SectionCard, StatCard, TextLink,
} from '../../../components/AppUI';
import { employerService } from '../services/employerService';

const MATCH_NOTES = [
  'List only the skills the role genuinely needs',
  'Applicants sort by match so you can review the closest first',
  'Status changes are visible on the candidate dashboard',
];

function JobPreview({ job }) {
  return (
    <Card className="flex flex-wrap items-center justify-between gap-4 p-4">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-bold text-ink">{job.title}</h3>
          <Badge tone={job.status === 'ACTIVE' ? 'petrol' : 'quiet'}>{job.status}</Badge>
        </div>
        <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.07em] text-ink-soft">
          {job.applicantCount ?? 0} {job.applicantCount === 1 ? 'applicant' : 'applicants'}
        </p>
      </div>
      <Link to={`/employer/jobs/${job.id}/applicants`}>
        <Button variant="secondary" size="sm">Review</Button>
      </Link>
    </Card>
  );
}

export default function EmployerDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employerService.getMe()
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.response?.status === 404) {
          setData(null);
          return;
        }
        setError(err.response?.data?.error || 'Could not load your dashboard.');
      })
      .finally(() => setLoading(false));
  }, []);

  const jobs = data?.jobs || [];
  const awaitingReview = jobs.reduce((sum, job) => sum + (job.applicantCount || 0), 0);

  const stats = [
    { label: 'Open vacancies', value: data?.activeJobsCount },
    { label: 'Applications received', value: data?.totalApplications },
    { label: 'Awaiting your review', value: awaitingReview },
  ];

  if (loading) {
    return <LoadingSpinner className="py-16" size="lg" />;
  }

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Your dashboard"
        title="Your vacancies and who applied."
        lead="Post a role, see applicants ranked by skill match, and keep everyone informed."
        actions={
          <>
            <Link to="/employer/setup"><Button variant="secondary">Business profile</Button></Link>
            <Link to="/employer/post-job"><Button>Post a vacancy <Icon size={15} /></Button></Link>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      {!data && !error && (
        <InfoNote>
          Set up your business profile first, then you can post vacancies and review applicants.
          <Link to="/employer/setup" className="ml-1 font-semibold underline">Set up now</Link>
        </InfoNote>
      )}

      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <SectionCard
              title="Your vacancies"
              action={<TextLink to="/employer/jobs">Manage all <Icon size={16} /></TextLink>}
            >
              {jobs.length === 0 ? (
                <EmptyState
                  icon="briefcase"
                  title="No vacancies posted."
                  message="List the skills a role actually needs, and applicants arrive sorted by how closely they match."
                  action={<Link to="/employer/post-job"><Button size="sm">Post your first vacancy</Button></Link>}
                />
              ) : (
                <div className="grid gap-3">
                  {jobs.slice(0, 5).map((job) => <JobPreview key={job.id} job={job} />)}
                </div>
              )}
            </SectionCard>

            <Panel rail="How matching works" foot="A match is skill overlap, not a hiring decision">
              <p className="text-sm leading-relaxed text-paper/80">
                Every applicant is scored against the skills you list on the vacancy:
              </p>
              <p className="my-4 rounded border border-paper/15 bg-white/5 px-3.5 py-3 text-center font-mono text-[0.62rem] leading-relaxed text-marigold">
                matched skills / required skills x 100
              </p>
              <ul className="flex flex-col gap-2.5 text-sm text-paper/80">
                {MATCH_NOTES.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <Icon name="check" size={15} className="mt-1 flex-none text-marigold" />
                    {line}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </>
      )}

      <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
            Keep candidates in the loop.
          </h2>
          <p className="mt-1.5 text-sm text-ink-soft">
            Moving an application through review, shortlisted, hired or rejected updates the
            candidate&apos;s dashboard straight away.
          </p>
        </div>
        <Link to="/employer/jobs"><Button variant="secondary">Review applicants <Icon size={15} /></Button></Link>
      </Card>
    </div>
  );
}
