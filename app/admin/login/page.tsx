import { redirect } from "next/navigation";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/config";
import { getAdmin } from "@/lib/auth/guard";

export const metadata = { title: "로그인" };

// Messages are generic on purpose: they never reveal which accounts are allowed or why a sign-in failed.
function errorMessage(error: string | undefined): string | null {
  if (!error) return null;
  if (error === "AccessDenied") return "이 계정은 관리자로 등록되어 있지 않습니다.";
  return "로그인하지 못했습니다. 잠시 후 다시 시도해 주세요.";
}

export default async function AdminLoginPage({ searchParams }: PageProps<"/admin/login">) {
  // Already signed in as an admin: skip the form. getAdmin() re-checks the DB, so a revoked
  // admin with a valid cookie is shown the form instead of being redirected in a loop.
  if (await getAdmin()) redirect("/admin/dashboard");

  const { error } = await searchParams;
  const message = errorMessage(Array.isArray(error) ? error[0] : error);

  async function signInWithGitHub() {
    "use server";
    await signIn("github", { redirectTo: "/admin/dashboard" });
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-5">
      <div className="flex w-full max-w-sm flex-col gap-6 border border-border bg-surface p-8">
        <div className="flex flex-col gap-2">
          <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
            MEFLOWEB Admin
          </p>
          <h1 className="text-h3">관리자 로그인</h1>
        </div>
        {message && (
          <p role="alert" className="text-body-sm font-semibold text-destructive">
            {message}
          </p>
        )}
        <form action={signInWithGitHub}>
          <Button type="submit" size="lg" className="w-full">
            <LogIn className="size-5" aria-hidden="true" />
            GitHub로 로그인
          </Button>
        </form>
      </div>
    </main>
  );
}
