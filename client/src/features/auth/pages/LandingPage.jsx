import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Action, Eyebrow, Icon, MatchBoard, OpportunityCard, Trilingual } from '../../../components/PublicUI';
import { JOB_CATEGORIES } from '../../../constants';
import { publicJobs } from '../../jobs/data/publicJobs';

const CATEGORIES = [
  { name: 'Software / IT', icon: 'code', note: 'Web, mobile and support roles', color: 'lavender' },
  { name: 'Graphic Design', icon: 'design', note: 'Brand, social and layout work', color: 'peach' },
  { name: 'Marketing', icon: 'chart', note: 'Content, campaigns and social', color: 'lime' },
  { name: 'Accounting / Finance', icon: 'briefcase', note: 'Bookkeeping and accounts roles', color: 'blue' },
];

const AUDIENCE = ['Undergraduates', 'Diploma & HND holders', 'Recent graduates', 'Career changers'];

const STEPS = [
  {
    icon: 'people',
    title: 'Add your skills',
    text: 'Tell us your education, the skills you already have, and the kind of work you are looking for. It takes about three minutes.',
  },
  {
    icon: 'spark',
    title: 'See your match',
    text: 'Every role shows how much of its required skills you already have — and names the ones you would be learning on the job.',
  },
  {
    icon: 'arrow',
    title: 'Apply and track',
    text: 'Apply in a couple of clicks, then follow each application from submitted, to under review, to shortlisted.',
  },
];

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    const term = search.trim();
    navigate(`/jobs${term ? `?search=${encodeURIComponent(term)}` : ''}`);
  };

  return (
    <>
      <section className="sb-hero">
        <div className="sb-container sb-hero-grid">
          <div className="sb-hero-copy">
            <Eyebrow>Sri Lanka · Early-career roles</Eyebrow>
            <h1>Entry-level should mean <em>entry-level.</em></h1>
            <p>
              SkillBridge LK matches the skills you actually have to internships,
              part-time work and first roles at small Sri Lankan businesses — and
              shows you where you stand before you apply.
            </p>

            <form className="sb-search" onSubmit={submitSearch}>
              <Icon name="search" />
              <label className="sr-only" htmlFor="hero-search">Search by job title, skill or company</label>
              <input
                id="hero-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Job title, skill or company"
              />
              <button className="sb-button" type="submit">Search <Icon size={17} /></button>
            </form>

            <div className="sb-popular">
              <span>Common starts:</span>
              <Link to="/jobs?jobType=Internship">Internship</Link>
              <Link to="/jobs?jobType=Part-time">Part-time</Link>
              <Link to="/jobs?workMode=Remote">Remote</Link>
            </div>

            <div className="sb-hero-foot">
              <Icon name="spark" />
              <Trilingual si="ඔබේ ඊළඟ පියවර" ta="உங்கள் அடுத்த படி" en="Your next step" />
            </div>
          </div>

          <MatchBoard />
        </div>
      </section>

      <section className="sb-stops" aria-label="Who SkillBridge LK is for">
        <div className="sb-container">
          <p className="sb-stops-label">Built for</p>
          <p className="sb-stops-line">
            {AUDIENCE.map((group, index) => (
              <Fragment key={group}>
                {index > 0 && <i aria-hidden="true" />}
                <span>{group}</span>
              </Fragment>
            ))}
          </p>
        </div>
      </section>

      <section className="sb-section sb-container">
        <div className="sb-section-heading">
          <div>
            <Eyebrow>Browse by field</Eyebrow>
            <h2>Where do your skills fit?</h2>
          </div>
          <Link className="sb-text-link" to="/jobs">
            All {JOB_CATEGORIES.length} categories <Icon size={18} />
          </Link>
        </div>
        <div className="sb-category-grid">
          {CATEGORIES.map((category) => (
            <Link
              className="sb-category"
              key={category.name}
              to={`/jobs?category=${encodeURIComponent(category.name)}`}
            >
              <span className={`sb-tile-icon ${category.color}`} aria-hidden="true">
                <Icon name={category.icon} size={24} />
              </span>
              <h3>{category.name}</h3>
              <p>{category.note}</p>
              <Icon />
            </Link>
          ))}
        </div>
      </section>

      <section className="sb-opportunities">
        <div className="sb-container sb-section">
          <div className="sb-section-heading">
            <div>
              <Eyebrow>Sample listings</Eyebrow>
              <h2>The kind of roles you will find here.</h2>
              <p>Small teams and local businesses, hiring for the start of a career rather than the middle of one.</p>
            </div>
            <Action to="/jobs" secondary>Browse all <Icon size={17} /></Action>
          </div>
          <p className="sb-preview-label">Sample data · Not live vacancies</p>
          <div className="sb-job-grid">
            {publicJobs.slice(0, 3).map((job) => <OpportunityCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="sb-section sb-container">
        <div className="sb-section-heading">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2>Three steps from profile to application.</h2>
          </div>
          <p className="sb-heading-note">
            You do not need a CV full of experience. You need a clear picture of
            what you can already do, and a way to show it.
          </p>
        </div>
        <div className="sb-steps">
          {STEPS.map((step) => (
            <article key={step.title}>
              <span className="sb-step-marker" aria-hidden="true" />
              <Icon name={step.icon} size={26} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sb-bridge" aria-label="For employers">
        <img src="/bridge.webp" alt="" width="1536" height="864" />
        <div className="sb-container">
          <div className="sb-bridge-copy">
            <Eyebrow>For employers</Eyebrow>
            <h2>Hiring your first junior?</h2>
            <p>
              Post a vacancy, list the skills that actually matter for it, and see
              applicants alongside how closely they match. No recruitment team required.
            </p>
            <Action to="/employers">See how hiring works <Icon size={18} /></Action>
          </div>
        </div>
      </section>

      <section className="sb-final-cta sb-container">
        <Eyebrow>Get started</Eyebrow>
        <h2>See where you stand.</h2>
        <Action to="/register?role=candidate">Create your profile <Icon size={18} /></Action>
        <p>Add your skills once, and every role you open shows you the match.</p>
      </section>
    </>
  );
}
