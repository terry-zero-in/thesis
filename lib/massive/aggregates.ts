import { normalizeForMassive } from "./symbols";
import type { Bar, FetchAggregatesResult, TimeframeId } from "./types";

const MASSIVE_BASE = "https://api.massive.com/v2/aggs/ticker";

type Timespan = "hour" | "day" | "week";

const TIMEFRAME_MAP: Record<TimeframeId, { timespan: Timespan; daysBack: number }> = {
  "5D": { timespan: "hour", daysBack: 10 },
  "1M": { timespan: "day", daysBack: 30 },
  "3M": { timespan: "day", daysBack: 90 },
  "1Y": { timespan: "day", daysBack: 365 },
  "5Y": { timespan: "week", daysBack: 1825 },
};

const ET_HOUR_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  hourCycle: "h23",
});

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function isRegularSessionBar(t: number): boolean {
  const parts = ET_HOUR_FMT.formatToParts(new Date(t));
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  return hour >= 9 && hour < 16;
}

function resolveRefDate(refDate?: Date | string): Date {
  if (refDate instanceof Date) return refDate;
  if (typeof refDate === "string") return new Date(refDate);
  return new Date();
}

export async function fetchAggregates(input: {
  ticker: string;
  timeframeId: TimeframeId;
  refDate?: Date | string;
}): Promise<FetchAggregatesResult> {
  const apiKey = process.env.MASSIVE_API_KEY;
  if (!apiKey) throw new Error("MASSIVE_API_KEY is not set");

  const { timespan, daysBack } = TIMEFRAME_MAP[input.timeframeId];
  const ref = resolveRefDate(input.refDate);
  const to = toIsoDate(ref);
  const from = toIsoDate(new Date(ref.getTime() - daysBack * 86_400_000));
  const symbol = normalizeForMassive(input.ticker.trim().toUpperCase());

  const res = await fetch(`${MASSIVE_BASE}/${symbol}/range/1/${timespan}/${from}/${to}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Massive API error ${res.status} for ${symbol}`);

  const data = (await res.json()) as {
    status?: string;
    resultsCount?: number;
    results?: Bar[];
  };

  if (!data.results || data.resultsCount === 0) return { ok: false, reason: "no-data" };

  const bars =
    timespan === "hour" ? data.results.filter((b) => isRegularSessionBar(b.t)) : data.results;

  return { ok: true, bars, status: data.status ?? "UNKNOWN" };
}
