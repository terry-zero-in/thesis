import type { FetchKeyMetricsResult, KeyMetric } from "./types";

const FMP_BASE = "https://financialmodelingprep.com/api/v3";

export type KeyMetricsOptions = {
  period?: "annual" | "quarter";
  limit?: number;
};

export async function fetchKeyMetrics(
  ticker: string,
  options: KeyMetricsOptions = {},
): Promise<FetchKeyMetricsResult> {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    throw new Error("FMP_API_KEY is not set");
  }

  const period = options.period ?? "annual";
  const limit = options.limit ?? 5;
  const symbol = ticker.trim().toUpperCase();

  const res = await fetch(
    `${FMP_BASE}/key-metrics/${symbol}?period=${period}&limit=${limit}&apikey=${apiKey}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`FMP API error ${res.status} for ${symbol}`);
  }

  const data = (await res.json()) as KeyMetric[];

  if (!Array.isArray(data) || data.length === 0) {
    return { ok: false, reason: "no-data" };
  }

  return { ok: true, periods: data };
}
