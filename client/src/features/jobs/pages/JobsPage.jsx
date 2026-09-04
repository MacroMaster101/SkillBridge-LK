import { useSearchParams } from 'react-router-dom';
import { Action, Eyebrow, Icon, OpportunityCard } from '../../../components/PublicUI';
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES } from '../../../constants';
import { publicJobs } from '../data/publicJobs';

const FILTERS = [
  { key: 'category', label: 'Job category', options: JOB_CATEGORIES },
  { key: 'jobType', label: 'Opportunity type', options: JOB_TYPES },
  { key: 'workMode', label: 'Work mode', options: WORK_MODES },
];

const FILTER_KEYS = ['category', 'jobType', 'workMode', 'location'];
const LOCATIONS = [...new Set(publicJobs.map((job) => job.location))].sort();

export default function JobsPage() {
  const [params, setParams] = useSearchParams();

  const update = (key, value) => setParams((previous) => {
    const next = new URLSearchParams(previous);
    if (value) next.set(key, value);
    else next.delete(key);
    return next;
  }, { replace: true });

  const query = (params.get('search') || '').trim().toLowerCase();

  const jobs = publicJobs
    .filter((job) => {
      const haystack = [job.title, job.company, job.category, ...job.skills].join(' ').toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      const matchesFilters = FILTER_KEYS.every((key) => !params.get(key) || job[key] === params.get(key));
      return matchesQuery && matchesFilters;
    })
    .sort((a, b) => (params.get('sort') === 'title' ? a.title.localeCompare(b.title) : a.id - b.id));

  const activeFilters = FILTER_KEYS.filter((key) => params.get(key));

  return (
    <>
      <section className="sb-page-hero">
        <div className="sb-container">
          <Eyebrow>Browse opportunities</Eyebrow>
          <h1>Find work that fits <em>what you can do.</em></h1>
          <p className="sb-page-hero-sub">
            Internships, part-time work and first roles at small businesses across Sri Lanka.
          </p>

          <div className="sb-search sb-browse-search">
            <Icon name="search" />
            <label className="sr-only" htmlFor="job-search">Search by job title, skill or company</label>
            <input
              id="job-search"
              placeholder="Job title, skill or company"
              value={params.get('search') || ''}
              onChange={(event) => update('search', event.target.value)}
            />
            <Icon name="pin" />
            <label className="sr-only" htmlFor="search-location">Location</label>
            <select
              id="search-location"
              value={params.get('location') || ''}
              onChange={(event) => update('location', event.target.value)}
            >
              <option value="">All of Sri Lanka</option>
              {LOCATIONS.map((city) => <option key={city}>{city}</option>)}
            </select>
          </div>
        </div>
      </section>

      <div className="sb-container sb-browse-layout">
        <aside className="sb-filters">
          <div className="sb-filter-heading">
            <h2>Filters</h2>
            <button type="button" onClick={() => setParams({})}>Clear all</button>
          </div>

          {FILTERS.map((filter) => (
            <fieldset key={filter.key}>
              <legend>{filter.label}</legend>
              {filter.options.map((option) => (
                <label className="sb-filter-option" key={option}>
                  <input
                    type="checkbox"
                    checked={params.get(filter.key) === option}
                    onChange={() => update(filter.key, params.get(filter.key) === option ? '' : option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </fieldset>
          ))}

          <div className="sb-filter-promo">
            <Icon name="spark" />
            <h3>Stop guessing which roles fit.</h3>
            <p>Add your skills to your profile and every listing shows you a match percentage.</p>
            <Action to="/register?role=candidate">Create your profile <Icon size={16} /></Action>
          </div>
        </aside>

        <section className="sb-results" aria-label="Job results">
          <div className="sb-results-heading">
            <h2 aria-live="polite">
              {jobs.length} {jobs.length === 1 ? 'opportunity' : 'opportunities'}
            </h2>
            <label>
              Sort by
              <select value={params.get('sort') || ''} onChange={(event) => update('sort', event.target.value)}>
                <option value="">Featured</option>
                <option value="title">Job title A–Z</option>
              </select>
            </label>
          </div>

          <p className="sb-sample-notice">
            <Icon name="spark" size={16} />
            These are sample listings that show how browsing works. They are not live vacancies.
          </p>

          {activeFilters.length > 0 && (
            <div className="sb-active-filters">
              {activeFilters.map((key) => (
                <button type="button" key={key} onClick={() => update(key, '')}>
                  {params.get(key)}
                  <Icon name="close" size={13} />
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
            </div>
          )}

          {jobs.length > 0 ? (
            <div className="sb-job-grid">
              {jobs.map((job) => <OpportunityCard job={job} key={job.id} />)}
            </div>
          ) : (
            <div className="sb-empty">
              <Icon name="search" size={36} />
              <h2>No opportunities match that.</h2>
              <p>Try a different skill, or remove a filter to widen the search.</p>
              <button className="sb-button" type="button" onClick={() => setParams({})}>
                Clear search and filters
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
