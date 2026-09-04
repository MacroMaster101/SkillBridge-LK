import { Badge } from './AppUI';
import { STATUS_LABELS } from '../constants';

const TONES = {
  APPLIED: 'quiet',
  UNDER_REVIEW: 'marigold',
  SHORTLISTED: 'petrol',
  REJECTED: 'madder',
  HIRED: 'petrol',
};

export default function StatusBadge({ status }) {
  const key = String(status || '').toUpperCase().replace(/ /g, '_');
  return <Badge tone={TONES[key] || 'quiet'}>{STATUS_LABELS[key] || status}</Badge>;
}
