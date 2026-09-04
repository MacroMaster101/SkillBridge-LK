# ⚙️ SkillBridge LK — Backend API

Node.js + Express REST API for [SkillBridge LK](../README.md), backed by Supabase PostgreSQL.

---

## 🚀 Quick start

```bash
npm install
cp .env.example .env   # then fill in your Supabase values
npm run dev
```

🌐 **http://localhost:5000** · health check: **http://localhost:5000/health**

```bash
curl http://localhost:5000/health
# {"status":"ok","message":"SkillBridge LK API is running"}
```

---

## 📜 Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start with `node --watch` — auto-restarts on file changes |
| `npm start` | Start without watch mode (use this in production) |

---

## 🔑 Environment variables

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CLIENT_URL=http://localhost:5173
```

> 🚨 The **service role key bypasses row-level security**. It must never appear in the frontend, in the browser, or in a commit. `.env` is gitignored.

`CLIENT_URL` is the allowed CORS origin — update it to the deployed frontend URL in production, or requests will be blocked.

---

## 📡 API reference

Base path: `/api`

### 💼 Jobs — `/api/jobs`

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/` | — | List active jobs |
| `GET` | `/:id` | — | Job details |
| `POST` | `/` | 🔒 Employer | Create a vacancy |
| `POST` | `/:jobId/apply` | 🔒 Candidate | Apply to a job |
| `GET` | `/:jobId/applications` | 🔒 Employer | Applicants for a job |

`GET /` accepts optional query parameters: `search`, `category`, `jobType`, `workMode`, `location`.

```bash
curl "http://localhost:5000/api/jobs?category=Software%20/%20IT&jobType=Internship"
```

### 🧑‍🎓 Candidates — `/api/candidates`

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/me` | 🔒 Candidate | Own profile |
| `PUT` | `/me` | 🔒 Candidate | Update profile |
| `PUT` | `/me/skills` | 🔒 Candidate | Update skills |

### 🏢 Employers — `/api/employers`

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/` | 🔒 Employer | Create business profile |
| `GET` | `/me` | 🔒 Employer | Own business profile |

### 📊 Applications — `/api/applications`

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/me` | 🔒 Candidate | Own applications |
| `PATCH` | `/:applicationId/status` | 🔒 Employer | Update application status |

---

## 🔐 Authentication

Protected routes require a Supabase access token:

```http
Authorization: Bearer <supabase_access_token>
```

The middleware in [`src/middleware/auth.js`](src/middleware/auth.js) verifies the token with Supabase, loads the caller's profile, and checks their role.

| Response | Meaning |
|---|---|
| `401` | Missing, malformed or expired token |
| `403` | Valid token, but wrong role for this route |
| `503` | Supabase not configured on the server |

---

## 🎯 Skill matching

[`src/utils/skillMatch.js`](src/utils/skillMatch.js) implements the MVP formula:

```text
match % = (matched job skills ÷ total job skills) × 100
```

Comparison is case-insensitive and whitespace-trimmed. `getMatchedAndMissingSkills()` also returns which skills the candidate has and which they'd be learning — that's what powers the "skills you can build" messaging in the UI.

> ℹ️ A match percentage measures **skill overlap only**. It is a shortlisting aid, not a hiring prediction.

---

## 📂 Folder structure

```text
src/
├── config/
│   ├── env.js          # Loads ../../.env
│   └── supabase.js     # Supabase admin client (service role)
├── controllers/        # Request handlers
├── middleware/
│   ├── auth.js         # Token verification + role guards
│   ├── validate.js     # Zod request validation
│   └── errorHandler.js # Central error handling + asyncHandler
├── routes/             # Route definitions per resource
├── services/           # Database access logic
├── utils/              # Skill-match calculation, error helpers
├── validators/         # Zod schemas
└── server.js           # App entry point
```

**Request flow:** `route → middleware (auth, validate) → controller → service → Supabase`

---

## 🗄️ Database

Managed in [`../supabase/`](../supabase/). Run in the Supabase SQL Editor, in order:

1. `schema.sql` — 8 tables plus row-level security policies
2. `seed.sql` — 21 starter skills

| Table | Holds |
|---|---|
| `profiles` | Base user record and role |
| `candidate_profiles` | Education, user type, preferences |
| `employers` | Business profile |
| `skills` | Master skill list |
| `candidate_skills` | Candidate ↔ skill join |
| `jobs` | Vacancies |
| `job_skills` | Job ↔ required skill join |
| `applications` | Applications and their status |

**Application statuses:** `APPLIED` → `UNDER_REVIEW` → `SHORTLISTED` → `HIRED` / `REJECTED`

---

## ⚠️ Error handling

All errors funnel through [`src/middleware/errorHandler.js`](src/middleware/errorHandler.js) and return consistent JSON:

```json
{ "error": "Missing or invalid authorization header" }
```

Wrap async handlers in `asyncHandler()` so rejected promises reach the error middleware instead of hanging the request.

---

## ☁️ Deploying to Render / Railway

| Setting | Value |
|---|---|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |

Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `CLIENT_URL` in the host's dashboard. Most hosts inject their own `PORT` — `server.js` reads it automatically.

---

## 🧪 Manual smoke test

```bash
curl http://localhost:5000/health                    # 200
curl http://localhost:5000/api/jobs                  # 200, array
curl -i http://localhost:5000/api/candidates/me      # 401 without a token
```
