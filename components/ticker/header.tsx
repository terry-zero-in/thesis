import { getMarketSession, type MarketSession } from "@/lib/market/calendar";
import { getExchangeLabel } from "@/lib/market/exchange";

const SESSION_CONFIG: Record<
  MarketSession,
  { label: string; dotClass: string; textClass: string; pulse: boolean }
> = {
  open: {
    label: "MARKET LIVE",
    dotClass: "bg-success",
    textClass: "text-success",
    pulse: true,
  },
  "pre-market": {
    label: "PRE-MARKET",
    dotClass: "bg-warning",
    textClass: "text-warning",
    pulse: false,
  },
  "after-hours": {
    label: "AFTER HOURS",
    dotClass: "bg-warning",
    textClass: "text-warning",
    pulse: false,
  },
  closed: {
    label: "MARKET CLOSED",
    dotClass: "bg-text-3",
    textClass: "text-text-3",
    pulse: false,
  },
};

function SessionPill({ session }: { session: MarketSession }) {
  const c = SESSION_CONFIG[session];
  return (
    <span className="ml-auto inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.04em]">
      <span
        className={`h-1.5 w-1.5 rounded-full ${c.dotClass} ${c.pulse ? "animate-pulse" : ""}`}
      />
      <span className={c.textClass}>{c.label}</span>
    </span>
  );
}

export function TickerHeader({
  symbol,
  name,
  primaryExchange,
}: {
  symbol: string;
  name: string;
  primaryExchange?: string;
}) {
  const session = getMarketSession();
  return (
    <header className="flex items-center gap-3 border-b border-border-subtle px-8 py-6">
      <h1 className="flex items-baseline gap-2">
        <span className="font-mono text-lg font-medium tracking-[-0.01em] text-text-1">
          {symbol}
        </span>
        <span className="text-text-3">—</span>
        <span className="text-sm text-text-2">{name}</span>
      </h1>
      {primaryExchange && (
        <span className="text-[10.5px] font-medium tracking-[0.05em] text-text-3">
          {getExchangeLabel(primaryExchange)}
        </span>
      )}
      <SessionPill session={session} />
    </header>
  );
}
