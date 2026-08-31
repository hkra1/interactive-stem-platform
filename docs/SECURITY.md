# Security Guide

This document outlines the security measures implemented and required for the Interactive STEM Platform. All recommendations are drawn from official documentation of Next.js, Auth.js, PostgreSQL/pgvector, and standard open-source practices.

## Implemented in Code

### HTTP Security Headers (next.config.ts)
- `X-Frame-Options: DENY` – prevents clickjacking
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` – disables unnecessary browser features
- Content-Security-Policy (CSP) – baseline policy allowing self + required CDNs (Pyodide, KaTeX). **Tighten further after testing**.

Official reference: Next.js self-hosting and headers documentation.

### Authentication
- Auth.js (NextAuth v5) with environment-based secrets (`AUTH_SECRET` / `NEXTAUTH_SECRET`)
- Official recommendation: generate secret with `npx auth secret`
- Database adapter ready (PostgreSQL) for persistent sessions
- Protected route support via `authorized` callback

### Secrets Management
- Never commit `.env` or `.env.local`
- Use `.env.example` only
- In production: inject secrets via Docker secrets, Kubernetes secrets, or platform environment variables
- Rotate `AUTH_SECRET` and database credentials regularly

### Database
- Use least-privilege database user in production
- Enable SSL/TLS for PostgreSQL connections (`sslmode=require`)
- pgvector embeddings stored with appropriate access controls

### Client-Side Code Execution (Pyodide)
- Code runs entirely in the user’s browser (WebAssembly sandbox)
- No arbitrary server-side code execution in the MVP
- When adding server-side sandboxes later, use strong isolation (gVisor, Firecracker, or dedicated containers)

## Required Operational Practices

1. **Always use HTTPS** in production (Caddy, Traefik, or cloud load balancer with automatic certificates).
2. Keep dependencies updated (`npm audit`, Dependabot / Renovate).
3. Run containers as non-root (Dockerfile already prepares for this).
4. Limit network exposure: database and Ollama should not be publicly reachable.
5. Enable PostgreSQL connection limits and statement timeouts.
6. Monitor logs for authentication failures and unusual activity.
7. For AI tutor: do not log full user prompts containing sensitive data; prefer self-hosted Ollama.

## CSP Notes for Pyodide & KaTeX
The current CSP allows `cdn.jsdelivr.net` and `'unsafe-eval'` (required by Pyodide/WebAssembly in many setups). After full testing:
- Prefer self-hosting Pyodide assets if possible.
- Use nonces or hashes for scripts where feasible.
- Review official Pyodide deployment guidance for production hosting.

## Reporting Vulnerabilities
Open a private security advisory on the GitHub repository or contact the maintainers.

Last updated from official sources: Next.js docs, Auth.js docs, pgvector README, Ollama docs, OWASP recommendations.
