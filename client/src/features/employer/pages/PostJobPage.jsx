import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES } from '../../../constants';

export default function PostJobPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
      <p className="mt-2 text-gray-600">Create a new job listing for candidates to apply.</p>

      {/* TODO: Implement job posting — POST /api/jobs */}
      <form className="mt-8 space-y-4 rounded-xl border bg-white p-6 shadow-sm" onSubmit={(e) => e.preventDefault()}>
        <Input label="Job Title" name="title" placeholder="e.g. Frontend Development Intern" required />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={5}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Describe the role, responsibilities, and requirements..."
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required>
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" required>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Location" name="location" />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Work Mode</label>
            <select className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
              {WORK_MODES.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g. React, JavaScript, CSS (comma-separated)"
          />
          <p className="text-xs text-gray-500">Select at least one required skill.</p>
        </div>
        <Input label="Deadline" type="date" name="deadline" />
        <div className="flex justify-end gap-3">
          <Link to="/employer/dashboard">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit">Publish Job</Button>
        </div>
      </form>
    </div>
  );
}
