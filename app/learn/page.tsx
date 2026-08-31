import Link from "next/link";

const modules = [
  {
    slug: "intro-python",
    title: "Introduction to Python for STEM",
    description: "Run real Python in your browser. Variables, loops, NumPy basics, and plotting.",
    level: "Beginner",
  },
  {
    slug: "calculus-limits",
    title: "Limits & Continuity",
    description: "Interactive exploration of limits with KaTeX and live computation.",
    level: "Intermediate",
  },
];

export default function LearnPage() {
  return (
    <div className="container px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Learning Modules</h1>
      <p className="mt-2 text-muted-foreground">
        Interactive, browser-first STEM content. More modules coming via community contributions.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {modules.map((mod) => (
          <Link
            key={mod.slug}
            href={`/learn/${mod.slug}`}
            className="block rounded-lg border p-6 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{mod.title}</h2>
              <span className="text-xs rounded-full bg-secondary px-2 py-1">{mod.level}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{mod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
