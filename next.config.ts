import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Official recommendation for self-hosting: output standalone for Docker
  output: "standalone",
  // Security headers (Next.js docs + OWASP best practices)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Basic CSP – tighten further in production after testing Pyodide CDN & KaTeX
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' http://localhost:11434 https://*; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
  // Experimental features can be enabled here as needed
  experimental: {
    // serverActions: { bodySizeLimit: '2mb' },
  },
};

export default nextConfig;
