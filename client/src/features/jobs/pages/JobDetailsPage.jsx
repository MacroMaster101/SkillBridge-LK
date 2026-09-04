import { useParams, Link } from 'react-router-dom';
import Button from '../../../components/Button';
import MatchBadge from '../components/MatchBadge';
import SkillTag from '../components/SkillTag';

// TODO: Replace with API call — GET /api/jobs/:id
export default function JobDetailsPage() {
  const { id } = useParams();

  const job = {
    id,
    title: 'Frontend Development Intern',
    company: 'Pixel Lanka',
    category: 'Software / IT',
    jobType: 'Internship',
    location: 'Colombo',
    workMode: 'Hybrid',
    description: 'Join our team to build modern web applications using React. Great opportunity for undergraduates looking to gain real-world experience.',
    skills: ['React', 'JavaScript', 'CSS', 'Git'],
    matchedSkills: ['React', 'JavaScript', 'CSS'],
    missingSkills: ['Git'],
    matchPercentage: 75,
    deadline: '2026-10-01',
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/jobs" className="text-sm text-brand-600 hover:text-brand-700">
        ← Back to jobs
      </Link>

      <div className="mt-4 rounded-xl border bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="mt-1 text-gray-500">{job.company}</p>
          </div>
          <MatchBadge percentage={job.matchPercentage} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="rounded bg-gray-100 px-2 py-1">{job.category}</span>
          <span className="rounded bg-gray-100 px-2 py-1">{job.jobType}</span>
          <span className="rounded bg-gray-100 px-2 py-1">{job.location}</span>
          <span className="rounded bg-gray-100 px-2 py-1">{job.workMode}</span>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-gray-900">Description</h2>
          <p className="mt-2 text-gray-600">{job.description}</p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-gray-900">Required Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {job.matchedSkills.map((skill) => (
              <SkillTag key={skill} skill={skill} matched />
            ))}
            {job.missingSkills.map((skill) => (
              <SkillTag key={skill} skill={skill} matched={false} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          {/* TODO: Implement apply — POST /api/jobs/:jobId/apply */}
          <Button>Apply Now</Button>
          <p className="self-center text-sm text-gray-500">Deadline: {job.deadline}</p>
        </div>
      </div>
    </div>
  );
}
