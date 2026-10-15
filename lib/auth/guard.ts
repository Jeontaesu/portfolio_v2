import "server-only";

import { redirect } from "next/navigation";

import { findAdminById, type AdminUser } from "./admin";
import { auth } from "./config";

/** The signed-in admin, or null. Re-checks the database, so a revoked role takes effect at once. */
export async function getAdmin(): Promise<AdminUser | null> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;
  return findAdminById(userId);
}

/**
 * Authorization check for Admin pages, layouts, Server Actions and Route Handlers.
 * Hiding a button is not authorization: call this on the server in every one of them.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
