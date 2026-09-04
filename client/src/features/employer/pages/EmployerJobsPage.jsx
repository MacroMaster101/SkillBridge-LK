import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

// TODO: Replace with API call — GET employer jobs
const PLACEHOLDER_JOBS = [];

export default function EmployerJobsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
          <p className="mt-2 text-gray-600">Manage your active job listings.</p>
        </div>
        <Link to="/employer/post-job">
          <Button>Post New Job</Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {PLACEHOLDER_JOBS.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">No jobs posted yet.</p>
            <Link to="/employer/post-job" className="mt-4 inline-block">
              <Button>Create your first job</Button>
            </Link>
          </div>
        ) : (
          PLACEHOLDER_JOBS.map((job) => (
            <div key={job.id} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.applicantCount} applicants</p>
                </div>
                <Link to={`/employer/jobs/${job.id}/applicants`}>
                  <Button size="sm" variant="secondary">View Applicants</Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
