import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { USER_TYPES, JOB_TYPES, WORK_MODES, JOB_CATEGORIES } from '../../../constants';

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
      <p className="mt-2 text-gray-600">
        Tell us about your skills and preferences so we can recommend the best jobs for you.
      </p>

      {/* TODO: Implement onboarding form with React Hook Form + Zod validation */}
      <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900">Basic Information</h2>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <select className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
              {USER_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Education Level</label>
              <input type="text" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Undergraduate" />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input type="text" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Computer Science" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="e.g. Colombo" />
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900">Skills & Preferences</h2>
          <p className="text-sm text-gray-500">Select at least one skill and one job preference.</p>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Preferred Job Types</label>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <label key={type} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm">
                  <input type="checkbox" name="jobTypes" value={type} />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Preferred Work Mode</label>
            <select className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
              {WORK_MODES.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Preferred Categories</label>
            <div className="flex flex-wrap gap-2">
              {JOB_CATEGORIES.map((cat) => (
                <label key={cat} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm">
                  <input type="checkbox" name="categories" value={cat} />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link to="/candidate/dashboard">
            <Button variant="secondary">Skip for now</Button>
          </Link>
          <Button type="submit">Save Profile</Button>
        </div>
      </form>
    </div>
  );
}
