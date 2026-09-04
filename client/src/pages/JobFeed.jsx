import { useState } from 'react';
import { getCandidate } from '../lib/candidateStorage';
import { calculateSkillMatch } from '../utils/matchSkills';
import { mockJobs } from '../data/mockJobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';

export default function JobFeed() {
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
    { label: 'Total Jobs', value: jobs.length },
    { label: 'Available', value: filteredJobs.length },
    { label: 'Your Skills', value: candidate?.skills?.length || 0 },
  ];

  return (
    <div className="container">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0' }}>Find Your Next Opportunity</h1>
        <p style={{ margin: '0', color: 'var(--color-muted)' }}>Browse and apply to jobs tailored to your skills and preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="card" style={{ textAlign: 'center', padding: '24px' }}>
            <p style={{ margin: '0 0 8px 0', color: 'var(--color-muted)', fontSize: '0.9rem' }}>{stat.label}</p>
            <p style={{ margin: '0', fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedJobType={selectedJobType}
          onJobTypeChange={setSelectedJobType}
          selectedWorkMode={selectedWorkMode}
          onWorkModeChange={setSelectedWorkMode}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          categories={categories}
          jobTypes={jobTypes}
          workModes={workModes}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', margin: '0' }}>
            No jobs found matching your criteria.
          </p>
        </div>
      ) : (
        <div>
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              matchPercent={getMatchPercent(job)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
