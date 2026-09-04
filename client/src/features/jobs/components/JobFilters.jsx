import { Link } from 'react-router-dom';
import MatchBadge from '../components/MatchBadge';
import Button from '../../../components/Button';
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES } from '../../../constants';

export default function JobFilters({ onFilterChange }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-gray-900">Filters</h3>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            placeholder="Job title or company..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            onChange={(e) => onFilterChange?.({ search: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            onChange={(e) => onFilterChange?.({ category: e.target.value })}
          >
            <option value="">All categories</option>
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            onChange={(e) => onFilterChange?.({ jobType: e.target.value })}
          >
            <option value="">All types</option>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Work Mode</label>
          <select
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            onChange={(e) => onFilterChange?.({ workMode: e.target.value })}
          >
            <option value="">All modes</option>
            {WORK_MODES.map((mode) => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function JobCard({ job }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        {job.matchPercentage != null && (
          <MatchBadge percentage={job.matchPercentage} />
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
        <span className="rounded bg-gray-100 px-2 py-1">{job.category}</span>
        <span className="rounded bg-gray-100 px-2 py-1">{job.jobType}</span>
        <span className="rounded bg-gray-100 px-2 py-1">{job.location}</span>
        <span className="rounded bg-gray-100 px-2 py-1">{job.workMode}</span>
      </div>
      {job.skills?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {job.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="rounded bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
              {skill}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4">
        <Link to={`/jobs/${job.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
