import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { Badge, Card, EmptyState, ErrorNote, Icon, PageHeader } from '../../../components/AppUI';
import { employerService } from '../services/employerService';

function JobRow({ job }) {
  return (
    <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">{job.title}</h3>
          <Badge tone={job.status === 'ACTIVE' ? 'petrol' : 'quiet'}>{job.status || 'Active'}</Badge>
        </div>
        <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.07em] text-ink-soft">
          {job.applicantCount ?? 0} {job.applicantCount === 1 ? 'applicant' : 'applicants'}
        </p>
      </div>
      <Link to={`/employer/jobs/${job.id}/applicants`}>
        <Button variant="secondary" size="sm">Review applicants <Icon size={14} /></Button>
      </Link>
    </Card>
  );
}

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employerService.getMe()
      .then((res) => setJobs(res.data?.jobs || []))
      .catch((err) => {
        if (err.response?.status === 404) {
          setJobs([]);
          return;
        }
        setError(err.response?.data?.error || 'Could not load your vacancies.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner className="py-16" size="lg" />;
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Your vacancies"
        title="Everything you have posted."
        lead="Open a vacancy to review its applicants and move them through your process."
        actions={<Link to="/employer/post-job"><Button>Post a vacancy <Icon size={15} /></Button></Link>}
      />

      {error && <ErrorNote>{error}</ErrorNote>}

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
