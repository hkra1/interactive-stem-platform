# Interactive STEM Learning Platform

> Open-source platform to learn STEM in the most interactive way possible — browser-based Python (Pyodide), simulations, KaTeX math, and self-hosted AI tutoring. Built to serve real users *today* with a fully open-source stack.

**Notion Hub (single source of truth)**: [Interactive STEM Learning Platform – Launch Stack & Roadmap](https://app.notion.com/p/3cd6669e49aa81cb81e2c82bd68ad999)

**Status (as of latest commit)**: Functional starter scaffold is in place. You can clone, install, and run the Next.js app. A working browser-based Python lesson is included. Auth, database schema, security headers, CI, and Docker Compose are ready for the next implementation steps.

## Verified Stack (Official Sources Only)

| Layer | Technology | Official Docs |
|-------|------------|---------------|
| Framework | Next.js 15+ (App Router) | https://nextjs.org/docs |
| Auth | Auth.js (NextAuth v5) | https://authjs.dev |
| UI | Tailwind CSS + shadcn/ui patterns | https://ui.shadcn.com |
| Math | KaTeX | https://katex.org |
| Browser Python | Pyodide | https://pyodide.org |
| Database | PostgreSQL 16 + pgvector | https://github.com/pgvector/pgvector |
| AI Inference | Ollama | https://docs.ollama.com |
| Deployment | Docker Compose + standalone output | Next.js self-hosting guide |

## Quick Start (Local Development)

Requirements (official):
- Node.js ≥ 20.9
- Docker (optional but recommended for Postgres)

```bash
git clone https://github.com/hkra1/interactive-stem-platform.git
cd interactive-stem-platform
cp .env.example .env
# Generate a secret: npx auth secret   (or openssl rand -base64 32)
npm install
npm run dev
```

Open http://localhost:3000

- Landing page and navigation work
- `/learn` lists modules
- `/learn/intro-python` contains a **live Pyodide Python runner** (official CDN pattern)

For full stack (with Postgres):
```bash
docker compose up -d db
# Then apply schema: psql $DATABASE_URL -f db/schema.sql
npm run dev
```

## What Is Already Implemented

- Next.js App Router layout, landing page, learn index
- Working interactive Python lesson (`/learn/intro-python`) using official Pyodide
- Auth.js v5 configuration + route handler (providers ready to enable)
- Security headers (CSP, X-Frame-Options, etc.) in `next.config.ts`
- PostgreSQL + pgvector schema (`db/schema.sql`)
- Docker Compose for web + Postgres
- GitHub Actions CI (lint + typecheck)
- Security documentation (`docs/SECURITY.md`)
- Architecture overview (`docs/ARCHITECTURE.md`)

## Project Structure (Current)

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── learn/
│   │   ├── page.tsx
│   │   └── intro-python/page.tsx   # Live Pyodide demo
│   └── api/auth/[...nextauth]/
├── auth.ts                 # Auth.js config
├── db/schema.sql           # Postgres + pgvector
├── docker/
├── docs/
│   ├── ARCHITECTURE.md
│   └── SECURITY.md
├── content/                # Future MDX / notebooks
├── next.config.ts          # Security headers + standalone
├── package.json
├── tailwind.config.ts
└── .github/workflows/ci.yml
```

## Security Highlights

See `docs/SECURITY.md` for full details. Key points from official guidance:
- Security headers enabled by default
- Secrets never committed (use `.env`)
- Auth.js secret generation via official CLI
- Database schema prepared for least-privilege usage
- Pyodide runs client-side only (browser sandbox)

## Next Implementation Steps (for contributors / maintainers)

1. Enable at least one Auth provider (GitHub recommended) and wire the Postgres adapter.
2. Add more interactive modules under `app/learn/` or migrate to MDX + content layer.
3. Implement AI tutor page that calls Ollama (`/api/chat` → Ollama `/api/chat`).
4. Add progress tracking using the `user_progress` table.
5. Tighten CSP after testing all CDNs.
6. Production deploy via Coolify / Docker + Caddy on a VPS.

## Contributing

Educators and developers are welcome. Open issues or PRs. Prefer content contributions that follow the interactive, browser-first philosophy.

## License

MIT

---

Built for the common audience. High-quality interactive STEM education should be free and open.
