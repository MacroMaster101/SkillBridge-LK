import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Action, Eyebrow, Icon, OpportunityCard, Tags } from '../../../components/PublicUI';
import { useAuth } from '../../../hooks/useAuth';
import { candidateService } from '../../onboarding/services/candidateService';
import { jobService } from '../services/jobService';
import { applicationService } from '../../applications/services/applicationService';
import { enrichJob } from '../../../lib/jobDisplay';
import { calculateSkillMatch, getMatchedAndMissing } from '../../../lib/skillMatch';

function JobMatchPanel({ job, summary, candidateSkills, applying, applyError, onApply }) {
  const jobSkills = job.skills || [];
  const { matched, missing } = getMatchedAndMissing(candidateSkills, jobSkills);
  const matchPercentage = calculateSkillMatch(candidateSkills, jobSkills);

  if (candidateSkills.length === 0) {
    return (
      <div className="sb-detail-summary">
        <Eyebrow>Your next step</Eyebrow>
        <h2>Add your skills to see your match.</h2>
        <p>Your account is signed in. Complete your profile so we can compare it to this role.</p>
        <Action to="/candidate/onboarding">Complete your profile <Icon size={17} /></Action>
        <dl>
          {summary.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div className="sb-detail-summary">
      <Eyebrow>Your skill match</Eyebrow>
      <div className="sb-readout">
        <div>
          <p className="sb-readout-figure" aria-live="polite">
            {matchPercentage}<sup>%</sup>
          </p>
          <span className="sb-readout-label">Skill match</span>
        </div>
      </div>
      <p>
        {matched.length} of {jobSkills.length} required skills on your profile.
        {missing.length > 0 ? ' The rest are skills you could build in this role.' : ' You cover every skill this role asks for.'}
      </p>

      {matched.length > 0 && (
        <div className="sb-detail-skill-group">
          <p className="sb-detail-skill-label">You have</p>
          <Tags items={matched} />
        </div>
      )}

      {missing.length > 0 && (
        <div className="sb-detail-skill-group">
          <p className="sb-detail-skill-label">To learn here</p>
          <div className="sb-tags sb-tags-muted">
            {missing.map((skill) => <span key={skill}>+ {skill}</span>)}
          </div>
        </div>
      )}

      <button
        className="sb-button"
        type="button"
        onClick={onApply}
        disabled={applying}
      >
        {applying ? 'Applying…' : 'Apply for this role'} <Icon size={17} />
      </button>
      {applyError && <p className="sb-detail-apply-error">{applyError}</p>}
      <Link className="sb-text-link" to="/candidate/dashboard">Go to your dashboard</Link>

      <dl>
        {summary.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function GuestMatchPanel({ summary }) {
  return (
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
  );
}

export default function JobDetailsPage() {
  const { id } = useParams();
  const { loading: authLoading, isAuthenticated, isCandidate, profile } = useAuth();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [candidateSkills, setCandidateSkills] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applied, setApplied] = useState(false);
  const [applicationCheckLoading, setApplicationCheckLoading] = useState(false);

  useEffect(() => {
    setApplied(false);
    setApplyError('');
    setApplying(false);
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    jobService.getById(id)
      .then((response) => {
        if (cancelled) return;
        setJob(enrichJob(response.data));
        setNotFound(false);
      })
      .catch((error) => {
        if (cancelled) return;
        if (error.response?.status === 404) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    jobService.getAll()
      .then((response) => {
        const others = (response.data || [])
          .map(enrichJob)
          .filter((item) => String(item.id) !== String(id))
          .slice(0, 3);
        setRelatedJobs(others);
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (authLoading || !isAuthenticated || !isCandidate) {
      setCandidateSkills([]);
      return;
    }

    setProfileLoading(true);
    candidateService.getMe()
      .then((response) => {
        const skills = (response.data?.skills || []).map((skill) => skill.name);
        setCandidateSkills(skills);
      })
      .catch(() => setCandidateSkills([]))
      .finally(() => setProfileLoading(false));
  }, [authLoading, isAuthenticated, isCandidate, profile?.id]);

  useEffect(() => {
    if (authLoading || !isAuthenticated || !isCandidate || !id) {
      setApplied(false);
      return;
    }

    let cancelled = false;
    setApplicationCheckLoading(true);

    applicationService.getMyApplications()
      .then((response) => {
        if (cancelled) return;
        const alreadyApplied = (response.data || []).some(
          (application) => String(application.job?.id ?? application.jobId) === String(id),
        );
        setApplied(alreadyApplied);
      })
      .catch(() => {
        if (!cancelled) setApplied(false);
      })
      .finally(() => {
        if (!cancelled) setApplicationCheckLoading(false);
      });

    return () => { cancelled = true; };
  }, [authLoading, isAuthenticated, isCandidate, id, profile?.id]);

  const summary = useMemo(() => {
    if (!job) return [];
    return [
      ['Company', job.company],
      ['Category', job.category],
      ['Type', job.jobType],
      ['Location', job.location],
      ['Work mode', job.workMode],
    ];
  }, [job]);

  const handleApply = async () => {
    setApplyError('');
    setApplying(true);
    try {
      await jobService.apply(id, {});
      setApplied(true);
    } catch (error) {
      const message = error.response?.data?.error
        || error.response?.data?.message
        || 'Could not submit your application.';
      setApplyError(message);
    } finally {
      setApplying(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="sb-container sb-empty">
        <p>Loading opportunity…</p>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="sb-container sb-empty sb-not-found">
        <Icon name="search" size={36} />
        <h1>That opportunity is not here.</h1>
        <p>The link may be out of date. Browse current listings instead.</p>
        <Action to="/jobs">Back to opportunities <Icon /></Action>
      </div>
    );
  }

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
          <h2>About the role</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{job.description}</p>

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
          {isAuthenticated && isCandidate ? (
            applied ? (
              <div className="sb-detail-summary">
                <Eyebrow>Application sent</Eyebrow>
                <h2>You applied for this role.</h2>
                <p>Track the status from your candidate dashboard.</p>
                <Action to="/candidate/applications">View applications <Icon size={17} /></Action>
              </div>
            ) : profileLoading || applicationCheckLoading ? (
              <div className="sb-detail-summary">
                <p>Loading your profile…</p>
              </div>
            ) : (
              <JobMatchPanel
                job={job}
                summary={summary}
                candidateSkills={candidateSkills}
                applying={applying}
                applyError={applyError}
                onApply={handleApply}
              />
            )
          ) : isAuthenticated ? (
            <div className="sb-detail-summary">
              <Eyebrow>Signed in</Eyebrow>
              <h2>Browsing as {profile?.role}.</h2>
              <p>Skill match and applications are available on a candidate account.</p>
              <Action to="/candidate/dashboard">Open dashboard <Icon size={17} /></Action>
              <dl>
                {summary.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <GuestMatchPanel summary={summary} />
          )}

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

      {relatedJobs.length > 0 && (
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
              {relatedJobs.map((item) => (
                <OpportunityCard job={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
