import { useState } from 'react';
import { Link } from 'react-router-dom';

const PATHS = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  briefcase: 'M8 6V3h8v3M3 6h18v15H3ZM3 11l9 4 9-4',
  check: 'm5 12 4 4L19 6',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18',
  design: 'm4 16-1 5 5-1L21 7l-4-4ZM14 6l4 4',
  people: 'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3m20 0v-3a4 4 0 0 0-4-4M13 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0m4-4a4 4 0 0 1 0 8',
  chart: 'M4 3v18h18M8 16l5-6 4 3 5-8',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'm5 5 14 14M5 19 19 5',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
};

export function Icon({ name = 'arrow', size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={PATHS[name] || PATHS.arrow} />
    </svg>
  );
}

export function Brand() {
  return (
    <Link className="sb-brand" to="/" aria-label="SkillBridge LK home">
      <span className="sb-brand-mark" aria-hidden="true"><i /><i /><i /></span>
      SkillBridge<span className="sb-lk">LK</span>
    </Link>
  );
}

export function Action({ to, children, secondary, className = '', ...props }) {
  return (
    <Link to={to} className={`sb-button ${secondary ? 'sb-button-secondary' : ''} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children }) {
  return <p className="sb-eyebrow">{children}</p>;
}

export function Tags({ items }) {
  return (
    <div className="sb-tags">
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}

/* The trilingual line reads like the header of a Sri Lankan station board. */
export function Trilingual({ si, ta, en }) {
  return (
    <p className="sb-trilingual">
      <b lang="si">{si}</b><i>/</i>
      <b lang="ta">{ta}</b><i>/</i>
      <span>{en}</span>
    </p>
  );
}

export function OpportunityCard({ job }) {
  return (
    <article className="sb-job-card">
      <div className="sb-job-top">
        <span className={`sb-company-icon ${job.color}`} aria-hidden="true">{job.initials}</span>
        <span className="sb-job-type">{job.jobType}</span>
      </div>
      <p className="sb-company-name">{job.company}</p>
      <h3><Link to={`/jobs/${job.id}`}>{job.title}</Link></h3>
      <p className="sb-job-location">
        <Icon name="pin" size={15} />{job.location}<span>·</span>{job.workMode}
      </p>
      <Tags items={job.skills.slice(0, 3)} />
      <div className="sb-job-bottom">
        <span>Open to beginners</span>
        <Link to={`/jobs/${job.id}`} aria-label={`View ${job.title} at ${job.company}`}><Icon /></Link>
      </div>
    </article>
  );
}

/* The board frame: a steel rail, a slatted body, and a caption underneath.
   Shared by the candidate match board and the employer hiring board. */
export function Board({ rail, children, foot }) {
  return (
    <div className="sb-board">
      <div className="sb-board-rail">
        <span className="sb-live-dot" />{rail}
        <span className="sb-rivets" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <div className="sb-board-body">{children}</div>
      {foot && <p className="sb-board-foot">{foot}</p>}
    </div>
  );
}

const DEMO_SKILLS = ['React', 'JavaScript', 'CSS', 'Git', 'TypeScript'];

/* Signature element. Toggling a skill flips the cell and moves the readout,
   so the match percentage is something you cause rather than something you
   are told. */
export function MatchBoard() {
  const [selected, setSelected] = useState(DEMO_SKILLS.slice(0, 3));
  const percentage = Math.round((selected.length / DEMO_SKILLS.length) * 100);

  const toggle = (skill) => setSelected((current) => (
    current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]
  ));

  return (
    <Board rail="Skill match — try it" foot="Interactive example · Your real matches come from your profile">
      <div className="sb-board-who">
        <span className="sb-avatar" aria-hidden="true">N</span>
        <div>
          <strong>Your profile</strong>
          <span>Early-career · Sri Lanka</span>
        </div>
        <Icon name="spark" />
      </div>

      <div>
        <p className="sb-board-label">
          Skills you have <span>Add or remove</span>
        </p>
        <div className="sb-cells">
          {DEMO_SKILLS.map((skill) => {
            const on = selected.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                className={`sb-cell ${on ? 'on' : ''}`}
                aria-pressed={on}
                onClick={() => toggle(skill)}
              >
                {on ? '✓' : '+'} {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="sb-board-track" aria-hidden="true">
        <span /><Icon name="spark" size={17} /><span />
      </div>

      <div className="sb-board-role">
        <div className="sb-board-role-head">
          <span className="sb-company-icon lavender" aria-hidden="true">p.</span>
          <div>
            <strong>Frontend Development Intern</strong>
            <p>Pixel Lanka · Colombo · Hybrid</p>
          </div>
        </div>
        <div className="sb-readout">
          <div>
            <p className="sb-readout-figure" aria-live="polite">
              {percentage}<sup>%</sup>
            </p>
            <span className="sb-readout-label">Skill match</span>
          </div>
        </div>
        <div className="sb-progress" aria-hidden="true">
          <span style={{ width: `${percentage}%` }} />
        </div>
        <p className="sb-board-caption">
          {selected.length} of {DEMO_SKILLS.length} required skills matched.
          {selected.length < DEMO_SKILLS.length
            ? ' The rest are skills you can build.'
            : ' You meet every skill this role asks for.'}
        </p>
      </div>
    </Board>
  );
}
