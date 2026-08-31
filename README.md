# Interactive STEM Learning Platform

> Open-source platform to learn STEM in the most interactive way possible — browser-based simulations, executable notebooks, adaptive AI tutoring, and beautiful visualizations. Built to serve real users *today* with a fully open-source stack.

**Notion Hub**: [Interactive STEM Learning Platform – Launch Stack & Roadmap](https://app.notion.com/p/3cd6669e49aa81cb81e2c82bd68ad999)

## Why this stack?

- **Serve users immediately**: Docker Compose + Next.js gets a polished experience running on a single VPS in hours.
- **Maximum interactivity, minimum cost**: Pyodide (Python in the browser), React Three Fiber, KaTeX, and client-side visualizations keep the backend light.
- **100% open source**: No proprietary clouds or models required. Self-host everything.
- **Future-proof**: Easy path from MVP → production-scale (Kubernetes, advanced AI, real-time collaboration).

## Recommended Stack (MVP → Production)

### Frontend
- **Next.js 15** (App Router) – React, SSR/SSG, Server Actions
- **Tailwind CSS + shadcn/ui + Radix UI** – modern, accessible design system
- **KaTeX** – fast math rendering
- **Pyodide + JupyterLite / custom notebook runner** – full scientific Python in the browser
- **React Three Fiber + Three.js** – selective 3D/physics simulations
- **TanStack Query + Zustand** – data & state
- **PWA support** – offline lessons

### Backend (start simple)
- Next.js Route Handlers / Server Actions (zero extra services at first)
- **PostgreSQL 16 + pgvector** – users, progress, content, embeddings
- Optional later: **FastAPI** for heavy STEM/AI workloads
- **Redis** (optional) – cache, sessions, realtime
- **MinIO** – S3-compatible object storage

### AI Tutor (self-hosted)
- **Ollama** (easiest local/remote inference)
- Open models: Llama 3.1/3.2, Phi-4, Qwen2.5, Gemma 2, etc.
- Simple RAG with pgvector or LlamaIndex

### DevOps
- **Docker Compose** – local + single-server production
- **Coolify / CapRover / Dokku** – low-ops deployment on any VPS
- GitHub Actions for CI
- Caddy or Traefik for automatic HTTPS

## Quick Start (Local)

```bash
git clone https://github.com/hkra1/interactive-stem-platform.git
cd interactive-stem-platform
cp .env.example .env          # edit if needed
docker compose up --build
```

Open http://localhost:3000

## Project Structure (target)

```
.
├── apps/web/                 # Next.js application
├── packages/                 # Shared UI, configs, content utilities
├── content/                  # MDX lessons + notebooks (Git-friendly)
├── docker/                   # Dockerfiles & compose overrides
├── services/                 # Optional FastAPI workers (future)
├── docs/                     # Architecture, contribution guides
└── .github/workflows/
```

## MVP Scope (Ship This First)

- Structured courses with MDX + interactive Python cells
- Progress tracking & user accounts
- Beautiful math + live plots
- Basic self-hosted AI tutor ("explain", "practice problem", "help with code")
- Mobile-responsive + installable PWA
- Admin-friendly content (Markdown/MDX in Git or simple CMS)

## Roadmap

| Phase | Focus | Timeline goal |
|-------|-------|---------------|
| 0 | Working demo with 3–5 interactive modules + auth + basic AI | Days |
| 1 | Content authoring UX, better RAG, Redis, polish | 2–4 weeks |
| 2 | Real-time features (Yjs), richer sims, FastAPI extraction | 1–2 months |
| 3 | k3s/Kubernetes, multi-tenancy, open contribution of modules | Ongoing |

## Contributing

We welcome educators, developers, and scientists!

1. Fork the repo
2. Add content under `content/` or improve the platform
3. Open a Pull Request

See `docs/CONTRIBUTING.md` (coming soon) for guidelines.

## License

MIT (recommended) – free for education, research, and commercial use.

---

**Built for the common audience.** Let's make high-quality interactive STEM education accessible to everyone.

Questions? Open an issue or check the [Notion document](https://app.notion.com/p/3cd6669e49aa81cb81e2c82bd68ad999).
