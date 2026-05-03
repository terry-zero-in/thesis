# Thesis — Progress Log

## Phase 1 — MVP

Per Linear team **Thesis**, project **Phase 1 — MVP**, blueprint Section I.14 (`/Users/terryturner/Downloads/Investment Portal Blueprint.md`).

### Build order (lock)

| Ticket | Title | Status | PR | Notes |
|---|---|---|---|---|
| THS-1 | Scaffold Next.js repo + design tokens | ✅ Done 2026-04-28 | [#1](https://github.com/terry-zero-in/thesis/pull/1) | Squash-merged at `94e622f`. Live at https://thesis-nu.vercel.app. shadcn init deferred to THS-3. |
| THS-2 | Supabase schema + RLS | ✅ Done 2026-04-28 | [#2](https://github.com/terry-zero-in/thesis/pull/2) | Squash-merged at `9142315`. All 23 Section D tables, RLS on every table, 11/11 RLS isolation tests passed, types/supabase.ts generated. |
| THS-3 | Magic-link auth + protected middleware + sign-in | ✅ Done 2026-04-28 | [#3](https://github.com/terry-zero-in/thesis/pull/3) | Squash-merged at `fe4cdf3`. Two Codex review cycles: P2 host-protocol fix + P1 disable-auto-signup, both landed before merge. Live at https://thesis-nu.vercel.app. |
| THS-4 | Sidebar + topnav + ⌘K palette | ✅ Done 2026-04-28 | [#4](https://github.com/terry-zero-in/thesis/pull/4) | Squash-merged at `2f5aa9e`. App shell `(app)/layout.tsx` + 10 sidebar routes + ⌘K palette + EmptyPanel. Two primitive-layer P1 fixes: `<Command>` cmdk root (`components/ui/command.tsx:63`) + selection-highlight styling (`bg-surface-hover` Tailwind utility, line 159). 6/6 functional ⌘K test passed before merge. **Perplexity Checkpoint #1 ✅ CLEARED 2026-04-29.** |
| THS-5 | Watchlist CRUD | ✅ Done 2026-04-30 | [#6](https://github.com/terry-zero-in/thesis/pull/6) | Squash-merged at `9a84e42`. Stub (`27081b5`) → live Massive validation (`442258d`) → Q-STORAGE U intent comment (`f34a545`) → throw-catch hardening (`a3a703b`). Q-NORMALIZATION B + Q-STORAGE U + Q5 isolate locked. FMP convention verified hyphen. Codex deferrals → THS-15 (P1) + THS-7 AC (P2). |
| THS-6 | Ticker detail page (chart + fundamentals) | ⬜ Todo (PR #12 DRAFT in flight, steps 2+3 shipped) | [#9](https://github.com/terry-zero-in/thesis/pull/9) MERGED + [#10](https://github.com/terry-zero-in/thesis/pull/10) MERGED + [#11](https://github.com/terry-zero-in/thesis/pull/11) MERGED + [#12](https://github.com/terry-zero-in/thesis/pull/12) DRAFT | **S242 (2026-05-02): PR-C steps 2+3 shipped to draft PR #12 on branch `ths-6-ticker-detail-page` off main `df8e8ec`.** Step 2 = route shell (`3d150ec`): 5 special files in `app/(app)/tickers/[symbol]/` — `page.tsx` (async params + case-fold permanentRedirect 308 + validateTicker→notFound + literal `<div className="px-8 py-6">Ticker: {symbol.toUpperCase()}</div>` per Q2=b corrected from misread `<main>`), `layout.tsx` (pass-through), `loading.tsx` (text placeholder, upgraded to skeleton in step 3), `not-found.tsx` ("Ticker not found" + Link to /watchlist), `error.tsx` (client component with locked Q4-revisited signature `{error, unstable_retry}` per Next 16.2.0 prop). Step 3 = surfaces (`fac7d16`): TickerHeader (symbol + companyName + primaryExchange tag + 4-state SessionPill) + PriceBlock ($XXX.XX 24px JetBrains Mono + DeltaPill + "15-min delayed") + generateMetadata (title-only per G13) + NEW `lib/market/calendar.ts` (NYSE 2026 holidays from nyse.com + getMarketSession) + NEW `lib/massive/latest-close.ts` (range-query slice, S3-Q1=γ revised at gate from a after /prev probe surfaced single-bar shape) + NEW `components/ui/delta-pill.tsx` (shared primitive, Unicode minus U+2212) + validateTicker wrapped with React.cache(). All step OUTs held: no tabs, research block, fundamentals snapshot, chart, sibling cards, breadcrumb, logo, sparkline, bid/ask, day-range, volume-vs-avg, countdown, OG image, topbar 4-state backfill (= THS-20). Verifications: tsc clean + tests 6/6 + build clean + helper math validated against raw NVDA range probe (latest c=198.45 @ Fri May 1, prev c=199.57 @ Thu Apr 30 → −1.12 / −0.56%). Verification surface = localhost:3000 (Vercel preview 500s by gotcha #23, NOT PR-C). |
| THS-16 | THS-DS-1: Re-anchor design system to Basis canon | ✅ Done 2026-05-01 | [#7](https://github.com/terry-zero-in/thesis/pull/7) | Squash-merged at `00bb968`. AI Thesis design tokens, semantic colors, intra-card divider system, and card/chart specs re-anchored to match Basis canon verbatim. v1.1 → v2.0 migration: bg/sidebar/surface hex shifts, text-2 brighter (Linear bright-in-dark), success/warning/danger more saturated, info hue shift blue→violet (#8B5CF6), `--score-amber` new. Cypher Indigo `#4D5BFF` UNCHANGED. Files-travel-together rule locked. Linear THS-16 manually moved to Done (GitHub auto-integration didn't fire). |
| THS-7 | Single-agent research (Company Research) | ⬜ Todo | — | **Perplexity Checkpoint #2: first end-to-end memo.** AC appended 2026-04-30: `/watchlist` "Last Research" must filter `completed_at IS NOT NULL` and order by `completed_at DESC` (not `created_at`). |
| THS-8 | Trigger definitions data model only | ⬜ Todo | — | |
| THS-9 | Trigger evaluator (code + tests, no cron) | ⬜ Todo | — | Phase 1 = code only. Cron is Phase 2. |
| THS-10 | Memo generation (synthesis agent) | ⬜ Todo | — | |
| THS-11 | Approval flow + Resend email | ⬜ Todo | — | **Perplexity Checkpoint #3: approval flow.** One email per memo on pending_approval. |
| THS-12 | Decision log | ⬜ Todo | — | |
| THS-13 | In-app alerts + realtime badge | ⬜ Todo | — | |
| THS-14 | Polish + production deploy | ⬜ Todo | — | **Perplexity Checkpoint #4: pre-prod.** Vercel Pro deploy. |
| THS-15 | THS-5 hardening: default-watchlist atomicity | ⬜ Backlog 2026-04-30 | — | Codex P1 deferral from PR #6. Partial unique index migration `CREATE UNIQUE INDEX ... ON watchlists (user_id) WHERE is_default = true` + atomic upsert in `lib/watchlist/actions.ts`. |
| THS-17 | Vitest unit-test infrastructure (retroactive) | ✅ Done 2026-05-02 | [#10](https://github.com/terry-zero-in/thesis/pull/10) | Squash-merged at `4554e85` S240. Retroactive Linear ticket for vitest 4.1.5 + @testing-library/react 16.3.2 + @testing-library/jest-dom 6.9.1 + jsdom 29.1.1 devDeps + vitest.config.ts (jsdom env + `@/*` alias) + vitest.setup.ts (jest-dom matchers via `/vitest` entry) + tests/smoke.test.ts + package.json `test`/`test:watch` scripts. **Surfaced gotcha #29:** vitest 4.x uses oxc as default transformer (not esbuild). |
| THS-18 | Fix `react-hooks/incompatible-library` lint error on watchlist-table.tsx | ⬜ Backlog 2026-05-02 | — | Pre-existing lint failure surfaced during PR #10 verification. Verified pre-existing via `git stash --include-untracked && pnpm lint && git stash pop`. File: `components/watchlist/watchlist-table.tsx:223` (TanStack `useReactTable`). Resolution paths (pick at ticket pickup, NOT during unrelated PR work): TanStack escape hatch / per-line `eslint-disable` / rule downgrade to `warn`. Priority Low. |
| THS-19 | Lint: `<a>` instead of `<Link>` in `app/(app)/tokens/page.tsx:182` | ⬜ Backlog 2026-05-02 | — | Pre-existing `@next/next/no-html-link-for-pages` error surfaced during PR-C step-2 verification at S242. Verified pre-existing via stash protocol. NOT bundled with THS-18 (different file, different rule, different audit trail — one ticket per (file, rule) pair). Trivial fix: replace `<a href="/">` with `<Link href="/">`. Priority Low. |
| THS-20 | Topbar market session pill: backfill 4-state parity with ticker page | ⬜ Backlog 2026-05-02 | — | THS-6 PR-C step 3 introduces 4-state pill (PRE-MARKET / MARKET LIVE / AFTER HOURS / MARKET CLOSED) on ticker detail page via `lib/market/calendar.ts` `getMarketSession()`. Topbar remains binary post-PR-C; backfill consumes same helper. **Must ship before Phase 1 close** — closes inconsistency window. Single-file change in topbar component. Priority Medium. |

### Phase 1 acceptance (Section J)

- [ ] Auth works (magic-link, single user, redirect on unauth)
- [ ] Watchlist CRUD (add NVDA in <10s, persists, conviction + target stored)
- [ ] Ticker detail loads real data (Massive chart + FMP fundamentals)
- [ ] Research runs end-to-end on NVDA in <3 min
- [ ] Memo generates ≥800 words with bear case ≥150
- [ ] Approval flow stores decision + audit row
- [ ] Rejected memo is terminal
- [ ] Decision history complete
- [ ] Audit log captures all key events
- [ ] Alert fires on research completion (in-app, no reload)
- [ ] Settings saves API keys (masked)
- [ ] Data source health visible
- [ ] No data exposed across users (RLS verified)
- [ ] Cost tracking present (per-job + monthly KPI)
- [ ] "15-min delayed" labeled everywhere

---

## Sessions

### Session 2026-05-02 (Claude Code #242_05.02.2026 — S242 — PR-C step 2 + step 3 shipped on draft PR #12)

**Focus:** Unblock PR-C step 2 (Q4-revisited re-lock + Q2 lock-drift correction); ship step 3 (TickerHeader + PriceBlock + generateMetadata + 4-state SessionPill + DeltaPill primitive + NYSE 2026 calendar). Diagnose Vercel preview 500 (NOT a regression — gotcha #23 systemic state). File two new Linear tickets (THS-19, THS-20). Surface one new durable cross-project rule (lock-drift at session boundary).

**Done:**
- **PR-C step 2 shipped to draft PR #12.** Branch `ths-6-ticker-detail-page` cut off main `df8e8ec`. 5 special files in `app/(app)/tickers/[symbol]/` (page.tsx, layout.tsx, loading.tsx, not-found.tsx, error.tsx). Q4-revisited locked = a (`unstable_retry`); Q2 corrected = b (`<div className="px-8 py-6">` matches sibling convention; parent `(app)/layout.tsx` owns `<main>`). Commit `3d150ec`. PR #12 opened DRAFT (https://github.com/terry-zero-in/thesis/pull/12) with Vercel preview live.
- **Step 2 verified locally.** tsc clean, tests 6/6, build clean (`/tickers/[symbol]` registered ƒ dynamic). curl `/tickers/nvda` from unauthed shell → 307 to `/login` (auth wall fires before page; case-fold 308 + body + not-found UI all auth-gated, deferred to Terry's eyeball). Lint: 1 pre-existing `<a>`-vs-`<Link>` error on `tokens/page.tsx:182` surfaced (not in PR-C; verified pre-existing via stash protocol; filed as THS-19). Terry's eyeball CONFIRMED via posted screenshots: /tickers/NVDA renders inside (app)/ shell with locked padding; /tickers/ZZZZZ renders not-found.tsx UI with muted "Back to watchlist" link (intentional secondary-action restraint).
- **PR-C step 3 shipped to draft PR #12.** New files: `components/ticker/header.tsx` (TickerHeader + 4-state SessionPill), `components/ticker/price-block.tsx`, `components/ui/delta-pill.tsx` (shared primitive, Unicode minus U+2212), `lib/market/calendar.ts` (NYSE 2026 holidays sourced from nyse.com + `getMarketSession()` returning "pre-market" | "open" | "after-hours" | "closed"), `lib/massive/latest-close.ts` (S3-Q1=γ revised at gate from a after pre-write probe surfaced /prev returns one bar with no prev_close field; range query slice, React.cache wrap). Modified: `lib/massive/validate-ticker.ts` (React.cache wrap), `app/(app)/tickers/[symbol]/page.tsx` (generateMetadata + render TickerHeader + PriceBlock), `app/(app)/tickers/[symbol]/loading.tsx` (skeleton matching new layout). Commit `fac7d16`. **Awaiting Terry's authed-localhost eyeball + step-4 go signal.**
- **Step 3 verified.** tsc clean, tests 6/6, build clean. NVDA helper math validated against raw API range probe: latest c=198.45 @ Fri May 1, prev c=199.57 @ Thu Apr 30 → change −1.12 / −0.56%. Pre-write doc-reads confirmed `generateMetadata` async params signature + `React.cache` import path from `"react"`.
- **Vercel preview 500 diagnosed (NOT a PR-C regression).** Terry hit `/` on preview → "Internal Server Error". `vercel logs --deployment dpl_5oZzXiaibEePnPb8bTpbvnaXizZp` showed single error log: `Error: Your project's URL and Key are required to create a Supabase client!` at `GET /`. `vercel env ls preview` + `vercel env ls production` both returned 0 vars. Source: `lib/supabase/server.ts:12-13` reading `process.env.NEXT_PUBLIC_SUPABASE_URL!` undefined on preview. Matches gotcha #23 + HANDOFF Vercel block. Same throw fires on main HEAD `df8e8ec`. Verification surface for all (app)/ routes locked = localhost:3000 with local Docker Supabase through THS-13.
- **Three Linear tickets created via Linear MCP.** **THS-19** (Backlog Low) — pre-existing `<a>`-vs-`<Link>` lint on `tokens/page.tsx:182`, NOT bundled with THS-18 per one-ticket-per-(file,rule). **THS-20** (Backlog Medium) — topbar 4-state pill backfill, must ship before Phase 1 close. (THS-17, THS-18 from S240 unchanged.)
- **One new durable memory rule (cross-project).** `feedback_lock_drift_at_session_boundary.md` — re-anchor on opener verbatim text before treating "lock conflicts" as real. Surfaced when Claude paraphrased S240's Q2 lock as `<main>` when the opener literal was `<div>`, presented a false conflict with the existing `(app)/layout.tsx` `<main>` wrap. Mitigation pattern: when surfacing a "lock conflict" in a future session, FIRST quote the opener verbatim text BEFORE treating the conflict as actionable.

**Decisions made (durable — see HANDOFF carry-forward "S242 step-3 rationale digest" for full text):**
- **Lock-drift on session boundary is a real failure mode** — paraphrase mutates between sessions; quote opener verbatim before acting on a "conflict." (NEW S242 cross-project rule.)
- **Endpoint shape probing before architectural lock.** S3-Q1=a was Terry's locked single-call /prev architecture; pre-write probe surfaced /prev returns one bar with no prev_close field. Q1 revised to γ at gate. Pattern: when an endpoint name implies a shape, probe before locking the architecture.
- **Honest filename when implementation diverges from endpoint.** `prev-close.ts` → `latest-close.ts` after probe revealed range-query implementation. Don't preserve a stale name for "consistency with the lock"; rename truthfully.
- **4-state session pill > binary on a research portal.** PRE-MARKET / AFTER HOURS earn their keep precisely because pre/post fidelity matters for institutional reads. But the 4-state pill ships on the surface where it earns its keep first (ticker page); parity backfill (topbar) ships as follow-on ticket THS-20 — surgical extension > refactor-the-world inside a feature ticket.
- **Vercel preview is NOT a verification surface for any (app)/ route through THS-13.** Locked durably. Vercel preview will 500 on every (app)/ route + `/` until THS-14 wires cloud Supabase env vars. Don't chase phantom regressions on Vercel previews.
- **Unicode minus (U+2212) for negative numbers.** Hyphen-minus reads visually different at certain font weights. Convention applies to all signed numerics.
- **`React.cache()` for any function called by both page + generateMetadata.** Explicit dedup is one line, removes the question entirely. Idiomatic Next 16.

**Verification:**
- Step 2 commit `3d150ec`, step 3 commit `fac7d16` — both pushed to `origin/ths-6-ticker-detail-page`. PR #12 OPEN as DRAFT, MERGEABLE, base main, head ths-6-ticker-detail-page.
- `pnpm exec tsc --noEmit` clean throughout both commits. `pnpm test` 6/6 pass. `pnpm build` clean.
- Vercel build status: pass (build succeeds; runtime 500 on `/` is gotcha #23 systemic state).
- Live NVDA range probe → math validated. Live AAPL `/v3/reference/tickers` probe → MASSIVE_API_KEY healthy.
- `vercel logs` confirmed single 500 in deployment history at `GET /` with Supabase-env stack trace.

**Carrying forward — PR-C next session:**
- **Terry's authed-localhost eyeball verification of step 3 PENDING.** Expected at `localhost:3000/tickers/NVDA`: NVDA — NVIDIA Corporation NASDAQ + 4-state SessionPill (current ET state) + $198.45 24px JetBrains Mono + −$1.12 (−0.56%) DeltaPill in danger-soft + "15-min delayed" 11px text-3.
- **DO NOT begin step 4 (tab strip introduction) until Terry signals "step 4 go" with explicit verification of step 3.** Per locked Q3=c cadence: step 4 will add commits to PR #12 (still DRAFT), continuing the accumulation pattern. Tab order locked at `[Overview, Chart, Fundamentals, Research History, Thesis]` (Insider hidden Phase 1).
- **THS-20 (topbar 4-state parity backfill) must ship before Phase 1 close.** Single-file consumption of `getMarketSession()`. Optionally promote SessionPill to `components/ui/session-pill.tsx` first if cross-surface reuse looks clean.

**Key gotchas surfaced this session:**
- **Massive `/v2/aggs/ticker/{ticker}/prev` returns ONE bar with no "previous close" field.** Pre-write probe revealed conventional finance "change" needs TWO bars; range query slice is the working path. The dedicated snapshot endpoint is paywalled on free tier. Workaround locked: range query with ~7-day calendar window, slice last 2 daily bars. (Gotcha #32, NEW S242.)
- **Pre-existing `<a>`-vs-`<Link>` lint error on `app/(app)/tokens/page.tsx:182`.** Surfaced during PR-C step-2 verification. Tracked as THS-19. (Gotcha #33, NEW S242.)
- **Lock-drift on session boundary is a real failure mode.** Claude misread S240's Q2 lock across the boundary. Memory rule + watch-pattern documented. (Gotcha #34 + memory `feedback_lock_drift_at_session_boundary.md`, NEW S242.)
- **Vercel preview 500 is gotcha #23 systemic state, NOT a PR-C regression.** Confirmed via `vercel logs` + `vercel env ls`. Locked: localhost is the verification surface for (app)/ routes through THS-13.

**Memory rules touched:** 1 NEW (`feedback_lock_drift_at_session_boundary.md`) + 7 verified persisted (no_assumptions, probe_before_typing extended, verify_claimed_state, minimize_friction, codex_never_gates_merge, session_tag_when_shipped, single_purpose_cleanup_commits, doc_code_split). See HANDOFF "Memory rules touched this session" for full pattern application notes.

---

### Session 2026-05-02 (Claude Code #240_05.02.2026 — S240 — THS-6 scaffold creative-build proposal cycle + PR #10 vitest infra + PR #11 ConvictionBadge → ui/)

**Focus:** Open the THS-6 scaffold creative-build proposal cycle Terry queued from S237/S239 preconditions; lock all G + GN + Q gaps; ship the two precursor PRs (vitest infra, conviction-badge promotion); run pre-write verifications for PR-C step 2 route shell.

**Done:**
- **THS-6 scaffold creative-build proposal cycle OPENED.** Sections (1)–(6) drafted following the creative-build hard-gate. Section 1 = spec read with 13 carry-forward items + 4 design principles as locked input. Section 2 = obvious version (literal spec, deliberately forgettable). Section 3 = 10x version (parallel routes per tab, ⌘K ticker switching, sticky-compacting header, inline conviction edit, macro SPX overlay, diff-mode fundamentals, click-chart-to-memo, sparklines, print stylesheet). Section 4 = ship list (5-tab shell + caching strategy table per surface + symbol normalization at route boundary + 4-5 craft details). Section 5 = micro-craft + 14 explicit gaps surfaced. Section 6 = 12 tempting ideas left out with rationale.
- **All 14 G-gaps locked (G1–G14).** Highlights: G2 Research History sub-line = `"~3 min"` only (cost dropped Phase 1 — no telemetry, hardcoded $X.XX is fake precision). G4 Empty-state CTAs ENABLE the action, wire to real endpoint, 404 → neutral toast (hide-don't-narrate applies to SURFACES, not ACTIONS). G7 Overview Fundamentals snapshot = Market Cap + P/E (TTM) + FCF Yield + Net Debt / EBITDA (NOT D/E — institutional metric). G11 Market session pill = static NYSE holiday JSON. G12 Coverage-gap copy = `"Fundamentals not available for {SYMBOL}"` + `"Coverage varies by ticker on the configured data provider."` no link, no upsell.
- **All 5 GN-gaps locked (recon surprises).** Discovered `components/watchlist/conviction-badge.tsx` already existed (HANDOFF item 12 wording was stale). GN1 = move to `components/ui/`. GN2 REVERSED G6: format `9/10` stays (denominator carries semantic value; `/honesty` applied — don't dig in when wrong). GN3 = `score: number | null` with internal null fallback. GN4 = `text-success/90` for 7-8 ramp (intentional subtle differentiation). GN5 = vitest infra rides its own PR (PR-A separate from PR-B per single-purpose-cleanup-commits).
- **PR #10 (vitest infra) shipped + merged.** Branch `chore/vitest-setup`. Squash-merged at `4554e85` on Terry's "merge it" signal. Linear THS-17 created Done retroactively, attached to PR #10. **Surfaced new gotcha:** vitest 4.x uses oxc as default transformer; `esbuild: { jsx: "automatic" }` config blocks are runtime-ignored AND tsc type errors. Removed esbuild block, oxc handles JSX automatically.
- **PR #11 (ConvictionBadge → ui/) shipped + merged.** Branch `refactor/conviction-badge-to-ui`. Squash-merged at `75613fb` on Terry's "merge it" signal post-eyeball verification of /watchlist conviction column. `git mv` auto-detected as `R` rename (74% similarity). Prop renamed `value` → `score`, type unchanged, format unchanged, tone mapping unchanged. Single `it.each` table-driven test (5 cases: scores 1/4/7/9/null) — proportional to component complexity per S240 calibration rule. Prettier reformatted ~8 cosmetic hunks on `watchlist-table.tsx` in-scope per formatter rule.
- **Two Linear tickets created.** THS-17 (Done) for vitest infra retroactive + PR #10 attachment. THS-18 (Backlog, Low) for pre-existing `react-hooks/incompatible-library` lint failure on `watchlist-table.tsx:223` (TanStack `useReactTable`); verified pre-existing via `git stash --include-untracked && pnpm lint && git stash pop` on pristine main.
- **PR-C step 2 (route shell) pre-impl approach note approved at the gate.** Q1 = `app/(app)/tickers/[symbol]/` (auth-walled). Q2 = literal `<main>Ticker: {symbol.toUpperCase()}</main>` defensive interpolation. Q3 = draft PR opens at step 2, accumulates commits step-by-step, marks Ready at step N, single squash-merge. Q4 = trust doc-read; surface only on Next 16 surprise.
- **Pre-write verifications run S240 — 3/3 done with one Q4 escape triggered.** (1) Next 16 docs read at `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/` for error.tsx, not-found.tsx, redirect — **Q4 escape triggered**: Next v16.2.0 added `unstable_retry` prop to error.tsx, recommended over legacy `reset`; behavioral diff (re-fetch vs re-render only) matters for pages that consume external APIs; 3 options (a/b/c) surfaced to Terry awaiting A/B/C lock. (2) `validateTicker` server-component compatible — pure async fn, deferred env read, `cache: "no-store"`, no module-init side effects. (3) `MASSIVE_API_KEY` LIVE on disk — length=32, mtime `2026-05-02 00:54:21`, AAPL probe HTTP 200 returned valid Apple Inc. payload. **Gotcha #14 wording about "rotation NOT yet reflected" is STALE** as of today — file-state-wins applied, gotcha rewritten.

**Decisions made (durable — see HANDOFF carry-forward "S240 G/GN/Q rationale digest" for full text):**
- **Empty-state CTA posture** generalized: hide-don't-narrate applies to SURFACES, not ACTIONS. Enabled-with-graceful-404 ages better than disabled+tooltip or stubbed+"coming soon."
- **Honesty over format**: hardcoded numbers without telemetry = fake precision; surface as time-only until real data exists.
- **Coverage-gap copy: zero upsell language** when no upsell flow exists. Single-user product copy reflects the reality.
- **Net Debt / EBITDA over D/E** for institutional/research-grade audiences.
- **Component location convention**: `components/ui/` for shared primitives across feature surfaces; `components/watchlist/`-style scoping for feature-local components.
- **Test scope calibration**: tests proportional to component complexity. Trivially-correct components earn one table-driven test, not a full RTL suite. Vitest infra earns its keep across THS-7+, not on the badge specifically.
- **Visual-delta verification on refactor commits = human eyeball, not unit-test-only.** Tailwind class strings can match while rendered DOM differs. 30 seconds in browser is cheaper and more reliable than authed-fixture builds for trivial-component refactors.
- **Branch identity is irrelevant to the pre-impl gate.** The gate locks intent before code; it can be drafted in parallel with verification work.
- **Merge ownership pattern**: Terry verifies → Terry says "merge it" → Claude executes `gh pr merge`. Verification and merge are different acts.
- **Draft-PR-with-accumulating-commits cadence** preserves both one-PR-per-ticket audit traceability AND the per-step preview surface needed for verification gates.
- **Pre-existing lint failures get tracked** as their own ticket (THS-18), not background noise.
- **Infra commits without Linear tickets violate Phase 1 audit-log discipline** — retroactive ticket creation (THS-17) is the fix.

**Verification:**
- All edits to `vitest.config.ts` post-oxc-discovery validated: `pnpm test` 1/1 (PR #10 standalone) → 6/6 (post-PR #11 with conviction-badge test).
- `pnpm exec tsc --noEmit` clean throughout PR #10 and PR #11.
- `pnpm lint` reproduced pre-existing failure on `watchlist-table.tsx:223` (THS-18) on pristine main via stash + pop verification.
- Live MASSIVE_API_KEY probe: `curl -sS -H "Authorization: Bearer $KEY" "https://api.massive.com/v3/reference/tickers/AAPL"` → HTTP 200, valid Apple Inc. payload.
- PR #10 merged at `4554e85`, branch deleted on origin. PR #11 merged at `75613fb`, branch deleted on origin. Main HEAD = `75613fb` post-pull.

**Carrying forward — PR-C next session:**
- **Q4-revisited lock REQUIRED before any error.tsx scaffolding.** Three options on the table: (a) `unstable_retry` (Claude recommendation — Next-recommended, retry actually re-fetches), (b) `reset` (legacy, no re-fetch), (c) both.
- After Q4-revisited locks: `git checkout -b ths-6-ticker-detail-page` off main `75613fb`. Create 5 shell files in `app/(app)/tickers/[symbol]/` per locked Q1–Q4 specs. Post-write 5 verification checks. Open PR-C as DRAFT.
- All Phase 2+ deferrals from Section 6 of the proposal stand: inline conviction edit, ⌘K ticker switching, sticky-compacting header, macro SPX overlay, diff-mode fundamentals, click-chart-to-memo, sparklines, print stylesheet, parallel routes per tab.

**Key gotchas surfaced this session:**
- **vitest 4.x uses oxc as default transformer** (not esbuild). `esbuild: { jsx: "automatic" }` config blocks are runtime-ignored AND `tsc --noEmit` type errors. Drop esbuild blocks; oxc handles JSX/TSX automatically.
- **Next 16 v16.2.0 added `unstable_retry` prop to error.tsx**, recommended over legacy `reset`. `reset` still works but the docs explicitly say "in most cases, you should use `unstable_retry()` instead." Behavioral diff matters for pages with external API fetches.
- **MASSIVE_API_KEY rotation IS reflected on disk** as of today (length=32, mtime `2026-05-02 00:54:21`, AAPL probe HTTP 200). HANDOFF gotcha #14 wording about "rotation NOT yet reflected" was stale through S239; rewritten S240.
- **Pre-existing `react-hooks/incompatible-library` lint failure on `watchlist-table.tsx:223`** — TanStack `useReactTable` flagged by eslint-config-next 16's new rule. Tracked as THS-18.
- **Git auto-detects `git mv`-equivalent moves as `R` rename** when content similarity ≥ 50%. PR #11 came in at 74% similarity (8-line internal `value`→`score` rename inside the moved file). Preserves history attribution cleanly.

**Memory rules touched:**
- 11 verified persisted (handoff metadata staleness, verify-claimed-state, audit-before-fork, no-assumptions, skill-load-vs-invoke, probe-before-typing extended to doc-read, formatter-in-scope, codex-never-gates-merge, single-purpose-cleanup-commits, session-tag-when-shipped, minimize-friction). See HANDOFF "Memory rules touched this session" for full pattern application notes.

---

### Session 2026-05-02 (Claude Code #237_05.02.2026 — S237 — FMP /stable/ rebuild ship + THS-6 spec lock + NET decision A)

**Focus:** Clear Q-FMP-KEY gate (key rotation + live probe), rebuild lib/fmp against /stable/ surface (post-Aug-2025 endpoint deprecation), lock THS-6 spec carry-forward, resolve NET coverage gap.

**Done:**
- **Q-FMP-KEY (Q1) cleared at file layer.** Terry rotated key to `.env.local:24`. Sed prefix-match replace, no key echo, mtime + length verified (33 chars on disk).
- **Live FMP probe surfaced /api/v3/key-metrics deprecation.** HTTP 403 + `Legacy Endpoint` body — pre-2025-08-31 subscriptions only. Pivot to `/stable/` surface locked.
- **2 endpoints probed live (NVDA annual limit=1).** `/stable/key-metrics` 47 fields, `/stable/ratios` 64 fields. Surfaced 4 silent field renames vs documented (`calendarYear→fiscalYear`, `peRatio→priceToEarningsRatio`, `pbRatio→priceToBookRatio`, `pegRatio→priceToEarningsGrowthRatio`, `debtToEquity→debtToEquityRatio`), `evToEBITDA` capitalization matching no documented variant, `period` value-format flip from request-mirror to fiscal-token (`"FY"`).
- **lib/fmp rebuilt + PR #9 OPEN at `d88f94e`.** Branch `ths-6-fmp-stable-rebuild`. `getKeyMetrics(ticker, period?, limit?)` parallel-fetch via `Promise.all`, length-zip merge with `FMPMergeError` on mismatch. Source-tagged `KeyMetric` type. Sibling error class hierarchy: `FMPApiError` parent, `FMPPaywallError` + `FMPSymbolNotCoveredError` siblings (402 split via body regex `/value set for ['"]symbol['"]|symbol.*not available under/i`), `FMPDeprecatedEndpointError` defense-in-depth, `FMPMergeError`. Rename `fetchKeyMetrics` → `getKeyMetrics`. Drop `FetchKeyMetricsResult` discriminated union (throw on failure, `[]` on no-data).
- **3 helper-based verifications PASS.** NVDA limit=1 (12-field shape with all populated, no nulls), NVDA limit=5 (5 periods FY-desc 2026→2022, P/E compression + D/E paydown trace looks legit), ZZZZZZ (throws `FMPSymbolNotCoveredError`, instanceof chain confirmed correct: subclass true, parent `FMPApiError` true, sibling `FMPPaywallError` false).
- **10-ticker Phase 1 watchlist coverage probe** (free tier, hyphen-form per Q-STORAGE U, limit=5). NVDA / MSFT / INTC / PYPL / VZ = OK 5 periods aligned · SPY = OK 0 periods (ETF, hits `[]` no-data return) · NET / BRK-B / QQQ / MDB = `FMPSymbolNotCoveredError`.
- **HANDOFF spec lock committed direct-to-main at `7f35d25`.** THS-6 carry-forward updated with 13 locked items (tab structure Overview/Chart/Fundamentals/Research History/Thesis; Bulls/Bears NOT a tab; What's Happening NOT rendered; Latest research block design; conviction badge component prerequisite; design principles (a)-(d) durable). Separate single-purpose doc commit per doc-code split rule.
- **NET coverage decision A LOCKED.** Phase 1 acceptance criterion modified to "Ticker detail loads real data — Massive chart + FMP fundamentals where covered." Fundamentals tab needs graceful "not available on current data plan" UI surface for `FMPSymbolNotCoveredError` (NET / QQQ / MDB; BRK-B pending probe).

**Decisions made (durable):**
- **Probe-before-typing rule** (NEW memory file `feedback_probe_before_typing.md`). When typing a third-party API client response shape, run a live probe FIRST. Documented field names lie. Cross-project. Born from this session's 4 silent renames + capitalization gotcha + period value-format flip + bad-ticker 402+symbol-language behavior — all undocumented.
- **Sibling error class hierarchy for distinct-fault classification.** `FMPSymbolNotCoveredError` sibling of `FMPPaywallError`, NOT subclass — preserves discrimination cleanly. Caller checking for `FMPPaywallError` won't accidentally catch symbol-not-covered.
- **`/stable/` = FMP's post-Aug-2025 replacement for `/api/v3/`.** Symbol moves from path segment to query param. Auth pattern unchanged. Documented field names disagree with actual response in 5+ places.
- **NET decision A:** accept FMP free-tier gap; modify Phase 1 acceptance criterion. Phase 1 single-user, US large-caps focus; coverage gaps acceptable. Fundamentals tab surfaces graceful no-data UI per ticker.
- **THS-6 page scaffold structurally locked but NOT approved for implementation.** Tab structure + block layouts + design principles all recorded; scaffold proposal cycle (creative-build hard-gate) consumes them as input. NOT pre-approved scope.

**Verification:**
- `pnpm tsc --noEmit` clean throughout.
- `pnpm exec eslint lib/fmp/` clean.
- 3 helper-based probes via `node --experimental-transform-types` PASS (probe script written + deleted, no stray scripts/ files).
- Coverage probe across 10 Phase 1 watchlist tickers logged in PR #9 body + HANDOFF carry-forward item 1.
- HANDOFF main commit verified via post-push `git rev-parse origin/main` = `7f35d2584ef61fd592afd830e07ac5acfd321b18`.
- PR #9 verified OPEN via `gh pr view --json` post-create.

**Carrying forward — THS-6 next (post-S239 merge sequence):**
- PR #9 squash-merged to main at `909e49b` 2026-05-02 (S239). Codex NOT engaged per durable rule.
- BRK.B single-curl probe RESOLVED S239: both `/stable/key-metrics` and `/stable/ratios` returned HTTP 402 + symbol-not-covered body for `?symbol=BRK.B`. A bucket — no transform layer needed; same gap class as NET / QQQ / MDB. Q-STORAGE U stands.
- HANDOFF + PROGRESS metadata refresh committed at `39c7d55` 2026-05-02 (S239). Direct-to-main per doc-code split rule.
- S239 closeout (this commit) refreshes HANDOFF top "Status at close" + NEXT 3-5 TASKS + Continuation note for next session.
- THS-6 scaffold creative-build proposal cycle (sections 1-6) — preconditions 1-5 ALL CLEARED, awaits Terry's go. Scaffold scope must include graceful UI for `FMPSymbolNotCoveredError` per NET decision A (NET / BRK-B / QQQ / MDB).

**Key gotchas surfaced this session:**
- `/api/v3/key-metrics/{ticker}` deprecated by FMP 2025-08-31. Any post-cutover key returns 403 + `Legacy Endpoint` body. Replacement is `/stable/key-metrics?symbol=`.
- `/stable/ratios` and `/stable/key-metrics` are distinct endpoints; original v3 `KeyMetric` typed-fields split across both. Double-call required for full coverage. Free tier 250/day has 6× headroom for single-user Phase 1.
- FMP free tier `FMPSymbolNotCoveredError` (402 + "Special Endpoint : This value set for 'symbol' is not available...") is NOT distinguished by HTTP status from real endpoint paywall. Body regex split required.
- ETF behavior asymmetric on free tier: SPY returns 200+[], QQQ returns 402+symbol-not-covered. Same asset class, different FMP coverage. Worth surfacing if Phase 1 ETF coverage matters.
- Node `--experimental-transform-types` works for class syntax + parameter properties; `pnpm dlx tsx` outside the project tree drops to CJS shape (probe failed with `does not provide an export named X`). `cd` into project + relative `.ts` import path works.
- `package.json` lacks `"type": "module"`; Node prints `MODULE_TYPELESS_PACKAGE_JSON` warning when probes import `lib/fmp/key-metrics.ts` directly. Does not affect Next.js builds. Backlogged.

**Memory rules added:**
- `feedback_probe_before_typing.md` (cross-project): live probe before typing any third-party API client response shape. Documented names lie, response shapes are truth.

---

### Session 2026-05-01 (Claude Code #234_05.01.2026 — THS-DS-1 + THS-6 prep merged: design system v2.0 live, lib/fmp + lib/massive data clients shipped, 4 new durable rules)

**Focus:** Sequence two merges into main — THS-DS-1 (PR #7, design system re-anchor work from prior session) and THS-6 prep infrastructure (PR #8, lib data clients drafted this session). Lock 4 outstanding Q-questions for THS-6 page work (Q-MASSIVE-AGGS, Q-CHART-TIMEFRAMES, Q-EXTENDED-HOURS, plus files-travel-together scope clarification).

**Done:**
- **Massive aggregates probe.** Verified `/v2/aggs/ticker/{T}/range/{multiplier}/{timespan}/{from}/{to}` works post-rebrand at base `https://api.massive.com` with Bearer auth. Three timespans probed (hour/day/week + bad-ticker error case). Bar-field shape `[c, h, l, n, o, t, v, vw]` IDENTICAL across timespans. Bad-ticker = HTTP 200 + `resultsCount: 0` (NOT 4xx). Volume `v` is fractional `number`. Status: `"DELAYED"` tier (~24h stale on hour bars at probe time — fine for swing/long horizon).
- **Q-EXTENDED-HOURS probe and lock.** Massive `&extended_hours=false` param probed and confirmed **silently ignored** (HTTP 200, identical 128 bars). Client-side filter is the only working path. Locked overlap-tolerant rule: ET hour ∈ [9, 15] inclusive (preserves 9:00 ET bar's 30-min regular-session window = opening auction). Filter applied only on `timespan === "hour"`.
- **lib/fmp module shipped at `5a3e979`.** `lib/fmp/key-metrics.ts` + `lib/fmp/types.ts` (10 high-confidence canonical fields: symbol, date, calendarYear, period, marketCap, peRatio, pbRatio, pegRatio, debtToEquity, currentRatio). Single function `fetchKeyMetrics(ticker, { period, limit })`. Mirrors `validate-ticker.ts` inline pattern: env-key guard → inline fetch → `cache: "no-store"` → manual error throw → discriminated `{ ok }` return. Ambiguous fields (roe vs returnOnEquity, FCF yield variants, EV/EBITDA variants) deferred until live probe locks them post Q-FMP-KEY rotation.
- **lib/massive aggregates shipped at `8cc5ed6`.** `lib/massive/aggregates.ts` (71 lines, under 80 sanity threshold) + `lib/massive/types.ts` + `lib/massive/symbols.ts`. `fetchAggregates({ ticker, timeframeId, refDate })` maps locked timeframes (5D/1M/3M/1Y/5Y) → (multiplier=1, timespan, from, to) → calls Massive endpoint → filters hour-timespan to regular session via `Intl.DateTimeFormat` (timeZone: America/New_York, hourCycle: h23, DST-aware, no new deps). `normalizeForMassive` lifted from `validate-ticker.ts` (where it was private) to shared `lib/massive/symbols.ts`; both files import from there in same commit (pattern-dependency-in-scope).
- **Smoke probes via tsx.** NVDA 5D = **35 bars** (matches spec ~35); NVDA 1Y = **251 bars** (spec ~250); BRK-B 1M = 21 bars (URL with `BRK.B` accepted post-normalization); ET hours present in 5D output = `[09, 10, 11, 12, 13, 14, 15]` (exact filter match); validate-ticker AAPL still resolves to "Apple Inc." / XNAS post-helper-lift.
- **PR #7 squash-merged at `00bb968`.** THS-DS-1 design system v2.0 re-anchor lands on main. Linear THS-16 manually moved to Done via Linear MCP (GitHub auto-integration didn't fire — manual move OK per protocol).
- **PR #8 squash-merged at `c72c6f2`.** Two single-purpose commits (`5a3e979` lib/fmp + `8cc5ed6` lib/massive) collapsed into one squash. Branch `ths-6-prep-data-clients` deleted on origin. Linear THS-6 stays Todo with comment noting lib infra shipped (`64d03e67…`).
- **Visual spot-check.** All 16 v2.0 hexes confirmed in `app/globals.css` (lowercase form: `#0b0c0f`, `#06070a`, `#15171c`, `#1b1e25`, `#22262e`, `#232730`, `#2a2f38`, `#1f2229`, `#ecedef`, `#cfd3da`, `#7a818d`, `#30a46c`, `#f5a524`, `#e5484d`, `#8b5cf6`, `#fcd34d`, `#4d5bff`, `#6573ff`) + 3 rgba divider tiers (0.06 / 0.08 / 0.12). Pre vs post `/login.png` (existing screenshots in `docs/design/screenshots/`): subtle cool shift on card surface, accent button + fonts identical, layout intact. Authed surfaces (/dashboard, /watchlist, /tokens, /memos) require Terry preview — redirect to /login without auth.

**Decisions made (durable — codified in HANDOFF):**
- **Codex never gates merge.** Codex is async post-merge audit. Human approval is the only merge gate. Comments addressed in follow-up tickets when convenient. Stronger codification of the 2026-04-29 "advisory not blocking" rule.
- **Files-travel-together scope clarification.** Rule applies to **token migrations only**. Pure infrastructure (API clients, helpers, types) ships on its own cadence. Prevents future drift to "everything dependent must travel together."
- **External-API alignment: prefer overlap-tolerant filters.** When an API returns data on different alignment than your filter spec assumes, prefer overlap-tolerant over strict. Locked via Q-EXTENDED-HOURS: Massive hour-timespan filter is ET hour ∈ [9, 15] inclusive (overlap-tolerant) because clock-aligned top-of-hour bars don't match session boundaries; losing partial-window contamination is a smaller error than losing the whole window.
- **Formatter output on touched files is in-scope.** `prettier --write` (or any configured formatter) on files already in scope of a commit is in-scope by default. Don't force-push to revert cosmetic-only reformats. Cosmetic reformats on in-scope files = ship + note in PR body. Cosmetic reformats on out-of-scope files = revert; that's actual scope creep.

**Verification:**
- `tsc --noEmit` (project-wide) clean across all touched files.
- `eslint` clean across `lib/massive/*.ts` + `lib/fmp/*.ts`.
- `prettier --check` clean post auto-format.
- File sanity thresholds met: `lib/massive/aggregates.ts` = 71 lines (≤80 spec); `lib/fmp/key-metrics.ts` = 39 lines.
- Smoke probe expectations matched exactly (35/251/21 bars, ET hours [9-15]).
- PR #8 CI: Vercel pass.

**Carrying forward — THS-6 next session:**
- **Q-FMP-KEY (Q1) is the only remaining external-API gate.** Terry rotates FMP key into `.env.local` → file-state-wins verify → first live probe to confirm field names (esp. roe vs returnOnEquity, FCF yield variants) → extend `KeyMetric` type if needed.
- Once Q1 clears, THS-6 page work resumes: `/tickers/[symbol]` server component scaffold, Recharts OHLCV chart consuming `fetchAggregates`, fundamentals panel consuming `fetchKeyMetrics`, header + tab shell + action bar.
- 4 UX Q-locks still pending: "15m delayed" label scope, Insider tab deferral, empty tab treatment, Active Triggers panel pre-THS-8.
- Codex review on PR #7 / #8 stays deferred (per durable rule). Address only if Terry surfaces specific items.

**Key gotchas surfaced this session:**
- `FMP_API_KEY` empty in `.env.local` (extraction returned length 0) — module compiles but throws at runtime until rotation lands.
- `set -a; source .env.local; set +a` chokes on line 27 (`command not found: Terry` — multi-word `EDGAR_USER_AGENT` value not quoted). Per-key extraction (`grep ^FMP_API_KEY .env.local | cut -d= -f2-`) works fine.
- Linear GitHub integration did NOT auto-transition THS-16 from In Review → Done after PR #7 merge. Manual move via Linear MCP `save_issue { state: "Done" }` worked. Worth a check on every PR-merge → Linear-state expectation.
- Massive returns `status: "DELAYED"` (not "OK") on aggregates — tier-tier dependent. Latest hour bar ~24h stale at probe time. Fine for Phase 1 swing/long horizon; Phase 2 real-time would need tier upgrade.

### Session 2026-04-30 (Claude Code #227_04.29.2026 — THS-5 ship: live Massive validation + Q-STORAGE U + Q-NORMALIZATION B + 2 new durable rules)

**Focus:** Resume THS-5 PR #6 from S220-parked state. Land live Massive ticker validation (step 11), close Q-STORAGE / Q-NORMALIZATION / Q5 questions, hand off Codex deferrals to follow-up tickets, squash-merge to main.

**Done:**
- **`.env.local:23` rotation gate cleared.** S220 baseline (mtime `Apr 29 07:03:08`, size `3022`, line-23 length `48`) verified unchanged at session start; Terry confirmed key-fine; AAPL probe with on-disk key returned 401 ("Unknown API Key"); Terry rotated key; new key pasted to `.env.local:23` via atomic awk-replace (mtime `Apr 29 18:23:06`, size unchanged because new key also 32 chars, length unchanged); AAPL probe HTTP 200 with verbatim `name = "Apple Inc."`. file-state-wins rule ran exactly as designed across multiple loops including Terry-said-fine override → empirical 401 contradiction → rotation.
- **Step 11 — live Massive ticker validation shipped at `442258d`.** `lib/massive/validate-ticker.ts` replaces stub with `GET https://api.massive.com/v3/reference/tickers/{ticker}` + Bearer auth + Rule B normalization (regex `/-([A-Z]+)$/` → `.$1`) + 404→`{valid:false}` + active-check + mapped fields per locked signature. 4-case smoke (`/tmp/probe-massive.mjs`): AAPL → "Apple Inc.", BRK-B → normalize → BRK.B → "BERKSHIRE HATHAWAY Class B" (verbatim), BRK.B → idempotent, ZZZZ → 404 → `{valid:false}`. All 4 PASS.
- **Q-NORMALIZATION B locked.** Replace last hyphen-suffix with dot before fetching Massive (matches Massive's `{root}.{suffix}` storage). Implementation centralized in validateTicker; not exposed to consumers.
- **Q-STORAGE U locked at `f34a545`.** `watchlist_tickers.symbol` persists user-input form (hyphen). Initial decision was C (Massive canonical, dot); FMP blocker scan reversed to U after FMP-owned URLs verified hyphen convention live (`site.financialmodelingprep.com/financial-summary/BRK-B`). Both forms cost one transform; tiebreak = user expectation + UI convention (Yahoo/finviz/FMP/Section K all hyphen). validateTicker normalizes for Massive only; persisted symbol stays user-form. 3-line intent comment at `lib/watchlist/actions.ts:34` to make the contract durable in code.
- **Q5 isolate confirmed via DESIGN_SPEC §5.5 read.** §5.5 is pure visual/layout (table chrome, column padding, sparkline dimensions) — no shared types, no shared queries, no DB-storage form. Watchlist data layer stays separate from Dashboard `WatchlistSummary`; share schema only.
- **Codex P2 throw-catch hardening at `a3a703b`.** validateTicker has 3 throw paths (missing key, 401, non-OK 5xx); addTicker now wraps in try/catch returning `{ok: false, error: "Could not validate symbol — try again."}`. Probe `/tmp/probe-throw-catch.mjs` (real Massive 401) confirmed contract.
- **PR #6 squash-merged at `9a84e42` 2026-04-30.** 4 commits: `27081b5` stub → `442258d` live → `f34a545` U comment → `a3a703b` throw-catch. Linear THS-5 → Done.
- **Codex deferrals tracked.** **THS-15 created** (Backlog, Medium) — default-watchlist atomicity P1, partial unique index + atomic upsert. **THS-7 AC appended** — `/watchlist` last-research must filter `completed_at IS NOT NULL` and order by `completed_at DESC`.

**Memory rules added:**
- **NEW:** `feedback_codex_finding_triage.md` — per-PR triage rule. Re-flagged deferrals = evidence of correct triage, not new blockers. Codex never gates.
- **NEW:** `feedback_doc_code_split.md` — doc IS change → same-branch; doc summarizes (HANDOFF/PROGRESS/MEMORY) → post-merge to main; doc + spec → same-branch. Supersedes prior overgeneralized "default = same-branch."
- **VERIFIED PERSISTED:** `feedback_verify_claimed_state.md` — already exists from S220, content current.

**Decisions made (durable):**
- Q-STORAGE rule: when boundaries are symmetric (one transform either way), pick the form matching user expectation + UI convention. Storage is for humans first.
- Codex finding triage rule: 3 buckets (real+cheap+contract-violating+lived → fix in-PR; real+migration → defer ticket; moot → defer to activating ticket). Codex never gates; Terry approval is the only merge gate.
- Doc/code split rule: ledger-type docs (HANDOFF/PROGRESS/MEMORY) commit direct to main post-merge. Spec-paired docs ship same-branch. Don't conflate.
- Pre-impl notes close on gates, not micro-decisions (already locked S220, re-applied this session — paid out).
- File-state-wins rule overrode chat-side "key is fine" claim → empirical 401 → rotation (paid out THS-5 specifically; rule re-confirmed durable).

**Verification:**
- Probes: 4-case happy-path (AAPL/BRK-B/BRK.B/ZZZZ) 4/4 PASS at `442258d`. Throw-catch probe PASS at `a3a703b`. Both reproducible via `/tmp/probe-massive.mjs` + `/tmp/probe-throw-catch.mjs`.
- `pnpm tsc --noEmit` clean throughout.
- All Codex findings on PR #6: 1 P1 (default-watchlist race) + 2 P2 (last-research stale, throw-catch). Throw-catch fixed in-PR; other 2 deferred to follow-up tickets.

**Carrying forward — THS-6 next:**
- 7 pre-questions in HANDOFF carry-forward block — answer Q-by-Q before scaffolding.
- External-API gates: FMP_API_KEY rotation + Massive aggregates endpoint shape probe.
- Build order: 4-6 commits estimated (Massive aggregates client → FMP client → server-component scaffold → Recharts chart → fundamentals panel → polish).
- DESIGN_SPEC §6.1 + §6.2 in scope; §6.3-§6.6 (memo / right rail / bear case) downstream tickets.

**Key gotchas surfaced this session:**
- macOS zsh has `status` as read-only variable — use `http`, `pre_size`, etc. instead of `status` in shell vars.
- SSH agent dropped mid-session twice; gh-token HTTPS push (`git push https://x-access-token:$(gh auth token)@github.com/...`) is the reliable fallback.
- FMP demo key rejected on profile + search endpoints; verifying ticker convention requires WebSearch on FMP-owned URLs (site.financialmodelingprep.com indexed publicly).
- Massive returns `Unknown API Key` for completely-unrecognized keys (vs `Invalid` for malformed) — useful 401 distinction for rotation diagnostics.

### Session 2026-04-29 (Claude Code #220_04.29.2026 — PR #5 merge + THS-5 stub-first build PR #6 + Massive rebrand + 2 new durable rules)

**Focus:** Merge PR #5 (radius fix), execute THS-5 stub-first build end-to-end through step 10, ship to PR #6, hold step 11 (live Massive swap) until key rotation lands on disk.

**Done — PR #5 merge:**
- `gh pr merge 5 --squash --delete-branch` clean. Fast-forward to `a1c4db0` on main. Verified `rounded-md` carried through to `components/ui/command.tsx:28+58`.

**Done — Provider rebrand absorbed:**
- Polygon.io → Massive.com on Oct 30, 2025 ([source](https://massive.com/blog/polygon-is-now-massive)). Web-search verified live. APIs/accounts/integrations backward-compatible.
- Locked: `MASSIVE_API_KEY` env var (replaces empty `POLYGON_API_KEY` placeholder), `api.massive.com` endpoint, `GET /v3/reference/tickers/{ticker}` validation path (NOT `?search=`).
- Linear THS-5 description updated: "Polygon" → "Massive (formerly Polygon)" + comment with rebrand context. `tickers.exchange NOT NULL` schema constraint surfaced — stub returns `XNAS` placeholder for stub mode.

**Done — Pre-impl note cycle (v1 → v3.1) — overcooked:**
- 7 questions surfaced; 6 locked over multiple turns by Terry; 2 (§G.2 paste + DESIGN_SPEC §5.5 review) needed source-text gates closed.
- Self-served §G.2 (lines 1266-1297) + §I.5 acceptance (lines 1871-1872) from blueprint at `~/Downloads/Investment Portal Blueprint.md` — gotcha #2 (no Full Disk Access) **retired** this session, file is readable.
- Surfaced autocomplete conflict between §G.2 (autocomplete from Massive) + Q6 lock (detail-endpoint only). Resolved by Terry: ship §I.5 minimum (validate-on-submit), defer autocomplete to THS-14 polish.
- Terry called the loop directly: *"Why are we just going in circles here and accomplishing absolutely nothing?"* New durable rule locked: pre-impl notes close on **gates**, not on every micro-decision (`feedback_pre_impl_loop.md`).

**Done — THS-5 stub-first build (steps 1-10):**
1. RLS sanity ✓ — watchlists direct user_id, watchlist_tickers EXISTS-via-watchlists, both with `(SELECT auth.uid())` perf wrap.
2. Default-watchlist app-side auto-create on first add ✓ — name `"Default"`, `is_default: true`.
3. Server-component fetch ✓ — `lib/watchlist/queries.ts` joins `watchlist_tickers × tickers × companies × investment_memos × research_jobs` via PostgREST embedding; app-side reduce picks latest memo by `updated_at` and latest research_job by `created_at`.
4. TanStack Table v8 ✓ — sortable + sticky-header columns. No virtualization yet (10-ticker scope).
5. Filters ✓ — search (symbol+name), sector dropdown (derived from data), conviction range slider (base-ui 2-thumb), memo status all/has/pending/none.
6. Add-ticker modal ✓ — `lib/watchlist/actions.ts` server action + Zod validation + stubbed `validateTicker` + service-role admin client for `tickers`/`companies` writes (those tables are public-read with service-role-only writes per RLS) + auth'd RLS-bound client for `watchlist_tickers`.
7. Remove + 4s undo toast ✓ — sonner toast w/ undo button. `removeTicker` returns row data; `restoreTicker` recreates exactly.
8. Empty / loading / error states ✓ — designed empty state ("Your watchlist is empty"), error toasts for invalid symbol / duplicate / failed-add.
9. Keyboard ✓ — `N` opens add modal, `/` focuses search input. Both skip when target is INPUT/TEXTAREA/contenteditable.
10. Acceptance run — Terry's hands. **9/9 functional checks passed in browser.**

**Bug caught + fixed during acceptance:**
- Target price field persisted across dialog opens. Root cause: RHF doesn't reliably reset uncontrolled `type="number"` inputs to `undefined`. Fix: switched target field to controlled `useState<string>` (decoupled from RHF), parse on submit. Symbol + conviction stay with RHF. (New gotcha #25.)

**Done — PR #6 ship:**
- Branch `ths-5-watchlist` cut from clean post-merge `main@a1c4db0`. Pushed at `27081b5`.
- PR #6 opened against main: https://github.com/terry-zero-in/thesis/pull/6
- `@codex review` triggered ([comment](https://github.com/terry-zero-in/thesis/pull/6#issuecomment-4344433429)) — advisory only, never gates merge.
- Linear THS-5 → In Review with PR #6 attachment linked (via Linear MCP).
- Vercel preview deploys clean: https://thesis-hsu71vcwu-terry-8893s-projects.vercel.app (state=success; `/login` 500s pre-THS-14 per gotcha #23, expected).

**Held — step 11 (live Massive swap):**
- Terry claimed rotation done + `.env.local:23` overwritten. Code re-read disk: mtime `Apr 29 07:03:08 2026` (original chat-paste timestamp), size `3022`, line-23 length `48` — **all unchanged.** Per just-locked `feedback_verify_claimed_state.md` rule: file wins, gate held, no live calls made, no second commit.
- Chat-side relayed message later asked for step-11 results assuming execution. Code surfaced the contradiction directly with attribution. Pattern logged.

**Decisions made (durable):**
- (β) is the default workflow for tickets with deferred external-API gates: stub-first PR opens early, follow-up commit on same branch when gate clears, single squash-merge at end. Continuous preview-deploy review beats locally-held work.
- Codex protocol confirmed advisory-only across THS-5 too. Never gates merge.
- Schema is source of truth — doc conflicts resolve to blueprint Section D.
- Default-on-first-action > default-on-account-creation in single-user systems.
- Never seed via migration what an acceptance test must exercise.
- YAGNI on shared abstractions until 2+ concrete consumers exist (DESIGN_SPEC §5.5 dashboard widget vs §G.2 standalone /watchlist = different shapes, share schema only).
- Phase 1 = desktop-only.
- Service-role admin client only for public-read-table writes; user-scoped writes always RLS-bound.
- Target price field is controlled state, not RHF (gotcha #25).
- Default watchlist name = `"Default"` (verbatim from §G.2 wireframe).
- Codification: 2 new cross-project feedback memory files written + indexed in MEMORY.md under Engineering Discipline.

**Verification:**
- All Codex findings on PR #5 cleared pre-merge.
- 9/9 keystroke acceptance test on PR #6 (Terry's browser).
- `pnpm tsc --noEmit` clean throughout (one round of fixes for slider-array typing + RHF resolver mismatch + sector null coercion).
- HANDOFF gotcha #2 (Full Disk Access blocked) empirically retired — Bash `ls` and Read tool both succeeded against `~/Downloads/...`.

**Carrying forward — step 11 + THS-6:**
- `.env.local:23` rotation must reflect on disk before live Massive code is written. Verify via `stat -f "%Sm size: %z" .env.local && awk 'NR==23 {print length($0)}' .env.local` against the unchanged-state baseline.
- Then: write live `lib/massive/validate-ticker.ts` mapping `results.{name,primary_exchange,type,market_cap,branding.logo_url}`. Smoke-test AAPL + BRK-B + BRK.B in parallel via `node --env-file=.env.local scripts/probe-massive.mjs`. Add normalization rule for whichever of BRK-B/BRK.B returns 200. Second commit on same branch. Second `@codex review`. Hold for Codex + Terry. Squash-merge.
- Then: cut `ths-6-ticker-detail` for `/tickers/[symbol]` page (Massive chart + FMP fundamentals + "Run Full Research" button + tabs).

**Key gotchas surfaced this session:**
- **Gotcha #2 RETIRED** — Full Disk Access works for Read tool + Bash `ls`/`stat`/`awk` against `~/Downloads/` and iCloud paths.
- **Gotcha #25 NEW** — RHF + uncontrolled `type="number"` doesn't reset to `undefined`. Use controlled `useState<string>` for optional number fields, parse on submit.
- **Gotcha #26 NEW** — `tickers` + `companies` are public-read with service-role-only writes per RLS. Use `lib/supabase/admin.ts` admin client for INSERTs.

**Memory rules added:**
- `feedback_verify_claimed_state.md` (cross-project): file state wins over claimed state when they conflict; surface conflicts with attribution.
- `feedback_pre_impl_loop.md` (cross-project): pre-impl notes close on gates, not on micro-decisions; distinguish "needs Terry's call" from "Code picks default."

---

### Session 2026-04-29 (Claude Code #212_04.28.2026 — THS-4 merge + Perplexity Checkpoint #1 + Codex protocol locked + PR #5)

**Focus:** Carry THS-4 from PR-#4-open through Codex review, functional ⌘K test, merge, Perplexity Checkpoint #1, and resolve the spec-flagged radius issue via PR #5. Lock Codex-as-advisory protocol.

**Done:**
- **THS-4 merged.** Initial Codex review on `a8b9378` flagged P1 (CommandDialog missing `<Command>` cmdk root) — fixed at `283a39e`. Functional 6-keystroke ⌘K test on `e1ff226` exposed step 3 fail (no visible selection highlight). Root cause traced through cmdk emission (correct), then Tailwind class compilation (the bug). First fix attempt `bg-[var(--surface-hover)]` was null because `--surface-hover` does not exist as a CSS variable anywhere in the cascade (only `--color-surface-hover` in `@theme` and `--accent` in `:root` semantic alias). Second attempt `bg-surface-hover` (Tailwind utility resolving via `@theme`) worked. PR #4 squash-merged at `2f5aa9e`. Linear THS-4 → Done. ths-4-shell deleted on origin.
- **Repo flipped to public** for Perplexity grading access (`gh repo edit terry-zero-in/thesis --visibility public`). Reversible.
- **Perplexity Checkpoint #1 ✅ CLEARED.** Two findings actioned: (1) `rounded-xl!` (~11.2px) violates DESIGN_SPEC §7.9 / §9.3 — fixed via `rounded-md` (6.4px) at `components/ui/command.tsx:28+58`. (2) `CommandItem` value-prefix pattern was claimed to break "dashboard" search — empirical test proved cmdk's substring-fuzzy filter handles it; Perplexity retracted. Section-pollution side issue (typing "work" matches all WORK items) attempted via cmdk `keywords` prop; functional test (cases 2 + 3) failed; reverted; deferred to THS-14 polish backlog with Linear comment containing test results, hypothesis, alternative path.
- **PR #5 opened** (`b10b959`) with Fix 1 (radius) only. Codex cleared ("Breezy!"). Open against main awaiting Terry's merge call.
- **Codex protocol LOCKED 2026-04-29 — advisory, not blocking.** New rule: Codex reviews are a third pair of eyes; never gate merge. Initial-review P1s addressed in same branch; post-fix push does NOT wait for re-review; only Terry's approval gates merge. Applied via docs commit `cc342ea` to `main` with HANDOFF.md updates (SESSION-STARTUP SANITY CHECKS section 2 + new Locked decisions subsection + continuation note).

**Process (durable rules established):**
- **Branch creation = ticket start.** Perplexity-checkpoint-gated tickets stay blocked until checkpoint passes AND Terry says go — even if a separate instruction reads as "start now." A mid-session course-correction wrongly flagged `ths-5-watchlist` as unauthorized; Terry reversed after confirming Perplexity had authorized. Lesson logged: `ths-5-watchlist` was deleted, recreated as `fix-cmd-palette-radius` for the radius fix; THS-5 stays uncut until post-PR-5-merge main per the workflow lock.
- **Token-first principle:** never invent radii/fonts/tokens. Arbitrary `[Npx]` only when spec demands precision the `@theme` scale can't express AND that gap is explicitly confirmed.
- **Literal vs intent rule for wrapped components:** if a component is clipped/wrapped by a parent in every consumer (e.g., `Command` inside `DialogContent` with `overflow-hidden`), an instruction to fix component X implies "fix parent too" unless explicitly literal — surface the wrapper, default to intent.
- **VERIFY BEFORE ASSUMING precision claims:** open the `@theme` block, read the actual value before asserting "X = Y exactly." Caught the `rounded-md` = 6.4px (not 6px) override via `@theme inline { --radius-md: calc(var(--radius) * 0.8) }` with `--radius: 0.5rem`.
- **Two-strike rule on external authority claims:** when a source has been wrong once on a specific subsystem within a session, a second proposal from the same source on the same subsystem requires verification before committing — not just empirical test after applying.
- **Handoff documents are point-in-time snapshots.** Authorization state moves between sessions. Before flagging a branch or ticket-state as "unauthorized" based on handoff text, ask Terry to confirm current state.

**Verification:**
- All Codex findings on PR #4 commits resolved (P1 cmdk root, P2 host-protocol, P1 auto-signup; selection-highlight not a Codex finding but a Terry functional-test catch).
- 6/6 keystroke ⌘K test passed on `e1ff226` pre-merge (proving palette functional at primitive layer).
- `pnpm tsc --noEmit` clean throughout.
- Perplexity grading on Checkpoint #1 cleared after the two findings either fixed or properly deferred.
- Codex auto-fired on PR #5 within ~2min of `@codex review` nudge — "Didn't find any major issues. Breezy!" No P-findings on `b10b959`.

**Carrying forward — THS-5:**
- Linear THS-5 = `In Progress`. No branch yet. PR #5 open in parallel.
- Two open decisions before code action: (a) PR #5 merge timing, (b) Polygon API key for `.env.local`.
- Acceptance per Linear THS-5 ticket: `WatchlistTable` (TanStack Table) + Add-ticker modal with Polygon symbol validation + `watchlist_tickers` Supabase CRUD. Done when: NVDA/MSFT/NET add, NVDA remove, NVDA re-add, persists on refresh.

**Decisions made:**
- Codex = advisory only. Locked. Documented in HANDOFF.
- THS-14 backlog: investigate cmdk `command-score` weights for section-scoped search (not blocking spec compliance, deferred per Perplexity's "cosmetic" framing). Linear comment on THS-14 has full test-result table + hypothesis + alternative path (custom `filter` prop on `<Command>` root).
- HANDOFF.md `SESSION-STARTUP SANITY CHECKS` section generalized — no longer references `gh pr view 4`. Polls `gh pr list --state open` instead.

**Key gotchas surfaced this session:**
- Tailwind 4 `@theme inline` calc overrides default token resolution. `rounded-md` is NOT `0.375rem` (Tailwind v4 default); it's `calc(0.5rem * 0.8)` = 6.4px in this codebase. Verify the `@theme` block before claiming a precision value.
- `bg-[var(--TOKEN)]` only works if `--TOKEN` is declared at runtime in `:root` or an ancestor. Tailwind's `@theme` block declares `--color-TOKEN` (note prefix), not `--TOKEN`. Use the Tailwind utility name (e.g., `bg-surface-hover`) which resolves via `@theme`, OR use the shadcn semantic alias (e.g., `bg-accent`) which resolves via `:root`.
- shadcn 4.x `base-nova` style ships `rounded-xl!` on `Command` and `DialogContent`. Off-spec for designs with strict 6px panel radius. Sweep similar shadcn-generated primitives for radius compliance when added.



**Focus:** Address Codex review feedback on THS-3, merge it, then build + ship THS-4 (app shell — Perplexity Checkpoint #1).

**Done — THS-3 (review-cycle through merge):**
- Codex P2 (host-protocol fallback at `app/login/actions.ts:31`) addressed at `aeb69ca`. Replaced unconditional `https://${host}` with `x-forwarded-proto`-aware origin reconstruction. Same trap as gotcha #19 but at the call-site layer.
- Codex P1 (auto-signup at `app/login/actions.ts:37`) addressed at `9aa1550`. Added `shouldCreateUser: false` to `signInWithOtp` options. Verified at the GoTrue REST layer — `POST /auth/v1/otp` with `create_user:false` returns `422 otp_disabled` and creates zero `auth.users` rows. Phase-1 single-user lock honored.
- PR #3 squash-merged at `fe4cdf3` on `main`. Local `ths-3-auth` cleaned up. Vercel auto-deployed `main`. Linear THS-3 → Done with merge-commit attachment.

**Done — THS-4 (app shell — full ticket end-to-end):**
- `app/(app)/` route group with `layout.tsx` (server component, `getUser()` defense + `CommandPaletteProvider` + grid).
- Move `app/dashboard` and `app/tokens` into `(app)/` (auth-gated, framed by shell). `/login` and `/auth/callback` stay outside.
- 9 new stub pages under `(app)/`: watchlist, research-queue, triggers, opportunities, memos, decisions, portfolio, workflows, settings. Dashboard rewritten — sign-out treatment removed (now in palette), identity moved to topbar avatar.
- `components/shell/` — `nav-config.ts` (single source for 10 nav items + Lucide icons), `topbar.tsx` (server, 48px, brand + ⌘K trigger + live-market pulse + counts + initials), `sidebar.tsx` (client, `usePathname` active state, 2×16 accent bar at `left:-8`), `command-palette.tsx` (client, global Cmd/Ctrl+K listener, navigates 10 routes + Sign Out via `signOut` server action through `useTransition`), `command-palette-trigger.tsx`, `empty-panel.tsx` (DESIGN_SPEC §9 panel pattern).
- shadcn add: `command`, `dialog`, `input-group`, `textarea` (base-nova style, `@base-ui/react` primitives).
- Empty-state copy specific per route, sentence case, no ticket refs in user-facing text. 7 of 10 strings authored locally, 3 verbatim from Terry.
- DESIGN_SPEC §4.3 refreshed to 10-route nav (was 8 — drift between SoT and ticket scope reconciled in same commit).
- HANDOFF gotchas #23 (`/login` 500 on Vercel preview pre-THS-14 by design) + #24 (verification rigor — render ≠ functional).
- PR #4 opened at `a8b9378`. Codex P1 returned: shadcn 4.x `CommandDialog` dropped the `<Command>` cmdk root that older versions had — palette rendered green on the curl matrix but was structurally non-functional (no input filtering, no arrow nav, no Enter selection). Fixed at the primitive layer at `283a39e` (`<Command>{children}</Command>` inside `DialogContent`). Codex re-review pending at session close.

**Verification:**
- `pnpm tsc --noEmit` clean (post-build, validator regenerated)
- `pnpm build` clean — 14 routes (10 sidebar + /, /_not-found, /auth/callback, /login, /tokens), Turbopack, no edge-runtime errors
- Unauth redirect matrix passes for all 11 protected routes (curl)
- API-layer verification on THS-3 P1: GoTrue `422 otp_disabled` + zero new rows on unknown email
- Functional ⌘K verification PENDING — Terry's hands; 6 keystroke checks named in HANDOFF Task 3

**Decisions made:**
- Linear ticket text wins on ambiguity over DESIGN_SPEC §4.3 drift; update SoT in same PR that exposes the drift (THS-4 → 10 routes, Linear was right, DESIGN_SPEC was 8-stale).
- Single trust boundary > convenience: `/tokens` moved into `(app)/` even though it's a dev-utility page.
- Empty-state copy is descriptive, not narrative. Trim trailing causal clauses ("…as research runs and decisions are recorded" → just "…appear here.").
- Render-only verification ≠ functional verification. The shadcn `CommandDialog` shipped green on `gh pr view` matrix but never worked — caught only by Codex's structural review of the cmdk API. New gotcha #24 locks the rule.
- `/login` 500 on Vercel preview pre-THS-14 is by design — `createServerClient` requires Supabase env vars that don't exist on preview. Defer-and-document policy for any env-dependent feature broken on preview before THS-14. Gotcha #23.
- Patch shadcn primitive at the source for the cmdk root fix, not at the consumer level — every future palette/dialog inherits the fix; consumer-level wrap leaves a latent bug.
- Sign-out moved out of dashboard body and into the ⌘K palette via `signOut` server action wrapped in `useTransition`. Identity moves to topbar avatar (initials from email local-part, first 2 chars uppercased).

**Carrying forward:**
- PR #4 awaiting (a) Codex re-review verdict on `283a39e` (b) Terry's functional ⌘K browser test (c) merge.
- After merge: Perplexity Checkpoint #1 — Terry runs THS-4 build through Perplexity for spec compliance grading. THS-5 BLOCKED until then.
- Vercel preview deploy still erroring on commit-author-email mismatch — DEFERRED, doesn't block `main` auto-deploy.

**Key gotchas surfaced this session:**
- shadcn 4.x `CommandDialog` is missing the `<Command>` cmdk root that older versions had. Patch the primitive at source, not at consumer (gotcha conceptually documented in commit; not a HANDOFF gotcha because it's now fixed).
- HANDOFF gotcha #23: `/login` 500 on Vercel preview pre-THS-14 by design.
- HANDOFF gotcha #24: render-only verification is not functional verification. Don't mark green from a curl matrix when the surface has interactive elements.

### Session 2026-04-28 (Claude Code #206_04.28.2026 — THS-3 ship)

**Focus:** Land THS-3 end-to-end (magic-link auth + protected proxy + sign-in/sign-out) and open PR for review.

**Done — THS-3:**
- `proxy.ts` at repo root (Next 16 routing layer; not `middleware.ts`). Wraps `updateSession` from `lib/supabase/proxy.ts`. Public paths: `/login` + `/auth/callback`. Authed → `/login` redirects to `/dashboard`; unauth → protected redirects to `/login`. Copies rotated supabase cookies onto redirect responses per `@supabase/ssr` guidance.
- `app/login/page.tsx` + `login-form.tsx` + `actions.ts`: server component redirects authed → `/dashboard`, client form uses React 19 `useActionState` for three states (idle / error / success), server action `signInWithMagicLink` validates email + calls `signInWithOtp` with `emailRedirectTo` `/auth/callback?next=/dashboard`.
- `app/auth/callback/route.ts`: `exchangeCodeForSession` + allow-listed `?next=` validation. Errors redirect to `/login?error=...`.
- `app/page.tsx`: auth-aware redirect, no render.
- `app/dashboard/page.tsx`: `getUser()` defense + inline `Signed in as <email> · Sign out` treatment with `--text-2` on the sign-out control.
- `lib/auth/actions.ts`: `signOut` server action — `signOut` → `revalidatePath("/", "layout")` → `redirect("/login")`.
- **Real find caught + fixed:** `supabase/config.toml` `additional_redirect_urls` was `["https://127.0.0.1:3000"]` only (https-only, no path glob, no `localhost`). Supabase silently falls back to `site_url` with no error logged — magic links would have landed on the wrong path. Fixed with `http://localhost:3000/**` + `http://127.0.0.1:3000/**`. Documented as HANDOFF gotcha 19. PKCE vs implicit-flow distinction documented as gotcha 20.
- HANDOFF.md + PROGRESS.md inbucket → Mailpit naming (Supabase CLI swapped UIs in a recent release).
- PR #3 opened against `main` at `49b1221`. Linear THS-3 → In Review with PR link attached.

**Verification:**
- `pnpm tsc --noEmit` clean
- `pnpm build` (Turbopack) clean — route table shows `/`, `/auth/callback`, `/dashboard`, `/login`, `/tokens`, `/_not-found` + `Proxy (Middleware)`. No edge-runtime errors.
- Unauth redirect matrix passes for all 5 routes (curl)
- `/login` renders per DESIGN_SPEC tokens (1440×900 chromium-headless screenshot)
- Magic-link → callback → `/dashboard` (authed, email displayed) → sign-out → `/login` round-trip verified manually in Terry's browser

**Decisions made:**
- `proxy.ts` is routing UX only — defense-in-depth via `supabase.auth.getUser()` at every protected component boundary, RLS as the final wall.
- Next 16 runtime for `proxy.ts` = Node.js (edge runtime not supported in Proxy).
- Sign-out lives at `lib/auth/actions.ts` (not co-located on /dashboard) — reusable when other pages need it later.
- No Playwright in this ticket. Stack additions outside the locked HANDOFF list are discrete tickets, not feature-ticket sneak-ins.
- `?next=` allow-list (currently only `/dashboard`) — no echo of user-controlled redirect URLs.
- PKCE > implicit flow — `@supabase/ssr` defaults correctly; bare REST OTP testing is misleading because it hits implicit flow.

**Carrying forward — THS-4 next:**
- Sidebar + topnav + ⌘K command palette per blueprint Section L navigation.
- App shell layout at `app/(app)/layout.tsx` (route group), wraps protected routes.
- ⌘K via shadcn `command` + `dialog` primitives (need to add). Static command list for THS-4.
- **Perplexity Checkpoint #1 stops here** — do not proceed to THS-5 until Perplexity grades against the blueprint.

**Key gotchas surfaced this session:**
- Supabase `additional_redirect_urls` requires `/**` glob; silently falls back to `site_url` if missing. Re-check on every deploy URL change. (Gotcha 19.)
- PKCE flow is what `@supabase/ssr` uses; the bare OTP REST endpoint defaults to implicit flow. Always test through the SDK or actual form. (Gotcha 20.)
- `@supabase/ssr` PKCE auth cookies cannot be injected into chrome-headless-shell from CLI without browser automation. Authenticated-state screenshots require manual browser verification or Playwright. (Gotcha 22.)

### Session 2026-04-28 (Claude Code #202_04.28.2026 — THS-2 ship + THS-3 partial)

**Focus:** Land THS-2 end-to-end (Supabase schema + RLS) and merge. Begin THS-3 (auth + sign-in + middleware) — paused mid-flight to save state for next session.

**Done — THS-2:**
- Surfaced and resolved a pre-flight conflict: HANDOFF.md's 11-table shorthand list disagreed with blueprint Section D's 23-table spec on table count, names (`watchlist_items`/`memos`/`audit_log` vs `watchlist_tickers`/`investment_memos`/`audit_logs`), and the existence of `cost_events`. Terry locked Section D as canonical; `cost_events` dropped; cost tracking lives on `agent_outputs.cost_usd` + `audit_logs.metadata` JSONB.
- Wrote `supabase/migrations/20260428111056_initial_schema.sql` — 23 tables in topological order, 30+ indexes including the 5 EXISTS hot-path indexes Terry called out, `update_updated_at()` trigger attached to 12 tables that have `updated_at`, `handle_new_auth_user()` SECURITY DEFINER trigger on `auth.users` syncing new signups to `public.users`.
- RLS ENABLED on all 23 tables: 17 user-owned with `(SELECT auth.uid()) = user_id` (EXISTS-subquery on six child tables: `watchlist_tickers`, `agent_outputs`, `memo_versions`, `trigger_events`, `decision_logs`, `thesis_checkpoints`); 6 public-read (`tickers`, `companies`, `data_sources`, `price_snapshots`, `fundamentals_snapshots`, `source_documents`) with `SELECT USING (true)`.
- Verified locally via `supabase db reset` (Docker stack at port 54322): 23/23 tables, 23 policies, 13 triggers (12 updated_at + 1 auth-sync). Two-user RLS isolation test passed 11/11 — cross-user reads return 0, INSERTs with foreign user_id and EXISTS-protected child inserts both blocked with `42501 row-level security policy`, UPDATE on cross-user rows is no-op, anon SELECT on public-read tables works, anon writes blocked.
- Generated `types/supabase.ts` (1410 lines, all 23 tables typed). `pnpm tsc --noEmit` clean.
- PR #2 squash-merged at `9142315`. Linear THS-2 → Done.

**Done — THS-3 (partial, on `ths-3-auth` at WIP `0fd5152`, NOT pushed):**
- shadcn 4.5.0 init against Tailwind v4 — generated `components.json` (style: `base-nova`), `lib/utils.ts` (`cn` helper), and appended `@custom-variant dark`, `@theme inline` mapping, `:root` block, `.dark` block, and `@layer base` to `app/globals.css`.
- Replaced shadcn's generated `:root` light-mode oklch defaults with HANDOFF.md's locked token mapping (16 named + 14 Phase 1 placeholders). Removed `.dark` block (site always dark). HANDOFF trap honored: shadcn's `--accent` mapped to `--surface-hover` (#1F232B), NOT brand `--accent` (#4D5BFF).
- `npx shadcn add input label` — generated `components/ui/{button,input,label}.tsx`. shadcn 4.x uses `@base-ui/react` (Radix's open-source successor) instead of `@radix-ui/react-*`.
- Visual-verified primitives on `/tokens` page via headless Chromium screenshot (chromium-1217 at `~/Library/Caches/ms-playwright/`). Button renders `--primary` blue, Input renders with `--border` outline, all 5 Button variants visible.
- Read Next 16 docs: confirmed `middleware.ts` is **renamed to `proxy.ts`** in Next 16 (function `proxy()` not `middleware()`) and `cookies()` from `next/headers` is **async** (returns Promise). Captured both as gotchas in HANDOFF.
- Wrote Supabase SSR utilities: `lib/supabase/client.ts` (createBrowserClient<Database>), `lib/supabase/server.ts` (createServerClient with awaited `cookies()` and Server-Component-safe try/catch on setAll), `lib/supabase/proxy.ts` (`updateSession` helper implementing the @supabase/ssr getAll/setAll cookie-rotation dance).

**Carrying forward — THS-3 pending:**
- `proxy.ts` at repo root with the protected/public routing decision tree
- `app/login/page.tsx` + magic-link server action calling `signInWithOtp`
- `app/auth/callback/route.ts` doing `exchangeCodeForSession`
- `app/page.tsx` auth-aware redirect (no content render)
- Sign-out server action wired to `/dashboard` placeholder
- Middleware redirect-matrix test, Mailpit (formerly inbucket) E2E test, sign-out test
- Branch push, PR creation, Linear → In Review

**Decisions made:**
- Schema source-of-truth = blueprint Section D, not Section H. HANDOFF's 11-table shorthand list is stale.
- No `cost_events` table — agent_outputs.cost_usd + audit_logs.metadata covers Phase 1 acceptance "cost tracking present per-job + monthly KPI."
- EXISTS-subquery RLS on child tables, no denormalized `user_id`. Single-tenant Phase 1 makes EXISTS perf cost irrelevant.
- `(SELECT auth.uid())` wrap per Supabase performance guidance.
- `workflow_runs` has no `user_id` per Section D — Phase 1 single-user permissive policy; tighten in Phase 5.
- Sign-in route is `/login` (override of `/sign-in` default). Linear ticket text says "/app/login page" → ticket text wins on routes/copy.
- Protected scope: gate everything except `/login` + `/auth/callback`. `/` redirects to `/dashboard` if authed, `/login` if not.
- No signup gating in dev. RLS bubble is the defense; allow-list deferred to THS-14.
- Site always dark — single `:root` block in globals.css, no `.dark` toggle, no `dark` class on `<html>`. Accept slightly less polished destructive/ghost shadcn variants.
- Cloud paste discipline: migrations + auth SQL run **locally only** via `supabase db reset` against Docker. Cloud paste only at THS-14 deploy. (During THS-2, Terry pasted the migration into his Fontera Supabase scratchpad before realizing it should be local-only. Surgical rollback dropped the 23 Thesis tables + my `handle_new_auth_user`. Fontera's own `handle_new_user` was untouched. **Lesson: never paste THS-N migrations into Fontera.**)

**Key gotchas surfaced this session:**
- Next 16 renamed `middleware.ts` → `proxy.ts`, function `proxy()` not `middleware()`. Source: `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`. Codemod available: `npx @next/codemod@canary middleware-to-proxy .`
- Next 16 `cookies()` is async — `await cookies()` before any `.get()/.set()`. Source: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cookies.md`
- shadcn 4.x init bundles a Button by default during init — not just init-only as expected. style picked is `base-nova`, primitives are `@base-ui/react` not `@radix-ui/react-*`.
- MCP Playwright wants Google Chrome at `/Applications/Google Chrome.app/...`. Chromium-headless from `npx playwright install chromium` is NOT auto-discovered. For Claude-driven screenshots, invoke the chromium binary directly via Bash.
- pnpm 10's deny-list blocks the `supabase` CLI npm package's postinstall by default. Fix: add `"pnpm": { "onlyBuiltDependencies": ["supabase"] }` to `package.json`.

### Session 2026-04-28 (Claude Code #201_04.27.2026 — THS-1 ship)

**Focus:** Land THS-1 end-to-end (design lock + scaffold + tokens + Vercel) and merge.

**Done:**
- **Design system locked.** `docs/design/DESIGN_SPEC.md` v1.0 written (490 lines, 12 sections). Source-of-truth tokens, app shell, component patterns, motion specs, extension rules, Tailwind v4 `@theme` block, /tokens page contents.
- **Design refs committed.** 4 CleanShot screenshots + 2 Claude Chat HTML mockups + 392-line CSS token sheet at `docs/design/`.
- **Token decisions resolved (6/6 from spec):** brand text-only "AI Thesis" + product label "Investment OS"; macro strip curated to 8 (SPX/NDX/RUT/VIX/US10Y/DXY/WTI/GOLD); JetBrains Mono for numerics (overrides Geist Mono); Snooze button soft fill; per-ticket empty/loading/error state discipline.
- **OLD tokens RETIRED:** the `#121415 / #2E5BFF / #3FB950 / #F0B72F / #E5484D / #8b5cf6` set from earlier HANDOFF is dead. New canonical tokens: bg `#0A0B0E`, surface `#14161B`, accent `#4D5BFF`, success `#4FB87A`, warning `#DDA84F`, danger `#E26B6B`, info `#5B8FFF`.
- **Next.js 16.2.4 scaffold landed** via `create-next-app` with rsync clobber-protection on commit #1 files. New scaffold artifacts: AGENTS.md (Next 16 agent guidance) + CLAUDE.md (`@AGENTS.md` import).
- **Tailwind 4 `@theme` block** in `app/globals.css` with all 20 tokens. Body atmosphere gradients per spec §2. `pulseLive` keyframes per spec §7.5. `prefers-reduced-motion` respected globally. Subtle 8px scrollbars. `@utility tnum` for tabular numerics.
- **Geist Sans + JetBrains Mono** wired via `next/font/google`. Pinned: next 16.2.4, react 19.2.4, ts 5.9.3, tailwindcss 4.2.4, prettier 3.8.3.
- **`/tokens` verification page** (`app/tokens/page.tsx`, 522 lines): 20 swatches, 9-step type ladder, 7 numeric tabular rows, 4 severity levels (dot+pill+bar+halo), 5 reco pills, conviction ticks 0-10, live pulse indicator, 12-step spacing scale, 6-step radius scale.
- **`/dashboard` placeholder** for strict acceptance (5 lines).
- **Prettier 3.8.3** + `.prettierrc` + `.prettierignore` + `format` / `format:check` scripts.
- **Vercel linked** (`prj_5T2AVhcZLqcaASZwoiWdwTtxGFZP`, GitHub auto-deploy connected). First deploy hit production target by Vercel default — `https://thesis-nu.vercel.app`.
- **PR #1 merged** at `94e622f` (squash). All 3 routes (`/`, `/dashboard`, `/tokens`) returned 200 with verified content. Linear THS-1 → Done.
- **HANDOFF.md updated** with shadcn token mapping pre-locked for THS-3 (16-row table) so init becomes execution work.
- **Onboarding packet shipped** for parallel Claude Chat: `~/Documents/AI-Thesis-Onboarding-Packet-2026-04-28.zip` (1.3 MB, all Tier 1 + 2 artifacts).

**Carrying forward:**
- THS-2 next: Supabase schema + RLS per blueprint **Section D** (not H). Local Supabase via Docker, then RLS policies on every table. Magic-link auth pattern: `auth.uid() = user_id` on user-owned tables; public-read on `tickers` / `companies` / `data_sources`.

**Decisions made:**
- shadcn init deferred from THS-1 to THS-3 — config-by-principle without components to validate against = wasted work; bundling init + first components (button/input/label) at the sign-in page gives natural validation.
- shadcn token mapping pre-locked in HANDOFF.md (trap noted: shadcn's `--accent` is hover/secondary surface, not brand accent — must map to `--surface-hover`).
- `.vercel/project.json` left gitignored per Vercel's own README recommendation. Linkage recoverable via `vercel link --project thesis` (5s op).
- TypeScript pinned at 5.9.3 (resolved from `^5` at install) — satisfies HANDOFF "NOT 6" rule, downgrade to 5.7.3 only if needed.
- `next/font/google` for Geist Sans (overrides HANDOFF's plan to use `geist@1.7.0` npm package — same font, less boilerplate, matches Next 16 docs example).

### Session 2026-04-24 → 2026-04-27 (Claude Code #184_04.24.2026 — Phase 1 kickoff)

**Focus:** Plan validation + scaffold initiation for THS-1.

**Done:**
- Read full blueprint end-to-end (2,483 lines, sections A–N).
- Validated and locked plan with Perplexity across 10 questions — see HANDOFF.md "Locked decisions" for the full list.
- Pre-flight: confirmed `gh` logged into `terry-zero-in`, `pnpm` / `supabase` / `vercel` / Docker Desktop installed and running.
- Created GitHub repo `terry-zero-in/thesis` (private).
- Initialized git on `main`, branched onto `ths-1-scaffold-tokens`.
- Committed commit #1 (`25876de`): `README.md`, `.gitignore`, `.env.example` (every blueprint env var, no values), `.nvmrc` (22.11.0), `pnpm-workspace.yaml`. Per Perplexity's rule: secrets-discipline before any code lands.
- Moved THS-1 to "In Progress" via Linear MCP.
- Saved feedback rule: `feedback_linear_mcp_responsibility.md` (Claude operates Linear via MCP; explicit clicks for Terry on UI-only steps).

**Carrying forward:**
- THS-1 paused mid-scaffold. Terry has exact CSS/HTML/screenshots for the entire app's theme + formatting that he wants to share BEFORE any UI work begins. Per "Match exactly = EVERYTHING" rule, no `create-next-app`, no Tailwind tokens, no `/tokens` page until references are absorbed.

**Decisions made:**
- Next.js 16.2.4 (not blueprint's 15.x).
- Zod 3.25.x (not 4 — RHF ecosystem).
- TypeScript 5.7.3 (not 6 — too fresh).
- Magic-link auth (overrides blueprint's email/password line).
- One Resend email per memo on pending_approval — magic-link deep link. No alert emails in Phase 1.
- Trigger evaluator code-only in Phase 1 (no Inngest cron, no auto-alert generation).
- 10 tickers seeded (Section K), 5 fully interactive (NVDA / MSFT / NET / INTC / PYPL).
- LLMRouter for all 5 providers, Phase 1 wires only Anthropic + Perplexity.
- No Marketaux in Phase 1.
- SEC EDGAR User-Agent: `Thesis Terry terry@zero-in.io` (no trailing period).
- Severity colors: success #3FB950, warning #F0B72F, danger #E5484D, info #8b5cf6.
- One PR per ticket against main, branch `ths-N-slug`, squash-merge, PR title `THS-N: <title>`.
- Linear states: In Progress when starting, In Review when PR opens, Done after merge.

**Token / context state:**
- ~20% context used by close (self-assessment is unreliable per memory; conservative bias applied).
