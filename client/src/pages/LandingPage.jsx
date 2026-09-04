import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', color: 'white', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 16px 0', fontWeight: 'bold' }}>SkillBridge LK</h1>
        <p style={{ fontSize: '1.2rem', margin: '0', opacity: 0.9 }}>
          Connect Skills with Opportunities
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        maxWidth: '800px',
        width: '100%'
      }}>
        {/* Candidate Side */}
        <div
          className="card"
          style={{
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: '40px 24px',
            textAlign: 'center'
          }}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px'
          }}>👤</div>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '1.5rem' }}>For Candidates</h2>
          <p style={{ margin: '0 0 24px 0', color: 'var(--color-muted)', lineHeight: '1.6' }}>
            Find the perfect job opportunity tailored to your skills and preferences.
          </p>
          <button className="btn" style={{ width: '100%' }}>
            Browse Jobs
          </button>
        </div>

        {/* Employer Side */}
        <div
          className="card"
          style={{
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: '40px 24px',
            textAlign: 'center'
          }}
          onClick={() => navigate('/employer/dashboard')}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px'
          }}>🏢</div>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '1.5rem' }}>For Employers</h2>
          <p style={{ margin: '0 0 24px 0', color: 'var(--color-muted)', lineHeight: '1.6' }}>
            Post jobs, manage applications, and find the best talent for your team.
          </p>
          <button className="btn" style={{ width: '100%', background: 'var(--color-primary-dark)' }}>
            Post Jobs
          </button>
        </div>
      </div>

      <p style={{
        marginTop: '60px',
        color: 'white',
        opacity: 0.8,
        textAlign: 'center'
      }}>
        Version 1.0 • Candidate & Employer Platforms
      </p>
    </div>
  );
}
