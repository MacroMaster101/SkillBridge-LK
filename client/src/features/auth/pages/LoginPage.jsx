import { Link } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Login</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your SkillBridge LK account.
        </p>

        {/* TODO: Implement Supabase auth login */}
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" name="password" placeholder="••••••••" required />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
