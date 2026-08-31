import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Interactive STEM Platform",
    template: "%s | Interactive STEM",
  },
  description:
    "Learn STEM interactively with browser-based Python, simulations, math rendering, and AI tutoring. Fully open-source.",
  keywords: ["STEM", "education", "interactive", "Python", "math", "physics", "open source"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4">
              <a href="/" className="mr-6 flex items-center space-x-2 font-bold">
                🚀 Interactive STEM
              </a>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a href="/learn" className="transition-colors hover:text-foreground/80">
                  Learn
                </a>
                <a href="/tutor" className="transition-colors hover:text-foreground/80">
                  AI Tutor
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row px-4">
              <p className="text-sm text-muted-foreground">
                Open-source interactive STEM education. MIT License.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
