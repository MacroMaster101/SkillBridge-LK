import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { Badge, Card, EmptyState, Icon, PageHeader, InfoNote } from '../../../components/AppUI';

// TODO: Replace with API call — employer's own jobs
const PLACEHOLDER_JOBS = [];

function JobRow({ job }) {
  return (
    <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">{job.title}</h3>
          <Badge tone={job.status === 'ACTIVE' ? 'petrol' : 'quiet'}>{job.status || 'Active'}</Badge>
        </div>
        <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
          <Icon name="pin" size={14} />{job.location}
          <span className="opacity-40">·</span>{job.jobType}
          <span className="opacity-40">·</span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.07em]">
            {job.applicantCount ?? 0} {job.applicantCount === 1 ? 'applicant' : 'applicants'}
          </span>
        </p>
      </div>
      <Link to={`/employer/jobs/${job.id}/applicants`}>
        <Button variant="secondary" size="sm">Review applicants <Icon size={14} /></Button>
      </Link>
    </Card>
  );
}

export default function EmployerJobsPage() {
  const jobs = PLACEHOLDER_JOBS;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Your vacancies"
        title="Everything you have posted."
        lead="Open a vacancy to review its applicants and move them through your process."
        actions={<Link to="/employer/post-job"><Button>Post a vacancy <Icon size={15} /></Button></Link>}
      />

      <InfoNote>
        Sample view — your real vacancies appear here once posting is connected to the API.
      </InfoNote>

      {jobs.length === 0 ? (
        <EmptyState
          icon="briefcase"
          title="No vacancies yet."
          message="Post a role with the skills it needs, and candidates will be matched against it automatically."
          action={<Link to="/employer/post-job"><Button size="sm">Post your first vacancy</Button></Link>}
        />
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => <JobRow key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}
