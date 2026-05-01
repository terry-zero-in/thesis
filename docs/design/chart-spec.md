# Chart Spec — AI Thesis Chart Principles

**Status:** LOCKED — authoritative reference for every chart in AI Thesis.
**Version:** v1.0 (2026-05-01) — ported from Basis `charts-spec.md` cross-cutting principles + Q-by-Q references applicable to AI Thesis. Token-aligned to Basis canon (`thesis-design-system.css` v2.0).
**Locked by:** Terry, 2026-05-01.

**Origin:** Direct port of the Basis chart system. Q1-Q39 in Basis are decision tombstones from 47 sessions of mockup review (S45-S67); the cross-cutting principles distilled from them are framework-agnostic and port verbatim. Only the rent-roll-specific visualizations (Brixton matrix, aging buckets, MTM cards) are excluded — they don't exist in AI Thesis.

**Companion specs:**
- `card-spec.md` — card system (chart cards inherit card chrome, hero pattern, composition+breakdown pattern)
- `thesis-design-system.css` — tokens (every chart consumes from this single source)

---

## Cross-cutting principles

These rules govern the visual canon globally. They are not chart-type-specific.

### Severity vocabulary (CLOSED set)

| Token | Hex | Meaning |
|---|---|---|
| `--success` | `#30A46C` | Positive signal (bull, healthy, up) |
| `--warning` | `#F5A524` | Review needed, soft tripwire |
| `--danger` | `#E5484D` | Hard institutional tripwire |
| `--info` | `#8B5CF6` | Informational flag, neutral severity |

**Status tokens** (categorical, NOT severity) — for memo states, position states, agent states. Use distinct hues outside the severity ramp; never overload severity tokens for category encoding.

**Generalization:** Do NOT introduce decorative color. Every color must have functional meaning. If a chart needs more than 4 categorical hues, the chart is encoding too many dimensions — split it or aggregate first.

### Drill primitives (CLOSED set)

Two primitives only. Inherited from Basis Q17 drill policy.

- **Chevron `▶`/`▼`** — inline expand for ≤15 rows
- **Arrow `→`** — navigate-out to slide-out for >15 rows
- **Footer pattern:** `View all N items →` (count + arrow required)

**Generalization:** Drill primitives are closed at two; new charts choose one, never invent a third.

**AI Thesis applications:**
- Memo source citations (≤15 typical) → chevron
- Decision history (>15 typical) → arrow → slide-out
- Trigger event log (>15 typical) → arrow → slide-out
- Bull/bear case attribution per agent (≤15 typical) → chevron

### Card depth ladder

- Single card per chart on canvas — no nested surface stacking
- Card depth: surface (`#15171C`) sits on canvas (`#0B0C0F`)
- Hero pattern (canonical reference Basis Q13): big number 36px JBMono + slash + uppercase eyebrow + verdict caption
- Composition pattern (canonical reference Basis Q16): hero block + visual primitive + legend rows + concentration footer

See `card-spec.md` §1 and §2 for full hero and composition patterns.

### Tooltip / overlay treatment

- **NO** glassmorphism / backdrop-filter / Liquid Glass
- Elevated overlay recipe: solid `var(--surface-elevated)` `#22262E` + 1px border `var(--border-08)` + inner top-edge highlight + drop shadow `0 8px 24px rgba(0,0,0,0.4)`
- Inline cards stay on `var(--surface)` `#15171C`
- No arrow pointers on tooltips
- Position via flip-on-collision (Radix UI Tooltip or Floating UI `flip` + `shift` middleware)

### Tooltip content rules (3 layers)

Three distinct tooltip content types, applied per surface:

- **Layer A — Definition only** (default everywhere): "Memo confidence is the weighted average of agent output confidences."
- **Layer B — Definition + computed math** (KPI strips): stacked arithmetic — operand / operand / divider / total. NOT inline formula. Example: `Bull score: 78\n+ Company Research: 82\n+ News & Catalyst: 74\n÷ 2 weighted = 78`
- **Layer C — Provenance** (inside source-traceability surfaces): source + row + date + confidence. Example: `10-K · FY2025 · pg.42\nFiled 2026-03-15\nConfidence: 0.91`

### Number formatting (institutional discipline)

Inherited from `card-spec.md §3`. Key rules:

- **Money:** `$X,XXX` no decimals on summary surfaces; cents preserved on reconciliation surfaces
- **Percentages:** Tenths place default (`78.4%`)
- **Stock prices:** Two decimals (`$142.36`)
- **P/E and multiples:** One decimal (`24.3x`)
- **Yields / cap rates / dividend yields:** Two decimals (`5.42%`)
- **Negative values:** Red, in parentheses — `($1,450)` not `-$1,450`
- **All numbers:** `font-variant-numeric: tabular-nums` + JetBrains Mono + right-aligned

Tabular alignment so column edges are pixel-aligned; prevents shimmer on hover/update.

### Typography

- Geist Sans — body, labels, headings
- JetBrains Mono — all numeric data
- Hero number: JBMono 36px, weight 500
- KPI number: JBMono 24px
- Label / eyebrow: Geist Sans 10px uppercase tracking-wider muted
- Body: Geist Sans 14px regular

### v1 vs v1.1 discipline

Phase 1 of AI Thesis is the v1 equivalent. Strict rules:

- **v1 surfaces ship complete or not at all.** Placeholder copy advertising "coming soon" features is REJECTED. If a feature isn't ready for Phase 1, hide the surface entirely. Stub modules with toggles are explicitly disallowed.
- **v1.1 promotions are telemetry-gated, NOT calendar-gated.** A feature graduates to v1.1 because v1 users demonstrate need (override behavior, requested feature, manual workaround at material rate), not because a date passed.
- **Composite scores require defended rubric + audit + gaming-defense + traceability before they ship.** AI Thesis v1 explicitly avoids composite "memo quality scores" or "thesis health composites" until each pillar is in place. Use raw agent confidences and rule-based flags instead.

### Auto-annotation

When a chart surfaces an institutional read (a peak, a threshold breach, an anomaly), **auto-annotate inline** by default — bare charts hand the reader work AI Thesis is positioned to do.

Single annotation discipline: do NOT stack multiple auto-annotations on the same chart. Pick the one that matters most. User toggles for additional overlays (median line, threshold lines, comparison baseline) are valid Phase 2+.

Anomaly markers use `--warning` (NOT `--danger` — reserved for hard institutional tripwires).

### Audit-trail-by-default rule

Source-traceability surfaces ship the audit trail visible by default, not behind click-to-reveal. This is the AI Thesis differentiator vs Bloomberg / FactSet / Koyfin: every memo number traces to an agent output, which traces to source data, and that trail is **visible**, not hidden behind progressive disclosure.

- Progressive disclosure / collapse / shrink-to-fit is DISQUALIFIED for source-traceability surfaces (decision history, agent output viewer, source documents).
- For dense data tables (24+ rows), use alternating-row + sticky header — NOT hide rows or shrink type.
- JetBrains Mono floor for financial tabular data is **9.5px** (8.5px is below legibility floor).

---

## Chart-type playbook

For each chart type AI Thesis will surface, the locked treatment.

### Hero number + delta (single-scenario)

**Pattern:** §1 Headline pattern from `card-spec.md`. Single big number, optional delta vs baseline, no other elements competing for the eye.

**Use for:** Memo confidence header, ticker detail price strip, dashboard portfolio value, thesis health on ticker detail.

**Discipline:** Per-scenario surface answers ONE question. Cross-scenario reference points (vs baseline, vs alternative thesis) belong on Compare-style surfaces (Phase 2+).

### Multi-metric bars (per-agent, per-category breakdown)

**Pattern:** §2.1 Multi-metric rows from `card-spec.md`. Stacked rows of `label · 6px-tall bar · numeric value`.

**Use for:** Per-agent confidence breakdown on memo cards, thesis decomposition (Phase 2+).

**Discipline:** Bar color stays `--accent` neutral unless a hard tripwire fires (per §4 of `card-spec.md`). Score numbers shift color on severity threshold independently. Tabular-nums on every value.

### Composition + breakdown (stacked horizontal bar with concentration footer)

**Pattern:** §2.2 from `card-spec.md`. Hero block + horizontal stacked bar + legend rows + drill mechanic + concentration footer.

**Use for:**
- Bull/bear case attribution by source agent
- Sector exposure of approved positions
- Position-size composition (top tickers as % portfolio)
- Source corroboration (composition of memo claims by source type)

**Discipline:** Concentration footer (`Top 3 = X.X%`) NEVER drops. It is the analytical edge — without it, the card has no advantage over a generic stacked bar.

### OHLCV price chart (THS-6)

**Pattern:** Standard candlestick or line chart, recharts-based.

**Use for:** Ticker detail page price chart.

**Discipline:**
- Line color: `--accent` for the price series (neutral, not directional)
- Volume bars: `--text-3` muted, secondary axis
- Gridlines: `var(--border-06)` horizontal only, no vertical gridlines
- Hover crosshair: `var(--text-2)` 1px dashed
- Tooltip: elevated overlay recipe, JBMono price/volume, Geist Sans date
- 15-min delayed label visible at chart top-right (small, `--text-3`, `12px Geist Sans`)
- Default timeframe: 3M (industry-standard fundamental review window)
- Available timeframes: 1D, 5D, 1M, 3M, 6M, 1Y, All (from blueprint wireframe)

### Sparkline (KPI-card embedded)

**Pattern:** In-card sparkline, 1-row tall, no axes, no gridlines.

**Use for:** Watchlist row 7-day price trend, dashboard ticker sparklines, KPI card trend.

**Discipline:**
- Color: `--accent` for the line
- Peak point: full opacity; off-peak points: 0.6 opacity
- No tooltip on watchlist (too dense); tooltip on dashboard
- Caption beneath: 2 lines max — `By [dimension]\npeak [highlight]`. NO comma-list of values.

### Line chart with dashed forward-policy overlay

**Pattern:** Solid historical line + dashed forward-projection. Crossover (where dashed crosses solid or zero baseline) is the institutional read.

**Use for:** Phase 2+ — projected agent confidence over time, projected position P&L, trigger-fire frequency forecast.

**Discipline:** Two lines max. Solid = actual / historical. Dashed = projection / forward policy. Auto-annotate the crossover point if visible in the rendered range.

### Sequential decomposition (stepped/terraced waterfall)

**Pattern:** Bloomberg / FactSet style. Floating intermediate bars, inline value labels, sequential left-to-right decomposition.

**Use for:** Memo synthesis showing how bull case score builds from agent contributions, scenario decomposition (Phase 2+ Compare tab).

**Discipline:**
- Start bar → contribution bars → end bar
- Positive contributions in `--success`, negative in `--danger`, intermediate baseline in `--text-3`
- Inline value labels on each bar
- Axis labels stay short to fit narrow columns; never wrap

**Sequential decomposition shape rule:** Start → contributions → end ⇒ stepped waterfall. Row-form / vertical-list shapes only when sequential flow doesn't apply.

### Tornado chart (sensitivity)

**Pattern:** Centered on $0 (or zero-baseline), directional `--danger`/`--success` fill, sorted descending by `|magnitude|`, value labels right.

**Use for:** Phase 2+ — sensitivity analysis on memo assumptions, what-if analysis on thesis inputs.

**Discipline:**
- Sort by absolute magnitude, descending. Largest impact at top.
- Centered on $0 (positive right, negative left)
- HTML 3-column grid (`label-col 100px / bars-svg 1fr / value-col 36px`); per-row SVG with `viewBox="0 0 200 14" preserveAspectRatio="none"`
- "What matters most among N assumptions" questions render as tornado, NOT grid, NOT sliders

**Sliders disqualifier (Insights vs editing surface split):** Sliders = editable assumption = Studio-style surface. Putting them on read-only Insights creates "is-this-active-state-or-exploring?" ambiguity. AI Thesis Phase 1 has no editing surface, so sliders don't appear at all in Phase 1.

### Dense audit-trail tables

**Pattern:** Always-shown, JBMono numerics, 9.5px floor, alternating row backgrounds, sticky header.

**Use for:** Decision history, agent output viewer, source documents listing, memo numeric appendix.

**Discipline:**
- Audit-trail-by-default rule applies (visible without click)
- 9.5px JBMono floor (don't shrink below)
- For 24+ row tables: alternating row + sticky header (NOT hide rows or shrink type)
- Tabular-nums on every numeric column
- Right-align numeric columns; left-align text; never center numerics

### Compare delta column

**Pattern:** `$` headline + `%` stacked below at smaller muted weight. Single column per scenario delta.

**Use for:** Phase 2+ Compare tab. Showing the active thesis vs baseline / alternative.

**Discipline:**
- Single column per delta (NOT two-column-per-delta — doesn't scale to multi-scenario)
- `$` is the lender headline (primary read); `%` is the magnitude check (secondary)
- Hierarchy as information: equal weight forces reader to do prioritization work; stacked encoding makes read order automatic
- For ratio-row KPIs (DSCR, P/E, yields): suppress `%` cell — "% change in a ratio" doesn't carry institutional signal (lenders/investors care about absolute thresholds)

### Disqualified chart types

- **Radar charts** for single-deal scoring — institutional users want numeric precision; radar hides it. Use horizontal bars instead.
- **Donut charts** for ordinal sequences (aging, time series) — composition preservation breaks; use stacked horizontal bar.
- **Vertical bars** for compositional breakdowns — eyes scan left-to-right for sequence; vertical bars force scanning down.
- **3D charts** of any kind — never. Decoration without information.
- **Pie charts with >5 slices** — preattentive read fails. Use horizontal stacked bar with concentration footer instead.

---

## Visx primitives (reusable React components)

The Basis export includes 5 visx-based React components in `primitives/`. These ARE actual reusable components (unlike the Q1-Q39 mockups). Re-anchor their CSS variable references to AI Thesis tokens (search-replace `--bn-*` → `--*`) and they drop in.

| Primitive | Use case in AI Thesis |
|---|---|
| `horizontal-bar.tsx` | Per-agent confidence bars, severity-graded ticker lists |
| `trend-line.tsx` | Sparklines, multi-day price trends, agent confidence over time |
| `scatter-plot.tsx` | Phase 2+ — agent confidence vs decision outcome scatter, sentiment vs price scatter |
| `waterfall-chart.tsx` | Memo synthesis decomposition, scenario waterfalls |
| `timeline-bar.tsx` | Decision history timeline, trigger event timeline, memo state-machine timeline |

Recharts is fine for OHLCV (THS-6) and standard time-series. Visx primitives are for the analytical chart shapes the card spec calls for. Pick per-chart based on which library has cleaner support for the specific shape.

**Package versions** (from Basis `package-pins.txt`, port versions matched):

```
visx — multiple packages, latest stable as of 2026-05-01
recharts 3.8.1 (already in AI Thesis stack)
motion — installed for chart entrance animations
lucide-react — for chart annotation icons
```

Confirm version pins against AI Thesis `package.json` before installing. Do not introduce nivo or d3 unless a chart shape requires it (box plots specifically need d3-shape or nivo).

---

## Per-chart checklist

Before any chart ships:

**Foundation:**
- [ ] Card chrome matches `card-spec.md` recipe
- [ ] Rule 0 honored (no wasted space)
- [ ] Card title is 13px Geist Sans 600 + subtitle 11px Geist Sans 400

**Encoding:**
- [ ] Color tokens are semantic (success/warning/danger/info/accent), no decorative color
- [ ] Severity 2-channel rule observed (bar color independent from value color)
- [ ] No more than 4 categorical hues
- [ ] Numeric values in JetBrains Mono, tabular-nums, right-aligned

**Auto-annotation:**
- [ ] Single annotation if institutional read present (peak, breach, anomaly)
- [ ] Anomaly markers use `--warning`, not `--danger`

**Tooltips:**
- [ ] Elevated overlay recipe (no backdrop-blur)
- [ ] Tooltip layer chosen (A definition / B math / C provenance)
- [ ] Flip-on-collision positioning

**Numbers:**
- [ ] Tenths-place percentages by default
- [ ] No-decimal money on summary, cents on reconciliation
- [ ] 2-decimal stock prices, 1-decimal multiples, 2-decimal yields
- [ ] Negatives in parentheses + red

**Drill:**
- [ ] Chevron at ≤15 rows, arrow → slide-out at >15 rows
- [ ] `View all N items →` footer pattern when truncated

**15-min delay label:**
- [ ] Visible on every surface rendering Polygon/Massive price data

---

## How to update this spec

Same process as `card-spec.md`. Add new chart types as new playbook sections with a canonical reference (a specific mockup or live surface). No free-form charts.

When this spec and Basis `charts-spec.md` diverge: document the divergence explicitly. Cross-product principles (severity, drill primitives, number formatting, auto-annotation) stay in lockstep.

---

# Version

- **v1.0** — 2026-05-01 — Initial port from Basis `charts-spec.md` cross-cutting principles. Rent-roll-specific Q-decisions (Brixton matrix, aging buckets, lease rollover, MTM cards, monthly grid, compare delta column for ProForma) excluded as not applicable. AI Thesis-applicable patterns ported: hero, multi-metric, composition+breakdown, sparkline, line+dashed overlay, stepped waterfall, tornado, dense audit-trail tables. Tokens re-anchored to Basis canon via `thesis-design-system.css` v2.0.

---

# Cross-references

- `docs/design/thesis-design-system.css` v2.0 — token sheet
- `docs/design/card-spec.md` — card system spec (chart cards inherit from)
- `docs/design/DESIGN_SPEC.md` — page-level AI Thesis design (this chart spec extends)
- Basis `charts-spec.md` — origin canon
- Basis `card-gold-standard.md` v1.2 — origin card spec, mirrored to `card-spec.md`
- Blueprint §6 (Ticker Detail), §7 (Memo Page), §13 (Workflow Monitor — Phase 2)
