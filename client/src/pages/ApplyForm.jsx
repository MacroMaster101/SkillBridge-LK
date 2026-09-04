import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCandidate } from '../lib/candidateStorage';
import { supabase } from '../lib/supabaseClient';
import { mockJobs } from '../data/mockJobs';
import Button from '../components/Button';

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
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Job Not Found</h1>
        <Link to="/candidate-new/">
          <Button className="mt-4">Back to Jobs</Button>
        </Link>
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
        navigate('/candidate-new/dashboard');
      }, 1000);
    } catch (error) {
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-green-600">Application submitted successfully!</h1>
        <p className="text-gray-600 mt-2">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to={`/candidate-new/jobs/${job.id}`} className="text-sm text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
        ← Back to Job
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">Apply Now</h1>
      <p className="mt-2 text-gray-600">Submit your application for {job.title} at {job.company}</p>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Job Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">POSITION</p>
            <p className="text-gray-900">{job.title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">COMPANY</p>
            <p className="text-gray-900">{job.company}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">LOCATION</p>
            <p className="text-gray-900">{job.location}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">JOB TYPE</p>
            <p className="text-gray-900">{job.job_type}</p>
          </div>
        </div>
      </div>

      <form className="mt-8 space-y-4 rounded-xl border bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold">Your Application</h2>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            value={candidate?.name || ''}
            disabled
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Cover Message (Optional)</label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Tell the employer why you're a great fit for this role..."
          />
          <p className="text-xs text-gray-500">Minimum 10 characters if filled</p>
          {errors.message && <p className="text-xs text-red-600">{errors.message}</p>}
        </div>

        {errors.submit && <p className="text-xs text-red-600">{errors.submit}</p>}

        <div className="flex justify-end gap-3 pt-4">
          <Link to={`/candidate-new/jobs/${job.id}`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  );
}
