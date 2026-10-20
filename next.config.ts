import type { NextConfig } from "next";

// Response headers for every route. CSP is not set yet: Next.js inline scripts need a nonce setup,
// which is a separate decision (docs/DECISIONS.md D-031). Vercel already adds Strict-Transport-Security.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Admin must not be framed (clickjacking). Nothing on this site embeds its own pages.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // CLAUDE.md is the single source of agent rules; do not let `next dev` generate AGENTS.md.
  agentRules: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
