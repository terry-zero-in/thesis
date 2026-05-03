import { DeltaPill } from "@/components/ui/delta-pill";

export function PriceBlock({
  latestClose,
  change,
  changePct,
}: {
  latestClose: number;
  change: number;
  changePct: number;
}) {
  return (
    <section className="flex items-baseline gap-4 px-8 py-6">
      <span className="font-mono text-2xl font-medium tracking-[-0.015em] text-text-1 tnum">
        ${latestClose.toFixed(2)}
      </span>
      <DeltaPill change={change} changePct={changePct} />
      <span className="text-[11px] text-text-3">15-min delayed</span>
    </section>
  );
}
