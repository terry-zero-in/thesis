export type TimeframeId = "5D" | "1M" | "3M" | "1Y" | "5Y";

export type Bar = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  vw: number;
  n: number;
};

export type FetchAggregatesResult =
  | { ok: true; bars: Bar[]; status: string }
  | { ok: false; reason: "no-data" };
