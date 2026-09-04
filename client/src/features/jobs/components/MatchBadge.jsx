export default function MatchBadge({ percentage }) {
  let colorClass = 'bg-red-100 text-red-800';
  if (percentage >= 70) colorClass = 'bg-green-100 text-green-800';
  else if (percentage >= 40) colorClass = 'bg-yellow-100 text-yellow-800';

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}>
      {percentage}% Match
    </span>
  );
}
