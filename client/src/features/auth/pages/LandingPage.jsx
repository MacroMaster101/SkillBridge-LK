import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find opportunities that match what you can actually do.
          </h1>
          <p className="mt-6 text-lg text-brand-100">
            SkillBridge LK connects Sri Lankan students, diploma holders, and early-career
            job seekers with small-business opportunities tailored to their skills.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/jobs">
              <Button size="lg" className="min-w-[160px] bg-white text-brand-700 hover:bg-brand-50">
                Find Jobs
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="lg" className="min-w-[160px] border-white/30 bg-transparent text-white hover:bg-white/10">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">The Problem</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-brand-700">For Candidates</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>• Hard to find jobs relevant to current skills</li>
              <li>• Too many unrelated vacancies on large platforms</li>
              <li>• No simple way to track multiple applications</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-brand-700">For Employers</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>• Small businesses lack easy recruitment tools</li>
              <li>• Difficult to reach suitable junior candidates</li>
              <li>• Applications become hard to organize manually</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { step: '1', title: 'Create Profile', desc: 'Sign up and add your skills and preferences.' },
              { step: '2', title: 'Get Matched', desc: 'Browse jobs with skill-match percentages.' },
              { step: '3', title: 'Apply & Track', desc: 'Apply in one click and track your status.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to get started?</h2>
          <p className="mt-4 text-gray-600">
            Join SkillBridge LK today — whether you&apos;re looking for your next opportunity or hiring junior talent.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link to="/jobs">
              <Button variant="secondary" size="lg">Browse Jobs</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
