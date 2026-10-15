import "server-only";

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { findAdminByEmail } from "./admin";

/**
 * Auth.js v5. GitHub OAuth only, no password stored. JWT sessions, so no Account/Session tables.
 * AUTH_SECRET, AUTH_GITHUB_ID and AUTH_GITHUB_SECRET are read from the environment automatically.
 *
 * The JWT is only a hint about who signed in. Every protected page and action calls requireAdmin()
 * (lib/auth/guard.ts), which re-checks the database, so a removed admin loses access immediately.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  callbacks: {
    // Only allowlisted admins can complete a sign-in. Anyone else is sent back with AccessDenied.
    async signIn({ user }) {
      return (await findAdminByEmail(user.email)) !== null;
    },
    // `user` is only present at sign-in; copy our own user id into the token then.
    async jwt({ token, user }) {
      if (user?.email) {
        const admin = await findAdminByEmail(user.email);
        if (admin) token.userId = admin.id;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.userId === "string") session.user.id = token.userId;
      return session;
    },
  },
});
