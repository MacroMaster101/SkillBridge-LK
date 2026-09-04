import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  Card, EmptyState, ErrorNote, Icon, PageHeader, Panel, SectionCard, SkillChip, StatCard, TextLink,
} from '../../../components/AppUI';
import { candidateService } from '../../onboarding/services/candidateService';
import { applicationService } from '../../applications/services/applicationService';

function ProfileDetail({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-paper/60">{label}</p>
      <p className="mt-1 text-sm text-paper/90">{value}</p>
    </div>
  );
}

export default function CandidateDashboardPage() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      candidateService.getMe().catch(() => null),
      applicationService.getMyApplications().catch(() => ({ data: [] })),
    ])
      .then(([profileRes, appsRes]) => {
        setProfile(profileRes?.data || null);
        setApplications(appsRes.data || []);
      })
      .catch(() => setError('Could not load your dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner className="py-16" size="lg" />;
  }

  const underReview = applications.filter((a) => a.status === 'UNDER_REVIEW').length;
  const skillCount = profile?.skills?.length ?? 0;
  const skills = profile?.skills || [];
  const preferredJobTypes = profile?.preferred_job_types || [];

  const stats = [
    { label: 'Applications sent', value: applications.length },
    { label: 'Under review', value: underReview },
    { label: 'Skills on profile', value: skillCount },
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Your dashboard"
        title="Where you stand today."
        lead="Your applications, your matches, and the skills worth adding next."
        actions={
          <>
            <Link to="/jobs"><Button variant="secondary">Browse jobs</Button></Link>
            <Link to="/candidate/onboarding">
              <Button>{profile?.onboarding_completed ? 'Edit profile' : 'Complete profile'} <Icon size={15} /></Button>
            </Link>
          </>
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard
          title="Matched for you"
          action={<TextLink to="/candidate/recommended">See all <Icon size={16} /></TextLink>}
        >
          {skillCount === 0 ? (
            <EmptyState
              icon="spark"
              title="No matches yet."
              message="Add your skills and preferences, and roles will start appearing here ranked by how much of each one you already cover."
              action={<Link to="/candidate/onboarding"><Button size="sm">Add my skills</Button></Link>}
            />
          ) : (
            <EmptyState
              icon="spark"
              title="Browse recommended roles."
              message="Your skills are saved. Open recommended jobs to see roles ranked by match."
              action={<Link to="/candidate/recommended"><Button size="sm">View recommendations</Button></Link>}
            />
          )}
        </SectionCard>

        <Panel rail="Your profile" foot="Edit your profile to update any of the details below">
          <div className="flex items-center gap-3 border-b border-dashed border-paper/20 pb-4">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-marigold font-display text-base font-extrabold text-ink">
              {(profile?.full_name || '?').charAt(0)}
            </span>
            <div>
              <strong className="block text-[0.95rem] font-semibold">
                {profile?.full_name || 'Complete your profile'}
              </strong>
              <span className="text-sm text-paper/70">
                {profile?.onboarding_completed ? 'Profile saved' : 'Onboarding not finished'}
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <ProfileDetail label="I am a" value={profile?.user_type} />
            <ProfileDetail label="Education" value={profile?.education_level} />
            <ProfileDetail label="Field of study" value={profile?.field_of_study} />
            <ProfileDetail label="Location" value={profile?.location} />
            <ProfileDetail label="Preferred work mode" value={profile?.preferred_work_mode} />
            {preferredJobTypes.length > 0 && (
              <div>
                <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-paper/60">
                  Looking for
                </p>
                <p className="mt-1 text-sm text-paper/90">{preferredJobTypes.join(', ')}</p>
              </div>
            )}
          </div>

          {skills.length > 0 && (
            <div className="mt-4 border-t border-dashed border-paper/20 pt-4">
              <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-paper/60">
                Skills
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skills.map((skill) => <SkillChip key={skill.id || skill.name}>{skill.name}</SkillChip>)}
              </div>
            </div>
          )}

          <Link to="/candidate/onboarding" className="mt-4 inline-block">
            <Button variant="secondary" size="sm">Edit profile</Button>
          </Link>
        </Panel>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">Recent applications</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              {applications.length === 0
                ? 'When you apply to a role, it appears here with its current status.'
                : `${applications.length} application${applications.length === 1 ? '' : 's'} on record.`}
            </p>
          </div>
          <Link to="/candidate/applications"><Button variant="secondary">View all</Button></Link>
        </div>
      </Card>
    </div>
  );
}
