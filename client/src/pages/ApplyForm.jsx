import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCandidate } from '../lib/candidateStorage';
import { supabase } from '../lib/supabaseClient';
import { mockJobs } from '../data/mockJobs';

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidate = getCandidate();
  const job = mockJobs.find(j => j.id === id);

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <h1>Job Not Found</h1>
        <button className="btn" onClick={() => navigate('/')}>Back to Jobs</button>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};

    if (message.trim() && message.trim().length < 10) {
      newErrors.message = 'Say a bit more, or leave this blank.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const applicationData = {
        job_id: job.id,
        candidate_name: candidate.name,
        message: message.trim() || null,
        status: 'Applied'
      };

      if (supabase) {
        const { error } = await supabase
          .from('applications')
          .insert([applicationData]);

        if (error) throw error;
      } else {
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        applications.push({
          ...applicationData,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        });
        localStorage.setItem('applications', JSON.stringify(applications));
      }

      setSubmitted(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <h1 style={{ color: 'var(--color-excellent)' }}>Application submitted successfully!</h1>
        <p style={{ color: 'var(--color-muted)' }}>Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '700px', paddingTop: '40px', paddingBottom: '40px' }}>
      <button
        className="btn"
        style={{ marginBottom: '24px', background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-border)', cursor: 'pointer' }}
        onClick={() => navigate(`/jobs/${job.id}`)}
      >
        ← Back to Job
      </button>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0' }}>Apply Now</h1>
        <p style={{ margin: '0', color: 'var(--color-muted)' }}>Submit your application for {job.title} at {job.company}</p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: '0', marginBottom: '20px', fontSize: '1.1rem' }}>Job Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--color-muted)', fontSize: '0.85rem' }}>POSITION</p>
            <p style={{ margin: '0', fontWeight: 600 }}>{job.title}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--color-muted)', fontSize: '0.85rem' }}>COMPANY</p>
            <p style={{ margin: '0', fontWeight: 600 }}>{job.company}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--color-muted)', fontSize: '0.85rem' }}>LOCATION</p>
            <p style={{ margin: '0', fontWeight: 600 }}>{job.location}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px 0', color: 'var(--color-muted)', fontSize: '0.85rem' }}>JOB TYPE</p>
            <p style={{ margin: '0', fontWeight: 600 }}>{job.job_type}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: '0', marginBottom: '20px', fontSize: '1.1rem' }}>Application</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Your Name</label>
            <input
              type="text"
              value={candidate?.name || ''}
              disabled
              style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
              Cover Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the employer why you're a great fit for this role..."
              style={{ minHeight: '140px', padding: '10px' }}
            />
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
              Minimum 10 characters if filled
            </p>
            {errors.message && <div className="field-error">{errors.message}</div>}
          </div>

          {errors.submit && <div className="field-error">{errors.submit}</div>}

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              className="btn"
              onClick={() => navigate(`/jobs/${job.id}`)}
              style={{ background: 'var(--color-border)', color: 'var(--color-text)', flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              disabled={isSubmitting}
              style={{
                flex: 1,
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
