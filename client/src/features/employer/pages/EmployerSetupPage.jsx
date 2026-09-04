import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES } from '../../../constants';

export default function EmployerSetupPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Set Up Your Business Profile</h1>
      <p className="mt-2 text-gray-600">
        Tell us about your business so you can start posting jobs.
      </p>

      {/* TODO: Implement employer profile creation — POST /api/employers */}
      <form className="mt-8 space-y-4 rounded-xl border bg-white p-6 shadow-sm" onSubmit={(e) => e.preventDefault()}>
        <Input label="Business Name" name="companyName" required />
        <Input label="Contact Person" name="contactPerson" required />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Business Category</label>
          <select className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={4}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Brief description of your business..."
          />
        </div>
        <Input label="Location" name="location" />
        <Input label="Contact Email" type="email" name="contactEmail" />
        <Input label="Phone Number" name="phone" />
        <div className="flex justify-end">
          <Link to="/employer/dashboard">
            <Button type="submit">Save & Continue</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
