# Thesis — Progress Log

## Phase 1 — MVP

Per Linear team **Thesis**, project **Phase 1 — MVP**, blueprint Section I.14 (`/Users/terryturner/Downloads/Investment Portal Blueprint.md`).

### Build order (lock)

| Ticket | Title | Status | PR | Notes |
|---|---|---|---|---|
| THS-1 | Scaffold Next.js repo + design tokens | ✅ Done 2026-04-28 | [#1](https://github.com/terry-zero-in/thesis/pull/1) | Squash-merged at `94e622f`. Live at https://thesis-nu.vercel.app. shadcn init deferred to THS-3. |
| THS-2 | Supabase schema + RLS | ✅ Done 2026-04-28 | [#2](https://github.com/terry-zero-in/thesis/pull/2) | Squash-merged at `9142315`. All 23 Section D tables, RLS on every table, 11/11 RLS isolation tests passed, types/supabase.ts generated. |
| THS-3 | Magic-link auth + protected middleware + sign-in | 🟡 In Progress | — | Branch `ths-3-auth` at WIP `0fd5152` (NOT pushed). shadcn init done, Supabase SSR clients written. proxy.ts + /login + /auth/callback + / redirect + sign-out + tests pending. |
| THS-4 | Sidebar + topnav + ⌘K palette | ⬜ Todo | — | **Perplexity Checkpoint #1 stops here.** Don't proceed to THS-5 until Perplexity unblocks. |
| THS-5 | Watchlist CRUD | ⬜ Todo | — | |
| THS-6 | Ticker detail page (chart + fundamentals) | ⬜ Todo | — | |
| THS-7 | Single-agent research (Company Research) | ⬜ Todo | — | **Perplexity Checkpoint #2: first end-to-end memo.** |
| THS-8 | Trigger definitions data model only | ⬜ Todo | — | |
| THS-9 | Trigger evaluator (code + tests, no cron) | ⬜ Todo | — | Phase 1 = code only. Cron is Phase 2. |
| THS-10 | Memo generation (synthesis agent) | ⬜ Todo | — | |
| THS-11 | Approval flow + Resend email | ⬜ Todo | — | **Perplexity Checkpoint #3: approval flow.** One email per memo on pending_approval. |
| THS-12 | Decision log | ⬜ Todo | — | |
| THS-13 | In-app alerts + realtime badge | ⬜ Todo | — | |
| THS-14 | Polish + production deploy | ⬜ Todo | — | **Perplexity Checkpoint #4: pre-prod.** Vercel Pro deploy. |

### Phase 1 acceptance (Section J)

- [ ] Auth works (magic-link, single user, redirect on unauth)
- [ ] Watchlist CRUD (add NVDA in <10s, persists, conviction + target stored)
- [ ] Ticker detail loads real data (Polygon chart + FMP fundamentals)
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
- Middleware redirect-matrix test, inbucket E2E test, sign-out test
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
