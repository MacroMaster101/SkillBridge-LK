import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SkillPicker from '../../../components/SkillPicker';
import {
  CheckChip, ErrorNote, Icon, InfoNote, PageHeader, SectionCard, SelectField, TextField,
} from '../../../components/AppUI';
import {
  USER_TYPES, JOB_TYPES, WORK_MODES, EDUCATION_LEVELS, FIELDS_OF_STUDY,
} from '../../../constants';
import { withSavedOption } from '../../../lib/profileOptions';
import { candidateService } from '../services/candidateService';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../services/api';
import { candidateOnboardingSchema, fieldErrorsFromZod } from '../../../lib/validation';

function useToggleSet(initial = []) {
  const [values, setValues] = useState(initial);
  const toggle = (value) => setValues((current) =>
    current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  return [values, toggle, setValues];
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [skillsCatalog, setSkillsCatalog] = useState([]);
  const [savedProfile, setSavedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: profile?.full_name || '',
    userType: USER_TYPES[0],
    educationLevel: '',
    fieldOfStudy: '',
    location: '',
    preferredWorkMode: '',
  });
  const [skills, , setSkills] = useToggleSet([]);
  const [jobTypes, toggleJobType, setJobTypes] = useToggleSet([]);

  useEffect(() => {
    Promise.all([
      api.get('/skills'),
      candidateService.getMe().catch(() => null),
    ])
      .then(([skillsRes, profileRes]) => {
        setSkillsCatalog(skillsRes.data || []);
        const data = profileRes?.data;
        if (data) {
          setSavedProfile(data);
          setForm({
            fullName: data.full_name || profile?.full_name || '',
            userType: USER_TYPES.includes(data.user_type) ? data.user_type : USER_TYPES[0],
            educationLevel: data.education_level || '',
            fieldOfStudy: data.field_of_study || '',
            location: data.location || '',
            preferredWorkMode: data.preferred_work_mode || '',
          });
          if (data.skills?.length) {
            setSkills(data.skills.map((s) => s.name));
          }
          if (data.preferred_job_types?.length) {
            setJobTypes(data.preferred_job_types);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [profile?.full_name, setSkills, setJobTypes]);

  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const payload = {
      ...form,
      skills,
      preferredJobTypes: jobTypes,
    };

    const parsed = candidateOnboardingSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrorsFromZod(parsed.error));
      return;
    }

    setSubmitting(true);
    try {
      await candidateService.updateMe({
        full_name: parsed.data.fullName,
        user_type: parsed.data.userType,
        education_level: parsed.data.educationLevel || undefined,
        field_of_study: parsed.data.fieldOfStudy || undefined,
        location: parsed.data.location || undefined,
        preferred_work_mode: parsed.data.preferredWorkMode || undefined,
        preferred_job_types: parsed.data.preferredJobTypes,
      });
      await candidateService.updateSkills(skills);
      navigate('/candidate/dashboard');
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Could not save your profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner className="py-16" size="lg" />;
  }

  const isEditing = Boolean(savedProfile?.onboarding_completed);
  const skillOptions = skillsCatalog.map((skill) => skill.name);
  const educationOptions = withSavedOption(EDUCATION_LEVELS, form.educationLevel);
  const fieldOptions = withSavedOption(FIELDS_OF_STUDY, form.fieldOfStudy);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <PageHeader
        eyebrow={isEditing ? 'Edit profile' : 'Step 1 of 1'}
        title={isEditing ? 'Update your profile.' : 'Tell us what you can already do.'}
        lead={isEditing
          ? 'Your saved details are below. Change anything you need and save again.'
          : 'This is what your skill match is calculated from. You can change any of it later.'}
      />

      {isEditing && (
        <InfoNote>
          You are editing an existing profile. All fields below show your current saved information.
        </InfoNote>
      )}

      {submitError && <ErrorNote>{submitError}</ErrorNote>}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <SectionCard title="About you">
          <div className="flex flex-col gap-4">
            <TextField
              label="Full name"
              name="fullName"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              error={errors.fullName}
              required
            />
            <SelectField
              label="I am a"
              name="userType"
              value={form.userType}
              onChange={(e) => update('userType', e.target.value)}
              options={USER_TYPES}
              error={errors.userType}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Education level"
                name="educationLevel"
                value={form.educationLevel}
                onChange={(e) => update('educationLevel', e.target.value)}
                placeholder="Select education level"
                options={educationOptions}
                error={errors.educationLevel}
              />
              <SelectField
                label="Field of study"
                name="fieldOfStudy"
                value={form.fieldOfStudy}
                onChange={(e) => update('fieldOfStudy', e.target.value)}
                placeholder="Select field of study"
                options={fieldOptions}
                error={errors.fieldOfStudy}
              />
            </div>
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="e.g. Colombo"
              error={errors.location}
            />
          </div>
        </SectionCard>

        <SectionCard title="Your skills">
          <SkillPicker
            label="Skills you have today"
            hint="Select skills from the list, or type your own and click Add."
            selected={skills}
            suggestions={skillOptions}
            error={errors.skills}
            onChange={(nextSkills) => {
              setSkills(nextSkills);
              setErrors((current) => ({ ...current, skills: undefined }));
            }}
          />
        </SectionCard>

        <SectionCard title="What you are looking for">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-ink-soft">
                Opportunity type
              </p>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((type) => (
                  <CheckChip
                    key={type}
                    name="jobTypes"
                    value={type}
                    checked={jobTypes.includes(type)}
                    onChange={() => {
                      toggleJobType(type);
                      setErrors((current) => ({ ...current, preferredJobTypes: undefined }));
                    }}
                  />
                ))}
              </div>
              {errors.preferredJobTypes && (
                <p className="mt-2 text-xs font-medium text-madder">{errors.preferredJobTypes}</p>
              )}
            </div>

            <SelectField
              label="Preferred work mode"
              name="preferredWorkMode"
              value={form.preferredWorkMode}
              onChange={(e) => update('preferredWorkMode', e.target.value)}
              placeholder="Select work mode"
              options={WORK_MODES}
              error={errors.preferredWorkMode}
            />
          </div>
        </SectionCard>

        <InfoNote>
          A skill match shows overlap between your profile and a role&apos;s requirements.
        </InfoNote>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/candidate/dashboard"><Button variant="secondary" type="button">Cancel</Button></Link>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Saving…' : isEditing ? 'Save changes' : 'Save profile'} <Icon size={15} />
          </Button>
        </div>
      </form>
    </div>
  );
}
