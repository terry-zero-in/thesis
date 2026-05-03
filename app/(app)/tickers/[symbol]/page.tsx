import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { TickerHeader } from "@/components/ticker/header";
import { PriceBlock } from "@/components/ticker/price-block";
import { fetchLatestClose } from "@/lib/massive/latest-close";
import { validateTicker } from "@/lib/massive/validate-ticker";

type Props = {
  params: Promise<{ symbol: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  if (symbol !== symbol.toUpperCase()) {
    return { title: "Thesis" };
  }
  const result = await validateTicker(symbol);
  if (!result.valid) {
    return { title: "Ticker not found — Thesis" };
  }
  return { title: `${symbol} — ${result.name ?? symbol} — Thesis` };
}

export default async function TickerPage({ params }: Props) {
  const { symbol } = await params;

  if (symbol !== symbol.toUpperCase()) {
    permanentRedirect(`/tickers/${symbol.toUpperCase()}`);
  }

  const result = await validateTicker(symbol);
  if (!result.valid) {
    notFound();
  }

  const upper = symbol.toUpperCase();
  const latest = await fetchLatestClose(upper);

  return (
    <>
      <TickerHeader
        symbol={upper}
        name={result.name ?? upper}
        primaryExchange={result.primaryExchange}
      />
      <PriceBlock
        latestClose={latest.latestClose}
        change={latest.change}
        changePct={latest.changePct}
      />
    </>
  );
}
