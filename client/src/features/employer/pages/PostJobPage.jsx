import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import {
  CheckChip, Icon, InfoNote, PageHeader, SectionCard, SelectField, TextField, TextareaField,
} from '../../../components/AppUI';
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES } from '../../../constants';

const COMMON_SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Git', 'SQL',
  'Figma', 'Canva', 'Microsoft Excel', 'Communication', 'Customer Service',
  'Social Media Marketing', 'Content Writing', 'Accounting', 'Data Entry', 'Sales',
];

export default function PostJobPage() {
  const [skills, setSkills] = useState([]);

  const toggleSkill = (skill) => setSkills((current) => (
    current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]
  ));

  // TODO: Submit to API — POST /api/jobs
  const handleSubmit = (event) => event.preventDefault();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <PageHeader
        eyebrow="New vacancy"
        title="Describe the role, then the skills."
        lead="The skills you list here are what candidates are matched against, so keep them honest."
      />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <SectionCard title="The role">
          <div className="flex flex-col gap-4">
            <TextField
              label="Job title"
              name="title"
              required
              placeholder="e.g. Frontend Development Intern"
            />
            <TextareaField
              label="Description"
              name="description"
              rows={5}
              required
              placeholder="What the person would work on, who they would work with, and what they would learn."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Category" name="category" options={JOB_CATEGORIES} required />
              <SelectField label="Opportunity type" name="jobType" options={JOB_TYPES} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Location" name="location" placeholder="e.g. Colombo" />
              <SelectField label="Work mode" name="workMode" options={WORK_MODES} />
            </div>
            <TextField label="Application deadline" type="date" name="deadline" />
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
          <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-ink-soft">
            {skills.length} required {skills.length === 1 ? 'skill' : 'skills'}
            {skills.length === 0 && ' · select at least one'}
          </p>
        </SectionCard>

        <InfoNote>
          Candidates see the full skill list on the vacancy, with the ones they already have marked.
        </InfoNote>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/employer/dashboard"><Button variant="secondary">Cancel</Button></Link>
          <Button type="submit" disabled={skills.length === 0}>
            Publish vacancy <Icon size={15} />
          </Button>
        </div>
      </form>
    </div>
  );
}
