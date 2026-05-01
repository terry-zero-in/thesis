import { createClient } from "@/lib/supabase/server";

import type { MemoStatus, WatchlistRow } from "./types";

type EmbeddedRow = {
  id: string;
  target_price: number | null;
  conviction: number | null;
  added_at: string;
  ticker_id: string;
  tickers: {
    id: string;
    symbol: string;
    companies: { name: string | null; sector: string | null } | null;
    investment_memos: { status: string; updated_at: string }[] | null;
    research_jobs: {
      completed_at: string | null;
      created_at: string;
    }[] | null;
  } | null;
};

export async function getDefaultWatchlistId(
  userId: string,
): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("watchlists")
    .select("id")
    .eq("user_id", userId)
    .eq("is_default", true)
    .maybeSingle();
  return data?.id ?? null;
}

export async function getWatchlistRows(
  watchlistId: string,
): Promise<WatchlistRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("watchlist_tickers")
    .select(
      `
      id,
      target_price,
      conviction,
      added_at,
      ticker_id,
      tickers!inner (
        id,
        symbol,
        companies ( name, sector ),
        investment_memos ( status, updated_at ),
        research_jobs ( completed_at, created_at )
      )
    `,
    )
    .eq("watchlist_id", watchlistId)
    .order("added_at", { ascending: true });

  if (error) throw error;

  const rows = (data ?? []) as unknown as EmbeddedRow[];
  return rows.map((r) => {
    const memos = r.tickers?.investment_memos ?? [];
    const jobs = r.tickers?.research_jobs ?? [];
    const latestMemo = memos
      .slice()
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))[0];
    const latestJob = jobs
      .slice()
      .sort((a, b) => b.created_at.localeCompare(a.created_at))[0];

    return {
      id: r.id,
      tickerId: r.ticker_id,
      symbol: r.tickers?.symbol ?? "—",
      companyName: r.tickers?.companies?.name ?? null,
      sector: r.tickers?.companies?.sector ?? null,
      targetPrice: r.target_price,
      conviction: r.conviction,
      addedAt: r.added_at,
      latestMemoStatus: (latestMemo?.status as MemoStatus) ?? null,
      latestResearchAt: latestJob?.completed_at ?? null,
    };
  });
}
