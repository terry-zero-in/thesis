import { normalizeForMassive } from "./symbols";

export type ValidatedTicker = {
  valid: boolean;
  name?: string;
  primaryExchange?: string;
  type?: string;
  marketCap?: number;
  logoUrl?: string;
};

const SYMBOL_RE = /^[A-Z][A-Z0-9.\-]{0,9}$/;

export async function validateTicker(symbol: string): Promise<ValidatedTicker> {
  const upper = symbol.trim().toUpperCase();
  if (!SYMBOL_RE.test(upper)) return { valid: false };

  const normalized = normalizeForMassive(upper);

  const apiKey = process.env.MASSIVE_API_KEY;
  if (!apiKey) {
    throw new Error("MASSIVE_API_KEY is not set");
  }

  const res = await fetch(`https://api.massive.com/v3/reference/tickers/${normalized}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });

  if (res.status === 404) return { valid: false };
  if (!res.ok) {
    throw new Error(`Massive API error ${res.status} for ${normalized}`);
  }

  const data = (await res.json()) as {
    status?: string;
    results?: {
      name?: string;
      primary_exchange?: string;
      type?: string;
      market_cap?: number;
      active?: boolean;
      branding?: { logo_url?: string };
    };
  };

  const r = data.results;
  if (!r || r.active === false) return { valid: false };

  return {
    valid: true,
    name: r.name,
    primaryExchange: r.primary_exchange,
    type: r.type,
    marketCap: typeof r.market_cap === "number" ? r.market_cap : undefined,
    logoUrl: r.branding?.logo_url,
  };
}
