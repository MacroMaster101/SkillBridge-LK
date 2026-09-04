import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCandidate } from '../lib/candidateStorage';
import { supabase } from '../lib/supabaseClient';
import { jobService } from '../features/jobs/services/jobService';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';

export default function Dashboard() {
  const candidate = getCandidate();
  const [applications, setApplications] = useState([]);
  const [jobsById, setJobsById] = useState({});
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
          const filtered = stored.filter((app) => app.candidate_name === candidate.name);
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

  useEffect(() => {
    jobService.getAll()
      .then((response) => {
        const map = {};
        response.data.forEach((job) => {
          map[job.id] = job;
        });
        setJobsById(map);
      })
      .catch(() => {});
  }, []);

  const getJobTitle = (jobId) => jobsById[jobId]?.title || 'Unknown Job';
  const getJobCompany = (jobId) => jobsById[jobId]?.company || 'Unknown Company';

  const stats = [
    { label: 'Total Applications', value: applications.length },
    { label: 'Under Review', value: applications.filter((a) => a.status === 'Under Review').length },
    { label: 'Shortlisted', value: applications.filter((a) => a.status === 'Shortlisted').length },
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading applications...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-2 text-gray-600">Track your job applications and their status.</p>
        </div>
        <Link to="/candidate-new/">
          <Button>Browse More Jobs</Button>
        </Link>
      </div>

      {applications.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold text-brand-700">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 space-y-4">
        {applications.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
            <Link to="/candidate-new/">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => { window.location.href = `/candidate-new/jobs/${app.job_id}`; }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{getJobTitle(app.job_id)}</h3>
                  <p className="text-sm text-gray-500 mt-1">{getJobCompany(app.job_id)}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
              {app.message && (
                <p className="mt-3 text-sm text-gray-600 italic">"{app.message}"</p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Applied: {new Date(app.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
