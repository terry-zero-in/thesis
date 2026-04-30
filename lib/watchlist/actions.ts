"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { validateTicker } from "@/lib/massive/validate-ticker";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const AddSchema = z.object({
  symbol: z.string().min(1).max(10),
  conviction: z.number().int().min(1).max(10).optional(),
  targetPrice: z.number().positive().nullable().optional(),
});

export type AddResult =
  | { ok: true }
  | { ok: false; error: string };

export async function addTicker(input: {
  symbol: string;
  conviction?: number;
  targetPrice?: number | null;
}): Promise<AddResult> {
  const parsed = AddSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not authenticated" };

  // Q-STORAGE U (2026-04-30): persist user-input form (e.g. BRK-B). validateTicker
  // normalizes to dot internally for Massive; storage stays user-form because Phase 1
  // sources disagree on canonical (Massive=dot, FMP=hyphen) and industry UI = hyphen.
  const symbol = parsed.data.symbol.toUpperCase();
  const validation = await validateTicker(symbol);
  if (!validation.valid) {
    return { ok: false, error: `Symbol "${symbol}" not found.` };
  }

  // Ensure ticker exists (public-read, service-role write)
  const admin = createAdminClient();
  let tickerId: string;
  const { data: existingTicker } = await admin
    .from("tickers")
    .select("id")
    .eq("symbol", symbol)
    .maybeSingle();

  if (existingTicker) {
    tickerId = existingTicker.id;
  } else {
    const { data: created, error: insertErr } = await admin
      .from("tickers")
      .insert({
        symbol,
        exchange: validation.primaryExchange ?? "XNAS",
        asset_class: "equity",
        active: true,
      })
      .select("id")
      .single();
    if (insertErr || !created) {
      return { ok: false, error: insertErr?.message ?? "Failed to add ticker" };
    }
    tickerId = created.id;

    if (validation.name) {
      await admin.from("companies").insert({
        ticker_id: tickerId,
        name: validation.name,
      });
    }
  }

  // Default-on-first-action: ensure default watchlist exists
  const { data: existingWatchlist } = await supabase
    .from("watchlists")
    .select("id")
    .eq("user_id", user.id)
    .eq("is_default", true)
    .maybeSingle();

  let watchlistId: string;
  if (existingWatchlist) {
    watchlistId = existingWatchlist.id;
  } else {
    const { data: createdWatchlist, error: wlErr } = await supabase
      .from("watchlists")
      .insert({
        user_id: user.id,
        name: "Default",
        is_default: true,
      })
      .select("id")
      .single();
    if (wlErr || !createdWatchlist) {
      return { ok: false, error: wlErr?.message ?? "Failed to create watchlist" };
    }
    watchlistId = createdWatchlist.id;
  }

  // Insert watchlist_ticker (RLS-bound)
  const { error: wtErr } = await supabase.from("watchlist_tickers").insert({
    watchlist_id: watchlistId,
    ticker_id: tickerId,
    target_price: parsed.data.targetPrice ?? null,
    conviction: parsed.data.conviction ?? null,
  });

  if (wtErr) {
    if (wtErr.code === "23505") {
      return { ok: false, error: `${symbol} is already in your watchlist.` };
    }
    return { ok: false, error: wtErr.message };
  }

  revalidatePath("/watchlist");
  return { ok: true };
}

const RemoveSchema = z.object({ id: z.string().uuid() });

export async function removeTicker(input: {
  id: string;
}): Promise<{ ok: boolean; restore?: { tickerId: string; targetPrice: number | null; conviction: number | null } }> {
  const parsed = RemoveSchema.safeParse(input);
  if (!parsed.success) return { ok: false };

  const supabase = await createClient();
  // Capture row data first so caller can restore on undo
  const { data: row } = await supabase
    .from("watchlist_tickers")
    .select("ticker_id, target_price, conviction")
    .eq("id", parsed.data.id)
    .single();

  const { error } = await supabase
    .from("watchlist_tickers")
    .delete()
    .eq("id", parsed.data.id);

  if (error) return { ok: false };

  revalidatePath("/watchlist");
  return {
    ok: true,
    restore: row
      ? {
          tickerId: row.ticker_id,
          targetPrice: row.target_price,
          conviction: row.conviction,
        }
      : undefined,
  };
}

export async function restoreTicker(input: {
  tickerId: string;
  targetPrice: number | null;
  conviction: number | null;
}): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { data: watchlist } = await supabase
    .from("watchlists")
    .select("id")
    .eq("user_id", user.id)
    .eq("is_default", true)
    .maybeSingle();

  if (!watchlist) return { ok: false };

  const { error } = await supabase.from("watchlist_tickers").insert({
    watchlist_id: watchlist.id,
    ticker_id: input.tickerId,
    target_price: input.targetPrice,
    conviction: input.conviction,
  });

  if (error) return { ok: false };
  revalidatePath("/watchlist");
  return { ok: true };
}
