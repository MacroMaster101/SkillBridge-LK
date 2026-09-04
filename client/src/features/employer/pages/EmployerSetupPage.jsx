import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { Icon, InfoNote, PageHeader, SectionCard, SelectField, TextField, TextareaField } from '../../../components/AppUI';
import { JOB_CATEGORIES } from '../../../constants';

export default function EmployerSetupPage() {
  // TODO: Submit to API — POST /api/employers
  const handleSubmit = (event) => event.preventDefault();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <PageHeader
        eyebrow="Business profile"
        title="Tell candidates who they would be joining."
        lead="This appears on every vacancy you post, so applicants know who is hiring."
      />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <SectionCard title="Your business">
          <div className="flex flex-col gap-4">
            <TextField label="Business name" name="companyName" placeholder="e.g. Pixel Lanka" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Contact person" name="contactPerson" placeholder="Who applicants hear from" required />
              <SelectField label="Business category" name="category" options={JOB_CATEGORIES} />
            </div>
            <TextareaField
              label="About the business"
              name="description"
              rows={4}
              placeholder="What you do, how big the team is, what it is like to work there."
              hint="A couple of sentences is plenty."
            />
          </div>
        </SectionCard>

        <SectionCard title="How to reach you">
          <div className="flex flex-col gap-4">
            <TextField label="Location" name="location" placeholder="e.g. Colombo" />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Contact email" type="email" name="contactEmail" placeholder="hiring@yourbusiness.lk" />
              <TextField label="Phone number" name="phone" placeholder="e.g. 011 234 5678" />
            </div>
          </div>
        </SectionCard>

        <InfoNote>
          Contact details are used for applicant correspondence and are not shown publicly on job listings.
        </InfoNote>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/employer/dashboard"><Button variant="secondary">Cancel</Button></Link>
          <Button type="submit">Save profile <Icon size={15} /></Button>
        </div>
      </form>
    </div>
  );
}
