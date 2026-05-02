import { notFound, permanentRedirect } from "next/navigation";

import { validateTicker } from "@/lib/massive/validate-ticker";

export default async function TickerPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;

  if (symbol !== symbol.toUpperCase()) {
    permanentRedirect(`/tickers/${symbol.toUpperCase()}`);
  }

  const result = await validateTicker(symbol);
  if (!result.valid) {
    notFound();
  }

  return (
    <div className="px-8 py-6">Ticker: {symbol.toUpperCase()}</div>
  );
}
