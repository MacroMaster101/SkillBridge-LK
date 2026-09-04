const statusMap = {
  'Applied': 'status-applied',
  'Under Review': 'status-under-review',
  'Shortlisted': 'status-shortlisted',
  'Rejected': 'status-rejected',
  'Hired': 'status-hired'
};

export default function StatusBadge({ status }) {
  const cssClass = statusMap[status] || 'status-applied';
  return <span className={`badge ${cssClass}`}>{status}</span>;
}
