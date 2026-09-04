import { Badge } from './AppUI';

/* Match is skill overlap, so the label describes the overlap rather than
   implying a verdict on the candidate. */
function describe(percent) {
  if (percent >= 80) return 'Strong match';
  if (percent >= 60) return 'Good match';
  if (percent >= 40) return 'Partial match';
  return 'Early match';
}

export default function MatchBadge({ percent = 0 }) {
  const tone = percent >= 60 ? 'petrol' : percent >= 40 ? 'marigold' : 'quiet';
  return <Badge tone={tone}>{percent}% · {describe(percent)}</Badge>;
}
