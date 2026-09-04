import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import {
  CheckChip, Icon, InfoNote, PageHeader, SectionCard, SelectField, TextField,
} from '../../../components/AppUI';
import { USER_TYPES, JOB_TYPES, WORK_MODES, JOB_CATEGORIES } from '../../../constants';

const SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Git', 'SQL',
  'Figma', 'Canva', 'Microsoft Excel', 'Communication', 'Customer Service',
  'Social Media Marketing', 'Content Writing', 'Accounting', 'Data Entry', 'Sales',
];

function useToggleSet(initial = []) {
  const [values, setValues] = useState(initial);
  const toggle = (value) => setValues((current) =>
    current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  return [values, toggle];
}

export default function OnboardingPage() {
  const [skills, toggleSkill] = useToggleSet([]);
  const [jobTypes, toggleJobType] = useToggleSet([]);
  const [categories, toggleCategory] = useToggleSet([]);

  // TODO: Submit to API — PUT /api/candidates/me and PUT /api/candidates/me/skills
  const handleSubmit = (event) => event.preventDefault();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <PageHeader
        eyebrow="Step 1 of 1"
        title="Tell us what you can already do."
        lead="This is what your skill match is calculated from. You can change any of it later."
      />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <SectionCard title="About you">
          <div className="flex flex-col gap-4">
            <SelectField label="I am a" name="userType" options={USER_TYPES} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Education level" name="educationLevel" placeholder="e.g. Undergraduate" />
              <TextField label="Field of study" name="fieldOfStudy" placeholder="e.g. Computer Science" />
            </div>
            <TextField label="Location" name="location" placeholder="e.g. Colombo" />
          </div>
        </SectionCard>

        <SectionCard title="Your skills">
          <p className="mb-4 text-sm text-ink-soft">
            Pick everything you can use today, even at a basic level. Each role you open will show
            how many of its required skills you already cover.
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
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
            {skills.length} selected
          </p>
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
                    key={type} name="jobTypes" value={type}
                    checked={jobTypes.includes(type)} onChange={() => toggleJobType(type)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-ink-soft">
                Fields of interest
              </p>
              <div className="flex flex-wrap gap-2">
                {JOB_CATEGORIES.map((category) => (
                  <CheckChip
                    key={category} name="categories" value={category}
                    checked={categories.includes(category)} onChange={() => toggleCategory(category)}
                  />
                ))}
              </div>
            </div>

            <SelectField label="Preferred work mode" name="workMode" options={WORK_MODES} />
          </div>
        </SectionCard>

        <InfoNote>
          A skill match shows overlap between your profile and a role&apos;s requirements. It helps you
          decide where to apply — it is not a prediction of whether you will be hired.
        </InfoNote>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/candidate/dashboard"><Button variant="secondary">Skip for now</Button></Link>
          <Button type="submit">Save profile <Icon size={15} /></Button>
        </div>
      </form>
    </div>
  );
}
