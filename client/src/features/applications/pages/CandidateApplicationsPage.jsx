import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { EmptyState, ErrorNote, Icon, PageHeader } from '../../../components/AppUI';
import { applicationService } from '../services/applicationService';
import { formatPostedDate } from '../../../lib/jobDisplay';

export default function CandidateApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getMyApplications()
      .then((res) => setApplications(res.data || []))
      .catch((err) => setError(err.response?.data?.error || err.response?.data?.message || 'Could not load applications.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner className="py-16" size="lg" />;
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Your applications"
        title="Follow every application."
        lead="Each status change is set by the employer reviewing your application."
        actions={<Link to="/jobs"><Button variant="secondary">Find more roles <Icon size={15} /></Button></Link>}
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      {applications.length === 0 ? (
        <EmptyState
          icon="briefcase"
          title="No applications yet."
          message="When you apply to a role, it appears here so you can follow it from submitted through to a decision."
          action={<Link to="/jobs"><Button size="sm">Browse opportunities</Button></Link>}
        />
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={{
                ...application,
                appliedAt: formatPostedDate(application.appliedAt),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
