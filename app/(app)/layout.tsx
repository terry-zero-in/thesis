import { redirect } from "next/navigation";

import { CommandPaletteProvider } from "@/components/shell/command-palette";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/lib/supabase/server";

export default async function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const email = user.email ?? "";
  const initials = (email.split("@")[0] || "U").slice(0, 2).toUpperCase();

  return (
    <CommandPaletteProvider>
      <div
        className="grid min-h-screen"
        style={{ gridTemplateColumns: "220px 1fr" }}
      >
        <Topbar email={email} initials={initials} />
        <Sidebar />
        <main className="min-w-0">{children}</main>
      </div>
      <Toaster />
    </CommandPaletteProvider>
  );
}
