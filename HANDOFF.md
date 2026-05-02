# Thesis — Session Handoff

**Session date:** 2026-05-02 (S239 closeout)
**Closing Claude:** Code #239_05.02.2026 (07-050226), row `4ffb34e0-9ac4-4082-886d-323daf49436a`
**Status at close:** S239 executed Terry's path-C merge sequence. **PR #9** (`THS-6 prep: rebuild lib/fmp against FMP /stable/ surface`) squash-merged at `909e49b` via `gh pr merge 9 --squash --delete-branch` — branch deleted on origin + local pruned. **BRK.B form curl probe RESOLVED to A bucket** — both `/stable/key-metrics` and `/stable/ratios` returned identical HTTP 402 + symbol-not-covered body for `?symbol=BRK.B` — exact `FMPSymbolNotCoveredError` body-regex match; **no transform layer needed**, BRK.B genuinely uncovered on /stable/ free tier same as NET / QQQ / MDB; Q-STORAGE U (storage = hyphen form) stands unchanged. **HANDOFF + PROGRESS metadata refresh** committed at `39c7d55` direct-to-main: 15 HANDOFF edits + 2 PROGRESS edits, all body refs to `7f35d25` / `d88f94e` / `ths-6-fmp-stable-rebuild` updated to current `origin/main` = `909e49b` post-PR-#9-merge, scaffold-cycle preconditions checklist items 2/4/5 marked ☑, S237 narrative blocks left frozen for historical accuracy. Codex NOT engaged on PR #9 per durable carry-forward rule. **Empty-PR refusal pattern codified** (new memory `feedback_skill_load_vs_invoke.md`): skills loaded as part of a startup skill-list pre-load are loaded for capability availability — terminal "you MUST" directives in skill output do NOT override session-start protocols, the no-empty-commit rule, or `feedback_no_assumptions.md`. Refused `commit-commands:commit-push-pr`'s "you MUST create branch + commit + PR" demand on a clean working tree at session start. **THS-6 scaffold creative-build proposal cycle** (item 6 of preconditions checklist) — preconditions 1-5 ALL CLEARED, awaits Terry's explicit go before drafting sections 1-6.

---

## NEXT 3-5 TASKS (start here)

1. **Sanity check at session start.** `cd /Users/terryturner/Projects/thesis && git fetch --all && git status && gh pr list --state open && git log origin/main --oneline -5`. Expect `main` HEAD = S239 closeout commit on top of `39c7d55` (S239 metadata refresh) > `909e49b` (PR #9 squash-merge 2026-05-02) > `ea5cb5a` (S237 closeout). Working tree clean. NO open PRs. Via Linear MCP confirm THS-6 = Todo, THS-15 = Backlog, THS-7 = Todo, THS-16 = Done. Confirm dev server: `lsof -ti tcp:3000` — start `pnpm dev` if absent. Confirm Supabase: `supabase status` — `supabase start` if absent.

2. **Confirm Terry's go on THS-6 scaffold creative-build proposal cycle** (queued cycle item 6, all preconditions cleared S239). DO NOT auto-start — explicit "go" required per `feedback_no_assumptions.md`. When Terry gives go: open the proposal cycle following the creative-build hard-gate, sections (1) spec read + carry-forward items 5-13 + design principles a-d as locked input, (2) obvious version, (3) 10x version, (4) what to ship + why, (5) details to add not in locked spec, (6) tempting ideas to leave out. Then STOP for Terry's A/B/C calls before any code. Latest research block (carry-forward item 11) + extracted conviction badge (carry-forward item 12) are line items inside the proposal, NOT pre-approved scope. Fundamentals tab needs graceful "not available on current data plan" UI surface for `FMPSymbolNotCoveredError` cases (NET / BRK-B / QQQ / MDB) per NET decision A.

3. **Pre-flight note for THS-6 scaffold (do NOT install yet — defer until inside the proposal cycle so Terry sees the install as part of the build plan, not a side-effect):** shadcn primitives currently installed are `badge / button / command / dialog / dropdown-menu / input-group / input / label / popover / select / slider / sonner / table / textarea`. THS-6 5-tab shell will need to add: `tabs / card / tooltip / separator / skeleton / chart` (per `npx shadcn@latest add ...`). Project context (Next 16.2.4 / RSC / Tailwind v4 / `base-nova` style / `base-ui/react` primitives) was confirmed in S239's `/shadcn` skill load.

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
main:                   909e49b — feat(fmp): rebuild getKeyMetrics against /stable/ surface (#9) [squash 2026-05-02]
                            ├─ ea5cb5a — docs: closeout S237 — FMP /stable/ rebuild + THS-6 spec lock + NET decision A [direct, S237 2026-05-02]
                            ├─ 7f35d25 — docs: lock THS-6 spec carry-forward + S237 FMP coverage gaps [direct, S237 2026-05-02]
                            ├─ bd095bf — docs: HANDOFF closeout — session metadata + NEXT TASKS + Continuation note
                            ├─ 9b204e0 — docs: sync HANDOFF + PROGRESS to main reality post-DS-1 + lib clients merge
                            ├─ c72c6f2 — THS-6 prep: lib/fmp + lib/massive data clients (#8) [squash 2026-05-01]
                            ├─ 00bb968 — THS-DS-1: Re-anchor design system to Basis canon (#7) [squash 2026-05-01]
                            ├─ 9558829 — docs: HANDOFF/PROGRESS — THS-5 closeout, Step 11, Q-STORAGE U lock
                            ├─ 9a84e42 — THS-5: Watchlist CRUD with live Massive ticker validation (#6) [squash 2026-04-30]
                            ├─ 6258126 — docs: closeout S220 — THS-5 PR #6 parked, file-state-wins rule locked
                            ├─ a1c4db0 — fix(ui): rounded-md radius on command palette (#5)
                            ├─ ... (THS-1 through THS-4 + earlier docs commits)

ths-6-fmp-stable-rebuild:        DELETED on origin (squash-merged PR #9 → main at 909e49b 2026-05-02)
ths-5-watchlist:                 DELETED on origin (squash-merged PR #6 → main)
ths-ds-1-design-system-reanchor: DELETED on origin (squash-merged PR #7 → main)
ths-6-prep-data-clients:         DELETED on origin (squash-merged PR #8 → main)

Open Linear tickets:
- THS-15 — default-watchlist atomicity hardening (Backlog, Medium, Codex P1 deferral from PR #6)
- THS-7  — Single-agent research (Todo, Urgent, has appended AC for last-research completed_at filter)
- THS-6  — Ticker detail page (Todo, High; lib infrastructure prep shipped via PR #8 + rebuilt for /stable/ via PR #9 squash-merged at 909e49b 2026-05-02; BRK.B form probe RESOLVED — A bucket; page work resumes when scaffold proposal cycle opens — preconditions ALL CLEARED, awaits Terry's go)
- THS-16 — THS-DS-1 design system re-anchor (Done 2026-05-01, squashed at 00bb968)
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

### lib/massive helper consolidation (LOCKED + SHIPPED 2026-05-01 at `c72c6f2` via PR #8)

`normalizeForMassive` (hyphen→dot transform for class shares: `BRK-B` → `BRK.B`) was lifted from `lib/massive/validate-ticker.ts` (where it was a private function) into a shared module **`lib/massive/symbols.ts`**. Both `validate-ticker.ts` and the new `lib/massive/aggregates.ts` now import from `symbols.ts`. Files-travel-together (the helper lift + both consumers re-anchored) landed in the same commit per pattern-dependency-in-scope rule.

Future Massive callers must import `normalizeForMassive` from `lib/massive/symbols.ts`, **not** from `validate-ticker.ts`.

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

**Scope clarification (LOCKED 2026-05-01 — PR #8 closeout):** Files-travel-together is **token migrations only**. Pure infrastructure (API clients, helpers, types — e.g. `lib/fmp/`, `lib/massive/aggregates.ts`) ships on its own cadence as standalone PRs without invoking this rule. The rule exists because served-token surfaces must re-anchor in lockstep with the token sheet; it does not generalize to "all dependent code travels together."

Codified: 2026-05-01 in THS-DS-1 closeout (Linear THS-16).

### Codex never gates merge (LOCKED 2026-05-01 — PR #7 closeout)

Codex review is async by definition. It exists to surface latent issues over time, not to gate the merge train. Treating Codex as a gate inverts the workflow rule and stalls every dependent ticket behind a review surface that has no SLA.

- **Human approval is the only merge gate.** When Terry approves, the PR merges.
- Codex comments are addressed in follow-up tickets when convenient. If Codex surfaces something real, it becomes a new ticket. If it surfaces nits, it gets dismissed. Neither path runs through the original PR.
- Applies to every future PR, not just THS-DS-1 / THS-6 prep.

Mirrors the broader "Codex is advisory, not blocking" rule (LOCKED 2026-04-29) — this is the stronger codification.

### External-API alignment: prefer overlap-tolerant filters (LOCKED 2026-05-01 — Q-EXTENDED-HOURS)

When an external API returns data on a different alignment than your filter spec assumes (clock-aligned vs session-aligned, UTC vs ET, calendar vs trading day), prefer **overlap-tolerant** over **strict**. Losing partial-window contamination is a smaller error than losing the whole window.

**Q-EXTENDED-HOURS lock:** Massive's `timespan=hour` returns clock-aligned top-of-hour bars including pre-market and after-hours. The `&extended_hours=false` query param was probed and confirmed silently ignored — client-side filter is the only working path. Filter retains bars where ET hour ∈ **[9, 15] inclusive** (overlap-tolerant). The 9:00 ET bar's 30-min regular-session window (9:30–10:00 = opening auction) is preserved at the cost of 30 min pre-market noise. Implementation: `lib/massive/aggregates.ts` `isRegularSessionBar()` via `Intl.DateTimeFormat` with `timeZone: "America/New_York"` and `hourCycle: "h23"` (DST-aware, no new deps). Applied only when `timespan === "hour"`.

### Formatter output on touched files is in scope (LOCKED 2026-05-01 — PR #8 closeout)

`prettier --write` (or any configured formatter) on files already in scope of a commit is **in-scope by default**. Formatter output on a file you're modifying is the toolchain's declared job — not scope expansion.

The "verification: diff shows nothing else" rule is about new logic, new files, new behavior, new dependencies — not about whether the configured formatter ran on lines adjacent to your real edits. If prettier touches lines you didn't author, that's the codebase converging on its own style config, which is a feature.

**Do not force-push to revert cosmetic-only reformats on touched files.** Force-pushing introduces a force-push to the reflog where none was needed, signals to a reviewer that something was hidden (it wasn't), costs a round trip for zero functional delta, and sets a precedent that whitespace requires force-push surgery.

Cosmetic reformat on an in-scope file = ship, note in PR body. Cosmetic reformat on an out-of-scope file = revert; that's actual scope creep.

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

**Tokens (LOCKED — v2.0, Basis canon re-anchor 2026-05-01, THS-DS-1):**
- bg `#0B0C0F` (page canvas, topbar, table headers) · sidebar `#06070A` (distinct from canvas — Basis S61 lock)
- surface `#15171C` · surface-2 `#1B1E25` · surface-elevated `#22262E` (overlays/modals/tooltips/dropdowns) · surface-hover `#232730`
- border `#2A2F38` · border-subtle `#1F2229`
- intra-card divider system (three-tier): border-06 `rgba(255,255,255,0.06)` · border-08 `rgba(255,255,255,0.08)` · border-12 `rgba(255,255,255,0.12)`
- text-1 `#ECEDEF` · text-2 `#CFD3DA` (BRIGHTER — Linear bright-in-dark) · text-3 `#7A818D`
- accent `#4D5BFF` · accent-soft `rgba(77,91,255,.10)` · accent-hover `#6573FF` (Cypher Indigo — UNCHANGED)
- success `#30A46C` · warning `#F5A524` · danger `#E5484D` · info `#8B5CF6` (HUE SHIFT: blue → violet) — each with `*-soft` 12% alpha (Q13 GOLD STANDARD saturated palette)
- score-amber `#FCD34D` (score numbers <50, distinct from `--warning` to avoid same-row sync)

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
27. **FMP module compiles + lints but is NOT runtime-verified.** `lib/fmp/key-metrics.ts` shipped via PR #8 with conservative typing (10 high-confidence canonical fields). `tsc --noEmit` clean and `eslint` clean. **However:** `FMP_API_KEY` is empty in `.env.local` pending Q-FMP-KEY rotation, so `fetchKeyMetrics()` throws `"FMP_API_KEY is not set"` on first invocation. Don't let next session assume the module is verified end-to-end. Live shape verification (and any field-name additions for ambiguous metrics like roe vs returnOnEquity, freeCashFlowYield vs freeCashFlowPerShare, evToEbitda vs enterpriseValueOverEBITDA) waits until rotation lands.
28. **`source .env.local` chokes on multi-word values.** `set -a; source .env.local; set +a` errors on line 27 with `command not found: Terry` — likely an unquoted `EDGAR_USER_AGENT=Terry Turner ...` value. Standard issue with sourcing .env files in shell when values contain spaces. Doesn't block individual key extraction (`grep ^MASSIVE_API_KEY ... | cut -d= -f2-`); does block bulk env loading. Fix: quote multi-word values in `.env.local`.

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

- **NEW (S237):** `feedback_probe_before_typing.md` — When typing a third-party API client response shape, run a live probe FIRST. Documented field names lie. Cross-project. Born from FMP /stable/ rebuild surfacing 4 silent field renames + `evToEBITDA` capitalization no-doc-variant + `period` value-format flip + bad-ticker 402+symbol-language behavior — all undocumented, all caught only via probe. Indexed in MEMORY.md.
- **VERIFIED PERSISTED (S237):** `feedback_handoff_metadata_staleness.md` — ran exactly as designed at session open (HANDOFF said HEAD `9b204e0`, actual `bd095bf` — surfaced + queued for fix as item 5).
- **VERIFIED PERSISTED (S237):** `feedback_verify_claimed_state.md` — ran when Terry's HANDOFF Task 2 said line 23 for FMP_API_KEY but file showed line 24; file won; targeted by prefix-match instead of line number. No leakage.
- **VERIFIED PERSISTED (S237):** `feedback_no_assumptions.md` — applied repeatedly: project-pivot pre-action stop (basis-forecast misroute), tab-on-nonexistent-page stop (THS-6 spec lock came in as if page existed), commit strategy ask before publish.
- **VERIFIED PERSISTED (S237):** `feedback_audit_before_fork.md` — applied when updating carry-forward block (designed-for-this artifact won; updated existing items 5-8 in place rather than appending parallel items).
- **VERIFIED PERSISTED (S237):** `feedback_engine_wins_sequencing.md` — applied when surfacing why THS-6 spec lock was documentation-only (engine work resolves before page scaffold; lib/fmp had open questions that gate page rendering).

## Carry-forward — THS-6 Q-lock status (surface to Terry at THS-6 start)

External-API gates, UX choices, and design principles for THS-6. Items 1-4 (Q-locks) landed via PR #8 prep session (2026-05-01) and lib/fmp rebuild (S237, 2026-05-02 — uncommitted). Items 5-13 + design principles locked S237 (2026-05-02) as documentation-only spec lock per the `engine-wins sequencing rule` (engine resolves before page scaffold). All items below are locked decisions; THS-6 scaffold proposal cycle (creative-build hard-gate) consumes them as input.

1. **Q-FMP-KEY (Q1)** — **CLEARED + REBUILD SHIPPED + MERGED (PR #9 → `909e49b`) 2026-05-02 (S237→S239).** Key rotated to `.env.local:24` (length=33, mtime updated). Live probe revealed `/api/v3/key-metrics/{ticker}` is a deprecated endpoint (HTTP 403 + `Legacy Endpoint` body — only valid for pre-2025-08-31 subscriptions). `lib/fmp/key-metrics.ts` rebuilt against `/stable/` surface — symbol moved from path segment to `?symbol=` query param. **Shipped via PR #9 (https://github.com/terry-zero-in/thesis/pull/9) squash-merged to main at `909e49b` 2026-05-02 (S239) — Codex NOT engaged per carry-forward rule.** Live-locked field names captured: 4 silent renames vs documented (`calendarYear→fiscalYear`, `peRatio→priceToEarningsRatio`, `pbRatio→priceToBookRatio`, `pegRatio→priceToEarningsGrowthRatio`, `debtToEquity→debtToEquityRatio`); `evToEBITDA` capitalization (capital E-B-I-T-D-A) matches no documented variant; `period` response value flipped from request-mirror (`"annual"`) to fiscal-token (`"FY"`). `/key-metrics` + `/ratios` parallel-fetch via `Promise.all`, double-call accepted on free tier. New error classes (`FMPApiError` parent, `FMPPaywallError` + `FMPSymbolNotCoveredError` siblings, `FMPDeprecatedEndpointError` + `FMPMergeError`) — symbol-not-covered split from generic paywall via 402 + body regex `/value set for ['"]symbol['"]|symbol.*not available under/i`. **3 helper-based verifications via `node --experimental-transform-types` PASS** (NVDA limit=1 → 12-field shape with all populated; NVDA limit=5 → 5 periods FY-desc 2026→2022; ZZZZZZ → throws `FMPSymbolNotCoveredError`, `instanceof` chain confirmed correct). Coverage probe (10-ticker Phase 1 watchlist hyphen-form, free tier, limit=5): **NVDA / MSFT / INTC / PYPL / VZ = OK 5 periods aligned · SPY = OK 0 periods (ETF, hits `[]` no-data return) · NET / BRK-B / QQQ / MDB = FMPSymbolNotCoveredError**. **NET decision = A LOCKED 2026-05-02 (S237)** — accept the gap; Phase 1 acceptance criterion modified to "Ticker detail loads real data — Massive chart + FMP fundamentals where covered." Fundamentals tab needs graceful "not available on current data plan" UI surface for `FMPSymbolNotCoveredError` cases. BRK.B form probe RESOLVED 2026-05-02 (S239): `/stable/key-metrics` + `/stable/ratios` both returned HTTP 402 + symbol-not-covered body for `?symbol=BRK.B` — exact `FMPSymbolNotCoveredError` body-regex match. No transform layer needed; BRK.B genuinely uncovered on /stable/ free tier same as NET / QQQ / MDB. A bucket. Q-STORAGE U (storage = hyphen form) stands unchanged.
2. **Q-MASSIVE-AGGS (Q2)** — **LOCKED — client shipped in `c72c6f2` (PR #8).** `/v2/aggs/ticker/{ticker}/range/{multiplier}/{timespan}/{from}/{to}` confirmed working post-rebrand. Bearer auth, identical bar-field shape across hour/day/week timespans (`[c, h, l, n, o, t, v, vw]`). Bad-ticker returns HTTP 200 + `resultsCount: 0` (NOT 4xx — never use status code to detect "no data"). Volume `v` is fractional `number`, not int. Implementation: `lib/massive/aggregates.ts`.
3. **Q-CHART-TIMEFRAMES (Q3)** — **LOCKED 2026-05-01 — 5D / 1M / 3M / 1Y / 5Y (5 buttons).** Mapped to (multiplier=1, timespan): 5D→hour, 1M/3M/1Y→day, 5Y→week. Three Massive timespan variants total. Phase 2 may add 1D intraday + YTD/MAX. Implementation: `TIMEFRAME_MAP` in `lib/massive/aggregates.ts`.
4. **Q-EXTENDED-HOURS** — **LOCKED 2026-05-01 — overlap-tolerant filter ET hour ∈ [9, 15] inclusive.** Massive's `&extended_hours=false` param was probed and confirmed silently ignored — client-side filter is the only working path. Filter applied only when `timespan === "hour"`. See "External-API alignment" durable rule above. Implementation: `isRegularSessionBar()` in `lib/massive/aggregates.ts`.
5. **Delay label placement (LOCKED 2026-05-02 — S237).** Topbar pill = MARKET SESSION (e.g. "Open" / "Pre-market" / "Closed"). Per-price element = DATA FRESHNESS ("15m delayed" in `text-3` 11px). Freshness label co-located with each price element, not chart-only. Two distinct concerns; do not collapse.
6. **Insider tab (LOCKED 2026-05-02 — S237).** Hidden Phase 1. Full deferral to Phase 2 when EDGAR Form 4 agent wires. No placeholder tab.
7. **Empty tab treatment (LOCKED 2026-05-02 — S237).** Research History tab when empty: verb-led headline + single primary CTA + cost/time sub-line. Thesis tab when empty: verb-led headline + single primary CTA, no sub-line. Hide-don't-narrate principle applies to surfaces the user *cannot* populate (Phase 2 agents); empty-state copy reserved for surfaces they *can* (research, thesis writing).
8. **Active Triggers panel pre-THS-8 (LOCKED 2026-05-02 — S237).** Hidden until THS-8 ships trigger data model. No empty card with "No active triggers" copy — hide-don't-narrate.
9. **Tab structure (LOCKED 2026-05-02 — S237).** Final order: `[Overview, Chart, Fundamentals, Research History, Thesis]`. Insider hidden Phase 1 (item 6). Bulls/Bears NOT a tab, NOT a panel on Ticker Detail. What's Happening panel NOT rendered Phase 1 — surfaces only when News & Catalyst agent (Phase 2) wires.
10. **Memo content rendering (LOCKED 2026-05-02 — S237).** Memo content (Bulls/Bears, full agent output, synthesis prose, Bear Case) lives ONLY on Memos screen. Ticker Detail links to memos via `/memos/[id]`, never re-renders memo prose. State-machine entities render in one canonical place (see design principle (a) below).
11. **Latest research block (LOCKED 2026-05-02 — S237).** Lives on Overview tab, positioned below ticker header / price block, above Fundamentals snapshot. Single-row composition (left-to-right): conviction pill (matches Watchlist conviction logic — see item 12) + memo headline (`text-1`, 14px, weight 500, truncate at 1 line) + date in `text-3` (11px, "5d ago" relative format, or "May 2, 2026" if >30d) + right-aligned chevron-right (lucide, 16px, `text-3`). Whole row clickable → `/memos/[memo_id]`. Hover: row gets `--surface-hover` bg, chevron transitions to `text-1`. Empty state (no memo for this ticker): block hidden entirely.
12. **Conviction badge component prerequisite (LOCKED 2026-05-02 — S237).** Latest research block (item 11) requires `components/ui/conviction-badge.tsx` extracted from existing inline Tailwind in `components/watchlist/watchlist-table.tsx`. Refactor watchlist-table.tsx call-site to use it. **Sequenced as separate commit BEFORE Latest research block lands.** No re-implementation of conviction styling on Ticker Detail.
13. **Phase 2 surfaces (LOCKED 2026-05-02 — S237).** News & Catalyst, Earnings Transcript, Insider Activity, Sector & Macro = NOT rendered Phase 1. No reserved real estate, no placeholder cards, no "Coming soon" copy. Each surface ships when its underlying agent wires (Phase 2).

### Design principles (durable) — apply to "should we surface X here too?" questions

(a) **State machine objects render in one canonical place.** Memos have a state machine (draft / synthesized / pending_approval / approved / rejected / revised). Surfacing memo content on a non-Memos screen creates dual-render drift — inevitably the two surfaces diverge on transition handling. The Memos screen is canonical; other screens link, never re-render. Generalizes to any state-machine entity (decisions, audit logs, trigger events).

(b) **Don't draw surfaces for unbuilt agents.** Reserving real estate for Phase 2 features (News & Catalyst, Earnings Transcript, Insider Activity, Sector & Macro) means designing against schemas that don't exist yet. Wait until the agent wires, then design against the actual data shape.

(c) **External references inform principles, not patterns.** Fiscal.ai's tab structure exists because they don't have a memo state machine; we do. Lifting their IA wholesale ports their architectural choices into our product, contradicting our locked IA. Apply the principle (decision-relevant content one click away, source citations, audit trails) without copying the pattern (specific tab layouts, panel placements).

(d) **Hide-don't-narrate.** If a feature is unbuilt OR the user has no action they can take, omit the surface entirely. No "Coming soon" copy. No inert placeholder cards. Reserve narration only for views the user CAN populate.

### THS-6 scaffold proposal cycle — preconditions before opening

Per Terry's queued sequence (S237):
1. ☑ Run 3 FMP helper verifications (NVDA limit=1, NVDA limit=5, ZZZZZZ → FMPSymbolNotCoveredError) — **ALL PASS S237 2026-05-02**
2. ☑ Commit lib/fmp/ rebuild — **PR #9 squash-merged to main at `909e49b` 2026-05-02 (S239)** (Codex NOT engaged per carry-forward rule)
3. ☑ Resolve NET coverage decision — **A LOCKED 2026-05-02 (S237)**: accept the gap; Phase 1 acceptance criterion modified to "Ticker detail loads real data — Massive chart + FMP fundamentals where covered." UI graceful "not available on current data plan" surface for `FMPSymbolNotCoveredError` (NET / QQQ / MDB; BRK-B pending item 4 result).
4. ☑ Run BRK-B curl probe — DONE 2026-05-02 (S239). Both `/stable/key-metrics` and `/stable/ratios` returned HTTP 402 + symbol-not-covered body for `?symbol=BRK.B`. Resolution: A bucket; no transform layer needed. Q-STORAGE U stands.
5. ☑ Fix HANDOFF.md staleness — THIS COMMIT 2026-05-02 (S239). Refreshed HANDOFF + PROGRESS to current `origin/main` = `909e49b` post-PR #9 merge.
6. ☐ Open THS-6 scaffold creative-build proposal (sections 1-6 per hard-gate); items 11 + 12 above are line items inside that proposal, NOT pre-approved scope. Scaffold scope must include graceful UI for `FMPSymbolNotCoveredError` cases per NET decision A.

## Onboarding packet for parallel Claude Chat

`~/Documents/AI-Thesis-Onboarding-Packet-2026-04-28.zip` (1.3 MB) — out of date as of THS-5 ship. Regenerate when DESIGN_SPEC or HANDOFF changes materially before sharing with Chat.

---

## Continuation note for Terry to paste to next Claude

> **Refer to `HANDOFF.md` and `PROGRESS.md` in `/Users/terryturner/Projects/thesis/` for full session context, file paths, and the NEXT 3-5 TASKS block. Main HEAD = S239 closeout commit on top of `39c7d55` (S239 HANDOFF/PROGRESS metadata refresh) > `909e49b` (PR #9 squash-merged 2026-05-02 — `feat(fmp): rebuild getKeyMetrics against /stable/ surface`) > `ea5cb5a` (S237 closeout). PR #9 MERGED. NET coverage decision = A LOCKED. BRK.B form probe RESOLVED 2026-05-02 (S239): A bucket — both `/stable/key-metrics` and `/stable/ratios` return HTTP 402 + symbol-not-covered for `?symbol=BRK.B`; no transform layer needed; same gap class as NET / QQQ / MDB. THS-6 spec lock recorded in HANDOFF carry-forward (items 5-13 + design principles a-d). 13 carry-forward items + 4 design principles + 6-step scaffold-cycle preconditions checklist — items 1-5 ALL CLEARED, item 6 (open THS-6 scaffold creative-build proposal cycle) awaits Terry's explicit go. Run SESSION-STARTUP SANITY CHECKS, then ASK Terry how to proceed — do not auto-assign per `feedback_no_task_assignment.md`.**
