# Thesis — Progress Log

## Phase 1 — MVP

Per Linear team **Thesis**, project **Phase 1 — MVP**, blueprint Section I.14 (`/Users/terryturner/Downloads/Investment Portal Blueprint.md`).

### Build order (lock)

| Ticket | Title | Status | PR | Notes |
|---|---|---|---|---|
| THS-1 | Scaffold Next.js repo + design tokens | ✅ Done 2026-04-28 | [#1](https://github.com/terry-zero-in/thesis/pull/1) | Squash-merged at `94e622f`. Live at https://thesis-nu.vercel.app. shadcn init deferred to THS-3. |
| THS-2 | Supabase schema + RLS | 🟢 Ready | — | Schema in blueprint **Section D** (NOT Section H — that's Retool vs Custom App). Next session starts here. |
| THS-3 | Magic-link auth + protected middleware + sign-in | ⬜ Todo | — | Single-user. No email/password. |
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
