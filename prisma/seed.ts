// Moves the file-based content into the database: categories, the admin user, posts, projects.
// Safe to re-run: rows that already exist (matched by slug / email) are left untouched, so edits
// made later through Admin are never overwritten by the files.
//
// Run: pnpm db:seed   (needs DATABASE_URL_UNPOOLED and ADMIN_EMAIL in .env.local)
import fs from "node:fs/promises";
import path from "node:path";

import { PrismaPg } from "@prisma/adapter-pg";

import { projects } from "../content/projects";
import { POST_CATEGORIES, readAllPostFiles } from "../lib/content/post-file";
import { PrismaClient } from "../lib/db/generated/client";

try {
  process.loadEnvFile(".env.local");
} catch {
  // variables may already be in the environment
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required (set it in .env.local)`);
  return value;
}

/** "2026-03" → 2026-03-01 (UTC). Stored as a date; the site shows YYYY-MM. */
function monthToDate(month: string | undefined): Date | undefined {
  return month ? new Date(`${month}-01T00:00:00.000Z`) : undefined;
}

async function main() {
  const adminEmail = requireEnv("ADMIN_EMAIL");
  const db = new PrismaClient({
    adapter: new PrismaPg({ connectionString: requireEnv("DATABASE_URL_UNPOOLED") }),
  });

  try {
    const counts = { categories: 0, posts: 0, projects: 0 };

    const admin = await db.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: { email: adminEmail, name: "MEFLOWEB", role: "ADMIN" },
    });

    const categoryIds = new Map<string, string>();
    for (const { slug, name } of POST_CATEGORIES) {
      const existing = await db.category.findUnique({ where: { slug } });
      const category = existing ?? (await db.category.create({ data: { slug, name } }));
      if (!existing) counts.categories++;
      categoryIds.set(slug, category.id);
    }

    for (const { meta, body } of await readAllPostFiles()) {
      if (await db.post.findUnique({ where: { slug: meta.slug } })) continue;
      await db.post.create({
        data: {
          title: meta.title,
          slug: meta.slug,
          excerpt: meta.excerpt,
          content: body,
          status: meta.status,
          publishedAt: new Date(`${meta.publishedAt}T00:00:00.000Z`),
          authorId: admin.id,
          categoryId: categoryIds.get(meta.category),
        },
      });
      counts.posts++;
    }

    for (const project of projects) {
      if (await db.project.findUnique({ where: { slug: project.slug } })) continue;
      const content = await fs.readFile(
        path.join(process.cwd(), "content", "projects", `${project.slug}.md`),
        "utf8",
      );
      await db.project.create({
        data: {
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          content,
          thumbnail: project.thumbnail,
          thumbnailAlt: project.thumbnailAlt,
          thumbnailFit: project.thumbnailFit === "contain" ? "CONTAIN" : "COVER",
          techStack: [...project.techStack],
          role: project.role,
          startedAt: monthToDate(project.startedAt),
          endedAt: monthToDate(project.endedAt),
          githubUrl: project.githubUrl,
          demoUrl: project.demoUrl,
          featured: project.featured,
          sortOrder: project.sortOrder,
          status: project.status,
        },
      });
      counts.projects++;
    }

    console.log(
      `seed done — created: ${counts.categories} categories, ${counts.posts} posts, ${counts.projects} projects`,
    );
  } finally {
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
