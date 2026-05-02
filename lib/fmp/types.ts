export type KeyMetric = {
  // ─── shared identity (read from /stable/key-metrics) ───
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;

  // ─── from /stable/key-metrics ───
  marketCap: number | null;
  currentRatio: number | null;
  evToEBITDA: number | null;

  // ─── from /stable/ratios ───
  priceToEarningsRatio: number | null;
  priceToBookRatio: number | null;
  priceToEarningsGrowthRatio: number | null;
  debtToEquityRatio: number | null;
};
