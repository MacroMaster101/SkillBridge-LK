import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveCandidate } from '../lib/candidateStorage';

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
    navigate('/');
  };

  return (
    <div className="container" style={{ maxWidth: '700px', paddingTop: '40px', paddingBottom: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0' }}>Complete Your Profile</h1>
        <p style={{ margin: '0', color: 'var(--color-muted)' }}>
          Tell us about your skills and preferences so we can recommend the best jobs for you.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '24px' }}>
          <h2 style={{ marginTop: '0', marginBottom: '20px', fontSize: '1.2rem' }}>Basic Information</h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>User Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select your current status</option>
              {USER_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <div className="field-error">{errors.type}</div>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Location (Optional)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Colombo"
            />
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h2 style={{ marginTop: '0', marginBottom: '20px', fontSize: '1.2rem' }}>Skills & Preferences</h2>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Skills *</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. React, JavaScript, CSS, Git"
            />
            <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: 'var(--color-muted)' }}>Comma-separated list of your skills</p>
            {errors.skills && <div className="field-error">{errors.skills}</div>}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>Preferred Job Categories</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
              {CATEGORIES.map(cat => (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <input
                    type="checkbox"
                    checked={formData.preferredCategories.includes(cat)}
                    onChange={(e) => handleCheckbox('preferredCategories', cat, e.target.checked)}
                  />
                  <span style={{ fontSize: '0.95rem' }}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>Preferred Job Types</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
              {JOB_TYPES.map(type => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <input
                    type="checkbox"
                    checked={formData.preferredJobTypes.includes(type)}
                    onChange={(e) => handleCheckbox('preferredJobTypes', type, e.target.checked)}
                  />
                  <span style={{ fontSize: '0.95rem' }}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>Preferred Work Mode</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
              {WORK_MODES.map(mode => (
                <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <input
                    type="checkbox"
                    checked={formData.preferredWorkModes.includes(mode)}
                    onChange={(e) => handleCheckbox('preferredWorkModes', mode, e.target.checked)}
                  />
                  <span style={{ fontSize: '0.95rem' }}>{mode}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="btn" style={{ width: '100%', padding: '12px 18px', fontSize: '1rem' }}>
          Get Started
        </button>
      </form>
    </div>
  );
}
