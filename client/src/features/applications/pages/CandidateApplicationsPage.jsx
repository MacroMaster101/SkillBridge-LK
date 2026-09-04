import { Link } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import Button from '../../../components/Button';
import { EmptyState, Icon, PageHeader, InfoNote } from '../../../components/AppUI';

// TODO: Replace with API call — GET /api/applications/me
const PLACEHOLDER_APPLICATIONS = [
  {
    id: 1,
    jobTitle: 'Frontend Development Intern',
    company: 'Pixel Lanka',
    status: 'UNDER_REVIEW',
    appliedAt: '04 Sep 2026',
    matchPercentage: 80,
  },
];

export default function CandidateApplicationsPage() {
  const applications = PLACEHOLDER_APPLICATIONS;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Your applications"
        title="Follow every application."
        lead="Each status change is set by the employer reviewing your application."
        actions={<Link to="/jobs"><Button variant="secondary">Find more roles <Icon size={15} /></Button></Link>}
      />

      <InfoNote>
        Sample data — this list will fill in once applications are connected to the API.
      </InfoNote>

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
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
}
