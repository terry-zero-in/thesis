# Thesis — Session Handoff

**Session date:** 2026-04-29 (continued from earlier 2026-04-29)
**Closing Claude:** Code #220_04.29.2026 (08-042926), row `3df4e2ce-7cd5-4e50-8bfd-84599c58eed7`
**Status at close:** THS-1 / THS-2 / THS-3 / THS-4 merged on `main`. PR #5 (radius fix) ✅ MERGED at `a1c4db0`. **THS-5 stub-first build PR #6 OPEN at `27081b5`** on `ths-5-watchlist` against main. Linear THS-5 → In Review with PR #6 attached. **Step 11 (live Massive swap) HELD** — `.env.local:23` rotation claimed but not reflected on disk per file-state-wins rule (`feedback_verify_claimed_state.md` codified this session).

---

## NEXT 3-5 TASKS (start here)

1. **Sanity checks.** `git fetch --all && git status && gh pr list --state open && supabase status`. Confirm `main` HEAD is `a1c4db0` (or newer), `ths-5-watchlist` HEAD is `27081b5` (or newer), PR #6 still open. Via Linear MCP confirm THS-5 still `In Review`.

2. **VERIFY `.env.local:23` rotation BEFORE any step-11 code.** Run:
   ```bash
   stat -f "mtime: %Sm size: %z" .env.local
   awk 'NR==23 {print "len:", length($0)}' .env.local
   ```
   Last-known-unchanged state at S220 close: mtime `Apr 29 07:03:08 2026`, size `3022`, line-23 length `48`.
   - **If any of those changed → rotation reflected, proceed to task 3.**
   - **If unchanged → ASK Terry directly. Do NOT echo or fabricate the value.** Surface using mtime/size/length only. The chat-pasted key (still on disk as of S220 close) is server-side invalidated per Terry's claim — running it against `api.massive.com` will 401.

3. **Step 11 — live Massive client swap.** Replace stub at `lib/massive/validate-ticker.ts` with live call:
   - `GET https://api.massive.com/v3/reference/tickers/{ticker}` with `Authorization: Bearer ${MASSIVE_API_KEY}`
   - 404 → `{ valid: false }` ; 200 + `results.active === false` → `{ valid: false }` ; 200 + active → return mapped fields
   - Map: `results.name → name` · `results.primary_exchange → primaryExchange` · `results.type → type` · `results.market_cap → marketCap` · `results.branding?.logo_url → logoUrl`
   - Symbol uppercased pre-fetch. Add normalization rule based on smoke-test result in task 4.

4. **Smoke-test.** Write a one-off `scripts/probe-massive.mjs` (gitignored or scratch). Run via `node --env-file=.env.local scripts/probe-massive.mjs`. Probe 3 symbols in parallel:
   - **AAPL** → assert 200 + `results.name` matches `/^Apple/`. Record exact name string in this HANDOFF (it informs UI display logic; quote verbatim per no-fabricated-quotes).
   - **BRK-B** → record status code.
   - **BRK.B** → record status code.
   - Whichever of BRK-B / BRK.B returns 200 is canonical. Add a normalization rule in `validateTicker` to convert the other form (Section K seeds use `BRK-B` hyphen). Re-test post-normalization with the input `"BRK-B"`. Note `results.ticker_root` + `results.ticker_suffix` for documentation.

5. **Second commit on `ths-5-watchlist`** w/ message `THS-5: live Massive ticker validation` (plus body: endpoint live, AAPL + BRK-B smoke-tested, normalization rule applied, `Refs THS-5`). Push (do NOT squash with stub commit — keep separate for granular Codex review). Trigger `@codex review` via PR comment. Hold for Codex + Terry approval. After both: squash-merge PR #6, Linear THS-5 → Done, delete branch. Then cut `ths-6-ticker-detail` from new main.

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
main:                   a1c4db0 — fix(ui): rounded-md radius on command palette per spec §7.9/§9.3 (#5)
                            ├─ 908536c — docs: closeout 2026-04-29 (S212)
                            ├─ cc342ea — docs: codex as advisory, not blocking
                            ├─ 2f5aa9e — THS-4 (#4)
                            ├─ fe4cdf3 — THS-3 (#3)
                            ├─ 9142315 — THS-2 (#2)
                            └─ 94e622f — THS-1 (#1)

ths-5-watchlist:        27081b5 — THS-5: Watchlist CRUD — TanStack table, add/remove modal, filters
                              [PUSHED · PR #6 OPEN · CODEX REVIEW TRIGGERED]
                              Live wiring (step 11) NOT YET COMMITTED — held on rotation gate
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

### `validateTicker` signature (locked, stub matches; live swap in step 11)

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
Symbol uppercased pre-fetch. `404 → { valid: false }`. `results.active === false → { valid: false }`. Map fields per Massive's `/v3/reference/tickers/{ticker}` response shape.

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

- THS-1 ✅ · THS-2 ✅ · THS-3 ✅ · THS-4 ✅ · PR #5 ✅
- **THS-5 🟡 In Review (PR #6, stub-first; step 11 held on rotation)**
- THS-6 ⬜ Ticker detail (chart + fundamentals)
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

- **NEW:** `feedback_verify_claimed_state.md` — file state wins over claimed state. Cross-project. Indexed in MEMORY.md.
- **NEW:** `feedback_pre_impl_loop.md` — pre-impl notes close on gates, not micro-decisions. Cross-project.
- **UPDATED:** `project_thesis.md` — THS-5 status block + provider rebrand + supplementary locks.
- **UPDATED:** `MEMORY.md` index — Thesis priority line refreshed; 2 new feedback entries added under Engineering Discipline.

## Onboarding packet for parallel Claude Chat

`~/Documents/AI-Thesis-Onboarding-Packet-2026-04-28.zip` (1.3 MB) — out of date as of THS-5 ship. Regenerate when DESIGN_SPEC or HANDOFF changes materially before sharing with Chat.

---

## Continuation note for Terry to paste to next Claude

> **Refer to `HANDOFF.md` and `PROGRESS.md` in `/Users/terryturner/Projects/thesis/` for full context. THS-1 through PR #5 are merged on `main` (HEAD `a1c4db0`). THS-5 PR #6 is OPEN at `27081b5` on `ths-5-watchlist` (stub-first build, Linear In Review). Step 11 (live Massive API swap) is HELD because `.env.local:23` rotation is claimed but not reflected on disk per the file-state-wins rule (`feedback_verify_claimed_state.md`). Run the SESSION-STARTUP SANITY CHECKS, verify `.env.local:23` rotation per task 2 of NEXT 3-5 TASKS, then ASK ME how to proceed — do not auto-assign. Do not echo or fabricate the chat-pasted key value; it is server-side invalidated.**
