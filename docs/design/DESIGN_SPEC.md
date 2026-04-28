# AI Thesis — Design System Spec v1.0

**Status:** Awaiting Terry's approval. Pixel-perfect adherence required per "Match exactly = EVERYTHING".
**Date:** 2026-04-27
**Authority:** This document supersedes ALL prior design decisions (HANDOFF.md token block from 0ff8b34, blueprint defaults, prior memory entries). Source of truth for any UI work going forward.

---

## 0. Provenance

| Asset | Path |
|---|---|
| Token sheet | `docs/design/thesis-design-system.css` (392 lines, verbatim copy of Claude Chat's `Basis Design System.css`) |
| Dashboard mockup | `docs/design/mockups/dashboard-v2.html` (246KB) |
| Full portal mockup | `docs/design/mockups/portal-v4.html` (237KB) |
| Screenshot 01 | `docs/design/screenshots/01-dashboard-top.png` (greet + KPI + macro + pending + feed + pulse) |
| Screenshot 02 | `docs/design/screenshots/02-dashboard-bottom.png` (watchlist + bull/bear + sector) |
| Screenshot 03 | `docs/design/screenshots/03-ticker-detail-top.png` (NVDA breadcrumb, action bar, memo, agent pipeline, approval) |
| Screenshot 04 | `docs/design/screenshots/04-ticker-detail-bottom.png` (technical setup, bear case, risk notes, footer) |

These reference assets are versioned in the repo. Any future change to the design language requires updating both this spec AND committing the new reference assets.

---

## 1. Brand

- **Wordmark:** "AI Thesis" — text-only, no icon. Replaces "Basis" everywhere it appears in mockups.
- **Topbar formatting:** "AI Thesis" wordmark (Geist 500, tracking `-0.01em`, `--text-1`) + 1px×14px divider in `--border` + product label "Investment OS" in 13px `--text-2` weight 400.

---

## 2. Tokens (LOCKED — supersedes prior)

Use exactly. Never inline a hex value in component code; always reference these via Tailwind `@theme` aliases.

### Surface
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0A0B0E` | App canvas + sidebar (merged single plane) + topbar |
| `--surface` | `#14161B` | Panels, KPI cards on hover, search input |
| `--surface-2` | `#1A1D24` | Inputs/badges/bar tracks/scrollbar |
| `--surface-hover` | `#1F232B` | Row hover state (tables, lists) |
| `--border` | `#232730` | Strong borders (rare; scrollbar thumb, kbd) |
| `--border-subtle` | `#1A1D24` | All standard panel/section borders (default) |

### Text
| Token | Hex | Usage |
|---|---|---|
| `--text-1` | `#F0F1F3` | Primary, numerics, headings |
| `--text-2` | `#9298A3` | Secondary, body, nav inactive |
| `--text-3` | `#5F6571` | Tertiary, labels, timestamps |

### Accent (Brand / neutral interactive)
| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#4D5BFF` | Active nav indicator, primary CTAs, conviction filled, panel chip text |
| `--accent-soft` | `rgba(77, 91, 255, 0.12)` | Active nav badge bg, accent chip bg |
| `--accent-hover` | `#6573FF` | Hover state on accent CTAs |

### Status (functional severity)
| Token | Hex | Soft (12% alpha) | Usage |
|---|---|---|---|
| `--success` | `#4FB87A` | `rgba(79, 184, 122, 0.12)` | Up deltas, BUY pill, approve, bull pressure |
| `--warning` | `#DDA84F` | `rgba(221, 168, 79, 0.12)` | HOLD pill, high severity, warn pulse-bar |
| `--danger` | `#E26B6B` | `rgba(226, 107, 107, 0.12)` | Down deltas, SELL pill, crit severity, bear pressure |
| `--info` | `#5B8FFF` | `rgba(91, 143, 255, 0.10)` | Med severity, proximity bar default, second composition slice |

### Body atmosphere
Subtle radial gradients fixed to the body, behind everything (`z-index: 0`):
- `radial-gradient(circle at 20% 0%, rgba(77,91,255,0.025) 0%, transparent 40%)`
- `radial-gradient(circle at 80% 0%, rgba(91,143,255,0.015) 0%, transparent 40%)`

Almost imperceptible — never amplify.

---

## 3. Typography

| Slot | Family | Weight | Letter-spacing |
|---|---|---|---|
| Body / UI | `Geist` | 400 default | normal |
| Numerics / data | `JetBrains Mono` | 500 for KPIs, 400 elsewhere | `-0.015em` on large numbers, `-0.01em` on tickers |
| Labels (UPPERCASE) | `Geist` | 500 | `0.06em` on KPI labels, `0.04em` on pulse text |
| `kbd` chip | `Geist` | 400 | normal |

**Pinned npm packages:**
- `geist@1.7.0` — provides Geist Sans (system-ui fallback)
- `JetBrains Mono` — Google Fonts via `next/font/google` (NOT Geist Mono — explicit override of HANDOFF token block)

**Numeric utility:** any element rendering numbers gets `font-feature-settings: "tnum"` for tabular alignment (prices, deltas, KPIs, table cells).

**Type scale (observed):**
| Use | Size | Weight | Tracking |
|---|---|---|---|
| KPI value | 24px | 500 mono | -0.015em |
| Greet | 18px | 500 sans | -0.015em |
| Pending ticker | 16px | 500 mono | -0.01em |
| Body / table cell | 13px | 400 sans | normal |
| Feed body | 12.5px | 400 sans | normal |
| Macro value | 14px | 500 mono | normal |
| Section label (uppercase) | 11px | 500 sans | 0.06em |
| Mono numbers in body | 12-12.5px | 400 mono | normal |
| Status pill / reco pill | 10–10.5px | 500 sans | 0.04–0.05em uppercase |
| `kbd` | 11px | 400 sans | normal |

Body base is 14px / line-height 1.5. `-webkit-font-smoothing: antialiased` is on.

---

## 4. App shell

### 4.1 Grid
- Single CSS grid: `grid-template-columns: 220px 1fr`, `min-height: 100vh`
- Topbar spans both columns (`grid-column: 1 / -1`), 48px tall, sticky `top: 0`, `z-index: 10`
- Sidebar sticky `top: 48px`, height = `calc(100vh - 48px)`
- Main scrolls; topbar + sidebar stay pinned

### 4.2 Topbar (48px)
- Border-bottom `--border-subtle`
- bg = `--bg` (matches canvas, no fill)
- Padding `0 16px`, gap `16px`
- Layout left → right:
  - Brand block: "AI Thesis" wordmark + 1px×14px divider + "Investment OS" product label in `--text-2`
  - Search input (flex 1, `max-width: 480px`, `--surface` bg, 28px tall, 6px radius, kbd badge `⌘K` aligned right)
  - Right meta: live market label (`NYSE OPEN` etc.), counts ("3 alerts · 1 today", "5 alerts", "7 jobs"), 24px circular avatar with initials

### 4.3 Sidebar (220px)
- bg = `--bg` (no border between sidebar and canvas — single plane)
- Border-right `--border-subtle`
- Padding `16px 8px`, gap `2px` between nav items
- **Sections** (uppercase 11px label, padding `12px 10px 6px`, color `--text-3`, weight 500, tracking 0.06em):
  - **WORK:** Dashboard, Watchlist, Research Queue, Triggers, Opportunities, Memos, Decisions, Portfolio
  - **SYSTEM:** Workflows, Settings
- **Nav item:** padding `6px 10px`, radius 5px, 13px text in `--text-2`, 14px icon `opacity 0.8`, gap 10px, transition 0.12s
- **Hover:** bg `--surface`, color `--text-1`
- **Active:** bg `--surface`, color `--text-1`, plus a 2px x 16px accent (`--accent`) bar at `left: -8px`, radius `0 2px 2px 0`
- **Badge (right-aligned):** mono 10px, `--surface-2` bg, 1px×5px padding, 3px radius. Active item's badge: `--accent-soft` bg, `--accent` text.

### 4.4 Main scroll region
- No padding on the wrapper itself; each section sets its own
- Standard horizontal padding for sections: `0 32px`
- Subtle scrollbars: `8px` wide, track `--bg`, thumb `--border`, hover `--surface-hover`

---

## 5. Page-level building blocks

### 5.1 Greet strip
- Padding `20px 32px 16px`, border-bottom `--border-subtle`
- Left: greet (18px, 500, `-0.015em`) — e.g. "Good afternoon, Terry" + small meta line below ("Monday, Apr 27, 2026")
- Right (`margin-left: auto`, gap 12px, 12px text in `--text-3`):
  - Pulsing 6px green dot (`@keyframes pulseLive` 2s — outer halo scales 1 → 2.2, opacity 0.4 → 0)
  - "MARKET LIVE" pulse-text (11px uppercase 500 in `--success`, tracking 0.04em)
  - 2px center-dot separator
  - Mono numbers (timestamps, breakers, USD label)

### 5.2 Macro strip
- Horizontal divided strip, full width, padding `12px 32px`, bg `--bg`, borders top + bottom in `--border-subtle`, `overflow-x: auto`
- Items: `flex: 1`, padding `0 16px`, separated by 1px right border `--border-subtle`
- Per item: uppercase label (10.5px, `--text-3`, tracking 0.06em) + value (14px mono `--text-1` 500) + delta (11px mono, success/danger)
- First item: `padding-left: 0`. Last item: no right border.

**Curated indices (8-up, supersedes mockup placeholders):**

| # | Symbol | Display | Source priority |
|---|---|---|---|
| 1 | SPX | S&P 500 | Polygon `I:SPX` / FMP `^GSPC` |
| 2 | NDX | Nasdaq 100 | Polygon `I:NDX` / FMP `^NDX` |
| 3 | RUT | Russell 2000 | FMP `^RUT` |
| 4 | VIX | Volatility | FMP `^VIX` |
| 5 | US10Y | 10-Yr Yield | FMP `^TNX` |
| 6 | DXY | Dollar Index | FMP `DX-Y.NYB` |
| 7 | WTI | Crude Oil | FMP `CL=F` |
| 8 | GOLD | Gold Spot | FMP `GC=F` |

Rationale: SPX + NDX + RUT covers full breadth (large/mega/small) — DJI is redundant. VIX + US10Y + DXY are macro regime gauges. WTI + GOLD provide inflation / real-rates / risk-off signal. BTC dropped from mockup placeholder set (not essential signal for US equity swing). All 8 are 15-min delayed per blueprint label.

### 5.3 KPI row (4-up)
- Grid `repeat(4, 1fr)` row, border-bottom `--border-subtle`
- Each card: padding `18px 24px`, right-divided by `--border-subtle` (last has none)
- Hover: bg `--surface`
- Layout per card:
  - **Label:** uppercase 11px, `--text-3`, tracking 0.06em, weight 500, margin-bottom 8px
  - **Row (flex, justify-between, items-end, gap 16px):**
    - Number group: KPI value 24px mono 500 + small mono adornment (e.g., `+0.41%` in `--text-2`)
    - Sparkline: 80px × 32px SVG; line stroke colored by direction (success/danger); on card hover, line animates to `--accent`
  - **Delta line:** mono 12px, success/danger, gap 4px, margin-top 6px
  - **Optional severity-mini block:**
    - 4 thin bars (height 4px, radius 1px), gap 3px, colors crit/high/med/low
    - Below: 10px mono legend with 5px dot + count

### 5.4 Three-column zone
Below the KPI row, the dashboard splits into a 3-col grid: `1.4fr 1fr 0.85fr`, gap 16px, padding `20px 32px`. The three panels are:

#### Panel base
- bg `--surface`, border `--border-subtle`, radius 6px, `overflow: hidden`
- **Header:** padding `12px 16px`, border-bottom `--border-subtle`, `flex justify-between`
  - Title: 13px 500 sans, tracking `-0.005em`
  - Meta: 11px mono `--text-3` (or "View all" link in `--text-2`, hover `--text-1`)

#### A. Pending decisions ("Awaiting your review")
- 3-col grid per row: `auto 1fr auto` with 14px gap
- Row padding `14px 16px`, border-bottom `--border-subtle` (last none), hover bg `--surface-hover`
- **Left:** ticker mono 16px 500, fixed width 64px
- **Mid:** trigger summary (12.5px `--text-2`) with inline tag (`--surface-2` bg, mono 10px, 1px 5px, 2px radius); meta line below in 11px mono `--text-3`
- **Right (column, gap 6px):** reco pill + conviction-mini (filled accent ticks 4×8px on `--surface-2` track)
- Reco pill variants: `.buy` success-soft + success text, `.sell` danger-soft + danger, `.hold` warning-soft + warning. 10.5px 500, padding `2px 7px`, 3px radius, uppercase tracking 0.05em.

#### B. Live trigger feed
- Vertical list, `max-height: 380px`, `overflow-y: auto`
- Row: 3-col `auto 1fr auto`, gap 10px, items-start, padding `11px 16px`, border-bottom `--border-subtle` (last none), 12.5px text
- **Dot (6px):** crit/high/med, with `box-shadow: 0 0 0 3px <color-soft>` halo
- **Body:** `--text-2` line-height 1.5, with `<strong>` flipping to `--text-1` weight 500. Numbers inline use mono 12px in `--text-1`.
- **Right time:** mono 10.5px `--text-3`, padding-top 2px
- **Inline status pill:** 10px mono, padding `1px 5px`, 2px radius, margin-left 6px
  - `.researching` accent-soft + accent
  - `.queued` surface-2 + text-2
  - `.resolved` success-soft + success

#### C. System pulse
- Padding `14px 16px`, flex column gap 14px
- Per stat: label (uppercase 11px `--text-3` 0.04em) + value (mono 15px `--text-1` 500) on a baseline-aligned row, optional 4px progress bar (`--surface-2` track, fill `--accent` or `--warning`), optional sub-label (11px mono `--text-3`)
- Footer 2-col grid of agent stats: 5px green dot + label + mono number

### 5.5 Watchlist trigger proximity (full-width below 3-col zone)
- Section padding `0 32px 20px`
- Table: full width, collapse, `--surface` bg, `--border-subtle` 1px border, 6px radius, overflow hidden
- **Header:**  text 11px uppercase `--text-3` 500 tracking 0.05em, padding `10px 14px`, bg `--bg`, border-bottom `--border-subtle`. Right-align numeric columns.
- **Body row:** padding `12px 14px`, 13px sans, border-bottom `--border-subtle`, hover bg `--surface-hover`, cursor pointer
- **Cells:**
  - Ticker: mono 13px 500 `--text-1` `-0.01em`; sub line "name" 12px `--text-3` margin-top 2px
  - Price: mono `--text-1`
  - Change: mono 12.5px, success/danger
  - Sparkline: 90px × 24px
  - Trigger / proximity: min 140px column. Bar: full-width 4px, `--surface-2` track, fill `--info` (default), `--warning` (high), `--danger` (crit). Below bar: mono 10.5px row, `justify-between`, label `--text-2`, pct in `--text-1` (or warn/crit color)
  - Reco pill (same variants as 5.4.A)
  - Conviction-mini ticks
  - Age: mono `--text-2` 12.5px

### 5.6 Bottom row (2-col `1.3fr 1fr`, gap 16px, padding `0 32px 32px`)

#### A. Bull / Bear pressure
- `pressure-list` of rows, each `70px 1fr 80px` grid, gap 14px, items-center, padding `12px 16px`, divided by 1px top border
- Left: ticker mono 13px 500 + name 10.5px `--text-3`
- Middle: stacked 8px bar `[bear danger | neutral surface-2 | bull success]` 4px radius. Absolute `--text-1` 2px×12px marker overlays current position. Below: mono 10px row with `bear` (danger) / `neutral` / `bull` (success) labels.
- Right: mono 11px verdict ("BULLISH" / "BEARISH" / "NEUTRAL") in matching color, right-aligned, 500.

#### B. Sector exposure (composition)
- Padding 16px
- Per row (margin-bottom 12px, last none):
  - Head row: name (12px `--text-1`) + pct (mono 12px `--text-2`)
  - Bar: 6px `--surface-2` track, 3px radius, fill `c1`–`c5` palette:
    - `c1` `--accent` `#4D5BFF`
    - `c2` `--info` `#5B8FFF`
    - `c3` `#7B6FD8` (violet)
    - `c4` `#5B8FFF` opacity 0.7 (info-faded)
    - `c5` `--text-3`

---

## 6. Ticker detail page (NVDA reference, screenshots 03–04)

### 6.1 Breadcrumb / header strip
- Path: `Home / Pending decisions / NVDA — NVIDIA Corporation`
- Mono ticker + sans name
- Right-aligned: large mono price + delta pill

### 6.2 Action bar
- Row of grouped controls in panel-style frames:
  - BUY / SELL / HOLD radio group (filled by reco color when selected)
  - Numeric input "Price"
  - Horizon dropdown ("12 - 18 mo")
  - Numeric input "Target price"
- Submit button (right): "Run agents" (full accent fill, white text). Pattern: standard interactive controls inherit panel surface/border tokens.

### 6.3 Investment memo (left, full width minus right rail)
- Single panel:
  - Section labels in uppercase 11px `--text-3` (EXECUTIVE SUMMARY, INVESTMENT THESIS, VALUATION ANALYSIS, etc.)
  - Body paragraphs in 13px `--text-2`, line-height 1.5–1.6, ~65–75ch measure
  - Mono numbers inline in `--text-1`
  - Valuation table: same pattern as watchlist table (uppercase headers, mono numerics, soft borders)
  - Code-fence-style key/value blocks for technical setup ("RSI 14: 62.5", etc.) — mono on `--surface-2` background

### 6.4 Right rail (≈ 320px wide)
Two stacked panels:

#### A. Agent pipeline
- List of agents (from screenshot): Company Research, SEC Filings, Sentiment, Earnings, Technical Analysis, Macro, Insider, Risk, etc.
- Each row: agent name + status pill (RESEARCHING / DONE / QUEUED) + mono timestamp/cost ("$0.21" / "1m 14s")
- Active agent: small accent-bordered surface, others `--surface-2` ticks

#### B. Approval decision
- Conviction selector: 10-step bar (filled portion `--accent`, unfilled `--surface-2`), reads `7/10`
- Decision rationale text input
- Three buttons in row:
  - **Approve** (`--success` bg, white text) — primary
  - **Snooze for…** (`--warning-soft` bg, `--warning` text) — secondary, soft fill
  - **Reject** (`--danger-soft` bg, `--danger` text) — destructive

### 6.5 Bear case section (bottom, full-width below memo)
- Panel header with severity dot + age timestamp
- Body: stacked risk cards, each with severity tag (HIGH / MEDIUM / LOW colored), title, body paragraph, optional mono data row
- Soft separators between cards

### 6.6 Risk notes (footer-style)
- 2-col label/value grid: `Sample size`, `Confidence`, `Update freq.`, `Last refresh` etc.
- Labels uppercase 11px `--text-3`, values mono `--text-1`

---

## 7. Reusable patterns

### 7.1 Severity legend (4 levels)
| Level | Color | Soft bg | Use |
|---|---|---|---|
| Crit | `--danger` `#E26B6B` | `danger-soft` | Stop-loss breach, broken thesis |
| High | `--warning` `#DDA84F` | `warning-soft` | Earnings miss, downgrade |
| Med | `--info` `#5B8FFF` | `info-soft` | Technical setup, target proximity |
| Low | `--text-3` 50% opacity | n/a | Background events |

### 7.2 Status pills
- Form: 1px×5px padding, 2px radius, mono 10px
- Variants: researching (accent), queued (surface-2/text-2), resolved (success), failed (danger), throttled (warning)

### 7.3 Reco pills
- Form: 2px×7px padding, 3px radius, sans 10.5px 500 uppercase tracking 0.05em
- Variants: BUY (success), SELL (danger), HOLD (warning), WATCH (info), AVOID (text-3)

### 7.4 Conviction ticks
- 4px×8px ticks, 1.5px gap, radius 1px
- Filled = `--accent`, unfilled = `--surface-2`
- Always 10 ticks total. Display N filled where N = conviction score 0–10.

### 7.5 Live indicator
- 6px solid `--success` dot with pulsing 2px halo (`pulseLive` 2s infinite)
- Pair with uppercase 11px `--success` text "MARKET LIVE" / "AGENT RUNNING" / "STREAMING"

### 7.6 Hover affordances
- Tables: row bg `--surface-hover`, cursor pointer, transition 0.12s
- Cards: bg → `--surface`, transition 0.15s
- Nav: bg → `--surface`, color → `--text-1`, transition 0.12s
- Buttons: outline gains `--text-1` color; primary deepens via `--accent-hover`

### 7.7 Numeric formatting
- Always `tnum` feature on
- Currency: USD with $ prefix, no space, 2 decimals (`$117.50`)
- Percent: signed, 2 decimals, % suffix (`+2.74%`)
- Volume: localized commas (`185,432,910`)
- Time: relative when < 24h ("18m ago", "2h ago"), absolute date otherwise ("Apr 22, 2026")

### 7.8 Spacing scale (observed)
2 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 24 / 32. Stick to this; do not invent intermediate values.

### 7.9 Radius
- 6px for panels and buttons
- 5px for nav items
- 4px for bars and chips
- 3px for small badges
- 2px for tiny pills
- 1px for tick marks

---

## 8. Motion

| Effect | Trigger | Duration | Easing |
|---|---|---|---|
| Hover bg change | Pointer enter | 120ms | ease |
| Card hover | Pointer enter | 150ms | ease |
| Sparkline hover stroke swap to accent | Pointer enter on KPI card | 200ms | ease |
| Live dot halo pulse | Continuous | 2000ms | linear infinite |
| Proximity bar fill | Data change | 300ms | ease |
| Pressure bar marker | Data change | 300ms | ease |
| Composition bar width | Data change | 300ms | ease |

Respect `prefers-reduced-motion`: disable pulseLive (static dot) and bar animations.

---

## 9. Floor + extension principles

Per Terry: this is the **floor**. Extend and improve when adding new screens.

**Extension rules:**
1. **No new tokens** without spec update + Terry approval. Use existing tokens.
2. **No competing patterns** — if a watchlist-style table appears anywhere new, reuse the watchlist visual language exactly.
3. **No competing radii or borders** — stick to the spacing/radius scale above.
4. **New screens MUST sketch a layout** that fits the topbar + sidebar + main scroll model (no full-bleed overlays except modals/drawers).
5. **Improvements that qualify as "extension":**
   - Density variants (compact tables for power-user mode)
   - Accessible focus rings (currently absent in mockups — must add per WCAG)
   - Empty states matching panel pattern (panel header + center-aligned body in `--text-2`)
   - Skeleton loaders matching panel structure (use `--surface-2` rectangles, no shimmer unless approved)
   - Mobile/tablet responsive breakpoints (mockups are desktop-only)
6. **Improvements that DO NOT qualify** without explicit Terry sign-off: new colors, glassmorphism, gradients beyond the body atmosphere, new font families, decorative animations, icon style swaps.

**Known gaps mockups don't cover:**
- Sign-in / magic-link page
- Empty states (no watchlist items, no decisions pending, no alerts)
- Loading / skeleton states
- Error states (failed agent run, failed data fetch)
- Forms beyond the action bar (settings, trigger creation, ticker add)
- Modals and drawers (confirmation, ⌘K palette)
- Mobile / narrow viewport
- Email template (Resend approval magic-link)

These will be designed against the floor — sketches go in this spec under section 11 once we get to those screens.

---

## 10. Implementation handoff

**Tailwind v4 `@theme` block** — exact mapping for `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg: #0A0B0E;
  --color-surface: #14161B;
  --color-surface-2: #1A1D24;
  --color-surface-hover: #1F232B;
  --color-border: #232730;
  --color-border-subtle: #1A1D24;

  --color-text-1: #F0F1F3;
  --color-text-2: #9298A3;
  --color-text-3: #5F6571;

  --color-accent: #4D5BFF;
  --color-accent-soft: rgba(77, 91, 255, 0.12);
  --color-accent-hover: #6573FF;

  --color-success: #4FB87A;
  --color-success-soft: rgba(79, 184, 122, 0.12);
  --color-warning: #DDA84F;
  --color-warning-soft: rgba(221, 168, 79, 0.12);
  --color-danger: #E26B6B;
  --color-danger-soft: rgba(226, 107, 107, 0.12);
  --color-info: #5B8FFF;
  --color-info-soft: rgba(91, 143, 255, 0.10);

  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

html, body { background: var(--color-bg); color: var(--color-text-1); font-family: var(--font-sans); font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; }

.tnum { font-feature-settings: "tnum"; }

body::before { content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    radial-gradient(circle at 20% 0%, rgba(77,91,255,0.025) 0%, transparent 40%),
    radial-gradient(circle at 80% 0%, rgba(91,143,255,0.015) 0%, transparent 40%);
}
```

**`/tokens` verification page (THS-1 final deliverable):**
1. All 18 color swatches with token name + hex
2. Geist Sans size ladder: 11 / 12 / 13 / 14 / 16 / 18 / 24 / 32 / 48
3. JetBrains Mono numeric row with `tnum`: `$117.50` / `+2.74%` / `185,432,910` aligned in a column
4. All 4 severity levels rendered as dots, soft-bg pills, and bars
5. All 5 reco pills (buy/sell/hold/watch/avoid)
6. Conviction ticks 0–10
7. Live indicator with pulse animation
8. Spacing scale rule (visual ruler)
9. Radius scale (1/2/3/4/5/6 px squares)

This page is a regression check — every UI the project ships must pull tokens from this base.

---

## 11. Resolved decisions (2026-04-28)

| # | Question | Decision |
|---|---|---|
| 1 | Brand mark | Text-only "AI Thesis" wordmark — no icon |
| 2 | Sidebar product label | "Investment OS" |
| 3 | Macro strip indices | Curated: SPX · NDX · RUT · VIX · US10Y · DXY · WTI · GOLD |
| 4 | Mono font | JetBrains Mono via `next/font/google` (overrides HANDOFF's Geist Mono) |
| 5 | Snooze button fill | Soft (`--warning-soft` bg, `--warning` text) |
| 6 | Empty-state copy | Drafted per ticket — not in this spec. Each ticket adds its empty/loading/error states. |

---

## 12. Approval

This spec is the source of truth for AI Thesis design. HANDOFF.md token block (`#121415 / #2E5BFF / #3FB950` set) is formally retired. Updated 2026-04-28.

**Per-ticket discipline:** new screens get empty/loading/error states drafted in their own ticket, reviewed against this spec, then implemented. No bulk pre-design across tickets.
