# SkillBridge LK — Full Mini Hackathon Project Plan

**Module:** SE3090 – Software Engineering Frameworks  
**Assessment:** Assignment 2 — Mini Hackathon  
**Team Size:** 4 members  
**Main Stack:** React + Node.js/Express + Supabase  
**Suggested Deployment:** Vercel (frontend) + Render/Railway (backend) + Supabase (database/auth)

---

# 1. Project Overview

## Project Name

**SkillBridge LK**

### Tagline

> Connecting Sri Lankan students, diploma holders, undergraduates, and early-career job seekers with small-business opportunities that match their skills.

---

# 2. Real-World Problem

Sri Lankan undergraduates, diploma holders, recent graduates, and other early-career job seekers often struggle to find internships, part-time work, trainee positions, and simple entry-level jobs that are actually relevant to their skills and education.

At the same time, many small businesses may have suitable vacancies but lack an easy way to reach junior candidates and manage applications.

Large job platforms can also make entry-level candidates compete with experienced applicants, while small businesses may not have dedicated recruitment systems.

## Core Problems

### Candidate Side

- Difficulty finding jobs relevant to current skills.
- Too many unrelated vacancies.
- Hard to identify internships and beginner-friendly roles.
- No simple way to track multiple applications.
- Diploma holders and non-degree candidates may have fewer targeted opportunities.

### Employer Side

- Small businesses need a simple way to publish vacancies.
- Employers need to reach suitable junior candidates.
- Applications can become difficult to organize manually.
- Employers need a basic way to update candidates on progress.

---

# 3. Proposed Solution

SkillBridge LK is a lightweight recruitment platform focused on:

- Undergraduates
- Diploma / HND holders
- Recent graduates
- Non-student early-career job seekers

Candidates complete a short onboarding process where they provide:

- Education level
- Student/non-student classification
- Skills
- Preferred job categories
- Preferred job type
- Preferred location/work mode

The system then recommends available jobs by comparing the candidate's skills against the skills required by each vacancy.

Small businesses can:

- Create employer profiles
- Post vacancies
- Define required skills
- View applicants
- Update application statuses

Candidates can:

- Browse jobs
- Search/filter jobs
- View skill-match percentage
- Apply to jobs
- Track application status from a dashboard

---

# 4. Target Users

## 4.1 Candidate

A candidate may be:

- Undergraduate student
- Diploma/HND student
- Recent graduate
- Non-student job seeker

### Candidate Goals

- Find relevant opportunities.
- See jobs matching existing skills.
- Apply easily.
- Track progress after applying.

---

## 4.2 Employer

An employer is typically:

- Small business owner
- Startup
- SME
- Local service provider
- Small software company
- Retail business
- Restaurant/hotel
- Marketing/design agency
- Other organization offering junior roles

### Employer Goals

- Post vacancies quickly.
- Define required candidate skills.
- View applications.
- Change applicant status.

---

## 4.3 Platform Admin — Optional / Stretch

A true admin manages the platform itself.

Possible admin actions:

- View users
- View employers
- Disable fake jobs
- Remove inappropriate listings

**Do not prioritize this during the 4-hour MVP.**

The main business-facing dashboard should be called the **Employer Dashboard**, not Admin Dashboard.

---

# 5. Hackathon MVP Scope

The MVP should contain only features that can be completed, integrated, tested, deployed, and demonstrated within the four-hour session.

## Must-Have Features

1. Candidate onboarding
2. Candidate skills and preferences
3. Employer job posting
4. Job listing
5. Search and filters
6. Skill-based recommendation/match percentage
7. Apply to job
8. Candidate application dashboard
9. Employer applicant dashboard
10. Employer application-status update

---

# 6. Features

# 6.1 Candidate Onboarding

The candidate completes onboarding after registration.

## Fields

- Full name
- User type
- Education level
- Field of study
- Location
- Skills
- Preferred job categories
- Preferred job types
- Preferred work mode

### User Type

- Undergraduate Student
- Diploma / HND Student
- Recent Graduate
- Non-Student Job Seeker

### Job Type Preferences

- Internship
- Part-time
- Trainee
- Entry-level
- Full-time

### Work Mode

- On-site
- Hybrid
- Remote

---

# 6.2 Employer Profile

Employer creates a basic business profile.

## Fields

- Business name
- Contact person
- Business category
- Business description
- Location
- Contact email
- Phone number

For hackathon scope, no complex employer verification is required.

---

# 6.3 Job Posting

Employers can create a job.

## Fields

- Job title
- Description
- Category
- Job type
- Location
- Work mode
- Required skills
- Optional minimum education level
- Deadline
- Status

### Job Categories

Suggested sample categories:

- Software / IT
- Graphic Design
- Marketing
- Sales
- Administration
- Accounting / Finance
- Customer Service
- Hospitality
- Retail
- Data Entry
- Other

---

# 6.4 Job Browsing

Candidates can browse available jobs.

Each job card should display:

- Job title
- Company
- Category
- Job type
- Location
- Work mode
- Required skills
- Match percentage
- Posted date
- View Details button

---

# 6.5 Search and Filtering

Candidates should be able to search by:

- Job title
- Company
- Category

Filters:

- Job category
- Job type
- Work mode
- Location
- Minimum skill match

This directly demonstrates information searching/filtering.

---

# 6.6 Skill Matching

use openAI to skill matching
---

# 6.7 Recommended Jobs

After onboarding, the candidate dashboard should show:

## Recommended For You

Sort active jobs by skill-match percentage.

Example:

```text
Frontend Developer Intern
ABC Solutions
80% Match

Matched:
✓ React
✓ JavaScript
✓ CSS
✓ Git

Missing:
○ TypeScript
```

Recommendation can be rule-based.

**Do not build a machine-learning recommendation engine during the hackathon.**

---

# 6.8 Apply to Job

Candidate clicks:

```text
Apply Now
```

Create an application record.

Possible optional message:

```text
Why are you interested in this role?
```

For MVP, CV upload is not required.

After applying:

```text
Application submitted successfully.
```

The job should now appear in the candidate dashboard.

---

# 6.9 Candidate Application Dashboard

Candidate can view applications.

Example statuses:

- Applied
- Under Review
- Shortlisted
- Rejected
- Hired

Example:

```text
Frontend Developer Intern
ABC Solutions

Status: Under Review
Applied: 04 Sep 2026
```

Use status badges.

---

# 6.10 Employer Dashboard

Employer sees:

- Active jobs
- Number of applications
- Total applicants
- Job cards
- Create Job button

Example:

```text
ABC Solutions

Active Jobs: 3
Applications: 18

Frontend Developer Intern
12 applicants

[View Applicants]
```

---

# 6.11 Employer Applicant Management

Employer selects a job.

Display:

- Candidate name
- Candidate type
- Education
- Skills
- Match percentage
- Current application status

Employer can update status:

```text
Applied
↓
Under Review
↓
Shortlisted
↓
Hired
```

or:

```text
Rejected
```

Candidate dashboard should reflect the changed status.

---

# 7. Features NOT to Build During MVP

Avoid these until all required features are working:

- CV parsing
- Complex CV uploads
- Messaging/chat
- Interview scheduling
- Email notifications
- Employer verification workflow
- Payment system
- LinkedIn integration
- Video interview
- AI-generated CVs
- Machine-learning recommendation engine
- Complex platform-admin panel
- Multi-step company approval
- Real-time chat
- Social login unless very easy

These can be future improvements.

---

# 8. Tech Stack

# 8.1 Frontend

## React

Suggested tools:

- React
- Vite
- React Router
- Axios or Fetch
- React Hook Form
- Zod or Yup
- Tailwind CSS / Bootstrap / Material UI / plain CSS

Recommended:

```text
React + Vite
React Router
Axios
React Hook Form
Zod
Tailwind CSS
```

---

# 8.2 Backend

## Node.js + Express

Responsibilities:

- API routes
- Authentication checks
- Validation
- Business logic
- Skill-match calculation if done server-side
- Supabase communication
- Application-status updates

Suggested libraries:

```text
express
cors
dotenv
@supabase/supabase-js
zod
```

Optional:

```text
helmet
morgan
```

---

# 8.3 Database and Authentication

## Supabase

Use Supabase for:

- PostgreSQL database
- Authentication
- Optional file storage
- Hosted database
- SQL editor

Recommended approach:

```text
React
   ↓ HTTP/JSON
Node.js / Express
   ↓
Supabase PostgreSQL
```

Supabase Auth can handle candidate/employer login.

---

# 8.4 Deployment

## Frontend

Recommended:

- Vercel

Alternative:

- Netlify

## Backend

Recommended:

- Render

Alternative:

- Railway

## Database

- Supabase cloud

---

# 9. System Architecture

```text
┌──────────────────────────────┐
│       React Frontend         │
│                              │
│ Candidate UI                 │
│ Employer UI                  │
│ Forms / Filters / Dashboard  │
└──────────────┬───────────────┘
               │
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│     Node.js + Express API    │
│                              │
│ Validation                   │
│ Business Logic               │
│ Recommendation Logic         │
│ Authorization                │
└──────────────┬───────────────┘
               │
               │ Supabase SDK
               ▼
┌──────────────────────────────┐
│          Supabase            │
│                              │
│ PostgreSQL                   │
│ Authentication               │
│ Optional Storage             │
└──────────────────────────────┘
```

---

# 10. Suggested Repository Structure

```text
skillbridge-lk/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── features/
│   │   │
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── jobs/
│   │   ├── applications/
│   │   └── employer/
│   │
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── config/
│   │
│   └── server.js
│
├── README.md
└── .gitignore
```

---

# 11. React Feature Structure

```text
src/
│
├── components/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── StatusBadge.jsx
│   └── LoadingSpinner.jsx
│
├── layouts/
│   ├── PublicLayout.jsx
│   ├── CandidateLayout.jsx
│   └── EmployerLayout.jsx
│
├── features/
│   │
│   ├── auth/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   │
│   ├── onboarding/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   │
│   ├── jobs/
│   │   ├── pages/
│   │   │   ├── JobsPage.jsx
│   │   │   └── JobDetailsPage.jsx
│   │   ├── components/
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobFilters.jsx
│   │   │   ├── MatchBadge.jsx
│   │   │   └── SkillTag.jsx
│   │   └── services/
│   │
│   ├── applications/
│   │   ├── CandidateApplicationsPage.jsx
│   │   ├── ApplicationCard.jsx
│   │   └── services/
│   │
│   └── employer/
│       ├── EmployerDashboard.jsx
│       ├── PostJobPage.jsx
│       ├── EmployerJobsPage.jsx
│       ├── ApplicantsPage.jsx
│       └── services/
│
└── services/
    └── api.js
```

---

# 12. Pages

# Public

- Landing Page
- Login
- Register

# Candidate

- Candidate Onboarding
- Candidate Dashboard
- Recommended Jobs
- All Jobs
- Job Details
- My Applications

# Employer

- Employer Setup
- Employer Dashboard
- Post Job
- My Jobs
- View Applicants

---

# 13. Landing Page

Suggested sections:

1. Hero
2. Problem statement
3. How it works
4. Candidate benefits
5. Employer benefits
6. Call to action

Example hero:

> Find opportunities that match what you can actually do.

Buttons:

```text
Find Jobs
Post a Job
```

---

# 14. Database Design — Supabase PostgreSQL

# 14.1 profiles

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('candidate', 'employer')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 14.2 candidate_profiles

```sql
CREATE TABLE candidate_profiles (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    user_type TEXT NOT NULL,
    education_level TEXT,
    field_of_study TEXT,
    location TEXT,
    preferred_work_mode TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE
);
```

---

# 14.3 employers

```sql
CREATE TABLE employers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    business_category TEXT,
    description TEXT,
    location TEXT,
    contact_email TEXT,
    phone TEXT
);
```

---

# 14.4 skills

```sql
CREATE TABLE skills (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);
```

---

# 14.5 candidate_skills

```sql
CREATE TABLE candidate_skills (
    user_id UUID REFERENCES candidate_profiles(user_id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, skill_id)
);
```

---

# 14.6 jobs

```sql
CREATE TABLE jobs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employer_id BIGINT NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    job_type TEXT NOT NULL,
    location TEXT,
    work_mode TEXT,
    minimum_education TEXT,
    deadline DATE,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# 14.7 job_skills

```sql
CREATE TABLE job_skills (
    job_id BIGINT REFERENCES jobs(id) ON DELETE CASCADE,
    skill_id BIGINT REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (job_id, skill_id)
);
```

---

# 14.8 applications

```sql
CREATE TABLE applications (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_id BIGINT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES candidate_profiles(user_id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'APPLIED',
    message TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(job_id, candidate_id)
);
```

---

# 15. Relationships

```text
auth.users
    │
    │ 1:1
    ▼
profiles
    │
    ├──────── Candidate
    │
    ▼
candidate_profiles
    │
    │ M:N
    ▼
candidate_skills
    │
    ▼
skills


profiles
    │
    └──────── Employer
             │
             ▼
          employers
             │
             │ 1:N
             ▼
            jobs
             │
             │ M:N
             ▼
         job_skills
             │
             ▼
           skills


candidate_profiles
        │
        │ 1:N
        ▼
   applications
        ▲
        │ N:1
        │
       jobs
```

---

# 16. Sample Skill Data

Seed the database with:

```text
React
JavaScript
TypeScript
HTML
CSS
Node.js
Express
Git
SQL
PostgreSQL
Supabase
Figma
Canva
Microsoft Excel
Communication
Customer Service
Social Media Marketing
Content Writing
Accounting
Data Entry
Sales
```

---

# 17. Sample Job Data

Create at least 8–12 jobs for demonstration.

Examples:

## Frontend Development Intern

Company: Pixel Lanka

Required Skills:

- React
- JavaScript
- CSS
- Git

Type:

- Internship

---

## Junior Graphic Design Assistant

Company: Creative Hub

Skills:

- Figma
- Canva
- Communication

Type:

- Part-time

---

## Social Media Trainee

Company: Lanka Foods

Skills:

- Social Media Marketing
- Content Writing
- Canva

Type:

- Trainee

---

## Data Entry Assistant

Company: ABC Traders

Skills:

- Microsoft Excel
- Data Entry
- Communication

Type:

- Part-time

---

# 18. Backend API Plan

Base URL:

```text
/api
```

---

# 18.1 Authentication

Supabase Auth handles:

```text
POST /signup
POST /login
POST /logout
```

Node middleware verifies authenticated user token.

---

# 18.2 Candidate Routes

```http
GET /api/candidates/me

PUT /api/candidates/me

PUT /api/candidates/me/skills

GET /api/candidates/me/recommendations
```

---

# 18.3 Job Routes

```http
GET /api/jobs

GET /api/jobs/:id

POST /api/jobs

PUT /api/jobs/:id

DELETE /api/jobs/:id
```

For hackathon, implement only:

```text
GET
POST
```

first.

Update/delete are secondary.

---

# 18.4 Application Routes

```http
POST /api/jobs/:jobId/apply

GET /api/applications/me

GET /api/jobs/:jobId/applications

PATCH /api/applications/:applicationId/status
```

---

# 19. Example API Responses

## GET /api/jobs

```json
[
  {
    "id": 1,
    "title": "Frontend Development Intern",
    "company": "Pixel Lanka",
    "category": "Software / IT",
    "jobType": "Internship",
    "location": "Colombo",
    "workMode": "Hybrid",
    "skills": [
      "React",
      "JavaScript",
      "CSS",
      "Git"
    ]
  }
]
```

---

# 20. Validation

Use friendly validation messages.

## Candidate Onboarding

- Name required
- User type required
- At least one skill required
- At least one job preference required

Example:

```text
Please select at least one skill.
```

---

## Job Posting

- Job title required
- Description required
- Category required
- Job type required
- At least one required skill
- Deadline cannot be in the past

---

## Application

Prevent duplicate applications.

Example:

```text
You have already applied for this job.
```

---

# 21. Authentication

Recommended:

## Supabase Auth

Account types:

```text
candidate
employer
```

Store the role in:

```text
profiles.role
```

After login:

```text
candidate → Candidate Dashboard
employer  → Employer Dashboard
```

---

# 22. Security Notes

Do not expose:

```text
SUPABASE_SERVICE_ROLE_KEY
```

inside React.

Only the Node backend should use the service-role key if it is required.

React can use:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

for Supabase Auth.

Server:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

Environment files:

```text
.env
```

must be included in:

```text
.gitignore
```

---

# 23. Supabase Row-Level Security

If React directly reads any Supabase tables, configure Row-Level Security.

For the safest hackathon architecture:

```text
React
   ↓
Express
   ↓
Supabase DB
```

and keep sensitive database operations in the backend.

Possible RLS rules if needed:

- Candidate can read active jobs.
- Candidate can read own applications.
- Candidate can update own profile.
- Employer can manage only jobs belonging to their company.
- Employer can see applications only for their jobs.

---

# 24. Candidate Workflow

```text
Register
   ↓
Choose Candidate
   ↓
Candidate Onboarding
   ↓
Select Skills
   ↓
Save Profile
   ↓
Candidate Dashboard
   ↓
Recommended Jobs
   ↓
View Job
   ↓
Apply
   ↓
My Applications
   ↓
Track Status
```

---

# 25. Employer Workflow

```text
Register
   ↓
Choose Employer
   ↓
Create Business Profile
   ↓
Employer Dashboard
   ↓
Post Job
   ↓
Job Appears on Platform
   ↓
Candidates Apply
   ↓
View Applicants
   ↓
Update Status
```

---

# 26. Application State Flow

```text
APPLIED
   ↓
UNDER_REVIEW
   ↓
SHORTLISTED
   ↓
HIRED
```

Alternative:

```text
UNDER_REVIEW
   ↓
REJECTED
```

Store values consistently:

```text
APPLIED
UNDER_REVIEW
SHORTLISTED
REJECTED
HIRED
```

---

# 27. Recommendation Logic

## MVP Version

Use skill overlap only.

```text
skillMatch =
matchedJobSkills / totalJobSkills × 100
```

---

## Slightly Better Version

Optional weighted score:

```text
Skill Match      70%
Preferred Type   15%
Location         10%
Work Mode         5%
```

Example:

```js
finalScore =
  skillScore * 0.70 +
  typeScore * 0.15 +
  locationScore * 0.10 +
  workModeScore * 0.05;
```

For the 4-hour hackathon, build skill matching first.

Only add weighted matching if the rest of the system is complete.

---

# 28. User Interface Design

Keep the design clean.

## Suggested Navigation — Candidate

```text
SkillBridge LK
Home
Jobs
Recommended
Applications
Profile
Logout
```

## Suggested Navigation — Employer

```text
SkillBridge LK
Dashboard
Post Job
My Jobs
Logout
```

---

# 29. UI Components

Reusable components:

```text
Navbar
Button
Input
Select
Modal
JobCard
SkillTag
MatchBadge
StatusBadge
EmptyState
LoadingSpinner
ErrorMessage
```

---

# 30. Responsive Design

Minimum target:

- Desktop
- Tablet
- Mobile

Job cards:

Desktop:

```text
3 columns
```

Tablet:

```text
2 columns
```

Mobile:

```text
1 column
```

Employer tables may convert to cards on mobile.

---

# 31. Error Handling

Frontend should handle:

```text
Loading...
```

```text
Unable to load jobs. Please try again.
```

```text
Application failed. Please try again.
```

Backend should return consistent errors:

```json
{
  "message": "You have already applied for this job."
}
```

---

# 32. Four-Member Team Division

# Member 1 — Candidate Frontend

## Main Responsibility

Candidate experience.

### Tasks

- Landing page
- Candidate onboarding UI
- Candidate dashboard
- Jobs page
- Job details
- Search/filter UI
- Responsive candidate pages

### Example Git Commits

```text
feat: create landing page
feat: build candidate onboarding form
feat: add jobs listing interface
feat: add responsive candidate dashboard
```

---

# Member 2 — Employer Frontend

## Main Responsibility

Employer experience.

### Tasks

- Employer onboarding
- Employer dashboard
- Post Job form
- My Jobs
- Applicants page
- Application-status dropdown
- Employer responsive design

### Example Git Commits

```text
feat: build employer dashboard
feat: add job posting form
feat: create applicants view
feat: implement application status controls
```

---

# Member 3 — Backend + Supabase

## Main Responsibility

API and database.

### Tasks

- Supabase setup
- Database schema
- Seed data
- Express server
- Job API
- Application API
- Employer API
- Validation
- Error handling

### Example Git Commits

```text
feat: create supabase database schema
feat: add jobs api routes
feat: implement application endpoints
feat: add api validation and error handling
```

---

# Member 4 — Recommendation + Integration + Deployment

## Main Responsibility

Matching and connecting the full app.

### Tasks

- Skill-match algorithm
- Recommended jobs endpoint
- Frontend/backend integration
- Auth integration support
- API service layer
- End-to-end testing
- Deployment
- Demo preparation

### Example Git Commits

```text
feat: implement skill matching logic
feat: add recommendation endpoint
feat: integrate candidate application workflow
fix: resolve frontend api integration issues
chore: configure deployment
```

---

# 33. Git Workflow

Create repository before development.

Suggested branches:

```text
main
candidate-ui
employer-ui
backend
integration
```

Or use member-specific branches.

Important:

- Every member commits.
- Use meaningful commit messages.
- Merge regularly.
- Avoid one giant final commit.

---

# 34. Four-Hour Hackathon Timeline

# 0–20 Minutes — Planning

Everyone:

- Confirm problem
- Freeze MVP
- Create repository
- Assign roles
- Confirm database schema
- Confirm pages
- Confirm API endpoints

Do not add new major features after this point.

---

# 20–45 Minutes — Setup

## Member 1

- React project
- Candidate page structure

## Member 2

- Employer page structure

## Member 3

- Supabase project
- Tables
- Node API setup

## Member 4

- Shared API setup
- Matching algorithm
- Sample data planning

---

# 45–100 Minutes — Core Build Phase 1

## Member 1

- Candidate onboarding
- Job cards
- Jobs page

## Member 2

- Employer dashboard
- Job posting form

## Member 3

- Jobs API
- Profiles API
- Application API

## Member 4

- Recommendation endpoint
- API integration
- Authentication support

---

# 100–145 Minutes — Core Build Phase 2

Complete the main workflow.

Candidate:

```text
Onboarding
→ Jobs
→ Apply
→ Application Dashboard
```

Employer:

```text
Post Job
→ View Applicants
→ Change Status
```

---

# 145–175 Minutes — Integration

Priority:

1. Jobs load correctly
2. Employer can post a job
3. Candidate can apply
4. Employer can view candidate
5. Employer can update status
6. Candidate sees updated status
7. Recommendation score displays

At **minute 175, stop adding features**.

---

# 175–205 Minutes — Testing and Polish

Test:

- Empty forms
- Invalid forms
- No job results
- Duplicate applications
- Mobile layout
- Candidate role
- Employer role
- Recommendation score
- Status updates

Fix critical bugs only.

---

# 205–225 Minutes — Deployment

Deploy:

```text
Frontend → Vercel
Backend → Render/Railway
Database → Supabase
```

Test the deployed site in incognito/private mode.

---

# 225–240 Minutes — Submission

Prepare:

- Demo video
- README
- Submission PDF
- AI prompt log
- Team contributions
- Deployment link
- Repository link

---

# 35. Minimum Functional Requirements Checklist

Use this during the build.

- [ ] Clear landing page/main UI
- [ ] Sri Lankan problem explained inside the application
- [ ] At least two functional features
- [ ] At least one user-input form
- [ ] Input validation with friendly errors
- [ ] Search/filter/calculate/update/process information
- [ ] Responsive desktop/mobile UI
- [ ] Basic navigation
- [ ] Relevant sample data
- [ ] Clear value to Sri Lankan users

SkillBridge LK can satisfy all ten.

---

# 36. How the Project Meets the Requirements

| Requirement | SkillBridge LK |
|---|---|
| Landing page | Project home |
| Problem explanation | Problem section |
| Functional feature 1 | Job posting/applying |
| Functional feature 2 | Skill recommendation |
| Form | Onboarding + Job Post |
| Validation | Required fields and skill validation |
| Process information | Skill-match calculation |
| Responsive | React responsive UI |
| Navigation | Candidate/Employer routes |
| Sample data | Seeded jobs/skills |
| Sri Lankan value | Entry-level employment access |

---

# 37. Optional AI Feature

AI is not required for the core system.

Only add AI after everything else works.

## Option A — Job Description Generator

Employer enters:

```text
Need an intern who knows React and CSS.
```

AI produces:

```text
Frontend Development Intern

Responsibilities:
- Assist with React interface development
- Build responsive pages
- Work with reusable components

Required Skills:
- React
- JavaScript
- CSS
```

---

## Option B — Job Fit Explanation

Normal algorithm calculates:

```text
80% Match
```

AI explains:

> You already match React, JavaScript, CSS, and Git. TypeScript is the main missing skill for this vacancy.

---

## Option C — Career Skill Suggestion

Candidate sees:

> To improve your match for frontend internships, consider learning TypeScript and basic API integration.

---

# 38. AI Rule for Hackathon

Do not make the main product dependent on AI.

Core application should work even if the AI API fails.

Recommended priority:

```text
Core CRUD
↓
Application Workflow
↓
Recommendation Algorithm
↓
Deployment
↓
AI Feature
```

---

# 39. Testing Plan

# Candidate Tests

- Can candidate complete onboarding?
- Are empty required fields blocked?
- Are skills saved?
- Do recommended jobs appear?
- Does match percentage calculate correctly?
- Can user apply?
- Is duplicate application blocked?
- Does application appear on dashboard?

---

# Employer Tests

- Can employer create profile?
- Can employer create job?
- Are required fields validated?
- Does job appear in candidate feed?
- Can employer view applicants?
- Can status be updated?
- Does candidate see updated status?

---

# 40. Sample Test Cases

| Test | Expected |
|---|---|
| Submit job with no title | Error |
| Submit onboarding with no skills | Error |
| Candidate has 4/5 skills | 80% |
| Apply first time | Success |
| Apply second time | Duplicate blocked |
| Employer updates to SHORTLISTED | Candidate sees Shortlisted |
| Search "frontend" | Relevant jobs shown |
| Filter Internship | Only internships |

---

# 41. Demo Account Strategy

Create sample accounts before the demo.

## Candidate

```text
candidate@example.com
```

Profile:

```text
Name: Nimal
Type: Diploma Student

Skills:
React
JavaScript
CSS
Git
```

## Employer

```text
employer@example.com
```

Company:

```text
Pixel Lanka
```

---

# 42. Two-Minute Demo Flow

## 0:00–0:15 — Problem

> Many Sri Lankan undergraduates, diploma holders, and early-career job seekers struggle to find beginner-friendly opportunities that match their existing skills. Small businesses also need an easier way to reach suitable junior candidates.

---

## 0:15–0:30 — Solution

> SkillBridge LK connects these two groups using skill-based job recommendations and an integrated application tracking workflow.

---

## 0:30–0:55 — Candidate

Show:

- Candidate profile
- Skills
- Recommended jobs
- Match percentage
- Job filtering

---

## 0:55–1:15 — Apply

Show:

- Job details
- Apply button
- Application dashboard

---

## 1:15–1:40 — Employer

Show:

- Employer dashboard
- Post job
- Applicants
- Status update

---

## 1:40–1:50 — Candidate Status

Return to candidate.

Show:

```text
Shortlisted
```

---

## 1:50–2:00 — Impact

> SkillBridge LK helps early-career Sri Lankan job seekers discover realistic opportunities while giving small businesses a lightweight way to recruit junior talent.

---

# 43. README Structure

```md
# SkillBridge LK

## Problem

## Proposed Solution

## Main Features

## Technologies

## Architecture

## Setup Instructions

## Environment Variables

## Running Frontend

## Running Backend

## Deployment

## Demo Accounts

## Team Members

## Contributions

## AI Tools Used

## Deployed Application

## Demo Video
```

---

# 44. Environment Variables

## Frontend

```env
VITE_API_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Backend

```env
PORT=5000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
CLIENT_URL=
```

Never commit real keys.

---

# 45. Setup Commands

## Frontend

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm install react-router-dom axios @supabase/supabase-js
npm install react-hook-form zod @hookform/resolvers
```

---

## Backend

```bash
mkdir server
cd server
npm init -y

npm install express cors dotenv @supabase/supabase-js zod
npm install -D nodemon
```

---

# 46. Suggested Backend Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

---

# 47. Suggested Project Milestones

## Milestone 1

- React running
- Express running
- Supabase connected

## Milestone 2

- Job list loading

## Milestone 3

- Employer creates job

## Milestone 4

- Candidate onboarding

## Milestone 5

- Skill matching

## Milestone 6

- Candidate applies

## Milestone 7

- Employer updates status

## Milestone 8

- Application deployed

---

# 48. MVP Definition of Done

The MVP is complete when:

1. Candidate can complete onboarding.
2. Candidate can see jobs.
3. Skill match is calculated.
4. Candidate can apply.
5. Candidate can track application status.
6. Employer can post a job.
7. Employer can view applicants.
8. Employer can update an application.
9. UI works on mobile and desktop.
10. Deployed link works publicly.

Everything else is optional.

---

# 49. Risk Management

## Risk 1 — Authentication Takes Too Long

Solution:

- Use simple Supabase email/password auth.
- If necessary, use pre-created demo users.

---

## Risk 2 — Backend Deployment Problems

Solution:

Test backend deployment before adding optional AI.

---

## Risk 3 — Too Much Database Complexity

Solution:

Prioritize:

```text
profiles
candidate_profiles
skills
candidate_skills
employers
jobs
job_skills
applications
```

Do not add unnecessary tables.

---

## Risk 4 — Recommendation Becomes Complex

Solution:

Use skill overlap.

Do not build ML.

---

## Risk 5 — Team Integration Conflicts

Solution:

Define APIs and routes within first 20 minutes.

Commit small changes.

Merge regularly.

---

# 50. Stretch Features

Only if MVP is fully finished:

- Saved jobs
- Employer edits/deletes jobs
- Candidate profile editor
- Job deadlines
- Skill-gap suggestions
- AI job description generation
- AI fit explanation
- CV upload
- Platform-admin moderation
- Job expiration
- Email notification

---

# 51. Future Expansion

A full production version could later include:

- CV builder
- CV parsing
- Interview scheduling
- Employer verification
- Email/SMS notifications
- Saved searches
- Candidate portfolios
- Company ratings
- Skill assessments
- Real recommendation models
- University partnerships
- AI career assistant
- Sinhala/Tamil interface
- Location-based recommendations

---

# 52. AI Prompt Log Template

The assessment requires significant AI usage to be recorded.

Use a table like this:

| AI Tool | Exact Prompt | Purpose | How Output Was Checked/Modified |
|---|---|---|---|
| ChatGPT | "Generate a React job card component..." | UI development | Team changed props, styling, and validation |
| ChatGPT | "Create Express endpoint for..." | Backend support | Tested in Postman and modified error handling |
| ChatGPT | "Suggest sample job data..." | Sample data | Reviewed and localized examples |

Do not include API keys, passwords, or personal information.

---

# 53. AI Declaration Example

> ChatGPT — used to assist with initial React component structure, Express API scaffolding, debugging, and sample data generation. The team reviewed, tested, modified, and explained all submitted code.

Adjust this statement to match what the team actually does.

---

# 54. Submission Checklist

Before final submission:

- [ ] Git repository link
- [ ] Public deployed application link
- [ ] Two-minute demonstration video link
- [ ] Team member names
- [ ] Student IDs
- [ ] Short problem description
- [ ] Short solution description
- [ ] Technologies used
- [ ] AI tools used
- [ ] AI prompt log
- [ ] Team contributions
- [ ] README complete
- [ ] App tested in incognito
- [ ] No secrets committed
- [ ] Every team member has commits

---

# 55. Final Project Pitch

> **SkillBridge LK is a lightweight recruitment platform designed for Sri Lankan undergraduates, diploma holders, recent graduates, and other early-career job seekers. Candidates complete a skills-based onboarding process and receive entry-level job and internship recommendations based on their abilities. Small businesses can post vacancies, define required skills, review applicants, and manage application statuses, while candidates can apply and track their progress from a personal dashboard.**

---

# 56. Final Hackathon Rule

The project should **not** become a full LinkedIn clone.

The central demo should remain:

```text
Candidate Skills
       ↓
Relevant Job Recommendation
       ↓
Skill Match
       ↓
Apply
       ↓
Application Tracking
       ↓
Employer Review
       ↓
Status Update
```

If this complete loop works reliably, the project is already a strong hackathon submission.
