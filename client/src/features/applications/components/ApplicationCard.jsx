import StatusBadge from '../../../components/StatusBadge';

export default function ApplicationCard({ application }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
          <p className="text-sm text-gray-500">{application.company}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      <p className="mt-3 text-sm text-gray-500">
        Applied: {application.appliedAt}
      </p>
      {application.matchPercentage != null && (
        <p className="mt-1 text-sm text-gray-600">
          Skill match: {application.matchPercentage}%
        </p>
      )}
    </div>
  );
}
