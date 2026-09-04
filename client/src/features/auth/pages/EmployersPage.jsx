import { Fragment } from 'react';
import { Action, Board, Eyebrow, Icon } from '../../../components/PublicUI';

const BUSINESSES = ['Startups', 'Local businesses', 'Creative studios', 'Growing SMEs'];

const PIPELINE = [
  { initial: 'N', tone: '', name: 'Nethmi P.', skills: 'React · CSS · Git', status: 'Applied', match: '80%' },
  { initial: 'A', tone: 'peach', name: 'Ashan R.', skills: 'JavaScript · Figma', status: 'Under review', match: '60%' },
  { initial: 'K', tone: 'lavender', name: 'Kavindi S.', skills: 'React · TypeScript · Git', status: 'Shortlisted', match: '100%' },
];

const STEPS = [
  {
    icon: 'briefcase',
    title: 'Set up your business',
    text: 'Add your business name, category, location and contact details so candidates know who they are applying to.',
  },
  {
    icon: 'spark',
    title: 'Post the vacancy',
    text: 'Write the role, pick the job type and work mode, and list the skills it needs. Those skills drive the matching.',
  },
  {
    icon: 'people',
    title: 'Review and respond',
    text: 'See every applicant with their skill match, then move them through under review, shortlisted, hired or rejected.',
  },
];

const FAQ = [
  {
    q: 'Who is SkillBridge LK for?',
    a: 'Small businesses, startups, local service providers and growing teams in Sri Lanka that want to hire interns, trainees and early-career employees without running a full recruitment process.',
  },
  {
    q: 'What roles can I post?',
    a: 'Internships, part-time, trainee, entry-level and full-time roles across software, design, marketing, sales, administration, finance, customer service, hospitality, retail and data entry.',
  },
  {
    q: 'How is the match percentage calculated?',
    a: 'It is the share of your listed required skills that appear on the candidate’s profile. A role asking for five skills where a candidate has four shows as 80%. It is a first filter for your review, not a hiring decision.',
  },
  {
    q: 'Can candidates see where their application stands?',
    a: 'Yes. When you change an application status, the candidate sees the update on their own dashboard, so nobody is left guessing.',
  },
];

export default function EmployersPage() {
  return (
    <>
      <section className="sb-hero">
        <div className="sb-container sb-hero-grid">
          <div className="sb-hero-copy">
            <Eyebrow>For employers</Eyebrow>
            <h1>Hire for <em>potential,</em> not just experience.</h1>
            <p>
              Post a vacancy, list the skills the job really needs, and see every
              applicant next to how closely they match. Built for teams without a
              recruitment department.
            </p>
            <Action to="/register?role=employer">Post a vacancy <Icon size={18} /></Action>
            <div className="sb-hero-foot">
              <Icon name="briefcase" />
              <span>
                One place for your vacancy, your applicants and their status.<br />
                <strong>No spreadsheets, no lost email threads.</strong>
              </span>
            </div>
          </div>

          <Board
            rail="Applicants — example view"
            foot="Illustrative data · Sample applicants for one vacancy"
          >
            <div className="sb-board-who">
              <span className="sb-company-icon lime" aria-hidden="true">p.</span>
              <div>
                <strong>Pixel Lanka</strong>
                <span>Software · Colombo</span>
              </div>
              <Icon name="spark" />
            </div>

            <div className="sb-board-role">
              <p className="sb-board-label">Open vacancy</p>
              <div className="sb-board-role-head">
                <div>
                  <strong>Frontend Development Intern</strong>
                  <p>Internship · Hybrid · 5 required skills</p>
                </div>
              </div>
              <div className="sb-cells">
                {['React', 'JavaScript', 'CSS', 'Git', 'TypeScript'].map((skill) => (
                  <span className="sb-cell" key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="sb-board-label">
                Applicants <span>Sorted by match</span>
              </p>
              <div className="sb-pipeline">
                {PIPELINE.map((person) => (
                  <div key={person.name}>
                    <span className={`sb-avatar ${person.tone}`} aria-hidden="true">{person.initial}</span>
                    <div>
                      <strong>{person.name} · {person.match}</strong>
                      <p>{person.skills}</p>
                    </div>
                    <span className="sb-pipeline-status">{person.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </Board>
        </div>
      </section>

      <section className="sb-stops" aria-label="Businesses SkillBridge LK is built for">
        <div className="sb-container">
          <p className="sb-stops-label">Built for</p>
          <p className="sb-stops-line">
            {BUSINESSES.map((business, index) => (
              <Fragment key={business}>
                {index > 0 && <i aria-hidden="true" />}
                <span>{business}</span>
              </Fragment>
            ))}
          </p>
        </div>
      </section>

      <section className="sb-section sb-container">
        <div className="sb-section-heading">
          <div>
            <Eyebrow>How hiring works</Eyebrow>
            <h2>From vacancy to shortlist.</h2>
          </div>
          <p className="sb-heading-note">
            Three steps, one dashboard. You do not need a recruitment system to
            give someone their first job.
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

      <section className="sb-opportunities">
        <div className="sb-container sb-section">
          <div className="sb-faq">
            <div className="sb-faq-intro">
              <Eyebrow>Questions</Eyebrow>
              <h2>Before you post.</h2>
              <p className="sb-heading-note">
                What SkillBridge does, what it does not do, and what candidates see.
              </p>
            </div>
            <div>
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}<span aria-hidden="true">+</span></summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sb-final-cta sb-container">
        <Eyebrow>Get started</Eyebrow>
        <h2>Post your first vacancy.</h2>
        <Action to="/register?role=employer">Create an employer account <Icon size={18} /></Action>
        <p>Set up your business profile once, then post as many roles as you need.</p>
      </section>
    </>
  );
}
