import { useParams, useNavigate } from 'react-router-dom';
import { getCandidate } from '../lib/candidateStorage';
import { calculateSkillMatch } from '../utils/matchSkills';
import { mockJobs } from '../data/mockJobs';
import MatchBadge from '../components/MatchBadge';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidate = getCandidate();
  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <h1>Job Not Found</h1>
        <button className="btn" onClick={() => navigate('/')}>Back to Jobs</button>
      </div>
    );
  }

  const jobSkills = job.required_skills.split(',').map(s => s.trim());
  const matchPercent = candidate?.skills
    ? calculateSkillMatch(candidate.skills, jobSkills)
    : 0;

  const matchedSkills = candidate?.skills
    ? jobSkills.filter(skill =>
        candidate.skills.some(cs => cs.toLowerCase() === skill.toLowerCase())
      )
    : [];

  const missingSkills = jobSkills.filter(skill => !matchedSkills.includes(skill));

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <button
        className="btn"
        style={{ marginBottom: '24px', background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-border)', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        ← Back to Jobs
      </button>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0' }}>{job.title}</h1>
            <p style={{ margin: '0', color: 'var(--color-muted)', fontSize: '1.1rem' }}>{job.company}</p>
          </div>
          <MatchBadge percent={matchPercent} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--color-muted)', fontSize: '0.85rem', fontWeight: 500 }}>LOCATION</p>
            <p style={{ margin: '0', fontWeight: 600 }}>{job.location}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--color-muted)', fontSize: '0.85rem', fontWeight: 500 }}>JOB TYPE</p>
            <p style={{ margin: '0', fontWeight: 600 }}>{job.job_type}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--color-muted)', fontSize: '0.85rem', fontWeight: 500 }}>WORK MODE</p>
            <p style={{ margin: '0', fontWeight: 600 }}>{job.work_mode}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--color-muted)', fontSize: '0.85rem', fontWeight: 500 }}>CATEGORY</p>
            <p style={{ margin: '0', fontWeight: 600 }}>{job.category}</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '16px', fontSize: '1.1rem' }}>About This Role</h2>
        <p style={{ lineHeight: '1.6', color: 'var(--color-text)' }}>{job.description}</p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '16px', fontSize: '1.1rem' }}>Required Skills</h2>

        {matchedSkills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ margin: '0 0 12px 0', color: 'var(--color-excellent)', fontWeight: 500, fontSize: '0.95rem' }}>
              ✓ Your Skills ({matchedSkills.length}/{jobSkills.length})
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {matchedSkills.map(skill => (
                <span key={skill} style={{
                  background: 'var(--color-excellent)',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {missingSkills.length > 0 && (
          <div>
            <p style={{ margin: '0 0 12px 0', color: 'var(--color-muted)', fontWeight: 500, fontSize: '0.95rem' }}>
              Skills to Learn ({missingSkills.length}/{jobSkills.length})
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {missingSkills.map(skill => (
                <span key={skill} style={{
                  background: 'var(--color-border)',
                  color: 'var(--color-text)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          className="btn"
          onClick={() => navigate('/')}
          style={{ flex: 1, background: 'var(--color-border)', color: 'var(--color-text)' }}
        >
          Back to Results
        </button>
        <button
          className="btn"
          onClick={() => navigate(`/apply/${job.id}`)}
          style={{ flex: 1 }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
