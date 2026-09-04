import { matchLabel } from '../utils/matchSkills';

export default function MatchBadge({ percent }) {
  const label = matchLabel(percent);
  let badgeClass = 'badge-low';

  if (percent >= 80) badgeClass = 'badge-excellent';
  else if (percent >= 60) badgeClass = 'badge-good';
  else if (percent >= 40) badgeClass = 'badge-partial';

  return <span className={`badge ${badgeClass}`}>{percent}% {label}</span>;
}
