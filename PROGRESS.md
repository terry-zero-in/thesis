# Thesis — Progress Log

## Phase 1 — MVP

Per Linear team **Thesis**, project **Phase 1 — MVP**, blueprint Section I.14 (`/Users/terryturner/Downloads/Investment Portal Blueprint.md`).

### Build order (lock)

| Ticket | Title | Status | PR | Notes |
|---|---|---|---|---|
| THS-1 | Scaffold Next.js repo + design tokens | 🟡 In Progress | — | Commit #1 (`25876de`) landed. Paused mid-scaffold awaiting Terry's design references. |
| THS-2 | Supabase schema + RLS | ⬜ Todo | — | Schema in blueprint **Section D** (Perplexity says "Section H" — that's wrong, Section H is Retool vs Custom App). |
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
