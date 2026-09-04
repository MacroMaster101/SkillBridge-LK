import { useNavigate } from 'react-router-dom';
import MatchBadge from './MatchBadge';

export default function JobCard({ job, matchPercent }) {
  const navigate = useNavigate();

  return (
    <div className="card job-card" onClick={() => navigate(`/jobs/${job.id}`)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{job.title}</h3>
          <p style={{ margin: '0 0 8px 0', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            {job.company} • {job.location}
          </p>
        </div>
        <MatchBadge percent={matchPercent} />
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.85rem', color: 'white', background: 'var(--color-muted)', padding: '4px 8px', borderRadius: '4px' }}>
          {job.category}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'white', background: 'var(--color-muted)', padding: '4px 8px', borderRadius: '4px' }}>
          {job.job_type}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'white', background: 'var(--color-muted)', padding: '4px 8px', borderRadius: '4px' }}>
          {job.work_mode}
        </span>
      </div>
      <p style={{ margin: '0', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
        Posted: {new Date(job.posted_date).toLocaleDateString()}
      </p>
    </div>
  );
}
