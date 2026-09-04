import { Link } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { ROLES } from '../../../constants';

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Join SkillBridge LK as a candidate or employer.
        </p>

        {/* TODO: Implement Supabase auth registration with role selection */}
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Full Name" name="fullName" placeholder="Your full name" required />
          <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" name="password" placeholder="••••••••" required />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">I am a</label>
            <select
              name="role"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              defaultValue={ROLES.CANDIDATE}
            >
              <option value={ROLES.CANDIDATE}>Candidate (Job Seeker)</option>
              <option value={ROLES.EMPLOYER}>Employer (Business)</option>
            </select>
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
