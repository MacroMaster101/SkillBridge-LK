import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCandidate } from '../lib/candidateStorage';
import { calculateSkillMatch } from '../utils/matchSkills';
import { jobService } from '../features/jobs/services/jobService';
import Button from '../components/Button';
import MatchBadge from '../components/MatchBadge';

export default function JobDetails() {
  const { id } = useParams();
  const candidate = getCandidate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobService.getById(id)
      .then((response) => setJob(response.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading job...</p>
      </div>
    );
  }

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

  const jobSkills = job.skills || [];
  const matchPercent = candidate?.skills
    ? calculateSkillMatch(candidate.skills, jobSkills)
    : 0;

  const matchedSkills = candidate?.skills
    ? jobSkills.filter((skill) =>
        candidate.skills.some((cs) => cs.toLowerCase() === skill.toLowerCase()),
      )
    : [];

  const missingSkills = jobSkills.filter((skill) => !matchedSkills.includes(skill));

  return (
    <div>
      <Link to="/candidate-new/" className="text-sm text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
        ← Back to Jobs
      </Link>

      <div className="rounded-xl border bg-white p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-600 mt-2">{job.company}</p>
          </div>
          <MatchBadge percent={matchPercent} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">LOCATION</p>
            <p className="text-gray-900">{job.location}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">JOB TYPE</p>
            <p className="text-gray-900">{job.jobType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">WORK MODE</p>
            <p className="text-gray-900">{job.workMode}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">CATEGORY</p>
            <p className="text-gray-900">{job.category}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About This Role</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h2>

        {matchedSkills.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-green-600 mb-3">
              ✓ Your Skills ({matchedSkills.length}/{jobSkills.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1.5 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {missingSkills.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-3">
              Skills to Learn ({missingSkills.length}/{jobSkills.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Link to="/candidate-new/" className="flex-1">
          <Button variant="secondary" className="w-full">Back to Results</Button>
        </Link>
        <Link to={`/candidate-new/apply/${job.id}`} className="flex-1">
          <Button className="w-full">Apply Now</Button>
        </Link>
      </div>
    </div>
  );
}
