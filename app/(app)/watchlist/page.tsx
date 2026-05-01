import { redirect } from "next/navigation";

import { WatchlistTable } from "@/components/watchlist/watchlist-table";
import { createClient } from "@/lib/supabase/server";
import { getDefaultWatchlistId, getWatchlistRows } from "@/lib/watchlist/queries";

export default async function WatchlistPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const watchlistId = await getDefaultWatchlistId(user.id);
  const rows = watchlistId ? await getWatchlistRows(watchlistId) : [];

  return (
    <div className="space-y-6 px-8 py-6">
      <header className="flex items-baseline gap-3">
        <h1 className="text-lg font-medium text-text-1">Watchlist</h1>
        <span className="text-sm text-text-3">Default</span>
      </header>
      <WatchlistTable rows={rows} />
    </div>
  );
}
