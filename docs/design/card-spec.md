# Card Spec — AI Thesis Card-System Spec

**Status:** LOCKED — authoritative reference for every data-dense card in AI Thesis.
**Version:** v1.0 (2026-05-01) — ported from Basis `card-gold-standard.md` v1.2 with AI Thesis domain anchoring. Token-aligned to Basis canon (`thesis-design-system.css` v2.0).
**Locked by:** Terry, 2026-05-01.

**Origin:** This spec is a direct port of the Basis card system spec. Basis and AI Thesis are both Terry's products benchmarking against Linear / Mercury / Stripe; the card discipline is identical. Tokens are now identical. Patterns are identical. Only the domain examples differ.

**Canonical references (visual ground truth):**
- §1 Headline + §2.1 Multi-metric: Basis Q13 Option B Deal Scorecard pattern, applied here to memo confidence cards, ticker score cards, portfolio health cards.
- §2.2 Composition + breakdown: Basis Q16 Option B Revenue Leakage pattern, applied here to bull/bear case attribution, sector exposure breakdown, position-size composition.

---

## THE RULE BEHIND THE RULES

Terry, verbatim, on Basis:

> *"Your data and analysis is only valued and respected as much as the quality of the aesthetics are on the outputs and the UI. Why spend all that time doing a great analysis if the output looks like shit? Because then your data is assumed to be of the same quality. Our data is perfect, therefore it better be displayed that way as well."*

This applies to AI Thesis with even higher stakes. Every memo Claude generates is a research output that the human must trust enough to make a real-money decision against. **Bad aesthetics destroy the credibility of good research.** AI Thesis runs Anthropic + Perplexity agents, cites SEC filings, traces every number to a source — but none of that matters if the memo card presenting the conviction score looks unpolished. The human will assume the analysis is also unpolished.

This is why Rule 0 (zero wasted space) matters. Why divider weight is `--border-06`, not `--border-08`. Why numeric values use JetBrains Mono with tabular-nums. Why no bars are taller than 6px. Why no decorative color. **Every detail in this spec is carrying the credibility of the research behind it.** There is no such thing as a "good enough" aesthetic detail in AI Thesis.

If you're about to ship a card that's "fine," stop. "Fine" is the opposite of the standard.

---

## How this spec works (system methodology)

This is a **card system**: a small set of locked patterns that compose to produce every data-dense card in AI Thesis. Each pattern has a canonical reference — the specific Basis scaffold-mockup card from which the pattern was extracted and locked.

When building any new card:

1. Identify which patterns it needs (headline? multi-metric rows? composition+breakdown? action list?).
2. Match each pattern against its canonical reference. If it doesn't match, the card is wrong, not the spec.
3. If a card needs a pattern this spec doesn't yet cover, **stop and propose a new section** with a canonical reference. Don't free-form a new pattern. The system grows by adding locked patterns, not by improvising.

Result: every card in AI Thesis reads as part of one consistent design system. New cards are extensions, not inventions.

---

## Rule 0 — Zero wasted space (above all rules)

**Card height = content height.** Never force a card to a fixed height. Never leave trailing empty space below the last row, chart, or element.

### How this manifests

- **No `min-height` on cards.** If a card feels short, it's because it has little content — that's fine, let it be short.
- **No grid row-height equalization.** Use `align-items: start` (not `stretch`). Cards in the same row are allowed to have different heights if their content differs.
- **No padding-bottom as a layout tool.** Bottom padding is for breathing room after content, not for "making the card taller."
- **Chart/table cards scale to content.** A chart card's height = chart natural height + title + legend + padding. Never `height: 400px` with the chart floating in the top 200px.

### Audit rule

Any card with >40px of padding-only space after the last content element gets flagged for rework. Either it needs more content, or the card should be naturally shorter, or the grid is forcing equal heights — fix the grid, not the card.

---

# §1 — Headline pattern

**Use when:** A card surfaces an overall metric (a single hero KPI) at its top. The hero block sits between subtitle and body content.

**Canonical reference:** Basis Q13 Option B Deal Scorecard hero (`69 / 100 — Overall Deal Score — Moderate Conviction · watch rollover exposure`).

**AI Thesis applications:**
- Memo page confidence header: `78 / 100 — MEMO CONFIDENCE — Solid Conviction · open question on Q4 guidance`
- Approval page: same memo confidence header
- Dashboard portfolio health card
- Ticker detail thesis status (Phase 2+)

## Layout

```
┌─ overall-header ─────────────────────────────────────┐
│                                                      │
│  [BIG NUMBER] [SLASH/SUFFIX]  CATEGORY LABEL         │
│                               Verdict line           │
│                                                      │
└──────────────────────────────────────────────────────┘
     padding: 12px 4px 14px
     border-bottom: 1px solid var(--border-06)
     margin-bottom: 10px
     display: flex; align-items: center; gap: 12px
```

`gap: 12px` between the score block and the meta column.

## Element specs

| Element | Font | Size | Color | Weight | Notes |
|---|---|---|---|---|---|
| Big number | **JetBrains Mono** | `36px` | `var(--text-1)` (`#ECEDEF`) | 500 | `line-height: 1`, `letter-spacing: -0.02em` |
| Slash/suffix | **JetBrains Mono** | `14px` | `var(--text-3)` (`#7A818D`) | 400 | 2px left margin. Examples: `/ 100`, `%`, `x` |
| Category label | Geist Sans | `10px` | `var(--text-3)` | 500 | `letter-spacing: 0.04em`, `text-transform: uppercase`, `margin-bottom: 3px` |
| Verdict (primary) | Geist Sans | `11px` | `var(--text-1)` | 500 | **Max 1 line — see §5.** |
| Verdict note | Geist Sans | `11px` | `var(--text-3)` | 400 | `margin-left: 4px`. Same line as primary. |

## Hard constraint

The hero verdict block is **2 lines maximum** — exactly 1 label line + 1 verdict line. Never 3. See §5 for the full rule and how to fix wrap when it occurs (always layout, never copy).

---

# §2 — Sub-content patterns

The body of the card, below the headline. Two patterns are locked. Future cards either match one of these or propose a new sub-pattern via spec amendment.

## §2.1 — Multi-metric rows

**Canonical reference:** Basis Q13 Option B Deal Scorecard body.

**Use when:** A card surfaces multiple comparable scores or metrics, all measured against the same scale (e.g., 0–100 or 0–1). The pattern: label · indicator · value, repeated as rows.

**AI Thesis applications:**
- Memo card showing per-agent confidence scores (Company Research, Bear Case, Risk Review — each scored 0-1 displayed 0-100)
- Thesis decomposition (bull arguments, bear arguments, open questions counts; Phase 2+)
- Ticker detail agent output summary

### Row structure

```
┌──────────────────────┬──────────────────────────┬──────┐
│  Company Research    │  ████████████░░░░░░░░░░  │  72  │
├──────────────────────┴──────────────────────────┴──────┤
│  Bear Case           │  ██████░░░░░░░░░░░░░░░░  │  42  │
├────────────────────────────────────────────────────────┤
│  Risk Review         │  █████████████████░░░░░  │  91  │
```

### Row specs

```
grid-template-columns:  [label 130px] [bar 1fr] [value 50px]
gap:                    12px
padding:                8px 0
border-bottom:          1px solid var(--border-06)   /* THE faint divider */
```

Last row in the group has no bottom border.

### Element specs

| Element | Font | Size | Color | Alignment |
|---|---|---|---|---|
| Category label | Geist Sans | `11px` | `var(--text-2)` | left |
| Numeric value | **JetBrains Mono** | `12px` | `var(--text-1)` | right, tabular-nums |

### Bar visualization (locked sub-spec)

The whisper-thin track is critical. Taller bars feel like a chart; thinner bars feel like an indicator.

**Track:**
```
height:         6px              /* NOT 8, NOT 4 — 6px is the locked value */
background:     rgba(255,255,255,0.04)    /* barely visible, shows the scale */
border-radius:  3px
overflow:       hidden
```

**Fill:**
```
height:         100%
background:     var(--accent)      /* #4D5BFF — default neutral */
                var(--warning)     /* amber when threshold breached — see §4 */
                var(--danger)      /* red when critically breached */
border-radius:  3px
```

## §2.2 — Composition + breakdown

**Canonical reference:** Basis Q16 Option B Revenue Leakage.

**Use when:** A card surfaces the composition of a single total — what fraction comes from each contributing category, with optional drill into the underlying contributors.

**AI Thesis applications:**
- **Bull/Bear case attribution** — composition of bull arguments by source agent (Company Research, News & Catalyst, Earnings Transcript). Each segment scaled to argument count or weighted strength. Concentration footer answers: *"is the bull case concentrated in one agent's analysis (single-source risk) or distributed (multi-source corroboration)?"*
- **Sector exposure** — composition of approved positions by sector. Concentration footer: *"is the portfolio concentrated in one sector or distributed?"*
- **Position-size composition** — composition of approved positions by ticker. Concentration footer: *"are top 3 positions dominating the book?"*
- **Source corroboration** — composition of memo claims by source type (10-K, 10-Q, earnings call, news). Concentration footer surfaces single-source-of-truth risk.

### Anatomy

1. **Headline** (§1) — the dominant metric (e.g., 78% bull conviction)
2. **Horizontal stacked bar** — segments scaled to actual % of the total
3. **Legend rows** — one per segment, anchoring counts/weights + % of total
4. **Drill mechanic** (one of two, choose per card):
   - **Expandable rows (B-pattern)**: Compact default; chevron on each row reveals top contributors inline. Each expansion ends with a concentration footer.
   - **Always-visible sidecar (C-pattern)**: 150px panel beside the legend with top 3 contributors per category + concentration footer. More information density per pixel; less compact.

Default to B-pattern unless always-visible attribution is specifically required.

### Horizontal stacked bar

```css
.comp-bar {
  display: flex;
  height: 22px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--surface-2);
  margin-bottom: 14px;
}
.comp-bar > div {
  height: 100%;
  min-width: 2px;
}
```

**Segment colors:** Use semantic tokens with transparency variants when multiple sub-categories share a hue family. For bull/bear attribution: green family for bull (`rgba(48,164,108, 0.92 / 0.65 / 0.42)` for primary/secondary/tertiary sources), red family for bear. For sector composition: use one hue per sector but stay within the semantic palette — never decorative rainbow.

**Inline label inside dominant segment:** When one segment dominates (over the 5% width threshold), embed a small label inside that segment as a visual anchor: JetBrains Mono 11px, `rgba(255,255,255,0.55)`, tabular-nums. Quiet — the legend does the formal work. Below the 5% width threshold, segments don't carry inline labels (they'd be cramped); use hover tooltip in production.

### Legend rows

3-column grid (label · meta · amount). Meta carries item count + % of total in muted mono.

```css
.lg-row {
  display: grid;
  grid-template-columns: 1fr 90px;
  gap: 12px;
  align-items: baseline;
  padding: 7px 0;
  border-bottom: 1px solid var(--border-06);
}
.lg-row .lg-label {
  font-family: var(--sans);
  font-size: 12px;
  color: var(--text-1);
  font-weight: 400;
}
.lg-row .lg-meta {
  color: var(--text-3);
  font-size: 11px;
  margin-left: 4px;
  font-family: var(--mono);
  font-variant-numeric: tabular-nums;
}
.lg-row .lg-amount {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-1);
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.lg-row .lg-amount.negative {
  color: var(--danger);
}
```

**Color dot prefix:** 8px square dot before the category name, color-matching the bar segment. Anchors the row visually to its bar slice.

### Drill: expandable rows (B-pattern, default)

When a row is clicked, an attribution block appears inline below it. The block contains 3 contributor rows + a concentration footer.

```css
.attrib-block {
  padding: 4px 0 8px;
  background: rgba(255, 255, 255, 0.015);
  border-bottom: 1px solid var(--border-06);
}
.attrib-row {
  display: grid;
  grid-template-columns: 1fr 90px;
  gap: 12px;
  padding: 3px 0;
}
.attrib-row .lg-label {
  padding-left: 32px;
  font-size: 10px;
  color: var(--text-2);
  font-family: var(--mono);
}
.attrib-row .lg-amount {
  font-family: var(--mono);
  font-size: 10px;
  text-align: right;
  color: var(--text-1);
  font-variant-numeric: tabular-nums;
}
.attrib-footer {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-2);
  font-weight: 500;
  border-top: 1px solid var(--border-08);
  padding: 5px 0 0;
  margin: 5px 0 0;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
```

**Source tags:** Where institutional rules attach a temporal or source-type severity to a contributor, the row carries it inline. For news catalyst attribution: `Bloomberg · 4h ago` / `Reuters · 1d ago` / `Press release · 3d ago`. For SEC filing attribution: `10-K · FY2025` / `10-Q · Q3'25` / `8-K · 2026-04-15`.

### Concentration footer (the punchline)

Whether delivered via expansion (B-pattern) or sidecar (C-pattern), every category gets a concentration footer:

```
Top 3 = X.X%
```

Format: `Top 3 = 39.4%` etc. — `var(--text-2)`, JetBrains Mono 10px, weight 500, 1px top border (`--border-08`), right-aligned, tabular-nums.

**The concentration footer is the analytical differentiator.** It surfaces whether composition is concentrated (model-able / focused signal) or distributed (structural / diffuse). For a bull case: concentrated in one agent's analysis means single-source risk; distributed across agents means multi-source corroboration. For sector exposure: concentrated means thesis conviction; distributed means index-like. **Never drop the concentration footer.** Without it, a §2.2 card has eliminated its analytical edge.

---

# §3 — Number formatting

Universal number-display rules. These apply to every numeric on every card, every page, everywhere.

## Percentages (tenths place default)

**All user-facing percentages render to tenths place — exactly 1 decimal — regardless of whether the input is integer or fractional.**

| Input | Display |
|---|---|
| `0.5778` | `57.8%` |
| `0.8964` | `89.6%` |
| `0.10` | `10.0%` (NOT `10%`) |
| `0.394` | `39.4%` |
| `0.60` | `60.0%` (NOT `60%`) |

**Why tenths place:** Whole-number percentages imply no precision; two-decimal percentages imply more precision than is institutionally claimed. Tenths is the institutional sweet spot — meaningful precision without false accuracy.

**Exception:** Layout values (CSS `flex` ratios, arithmetic intermediates) keep full precision. The rule applies to **displayed** numbers, not internal computation.

**Exception:** When a regulatory or contractual context demands different precision (e.g., DSCR to 3 decimals, expense ratios to basis points), follow that context. Tenths is the default; the contract wins where one exists.

## Money — summary vs reconciliation

The principle: **summary surfaces round; reconciliation surfaces don't.**

| Surface type | Display |
|---|---|
| Summary cards (KPIs, hero numbers, dashboards) | `$189,905` (no decimals) |
| Per-share / per-unit summary metrics | `$610` (nearest $1, no decimals) |
| **Reconciliation surfaces** (audit log, source documents, decision history with P&L tracking) | `$1,450.27` (cents preserved — these views must tie to source) |
| Negative dollars (any context) | `($1,450)` (parentheses, red, no leading minus) |
| Positive deltas | `+$2,340` (leading plus, green) |

The audit log and decision history are the authoritative reconciliation surfaces in AI Thesis — every dollar value displayed there must match the source exactly, including cents. A reviewer auditing decisions will tie back to actual transactions; if AI Thesis rounded `$1,450.27` to `$1,450`, the tie fails and credibility evaporates.

Summary surfaces (Dashboard, Memo confidence header, Watchlist) round to whole dollars because the reader is looking for the analytical signal, not the bookkeeping precision.

**Decision rule:** If you're unsure which a surface is — *"does the reader expect to reconcile this number against an external source?"* If yes, preserve cents. If no, round.

## Stock prices, multiples, ratios

- **Stock prices:** Two decimals (`$142.36`). 15-min delayed label per blueprint §8 mandatory.
- **P/E, P/B, P/S, EV/EBITDA, EV/Rev:** One decimal (`24.3x`).
- **DSCR / coverage ratios:** Two decimals (`1.25x`).
- **Yields / cap rates / dividend yields:** Two decimals (`5.42%`).
- **Confidence scores (0-1 internal):** Display as 0-100, no decimals on cards (`78`); display as `0.78` only inside agent output viewer where source format matters.

## Numeric typography

All numerics — money, percentages, dates, counts, prices, multiples, scores — render in **JetBrains Mono**, right-aligned, with `font-variant-numeric: tabular-nums`. Never render a numeric value in Geist Sans. Never left-align a numeric column. Tabular-nums prevents column shimmer on hover/update.

---

# §4 — Severity signaling (the 2-channel rule)

When a card carries multiple scored categories, signal severity through **two independent visual channels**:

## Channel 1: Bar color (composition)

Bar stays neutral accent (`var(--accent)` `#4D5BFF`) **unless** the category has a hard institutional tripwire and the value breaches it. Tripwire breach = bar amber or red.

For AI Thesis, hard tripwires include:
- Agent confidence < 0.5 (per blueprint §8 — memo surfaces low-confidence signals prominently)
- Position size > N% portfolio concentration (Phase 2+ when portfolio tracking lands)
- Bear case score above bull case score on a long thesis (memo flag)

**Soft "this score is low" signals do NOT color the bar.** That dilutes the bar-amber signal earned by real institutional tripwires. The bar amber must mean something specific.

## Channel 2: Score number color (severity)

Independently of the bar, the score number carries severity coloring:

| Score range | Number color | CSS |
|---|---|---|
| `≥ 70` | white | `var(--text-1)` `#ECEDEF` |
| `< 70` | muted | `var(--text-3)` `#7A818D` |
| `< 50` | amber-300 | `var(--score-amber)` `#FCD34D` (distinct from `--warning #F5A524` to avoid same-row color sync) |

## Per-category threshold mapping (provisional)

| Category | Watch (number → muted) | Breach (number → amber-300) | Bar tripwire |
|---|---|---|---|
| Memo overall confidence | `<70` | `<50` | Bar amber when any agent confidence `<0.5` |
| Per-agent confidence (Company Research, Bear Case, Risk Review) | `<70` | `<50` | None today |
| Position size (Phase 2+) | n/a | n/a | Bar amber on `>N%` portfolio concentration (rule pending) |
| Source corroboration | `<60` | `<40` | Bar amber when single-source-of-truth detected |

**Provisional notice:** These threshold values will refine as Phase 1 agents are validated against Terry's manual research on the 5-ticker test universe (NVDA, MSFT, NET, INTC, PYPL — blueprint §K). Once empirical baselines exist, thresholds re-derive.

## Anti-patterns (do not violate)

- ❌ **Color-grade by score value** (>80 green, 50–79 blue, <50 amber). Turns the scorecard into a traffic light. Destroys the meaning of "amber = real institutional tripwire."
- ❌ **Decorative color** anywhere. Every color in AI Thesis must mean something.
- ❌ **Same color on bar AND number in the same row** when they're meant to signal different things. Use distinct ambers (`--warning` for bar tripwire vs `--score-amber` for score severity) when both fire on the same row.

---

# §5 — Verdict lines (hero verdict block)

The verdict line below the category label in the §1 headline pattern.

## Hard constraint: 2 lines maximum

The hero verdict block (label + verdict together) renders in **exactly 2 lines maximum** — never 3.

- Line 1: label (e.g., `MEMO CONFIDENCE`, `THESIS HEALTH`, `BULL CASE STRENGTH`)
- Line 2: verdict (e.g., `Solid Conviction · open question on Q4 guidance`, `78% bull · concentration risk in single-source attribution`)

When verdict copy threatens to wrap, the fix is **always** to allocate enough horizontal space. That's the primary fix. The `nowrap + ellipsis` rule is the **layout backstop**, not the primary fix.

### Primary fix (do this first)

- Reduce gap between hero number and meta column (`12px` is the locked default; can go to `10px` for tighter cards)
- Reduce verdict font-size (`11px` is the locked default; can drop to `10.5px` in extreme cases)
- Reduce horizontal padding on the `overall-header`
- Widen the meta column allocation if hero block has slack

### Backstop (always present, never the only fix)

```css
.verdict {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

The verdict will physically refuse to wrap; ellipsizes if it ever overruns at runtime. Means the card never breaks visually, but **if ellipsis ever fires, that's a layout problem** to solve with the primary fix above. Don't ship cards where the backstop is doing real work.

### Never

- Shorten the verdict copy. The verdict carries the institutional signal — what the hero number means. Truncating that signal to make it fit is the wrong fix. Fix the layout.

## Conviction ladder (verdict primary text, when card has an overall score)

When the card has an overall 0–100 score (memo confidence, thesis health, bull case strength), verdict primary text maps from the score using the 5-tier ladder:

| Score range | Verdict primary |
|---|---|
| 85–100 | **High Conviction** |
| 70–84 | **Solid Conviction** |
| 55–69 | **Moderate Conviction** |
| 40–54 | **Cautious** |
| `<40` | **Pass** |

This is institutional voice — equity acquisitions teams and family-office IC memos use "high conviction" / "moderate conviction" naturally. Letter grades (A/B/C) are S&P/Moody's credit-rating language; **do not use them**. Wrong audience.

## Verdict suffix (the "note" element)

A short, specific watchword tied to the lowest-scoring category, highest-priority risk, or open question. Never marketing copy.

- ✅ `Moderate Conviction · open question on Q4 guidance` (specific signal)
- ✅ `High Conviction · concentration risk in single-source attribution` (specific signal even at high tier)
- ✅ `Solid Conviction · bear case score 42 — review insider activity` (specific, traceable)
- 🚫 `Moderate Conviction · solid analysis with some concerns` (vague, no signal)
- 🚫 `High Conviction · this is a great opportunity` (marketing copy)

The watchword's job: tell the reader what to look at next. If the reader can ignore the watchword without losing analytical value, the watchword is wrong.

---

# §6 — Action lists

**Canonical reference:** Basis Q14 Option A Recommended Actions.

**Use when:** A stack of priority-tiered rows where the user wants to know "what should I do first?"

**AI Thesis applications:**
- **Triggered Opportunities** (Phase 2+) — fired triggers with severity + rule citation, sorted within tier
- **Approval page risks/open questions** — Risk Review agent's surfaced concerns, prioritized
- **Memo open questions section** — when Q15 Bull/Bear/Open Questions structure renders open questions as actionable items

## Priority tiers

Three tiers: **High / Med / Low**. Each tier is signaled by a single colored dot at the row's leading edge — never a pill, badge, or row-background fill in default state.

| Tier | Dot color | Token | Meaning |
|---|---|---|---|
| **High** | Red | `var(--danger)` (`#E5484D`) | Hard rule violation, institutional tripwire fired |
| **Med** | Amber | `var(--warning)` (`#F5A524`) | Material concern, soft trigger |
| **Low** | Green | `var(--success)` (`#30A46C`) | Compliance hygiene, optimization, nice-to-have |

Dot dimensions: `8px × 8px` square with `50%` border-radius. Vertical alignment: middle of the row's first text line.

## Tier invariant

**Tier is set by the rule definition, not by score impact.** A rule fires at the tier the rule says it fires at. A high-confidence Med rule stays Med; a low-confidence High rule stays High. **Score / confidence / dollar impact never promotes or demotes tier.**

This is the explainability premise. The whole point of choosing hardcoded rules over a weighted score is that priority is declared, not computed. Any future amendment that introduces "if impact > X, auto-promote" is rejected by this spec.

## Within-tier ordering

Within a single tier, action rows render in two bands:

1. **Quantified band** — rows where the rule reports a numeric impact (dollar amount, % portfolio, score delta)
   - Sort by **absolute magnitude**, descending
   - Tiebreaker: rule ID ascending (`R-003` before `R-047`)
2. **Non-quantified band** — rows with no numeric impact (compliance, data quality, open questions)
   - Sort by rule ID ascending

The quantified band renders **above** the non-quantified band within the same tier. They are peers within tier — the band split is a visual rendering rule, not a priority rule.

The tiebreaker on rule ID is **deterministic** — identical inputs render in identical order across sessions. Without it, the list jitters between page loads.

## Rule citation (priority-explain tooltip)

Hover any priority dot → tooltip shows **why this rule fired**, using the R-NNN form (port the Basis rule-naming convention to AI Thesis: `docs/blueprint/rule-naming-convention.md` equivalent to be created when triggers ship in THS-8/9):

```
┌────────────────────────────────────┐
│ Concentration Risk · R-003         │  ← title: rule name + R-NNN
│ Bear case score > bull case on a   │  ← body: rule definition
│ long thesis = High.                │
│ NVDA: bear 64, bull 58.            │  ← body: this firing's specifics
└────────────────────────────────────┘
```

The tooltip is the audit anchor. A reviewer reading "R-003" in a memo can hover the dot in the live thesis and see exactly what fired. Source traceability — match Bloomberg/FactSet, exceed it.

Tooltip surface uses the elevated overlay recipe (see Elevation & Overlays below).

## Anti-patterns (do not violate)

- ❌ **Auto-promote tier by impact magnitude.** Tier is rule-set; that's the explainability premise.
- ❌ **Render the internal slug** (`R-003_CONCENTRATION_RISK`) in user-facing copy. Tooltip and citations always use `Rule Name · R-NNN`.
- ❌ **Sort by signed impact.** Magnitude determines visual ordering; sign renders on the card.
- ❌ **Mix quantified and non-quantified rows in a single sort key.** The two-band rule keeps the mental model clean.
- ❌ **Pills, badges, or row-background fills by tier in default state.** Dot only. Background fill on High rows is permitted only in hover or expanded state.

---

# Supporting rules

## Card chrome

```
background:     var(--card-bg)        /* var(--surface) #15171C */
border:         var(--card-border)    /* 1px solid #212224 */
border-radius:  var(--card-radius)    /* 6px */
box-shadow:     var(--card-shadow)    /* inset 0 1px 0 rgba(255,255,255,0.06) — top-edge glow */
padding:        var(--card-padding)   /* 16px */
```

## Card title + subtitle

| Element | Font | Size | Color | Weight | Spacing |
|---|---|---|---|---|---|
| Card title | Geist Sans | `13px` | `var(--text-1)` | 600 | `margin-bottom: 4px` |
| Card subtitle | Geist Sans | `11px` | `var(--text-3)` | 400 | `margin-bottom: 14px` |

Subtitle carries context, never marketing copy. Example: `NVDA · 312 shares` — not `Here's your memo at a glance`.

## Faint dividing lines

Three-tier border system (tokens in `thesis-design-system.css`):

- Subtle (intra-card row dividers): `var(--border-06)` — `rgba(255,255,255,0.06)`
- Default (section dividers, sidecar internal): `var(--border-08)` — `rgba(255,255,255,0.08)`
- Strong (separation of major regions): `var(--border-12)` — `rgba(255,255,255,0.12)`

Anywhere rows of data stack inside a card, use the **subtle** tier. Not 0.08. Not 0.12. The subtler weight makes the divider feel intentional without loud.

## Elevation & overlays

Floating ephemeral surfaces — tooltips, dropdowns, popovers, modals, slide-outs — share one elevated tier built on `var(--surface-elevated)`. **No separate overlay token.** Liquid Glass / glassmorphism / backdrop-blur is explicitly rejected.

### Elevated overlay recipe

```css
background:        var(--surface-elevated)         /* #22262E — solid, no transparency */
border:            1px solid var(--border-08)
box-shadow:        var(--overlay-shadow)
                   /* inset 0 1px 0 rgba(255,255,255,0.04),
                      0 8px 24px rgba(0,0,0,0.4) */
border-radius:     6px
backdrop-filter:   none                            /* DO NOT use backdrop-blur */
```

### Where this applies

| Surface | Use overlay recipe? |
|---|---|
| Tooltips (hover-triggered, transient) | Yes |
| Dropdowns (menus, selects) | Yes |
| Popovers (anchored, click-triggered) | Yes |
| Modals (centered, blocking) | Yes |
| Slide-outs (drawer, side panel) | Yes |
| Inline cards on the canvas | **No — use card chrome above** |

Inline cards on the canvas belong to the surface tier (`--surface #15171C`), not the elevated tier. The depth ladder is: canvas → surface → surface-2 → surface-hover → cards → **elevated (overlays)**.

### Why no backdrop-blur

1. **Cost:** `backdrop-filter: blur(...)` triggers GPU compositing on every element behind it. Repaints on every scroll frame. Reviewers scroll through long memos.
2. **Audience mismatch:** Refraction effects add delight to consumer iOS. Institutional reviewers want the tooltip readable in 200ms, no decoration.
3. **Trend risk:** Liquid Glass shipped 2025, copycat phase 2026. By 2027 it dates.
4. **Benchmark restraint:** Linear, Vercel, Mercury, Stripe, Ramp, Cursor — all use solid elevated tokens + 1px border + subtle shadow as of late 2025.

Re-evaluate Liquid Glass in 2027+, after the trend has either settled into web standards or faded.

---

# Operational checklist

When building a new card anywhere in AI Thesis (Dashboard, Memo, Approval, Ticker Detail, etc.), check it against this system spec:

**Foundation:**
- [ ] **Rule 0** — card has zero wasted space at the bottom (no `min-height`, no padded-bottom-as-layout)
- [ ] Card chrome matches the locked card chrome recipe
- [ ] Inner padding is `16px`
- [ ] Title is `13px Geist Sans 600 var(--text-1)`
- [ ] Subtitle is `11px Geist Sans 400 var(--text-3)` with `· units` style context line

**§1 Headline (if card has an overall metric):**
- [ ] 36px JetBrains Mono big number with locked letter-spacing/line-height
- [ ] 14px JetBrains Mono slash/suffix
- [ ] 10px Geist Sans uppercase tracked label
- [ ] 11px Geist Sans verdict primary
- [ ] Verdict line is exactly 1 line — no wrap, no 3-line block
- [ ] Hero block uses `gap: 12px` between score and meta

**§2.1 Multi-metric rows (if applicable):**
- [ ] 3-column grid: label 130px / bar 1fr / value 50px
- [ ] Bar track is exactly 6px (not 4, not 8)
- [ ] Track uses `rgba(255,255,255,0.04)`, fill uses semantic color (see §4)
- [ ] Numeric values are JetBrains Mono, right-aligned, tabular-nums
- [ ] Row dividers are `var(--border-06)` (subtle tier)

**§2.2 Composition + breakdown (if applicable):**
- [ ] Horizontal stacked bar with segments scaled to actual % of total
- [ ] Inline label only inside dominant segment(s) ≥5% width
- [ ] Color dot prefix on legend rows matches bar segments
- [ ] Legend carries label · meta · amount
- [ ] Drill mechanic chosen (B-pattern expandable rows OR C-pattern sidecar)
- [ ] **Concentration footer** (`Top 3 = X.X%`) ships in either drill mechanic — never drop it

**§3 Number formatting:**
- [ ] All percentages render at tenths place (1 decimal)
- [ ] All numerics in JetBrains Mono with tabular-nums
- [ ] Negatives in parentheses + red, not leading minus
- [ ] Money has no decimals on summary surfaces; cents preserved on reconciliation surfaces
- [ ] Stock prices to 2 decimals
- [ ] 15-min delayed label visible wherever Polygon/Massive price data renders

**§4 Severity signaling:**
- [ ] Bar color stays neutral except on real institutional tripwire
- [ ] Score number color shifts independently (white / muted / amber-300)
- [ ] No traffic-light bucket coloring
- [ ] Interpretive metrics opt out of severity thresholding

**§5 Verdict line:**
- [ ] 2-line max enforced (label + verdict, never 3)
- [ ] Conviction ladder used for overall-score cards (5 tiers, institutional voice)
- [ ] Watchword is specific, not vague or marketing copy

**§6 Action lists (if applicable):**
- [ ] High/Med/Low dots only — no pills, no row fills
- [ ] Tier set by rule definition, never auto-promoted by impact
- [ ] Within-tier 2-band sort: quantified above non-quantified
- [ ] Rule citation tooltip on hover: `Rule Name · R-NNN`

**Supporting:**
- [ ] Floating overlays use the elevated overlay recipe, never backdrop-blur
- [ ] Color is semantic only — no decorative coloring anywhere

If a card can't follow these patterns, the card is probably trying to show the wrong kind of data — or needs a new sub-pattern proposal. Stop and reconsider before free-forming.

---

# Anti-patterns (cross-cutting)

Common anti-patterns that violate this spec:

- **Blank space at the bottom of a card** (Rule 0 violation — the most serious)
- **Forced equal card heights in a grid** when content doesn't warrant it
- **`min-height` on cards** to make them "match" neighbors
- **8px+ tall bar tracks** (reads as a chart, not an indicator)
- **Colored bars by default** (turns dashboard into a traffic light)
- **Default-weight `0.08` dividers** for intra-card rows (too loud — use `0.06`)
- **Mixed font families for numbers** (never render a value in Geist Sans — always JetBrains Mono)
- **Two-decimal or whole-number percentages** when tenths is the rule
- **3-line hero blocks** when the verdict wraps (fix layout, never shorten copy)
- **Backdrop-blur** on overlays (cost + audience mismatch + trend risk)
- **Letter grades** for conviction (wrong institutional voice — use the conviction ladder)
- **Composition cards without concentration footer** (drops the analytical edge)
- **Decorative color anywhere** (every color must mean something)
- **Pills/badges by tier in default state** for action lists (dot only)
- **Auto-promote action tier by impact** (breaks explainability premise)

---

# How to update this spec

This doc is the LOCKED card-system spec for AI Thesis. To propose changes:

1. Open a session focused on the spec amendment
2. Identify which section (§1–§6 or supporting) needs change
3. Render a mockup side-by-side against the canonical reference for that section
4. Get Terry's explicit approval to supersede
5. Bump version below + add a changelog entry
6. Mirror the change back to Basis `card-gold-standard.md` if it's a cross-product principle, OR document the divergence explicitly if AI Thesis-specific

**Adding a new sub-pattern:** Same process. The new sub-pattern needs its own canonical reference (a specific scaffold-mockup card it locks against). No free-form sub-patterns.

**Cross-product principle:** When this spec and Basis `card-gold-standard.md` cover the same pattern, they should track in lockstep. Divergences require explicit documentation. The whole point of the Basis canon re-anchor (2026-05-01) is to keep one design language across both products.

---

# Version

- **v1.0** — 2026-05-01 — Initial port from Basis `card-gold-standard.md` v1.2. Tokens re-anchored to Basis canon via `thesis-design-system.css` v2.0. Domain examples translated from rent-roll (Basis) to memo/thesis/portfolio (AI Thesis). All structural patterns preserved verbatim: §1 Headline, §2.1 Multi-metric, §2.2 Composition+breakdown, §3 Number formatting, §4 Severity 2-channel rule, §5 Verdict line + Conviction ladder, §6 Action lists.

---

# Cross-references

- `docs/design/thesis-design-system.css` v2.0 — token sheet (re-anchored to Basis canon 2026-05-01)
- `docs/design/chart-spec.md` — chart cross-cutting principles + visx primitive references
- `docs/design/DESIGN_SPEC.md` — AI Thesis page-level design (this card spec extends, does not conflict)
- Basis `card-gold-standard.md` v1.2 — origin canon; kept in lockstep
- Blueprint §6 (Ticker Detail), §7 (Memo Page), §8 (Approval), §G.2 (memo state machine)
