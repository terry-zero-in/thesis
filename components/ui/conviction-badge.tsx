function tone(conviction: number) {
  if (conviction >= 9) return "bg-success-soft text-success";
  if (conviction >= 7) return "bg-success-soft text-success/90";
  if (conviction >= 4) return "bg-info-soft text-info";
  return "bg-surface-2 text-text-3";
}

export function ConvictionBadge({ score }: { score: number | null }) {
  if (score == null) {
    return <span className="text-text-3 tnum">—</span>;
  }
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tnum ${tone(score)}`}
    >
      {score}/10
    </span>
  );
}
