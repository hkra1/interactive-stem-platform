# Architecture Overview

## High-Level Diagram (MVP)

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (User)                       │
│  Next.js (React) + Pyodide + Three.js + KaTeX + PWA         │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────────┐
│                     Next.js App (Node)                      │
│  • App Router pages & layouts                               │
│  • Server Actions / Route Handlers                          │
│  • Auth.js                                                  │
│  • MDX / content rendering                                  │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
     ┌─────────────────┐            ┌──────────────────┐
     │  PostgreSQL +   │            │  Ollama (host or │
     │  pgvector       │            │  remote)         │
     │  (users,        │            │  AI Tutor        │
     │   progress,     │            └──────────────────┘
     │   content meta, │
     │   embeddings)   │
     └─────────────────┘
```

## Key Design Decisions

1. **Browser-side compute first**  
   Pyodide runs NumPy, Matplotlib, SymPy, etc. directly in the user’s browser. This eliminates the need for per-user code execution sandboxes in the MVP and dramatically reduces server cost.

2. **Single process to start**  
   Everything (UI + API) lives in the Next.js process initially. Extract to FastAPI workers only when you have heavy background jobs or specialized STEM pipelines.

3. **Content as code**  
   Lessons live in Git (`content/`) as MDX + notebooks. This enables reviewable contributions from educators via Pull Requests.

4. **Self-hosted AI**  
   Ollama + open weights keep the tutor private and free of API costs/rate limits. Swap the model or move to vLLM later without changing application code much.

5. **Progressive infrastructure**  
   Docker Compose → Coolify/Dokku on a VPS → k3s/Kubernetes. No rewrite required at each step.

## Future Extensions

- **Realtime collaboration**: Yjs + WebSocket (or Liveblocks open-core)
- **Advanced simulations**: More React Three Fiber scenes, WebGPU compute
- **Adaptive engine**: Progress data + simple recommendation models or LLM-driven paths
- **Judge0-style sandbox**: For languages beyond Python or stricter isolation
- **Multi-tenancy / white-label**: Organizations and custom branding

See the Notion document for the full product roadmap and stack details.
