/**
 * Token verification page (DESIGN_SPEC §10).
 * Renders every primitive in the design system so any drift is visually
 * detectable. Not user-facing — a regression check for THS-1.
 */

const SURFACE_TOKENS = [
  { name: "--color-bg", hex: "#0A0B0E", note: "App canvas + sidebar (merged)" },
  { name: "--color-surface", hex: "#14161B", note: "Panels, KPI hover, search" },
  { name: "--color-surface-2", hex: "#1A1D24", note: "Inputs, badges, tracks" },
  { name: "--color-surface-hover", hex: "#1F232B", note: "Row hover" },
  { name: "--color-border", hex: "#232730", note: "Strong borders (rare)" },
  { name: "--color-border-subtle", hex: "#1A1D24", note: "Default panel/section borders" },
];

const TEXT_TOKENS = [
  { name: "--color-text-1", hex: "#F0F1F3", note: "Primary, numerics, headings" },
  { name: "--color-text-2", hex: "#9298A3", note: "Secondary, body, nav inactive" },
  { name: "--color-text-3", hex: "#5F6571", note: "Tertiary, labels, timestamps" },
];

const ACCENT_TOKENS = [
  { name: "--color-accent", hex: "#4D5BFF", note: "Active nav, primary CTAs" },
  { name: "--color-accent-soft", hex: "rgba(77,91,255,.12)", note: "Active nav badge bg" },
  { name: "--color-accent-hover", hex: "#6573FF", note: "Accent CTA hover" },
];

const STATUS_TOKENS = [
  { name: "--color-success", hex: "#4FB87A", note: "Up, BUY, approve, bull" },
  { name: "--color-success-soft", hex: "rgba(79,184,122,.12)", note: "BUY pill bg" },
  { name: "--color-warning", hex: "#DDA84F", note: "HOLD, high severity" },
  { name: "--color-warning-soft", hex: "rgba(221,168,79,.12)", note: "HOLD pill bg" },
  { name: "--color-danger", hex: "#E26B6B", note: "Down, SELL, crit, bear" },
  { name: "--color-danger-soft", hex: "rgba(226,107,107,.12)", note: "SELL pill bg" },
  { name: "--color-info", hex: "#5B8FFF", note: "Med severity, proximity" },
  { name: "--color-info-soft", hex: "rgba(91,143,255,.10)", note: "Info halo" },
];

const TYPE_LADDER = [
  { px: 11, label: "11px · uppercase label", upper: true, tracking: "0.06em" },
  { px: 12, label: "12px · meta / table cell secondary" },
  { px: 13, label: "13px · body / table cell" },
  { px: 14, label: "14px · base body / macro value" },
  { px: 16, label: "16px · pending ticker" },
  { px: 18, label: "18px · greet", tracking: "-0.015em" },
  { px: 24, label: "24px · KPI value", tracking: "-0.015em" },
  { px: 32, label: "32px · large display" },
  { px: 48, label: "48px · hero" },
];

const NUMERIC_ROWS = [
  { label: "USD price", value: "$117.50" },
  { label: "USD (large)", value: "$487,250" },
  { label: "Percent up", value: "+2.74%" },
  { label: "Percent down", value: "-1.41%" },
  { label: "Volume", value: "185,432,910" },
  { label: "Ratio", value: "62.5x" },
  { label: "Time", value: "12:34:56 PM" },
];

const SEVERITY = [
  { name: "Crit", token: "danger", hex: "#E26B6B" },
  { name: "High", token: "warning", hex: "#DDA84F" },
  { name: "Med", token: "info", hex: "#5B8FFF" },
  { name: "Low", token: "text-3", hex: "#5F6571", lowOpacity: true },
];

const RECO_PILLS = [
  { label: "BUY", color: "var(--color-success)", bg: "var(--color-success-soft)" },
  { label: "SELL", color: "var(--color-danger)", bg: "var(--color-danger-soft)" },
  { label: "HOLD", color: "var(--color-warning)", bg: "var(--color-warning-soft)" },
  { label: "WATCH", color: "var(--color-info)", bg: "var(--color-info-soft)" },
  { label: "AVOID", color: "var(--color-text-3)", bg: "var(--color-surface-2)" },
];

const SPACING_SCALE = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32];
const RADIUS_SCALE = [1, 2, 3, 4, 5, 6];

function Section({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-md overflow-hidden"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border-subtle)",
      }}
    >
      <header
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
      >
        <h2 className="text-[13px] font-medium tracking-[-0.005em]">{title}</h2>
        {meta ? (
          <span
            className="text-[11px] tnum"
            style={{
              color: "var(--color-text-3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {meta}
          </span>
        ) : null}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Swatch({
  name,
  hex,
  note,
}: {
  name: string;
  hex: string;
  note: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 rounded-[4px] flex-shrink-0"
        style={{
          background: `var(${name})`,
          border: "1px solid var(--color-border-subtle)",
        }}
      />
      <div className="min-w-0">
        <div
          className="text-[12px] tnum truncate"
          style={{
            color: "var(--color-text-1)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {name}
        </div>
        <div
          className="text-[11px] tnum truncate"
          style={{
            color: "var(--color-text-3)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {hex}
        </div>
        <div
          className="text-[11px] truncate"
          style={{ color: "var(--color-text-2)" }}
        >
          {note}
        </div>
      </div>
    </div>
  );
}

export default function TokensPage() {
  return (
    <main className="min-h-screen px-8 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex items-baseline justify-between border-b pb-4" style={{ borderColor: "var(--color-border-subtle)" }}>
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-[18px] font-medium tracking-[-0.015em]">
                Token verification
              </h1>
              <span className="h-3 w-px" style={{ background: "var(--color-border)" }} />
              <span
                className="text-[13px]"
                style={{ color: "var(--color-text-2)" }}
              >
                DESIGN_SPEC v1.0 · THS-1
              </span>
            </div>
            <p className="mt-2 text-[12px]" style={{ color: "var(--color-text-3)" }}>
              Regression check. Every primitive in the system rendered once.
            </p>
          </div>
          <a
            href="/"
            className="text-[12px] hover:opacity-80"
            style={{ color: "var(--color-text-2)" }}
          >
            ← Home
          </a>
        </header>

        {/* Surface tokens */}
        <Section title="Surface tokens" meta="6 tokens">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SURFACE_TOKENS.map((t) => (
              <Swatch key={t.name} {...t} />
            ))}
          </div>
        </Section>

        {/* Text tokens */}
        <Section title="Text tokens" meta="3 tokens">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEXT_TOKENS.map((t) => (
              <div key={t.name} className="space-y-1">
                <div
                  className="text-[24px] font-medium tracking-[-0.015em]"
                  style={{ color: `var(${t.name})` }}
                >
                  Aa
                </div>
                <div
                  className="text-[12px] tnum"
                  style={{
                    color: "var(--color-text-1)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {t.name}
                </div>
                <div
                  className="text-[11px] tnum"
                  style={{
                    color: "var(--color-text-3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {t.hex}
                </div>
                <div
                  className="text-[11px]"
                  style={{ color: "var(--color-text-2)" }}
                >
                  {t.note}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Accent tokens */}
        <Section title="Accent tokens" meta="3 tokens">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ACCENT_TOKENS.map((t) => (
              <Swatch key={t.name} {...t} />
            ))}
          </div>
        </Section>

        {/* Status tokens */}
        <Section title="Status tokens" meta="8 tokens (4 pairs)">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATUS_TOKENS.map((t) => (
              <Swatch key={t.name} {...t} />
            ))}
          </div>
        </Section>

        {/* Geist Sans size ladder */}
        <Section title="Geist Sans · size ladder" meta="9 sizes">
          <div className="space-y-3">
            {TYPE_LADDER.map((t) => (
              <div key={t.px} className="flex items-baseline gap-4">
                <span
                  className="w-12 text-[11px] tnum flex-shrink-0"
                  style={{
                    color: "var(--color-text-3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {t.px}px
                </span>
                <span
                  style={{
                    fontSize: `${t.px}px`,
                    fontFamily: "var(--font-sans)",
                    fontWeight: t.px >= 18 ? 500 : 400,
                    letterSpacing: t.tracking ?? "normal",
                    textTransform: t.upper ? "uppercase" : "none",
                    color: "var(--color-text-1)",
                  }}
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* JetBrains Mono numeric */}
        <Section title="JetBrains Mono · tabular numerics" meta="font-feature-settings: 'tnum'">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-md">
            {NUMERIC_ROWS.map((r) => (
              <div key={r.label} className="contents">
                <span
                  className="text-[11px]"
                  style={{ color: "var(--color-text-3)" }}
                >
                  {r.label}
                </span>
                <span
                  className="text-[14px] tnum text-right"
                  style={{
                    color: "var(--color-text-1)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Severity */}
        <Section title="Severity · 4 levels" meta="dot · soft-bg pill · bar">
          <div className="space-y-4">
            {SEVERITY.map((s) => (
              <div key={s.name} className="flex items-center gap-6">
                <span
                  className="w-12 text-[11px] uppercase tracking-[0.06em]"
                  style={{ color: "var(--color-text-3)" }}
                >
                  {s.name}
                </span>
                {/* Dot with halo */}
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: s.hex,
                    opacity: s.lowOpacity ? 0.5 : 1,
                    boxShadow: s.lowOpacity
                      ? "none"
                      : `0 0 0 3px ${s.hex}1f`,
                  }}
                />
                {/* Soft pill */}
                <span
                  className="text-[10px] tnum px-2 py-0.5 rounded-[2px] uppercase tracking-[0.04em]"
                  style={{
                    color: s.hex,
                    background: s.lowOpacity
                      ? "var(--color-surface-2)"
                      : `${s.hex}1f`,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s.name}
                </span>
                {/* Bar */}
                <span
                  className="h-1 w-24 rounded-[1px]"
                  style={{
                    background: s.hex,
                    opacity: s.lowOpacity ? 0.5 : 1,
                  }}
                />
                <span
                  className="text-[11px] tnum"
                  style={{
                    color: "var(--color-text-3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s.hex}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Reco pills */}
        <Section title="Reco pills · 5 variants" meta="2px·7px · radius 3 · 10.5px 500 uppercase">
          <div className="flex flex-wrap gap-3">
            {RECO_PILLS.map((p) => (
              <span
                key={p.label}
                className="text-[10.5px] font-medium uppercase tracking-[0.05em] rounded-[3px] px-[7px] py-[2px]"
                style={{ color: p.color, background: p.bg }}
              >
                {p.label}
              </span>
            ))}
          </div>
        </Section>

        {/* Conviction ticks */}
        <Section title="Conviction ticks · 0–10" meta="4×8px tick · 1.5px gap">
          <div className="space-y-3">
            {[0, 3, 5, 7, 10].map((n) => (
              <div key={n} className="flex items-center gap-4">
                <span
                  className="w-12 text-[11px] tnum"
                  style={{
                    color: "var(--color-text-3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {n}/10
                </span>
                <span className="flex gap-[1.5px]">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className="rounded-[1px]"
                      style={{
                        width: 4,
                        height: 8,
                        background:
                          i < n
                            ? "var(--color-accent)"
                            : "var(--color-surface-2)",
                      }}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Live indicator */}
        <Section title="Live indicator" meta="6px dot · 2s pulseLive">
          <div className="flex items-center gap-3">
            <span className="relative inline-block h-1.5 w-1.5">
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--color-success)" }}
              />
              <span
                className="absolute -inset-0.5 rounded-full"
                style={{
                  background: "var(--color-success)",
                  opacity: 0.4,
                  animation: "pulseLive 2s infinite",
                }}
              />
            </span>
            <span
              className="text-[11px] font-medium uppercase tracking-[0.04em]"
              style={{ color: "var(--color-success)" }}
            >
              Market Live
            </span>
          </div>
        </Section>

        {/* Spacing scale */}
        <Section title="Spacing scale" meta="2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 32 px">
          <div className="space-y-2">
            {SPACING_SCALE.map((s) => (
              <div key={s} className="flex items-center gap-4">
                <span
                  className="w-12 text-[11px] tnum"
                  style={{
                    color: "var(--color-text-3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s}px
                </span>
                <span
                  style={{
                    height: 8,
                    width: s * 6,
                    background: "var(--color-accent)",
                    borderRadius: 2,
                  }}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Radius scale */}
        <Section title="Radius scale" meta="1 · 2 · 3 · 4 · 5 · 6 px">
          <div className="flex items-end gap-4">
            {RADIUS_SCALE.map((r) => (
              <div key={r} className="flex flex-col items-center gap-2">
                <span
                  style={{
                    width: 56,
                    height: 56,
                    background: "var(--color-accent-soft)",
                    border: "1px solid var(--color-accent)",
                    borderRadius: r,
                  }}
                />
                <span
                  className="text-[11px] tnum"
                  style={{
                    color: "var(--color-text-3)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {r}px
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer
          className="text-[11px] tnum text-center pt-4"
          style={{
            color: "var(--color-text-3)",
            fontFamily: "var(--font-mono)",
          }}
        >
          DESIGN_SPEC.md @ docs/design/ · token sheet @ thesis-design-system.css
        </footer>
      </div>
    </main>
  );
}
