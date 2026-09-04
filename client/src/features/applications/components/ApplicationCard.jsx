import StatusBadge from '../../../components/StatusBadge';
import MatchBadge from '../../../components/MatchBadge';
import { Card } from '../../../components/AppUI';

export default function ApplicationCard({ application }) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-soft">
            {application.company}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold tracking-[-0.02em] text-ink">
            {application.jobTitle}
          </h3>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-dashed border-line-strong pt-3.5">
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.07em] text-ink-soft">
          Applied {application.appliedAt}
        </span>
        {application.matchPercentage != null && (
          <MatchBadge percent={application.matchPercentage} />
        )}
      </div>
    </Card>
  );
}
