# 🖥️ SkillBridge LK — Frontend

React + Vite single-page app for [SkillBridge LK](../README.md).

---

## 🚀 Quick start

```bash
npm install
cp .env.example .env   # then fill in your Supabase values
npm run dev
```

🌐 **http://localhost:5173**

> ⚠️ The backend must be running on **port 5000** for API calls to work. See [`../server/README.md`](../server/README.md).

---

## 📜 Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with hot module reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |

---

## 🔑 Environment variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

🔐 Only ever put the **anon** key here — it ships to the browser. The service role key belongs on the backend.

If `VITE_API_URL` is unset, [`src/services/api.js`](src/services/api.js) falls back to the relative path `/api`, which the Vite dev proxy forwards to `localhost:5000`.

---

## 🗺️ Routes

### 🌍 Public — `PublicLayout`

| Path | Page |
|---|---|
| `/` | Landing page |
| `/jobs` | Browse opportunities (search + filters) |
| `/jobs/:id` | Job details |
| `/employers` | For employers |
| `/login` · `/register` | Authentication |

### 🧑‍🎓 Candidate — `CandidateLayout`

`/candidate/onboarding` · `/candidate/dashboard` · `/candidate/recommended` · `/candidate/applications`

### 🏢 Employer — `EmployerLayout`

`/employer/setup` · `/employer/dashboard` · `/employer/post-job` · `/employer/jobs` · `/employer/jobs/:jobId/applicants`

---

## 📂 Folder structure

```text
src/
├── components/     # Shared UI (Button, Input, Modal…) + PublicUI design system
├── constants/      # Job categories, types, work modes, statuses
├── features/
│   ├── auth/           # Landing, Login, Register, Employers pages
│   ├── jobs/           # Job list, details, filters, sample data
│   ├── onboarding/     # Candidate onboarding + dashboard
│   ├── applications/   # Application tracking
│   └── employer/       # Employer setup, job posting, applicants
├── hooks/          # useAuth
├── layouts/        # Public / Candidate / Employer shells
├── routes/         # React Router configuration
├── services/       # Axios API client + Supabase browser client
├── public.css      # Public-pages design system
└── index.css       # Tailwind entry point
```

---

## 🎨 Styling

Two deliberately separate systems:

| Surface | System | Where |
|---|---|---|
| 🌍 Public marketing pages | Custom CSS design system | [`src/public.css`](src/public.css) |
| 🔐 Logged-in app pages | Tailwind CSS utilities | [`tailwind.config.js`](tailwind.config.js) |

Everything in `public.css` is scoped under `.sb-public`, so the two never collide.

### 🧭 Design direction — "Route Board"

Built from Sri Lankan transit signage: flat signal colour, wayfinding type, and a departure-board panel as the one place the page raises its voice.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#14202e` | Board ground, display type |
| `--paper` | `#edefe8` | Page ground |
| `--marigold` | `#e9a227` | Signal / primary action |
| `--petrol` | `#0f6357` | Links, secondary accent |
| `--madder` | `#c2462c` | Warnings, used sparingly |

**Typefaces:** Bricolage Grotesque (display) · Instrument Sans (body) · Martian Mono (labels & data), loaded from Google Fonts in [`index.html`](index.html).

**Signature element:** the interactive match board in [`src/components/PublicUI.jsx`](src/components/PublicUI.jsx) — toggling a skill flips the cell and drives the percentage readout, so the match is something you cause rather than something you're told.

---

## 📦 Sample data

The public pages read from [`src/features/jobs/data/publicJobs.js`](src/features/jobs/data/publicJobs.js) — six illustrative Sri Lankan listings. These are **not** live vacancies and exist so the browsing experience can be demonstrated without a seeded database.

Logged-in pages fetch real data from the API.

---

## ☁️ Deploying to Vercel

| Setting | Value |
|---|---|
| Root Directory | `client` |
| Framework Preset | Vite *(auto-detected)* |
| Build Command | `npm run build` *(default)* |
| Output Directory | `dist` *(default)* |

[`vercel.json`](vercel.json) adds the SPA rewrite so deep links such as `/jobs/1` don't 404 on refresh. Add the three `VITE_*` variables in the Vercel dashboard.

---

## ♿ Accessibility & responsiveness

- ✅ Skip-to-content link
- ✅ Visible keyboard focus rings
- ✅ `prefers-reduced-motion` respected
- ✅ Semantic landmarks and ARIA labels on interactive controls
- ✅ Verified at **1440px** and **375px** with no horizontal overflow
