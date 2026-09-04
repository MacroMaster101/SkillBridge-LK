import { STATUS_LABELS } from '../constants';

const statusStyles = {
  APPLIED: 'bg-blue-100 text-blue-800',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-800',
  SHORTLISTED: 'bg-purple-100 text-purple-800',
  REJECTED: 'bg-red-100 text-red-800',
  HIRED: 'bg-green-100 text-green-800',
};

export default function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] || status;
  const style = statusStyles[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}
