import type { KeyMetric } from "./types";

// FMP /stable/ surface — replaced /api/v3/ in Aug 2025.
// Symbol is a query param (?symbol=), NOT a path segment.
// Field names below were live-probed against /stable/key-metrics + /stable/ratios
// for NVDA on 2026-05-02. Documented spellings disagree with response shape in
// 4 places — every name here is verbatim from the wire, not from FMP docs.
//
// Gotchas pinned:
//   - fiscalYear is a STRING ("2026"), not a number, and replaces calendarYear.
//   - period response value is "FY" / "Q1" — NOT the request param "annual" / "quarter".
//   - evToEBITDA uses capital E-B-I-T-D-A. Neither evToEbitda nor enterpriseValueOverEBITDA exist.
//   - currentRatio appears on both endpoints with identical value; sourced from /key-metrics.
const FMP_BASE = "https://financialmodelingprep.com/stable";

export class FMPApiError extends Error {
  constructor(
    public status: number,
    public bodyHead: string,
    message?: string,
  ) {
    super(message ?? `FMP API error ${status}: ${bodyHead.slice(0, 200)}`);
    this.name = "FMPApiError";
  }
}

export class FMPPaywallError extends FMPApiError {
  constructor(status: number, bodyHead: string) {
    super(status, bodyHead, `FMP paywall (${status}): ${bodyHead.slice(0, 200)}`);
    this.name = "FMPPaywallError";
  }
}

export class FMPDeprecatedEndpointError extends FMPApiError {
  constructor(status: number, bodyHead: string) {
    super(
      status,
      bodyHead,
      `FMP deprecated endpoint (${status}): ${bodyHead.slice(0, 200)}`,
    );
    this.name = "FMPDeprecatedEndpointError";
  }
}

// FMP returns 402 + body containing "value set for 'symbol' is not available
// under your current subscription" when the symbol itself is unrecognized OR
// outside the current plan's coverage. This is distinct from a true endpoint
// paywall — no upgrade necessarily makes the symbol valid; it could be a
// typo, a delisted symbol, or an asset class the tier doesn't include.
// Caller should render "Fundamentals not available for this ticker" rather
// than a generic upgrade CTA.
export class FMPSymbolNotCoveredError extends FMPApiError {
  constructor(status: number, bodyHead: string) {
    super(
      status,
      bodyHead,
      `FMP symbol not covered (${status}): ${bodyHead.slice(0, 200)}`,
    );
    this.name = "FMPSymbolNotCoveredError";
  }
}

export class FMPMergeError extends Error {
  constructor(
    public kmLength: number,
    public ratiosLength: number,
  ) {
    super(
      `FMP merge error: /key-metrics returned ${kmLength} periods, /ratios returned ${ratiosLength}`,
    );
    this.name = "FMPMergeError";
  }
}

type KeyMetricsRow = {
  symbol: string;
  date: string;
  fiscalYear: string;
  period: string;
  reportedCurrency: string;
  marketCap: number | null;
  currentRatio: number | null;
  evToEBITDA: number | null;
};

type RatiosRow = {
  priceToEarningsRatio: number | null;
  priceToBookRatio: number | null;
  priceToEarningsGrowthRatio: number | null;
  debtToEquityRatio: number | null;
};

async function fetchOrThrow(url: string, label: string): Promise<unknown[]> {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text();
    const bodyHead = body.slice(0, 500);
    // Ladder order matters: 403+legacy → deprecation; 402+symbol-language →
    // symbol-not-covered; 402 (anything else) → generic paywall; everything
    // else → bare API error. The 402 split prevents misclassifying an
    // unrecognized ticker as an upgrade-fixable paywall.
    if (res.status === 403 && /Legacy Endpoint/i.test(body)) {
      throw new FMPDeprecatedEndpointError(res.status, bodyHead);
    }
    if (res.status === 402) {
      if (/value set for ['"]symbol['"]|symbol.*not available under/i.test(body)) {
        throw new FMPSymbolNotCoveredError(res.status, bodyHead);
      }
      throw new FMPPaywallError(res.status, bodyHead);
    }
    throw new FMPApiError(
      res.status,
      bodyHead,
      `FMP ${label} ${res.status}: ${bodyHead}`,
    );
  }

  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) {
    throw new FMPApiError(
      200,
      JSON.stringify(data).slice(0, 500),
      `FMP ${label} returned non-array shape`,
    );
  }
  return data;
}

export async function getKeyMetrics(
  ticker: string,
  period: "annual" | "quarter" = "annual",
  limit = 5,
): Promise<KeyMetric[]> {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    throw new Error("FMP_API_KEY is not set");
  }

  const symbol = ticker.trim().toUpperCase();
  const qs = `symbol=${symbol}&period=${period}&limit=${limit}&apikey=${apiKey}`;

  const [kmRows, ratiosRows] = await Promise.all([
    fetchOrThrow(`${FMP_BASE}/key-metrics?${qs}`, "/key-metrics"),
    fetchOrThrow(`${FMP_BASE}/ratios?${qs}`, "/ratios"),
  ]);

  if (kmRows.length === 0 || ratiosRows.length === 0) {
    return [];
  }

  if (kmRows.length !== ratiosRows.length) {
    throw new FMPMergeError(kmRows.length, ratiosRows.length);
  }

  return kmRows.map((kmRaw, i) => {
    const km = kmRaw as KeyMetricsRow;
    const r = ratiosRows[i] as RatiosRow;
    return {
      symbol: km.symbol,
      date: km.date,
      fiscalYear: km.fiscalYear,
      period: km.period,
      reportedCurrency: km.reportedCurrency,
      marketCap: km.marketCap,
      currentRatio: km.currentRatio,
      evToEBITDA: km.evToEBITDA,
      priceToEarningsRatio: r.priceToEarningsRatio,
      priceToBookRatio: r.priceToBookRatio,
      priceToEarningsGrowthRatio: r.priceToEarningsGrowthRatio,
      debtToEquityRatio: r.debtToEquityRatio,
    };
  });
}
