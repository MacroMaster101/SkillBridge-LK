import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  ErrorNote, Icon, InfoNote, PageHeader, SectionCard, SelectField, TextField, TextareaField,
} from '../../../components/AppUI';
import { JOB_CATEGORIES } from '../../../constants';
import { withSavedOption } from '../../../lib/profileOptions';
import { employerService } from '../services/employerService';
import { employerSetupSchema, fieldErrorsFromZod } from '../../../lib/validation';

const EMPTY = {
  companyName: '',
  businessCategory: JOB_CATEGORIES[0],
  description: '',
  location: '',
  contactEmail: '',
  phone: '',
};

export default function EmployerSetupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    employerService.getMe()
      .then((res) => {
        const data = res.data;
        if (!data?.companyName) return;

        setIsEditing(true);
        setForm({
          companyName: data.companyName || '',
          businessCategory: data.businessCategory || JOB_CATEGORIES[0],
          description: data.description || '',
          location: data.location || '',
          contactEmail: data.contactEmail || '',
          phone: data.phone || '',
        });
      })
      .catch(() => {})
      .finally(() => setLoadingProfile(false));
  }, []);

  const update = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const parsed = employerSetupSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(fieldErrorsFromZod(parsed.error));
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await employerService.update(parsed.data);
      } else {
        await employerService.create(parsed.data);
      }
      navigate('/employer/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || 'Could not save your business profile.';
      if (err.response?.status === 409) {
        navigate('/employer/dashboard');
        return;
      }
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingProfile) {
    return <LoadingSpinner className="py-16" size="lg" />;
  }

  const categoryOptions = withSavedOption(JOB_CATEGORIES, form.businessCategory);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <PageHeader
        eyebrow="Business profile"
        title={isEditing ? 'Update your business profile.' : 'Tell candidates who they would be joining.'}
        lead={isEditing
          ? 'Your saved business details are below. Change anything you need and save again.'
          : 'This appears on every vacancy you post, so applicants know who is hiring.'}
      />

      {isEditing && (
        <InfoNote>
          You are editing an existing business profile. All fields below show your current saved information.
        </InfoNote>
      )}

      {submitError && <ErrorNote>{submitError}</ErrorNote>}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <SectionCard title="Your business">
          <div className="flex flex-col gap-4">
            <TextField
              label="Business name"
              name="companyName"
              value={form.companyName}
              onChange={(e) => update('companyName', e.target.value)}
              placeholder="e.g. Pixel Lanka"
              error={errors.companyName}
              required
            />
            <SelectField
              label="Business category"
              name="businessCategory"
              value={form.businessCategory}
              onChange={(e) => update('businessCategory', e.target.value)}
              options={categoryOptions}
              error={errors.businessCategory}
            />
            <TextareaField
              label="About the business"
              name="description"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              placeholder="What you do, how big the team is, what it is like to work there."
              hint="A couple of sentences is plenty."
              error={errors.description}
            />
          </div>
        </SectionCard>

        <SectionCard title="How to reach you">
          <div className="flex flex-col gap-4">
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="e.g. Colombo"
              error={errors.location}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Contact email"
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={(e) => update('contactEmail', e.target.value)}
                placeholder="hiring@yourbusiness.lk"
                error={errors.contactEmail}
              />
              <TextField
                label="Phone number"
                name="phone"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="e.g. 011 234 5678"
                error={errors.phone}
              />
            </div>
          </div>
        </SectionCard>

        <InfoNote>
          Contact details are used for applicant correspondence and are not shown publicly on job listings.
        </InfoNote>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/employer/dashboard"><Button variant="secondary" type="button">Cancel</Button></Link>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving…' : isEditing ? 'Save changes' : 'Save profile'} <Icon size={15} />
          </Button>
        </div>
      </form>
    </div>
  );
}
