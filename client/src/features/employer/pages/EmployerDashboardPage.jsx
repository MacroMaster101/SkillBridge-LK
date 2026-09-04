import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { Card, EmptyState, Icon, PageHeader, Panel, SectionCard, StatCard, TextLink } from '../../../components/AppUI';

// TODO: Fetch from API — employer jobs and application counts
const STATS = [
  { label: 'Open vacancies', value: null },
  { label: 'Applications received', value: null },
  { label: 'Awaiting your review', value: null },
];

const MATCH_NOTES = [
  'List only the skills the role genuinely needs',
  'Applicants sort by match so you can review the closest first',
  'Status changes are visible on the candidate dashboard',
];

export default function EmployerDashboardPage() {
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

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard
          title="Your vacancies"
          action={<TextLink to="/employer/jobs">Manage all <Icon size={16} /></TextLink>}
        >
          <EmptyState
            icon="briefcase"
            title="No vacancies posted."
            message="List the skills a role actually needs, and applicants arrive sorted by how closely they match."
            action={<Link to="/employer/post-job"><Button size="sm">Post your first vacancy</Button></Link>}
          />
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
