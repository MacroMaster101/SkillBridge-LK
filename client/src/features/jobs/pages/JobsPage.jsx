import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import JobFilters, { JobCard } from '../components/JobFilters';

// TODO: Replace with API call — GET /api/jobs
const PLACEHOLDER_JOBS = [
  {
    id: 1,
    title: 'Frontend Development Intern',
    company: 'Pixel Lanka',
    category: 'Software / IT',
    jobType: 'Internship',
    location: 'Colombo',
    workMode: 'Hybrid',
    skills: ['React', 'JavaScript', 'CSS', 'Git'],
    matchPercentage: 80,
  },
  {
    id: 2,
    title: 'Junior Graphic Design Assistant',
    company: 'Creative Hub',
    category: 'Graphic Design',
    jobType: 'Part-time',
    location: 'Kandy',
    workMode: 'On-site',
    skills: ['Figma', 'Canva', 'Communication'],
    matchPercentage: 45,
  },
];

export default function JobsPage() {
  const [loading] = useState(false);
  const [jobs] = useState(PLACEHOLDER_JOBS);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
      <p className="mt-2 text-gray-600">Find opportunities that match your skills.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <JobFilters />
        </div>
        <div className="lg:col-span-3">
          {loading ? (
            <LoadingSpinner className="py-12" />
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No jobs found.</p>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
