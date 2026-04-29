// Stub. Swap to live `GET https://api.massive.com/v3/reference/tickers/{ticker}`
// after key rotation lands in .env.local.

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

  // Stub mode: shape mirrors the live response without hitting Massive.
  return {
    valid: true,
    name: `${upper} Inc.`,
    primaryExchange: "XNAS",
    type: "CS",
  };
}
