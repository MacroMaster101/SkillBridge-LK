# SkillBridge LK

> Connecting Sri Lankan students, diploma holders, undergraduates, and early-career job seekers with small-business opportunities that match their skills.

**Module:** SE3090 – Software Engineering Frameworks  
**Assessment:** Assignment 2 — Mini Hackathon

## Problem

Early-career job seekers in Sri Lanka struggle to find relevant internships, part-time work, and entry-level roles. Small businesses lack simple tools to reach junior candidates and manage applications.

## Proposed Solution

SkillBridge LK is a lightweight recruitment platform where candidates complete onboarding with skills and preferences, then browse jobs with skill-match percentages. Employers post vacancies, review applicants, and update application statuses.

## Main Features (MVP)

- Candidate onboarding with skills and preferences
- Employer job posting and business profile
- Job listing with search and filters
- Skill-based match percentage
- Apply to jobs and track application status
- Employer applicant management

## Technologies

| Layer | Stack |
|-------|-------|
| Frontend | React, Vite, React Router, Tailwind CSS, Axios, React Hook Form, Zod |
| Backend | Node.js, Express, Zod |
| Database & Auth | Supabase (PostgreSQL) |

## Architecture

```
React Frontend  →  HTTP/JSON  →  Node.js/Express API  →  Supabase PostgreSQL
```

## Project Structure

```
SkillBridge-LK/
├── client/          # React frontend (Vite)
├── server/          # Express API
├── supabase/        # Database schema & seed SQL
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Database Setup

1. Create a Supabase project
2. Run `supabase/schema.sql` in the SQL Editor
3. Run `supabase/seed.sql` to seed skills

### 2. Environment Variables

Copy the example env files and fill in your Supabase credentials:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

**Backend** (`server/.env`):
```env
PORT=5000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
CLIENT_URL=http://localhost:5173
```

> Never commit real keys. The service role key must only be used on the backend.

### 3. Install Dependencies

```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

### 4. Running Locally

Open two terminals:

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/health

## Team Workflow

Each feature area has placeholder pages and `TODO` comments marking where to implement logic:

| Area | Path | Owner task |
|------|------|------------|
| Auth | `client/src/features/auth/` | Supabase login/register |
| Onboarding | `client/src/features/onboarding/` | Candidate profile form |
| Jobs | `client/src/features/jobs/` | Job listing, filters, details |
| Applications | `client/src/features/applications/` | Apply & track status |
| Employer | `client/src/features/employer/` | Dashboard, post job, applicants |
| API | `server/src/controllers/` | Connect controllers to Supabase |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List all active jobs |
| GET | `/api/jobs/:id` | Get job details |
| POST | `/api/jobs` | Create job (employer) |
| POST | `/api/jobs/:jobId/apply` | Apply to job (candidate) |
| GET | `/api/candidates/me` | Get candidate profile |
| PUT | `/api/candidates/me` | Update candidate profile |
| GET | `/api/candidates/me/recommendations` | Recommended jobs |
| GET | `/api/applications/me` | My applications |
| GET | `/api/jobs/:jobId/applications` | Job applicants (employer) |
| PATCH | `/api/applications/:id/status` | Update application status |

## Deployment

- **Frontend:** Vercel
- **Backend:** Render or Railway
- **Database:** Supabase cloud

## Team Members

<!-- Add team member names and roles here -->

## Contributions

<!-- Document each member's contributions -->

## AI Tools Used

<!-- Document any AI tools used during development -->

## Deployed Application

<!-- Add deployed URL here -->

## Demo Video

<!-- Add demo video link here -->
