import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCandidate } from '../lib/candidateStorage';
import { calculateSkillMatch } from '../utils/matchSkills';
import { mockJobs } from '../data/mockJobs';
import MatchBadge from '../components/MatchBadge';

export default function JobFeed() {
  const navigate = useNavigate();
  const candidate = getCandidate();
  const [jobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedWorkMode, setSelectedWorkMode] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const categories = [...new Set(jobs.map(j => j.category))];
  const jobTypes = [...new Set(jobs.map(j => j.job_type))];
  const workModes = [...new Set(jobs.map(j => j.work_mode))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    const matchesJobType = !selectedJobType || job.job_type === selectedJobType;
    const matchesWorkMode = !selectedWorkMode || job.work_mode === selectedWorkMode;
    const matchesLocation = !selectedLocation || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesCategory && matchesJobType && matchesWorkMode && matchesLocation;
  });

  const getMatchPercent = (job) => {
    if (!candidate || !candidate.skills) return 0;
    const jobSkills = job.required_skills.split(',');
    return calculateSkillMatch(candidate.skills, jobSkills);
  };

  const stats = [
    { label: 'Available Jobs', value: filteredJobs.length },
    { label: 'Your Skills', value: candidate?.skills?.length || 0 },
    { label: 'Preferred Categories', value: candidate?.preferredCategories?.length || 0 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Your Next Opportunity</h1>
          <p className="mt-2 text-gray-600">Browse and apply to jobs tailored to your skills and preferences.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-paper-2 bg-white shadow-sm p-6">
            <p className="text-sm text-ink-soft">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-petrol">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-paper-2 bg-paper-light shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold font-display text-ink mb-4">Search & Filter</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-lg border border-paper-2 px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-petrol"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-lg border border-paper-2 px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-petrol"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="block w-full rounded-lg border border-paper-2 px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-petrol"
            >
              <option value="">All Job Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="block w-full rounded-lg border border-paper-2 px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-petrol"
            >
              <option value="">All Work Modes</option>
              {workModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="block w-full rounded-lg border border-paper-2 px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-petrol"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div
              key={job.id}
              className="rounded-xl border border-paper-2 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow p-6"
              onClick={() => navigate(`/candidate-new/jobs/${job.id}`)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold font-display text-ink">{job.title}</h3>
                  <p className="text-sm text-ink-soft mt-1">{job.company} • {job.location}</p>
                </div>
                <MatchBadge percent={getMatchPercent(job)} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-block text-xs font-medium bg-petrol-soft text-petrol-ink px-2 py-1 rounded">
                  {job.category}
                </span>
                <span className="inline-block text-xs font-medium bg-petrol-soft text-petrol-ink px-2 py-1 rounded">
                  {job.job_type}
                </span>
                <span className="inline-block text-xs font-medium bg-petrol-soft text-petrol-ink px-2 py-1 rounded">
                  {job.work_mode}
                </span>
              </div>
              <p className="mt-3 text-sm text-ink-soft">
                Posted: {new Date(job.posted_date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
