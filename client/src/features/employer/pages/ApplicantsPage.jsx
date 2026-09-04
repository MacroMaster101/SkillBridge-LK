import { useParams } from 'react-router-dom';
import StatusBadge from '../../../components/StatusBadge';
import Button from '../../../components/Button';
import { APPLICATION_STATUSES } from '../../../constants';

// TODO: Replace with API — GET /api/jobs/:jobId/applications
const PLACEHOLDER_APPLICANTS = [
  {
    id: 1,
    name: 'John Doe',
    userType: 'Undergraduate Student',
    education: 'BSc Computer Science',
    skills: ['React', 'JavaScript', 'CSS'],
    matchPercentage: 75,
    status: 'APPLIED',
  },
];

export default function ApplicantsPage() {
  const { jobId } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
      <p className="mt-2 text-gray-600">Review and manage applicants for job #{jobId}.</p>

      <div className="mt-8 space-y-4">
        {PLACEHOLDER_APPLICANTS.map((applicant) => (
          <div key={applicant.id} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{applicant.name}</h3>
                <p className="text-sm text-gray-500">{applicant.userType} · {applicant.education}</p>
              </div>
              <StatusBadge status={applicant.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {applicant.skills.map((skill) => (
                <span key={skill} className="rounded bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">Match: {applicant.matchPercentage}%</p>

            {/* TODO: Implement status update — PATCH /api/applications/:applicationId/status */}
            <div className="mt-4 flex flex-wrap gap-2">
              {APPLICATION_STATUSES.map((status) => (
                <Button key={status} variant="secondary" size="sm">
                  {status.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
