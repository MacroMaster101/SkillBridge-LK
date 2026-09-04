import { Link, useParams } from 'react-router-dom';
import { Action, Eyebrow, Icon, OpportunityCard, Tags } from '../../../components/PublicUI';
import { publicJobs } from '../data/publicJobs';

export default function JobDetailsPage() {
  const { id } = useParams();
  const job = publicJobs.find((item) => String(item.id) === id);

  if (!job) {
    return (
      <div className="sb-container sb-empty sb-not-found">
        <Icon name="search" size={36} />
        <h1>That opportunity is not here.</h1>
        <p>The link may be out of date. Browse the current sample listings instead.</p>
        <Action to="/jobs">Back to opportunities <Icon /></Action>
      </div>
    );
  }

  const summary = [
    ['Company', job.company],
    ['Category', job.category],
    ['Type', job.jobType],
    ['Location', job.location],
    ['Work mode', job.workMode],
  ];

  return (
    <>
      <section className="sb-detail-hero">
        <div className="sb-container">
          <Link className="sb-back-link" to="/jobs">← All opportunities</Link>
          <div className="sb-detail-title">
            <span className={`sb-company-icon ${job.color}`} aria-hidden="true">{job.initials}</span>
            <div>
              <Eyebrow>{job.company}</Eyebrow>
              <h1>{job.title}</h1>
              <p className="sb-detail-meta">
                <Icon name="pin" size={17} /> {job.location}
                <span aria-hidden="true">·</span> {job.workMode}
                <span aria-hidden="true">·</span> {job.jobType}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="sb-container sb-detail-layout">
        <article className="sb-detail-body">
          <p className="sb-sample-notice">
            <Icon name="spark" size={16} />
            Sample listing. Applications are not open for this role — it is here to show how a
            vacancy page works.
          </p>

          <h2>About the role</h2>
          <p>{job.description}</p>

          <h2>What you would be doing</h2>
          <ul className="sb-check-list">
            {job.responsibilities.map((item) => (
              <li key={item}><Icon name="check" size={18} />{item}</li>
            ))}
          </ul>

          <h2>Skills this role asks for</h2>
          <p>
            Your profile is compared against this list. You do not need every one of
            them — the match percentage shows how many you already have, and the rest
            are what you would be learning here.
          </p>
          <Tags items={job.skills} />

          <h2>Who it suits</h2>
          <p>
            Undergraduates, diploma and HND holders, recent graduates and anyone
            starting a new career. Apply based on what you can contribute now and
            what you are ready to pick up.
          </p>
        </article>

        <aside className="sb-detail-side">
          <div className="sb-detail-summary">
            <Eyebrow>Your next step</Eyebrow>
            <h2>See your match for this role.</h2>
            <p>Create a candidate profile with your skills, and this page will show how much of the list you cover.</p>
            <Action to="/register?role=candidate">Create your profile <Icon size={17} /></Action>
            <Link className="sb-text-link" to="/login">Already have an account? Log in</Link>
            <dl>
              {summary.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="sb-detail-note">
            <Icon name="spark" />
            <p>
              A skill match measures overlap between your profile and the role’s
              requirements. It helps you shortlist where to apply — it is not a
              prediction of whether you will be hired.
            </p>
          </div>
        </aside>
      </div>

      <section className="sb-opportunities">
        <div className="sb-container sb-section">
          <div className="sb-section-heading">
            <div>
              <Eyebrow>Keep looking</Eyebrow>
              <h2>Other roles open to beginners.</h2>
            </div>
            <Action secondary to="/jobs">View all <Icon /></Action>
          </div>
          <div className="sb-job-grid">
            {publicJobs.filter((item) => item.id !== job.id).slice(0, 3).map((item) => (
              <OpportunityCard job={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
