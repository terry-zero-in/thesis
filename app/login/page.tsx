import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <div className="mb-10 flex items-baseline justify-center gap-3">
          <h1 className="text-[18px] font-medium tracking-[-0.015em] text-[var(--color-text-1)]">
            AI Thesis
          </h1>
          <span
            className="h-3.5 w-px bg-[var(--color-border)]"
            aria-hidden="true"
          />
          <span className="text-[13px] text-[var(--color-text-2)]">
            Investment OS
          </span>
        </div>

        <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-7">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
