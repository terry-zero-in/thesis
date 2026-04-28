# Thesis — Session Handoff

**Session date:** 2026-04-28 (continued)
**Closing Claude:** Code #202_04.28.2026 (06-042826), row `b0a7f950-c537-4e3b-b7c4-188014984f9f`
**Status at close:** THS-2 SHIPPED + merged. THS-3 in progress at WIP commit `0fd5152` on `ths-3-auth` (not pushed).

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
                          ├─ supabase/migrations/20260428111056_initial_schema.sql
                          ├─ supabase/config.toml
                          ├─ types/supabase.ts (1410 lines, all 23 tables typed)
                          └─ deps: @supabase/supabase-js@2.104.1, @supabase/ssr@0.10.2
                                   pnpm.onlyBuiltDependencies: ["supabase"]

ths-3-auth:     0fd5152 — WIP, NOT pushed, NO PR opened yet
                          ├─ shadcn 4.5.0 init: components.json, lib/utils.ts
                          ├─ globals.css: HANDOFF token mapping in :root
                          │              (light-mode + .dark blocks removed)
                          ├─ components/ui/{button,input,label}.tsx (shadcn primitives,
                          │                                          @base-ui/react)
                          ├─ app/tokens/page.tsx: shadcn primitives Section added
                          ├─ lib/supabase/client.ts (createBrowserClient<Database>)
                          ├─ lib/supabase/server.ts (createServerClient<Database>,
                          │                          async cookies() per Next 16)
                          └─ lib/supabase/proxy.ts (updateSession helper)
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

shadcn                  4.5.0     ✅ THS-3 (partial)
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
git checkout ths-3-auth && git status   # should be clean, on ths-3-auth, at 0fd5152
git log -3 --oneline                    # confirm 0fd5152 is HEAD on this branch
gh pr list                              # should be empty (no PR open yet for THS-3)
supabase status                         # confirm local stack still up; if not, supabase start
```

Then via Linear MCP: confirm THS-3 is **In Progress**. If anything looks off, surface to Terry before proceeding.

### 2. Build `proxy.ts` at the repo root

Next 16 renamed `middleware.ts` to **`proxy.ts`** and the export is `proxy` not `middleware`. (Source: `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.)

`proxy.ts` wraps `updateSession` from `lib/supabase/proxy.ts` (already written) and implements Terry's locked routing decision:

- PUBLIC: `/login`, `/auth/callback`
- PROTECTED: everything else
- Unauthenticated request to a protected path → 307 redirect to `/login`
- Authenticated request to `/login` → 307 redirect to `/dashboard`

Use the canonical Next 16 matcher that excludes `_next/static`, `_next/image`, `favicon.ico`, etc. Verify by hitting all 5 routes (see step 5 test matrix).

### 3. Build `/login` page + magic-link server action

`app/login/page.tsx` — server component, dark-themed minimal layout (single card, brand wordmark above it). Uses shadcn `Label`, `Input`, `Button` (already installed). Server action calls:

```ts
await supabase.auth.signInWithOtp({
  email,
  options: { emailRedirectTo: `${origin}/auth/callback` }
});
```

After submit, swap the form for a "Check your email" success state in the same card. Don't redirect — the magic link arrives by email and the click brings the user back via `/auth/callback`.

### 4. Build `/auth/callback` + update `/` + sign-out helper

- `app/auth/callback/route.ts` — Route Handler. Reads `code` from `request.nextUrl.searchParams`, calls `supabase.auth.exchangeCodeForSession(code)`. On success, `redirect('/dashboard')`. On failure, `redirect('/login?error=auth_callback_failed')`.
- `app/page.tsx` — server component. Reads session via `lib/supabase/server.ts`. Authed → `redirect('/dashboard')`. Unauth → `redirect('/login')`. Render nothing.
- Sign-out server action — put it at `lib/auth/actions.ts` or inline on `/dashboard`. Calls `supabase.auth.signOut()` then `redirect('/login')`. Wire a temporary "Sign out" Button on the `/dashboard` placeholder so step 5 can test it.

### 5. Test → commit → push → PR → Linear

**Middleware redirect matrix (unauth):**
- GET `/` → 307 → `/login`
- GET `/dashboard` → 307 → `/login`
- GET `/tokens` → 307 → `/login`
- GET `/login` → 200
- GET `/auth/callback` (no code) → 200 (or 307 to `/login?error=...` is also acceptable)

**Magic-link E2E against local Mailpit:**
- POST `/login` with email → form switches to success state
- Open `http://127.0.0.1:54324` (Supabase CLI's local mail UI; renamed from inbucket to Mailpit in a recent CLI release — same port, same purpose), find the magic-link email, click the link
- Lands on `/dashboard` authenticated. Reload — still authenticated.
- GET `/login` while authed → 307 → `/dashboard`

**Sign-out:**
- Click sign-out button on `/dashboard` → redirects to `/login`
- Subsequent GET `/dashboard` → 307 → `/login`

After tests pass: `git add` specific files, commit, `git push -u origin ths-3-auth`, `gh pr create --base main --title "THS-3: Magic-link auth + protected middleware + sign-in"`. Move Linear THS-3 → **In Review** with the PR link.

---

## What's live

| Route | Purpose | Notes |
|---|---|---|
| `/` | Brand wordmark placeholder ("AI Thesis" · "Investment OS") | Will become auth-aware redirect in THS-3 |
| `/dashboard` | THS-1 acceptance placeholder | Real shell ships in THS-4 |
| `/tokens` | Design system regression page | Now includes a "shadcn primitives" section (THS-3 WIP) showing all 5 Button variants + email Input + Label |

`https://thesis-nu.vercel.app` reflects `main` (THS-2). The `ths-3-auth` branch is local-only.

---

## Where THS-3 paused

Linear THS-3 → **In Progress**. Branch `ths-3-auth` exists at `0fd5152` (one WIP commit), no PR open.

**Already landed in the WIP commit:**
- shadcn init + token mapping replaced (HANDOFF mapping respected, including the `--accent` → `--surface-hover` trap)
- shadcn primitives installed and visually verified on `/tokens`
- Supabase SSR client utilities written (`client.ts`, `server.ts`, `proxy.ts`)
- Next 16 docs read end-to-end for `proxy` + `cookies` + `authentication`

**Pending pieces of THS-3 (not yet started):**
- `proxy.ts` at repo root — wraps `updateSession` from `lib/supabase/proxy.ts`, then implements the protected/public routing decision tree
- `app/login/page.tsx` — magic-link form using shadcn Button/Input/Label, server action calls `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo } })`
- `app/auth/callback/route.ts` — Route Handler that calls `exchangeCodeForSession(code)` then redirects to `/dashboard`
- `app/page.tsx` — server component, reads session, redirects to `/dashboard` (authed) or `/login` (unauth). No content render
- Sign-out server action — calls `supabase.auth.signOut()` then `redirect('/login')`. Wired to a button on `/dashboard` placeholder for testability
- Middleware redirect-matrix test (5 unauth routes + authed `/login`)
- End-to-end magic-link flow against local Mailpit (`http://127.0.0.1:54324` — formerly inbucket)
- Sign-out flow test
- Commit, push, open PR, move Linear → In Review

---

## Locked decisions (do not relitigate without Terry's explicit override)

### THS-3 (locked 2026-04-28 — current session)

- **Sign-in route:** `/login` (override of /sign-in default). Source: Linear THS-3 description says "/app/login page" explicitly. Rule: Linear ticket text is the source of truth for routes/copy; drift requires Terry override.
- **Post-magic-link redirect:** `/dashboard`
- **Protected scope:** gate everything except `/login` + `/auth/callback`. `/` redirects to `/dashboard` if authed, `/login` if not
- **Signup gating:** none in dev. RLS bubble is the defense. Allow-list lockdown deferred to THS-14 deploy
- **Single-user, magic-link only.** No password, no signup form, no OAuth
- **shadcn token mapping:** site is always dark, single `:root` block (no `.dark` toggle). HANDOFF table mapping respected verbatim. shadcn `--accent` → `--surface-hover` (NOT brand `--accent`)
- **Components installed:** button, input, label only (no extra primitives in THS-3)

### THS-2 (locked 2026-04-28 — landed at `9142315`)

- Schema source-of-truth = blueprint **Section D**, not Section H (Section H is "Retool vs Custom App")
- All 23 Section D tables. Section D names exclusively (`watchlist_tickers`, `investment_memos`, `audit_logs` — plural)
- No `cost_events` table. Cost tracking via `agent_outputs.cost_usd` + `audit_logs.metadata` JSONB
- RLS on every table (23). 17 user-owned via `auth.uid() = user_id` with EXISTS-subquery on six child tables (`watchlist_tickers`, `agent_outputs`, `memo_versions`, `trigger_events`, `decision_logs`, `thesis_checkpoints`). 6 public-read with `SELECT USING (true)`
- `(SELECT auth.uid())` wrap per Supabase performance guidance
- `workflow_runs` has no `user_id` per Section D — Phase 1 single-user permissive policy; tighten in Phase 5
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
zod                  3.25.x — install in THS-3 form work (NOT 4 — RHF peer-range chaos)
inngest              4.2.4  — install in THS-9
@anthropic-ai/sdk    0.91.0 — install in THS-7
@tanstack/react-table 8.21.3 — install in THS-5/6
recharts             3.8.1  — install in THS-6
@tremor/react        3.18.7 (note: Tremor OSS in maintenance mode; may swap for shadcn/charts)
react-hook-form      7.73.1 — install in THS-3 form work
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
- **Cloud paste discipline:** migrations + auth SQL run **locally only** via `supabase db reset` against the Docker stack. Cloud paste happens only at THS-14 deploy when the actual Thesis Supabase Pro project is created. (Terry historically pastes SQL into a single Fontera Supabase scratchpad — a Thesis migration was inadvertently pasted there during THS-2; a surgical rollback dropped all 23 Thesis tables + the `handle_new_auth_user` function. Fontera's own `handle_new_user` was untouched. Lesson: never paste THS-N migrations into Fontera.)

### Build order to Perplexity Checkpoint #1

THS-1 ✅ → THS-2 ✅ → THS-3 (in progress) → THS-4. **Stop after THS-4 merges.** Perplexity grades against the blueprint, then unblocks THS-5+.

- **THS-1:** ✅ Done — scaffold + tokens + Geist + ESLint/Prettier + `/tokens` page + `/dashboard` placeholder. Live at https://thesis-nu.vercel.app.
- **THS-2:** ✅ Done — full Section D schema + RLS at `9142315`.
- **THS-3:** 🟡 In Progress at `0fd5152` (WIP commit on `ths-3-auth`). Magic-link auth + protected `proxy.ts` + sign-in page + shadcn init.
- **THS-4:** Sidebar + topnav + ⌘K command palette.

Four Perplexity checkpoints across the whole Phase 1 build: after THS-4, after step 7 (first memo end-to-end), after step 11 (approval flow), and pre-prod (step 14).

### shadcn token mapping (already executed in THS-3 WIP)

shadcn 4.5.0 init landed in THS-3. The HANDOFF mapping was applied verbatim to `app/globals.css` `:root` block. `.dark` block was removed (site always dark). Pre-locked mapping reference:

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
| Chromium (headless) | ✅ via `npx playwright install chromium` | binary at `~/Library/Caches/ms-playwright/chromium-1217/...`. NOT MCP-attached (MCP playwright wants Google Chrome at `/Applications/Google Chrome.app/`, which isn't installed). For Claude-driven screenshots, invoke the binary directly with `--headless --screenshot=...` |
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

## Vercel state (live)

- ✅ Project linked: `terry-8893s-projects/thesis`
- ✅ GitHub auto-deploy connected to `terry-zero-in/thesis`
- ✅ Latest deploy reflects `main` at `9142315` (THS-2)
- ⏳ Env vars: empty. Add per ticket — DO NOT pre-populate placeholders.
- ⏳ Custom domain: not yet configured (deferred to THS-14 deploy).

## Supabase state

- ✅ Local Docker stack running, schema applied at `9142315`. All 23 tables present, RLS verified.
- ❌ Cloud Supabase Pro project NOT YET CREATED (deferred to step 14 deploy — Phase 1 dev is local-only).

## Memory rules touched this session

- **Updated:** `project_thesis.md` — THS-2 marked shipped (`9142315`); THS-3 marked partial at `0fd5152`. Token mapping notes carried.
- **No new feedback rules added.**

## Onboarding packet for parallel Claude Chat

`~/Documents/AI-Thesis-Onboarding-Packet-2026-04-28.zip` (1.3 MB) — out of date as of this session. Regenerate when DESIGN_SPEC or HANDOFF changes materially before sharing with Chat.

---

## Continuation note for Terry to paste to next Claude

> **Refer to `HANDOFF.md` and `PROGRESS.md` in `/Users/terryturner/Projects/thesis/`. THS-1 + THS-2 are merged on `main` (latest `9142315`). THS-3 is mid-flight: branch `ths-3-auth` at WIP commit `0fd5152` (not pushed). Pending pieces of THS-3 are described in HANDOFF "Where THS-3 paused" — check `git log` and `git status` to confirm state, then ask Terry which piece to take next.**
