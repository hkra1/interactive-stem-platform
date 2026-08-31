import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Learn STEM the Interactive Way
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Browser-based Python (Pyodide), beautiful math (KaTeX), simulations, and a
          self-hosted AI tutor — all open source. Start learning today.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/learn"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Start Learning
          </Link>
          <Link
            href="/learn/intro-python"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Try Interactive Python
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">🐍 Python in the Browser</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Full scientific Python (NumPy, Matplotlib, SymPy) via Pyodide — no server
            needed for code execution.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">📐 Beautiful Math</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Instant KaTeX rendering for equations. Interactive graphs and visualizations.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">🤖 Private AI Tutor</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Self-hosted with Ollama + open models. Explain concepts, generate problems,
            help debug code.
          </p>
        </div>
      </div>
    </div>
  );
}
