import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveCandidate } from '../lib/candidateStorage';
import Button from '../components/Button';

const USER_TYPES = ['Undergraduate Student', 'Diploma-HND Student', 'Recent Graduate', 'Non-Student Job Seeker'];
const CATEGORIES = ['Software / IT', 'Design', 'Marketing', 'Sales', 'Admin'];
const JOB_TYPES = ['Internship', 'Part-time', 'Trainee', 'Entry-level', 'Full-time'];
const WORK_MODES = ['On-site', 'Hybrid', 'Remote'];

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    skills: '',
    preferredCategories: [],
    preferredJobTypes: [],
    preferredWorkModes: [],
    location: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (name, value, isChecked) => {
    setFormData(prev => ({
      ...prev,
      [name]: isChecked
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.type) {
      newErrors.type = 'Please select your current status.';
    }

    const skills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    if (skills.length === 0) {
      newErrors.skills = 'Add at least one skill so we can match you to jobs.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const candidate = {
      name: formData.name,
      type: formData.type,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      preferredCategories: formData.preferredCategories,
      preferredJobTypes: formData.preferredJobTypes,
      preferredWorkModes: formData.preferredWorkModes,
      location: formData.location
    };

    saveCandidate(candidate);
    navigate('/candidate-new/');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
      <p className="mt-2 text-gray-600">Tell us about your skills and preferences so we can recommend the best jobs for you.</p>

      <form className="mt-8 space-y-6 rounded-xl border bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">User Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Select your current status</option>
              {USER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="text-xs text-red-600">{errors.type}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Location (Optional)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. Colombo"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Skills & Preferences</h2>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Skills *</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. React, JavaScript, CSS, Git"
            />
            <p className="text-xs text-gray-500">Comma-separated list of your skills</p>
            {errors.skills && <p className="text-xs text-red-600">{errors.skills}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Job Categories</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <label key={cat} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.preferredCategories.includes(cat)}
                    onChange={(e) => handleCheckbox('preferredCategories', cat, e.target.checked)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Job Types</label>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map(type => (
                <label key={type} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.preferredJobTypes.includes(type)}
                    onChange={(e) => handleCheckbox('preferredJobTypes', type, e.target.checked)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Work Mode</label>
            <div className="flex flex-wrap gap-2">
              {WORK_MODES.map(mode => (
                <label key={mode} className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.preferredWorkModes.includes(mode)}
                    onChange={(e) => handleCheckbox('preferredWorkModes', mode, e.target.checked)}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => navigate('/candidate-new/')}>Skip for now</Button>
          <Button type="submit">Get Started</Button>
        </div>
      </form>
    </div>
  );
}
