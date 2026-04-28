# Thesis — Session Handoff

**Session date:** 2026-04-28
**Closing Claude:** Code #201_04.27.2026 (13-042726), row `70960761-aa7b-410e-a9ac-af009c5016d4`
**Status at close:** THS-1 SHIPPED. THS-2 (Supabase schema + RLS) ready to start.

---

## Project at a glance

**Thesis** is an AI-powered investment research portal. Personal institutional-grade research and decision system for a hybrid long/swing US equity portfolio. Watchlist → AI agents → triggers → memos → mandatory human approval gate → audit log. **No automated trade execution, ever.**

- **Local path:** `/Users/terryturner/Projects/thesis/`
- **GitHub:** <https://github.com/terry-zero-in/thesis> (private)
- **Vercel:** linked (`prj_5T2AVhcZLqcaASZwoiWdwTtxGFZP`), GitHub auto-deploy on
- **Live URL:** <https://thesis-nu.vercel.app>
- **Linear team:** Thesis (id `21c004fc-6402-4d22-9316-fa9a05bb9b82`)
- **Linear project:** Phase 1 — MVP (id `696890cc-84bc-45ad-a22c-a24124cf9124`)
- **Blueprint source:** `/Users/terryturner/Downloads/Investment Portal Blueprint.md` (2,483 lines, sections A–N — read end-to-end)

## Current repo state

```
main:  94e622f — THS-1 merged (Next 16 scaffold + design system locked)
       ├─ docs/design/   DESIGN_SPEC.md v1.0 (490 lines, source of truth)
       │                 4 screenshots + 2 mockup HTMLs + 392-line CSS token sheet
       ├─ app/           globals.css with @theme block, layout.tsx, page.tsx, dashboard/, tokens/
       ├─ AGENTS.md      Next 16 agent guidance (read before writing code)
       ├─ CLAUDE.md      @AGENTS.md import
       └─ HANDOFF.md PROGRESS.md README.md
```

**Stack pinned (live npm at install):**
```
next                16.2.4
react               19.2.4
react-dom           19.2.4
typescript          5.9.3       ← satisfies HANDOFF "NOT 6"; downgrade to 5.7.3 only if needed
tailwindcss         4.2.4
eslint-config-next  16.2.4
prettier            3.8.3
```

**No dependencies installed yet for THS-2:** Supabase JS, Supabase SSR. Inngest, Anthropic SDK, Resend, Recharts, react-hook-form etc. all land in their respective tickets.

## What's live

| Route | Purpose |
|---|---|
| `/` | Brand wordmark placeholder ("AI Thesis" · "Investment OS") |
| `/dashboard` | THS-1 acceptance placeholder (real shell ships in THS-4) |
| `/tokens` | Design system regression page — 20 swatches, type ladder, severity, reco pills, conviction ticks, live pulse, spacing/radius scales |

Visit any of these on `https://thesis-nu.vercel.app` to verify deploy.

---

## THE NEXT 3-5 TASKS (execute in order)

### 1. Sanity check on session open
```bash
cd /Users/terryturner/Projects/thesis
git pull origin main && git status   # should be clean, on main, at 94e622f
gh pr list                            # should be empty (no open PRs)
```
Then via Linear MCP: confirm THS-2 is in **Todo** state (not started). If anything looks off, surface to Terry before proceeding.

### 2. Branch and start THS-2 (Supabase schema + RLS)

```bash
git checkout -b ths-2-supabase-schema
```
Then via Linear MCP: move THS-2 to **In Progress**.

THS-2's scope is **schema + RLS only** — no auth UI, no app shell, no data flows. Magic-link auth lands in THS-3.

### 3. Install Supabase deps + initialize local stack

```bash
pnpm add @supabase/supabase-js@2.104.1 @supabase/ssr@0.10.2
pnpm add -D supabase    # CLI for local dev (or use brew-installed)
supabase init
supabase start          # boots local Postgres via Docker; Docker MUST be running
```

Capture the local Supabase keys from `supabase start` output and add to `.env.local` (DO NOT commit). The `.env.example` already lists the var names.

### 4. Write the schema migration per blueprint Section D

**Source of truth: blueprint Section D.** NOT Section H. Section H is "Retool vs Custom App." If anything in the blueprint references Section H for schema, ignore — Section D is the schema.

Tables (per blueprint Section D):
- `tickers` — public read
- `companies` — public read
- `data_sources` — public read (health monitoring)
- `watchlist_items` — RLS `auth.uid() = user_id`
- `triggers` — RLS `auth.uid() = user_id`
- `research_jobs` — RLS `auth.uid() = user_id`
- `memos` — RLS `auth.uid() = user_id`
- `decisions` — RLS `auth.uid() = user_id`
- `alerts` — RLS `auth.uid() = user_id`
- `audit_log` — RLS `auth.uid() = user_id` (append-only)
- `cost_events` — RLS `auth.uid() = user_id`

Generate via `supabase migration new initial_schema`. Paste full SQL inline in chat (per Terry preference) so he can copy to Supabase SQL Editor for prod later.

### 5. Verify RLS, generate types, commit, PR

```bash
supabase db reset              # rebuild local DB clean
pnpm dlx supabase gen types typescript --local > types/supabase.ts
git add supabase/ types/supabase.ts
git commit -m "feat(THS-2): Supabase schema + RLS per blueprint Section D"
git push -u origin ths-2-supabase-schema
gh pr create --base main --title "THS-2: Supabase schema + RLS" --body "..."
```

Then via Linear MCP: move THS-2 to **In Review**. After Terry merges → THS-2 → Done → start THS-3.

---

## Locked decisions (do not relitigate without Terry's explicit override)

### Stack versions (refreshed 2026-04-28)
```
next             16.2.4 ✅ installed
react            19.2.4 ✅ installed (19.2.5 available — minor)
react-dom        19.2.4 ✅ installed
typescript       5.9.3  ✅ installed (HANDOFF said 5.7.3 — 5.9.3 satisfies "NOT 6")
tailwindcss      4.2.4  ✅ installed
zod              3.25.x — install in THS-3 with form work (NOT 4 — RHF peer-range chaos)
@supabase/supabase-js  2.104.1 — install in THS-2
@supabase/ssr    0.10.2 — install in THS-2
inngest          4.2.4 — install in THS-9
@anthropic-ai/sdk 0.91.0 — install in THS-7
@tanstack/react-table 8.21.3 — install in THS-5/6
recharts         3.8.1 — install in THS-6
@tremor/react    3.18.7 (note: Tremor OSS in maintenance mode; may swap for shadcn/charts)
react-hook-form  7.73.1 — install in THS-3
@hookform/resolvers 5.x — with RHF
react-markdown   10.1.0 — install in THS-10
rehype-highlight 7.0.2 — with markdown
geist            (using next/font/google — no separate npm package)
resend           6.12.2 — install in THS-11
date-fns         4.x — when needed
vitest           4.1.5 — when first test ticket
@vitest/coverage-v8 4.1.5 — with vitest
prettier         3.8.3 ✅ installed
```

### Design system (DESIGN_SPEC.md is authoritative)

`docs/design/DESIGN_SPEC.md` is the source of truth. Read it before any UI work.

**Tokens (LOCKED — supersedes all prior):**
- bg `#0A0B0E` (canvas + sidebar merged into single plane)
- surface `#14161B` · surface-2 `#1A1D24` · surface-hover `#1F232B`
- border `#232730` · border-subtle `#1A1D24`
- text-1 `#F0F1F3` · text-2 `#9298A3` · text-3 `#5F6571`
- accent `#4D5BFF` · accent-soft `rgba(77,91,255,.12)` · accent-hover `#6573FF`
- success `#4FB87A` · warning `#DDA84F` · danger `#E26B6B` · info `#5B8FFF` (each with `*-soft` 12% alpha pair)

**OLD tokens are RETIRED:** if you see references to `#121415 / #2E5BFF / #3FB950 / #F0B72F / #E5484D / #8b5cf6` anywhere in old conversations or stale docs, IGNORE them. Use the locked set above.

**Brand:** "AI Thesis" wordmark (text-only, no icon) + "Investment OS" product label in topbar.
**Macro strip (curated 8):** SPX · NDX · RUT · VIX · US10Y · DXY · WTI · GOLD.
**Snooze button:** soft fill (`warning-soft` bg, `warning` text).
**Fonts:** Geist Sans + JetBrains Mono via `next/font/google` (NOT Geist Mono, NOT npm `geist` package).
**Numerics:** every numeric element gets `font-feature-settings: "tnum"` — utility class `.tnum` is registered in globals.css.

**Per-ticket discipline:** new screens get empty/loading/error states drafted in their own ticket, not pre-designed in bulk.

### Auth + workflow
- **Magic-link auth** (Supabase Auth), single user (Terry). No email/password.
- **One Resend email per memo** on `memo.status → pending_approval`, body = magic-link-authed deep link to `/memos/[id]/approve`. **No alert emails in Phase 1.**
- **Trigger evaluator code-only in Phase 1** — class + vitest tests + `POST /api/triggers/evaluate-now` endpoint. NO Inngest cron, NO automated alert generation. Cron lives in Phase 2.

### Data + agents
- **10 watchlist tickers seeded** per blueprint Section K: NVDA, MSFT, NET, MDB, INTC, PYPL, VZ, BRK-B, SPY, QQQ. Of these, NVDA / MSFT / NET / INTC / PYPL are **fully interactive** (research jobs, memos, approvals). The other 5 are watchlist rows + chart pages only in Phase 1.
- **LLMRouter** interface supports all 5 providers. **Phase 1 wires only Anthropic + Perplexity.** No OpenAI, no Google, no Haiku fallback. If Sonnet errors, surface the error — don't paper over it.
- **No Marketaux in Phase 1.** Perplexity Sonar Pro's web grounding covers news. FMP analyst ratings fetched directly via FMP client.
- **SEC EDGAR User-Agent:** exactly `Thesis Terry terry@zero-in.io` (no trailing period).

### Git + Linear workflow
- **One PR per ticket against `main`**, branch `ths-N-slug` (NOT Linear's auto-generated `terry/ths-N-N-...`). Squash-merge.
- **PR title format:** `THS-N: <title>` so Linear auto-links.
- **Linear state machine:** Todo → In Progress (work starts) → In Review (PR opens) → Done (after merge).
- **Linear MCP:** Claude operates Linear via MCP for everything. UI-only steps require explicit click-by-click instructions for Terry.

### Build order to Perplexity Checkpoint #1

THS-1 ✅ → THS-2 → THS-3 → THS-4. **Stop after THS-4 merges.** Perplexity grades against the blueprint, then unblocks THS-5+.

- **THS-1:** ✅ Done — scaffold + tokens + Geist + ESLint/Prettier + `/tokens` page + `/dashboard` placeholder. Live at https://thesis-nu.vercel.app. shadcn deferred to THS-3.
- **THS-2:** Supabase schema + RLS on every table per blueprint **Section D**. Auth RLS pattern: `auth.uid() = user_id` on user-owned tables; public-read on `tickers` / `companies` / `data_sources`.
- **THS-3:** Magic-link auth + protected route middleware + sign-in page + **shadcn init (deferred from THS-1)** + first components: `button`, `input`, `label`. Token mapping is pre-decided (see below) so this is execution, not decision work.
- **THS-4:** Sidebar + topnav + ⌘K command palette.

Four Perplexity checkpoints across the whole Phase 1 build: after THS-4, after step 7 (first memo end-to-end), after step 11 (approval flow), and pre-prod (step 14).

### shadcn token mapping (pre-committed for THS-3)

shadcn init was originally scoped into THS-1 but deferred to THS-3 on 2026-04-28 (init without components to validate against = config-by-principle with no feedback loop). To keep THS-3 as execution-only, the token mapping is locked here in advance.

| shadcn token | Our token | Hex / Value |
|---|---|---|
| `--background` | `--bg` | `#0A0B0E` |
| `--foreground` | `--text-1` | `#F0F1F3` |
| `--primary` | `--accent` | `#4D5BFF` |
| `--primary-foreground` | (literal) | `#FFFFFF` |
| `--card` | `--surface` | `#14161B` |
| `--card-foreground` | `--text-1` | `#F0F1F3` |
| `--popover` | `--surface-2` | `#1A1D24` |
| `--popover-foreground` | `--text-1` | `#F0F1F3` |
| `--muted` | `--surface-2` | `#1A1D24` |
| `--muted-foreground` | `--text-2` | `#9298A3` |
| `--accent` ⚠️ | `--surface-hover` | `#1F232B` |
| `--accent-foreground` | `--text-1` | `#F0F1F3` |
| `--destructive` | `--danger` | `#E26B6B` |
| `--border` | `--border-subtle` | `#1A1D24` |
| `--input` | `--surface-2` | `#1A1D24` |
| `--ring` | `--accent` | `#4D5BFF` |

⚠️ **Trap:** shadcn's `--accent` is its hover/secondary surface, NOT a brand accent. Map it to `--surface-hover`, not our `--accent`. Otherwise every hover state gets a brand-blue wash.

**THS-3 shadcn execution path:**
1. `npx shadcn@latest init`
2. Replace shadcn's generated `:root` block in `app/globals.css` with the mapping above
3. Install primitives: `npx shadcn@latest add button input label`
4. Visual-verify each component matches DESIGN_SPEC before THS-3 commits

---

## Setup state

| Tool | Status | Notes |
|---|---|---|
| Node | ✅ v24.14.1 | dev box; `.nvmrc` pins 22.11.0 for Vercel parity |
| pnpm | ✅ 10.33.2 via brew | latest |
| git | ✅ 2.50.1 | |
| `gh` CLI | ✅ 2.89.0 | logged into `terry-zero-in`, ssh, `repo` scope |
| Supabase CLI | ✅ via brew | NOT yet `supabase init` — that's THS-2 task |
| Vercel CLI | ✅ 52.0.0 | logged in as `terry-8893`, project linked |
| Docker Desktop | ✅ 4.71.0 | required to be RUNNING for `supabase start` in THS-2 |
| Inngest CLI | ⚠️ defer | use `npx inngest-cli@latest dev` at use-time |

## Gotchas

1. **Brew `docker` cask is dead.** Current cask is `docker-desktop`. Burned ~30 min last session finding this.
2. **Brew cask Docker install fails non-interactive.** Needs sudo for `/usr/local/cli-plugins/` symlinks. Direct DMG download from <https://desktop.docker.com/mac/main/arm64/Docker.dmg> + `cp -R /Volumes/Docker/Docker.app /Applications/` is the reliable path.
3. **macOS Full Disk Access NOT granted to Claude.** Can't `ls ~/Downloads`. Workaround: `mdfind` (Spotlight) or have Terry paste paths.
4. **Working directory persists across `Bash` tool calls** even though shell state doesn't.
5. **Section H vs Section D in blueprint.** Perplexity references "Section H" for schema; the actual schema is in **Section D**. Section H is "Retool vs Custom App."
6. **Tremor OSS is in maintenance mode** — active product is paid Tremor Blocks. If Tremor doesn't suffice, swap for `shadcn/charts` (Recharts under the hood).
7. **Approval email scope is narrow.** ONE email per memo on transition to `pending_approval`. Magic-link-authed deep link. No alert emails, no severity prefs, no email digests in Phase 1.
8. **First Vercel deploy hit production target.** Vercel's default for a project's first-ever deploy is production, not preview. Future PR deploys will be previews via GitHub integration. The `https://thesis-nu.vercel.app` alias is now production.
9. **`.vercel/` is gitignored per Vercel's own README.** Re-link via `vercel link --project thesis` if needed (5s op). Project ID is `prj_5T2AVhcZLqcaASZwoiWdwTtxGFZP` if you need to query the API directly.
10. **AGENTS.md says "This is NOT the Next.js you know"** — Next 16 has breaking changes. Read `node_modules/next/dist/docs/` before writing route handlers, middleware, server actions, etc. The font docs are at `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`.
11. **TypeScript installed at 5.9.3** (resolved from `^5` in scaffold's package.json). HANDOFF originally said 5.7.3. 5.9.3 satisfies "NOT 6" — leave it unless something breaks.
12. **JetBrains Mono replaces Geist Mono** for numerics — NOT a Geist Mono swap left over for later. Permanent per DESIGN_SPEC §3.
13. **Vercel env vars are empty.** Don't pre-populate placeholders — set values with their actual wiring tickets so we don't end up with stale empty-string vars hanging around.

## Vercel state (live)

- ✅ Project linked: `terry-8893s-projects/thesis`
- ✅ GitHub auto-deploy connected to `terry-zero-in/thesis`
- ✅ First deploy: `dpl_7Xi7ttkBsNF9dJGdy116XruRHTHR` at `https://thesis-nu.vercel.app`
- ⏳ Env vars: empty. Add per ticket — DO NOT pre-populate placeholders.
- ⏳ Custom domain: not yet configured (deferred to THS-14 deploy).

## Supabase state (deferred to THS-2)

- ❌ No `supabase init` yet
- ❌ No `supabase start` yet (Docker is running, ready when needed)
- ❌ Cloud Supabase Pro project NOT YET CREATED (deferred to step 14 deploy — Phase 1 dev is local-only)

## Memory rules touched this session

- **Updated:** `project_thesis.md` — locked tokens swapped to DESIGN_SPEC values. Brand "AI Thesis" + "Investment OS" recorded. Macro strip curation recorded. THS-1 status updated to merged.
- **No new feedback rules** added this session.

## Onboarding packet for parallel Claude Chat

Bundled at `~/Documents/AI-Thesis-Onboarding-Packet-2026-04-28.zip` (1.3 MB):
- 00-START-HERE.md — framing + locked rules + sanity check
- 01-design/ — DESIGN_SPEC.md + thesis-design-system.css
- 02-handoff/ — HANDOFF.md + PROGRESS.md (snapshot at session-end)
- 03-repo/ — README.md + env.example.txt
- screenshots/ — 4 CleanShot images

When updates are made to DESIGN_SPEC or HANDOFF, regenerate the packet so Chat has the current state.

---

## Continuation note for Terry to paste to next Claude

> **Refer to `HANDOFF.md` and `PROGRESS.md` in `/Users/terryturner/Projects/thesis/` for full context, locked decisions, and your first 5 tasks. THS-1 is merged at `94e622f`, live at https://thesis-nu.vercel.app — start with THS-2 (Supabase schema + RLS per blueprint Section D, NOT H).**
