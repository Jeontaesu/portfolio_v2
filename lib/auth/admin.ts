import "server-only";

import { db } from "@/lib/db/client";
import type { Role } from "@/lib/db/generated/client";

export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
};

const adminSelect = { id: true, email: true, name: true, role: true } as const;

/**
 * The allowlist: an account may sign in only if a User row with this email has role ADMIN.
 * Comparison ignores case, because GitHub and the seed may differ in capitalization.
 */
export async function findAdminByEmail(
  email: string | null | undefined,
): Promise<AdminUser | null> {
  if (!email) return null;
  return db.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" }, role: "ADMIN" },
    select: adminSelect,
  });
}

export async function findAdminById(id: string): Promise<AdminUser | null> {
  return db.user.findFirst({ where: { id, role: "ADMIN" }, select: adminSelect });
}
