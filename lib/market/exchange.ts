const EXCHANGE_LABELS: Record<string, string> = {
  XNAS: "NASDAQ",
  XNYS: "NYSE",
  ARCX: "NYSE Arca",
  BATS: "Cboe BZX",
  IEXG: "IEX",
};

export function getExchangeLabel(mic: string): string {
  const upper = mic.toUpperCase();
  return EXCHANGE_LABELS[upper] ?? upper;
}
