# Interactive STEM Learning Platform

Open-source platform for interactive STEM education. Browser-based Python execution (Pyodide), mathematical rendering (KaTeX), simulations, progress tracking, and self-hosted AI tutoring. Designed for accessibility, low operational cost, and alignment with international standards.

**Domain**: djrlabs.fun  
**Documentation hub**: [Notion – Launch Stack & Roadmap](https://app.notion.com/p/3cd6669e49aa81cb81e2c82bd68ad999)

## Stack (verified against official documentation)

| Layer | Technology | Reference |
|-------|------------|-----------|
| Framework | Next.js (App Router) | https://nextjs.org/docs |
| Authentication | Auth.js (GitHub + Google providers) | https://authjs.dev |
| UI | Tailwind CSS + accessible component patterns | https://ui.shadcn.com |
| Mathematics | KaTeX | https://katex.org |
| Browser Python | Pyodide | https://pyodide.org |
| Database | PostgreSQL + pgvector | https://github.com/pgvector/pgvector |
| AI inference | Ollama | https://docs.ollama.com |
| Deployment | Docker Compose, standalone output | Next.js self-hosting guide |

## Curriculum Structure

Content is organised exclusively by difficulty level and aligned with major international frameworks:

- **Foundation** – core concepts, concrete examples (aligned with early secondary / NGSS middle-school performance expectations, IB MYP Years 1–3)
- **Intermediate** – multi-step reasoning, modelling, data interpretation (NGSS high-school, IB MYP Years 4–5 / Cambridge IGCSE level)
- **Advanced** – formal methods, proof, experimental design (IB Diploma, Cambridge A-Level, university introductory)
- **Expert** – research-oriented extensions, open problems, computational modelling

Reference frameworks used for scope and sequencing:
- Next Generation Science Standards (NGSS)
- International Baccalaureate (MYP / DP)
- Cambridge International
- OECD PISA Science Framework
- UNESCO STEM education guidance

All modules follow progressive difficulty only. No age or grade labels are hard-coded; learners self-select level.

## Quick Start (local)

Requirements: Node.js ≥ 20.9, Docker (recommended).

```bash
git clone https://github.com/hkra1/interactive-stem-platform.git
cd interactive-stem-platform
cp .env.example .env
npx auth secret          # writes AUTH_SECRET
npm install
npm run dev
```

- http://localhost:3000 – home
- http://localhost:3000/learn – module catalogue
- http://localhost:3000/learn/intro-python – live Pyodide Python environment

Database (optional for first run):
```bash
docker compose up -d db
psql "$DATABASE_URL" -f db/schema.sql
```

## OAuth Application Setup (placeholders ready)

Credentials are left empty in `.env.example`. Create the applications and paste values at deployment time.

**GitHub**
1. https://github.com/settings/developers → OAuth Apps → New OAuth App
2. Application name: Interactive STEM (or preferred name)
3. Homepage URL: `https://djrlabs.fun`
4. Authorization callback URL: `https://djrlabs.fun/api/auth/callback/github`
5. (Local testing) also register `http://localhost:3000/api/auth/callback/github`
6. Copy Client ID → `AUTH_GITHUB_ID`  
   Generate Client Secret → `AUTH_GITHUB_SECRET`

**Google**
1. https://console.cloud.google.com/apis/credentials → Create Credentials → OAuth client ID
2. Application type: Web application
3. Authorized JavaScript origins: `https://djrlabs.fun`
4. Authorized redirect URIs: `https://djrlabs.fun/api/auth/callback/google`
5. (Local) add `http://localhost:3000` and the corresponding callback
6. Copy Client ID → `AUTH_GOOGLE_ID`  
   Client Secret → `AUTH_GOOGLE_SECRET`

## Hosting (minimal cost / free tier)

Recommended free-tier starting point that keeps the entire stack on one host:

- **Oracle Cloud Always Free** (Ampere A1 – up to 2 OCPU / 12 GB RAM always-on, 200 GB storage). Official: https://www.oracle.com/cloud/free/
- Alternative always-free micro instances: Google Cloud e2-micro

Deployment pattern:
1. Provision the free VM
2. Install Docker + Docker Compose
3. Point domain `djrlabs.fun` (A/AAAA records) to the instance
4. Run the provided `docker-compose.yml` (or Coolify / CapRover for simpler TLS)
5. Use Caddy or Traefik for automatic HTTPS

All services (Next.js, PostgreSQL, optional Ollama) are intended to run on the same host to minimise cost and complexity.

## Implementation Checklist

- [x] Next.js App Router foundation and security headers
- [x] Auth.js configuration with GitHub and Google providers (placeholders)
- [x] PostgreSQL + pgvector schema
- [x] Working browser Python lesson (Pyodide)
- [x] Docker Compose and CI
- [x] Security and architecture documentation
- [ ] Populate OAuth credentials and enable production callbacks
- [ ] Generate and set production `AUTH_SECRET` and database password
- [ ] Deploy to free-tier host and configure `djrlabs.fun` DNS + TLS
- [ ] Expand content modules by difficulty level (Foundation → Expert)
- [ ] AI tutor endpoint (Ollama)
- [ ] Progress tracking UI
- [ ] Branding assets, privacy policy, terms (final step)

## Project Layout

```
app/                  # Next.js App Router
auth.ts               # Auth.js configuration
db/schema.sql         # Database schema
docker/               # Container definitions
docs/                 # Architecture and security
content/              # Future structured modules
.env.example          # All required variables with comments
```

## License

MIT

---

Interactive STEM education should be free, open, and accessible.
