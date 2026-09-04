import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import {
  CheckChip, ErrorNote, Icon, InfoNote, PageHeader, SectionCard, SelectField, TextField, TextareaField,
} from '../../../components/AppUI';
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES } from '../../../constants';
import { jobService } from '../../jobs/services/jobService';
import { fieldErrorsFromZod, jobPostSchema } from '../../../lib/validation';

const COMMON_SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Git', 'SQL',
  'Figma', 'Canva', 'Microsoft Excel', 'Communication', 'Customer Service',
  'Social Media Marketing', 'Content Writing', 'Accounting', 'Data Entry', 'Sales',
];

const EMPTY = {
  title: '',
  description: '',
  category: JOB_CATEGORIES[0],
  jobType: JOB_TYPES[0],
  location: '',
  workMode: WORK_MODES[0],
  deadline: '',
};

export default function PostJobPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined, skills: undefined }));
    setSubmitError('');
  };

  const toggleSkill = (skill) => {
    setSkills((current) => (
      current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]
    ));
    setErrors((current) => ({ ...current, skills: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const payload = {
      ...form,
      workMode: form.workMode || undefined,
      deadline: form.deadline || undefined,
      skills,
    };

    const parsed = jobPostSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrorsFromZod(parsed.error));
      return;
    }

    setLoading(true);
    try {
      await jobService.create(parsed.data);
      navigate('/employer/jobs');
    } catch (err) {
      setSubmitError(
        err.response?.data?.error || err.response?.data?.message || 'Could not publish this vacancy.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <PageHeader
        eyebrow="New vacancy"
        title="Describe the role, then the skills."
        lead="The skills you list here are what candidates are matched against, so keep them honest."
      />

      {submitError && <ErrorNote>{submitError}</ErrorNote>}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <SectionCard title="The role">
          <div className="flex flex-col gap-4">
            <TextField
              label="Job title"
              name="title"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              required
              placeholder="e.g. Frontend Development Intern"
              error={errors.title}
            />
            <TextareaField
              label="Description"
              name="description"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={5}
              required
              placeholder="What the person would work on, who they would work with, and what they would learn."
              error={errors.description}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Category"
                name="category"
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                options={JOB_CATEGORIES}
                required
                error={errors.category}
              />
              <SelectField
                label="Opportunity type"
                name="jobType"
                value={form.jobType}
                onChange={(e) => update('jobType', e.target.value)}
                options={JOB_TYPES}
                required
                error={errors.jobType}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Location"
                name="location"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="e.g. Colombo"
                error={errors.location}
              />
              <SelectField
                label="Work mode"
                name="workMode"
                value={form.workMode}
                onChange={(e) => update('workMode', e.target.value)}
                options={['', ...WORK_MODES]}
                error={errors.workMode}
              />
            </div>
            <TextField
              label="Application deadline"
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={(e) => update('deadline', e.target.value)}
              error={errors.deadline}
            />
          </div>
        </SectionCard>

        <SectionCard title="Required skills">
          <p className="mb-4 text-sm text-ink-soft">
            Pick what the role genuinely needs. A shorter, honest list produces more useful matches
            than a long wish list — every extra skill lowers everyone&apos;s percentage.
          </p>
          <div className="flex flex-wrap gap-2">
            {COMMON_SKILLS.map((skill) => (
              <CheckChip
                key={skill}
                name="skills"
                value={skill}
                checked={skills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
            ))}
          </div>
          <p className={`mt-4 font-mono text-[0.58rem] uppercase tracking-[0.08em] ${errors.skills ? 'text-madder' : 'text-ink-soft'}`}>
            {skills.length} required {skills.length === 1 ? 'skill' : 'skills'}
            {skills.length === 0 && ' · select at least one'}
          </p>
          {errors.skills && <p className="text-xs font-medium text-madder">{errors.skills}</p>}
        </SectionCard>

        <InfoNote>
          Candidates see the full skill list on the vacancy, with the ones they already have marked.
        </InfoNote>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/employer/dashboard"><Button variant="secondary" type="button">Cancel</Button></Link>
          <Button type="submit" disabled={loading || skills.length === 0}>
            {loading ? 'Publishing…' : 'Publish vacancy'} <Icon size={15} />
          </Button>
        </div>
      </form>
    </div>
  );
}
