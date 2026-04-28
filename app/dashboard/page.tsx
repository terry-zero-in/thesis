import { redirect } from "next/navigation";

import { signOut } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <main className="min-h-screen px-8 py-8">
      <h1 className="text-[18px] font-medium tracking-[-0.015em] text-[var(--color-text-1)]">
        Dashboard
      </h1>
      <div className="mt-2 flex items-center gap-2 text-[13px] text-[var(--color-text-2)]">
        <span>
          Signed in as{" "}
          <span className="text-[var(--color-text-1)]">{user.email}</span>
        </span>
        <span aria-hidden="true" className="text-[var(--color-text-3)]">
          ·
        </span>
        <form action={signOut}>
          <button
            type="submit"
            className="text-[var(--color-text-2)] transition-colors hover:text-[var(--color-text-1)]"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
