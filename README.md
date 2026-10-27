# 🎓 Ha Hu Ai (ሀሁ) — Sleek Gamified AI Academy

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg?style=flat-square)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg?style=flat-square)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A high-performance, interactive, and gamified curriculum application to master Artificial Intelligence from foundational neural concepts to autonomous multi-agent systems and safety.

---

## 📋 Pre-Hosting Checklist & Verification

Before exporting and deploying this codebase to production or any free hosting provider, confirm the following pre-flight items:

| # | Check Item | Status | Verification Detail |
|---|------------|:------:|---------------------|
| 1 | **Build Verification** | ✅ Ready | `npm run build` generates clean output into `dist/` with chunk splitting. |
| 2 | **TypeScript Strictness** | ✅ Ready | `npm run lint` (`tsc --noEmit`) passes with 0 errors and strict null safety. |
| 3 | **No Database API Keys Needed** | ✅ Ready | Client-first architecture stores user progress in IndexedDB and LocalStorage. |
| 4 | **Dynamic Origin Share Links** | ✅ Ready | All shareable topic URLs & snapshot links resolve to `window.location.origin`. |
| 5 | **SPA Routing Rules** | ✅ Ready | Bundled `vercel.json`, `netlify.toml`, and `public/_redirects` prevent 404s on refresh. |
| 6 | **Private Mode Fallback** | ✅ Ready | Built-in in-memory fallback + JSON backup utility for restricted iOS/Safari storage. |
| 7 | **Accessibility & Reduced Motion** | ✅ Ready | Respects OS-level `prefers-reduced-motion` settings for all 3D animations and confetti. |

---

## 🌟 Zero-Lock-In & Portability Architecture

Ha Hu Ai was engineered to be **100% portable, fully self-contained, and free to host forever**:

- **$0 Database & Server Costs**: User progress, streak counters, hearts, gems, and quiz scores are stored directly on the user's device via resilient **IndexedDB + LocalStorage** caching.
- **Dynamic Origin Links**: Shareable links, topic deep links, friend snapshot comparisons, and QR codes automatically adapt to any custom domain or hosting URL.
- **Dual-Runtime Compatibility**:
  - Deploy as a **pure static Single Page Application (SPA)** on any free CDN (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
  - Deploy as a **containerized Node.js service** (Google Cloud Run, Docker, Render, Railway, AWS ECS).

---

## 🚀 Step-by-Step Free Deployment Guides

### 1. Vercel (Recommended — 100% Free Tier)
1. Push this repository to **GitHub** or **GitLab**.
2. Visit [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.
> 💡 *The bundled `vercel.json` already contains all SPA rewrites and caching headers.*

---

### 2. Netlify (100% Free Tier)
**Method A: Git Integration**
1. Visit [Netlify](https://netlify.com) and click **"Add new site"** > **"Import an existing project"**.
2. Select your repository:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**.

**Method B: Drag & Drop Deploy**
1. Run `npm run build` locally.
2. Drag and drop the generated `dist/` folder directly onto the Netlify Drop dashboard.
> 💡 *The bundled `netlify.toml` and `public/_redirects` automatically configure wildcard 200 rewrites.*

---

### 3. Cloudflare Pages (100% Free — Unlimited Bandwidth)
1. Sign in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Compute & Networking** > **Pages**.
2. Click **Create a project** > **Connect to Git**.
3. Choose your repository and configure build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

---

### 4. GitHub Pages (100% Free)
1. Install the `gh-pages` deployment helper (or use GitHub Actions):
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist/` folder to your repository's `gh-pages` branch.
3. In your GitHub repository **Settings** > **Pages**, set the source to `gh-pages` branch `/ (root)`.

---

### 5. Google Cloud Run / Docker Container
If you prefer deploying a containerized Express/Node.js instance on Google Cloud Run:

```bash
# 1. Build the multi-stage Docker image
docker build -t hahu-ai .

# 2. Test run locally on port 3000
docker run -p 3000:3000 hahu-ai

# 3. Deploy to Google Cloud Run (GCP CLI)
gcloud run deploy hahu-ai \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```

---

## 🛠 Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on http://localhost:3000)
npm run dev

# 3. Run strict TypeScript compiler checks
npm run lint

# 4. Create production build
npm run build

# 5. Preview production build locally
npm start
```

---

## 📂 Project Structure

```
├── .dockerignore              # Docker build exclusions
├── .env.example               # Optional environment variables template
├── Dockerfile                 # Production multi-stage Alpine Docker container
├── README.md                  # Complete deployment & pre-flight documentation
├── index.html                 # Production SEO, PWA meta tags & viewport settings
├── metadata.json              # Platform metadata
├── netlify.toml               # Netlify SPA routing and cache headers
├── package.json               # Dependencies and build scripts
├── public/
│   └── _redirects             # Universal SPA fallback rule (/* /index.html 200)
├── server.ts                  # Express production server with Gzip compression
├── tsconfig.json              # Strict TypeScript compiler options
├── vercel.json                # Vercel SPA rewrites and immutable cache rules
├── vite.config.ts             # Rollup manual chunk vendor splitting
└── src/
    ├── App.tsx                # Main application orchestrator & state manager
    ├── index.css              # Tailwind CSS, liquid glassmorphism & GPU transforms
    ├── main.tsx               # React DOM entry point
    ├── types.ts               # Strict TypeScript domain interfaces
    ├── components/            # Extracted interactive React components
    │   ├── AchievementsView.tsx   # Badges, milestone trophies & streak displays
    │   ├── ChestModal.tsx         # Gem reward chest with confetti bursts
    │   ├── FriendSnapshotBanner.tsx # Community comparison banner
    │   ├── Header.tsx             # Navbar with hearts, gems, streak, and theme toggle
    │   ├── IntroTourModal.tsx     # 3D circulating crystal tour modal
    │   ├── LessonModal.tsx        # Interactive exam & learning module
    │   ├── LocalProfileModal.tsx  # User profile & JSON database backup/restore
    │   ├── PathView.tsx           # Horizontal learning map with 3D nodes
    │   ├── ProgressDashboard.tsx  # Learning metrics & chapter overview
    │   ├── QRCodeDisplay.tsx      # Dynamic origin QR code generator
    │   ├── ShareModal.tsx         # Multi-tier clipboard & native share sheet
    │   ├── SideSliderDrawer.tsx   # Collapsible study drawer & resources
    │   └── StatDetailModal.tsx    # Stat detail inspection modals
    ├── data/
    │   └── aiCurriculum.ts        # Comprehensive 5-chapter AI curriculum data
    └── utils/
        ├── clipboard.ts           # Multi-tier clipboard & native share engine
        └── dbStorage.ts           # IndexedDB, localStorage & memory fallback engine
```

---

## 🔒 Privacy & Data Sovereignty

- **100% Client-Side**: No personal data or user identity is tracked on external servers.
- **Export / Import Backups**: Users can download their complete learning progress as a `.json` database file anytime from their Profile, allowing seamless migration between devices and browsers.
