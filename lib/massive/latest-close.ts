import { cache } from "react";

import { normalizeForMassive } from "./symbols";

const MASSIVE_BASE = "https://api.massive.com/v2/aggs/ticker";
const WINDOW_DAYS = 7;

export type LatestClose = {
  latestClose: number;
  prevClose: number;
  asOf: number;
  change: number;
  changePct: number;
};

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export const fetchLatestClose = cache(
  async (symbol: string): Promise<LatestClose> => {
    const apiKey = process.env.MASSIVE_API_KEY;
    if (!apiKey) throw new Error("MASSIVE_API_KEY is not set");

    const normalized = normalizeForMassive(symbol.trim().toUpperCase());
    const now = Date.now();
    const to = toIsoDate(new Date(now));
    const from = toIsoDate(new Date(now - WINDOW_DAYS * 86_400_000));

    const url = `${MASSIVE_BASE}/${normalized}/range/1/day/${from}/${to}?adjusted=true`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Massive API error ${res.status} for ${normalized}`);
    }

    const data = (await res.json()) as {
      results?: Array<{ c: number; t: number }>;
    };

    const bars = data.results ?? [];
    if (bars.length < 2) {
      throw new Error(
        `Insufficient bars for ${normalized}: need 2, got ${bars.length}`,
      );
    }

    const latest = bars[bars.length - 1];
    const prev = bars[bars.length - 2];
    const change = latest.c - prev.c;
    const changePct = (change / prev.c) * 100;

    return {
      latestClose: latest.c,
      prevClose: prev.c,
      asOf: latest.t,
      change,
      changePct,
    };
  },
);
