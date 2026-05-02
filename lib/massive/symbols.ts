// Massive stores class shares as `{root}.{suffix}` (BRK.B, BF.B, MOG.A).
// Section K seeds use hyphen-form (BRK-B). Normalize last `-X+` → `.X+`.
export function normalizeForMassive(upper: string): string {
  return upper.replace(/-([A-Z]+)$/, ".$1");
}
