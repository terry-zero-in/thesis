const PLUS = "+";
const MINUS = "−"; // Unicode minus U+2212, never hyphen-minus

function formatSigned(value: number, prefix = "", suffix = ""): string {
  const sign = value >= 0 ? PLUS : MINUS;
  const abs = Math.abs(value);
  return `${sign}${prefix}${abs.toFixed(2)}${suffix}`;
}

export function DeltaPill({
  change,
  changePct,
}: {
  change: number;
  changePct: number;
}) {
  const isPositive = change >= 0;
  const tone = isPositive
    ? "bg-success-soft text-success"
    : "bg-danger-soft text-danger";

  return (
    <span
      className={`inline-flex items-baseline gap-1 rounded-md px-2 py-0.5 font-mono text-xs font-medium tnum ${tone}`}
    >
      <span>{formatSigned(change, "$")}</span>
      <span>({formatSigned(changePct, "", "%")})</span>
    </span>
  );
}
