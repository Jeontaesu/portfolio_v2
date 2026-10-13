import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CLAUDE.md is the single source of agent rules; do not let `next dev` generate AGENTS.md.
  agentRules: false,
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
