import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import MatchBadge from '../../../components/MatchBadge';
import { Badge, Card, EmptyState, ErrorNote, Icon, PageHeader } from '../../../components/AppUI';
import { jobService } from '../services/jobService';
import { candidateService } from '../../onboarding/services/candidateService';
import { enrichJob } from '../../../lib/jobDisplay';
import { scoreJobsForCandidate } from '../../../lib/skillMatch';

function RecommendedJobCard({ job }) {
  const matched = job.matchedSkills || [];

  return (
    <Card className="p-5 transition-transform hover:-translate-y-0.5 hover:border-ink">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-soft">{job.company}</p>
          <h3 className="mt-1 font-display text-lg font-bold tracking-[-0.02em] text-ink">
            <Link to={`/jobs/${job.id}`} className="hover:text-petrol">{job.title}</Link>
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft">
            <Icon name="pin" size={14} />{job.location || '—'}
            {job.workMode && <><span className="opacity-40">·</span>{job.workMode}</>}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <MatchBadge percent={job.matchPercentage} />
          <Badge tone="ink">{job.jobType}</Badge>
        </div>
      </div>

      {(job.skills || []).length > 0 && (
        <>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className={`rounded-[3px] px-2 py-1 font-mono text-[0.6rem] ${
                  matched.includes(skill)
                    ? 'bg-petrol-light text-petrol'
                    : 'border border-dashed border-line-strong text-ink-soft'
                }`}
              >
                {matched.includes(skill) ? '✓ ' : '+ '}{skill}
              </span>
            ))}
          </div>

          <p className="mt-3.5 border-t border-dashed border-line-strong pt-3 font-mono text-[0.56rem] uppercase tracking-[0.07em] text-ink-soft">
            {matched.length} of {job.skills.length} skills matched
          </p>
        </>
      )}
    </Card>
  );
}

export default function RecommendedJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      jobService.getAll(),
      candidateService.getMe().catch(() => null),
    ])
      .then(([jobsRes, profileRes]) => {
        const candidateSkills = (profileRes?.data?.skills || []).map((s) => s.name);
        const scored = scoreJobsForCandidate((jobsRes.data || []).map(enrichJob), candidateSkills);
        setJobs(scored);
      })
      .catch(() => setError('Could not load recommendations.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner className="py-16" size="lg" />;
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Matched for you"
        title="Roles that fit what you can do."
        lead="Sorted by how much of each role's required skills your profile already covers."
        actions={<Link to="/candidate/onboarding"><Button variant="secondary">Edit my skills</Button></Link>}
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      {jobs.length === 0 ? (
        <EmptyState
          icon="spark"
          title="Nothing matched yet."
          message="Add skills to your profile and active vacancies will appear here, ranked by overlap."
          action={<Link to="/candidate/onboarding"><Button size="sm">Add my skills</Button></Link>}
        />
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => <RecommendedJobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}
