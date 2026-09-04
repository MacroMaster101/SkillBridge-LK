import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import StatusBadge from '../../../components/StatusBadge';
import MatchBadge from '../../../components/MatchBadge';
import { Card, EmptyState, ErrorNote, Icon, PageHeader } from '../../../components/AppUI';
import { APPLICATION_STATUSES, STATUS_LABELS } from '../../../constants';
import { jobService } from '../../jobs/services/jobService';
import { applicationService } from '../../applications/services/applicationService';

function ApplicantCard({ applicant, onStatusChange, updatingId }) {
  const matched = applicant.matchedSkills || [];
  const jobSkills = applicant.jobSkills || [];
  const missing = jobSkills.filter((skill) => !matched.includes(skill));

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-chip-lavender font-display text-base font-extrabold text-ink">
            {applicant.name.charAt(0)}
          </span>
          <div>
            <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">{applicant.name}</h3>
            <p className="mt-0.5 text-sm text-ink-soft">
              {applicant.userType}{applicant.education ? ` · ${applicant.education}` : ''}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <MatchBadge percent={applicant.matchPercentage} />
          <StatusBadge status={applicant.status} />
        </div>
      </div>

      {jobSkills.length > 0 && (
        <>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {matched.map((skill) => (
              <span key={skill} className="rounded-[3px] bg-petrol-light px-2 py-1 font-mono text-[0.6rem] text-petrol">
                ✓ {skill}
              </span>
            ))}
            {missing.map((skill) => (
              <span key={skill} className="rounded-[3px] border border-dashed border-line-strong px-2 py-1 font-mono text-[0.6rem] text-ink-soft">
                + {skill}
              </span>
            ))}
          </div>

          <p className="mt-3 font-mono text-[0.56rem] uppercase tracking-[0.07em] text-ink-soft">
            {matched.length} of {jobSkills.length} required skills matched
          </p>
        </>
      )}

      <div className="mt-5 border-t border-dashed border-line-strong pt-4">
        <p className="mb-2.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-ink-soft">
          Move to
        </p>
        <div className="flex flex-wrap gap-2">
          {APPLICATION_STATUSES.map((status) => (
            <Button
              key={status}
              size="sm"
              variant={applicant.status === status ? 'signal' : 'secondary'}
              onClick={() => onStatusChange(applicant.id, status)}
              disabled={applicant.status === status || updatingId === applicant.id}
            >
              {STATUS_LABELS[status] || status}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function ApplicantsPage() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    jobService.getApplicants(jobId)
      .then((res) => setApplicants(res.data || []))
      .catch((err) => setError(err.response?.data?.error || 'Could not load applicants.'))
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    setError('');
    try {
      await applicationService.updateStatus(id, status);
      setApplicants((current) => current.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch (err) {
      setError(err.response?.data?.error || 'Could not update application status.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner className="py-16" size="lg" />;
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow={`Vacancy #${jobId}`}
        title="Who applied."
        lead="Sorted by skill match. Changing a status updates the candidate's dashboard straight away."
        actions={<Link to="/employer/jobs"><Button variant="secondary">← All vacancies</Button></Link>}
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      {applicants.length === 0 ? (
        <EmptyState
          icon="people"
          title="No applications yet."
          message="Share the vacancy and check back — applicants will appear here ranked by how closely their skills match."
        />
      ) : (
        <div className="grid gap-4">
          {applicants
            .slice()
            .sort((a, b) => b.matchPercentage - a.matchPercentage)
            .map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onStatusChange={handleStatusChange}
                updatingId={updatingId}
              />
            ))}
        </div>
      )}
    </div>
  );
}
