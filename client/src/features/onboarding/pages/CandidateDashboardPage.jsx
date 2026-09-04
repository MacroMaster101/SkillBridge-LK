import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { Card, EmptyState, Icon, PageHeader, Panel, SectionCard, StatCard, TextLink } from '../../../components/AppUI';

// TODO: Fetch from API — GET /api/applications/me and /api/candidates/me/recommendations
const STATS = [
  { label: 'Applications sent', value: null },
  { label: 'Under review', value: null },
  { label: 'Roles matched', value: null },
];

export default function CandidateDashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Your dashboard"
        title="Where you stand today."
        lead="Your applications, your matches, and the skills worth adding next."
        actions={
          <>
            <Link to="/jobs"><Button variant="secondary">Browse jobs</Button></Link>
            <Link to="/candidate/onboarding"><Button>Complete profile <Icon size={15} /></Button></Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard
          title="Matched for you"
          action={<TextLink to="/candidate/recommended">See all <Icon size={16} /></TextLink>}
        >
          <EmptyState
            icon="spark"
            title="No matches yet."
            message="Add your skills and preferences, and roles will start appearing here ranked by how much of each one you already cover."
            action={<Link to="/candidate/onboarding"><Button size="sm">Add my skills</Button></Link>}
          />
        </SectionCard>

        <Panel rail="Your profile" foot="Match percentages come from the skills on your profile">
          <div className="flex items-center gap-3 border-b border-dashed border-paper/20 pb-4">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-marigold font-display text-base font-extrabold text-ink">
              ✳
            </span>
            <div>
              <strong className="block text-[0.95rem] font-semibold">Profile strength</strong>
              <span className="mt-0.5 block font-mono text-[0.58rem] uppercase tracking-[0.06em] text-paper/50">
                Early-career · Sri Lanka
              </span>
            </div>
          </div>

          <p className="mt-4 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-paper/50">
            Next steps
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {[
              ['Add your skills', '/candidate/onboarding'],
              ['Set your job preferences', '/candidate/onboarding'],
              ['Browse and apply', '/jobs'],
            ].map(([label, to], index) => (
              <li key={label}>
                <Link to={to} className="flex items-center gap-3 text-sm text-paper/85 hover:text-marigold">
                  <span className="grid h-5 w-5 flex-none place-items-center rounded-full border border-paper/30 font-mono text-[0.55rem]">
                    {index + 1}
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
            Track every application in one place.
          </h2>
          <p className="mt-1.5 text-sm text-ink-soft">
            Applied, under review, shortlisted — you will see each change as the employer makes it.
          </p>
        </div>
        <Link to="/candidate/applications">
          <Button variant="secondary">My applications <Icon size={15} /></Button>
        </Link>
      </Card>
    </div>
  );
}
