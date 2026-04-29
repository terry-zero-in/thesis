# Thesis — Session Handoff

**Session date:** 2026-04-29 (continued from 2026-04-28)
**Closing Claude:** Code #212_04.28.2026 (17-042826), row `fc61cfd3-cb72-4c72-bbfe-c8da22c570a2`
**Status at close:** THS-1 + THS-2 + THS-3 + THS-4 all merged on `main` (THS-4 squash at `2f5aa9e`). Docs commit `cc342ea` adds locked Codex protocol. **Perplexity Checkpoint #1 ✅ CLEARED 2026-04-29.** THS-5 (Watchlist CRUD) Linear → In Progress, no branch yet. PR #5 (`fix(ui): rounded-md radius on command palette` at `b10b959` on `fix-cmd-palette-radius`) open against main; Codex cleared ("Breezy!"); awaiting Terry's merge call. Repo flipped to public for Perplexity access.

---

## NEXT 3-5 TASKS (start here)

1. **Run sanity checks** — `git fetch && git status && gh pr list --state open && supabase status`. Confirm `main` HEAD is `cc342ea` (or newer if PR #5 has merged in the meantime). Then via Linear MCP confirm THS-5 still `In Progress`.

2. **Two open decisions before any code action — ASK Terry:**
   - **PR #5 (`fix(ui): rounded-md radius` at `b10b959` on `fix-cmd-palette-radius`):** Codex cleared ("Breezy!"). Per locked Codex protocol, Terry's approval is the only merge gate. Ask: merge first, or leave open and cut THS-5 in parallel?
   - **Polygon API key:** THS-5's Add-ticker modal needs `POLYGON_API_KEY` in `.env.local` for symbol validation. Per HANDOFF gotcha #14 + #13, do NOT pre-populate; ask Terry to provide the actual value.

3. **After Terry's call: cut `ths-5-watchlist`** from the chosen base point (post-PR-5-merge `main` is cleanest per Terry's prior preference). Linear THS-5 already `In Progress` — no Linear state change needed. Push branch only after first commit.

4. **Read THS-5 scope:** Linear THS-5 ticket text (via Linear MCP) + `docs/design/DESIGN_SPEC.md §5.5` (Watchlist trigger proximity — informs design even though §5.5 is a dashboard component, not the standalone /watchlist page) + blueprint Section G Screen 2 (in `/Users/terryturner/Downloads/Investment Portal Blueprint.md` — note macOS Full Disk Access not granted per gotcha #2; ask Terry to paste section text).

5. **Begin THS-5 implementation:** install `@tanstack/react-table` (per HANDOFF stack list deferred to THS-5/6) and scaffold `WatchlistTable` component in `app/(app)/watchlist/page.tsx`. Server component fetches `watchlist_tickers` via Supabase; client `WatchlistTable` handles interactions. Add-ticker modal needs Polygon symbol validation. Acceptance per Linear: can add NVDA / MSFT / NET, remove NVDA, re-add NVDA. Persists on refresh.

---

## Project at a glance

**Thesis** is an AI-powered investment research portal. Personal institutional-grade research and decision system for a hybrid long/swing US equity portfolio. Watchlist → AI agents → triggers → memos → mandatory human approval gate → audit log. **No automated trade execution, ever.**

- **Local path:** `/Users/terryturner/Projects/thesis/`
- **GitHub:** <https://github.com/terry-zero-in/thesis> (private)
- **Vercel:** linked (`prj_5T2AVhcZLqcaASZwoiWdwTtxGFZP`), GitHub auto-deploy on
- **Live URL:** <https://thesis-nu.vercel.app>
- **Linear team:** Thesis (id `21c004fc-6402-4d22-9316-fa9a05bb9b82`)
- **Linear project:** Phase 1 — MVP (id `696890cc-84bc-45ad-a22c-a24124cf9124`)
- **Blueprint source:** `/Users/terryturner/Downloads/Investment Portal Blueprint.md` (2,483 lines, sections A–N)

## Current repo state

```
main:                        cc342ea — docs: codex as advisory, not blocking [2026-04-29]
                                 ├─ 2f5aa9e — THS-4: App shell — sidebar + topbar + ⌘K palette (#4) [squash 2026-04-28]
                                 ├─ fe4cdf3 — THS-3: Magic-link auth + protected middleware + sign-in (#3)
                                 ├─ 9142315 — THS-2: Supabase schema + RLS per blueprint Section D (#2)
                                 └─ 94e622f — THS-1: Scaffold Next.js repo + design tokens (#1)

fix-cmd-palette-radius:      b10b959 — fix(ui): rounded-md radius on command palette per spec §7.9/§9.3
                              [PUSHED · PR #5 OPEN · CODEX CLEARED ("Breezy!") · AWAITING TERRY MERGE]

ths-5-watchlist:             NOT YET CUT. Linear THS-5 In Progress.
                              Cut from post-PR-5-merge main per locked workflow.
```

**Repo visibility:** `public` (flipped 2026-04-29 for Perplexity Checkpoint #1 access). Reversible via `gh repo edit terry-zero-in/thesis --visibility private --accept-visibility-change-consequences`.

**Stack pinned (current state):**
```
next                16.2.4
react               19.2.4
react-dom           19.2.4
typescript          5.9.3
tailwindcss         4.2.4

@supabase/supabase-js   2.104.1   ✅ THS-2
@supabase/ssr           0.10.2    ✅ THS-2

shadcn                  4.5.0     ✅ THS-3
@base-ui/react          1.4.1     ✅ THS-3 (Radix successor used by shadcn 4.x)
class-variance-authority 0.7.1    ✅ THS-3
clsx                    2.1.1     ✅ THS-3
tailwind-merge          3.5.0     ✅ THS-3
tw-animate-css          1.4.0     ✅ THS-3
lucide-react            1.11.0    ✅ THS-3
```

## SESSION-STARTUP SANITY CHECKS (Terry-driven; do NOT auto-assign work)

Per Terry's locked rule: handoffs document state, never assign tasks. The next Claude reads this, runs the procedural checks below, then asks Terry what to work on. Do not infer next work from this list.

### 1. State sanity check

```bash
cd /Users/terryturner/Projects/thesis
git fetch --all
git status                            # working tree + current branch
git log -5 --oneline --all            # head locations on main + active branches
gh pr list --state open               # open PRs (do NOT auto-action; ask Terry)
supabase status                       # local Supabase. If not running: supabase start
```

Then via Linear MCP confirm current ticket state.

### 2. Open-PR review protocol — Codex is advisory, not blocking (LOCKED 2026-04-29)

- **Codex (`chatgpt-codex-connector[bot]`) reviews are advisory, NOT a merge gate.** Treat as a third pair of eyes.
- **On the initial Codex review of any PR:** address legitimate P1 findings in the same branch. Judgment on P2/P3 — fix if cheap, defer if not.
- **After pushing fixes:** do NOT wait for Codex re-review. Push, request Terry's review, move on. If Codex flags something on the new commit, handle it in the NEXT PR — unless it's a security P1.
- **Do NOT poll `gh api repos/.../pulls/N/reviews`** as part of the merge decision. Codex state is not a gate.
- **Merge gate is Terry's approval ONLY.** Perplexity grades at checkpoints (after THS-4 ✓, 7, 11, 14). Codex never gates.

### 3. Functional verification rigor on interactive surfaces

Render ≠ functional. For every interactive surface (palette, dialog, form, dropdown, etc.) shipped in a PR, keystroke/click test before any "verification clean" claim. Per HANDOFF gotchas #19 + #24 — written after the THS-4 ⌘K cmdk-root P1 + the rounded-md selection-highlight regression, both of which a render-only check would have signed off on.

Auth-walled features (anything inside `app/(app)/`) require Terry's hands for keystroke testing — `@supabase/ssr` PKCE cookie cannot be injected into chrome-headless-shell from CLI (gotcha #22).

### 4. Perplexity checkpoint protocol

Four checkpoints across Phase 1:
- **Checkpoint #1** — after THS-4: ✅ CLEARED 2026-04-29 (Perplexity grade authorized THS-5 start)
- **Checkpoint #2** — after THS-7 (first end-to-end memo, NVDA company research)
- **Checkpoint #3** — after THS-11 (approval flow + Resend email)
- **Checkpoint #4** — pre-prod (THS-14)

At each checkpoint: full PR build + DESIGN_SPEC + relevant blueprint section run through Perplexity for compliance grading. Terry triggers each checkpoint and unblocks the next phase.

### 5. Ask Terry what's next

Per Terry's locked rule (`feedback_no_task_assignment.md`): do not assume the next work. Read this HANDOFF + PROGRESS, run sanity checks, then ask Terry directly.

---

## What's live

| Route | Purpose | Notes |
|---|---|---|
| `/` | Auth-aware redirect | Authed → `/dashboard`, unauth → `/login`. No render. |
| `/login` | Magic-link sign-in | useActionState three states (idle / error / success). Renders DESIGN_SPEC tokens. |
| `/auth/callback` | PKCE code exchange | exchangeCodeForSession + allow-listed `?next=`. Errors redirect to `/login?error=...`. |
| `/dashboard` | THS-1 acceptance placeholder | getUser defense + inline "Signed in as `email` · Sign out" treatment. Real shell ships in THS-4. |
| `/tokens` | Design system regression page | Includes the shadcn primitives section added in THS-3. |

`https://thesis-nu.vercel.app` reflects `main` (THS-2). `ths-3-auth` lives on origin pending PR #3 merge.

---

## Locked decisions (do not relitigate without Terry's explicit override)

### THS-4 (locked + shipped 2026-04-28, merged 2026-04-28 at `2f5aa9e`)

- **App shell route group** at `app/(app)/layout.tsx` — server component with `getUser()` defense + `CommandPaletteProvider` + 220×1fr CSS grid + 48px sticky topbar.
- **10 sidebar routes** (DESIGN_SPEC §4.3 refreshed to 10 in same commit; was 8 — drift fix). WORK: Dashboard, Watchlist, Research Queue, Triggers, Opportunities, Memos, Decisions, Portfolio. SYSTEM: Workflows, Settings.
- **⌘K palette** via shadcn 4.x `command` + `dialog` (base-ui primitives). Global `Cmd/Ctrl+K` listener; navigates 10 routes + Sign Out via `signOut` server action through `useTransition`.
- **Sign-out moved** from dashboard body into the ⌘K palette. Identity surfaces as initials avatar in topbar (first 2 chars of email local-part, uppercased).
- **shadcn primitive-layer fixes** (P1s addressed at primitive, not consumer):
  - `CommandDialog` was missing `<Command>` cmdk root — palette rendered green on curl matrix but was structurally non-functional. Fixed at `components/ui/command.tsx:63` (added `<Command>{children}</Command>` inside `DialogContent`).
  - `CommandItem` selection styling mapped to `bg-muted` which collided with parent `bg-popover` (both → shadcn `--surface-2`). Selection state was firing but visually identical to row default. Fixed via `data-[selected=true]:bg-surface-hover` (Tailwind utility, NOT arbitrary `var()` lookup) at `components/ui/command.tsx:159`.
- **Functional verification:** Terry ran 6/6 keystroke pass on `e1ff226` (later squash-merged into `2f5aa9e`). The two primitive fixes were caught only by functional test, not render check — gotcha #19/#24 written from this experience.

### THS-3 (locked + shipped 2026-04-28)

- **`proxy.ts` is routing UX only.** Defense-in-depth: every protected component calls `supabase.auth.getUser()` at the data-access boundary. RLS is the final wall. Auth is NOT trusted from `proxy.ts` alone — the March 2025 middleware-subrequest CVE motivated Next's rename, and the ecosystem is steering away from "auth lives in middleware."
- **Next.js 16 runtime for `proxy.ts` = Node.js (not edge).** Edge runtime is not supported in Proxy. If a future ticket needs edge execution, that's a separate architectural decision.
- **PKCE flow only.** `@supabase/ssr` defaults to PKCE. Implicit flow (`#hash` tokens) is never used.
- **Sign-in route:** `/login` (override of `/sign-in` default). Source: Linear THS-3 description text.
- **Public paths:** `/login` + `/auth/callback`. Everything else gated.
- **Single-user, magic-link only.** No password, no signup form, no OAuth.
- **shadcn token mapping:** site is always dark, single `:root` block (no `.dark` toggle). HANDOFF table mapping respected verbatim. shadcn `--accent` → `--surface-hover` (NOT brand `--accent`).
- **`?next=` allow-list (in `app/auth/callback/route.ts`):** only `/dashboard` for now. New protected destinations get added explicitly — no echo of user-controlled redirect URLs.
- **`additional_redirect_urls` must use `/**` glob.** See gotcha #19 below.
- **Sign-out lives at `lib/auth/actions.ts`** — server action `signOut`: `signOut` → `revalidatePath("/", "layout")` → `redirect("/login")`. No confirmation modal in single-user Phase 1.
- **No Playwright in this ticket.** Test infra (Playwright, Cypress, MSW) is a discrete decision with its own ticket. Per HANDOFF stack list, vitest is the only test framework currently approved. Anything beyond that requires Terry's explicit OK.

### THS-2 (locked 2026-04-28 — landed at `9142315`)

- Schema source-of-truth = blueprint **Section D**, not Section H (Section H is "Retool vs Custom App")
- All 23 Section D tables. Section D names exclusively (`watchlist_tickers`, `investment_memos`, `audit_logs` — plural)
- No `cost_events` table. Cost tracking via `agent_outputs.cost_usd` + `audit_logs.metadata` JSONB
- RLS on every table (23). 17 user-owned via `auth.uid() = user_id` with EXISTS-subquery on six child tables
- `(SELECT auth.uid())` wrap per Supabase performance guidance
- `handle_new_auth_user()` SECURITY DEFINER trigger on `auth.users` syncs new signups to `public.users`
- Two-user RLS isolation test passes 11/11

### Stack versions (refreshed 2026-04-28)

```
next                16.2.4 ✅ installed
react               19.2.4 ✅ installed
react-dom           19.2.4 ✅ installed
typescript          5.9.3  ✅ installed
tailwindcss         4.2.4  ✅ installed
@supabase/supabase-js  2.104.1 ✅ THS-2
@supabase/ssr        0.10.2 ✅ THS-2
shadcn               4.5.0  ✅ THS-3
@base-ui/react       1.4.1  ✅ THS-3
zod                  3.25.x — install in THS-3+ form work (NOT 4 — RHF peer-range chaos)
inngest              4.2.4  — install in THS-9
@anthropic-ai/sdk    0.91.0 — install in THS-7
@tanstack/react-table 8.21.3 — install in THS-5/6
recharts             3.8.1  — install in THS-6
@tremor/react        3.18.7 (note: Tremor OSS in maintenance mode; may swap for shadcn/charts)
react-hook-form      7.73.1 — install in THS-3+ form work
@hookform/resolvers  5.x    — with RHF
react-markdown       10.1.0 — install in THS-10
rehype-highlight     7.0.2  — with markdown
geist                — using next/font/google — no separate npm package
resend               6.12.2 — install in THS-11
date-fns             4.x    — when needed
vitest               4.1.5  — when first test ticket
@vitest/coverage-v8  4.1.5  — with vitest
prettier             3.8.3  ✅ installed
```

### Design system (DESIGN_SPEC.md is authoritative)

`docs/design/DESIGN_SPEC.md` is the source of truth. Read it before any UI work.

**Tokens (LOCKED):**
- bg `#0A0B0E` (canvas + sidebar merged into single plane)
- surface `#14161B` · surface-2 `#1A1D24` · surface-hover `#1F232B`
- border `#232730` · border-subtle `#1A1D24`
- text-1 `#F0F1F3` · text-2 `#9298A3` · text-3 `#5F6571`
- accent `#4D5BFF` · accent-soft `rgba(77,91,255,.12)` · accent-hover `#6573FF`
- success `#4FB87A` · warning `#DDA84F` · danger `#E26B6B` · info `#5B8FFF` (each with `*-soft` 12% alpha pair)

**Brand:** "AI Thesis" wordmark (text-only, no icon) + "Investment OS" product label in topbar.
**Macro strip (curated 8):** SPX · NDX · RUT · VIX · US10Y · DXY · WTI · GOLD.
**Snooze button:** soft fill (`warning-soft` bg, `warning` text).
**Fonts:** Geist Sans + JetBrains Mono via `next/font/google` (NOT Geist Mono, NOT npm `geist` package).
**Numerics:** every numeric element gets `font-feature-settings: "tnum"` — utility class `.tnum` is registered in globals.css.

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
- **Cloud paste discipline:** migrations + auth SQL run **locally only** via `supabase db reset` against the Docker stack. Cloud paste happens only at THS-14 deploy when the actual Thesis Supabase Pro project is created. (During THS-2, a Thesis migration was inadvertently pasted into Fontera Supabase scratchpad; surgical rollback dropped all 23 Thesis tables + the `handle_new_auth_user` function. Lesson: never paste THS-N migrations into Fontera.)

### Codex protocol (LOCKED 2026-04-29 — advisory, not blocking)

- Codex (`chatgpt-codex-connector[bot]`) reviews are **advisory**, NOT a merge gate. Third pair of eyes — useful, not authoritative.
- **Initial Codex review on a PR:** address legitimate P1 findings in the same branch. Judgment on P2/P3 — fix if cheap, defer if not.
- **After pushing fixes:** do NOT wait for Codex re-review. Push, request Terry's review, move on. If Codex flags something on the new commit, handle it in the NEXT PR — unless it's a security P1.
- **Do NOT poll `gh api repos/.../pulls/N/reviews`** to gate merge decisions. Codex state is not a gate.
- **Merge gate is Terry's approval ONLY.** Perplexity grades at checkpoints (after THS-4 ✓, 7, 11, 14). Codex never gates.
- Full operational text mirrored in SESSION-STARTUP SANITY CHECKS section 2 above.

### Build order through Phase 1 checkpoints

Perplexity Checkpoint #1 (after THS-4) ✅ CLEARED 2026-04-29.

- THS-1 ✅ Done · THS-2 ✅ Done · THS-3 ✅ Done · **THS-4 ✅ Done** at `2f5aa9e` (Perplexity Checkpoint #1 ✓)
- **THS-5 ⬜ In Progress** — Watchlist CRUD
- THS-6 ⬜ Ticker detail (chart + fundamentals)
- THS-7 ⬜ Single-agent research (Company Research) → **Perplexity Checkpoint #2**
- THS-8 ⬜ Triggers data model
- THS-9 ⬜ Trigger evaluator (code + tests, no cron)
- THS-10 ⬜ Memo generation
- THS-11 ⬜ Approval flow + Resend → **Perplexity Checkpoint #3**
- THS-12 ⬜ Decision log
- THS-13 ⬜ Alerts + realtime
- THS-14 ⬜ Polish + prod deploy → **Perplexity Checkpoint #4**

Full ticket detail in PROGRESS.md.

### shadcn token mapping (executed in THS-3)

shadcn 4.5.0 init landed in THS-3 (commit `0fd5152`, now part of `49b1221`). Mapping applied verbatim to `app/globals.css` `:root` block. `.dark` block was removed (site always dark). Reference:

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

---

## Setup state

| Tool | Status | Notes |
|---|---|---|
| Node | ✅ v24.14.1 | dev box; `.nvmrc` pins 22.11.0 for Vercel parity |
| pnpm | ✅ 10.33.2 via brew | latest |
| git | ✅ 2.50.1 | |
| `gh` CLI | ✅ 2.89.0 | logged into `terry-zero-in`, ssh, `repo` scope |
| Supabase CLI | ✅ both brew (2.90.0) and npm devDep (2.95.5) | `pnpm.onlyBuiltDependencies` allows the npm postinstall to run |
| Local Supabase stack | ✅ `supabase start` running | Docker required. Studio at http://127.0.0.1:54323. Mailpit (auth emails — formerly inbucket, renamed in recent CLI release; same port/purpose) at http://127.0.0.1:54324. DB at port 54322 |
| Vercel CLI | ✅ 52.0.0 | logged in as `terry-8893`, project linked |
| Docker Desktop | ✅ 4.71.0 | running |
| Chromium (headless) | ✅ via `npx playwright install chromium` | binary at `~/Library/Caches/ms-playwright/chromium_headless_shell-1217/...`. NOT MCP-attached. For Claude-driven screenshots, invoke `chrome-headless-shell` directly with `--headless --screenshot=...` |
| Inngest CLI | ⚠️ defer | use `npx inngest-cli@latest dev` at use-time |

## Gotchas

1. **Brew `docker` cask is dead.** Current cask is `docker-desktop`. Use direct DMG download from <https://desktop.docker.com/mac/main/arm64/Docker.dmg> if needed.
2. **macOS Full Disk Access NOT granted to Claude.** Can't `ls ~/Downloads`. Workaround: `mdfind` (Spotlight) or have Terry paste paths.
3. **Section H vs Section D in blueprint.** Perplexity references "Section H" for schema; the actual schema is in **Section D**. Section H is "Retool vs Custom App."
4. **Tremor OSS is in maintenance mode** — active product is paid Tremor Blocks. If Tremor doesn't suffice, swap for `shadcn/charts` (Recharts under the hood).
5. **Approval email scope is narrow.** ONE email per memo on transition to `pending_approval`. Magic-link-authed deep link. No alert emails, no severity prefs, no email digests in Phase 1.
6. **First Vercel deploy hit production target.** Vercel's default for a project's first-ever deploy is production, not preview. Future PR deploys will be previews via GitHub integration. The `https://thesis-nu.vercel.app` alias is now production.
7. **`.vercel/` is gitignored per Vercel's own README.** Re-link via `vercel link --project thesis` if needed (5s op). Project ID is `prj_5T2AVhcZLqcaASZwoiWdwTtxGFZP`.
8. **AGENTS.md says "This is NOT the Next.js you know"** — Next 16 has breaking changes. Read `node_modules/next/dist/docs/` before writing route handlers, middleware, server actions, etc.
9. **Next 16 RENAMED `middleware.ts` → `proxy.ts`.** Function is `proxy()` not `middleware()`. Same NextResponse/matcher/cookie API. Source: `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` and `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`. There's a codemod at `npx @next/codemod@canary middleware-to-proxy .` if needed.
10. **Next 16 `cookies()` from `next/headers` is async.** Returns Promise. Must `await cookies()` before `.get()/.set()/.getAll()`. Source: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cookies.md`. Server Components have read-only cookies — `.set()` only works in Server Functions or Route Handlers.
11. **TypeScript installed at 5.9.3** (resolved from `^5` in scaffold's package.json). Satisfies "NOT 6" — leave it unless something breaks.
12. **JetBrains Mono replaces Geist Mono** for numerics — NOT a Geist Mono swap left over for later. Permanent per DESIGN_SPEC §3.
13. **Vercel env vars are empty.** Don't pre-populate placeholders — set values with their actual wiring tickets so we don't end up with stale empty-string vars hanging around.
14. **Local `.env.local` IS populated.** Has Supabase URL, anon key (legacy JWT format from `supabase status -o env`), service-role key, EDGAR_USER_AGENT. Other API keys deferred to their tickets. `.env.local` is gitignored.
15. **Fontera Supabase is Terry's catch-all SQL paste destination.** During THS-2, Terry pasted the migration there before realizing it should be local-only. A surgical rollback dropped the 23 Thesis tables + my `handle_new_auth_user` function. Fontera's own `handle_new_user` was untouched. **Going forward: migrations run locally only via `supabase db reset`. Cloud paste only at THS-14 deploy.**
16. **shadcn 4.x uses `@base-ui/react`** (Mui's open-source Radix successor) instead of `@radix-ui/react-*`. Generated components import `Button as ButtonPrimitive from "@base-ui/react/button"`. They behave like Radix — same accessibility primitives. Just a different import path.
17. **shadcn 4.x style picked is `base-nova`** (visible in `components.json`). Components include `dark:` Tailwind variants — site needs `.dark` class on `<html>` for those to fire. Currently we don't apply `.dark` and accept slightly less polished destructive/ghost variants. Revisit if needed.
18. **MCP Playwright wants Google Chrome** at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Chromium-headless from `npx playwright install chromium` is NOT auto-discovered by the MCP server. For Claude-driven screenshots, use the chromium binary directly via Bash (`--headless --screenshot=...`). Installing real Chrome via brew/DMG would unblock MCP — sudo password required.
19. **Supabase `additional_redirect_urls` must include the deploy origin with `/**` glob** (e.g. `http://localhost:3000/**`, `https://thesis-nu.vercel.app/**`). Silently falls back to `site_url` with no error logged when missing — magic links land on the wrong path. Re-check on every deploy URL change. Caught during THS-3: original config had only `https://127.0.0.1:3000` (https-only, no path glob), which silently broke the magic-link → `/auth/callback` redirect during E2E testing — fixed in `supabase/config.toml`.
20. **PKCE > implicit flow for SSR-rendered apps.** `@supabase/ssr` defaults to PKCE. Anyone curl-testing the OTP REST endpoint directly (`POST /auth/v1/otp` without a `code_challenge`) will hit implicit flow — link redirects with tokens in `#hash`, not `?code=`. The hash never reaches the server-side route handler, so it looks like the callback is broken when it's actually the test that's wrong. Always test through the SDK (or the actual form), not the bare REST endpoint.
21. **Mailpit replaced inbucket as Supabase CLI's local mail UI** in a recent release. Same port (54324), same purpose. Anywhere this HANDOFF or older docs say "inbucket" — read "Mailpit" — they are interchangeable for our purposes.
22. **`@supabase/ssr` cookie injection from CLI is hard.** Cannot easily land a valid PKCE auth cookie into chrome-headless-shell from CLI without browser automation. macOS Keychain encryption parity blocks SQLite Cookies-file injection. Authenticated-state screenshots require Playwright (out of scope per stack-list rule) or manual browser verification.
23. **`/login` returns 500 on Vercel preview pre-THS-14 by design.** `createServerClient` requires Supabase env vars; preview deploys intentionally have none. Functional verification is local Docker Supabase only. Resolves at THS-14 when prod env is wired. Any "deployed preview broken on env-dependent feature" report between now and THS-14 defaults to defer + document, not fix — the pipeline guarantee is "build succeeds," not "feature works without config."
24. **Verification rigor: headless render = built. Functional verification = keystroke through every interactive element.** Don't conflate. Marking verification clean from a render-only check is the pattern that produced the THS-4 ⌘K P1 — `components/ui/command.tsx`'s `CommandDialog` rendered green on the curl matrix but was structurally non-functional (missing `<Command>` cmdk root, so input never filtered, arrows never navigated, Enter never selected). Every interactive surface (palette, dialog, form, dropdown, etc.) gets exercised by hand or by automated keystroke test before "verification clean" gets reported.

## Vercel state (live)

- ✅ Project linked: `terry-8893s-projects/thesis`
- ✅ GitHub auto-deploy connected to `terry-zero-in/thesis`
- ✅ Latest deploy reflects `main` at `9142315` (THS-2). On THS-3 merge, `49b1221` will auto-deploy.
- ⏳ Env vars: empty. Add per ticket — DO NOT pre-populate placeholders.
- ⏳ Custom domain: not yet configured (deferred to THS-14 deploy).

## Supabase state

- ✅ Local Docker stack running, schema applied at `9142315`. All 23 tables present, RLS verified.
- ✅ `supabase/config.toml` `additional_redirect_urls` corrected to `localhost:3000/**` + `127.0.0.1:3000/**` glob. Restart required after edits — `supabase stop && supabase start`.
- ❌ Cloud Supabase Pro project NOT YET CREATED (deferred to step 14 deploy — Phase 1 dev is local-only).

## Memory rules touched this session

- **Updated:** `project_thesis.md` will reflect THS-3 SHIPPED at PR #3 / `49b1221`.
- **No new feedback rules added.**

## Onboarding packet for parallel Claude Chat

`~/Documents/AI-Thesis-Onboarding-Packet-2026-04-28.zip` (1.3 MB) — out of date as of THS-3 ship. Regenerate when DESIGN_SPEC or HANDOFF changes materially before sharing with Chat.

---

## Continuation note for Terry to paste to next Claude

> **Refer to `HANDOFF.md` and `PROGRESS.md` in `/Users/terryturner/Projects/thesis/` for full context. THS-1 + THS-2 + THS-3 + THS-4 are merged on `main` (THS-4 squash at `2f5aa9e`). Perplexity Checkpoint #1 is CLEARED 2026-04-29 — THS-5 (Watchlist CRUD) is unblocked, Linear status `In Progress`. PR #5 (`fix(ui): rounded-md radius on command palette`) may still be open against main; Codex cleared it ("Breezy!"), and per locked protocol Codex is advisory only — Terry's approval is the only merge gate. Run the SESSION-STARTUP SANITY CHECKS (`git fetch`, `git status`, `gh pr list --state open`, `supabase status`), then ASK ME what to work on — do not auto-assign.**
