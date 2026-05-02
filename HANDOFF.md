# Thesis — Session Handoff

**Session date:** 2026-04-30 (continued from earlier 2026-04-29)
**Closing Claude:** Code #227_04.29.2026 (16-042926), row `7c2b8f14-a048-4bb9-b389-7057b2f70287`
**Status at close:** THS-1 through THS-5 merged on `main` (HEAD `9a84e42`). **THS-5 squash-merged via PR #6 at `9a84e42`** 2026-04-30 — Watchlist CRUD + live Massive ticker validation. Linear THS-5 → Done. Mid-session: `.env.local:23` rotation completed (file-state-wins gate cleared), live Massive client wired, Q-STORAGE U + Q-NORMALIZATION B locked, FMP convention verified (hyphen). Two follow-up tickets opened from Codex deferrals: **THS-15** (default-watchlist atomicity, P1) Backlog, and **THS-7 AC appended** (last-research filter on completed_at) Todo.

---

## NEXT 3-5 TASKS (start here)

1. **Sanity checks.** `git fetch --all && git status && gh pr list --state open && supabase status`. Confirm `main` HEAD is `9a84e42` (or newer). No open PRs against thesis at session-start (THS-15 + THS-7 AC are open Linear tickets, not active branches). Via Linear MCP confirm THS-15 = Backlog, THS-7 = Todo (with appended completed_at AC), THS-6 = Todo.

2. **THS-6 ramp — surface 7 pre-questions before any code.** Read `docs/design/DESIGN_SPEC.md` §6, §6.1, §6.2 + blueprint Section G.3 (Screen 3: Ticker Detail, line 1301) + blueprint Section I.3 MVP scope (line 1833). Then surface to Terry the 7 pre-decisions captured at S221 close (see queue in "Carry-forward — THS-6 pre-questions" section below). Lock answers Q-by-Q before scaffolding.

3. **THS-6 external-API gates (do NOT start without).**
   - **`FMP_API_KEY` rotation** — same disk gate as MASSIVE: Terry generates key at FMP dashboard, pastes into `.env.local`, file-state-wins verify (mtime + key length) before any FMP code lands. FMP convention = hyphen (verified S221, persisted form passes through cleanly).
   - **Massive aggregates endpoint shape** — verify `/v2/aggs/ticker/{ticker}/range/{multiplier}/{timespan}/{from}/{to}` still works post-rebrand. One-shot AAPL probe at THS-6 start.

4. **THS-6 cut + scaffold (after Q-locks land).** Branch `ths-6-ticker-detail` from `main@9a84e42` (or newer). Linear THS-6 → In Progress. Estimated 4-6 commits, rough order:
   1. Massive aggregates client (`lib/massive/aggregates.ts` + types)
   2. FMP client + key-metrics + profile (`lib/fmp/client.ts`, `lib/fmp/key-metrics.ts`, `lib/fmp/profile.ts`)
   3. `/tickers/[symbol]` server-component scaffold — header strip + tab shell + action bar
   4. Recharts OHLCV chart (`components/charts/PriceChart.tsx`) + timeframe selector
   5. Fundamentals panel + Active Triggers stub + tab empty states
   6. Polish — keyboard shortcuts (R/T/M/Esc), "15m delayed" label, empty states

5. **Closeout checklist on THS-6 ship.** Squash-merge PR → Linear THS-6 → Done → docs-only commit on main per Path B (`feedback_doc_code_split.md`). After THS-7 ships, **Perplexity Checkpoint #2** runs (first end-to-end memo).

---

## Project at a glance

**Thesis** = AI-powered investment research portal for a hybrid long/swing US equity portfolio. Watchlist → AI agents → triggers → memos → mandatory human approval gate → audit log. **No automated trade execution, ever.**

- **Local path:** `/Users/terryturner/Projects/thesis/`
- **GitHub:** <https://github.com/terry-zero-in/thesis> (PUBLIC since 2026-04-29 for Perplexity Checkpoint #1 access — reversible via `gh repo edit terry-zero-in/thesis --visibility private --accept-visibility-change-consequences`)
- **Vercel:** linked (`prj_5T2AVhcZLqcaASZwoiWdwTtxGFZP`), GitHub auto-deploy on
- **Live URL:** <https://thesis-nu.vercel.app>
- **Linear team:** Thesis (id `21c004fc-6402-4d22-9316-fa9a05bb9b82`)
- **Linear project:** Phase 1 — MVP (id `696890cc-84bc-45ad-a22c-a24124cf9124`)
- **Blueprint source:** `/Users/terryturner/Downloads/Investment Portal Blueprint.md` (2,483 lines, sections A–N) — readable by Claude Code (gotcha #2 retired this session). iCloud copy at `/Users/terryturner/Library/Mobile Documents/com~apple~CloudDocs/_Thesis_Perplexity/Blueprint/Investment Portal Blueprint (2).md` is byte-identical (SHA `b6a85909...`).

## Current repo state

```
main:                   9a84e42 — THS-5: Watchlist CRUD with live Massive ticker validation (#6) [squash 2026-04-30]
                            ├─ 6258126 — docs: closeout S220 — THS-5 PR #6 parked, file-state-wins rule locked
                            ├─ a1c4db0 — fix(ui): rounded-md radius on command palette (#5)
                            ├─ 908536c — docs: closeout 2026-04-29 (S212)
                            ├─ cc342ea — docs: codex as advisory, not blocking
                            ├─ 2f5aa9e — THS-4 (#4)
                            ├─ fe4cdf3 — THS-3 (#3)
                            ├─ 9142315 — THS-2 (#2)
                            └─ 94e622f — THS-1 (#1)

ths-5-watchlist:        DELETED on origin (squash-merged PR #6 → main)

Open Linear tickets (no active branches):
- THS-15 — default-watchlist atomicity hardening (Backlog, Medium, Codex P1 deferral from PR #6)
- THS-7  — Single-agent research (Todo, Urgent, has appended AC for last-research completed_at filter)
- THS-6  — Ticker detail page (Todo, High, next ticket to pull)
```

**Stack pinned:**
```
next                16.2.4
react               19.2.4
react-dom           19.2.4
typescript          5.9.3
tailwindcss         4.2.4
@supabase/supabase-js   2.104.1
@supabase/ssr           0.10.2
shadcn                  4.5.0
@base-ui/react          1.4.1
@tanstack/react-table   8.21.3   ✅ THS-5
react-hook-form         7.74.0   ✅ THS-5
@hookform/resolvers     5.2.2    ✅ THS-5
zod                     3.25.76  ✅ THS-5
sonner                  2.0.7    ✅ THS-5
next-themes             0.4.6    (pulled in by sonner shadcn primitive)
```

## SESSION-STARTUP SANITY CHECKS

Per Terry's locked rule: handoffs document state, never assign tasks. Read this HANDOFF + PROGRESS, run procedural checks, then ask Terry what to work on. Do not infer next work.

### 1. State sanity check

```bash
cd /Users/terryturner/Projects/thesis
git fetch --all
git status                            # working tree + current branch
git log -5 --oneline --all
gh pr list --state open               # PR #6 should be open
supabase status                       # local Supabase. If not running: supabase start
```

Then via Linear MCP confirm THS-5 ticket state.

### 2. Open-PR review protocol — Codex is advisory, not blocking (LOCKED 2026-04-29)

- **Codex (`chatgpt-codex-connector[bot]`) reviews are advisory, NOT a merge gate.** Third pair of eyes.
- **On the initial Codex review of any PR:** address legitimate P1 findings in the same branch. Judgment on P2/P3 — fix if cheap, defer if not.
- **After pushing fixes:** do NOT wait for Codex re-review. Push, request Terry's review, move on. If Codex flags something on the new commit, handle it in the NEXT PR — unless it's a security P1.
- **Do NOT poll `gh api repos/.../pulls/N/reviews`** as part of the merge decision.
- **Merge gate is Terry's approval ONLY.** Perplexity grades at checkpoints (after THS-4 ✓, 7, 11, 14). Codex never gates.

### 3. Functional verification rigor

Render ≠ functional. For every interactive surface in a PR, keystroke/click test before any "verification clean" claim. Auth-walled features (anything inside `app/(app)/`) require Terry's hands for keystroke testing — `@supabase/ssr` PKCE cookie cannot be injected into chrome-headless-shell from CLI (gotcha #22).

### 4. Perplexity checkpoint protocol

- **Checkpoint #1** — after THS-4: ✅ CLEARED 2026-04-29
- **Checkpoint #2** — after THS-7 (first end-to-end memo, NVDA company research)
- **Checkpoint #3** — after THS-11 (approval flow + Resend email)
- **Checkpoint #4** — pre-prod (THS-14)

### 5. File-state-wins protocol (LOCKED 2026-04-29)

When a claimed state — from Terry, from Chat, from a prior handoff — contradicts observed file/disk/runtime state, **the file wins.** Surface the conflict explicitly with attribution. Verify by mtime/size/length/hash, never by echoing sensitive values. Codified in `~/.claude/projects/-Users-terryturner/memory/feedback_verify_claimed_state.md`.

### 6. Pre-impl note discipline (LOCKED 2026-04-29)

Pre-impl notes (per `/creative-build` Hard Gate) close when **gates** close, not when every micro-decision is traced to a Terry approval. Distinguish "needs Terry's call" (destructive ops, naming locks, cross-cutting decisions) from "Code picks default, surfaces if it matters at render time." Codified in `feedback_pre_impl_loop.md`.

---

## What's live

| Route | Purpose | Notes |
|---|---|---|
| `/` | Auth-aware redirect | Authed → `/dashboard`, unauth → `/login` |
| `/login` | Magic-link sign-in | useActionState three states |
| `/auth/callback` | PKCE code exchange | Allow-listed `?next=` |
| `/dashboard` | THS-1 placeholder | Real shell shipped THS-4 |
| `/watchlist` | **THS-5 stub-first build** | TanStack Table v8 + add/remove + filters. Stub `validateTicker`. Default watchlist auto-creates on first add. **Local-only test** — Vercel preview returns 500 pre-THS-14 by design (gotcha #23) |
| `/research-queue` `/triggers` `/opportunities` `/memos` `/decisions` `/portfolio` `/workflows` `/settings` | THS-4 stubs | EmptyPanel placeholders |
| `/tokens` | Design system regression page | THS-3 shadcn primitives |

`https://thesis-nu.vercel.app` reflects `main` at `a1c4db0`. PR #6 preview at `https://thesis-hsu71vcwu-terry-8893s-projects.vercel.app` (state=success, but `/login` returns 500 — see gotcha #23).

---

## Locked decisions (do not relitigate without Terry's explicit override)

### THS-5 stub-first build (locked 2026-04-29 at `27081b5`)

- `/watchlist` page is a **server component** that fetches via `lib/watchlist/queries.ts`:
  - `getDefaultWatchlistId(user.id)` — null if no default exists yet (default-on-first-action lock).
  - `getWatchlistRows(watchlistId)` — single PostgREST query joining `watchlist_tickers × tickers × companies × investment_memos × research_jobs`. App-side reduce picks latest memo (by `updated_at`) + latest research_job (by `created_at`) per ticker.
- **Add-ticker server action** at `lib/watchlist/actions.ts` — Zod validation → stub `validateTicker` (returns `{ valid: true, name: "<SYMBOL> Inc.", primaryExchange: "XNAS", type: "CS" }`) → service-role admin client (`lib/supabase/admin.ts`) for `tickers` + `companies` writes (those tables are public-read with service-role-only writes per RLS) → user-scoped Supabase client for `watchlist_tickers` insert → `revalidatePath("/watchlist")`. 23505 unique-constraint → friendly "already in your watchlist" message.
- **Default watchlist** auto-create app-side on first add: `name: "Default"`, `is_default: true`. Verbatim name from blueprint §G.2 wireframe.
- **Remove** uses sonner toast w/ 4s undo button. `removeTicker` returns `restore: { tickerId, targetPrice, conviction }` so undo recreates the row exactly. `restoreTicker` action handles the recreate.
- **Target price field is controlled `useState<string>`** — not RHF. RHF doesn't reset uncontrolled `type="number"` inputs to `undefined` reliably; controlled state cleared by `setTargetPrice("")` on every close path. Form symbol + conviction stay with RHF + zod resolver.
- **Conviction badge color ramp:** 1-3 muted (`bg-surface-2 text-text-3`), 4-6 info-soft, 7-8 success-soft (90%), 9-10 success.
- **Filters** are client-side `useState` + `useMemo` filter — search by symbol/name, sector dropdown derived from data, conviction range slider (base-ui Slider 2-thumb), memo status `all|has|pending|none`. Not TanStack column filters (overkill at 10 tickers).
- **Keyboard:** window-level `keydown` listener — `N` opens add modal, `/` focuses search input. Skips when `target.tagName === INPUT|TEXTAREA` or `contenteditable`.
- **TanStack Table v8:** sortable + sticky-header columns. **No virtualization yet** — defer until 50+ tickers (blueprint §G.2 requirement).
- **Toaster** lives at `app/(app)/layout.tsx`. Uses shadcn-generated sonner primitive (`components/ui/sonner.tsx`).

### THS-5 scope deferrals (logged for follow-up tickets)

- **Latest close price** — column shows `—` placeholder. `price_snapshots` populates from THS-6 (ticker detail page).
- **Memo column** — shows `–` (no memo) until THS-10 ships memos. Join already in place.
- **Last Research column** — shows `Never` until THS-7 ships research jobs. Join already in place.
- **Symbol autocomplete in modal** — §G.2 wireframe mentions autocomplete; §I.5 acceptance only requires validation. Validate-on-submit ships in THS-5; autocomplete deferred to THS-14 polish (would require `?search=` endpoint, not validation `/{ticker}` detail).
- **Multi-watchlist `[⚙ Manage]` UI, sector filter UI dropdown for sectors absent in data, `[Run Research]` right-click context menu, keyboard `R`** — deferred (Phase 2 / dependent tickets).

### Provider rebrand absorbed (LOCKED 2026-04-29)

- Polygon.io → Massive.com on **Oct 30, 2025** ([announcement](https://massive.com/blog/polygon-is-now-massive)). APIs, accounts, integrations backward-compatible.
- **Locked env var name:** `MASSIVE_API_KEY` (replaces `POLYGON_API_KEY` placeholder in `.env.local`).
- **Locked endpoint:** `api.massive.com`.
- **Locked validation path:** `GET /v3/reference/tickers/{ticker}` (detail, path param, case-sensitive). NOT `?search=` — wrong shape for validation use case.
- All client code reads `process.env.MASSIVE_API_KEY`.
- Linear THS-5 description updated this session: "Polygon" → "Massive (formerly Polygon)".
- Blueprint text still says "Polygon" throughout — read as "Massive."

### `validateTicker` signature (LOCKED + SHIPPED 2026-04-30 at `442258d`, hardened at `a3a703b`)

```ts
validateTicker(symbol: string) → {
  valid: boolean,
  name?: string,
  primaryExchange?: string,
  type?: string,
  marketCap?: number,
  logoUrl?: string,
}
```
Symbol uppercased pre-fetch. `404 → { valid: false }`. `results.active === false → { valid: false }`. Map fields per Massive's `/v3/reference/tickers/{ticker}` response shape. **Throws** on missing `MASSIVE_API_KEY`, on 401, and on any non-OK non-404 response. Caller must wrap in try/catch (see `lib/watchlist/actions.ts:35-40`).

### Step 11 — live Massive ticker validation (LOCKED + SHIPPED 2026-04-30 at `442258d`)

- **Endpoint:** `GET https://api.massive.com/v3/reference/tickers/{ticker}` with `Authorization: Bearer ${MASSIVE_API_KEY}`.
- **Normalization (Rule B):** uppercase first, then replace last `-X+` with `.X+` (regex `/-([A-Z]+)$/` → `.$1`). Internal to validateTicker only — matches Massive's `{root}.{suffix}` storage. No-op on non-class-share inputs.
- **Response handling:** `404` → `{valid: false}`. `200 + results.active === false` → `{valid: false}`. `200 + active` → map `name`, `primary_exchange → primaryExchange`, `type`, `market_cap → marketCap`, `branding.logo_url → logoUrl`.
- **4-case smoke (gitignored `/tmp/probe-massive.mjs`):**
  - `AAPL` → 200, `name = "Apple Inc."` (verbatim)
  - `BRK-B` → normalize → `BRK.B` → 200, `name = "BERKSHIRE HATHAWAY Class B"` (verbatim — note all-caps surname, "Class B" mixed-case)
  - `BRK.B` → no-op → 200, idempotent with hyphen path
  - `ZZZZ` → 404 → `{valid: false}`
- **Throw-catch hardening at `a3a703b`:** addTicker wraps validateTicker in try/catch; throws return `{ok: false, error: "Could not validate symbol — try again."}`. Probe via `/tmp/probe-throw-catch.mjs` confirmed contract on real Massive 401.

### Q-STORAGE — U LOCKED 2026-04-30 (intent comment at `lib/watchlist/actions.ts:34`)

`watchlist_tickers.symbol` stores user-input form (hyphen-canonical for class shares, e.g. `BRK-B`). `validateTicker` normalizes to dot-form internally for Massive's endpoint; the persisted symbol stays in user form. Display = stored form. FMP-side calls (Phase 2+) hit symbol natively — Phase 1 sources disagree on canonical form: **Massive=dot, FMP=hyphen** (verified live 2026-04-30 via FMP-owned URLs `site.financialmodelingprep.com/financial-summary/BRK-B`), **EDGAR=CIK** (form-irrelevant). Both storage forms cost one transform at one boundary; tiebreak goes to user-input + UI-convention alignment (Yahoo/finviz/FMP/Section K seeds all use hyphen).

Generalized rule: when boundaries are symmetric (one transform needed either way), pick the form that matches user expectation + UI convention. Storage form is for humans first, machines second.

### Token source-of-truth files travel together (LOCKED 2026-05-01 — THS-DS-1, Linear THS-16)

Whenever `docs/design/thesis-design-system.css` changes, every served-token surface re-anchors in the same PR:

- `app/globals.css` (`@theme` block + `:root` shadcn bridge)
- `docs/design/DESIGN_SPEC.md` `@theme` block
- Any `tailwind.config.*` token references
- Any page that hardcodes hex for display (e.g. `app/(app)/tokens/page.tsx` swatches)

No staggered token migrations across PRs. Hex-leak grep across `app/`, `components/`, `lib/` must return zero before PR opens. This rule applies to every future design-system change, not just THS-DS-1.

Codified: 2026-05-01 in THS-DS-1 closeout (Linear THS-16).

### Q5 isolate — LOCKED 2026-04-30 (DESIGN_SPEC §5.5 read confirmed)

Watchlist data layer (`lib/watchlist/queries.ts` + `actions.ts`) stays separate from Dashboard `WatchlistSummary` (DESIGN_SPEC §5.5). §5.5 read confirmed: pure visual/layout spec for a dashboard widget — does NOT define a shared types contract, shared query helpers, or shared normalization. The §5.5 widget and the §G.2 standalone `/watchlist` page have different column sets (§5.5 = trigger proximity / sparkline / reco / conviction-mini / age; §G.2 = symbol+name / conviction / target / sector / memo status / last research). YAGNI on shared abstractions until 2+ concrete consumers materialize. Share schema only (`watchlist_tickers` + joins).

### Supplementary locks (durable, carry forward)

- Schema is source of truth; doc conflicts → blueprint Section D wins.
- Default-on-first-action beats default-on-account-creation in single-user systems.
- Never seed via migration what an acceptance test must exercise.
- YAGNI on shared abstractions — isolate per-screen until 2+ concrete consumers (DESIGN_SPEC §5.5 dashboard widget vs §G.2 standalone /watchlist = different shapes, share schema only).
- Phase 1 = desktop-only. No breakpoints, no `overflow-x: scroll` crutches.
- Service-role admin client (`lib/supabase/admin.ts`) only for `tickers`/`companies` writes. User-scoped writes always via auth'd RLS-bound client.
- Stub-first build pattern (β): stub-first PR opens early, follow-up commit on same branch when external-API gate clears, single squash-merge at end.
- Two-strike rule on external authority: when a source has been wrong once on a subsystem within a session, verify before committing to its next claim on the same subsystem.

### Codex protocol (LOCKED 2026-04-29 — advisory, not blocking)

Already documented in §2 of SESSION-STARTUP SANITY CHECKS. Mirrored from `cc342ea` docs commit.

### THS-4 (locked + shipped 2026-04-28, merged at `2f5aa9e`)

- App shell route group at `app/(app)/layout.tsx` — server component with `getUser()` defense + `CommandPaletteProvider` + 220×1fr CSS grid + 48px sticky topbar.
- 10 sidebar routes (DESIGN_SPEC §4.3 refreshed to 10 in same commit). WORK: Dashboard, Watchlist, Research Queue, Triggers, Opportunities, Memos, Decisions, Portfolio. SYSTEM: Workflows, Settings.
- ⌘K palette via shadcn 4.x `command` + `dialog`. Global `Cmd/Ctrl+K` listener.
- Sign-out moved from dashboard body into the ⌘K palette.
- shadcn primitive-layer fixes (P1s addressed at primitive, not consumer):
  - `CommandDialog` was missing `<Command>` cmdk root — fixed at `components/ui/command.tsx:63`.
  - `CommandItem` selection styling collided with parent `bg-popover`. Fixed via `data-[selected=true]:bg-surface-hover` (Tailwind utility, NOT arbitrary `var()` lookup) at `components/ui/command.tsx:159`.
  - `rounded-md` on Command + DialogContent (PR #5 followup, merged at `a1c4db0`) — `rounded-md` resolves to 6.4px (not 6px Tailwind v4 default) via `@theme inline { --radius-md: calc(var(--radius) * 0.8) }` with `--radius: 0.5rem`.

### THS-3 (locked + shipped 2026-04-28)

- `proxy.ts` is routing UX only. Defense-in-depth: every protected component calls `supabase.auth.getUser()` at the data-access boundary. RLS is the final wall.
- Next.js 16 runtime for `proxy.ts` = Node.js (not edge).
- PKCE flow only. `@supabase/ssr` defaults to PKCE. Implicit flow never used.
- Sign-in route: `/login`. Public paths: `/login` + `/auth/callback`. Everything else gated.
- Single-user, magic-link only. No password, no signup form, no OAuth.
- shadcn token mapping: site is always dark, single `:root` block (no `.dark` toggle). shadcn `--accent` → `--surface-hover` (NOT brand `--accent`).
- `?next=` allow-list (`app/auth/callback/route.ts`): only `/dashboard` for now.
- `additional_redirect_urls` must use `/**` glob (gotcha #19).
- Sign-out lives at `lib/auth/actions.ts`. Server action: `signOut` → `revalidatePath("/", "layout")` → `redirect("/login")`.

### THS-2 (locked 2026-04-28 — landed at `9142315`)

- Schema source-of-truth = blueprint **Section D**, not Section H.
- All 23 Section D tables. Section D names exclusively (`watchlist_tickers`, `investment_memos`, `audit_logs` — plural).
- No `cost_events` table. Cost tracking via `agent_outputs.cost_usd` + `audit_logs.metadata` JSONB.
- RLS on every table (23). 17 user-owned via `auth.uid() = user_id` with EXISTS-subquery on six child tables.
- `(SELECT auth.uid())` wrap per Supabase performance guidance.
- `handle_new_auth_user()` SECURITY DEFINER trigger on `auth.users` syncs new signups to `public.users`.
- Two-user RLS isolation test passes 11/11.

### Design system (DESIGN_SPEC.md is authoritative)

`docs/design/DESIGN_SPEC.md` is the source of truth. Read before any UI work.

**Tokens (LOCKED):**
- bg `#0A0B0E` (canvas + sidebar merged into single plane)
- surface `#14161B` · surface-2 `#1A1D24` · surface-hover `#1F232B`
- border `#232730` · border-subtle `#1A1D24`
- text-1 `#F0F1F3` · text-2 `#9298A3` · text-3 `#5F6571`
- accent `#4D5BFF` · accent-soft `rgba(77,91,255,.12)` · accent-hover `#6573FF`
- success `#4FB87A` · warning `#DDA84F` · danger `#E26B6B` · info `#5B8FFF` (each with `*-soft` 12% alpha)

**Brand:** "AI Thesis" wordmark + "Investment OS" product label.
**Macro strip (curated 8):** SPX · NDX · RUT · VIX · US10Y · DXY · WTI · GOLD.
**Fonts:** Geist Sans + JetBrains Mono via `next/font/google` (NOT Geist Mono, NOT npm `geist` package).
**Numerics:** every numeric element gets `font-feature-settings: "tnum"` — utility class `.tnum` registered in globals.css.

### Auth + workflow

- Magic-link auth (Supabase), single user (Terry). No email/password.
- One Resend email per memo on `memo.status → pending_approval`. **No alert emails in Phase 1.**
- Trigger evaluator code-only in Phase 1. NO Inngest cron, NO automated alert generation. Cron lives in Phase 2.

### Data + agents

- 10 watchlist tickers seeded per blueprint Section K: NVDA, MSFT, NET, MDB, INTC, PYPL, VZ, BRK-B, SPY, QQQ. **Manual UI add** as Phase 1 acceptance step (not migration seed). 5 fully interactive: NVDA / MSFT / NET / INTC / PYPL.
- LLMRouter supports all 5 providers. **Phase 1 wires only Anthropic + Perplexity.** No OpenAI, no Google, no Haiku fallback.
- No Marketaux in Phase 1. Perplexity Sonar Pro web grounding covers news. FMP analyst ratings fetched directly via FMP client.
- SEC EDGAR User-Agent: `Thesis Terry terry@zero-in.io` (no trailing period).

### Git + Linear workflow

- **One PR per ticket against `main`**, branch `ths-N-slug`. Squash-merge.
- **PR title format:** `THS-N: <title>`.
- Linear state machine: Todo → In Progress → In Review → Done.
- Linear MCP for everything. UI-only steps require explicit click-by-click instructions for Terry.
- Migrations + auth SQL run **locally only** via `supabase db reset` against Docker. Cloud paste only at THS-14 deploy.
- Stub-first build pattern (β) for tickets with deferred external-API gates: stub-first PR opens early, follow-up commit on same branch when gate clears, single squash-merge at end.

### Build order through Phase 1

Perplexity Checkpoint #1 ✅ CLEARED.

- THS-1 ✅ · THS-2 ✅ · THS-3 ✅ · THS-4 ✅ · PR #5 ✅ · **THS-5 ✅** (squash-merged at `9a84e42` 2026-04-30)
- **THS-6 ⬜ Todo — next ticket** (Ticker detail page; `/tickers/[symbol]` + Massive aggregates + FMP fundamentals)
- THS-15 ⬜ Backlog (default-watchlist atomicity hardening — Codex P1 deferral from PR #6)
- THS-7 ⬜ Single-agent research → **Perplexity Checkpoint #2**
- THS-8 / THS-9 ⬜ Triggers
- THS-10 ⬜ Memo generation
- THS-11 ⬜ Approval flow + Resend → **Perplexity Checkpoint #3**
- THS-12 / THS-13 ⬜ Decision log + alerts
- THS-14 ⬜ Polish + prod deploy → **Perplexity Checkpoint #4**

---

## Setup state

| Tool | Status | Notes |
|---|---|---|
| Node | ✅ v24.14.1 | `.nvmrc` pins 22.11.0 for Vercel parity |
| pnpm | ✅ 10.33.2 | latest |
| git | ✅ 2.50.1 | |
| `gh` CLI | ✅ 2.89.0 | logged into `terry-zero-in`, ssh, `repo` scope |
| Supabase CLI | ✅ both brew + npm devDep | `pnpm.onlyBuiltDependencies` allows the npm postinstall |
| Local Supabase stack | ✅ `supabase start` running | Studio http://127.0.0.1:54323 · Mailpit (auth) http://127.0.0.1:54324 · DB 54322 |
| Vercel CLI | ✅ 52.0.0 | logged in as `terry-8893`, project linked |
| Docker Desktop | ✅ 4.71.0 | running |
| Chromium (headless) | ✅ via `npx playwright install chromium` | binary at `~/Library/Caches/ms-playwright/chromium_headless_shell-1217/...`. NOT MCP-attached |
| Inngest CLI | ⚠️ defer | `npx inngest-cli@latest dev` at use-time |

## Gotchas

1. **Brew `docker` cask is dead.** Current cask is `docker-desktop`.
2. ~~**macOS Full Disk Access NOT granted to Claude.**~~ **RETIRED 2026-04-29** — Bash + Read tool both successfully read `~/Downloads/Investment Portal Blueprint.md` in this session. `find ~` may still hit permissions on protected dirs but `mdfind` works as a fallback. Direct path reads work.
3. **Section H vs Section D in blueprint.** Schema is in **Section D**. Section H is "Retool vs Custom App."
4. **Tremor OSS in maintenance mode** — active product is paid Tremor Blocks. Swap for `shadcn/charts` if needed.
5. **Approval email scope is narrow.** ONE email per memo on transition to `pending_approval`. Magic-link-authed deep link.
6. **First Vercel deploy hit production target.** Future PR deploys are previews via GitHub integration.
7. **`.vercel/` is gitignored.** Re-link via `vercel link --project thesis`.
8. **AGENTS.md says "This is NOT the Next.js you know"** — Next 16 has breaking changes. Read `node_modules/next/dist/docs/`.
9. **Next 16 RENAMED `middleware.ts` → `proxy.ts`.** Function `proxy()` not `middleware()`. Codemod: `npx @next/codemod@canary middleware-to-proxy .`
10. **Next 16 `cookies()` from `next/headers` is async.** Must `await cookies()` before `.get()/.set()/.getAll()`. Server Components have read-only cookies.
11. **TypeScript installed at 5.9.3** (resolved from `^5`). Satisfies "NOT 6". Leave it.
12. **JetBrains Mono replaces Geist Mono** for numerics — permanent per DESIGN_SPEC §3.
13. **Vercel env vars are empty.** Don't pre-populate placeholders.
14. **Local `.env.local` IS populated.** Has Supabase URL, anon key, service-role key, EDGAR_USER_AGENT, **`MASSIVE_API_KEY` (chat-pasted, server-side invalidated as of S220 close per Terry — rotation NOT yet reflected on disk)**. Other API keys deferred to their tickets.
15. **Fontera Supabase is Terry's catch-all SQL paste destination.** Never paste THS-N migrations there.
16. **shadcn 4.x uses `@base-ui/react`** instead of `@radix-ui/react-*`.
17. **shadcn 4.x style is `base-nova`.** Generated components include `dark:` Tailwind variants — site needs `.dark` class on `<html>` for those to fire. Currently we don't apply `.dark`.
18. **MCP Playwright wants Google Chrome** at `/Applications/Google Chrome.app/`. Chromium-headless from `npx playwright install chromium` is NOT auto-discovered. For Claude-driven screenshots, use the chromium binary directly via Bash.
19. **Supabase `additional_redirect_urls` must include the deploy origin with `/**` glob.** Silently falls back to `site_url` with no error logged when missing.
20. **PKCE > implicit flow for SSR-rendered apps.** `@supabase/ssr` defaults to PKCE. Bare REST OTP testing hits implicit flow.
21. **Mailpit replaced inbucket as Supabase CLI's local mail UI.** Same port (54324), same purpose.
22. **`@supabase/ssr` cookie injection from CLI is hard.** Cannot easily land a valid PKCE auth cookie into chrome-headless-shell from CLI without browser automation. Authenticated-state screenshots require Playwright (out of scope per stack-list rule) or manual browser verification.
23. **`/login` returns 500 on Vercel preview pre-THS-14 by design.** `createServerClient` requires Supabase env vars; preview deploys intentionally have none. Functional verification is local Docker Supabase only. Resolves at THS-14.
24. **Verification rigor: render = built, functional = exercised.** Don't conflate. Every interactive surface (palette, dialog, form, dropdown) gets keystroke-tested before "verification clean."
25. **RHF + uncontrolled `type="number"` inputs don't reset to `undefined` reliably.** Use controlled `useState<string>` instead, parse on submit. (Surfaced THS-5 add-ticker dialog target price persistence bug.)
26. **`tickers` and `companies` are public-read tables with service-role-only writes.** Use `lib/supabase/admin.ts` for INSERT operations against either table. RLS-bound client cannot insert rows there.

## Vercel state (live)

- ✅ Project linked: `terry-8893s-projects/thesis`
- ✅ GitHub auto-deploy connected
- ✅ Latest production deploy reflects `main` at `a1c4db0`
- ✅ PR #6 preview at https://thesis-hsu71vcwu-terry-8893s-projects.vercel.app (state=success; `/login` 500s pre-THS-14 by gotcha #23)
- ⏳ Env vars: empty. Add per ticket.
- ⏳ Custom domain: not yet configured (deferred to THS-14).

## Supabase state

- ✅ Local Docker stack running, schema applied at `9142315`. All 23 tables present, RLS verified.
- ✅ `supabase/config.toml` `additional_redirect_urls` corrected to `localhost:3000/**` + `127.0.0.1:3000/**` glob.
- ❌ Cloud Supabase Pro project NOT YET CREATED (deferred to THS-14).

## Memory rules touched this session

- **NEW:** `feedback_codex_finding_triage.md` — per-PR Codex triage rule (real+cheap+contract-violating+lived → fix in-PR; real+migration → defer ticket; moot → defer to activating ticket). Re-flagged deferrals are evidence of correct triage, not new blockers. Codex never gates. Cross-project. Indexed in MEMORY.md.
- **NEW:** `feedback_doc_code_split.md` — doc IS the change → same-branch; doc summarizes (HANDOFF/PROGRESS/MEMORY) → post-merge to main; doc + spec → same-branch. Supersedes prior overgeneralized "default = same-branch." Cross-project. Indexed in MEMORY.md.
- **VERIFIED PERSISTED:** `feedback_verify_claimed_state.md` — already exists from S220, content current. Re-confirmed durability across sessions.
- **UPDATED:** `MEMORY.md` index — 2 new feedback entries added under Engineering Discipline (lines 19-20).

## Carry-forward — THS-6 pre-questions (surface to Terry at THS-6 start)

These 7 decisions need locking before THS-6 scaffolds. Order: external-API gates first, then UX choices.

1. **`FMP_API_KEY` rotation** — disk gate analogous to MASSIVE. Terry generates key → pastes into `.env.local` → file-state-wins verify before live FMP code lands. Same protocol as 2026-04-30 MASSIVE rotation.
2. **Massive aggregates endpoint shape** — confirm `/v2/aggs/ticker/{ticker}/range/...` still works post-rebrand. One-shot AAPL probe at THS-6 start.
3. **Chart timeframes** — Linear THS-6 says `1D/1M/3M/1Y`; blueprint G.3 wireframe shows `1D/5D/1M/3M/6M/1Y/All`. Pick set + default selected.
4. **"15m delayed" label scope** — chart only, or everywhere price renders (header + fundamentals)? Exact copy.
5. **Insider tab** — full deferral to Phase 2 (placeholder only) vs partial EDGAR Form 4 wiring in THS-6? Blueprint G.3 mentions Form 4s; likely Phase 2.
6. **Empty tab treatment** — placeholder copy ("Research will appear here when run") vs fetched-but-no-data design ("No memos yet")?
7. **Active Triggers panel pre-THS-8** — empty card with "No active triggers" copy, or hide entirely until THS-8 wires triggers?

## Onboarding packet for parallel Claude Chat

`~/Documents/AI-Thesis-Onboarding-Packet-2026-04-28.zip` (1.3 MB) — out of date as of THS-5 ship. Regenerate when DESIGN_SPEC or HANDOFF changes materially before sharing with Chat.

---

## Continuation note for Terry to paste to next Claude

> **Refer to `HANDOFF.md` and `PROGRESS.md` in `/Users/terryturner/Projects/thesis/` (latest docs commit on `main` — `git log --oneline main -- HANDOFF.md`) for full session context, file paths, and the NEXT 3-5 TASKS block. THS-1 through THS-5 are merged on `main` (HEAD `9a84e42`). PR #6 squash-merged 2026-04-30 with live Massive ticker validation + Q-STORAGE U + Q-NORMALIZATION B locked. THS-6 (Ticker detail page) is the next ticket; 7 pre-questions need answering before scaffolding (see "Carry-forward — THS-6 pre-questions" section). Two open Linear tickets from Codex deferrals: THS-15 (default-watchlist atomicity, P1) Backlog, THS-7 has appended AC (last-research completed_at filter, P2) Todo. Run SESSION-STARTUP SANITY CHECKS, then ASK Terry how to proceed — do not auto-assign. Chat-side handoff (Terry's `/thesis-closeout`) is source of truth for Q-lock rationale + decision archaeology + next-ticket strategy. This handoff is source of truth for repo/PR/Linear state + commit SHAs + memory file paths.**
