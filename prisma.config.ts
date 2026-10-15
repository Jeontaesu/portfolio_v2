import { defineConfig } from "prisma/config";

// Prisma 7 does not load .env files itself. Next.js reads .env.local at runtime; the CLI reads it here.
// On Vercel the variables already exist in process.env, so a missing file is fine.
try {
  process.loadEnvFile(".env.local");
} catch {
  // no .env.local
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Migrations need a direct (non-pooled) connection; the app uses the pooled DATABASE_URL at runtime.
    // Empty fallback lets `prisma generate` run in environments without a database (e.g. type checks).
    url: process.env.DATABASE_URL_UNPOOLED ?? "",
  },
});
