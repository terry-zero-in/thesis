# Thesis — Session Handoff

**Session date:** 2026-04-28 (continued)
**Closing Claude:** Code #206_04.28.2026 (10-042826), row `48fb06c3-1df6-4b56-a0ee-4334866023d9`
**Status at close:** THS-3 SHIPPED. PR #3 open against `main`, Linear → In Review. Awaiting Terry's merge.

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
main branch:    9142315 — THS-2 merged (Supabase schema + RLS, all 23 tables)

ths-3-auth:     49b1221 — feat(THS-3): magic-link auth + protected proxy + sign-in/sign-out
                          [PUSHED · PR #3 OPEN · LINEAR → IN REVIEW]
                  +─ proxy.ts at repo root (Next 16, not middleware.ts)
                  +─ app/login/{page,login-form,actions}.tsx (useActionState form)
                  +─ app/auth/callback/route.ts (PKCE exchange, allow-listed ?next=)
                  +─ app/page.tsx (auth-aware redirect)
                  +─ app/dashboard/page.tsx (getUser defense + sign-out treatment)
                  +─ lib/auth/actions.ts (signOut server action)
                  +─ supabase/config.toml (additional_redirect_urls FIX)
                  +─ HANDOFF gotchas 19+20, inbucket → Mailpit naming sweep
```

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

## THE NEXT 3-5 TASKS (execute in order)

### 1. Sanity check on session open

```bash
cd /Users/terryturner/Projects/thesis
git fetch --all
gh pr view 3                          # PR status — open / merged / changes requested
git status                            # confirm state of working tree + current branch
git log -3 --oneline                  # confirm head = 49b1221 on ths-3-auth (or merged on main)
supabase status                       # confirm local Supabase running. If not, supabase start
```

Then via Linear MCP confirm THS-3 state. **If `gh pr view 3` shows merged, jump to step 2. If open with no review comments, ask Terry whether to wait for review or proceed to THS-4 prep on a separate branch. If comments exist, address them on `ths-3-auth` before anything else.**

### 2. Post-merge cleanup (only if PR #3 is merged)

```bash
git checkout main
git pull origin main                  # main now has THS-3 squash-merge
git branch -D ths-3-auth              # local cleanup; remote branch GitHub auto-deletes on squash-merge
```

Update Linear THS-3 → Done with merged commit hash. Confirm Vercel auto-deploy of main succeeded at <https://thesis-nu.vercel.app> and the magic-link flow works against the deployed instance — the deployed Supabase project doesn't exist yet (deferred to THS-14), so production auth will fail by design until then; deployed `/login` should still render correctly.

### 3. Start THS-4 — Sidebar + topnav + ⌘K

```bash
git checkout -b ths-4-shell
```

Move Linear THS-4 → In Progress via MCP.

**Read first, before any code:** `docs/design/DESIGN_SPEC.md` sections covering app shell (sidebar, topnav, command palette) — DESIGN_SPEC is the authoritative source. Also re-skim the 4 CleanShot screenshots and 2 HTML mockups in `docs/design/` to lock in the visual target.

### 4. Build the app shell layout

`app/(app)/layout.tsx` — wraps protected routes with sidebar + topnav. Server component. Reads user via `supabase.auth.getUser()` (defense-in-depth, even though `proxy.ts` already gates). Move `app/dashboard/page.tsx` and any other authed routes under `app/(app)/`. `/login` and `/auth/callback` stay outside the group so they render without the shell.

Sidebar items per blueprint Section L navigation (watchlist, memos, triggers, decisions, alerts, settings — all stub links for THS-4). Active-state styling per DESIGN_SPEC. Macro strip in topnav (8 tickers: SPX · NDX · RUT · VIX · US10Y · DXY · WTI · GOLD — placeholder values until THS-6 wires real data).

### 5. Build the ⌘K command palette MVP

shadcn primitives: `npx shadcn add command dialog`. Static command list for THS-4 (Open Watchlist, Open Memos, Sign Out, etc.) — wiring real navigation actions, real data deferred to later tickets. Keyboard shortcut: ⌘K opens, ESC closes, ↑↓ navigates, Enter executes. Test: open palette, search, navigate, execute Sign Out → lands on `/login`.

Then commit, push, open PR per the same workflow as THS-3. **THS-4 is Perplexity Checkpoint #1 — STOP after THS-4 merges, do not proceed to THS-5 until Perplexity grades against the blueprint.**

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

### Build order to Perplexity Checkpoint #1

THS-1 ✅ → THS-2 ✅ → THS-3 ✅ (in review) → THS-4. **Stop after THS-4 merges.** Perplexity grades against the blueprint, then unblocks THS-5+.

- **THS-1:** ✅ Done — scaffold + tokens + Geist + ESLint/Prettier + `/tokens` page + `/dashboard` placeholder. Live at https://thesis-nu.vercel.app.
- **THS-2:** ✅ Done — full Section D schema + RLS at `9142315`.
- **THS-3:** ✅ SHIPPED — magic-link auth + proxy.ts + /login + /auth/callback + sign-out. PR #3 in review at `49b1221`.
- **THS-4:** ⬜ Sidebar + topnav + ⌘K command palette. **Perplexity Checkpoint #1.**

Four Perplexity checkpoints across the whole Phase 1 build: after THS-4, after step 7 (first memo end-to-end), after step 11 (approval flow), and pre-prod (step 14).

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

> **Refer to `HANDOFF.md` and `PROGRESS.md` in `/Users/terryturner/Projects/thesis/` for full context, locked decisions, and your first 5 tasks. THS-1 + THS-2 are merged on `main`. THS-3 is SHIPPED on `ths-3-auth` at `49b1221` — PR #3 (https://github.com/terry-zero-in/thesis/pull/3) is open against main with Linear THS-3 → In Review. Start with task 1 (sanity check `gh pr view 3` to determine state), then either address review feedback OR move to THS-4 prep depending on PR status.**
