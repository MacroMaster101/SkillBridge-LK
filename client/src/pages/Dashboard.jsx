import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCandidate } from '../lib/candidateStorage';
import { supabase } from '../lib/supabaseClient';
import StatusBadge from '../components/StatusBadge';
import { mockJobs } from '../data/mockJobs';

export default function Dashboard() {
  const navigate = useNavigate();
  const candidate = getCandidate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('applications')
            .select('*')
            .eq('candidate_name', candidate.name);

          if (error) throw error;
          setApplications(data || []);
        } else {
          const stored = JSON.parse(localStorage.getItem('applications') || '[]');
          const filtered = stored.filter(app => app.candidate_name === candidate.name);
          setApplications(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (candidate) {
      fetchApplications();
    }
  }, [candidate]);

  const getJobTitle = (jobId) => {
    const job = mockJobs.find(j => j.id === jobId);
    return job?.title || 'Unknown Job';
  };

  const getJobCompany = (jobId) => {
    const job = mockJobs.find(j => j.id === jobId);
    return job?.company || 'Unknown Company';
  };

  const stats = [
    { label: 'Total Applications', value: applications.length },
    { label: 'Under Review', value: applications.filter(a => a.status === 'Under Review').length },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'Shortlisted').length },
  ];

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0' }}>My Applications</h1>
        <p style={{ margin: '0', color: 'var(--color-muted)' }}>Track your job applications and their status.</p>
      </div>

      {applications.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {stats.map((stat) => (
            <div key={stat.label} className="card" style={{ textAlign: 'center', padding: '24px' }}>
              <p style={{ margin: '0 0 8px 0', color: 'var(--color-muted)', fontSize: '0.9rem' }}>{stat.label}</p>
              <p style={{ margin: '0', fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', margin: '0 0 24px 0' }}>
            You haven't applied to any jobs yet.
          </p>
          <button className="btn" onClick={() => navigate('/')}>
            Browse Jobs
          </button>
        </div>
      ) : (
        <div>
          {applications.map((app) => (
            <div key={app.id} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/jobs/${app.job_id}`)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{getJobTitle(app.job_id)}</h3>
                  <p style={{ margin: '0', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                    {getJobCompany(app.job_id)}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </div>
              {app.message && (
                <p style={{ margin: '12px 0', fontSize: '0.9rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>
                  "{app.message}"
                </p>
              )}
              <p style={{ margin: '0', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                Applied: {new Date(app.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
