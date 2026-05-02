export type KeyMetric = {
  symbol: string;
  date: string;
  calendarYear: string;
  period: string;
  marketCap: number | null;
  peRatio: number | null;
  pbRatio: number | null;
  pegRatio: number | null;
  debtToEquity: number | null;
  currentRatio: number | null;
};

export type FetchKeyMetricsResult =
  | { ok: true; periods: KeyMetric[] }
  | { ok: false; reason: "no-data" };
