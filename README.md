# 🌉 SkillBridge LK

> **Entry-level should mean entry-level.**
> Connecting Sri Lankan students, diploma holders, undergraduates and early-career job seekers with small-business opportunities that match their skills.

<p>
  <img alt="Module" src="https://img.shields.io/badge/Module-SE3090-14202e?style=flat-square" />
  <img alt="Assessment" src="https://img.shields.io/badge/Assessment-Mini%20Hackathon-e9a227?style=flat-square" />
  <img alt="Stack" src="https://img.shields.io/badge/Stack-React%20%2B%20Express%20%2B%20Supabase-0f6357?style=flat-square" />
</p>

**Module:** SE3090 – Software Engineering Frameworks
**Assessment:** Assignment 2 — Mini Hackathon
**Team size:** 4

---

## 🇱🇰 Problem

Sri Lankan undergraduates, diploma and HND holders, recent graduates and other early-career job seekers struggle to find internships, part-time work, trainee positions and entry-level roles that are actually relevant to their skills.

**On the candidate side:**

- 🔍 Hard to find jobs relevant to the skills they already have
- 📚 Too many unrelated vacancies to sift through
- 🎓 Beginner-friendly roles are difficult to identify
- 📋 No simple way to track multiple applications
- 🪪 Non-degree candidates get fewer targeted opportunities

**On the employer side:**

- 🏪 Small businesses need a simple way to publish vacancies
- 🤝 Employers need to reach suitable junior candidates
- 🗂️ Applications become hard to organise manually
- 📨 No easy way to keep candidates updated on progress

On large job platforms, entry-level candidates compete directly with experienced applicants, and small businesses rarely have a dedicated recruitment system.

---

## 💡 Proposed Solution

SkillBridge LK is a lightweight recruitment platform built specifically for the **first step** of a career.

Candidates complete a short onboarding process covering their education level, student status, skills, preferred job categories, job type and work mode. The system then compares their skills against the skills each vacancy requires and shows a **skill-match percentage**, so candidates know where they stand *before* they apply.

Small businesses create an employer profile, post vacancies with required skills, review applicants alongside their match percentage, and move applications through a clear status flow that candidates can follow from their own dashboard.

```text
Candidate Skills → Relevant Job → Skill Match → Apply
       → Application Tracking → Employer Review → Status Update
```

---

## ✨ Main Features

These map directly to the assignment's minimum software requirements:

| # | Feature | Meets requirement |
|---|---|---|
| 1 | 🧑‍🎓 **Candidate onboarding** | User-input form + input validation |
| 2 | 🏢 **Employer profile** | User-input form + input validation |
| 3 | 📝 **Job posting** | User-input form + input validation |
| 4 | 📃 **Job listing** | Display / process information |
| 5 | 🔎 **Search & filters** | Search / filter information |
| 6 | 🎯 **Skill-match percentage** (`matched job skills ÷ total job skills × 100`) | Calculate information |
| 7 | 🚀 **Apply to a job** | Functional feature #1 |
| 8 | 📊 **Candidate dashboard** | Functional feature #2 (track status) |
| 9 | 👥 **Employer applicant view** | Update / process information |
| 10 | 🔄 **Status updates** (Applied → Under Review → Shortlisted → Hired / Rejected) | Update information |

Together, features **7 (apply to a job)** and **10 (status updates)** are the two core functional features required by the brief; the rest layer on top of that loop.

### 📌 Current build status

| Area | Status |
|---|---|
| Public pages (landing, jobs, job details, employers, login, register) | ✅ Complete |
| Backend API, Supabase schema & seed data | ✅ Complete |
| Skill-match calculation | ✅ Complete |
| Supabase authentication | 🚧 In progress |
| Candidate & employer dashboards | 🚧 In progress |

> ⚠️ The public pages currently display **sample listings** from `client/src/features/jobs/data/publicJobs.js`. They demonstrate the browsing experience and are not live vacancies.

---

## 🛠️ Technologies

| Layer | Stack |
|---|---|
| 🖥️ **Frontend** | React 18, Vite 6, React Router 6, Axios, React Hook Form, Zod |
| ⚙️ **Backend** | Node.js, Express 4, Zod |
| 🗄️ **Database & Auth** | Supabase (PostgreSQL + Auth + Row-Level Security) |
| 🎨 **Styling** | Custom CSS design system (public pages) + Tailwind CSS (app pages) |
| ☁️ **Deployment** | Vercel (frontend) · Railway (backend) · Supabase (database) |

---

## 🏗️ Architecture

```text
┌─────────────────┐   HTTP/JSON   ┌──────────────────┐   supabase-js   ┌──────────────┐
│  React (Vite)   │ ────────────► │  Node / Express  │ ──────────────► │   Supabase   │
│  localhost:5173 │ ◄──────────── │  localhost:5000  │ ◄────────────── │  PostgreSQL  │
└─────────────────┘               └──────────────────┘                 └──────────────┘
        │                                                                      ▲
        └──────────────── Supabase Auth (anon key, browser) ───────────────────┘
```

🔐 The **service role key lives only on the backend**. The browser only ever receives the public anon key.

### 📁 Project structure

```text
SkillBridge-LK/
├── client/            # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── components/    # Shared UI + public design system
│       ├── features/      # auth · jobs · onboarding · applications · employer
│       ├── layouts/       # Public / Candidate / Employer shells
│       ├── routes/        # React Router configuration
│       └── services/      # Axios client + Supabase client
├── server/            # Express API
│   └── src/
│       ├── config/        # env + Supabase admin client
│       ├── controllers/   # Request handlers
│       ├── middleware/    # auth · validation · error handling
│       ├── routes/        # API route definitions
│       ├── services/      # Database access logic
│       ├── utils/         # Skill-match calculation
│       └── validators/    # Zod schemas
└── supabase/          # schema.sql + seed.sql
```

---

## ⚡ Setup Instructions

### ✅ Prerequisites

- **Node.js 20 or later** and npm
- A free [Supabase](https://supabase.com) project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MacroMaster101/SkillBridge-LK.git
cd SkillBridge-LK
```

### 2️⃣ Set up the database

In your Supabase project's **SQL Editor**:

1. Run `supabase/schema.sql` — creates all 8 tables and row-level security policies
2. Run `supabase/seed.sql` — seeds the 21 starter skills

Tables created: `profiles`, `candidate_profiles`, `employers`, `skills`, `candidate_skills`, `jobs`, `job_skills`, `applications`.

### 3️⃣ Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 4️⃣ Create the environment files

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Then fill them in as described below.

---

## 🔑 Environment Variables

### Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend — `server/.env`

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CLIENT_URL=http://localhost:5173
```

> 🚨 **Never commit real keys.** Both `.env` files are gitignored.
> The `SUPABASE_SERVICE_ROLE_KEY` bypasses row-level security and must **only** be used on the backend — never in the frontend.

---

## 🖥️ Running Frontend

```bash
cd client
npm run dev
```

🌐 Available at **http://localhost:5173**

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build for production into `client/dist` |
| `npm run preview` | Preview the production build locally |

---

## ⚙️ Running Backend

```bash
cd server
npm run dev
```

🌐 Available at **http://localhost:5000** · health check: **http://localhost:5000/health**

| Script | What it does |
|---|---|
| `npm run dev` | Start the API with `node --watch` (auto-restart) |
| `npm start` | Start the API without watch mode |

Run both in **two separate terminals**.

### 📡 API reference

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `GET` | `/health` | — | Service health check |
| `GET` | `/api/jobs` | — | List active jobs (supports `search`, `category`, `jobType`, `workMode`, `location`) |
| `GET` | `/api/jobs/:id` | — | Job details |
| `POST` | `/api/jobs` | 🔒 Employer | Create a vacancy |
| `POST` | `/api/jobs/:jobId/apply` | 🔒 Candidate | Apply to a job |
| `GET` | `/api/jobs/:jobId/applications` | 🔒 Employer | Applicants for a job |
| `GET` | `/api/candidates/me` | 🔒 Candidate | Own profile |
| `PUT` | `/api/candidates/me` | 🔒 Candidate | Update profile |
| `PUT` | `/api/candidates/me/skills` | 🔒 Candidate | Update skills |
| `POST` | `/api/employers` | 🔒 Employer | Create business profile |
| `GET` | `/api/employers/me` | 🔒 Employer | Own business profile |
| `GET` | `/api/applications/me` | 🔒 Candidate | Own applications |
| `PATCH` | `/api/applications/:applicationId/status` | 🔒 Employer | Update application status |

🔒 Protected routes require an `Authorization: Bearer <supabase_access_token>` header.

---

## 🚀 Deployment

| Piece | Host | Notes |
|---|---|---|
| 🖥️ Frontend | **Vercel** | Root Directory `client`, framework preset **Vite**, output `dist`. `client/vercel.json` adds the SPA rewrite so deep links like `/jobs/1` resolve. |
| ⚙️ Backend | **Railway** | Root Directory `server`, start command `npm start`. Set `CLIENT_URL` to the deployed frontend URL so CORS passes. Railway auto-detects Node and assigns a `PORT` — make sure `server` reads `process.env.PORT`. |
| 🗄️ Database | **Supabase** | Run `schema.sql` then `seed.sql` in the SQL Editor. |

Set the same environment variables in each host's dashboard — local `.env` files are not deployed.

---

## 🧪 Demo Accounts

<!-- TODO: Create these in Supabase Auth before the demo and fill in the credentials. -->

| Role | Email | Password |
|---|---|---|
| 🧑‍🎓 Candidate |  | roshenibolonne@gmail.com | Rosheni@123
| 🏢 Employer | kavisha@gmail.com | abcd1234 |

---

## 👥 Team Members

<!-- TODO: Replace with real names and student IDs before submission. -->

| # | Name | Student ID | Focus area |
|---|---|---|---|
| 1 | Bolonne B.R.M. | IT24102050 | Candidate frontend |
| 2 | J.L.K.L. Liyanage | IT24101927 | Employer frontend |
| 3 | Jayasekara C.D | IT24103494 | Employer Backend + Supabase |
| 4 | Kodagoda D.S | IT24101613 | Candidate Backend|

---

## 🤝 Contributions

<!-- TODO: Fill in per member. Every member must have their own commits in the repo. -->

| Member | Contribution |
|---|---|
| Bolonne B.R.M. | Candidate onboarding form, candidate dashboard, application tracking UI |
| Kodagoda D.S. | Employer profile setup, job posting form, applicant management UI |
| Jayasekara C.D.| Supabase schema and RLS, Express API, authentication middleware |
| J.L.K.L. Liyanage | Skill-match logic, frontend/backend integration, deployment |

---

## 🤖 AI Tools Used

**Declaration:**

> AI assistants (Claude and Cursor) were used to support component scaffolding, API structure, debugging and sample data generation. The team reviewed, tested, modified and can explain all submitted code.

### 📝 AI prompt log

| AI Tool | Prompt (summary) | Purpose | How the output was checked / modified |
|---|---|---|---|
| Claude Code | "Redesign all public landing pages" | Public UI design system, landing / jobs / employers / auth pages | Reviewed in browser at desktop and mobile widths; verified `npm run build`, accessibility and responsive behaviour |
| Claude Code | "Build the candidate onboarding flow and skill-match display" | Candidate onboarding form, job feed match %, application dashboard | Reviewed component-by-component, checked validation messages, tested on mobile width |
| Cursor | `_TBD_` | `_TBD_` | `_TBD_` |

> 🔐 Do not include API keys, passwords or personal information in the prompt log.

---

## 🌐 Deployed Application

<!-- TODO: Add the public URLs once deployed. -->

- 🖥️ **Frontend (Vercel):** `_TBD_`
- ⚙️ **Backend / API health check (Railway):** `_TBD_/health`

> ✅ Test the deployed link in an **incognito window** before submitting.

---

## 🎬 Demo Video

<!-- TODO: Add the two-minute demo video link. -->

📹 **Link:** `_TBD_`

**Suggested two-minute flow:** problem → solution → candidate onboarding → skill match → apply → employer review → status update → impact.

---

## ✅ Requirements Checklist

| Requirement | How SkillBridge LK meets it |
|---|---|
| Clear landing page / main UI | ✅ Public landing page with search and skill-match demo |
| Sri Lankan problem explained in-app | ✅ Problem framing throughout the public pages |
| At least two functional features | ✅ Apply to a job **and** track/update application status |
| At least one user-input form | ✅ Onboarding, job posting, registration, search |
| Input validation with friendly errors | ✅ Zod schemas on the API, HTML + form validation on the client |
| Search / filter / calculate / process | ✅ Job search, filters, and skill-match calculation |
| Responsive desktop & mobile UI | ✅ Verified at 1440px and 375px |
| Basic navigation | ✅ Public, candidate and employer route groups |
| Relevant sample data | ✅ 21 seeded skills + sample Sri Lankan job listings |
| Clear value to Sri Lankan users | ✅ Improves entry-level employment access |

---

<p align="center">
  <strong>🌉 SkillBridge LK</strong> — built for the people taking their first step.<br />
  <sub>ඔබේ ඊළඟ පියවර · உங்கள் அடுத்த படி · Your next step</sub>
</p>
