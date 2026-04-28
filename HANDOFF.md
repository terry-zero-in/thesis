# Thesis — Session Handoff

**Session date:** 2026-04-27
**Closing Claude:** Code #184_04.24.2026 (06-042426), row `e7bff8c1-88a5-4701-8ec1-f80eb731e44c`
**Status at close:** THS-1 paused mid-scaffold awaiting Terry's design references.

---

## Project at a glance

**Thesis** is an AI-powered investment research portal. Personal institutional-grade research and decision system for a hybrid long/swing US equity portfolio. Watchlist → AI agents → triggers → memos → mandatory human approval gate → audit log. **No automated trade execution, ever.**

- **Local path:** `/Users/terryturner/Projects/thesis/`
- **GitHub:** <https://github.com/terry-zero-in/thesis> (private)
- **Linear team:** Thesis (id `21c004fc-6402-4d22-9316-fa9a05bb9b82`)
- **Linear project:** Phase 1 — MVP (id `696890cc-84bc-45ad-a22c-a24124cf9124`)
- **Blueprint source:** `/Users/terryturner/Downloads/Investment Portal Blueprint.md` (2,483 lines, sections A–N — read this end-to-end before doing anything)

## Current repo state

```
main branch:                empty initial commit (1e174fd)
ths-1-scaffold-tokens:      commit 25876de — chore: project hygiene (5 files)
                             ↳ README.md, .gitignore, .env.example,
                                .nvmrc (22.11.0), pnpm-workspace.yaml
```

**Nothing else exists.** No Next.js scaffold, no node_modules, no Tailwind, no components.

## Where work paused and why

THS-1 (Linear: "1. Scaffold Next.js repo + design tokens") is **In Progress**. Commit #1 landed. Next step was `pnpm create next-app@16` + Tailwind 4 `@theme` tokens + Geist fonts + shadcn init + ESLint/Prettier + throwaway `/tokens` page.

**Then Terry stopped me.** He has exact CSS, HTML renderings, and screenshots for the entire app's theme + formatting that he wants to share BEFORE any UI scaffolding begins. He explicitly said *"I want the entire app to follow this exact theme and formatting."*

Per Terry's "Match exactly = EVERYTHING" rule (memory: `feedback_communication_preferences`), pixel-perfect adherence is non-negotiable.

**Do not run create-next-app or write any UI/CSS until Terry has shared the references.** Even the throwaway `/tokens` page must conform.

---

## THE NEXT 5 TASKS (execute in order)

### 1. Receive and absorb Terry's design references
Ask Terry where they are. Three things to learn:
- **Paths or attachments** — file paths, screenshots in chat, or both
- **Format mix** — screenshots only, or HTML/CSS files I can read
- **Coverage** — global theme only, or specific screens (sidebar, dashboard, etc.)

Propose committing them to `/docs/design/` in the repo so they're versioned, but defer to Terry. Read everything in detail. Confirm the locked tokens still apply or capture any overrides.

### 2. Resume scaffold (still THS-1)
From `/Users/terryturner/Projects/thesis/` on branch `ths-1-scaffold-tokens`:
```bash
# Create scaffold in temp dir to preserve commit #1 files
cd /tmp
pnpm create next-app@16 thesis-scaffold --ts --tailwind --eslint --app --no-src-dir --use-pnpm --import-alias "@/*"
# Move all files except .git into the project dir
rsync -av --exclude='.git' --exclude='node_modules' /tmp/thesis-scaffold/ /Users/terryturner/Projects/thesis/
# Reconcile .gitignore (keep our additions, merge Next's)
cd /Users/terryturner/Projects/thesis
pnpm install
```

### 3. Tailwind 4 `@theme` block + Geist fonts + shadcn init + Prettier
Edit `app/globals.css` to add `@theme { ... }` with the LOCKED tokens (Terry's latest values, not the blueprint defaults):

```
canvas:   #121415
card:     #1B1D1E
sidebar:  #030303
elevated: #232526
accent:   #2E5BFF
success:  #3FB950   ← GitHub green, NOT blueprint #22C55E
warning:  #F0B72F   ← GitHub yellow, NOT blueprint #F59E0B
danger:   #E5484D   ← Radix red, NOT blueprint #EF4444
info:     #8b5cf6   ← matches blueprint violet
text-primary:   #F0F0F0
text-secondary: #9B9B9B
text-muted:     #666666
border:         #2A2A2A
font-sans:      Geist Sans
font-mono:      Geist Mono (with `font-feature-settings: "tnum"` on numeric utility)
```

- Wire Geist Sans + Mono via the `geist` npm package (pinned 1.7.0).
- Run `npx shadcn@latest init` — choose dark theme, our tokens, no slate base.
- Add `.prettierrc` (use Prettier 3.x). ESLint config comes from create-next-app — verify it's present.
- **Important:** This MUST conform to Terry's design references. If anything in his references conflicts with the tokens above, ASK before resolving.

### 4. Build `/app/tokens/page.tsx` verification page
Throwaway route. Renders:
- Every color swatch (color block, label with hex value, name)
- Geist Sans heading sample (sizes 14/16/24/32/48)
- Geist Mono numeric sample row showing tabular-figures alignment for prices/changes/volume (e.g., `$117.50` / `+2.74%` / `185,432,910`)

This proves tokens + fonts wire correctly without committing to design choices Terry hasn't approved.

### 5. Commit #2 + open PR + move THS-1 to In Review
```bash
git add .
git commit -m "feat(THS-1): Next.js 16 scaffold + Tailwind tokens + Geist fonts + /tokens verification page"
git push -u origin ths-1-scaffold-tokens
gh pr create --base main --title "THS-1: Scaffold Next.js repo + design tokens" --body "..."
# Then via Linear MCP:
mcp__claude_ai_Linear__save_issue id="THS-1" state="In Review"
```

PR title MUST start with `THS-1:` so Linear auto-links. Squash-merge (Perplexity's call). After merge, move THS-1 to Done and start THS-2.

---

## Locked decisions (do not relitigate without Terry's explicit override)

### Stack versions (pinned, checked live on npm registry 2026-04-27)
```
next             15.5.4 → upgrade to 16.2.4 per Perplexity
react            19.2.5
react-dom        19.2.5
typescript       5.7.3 (NOT 6 — too fresh)
tailwindcss      4.2.4
zod              3.25.x (NOT 4 — RHF peer-range chaos)
@supabase/supabase-js  2.104.1
@supabase/ssr    0.10.2
inngest          4.2.4
@anthropic-ai/sdk 0.91.0
@tanstack/react-table 8.21.3
recharts         3.8.1
@tremor/react    3.18.7 (note: Tremor OSS in maintenance mode; may swap for shadcn/charts)
react-hook-form  7.73.1
@hookform/resolvers 5.x
react-markdown   10.1.0
rehype-highlight 7.0.2
geist            1.7.0
resend           6.12.2
date-fns         4.x
vitest           4.1.5
@vitest/coverage-v8 4.1.5
```

### Auth + workflow
- **Magic-link auth** (Supabase Auth), single user (Terry). No email/password (blueprint had a stale email/password line; Perplexity overrode to magic-link).
- **One Resend email per memo** on `memo.status → pending_approval`, body = magic-link-authed deep link to `/memos/[id]/approve`. **No alert emails in Phase 1.**
- **Trigger evaluator code-only in Phase 1** — class + vitest tests + `POST /api/triggers/evaluate-now` endpoint. NO Inngest cron, NO automated alert generation. Cron lives in Phase 2.

### Data + agents
- **10 watchlist tickers seeded** per blueprint Section K: NVDA, MSFT, NET, MDB, INTC, PYPL, VZ, BRK-B, SPY, QQQ. Of these, NVDA / MSFT / NET / INTC / PYPL are **fully interactive** (research jobs, memos, approvals). The other 5 are watchlist rows + chart pages only in Phase 1.
- **LLMRouter** interface supports all 5 providers (Claude / GPT-5 / Gemini / Perplexity Sonar Pro / Perplexity Sonar). **Phase 1 wires only Anthropic + Perplexity.** No OpenAI, no Google, no Haiku fallback. If Sonnet errors, surface the error — don't paper over it.
- **No Marketaux in Phase 1.** Perplexity Sonar Pro's web grounding covers news. FMP analyst ratings fetched directly via FMP client and passed as agent context.
- **SEC EDGAR User-Agent:** exactly `Thesis Terry terry@zero-in.io` (no trailing period).

### Git + Linear workflow
- **One PR per ticket against `main`**, branch `ths-N-slug` (e.g., `ths-1-scaffold-tokens` — NOT Linear's auto-generated `terry/ths-1-1-...`). Squash-merge.
- **PR title format:** `THS-N: <title>` so Linear auto-links.
- **Linear state machine:** Todo → In Progress (when work starts) → In Review (when PR opens) → Done (after merge).
- **Linear MCP rule:** Claude operates Linear via MCP for everything. UI-only steps require explicit click-by-click instructions for Terry. (Memory: `feedback_linear_mcp_responsibility.md`.)

### Build order to Perplexity Checkpoint #1
THS-1 → THS-2 → THS-3 → THS-4. **Stop after THS-4 merges.** Perplexity grades against the blueprint, then unblocks THS-5+.

- **THS-1:** Next.js scaffold + tokens + Geist + shadcn init + ESLint/Prettier + `/tokens` page. **No sidebar, no auth, no Supabase, no app shell.**
- **THS-2:** Supabase schema + RLS on every table per blueprint **Section D** (Perplexity keeps writing "Section H" — Section H is "Retool vs Custom App". The schema is in Section D. Auth RLS pattern: `auth.uid() = user_id` on user-owned tables; public-read on `tickers` / `companies` / `data_sources`.)
- **THS-3:** Magic-link auth + protected route middleware + sign-in page.
- **THS-4:** Sidebar + topnav + ⌘K command palette.

Four Perplexity checkpoints across the whole Phase 1 build: after THS-4, after step 7 (first memo end-to-end), after step 11 (approval flow), and pre-prod (step 14).

---

## Setup state

| Tool | Status | Notes |
|---|---|---|
| Node | ✅ v24.14.1 | dev box; `.nvmrc` pins 22.11.0 for Vercel parity |
| pnpm | ✅ via brew | latest |
| git | ✅ 2.50.1 | |
| `gh` CLI | ✅ 2.89.0 | logged into `terry-zero-in`, ssh, `repo` scope |
| Supabase CLI | ✅ via brew | not yet `supabase init` in this repo |
| Vercel CLI | ✅ 52.0.0 | not yet `vercel link` |
| Docker Desktop | ✅ 4.71.0 running | took 3 attempts — see Gotchas |
| Inngest CLI | ⚠️ not yet | use `npx inngest-cli@latest dev` at use-time, no install needed |

## Gotchas

1. **Brew `docker` cask is dead.** The current cask is `docker-desktop` (the old `docker` cask is empty/redirect). Burned ~30 minutes finding this.
2. **Brew cask Docker install fails in non-interactive shells.** It needs sudo for `/usr/local/cli-plugins/` and `/usr/local/bin/` symlinks. Direct DMG download from <https://desktop.docker.com/mac/main/arm64/Docker.dmg> + `cp -R /Volumes/Docker/Docker.app /Applications/` is the reliable path.
3. **macOS Full Disk Access is NOT granted to Claude.** Can't `ls ~/Downloads`. If needed, Terry must enable in System Settings → Privacy & Security → Full Disk Access. Workaround: use `mdfind` (Spotlight) or have Terry paste paths.
4. **Working directory persists across `Bash` tool calls** in this Claude environment. The system says shell state doesn't persist but cwd does — verified.
5. **Section H vs Section D in blueprint.** Perplexity references "Section H" for the schema; the actual schema is in Section D. Section H is "Retool vs. Custom App." Use Section D as the schema source of truth.
6. **Tremor OSS is in maintenance mode** — the active product is Tremor Blocks (paid). If Tremor doesn't suffice for charts/KPIs, swap for `shadcn/charts` (which uses Recharts under the hood).
7. **Approval email scope is narrow.** ONE email per memo on state transition to `pending_approval`. Magic-link-authed deep link. No alert emails, no severity prefs, no email digests in Phase 1. Don't expand scope.

## Vercel state (open)

THS-1's done-criteria says "Empty dashboard route renders in dark theme on a Vercel preview URL." That requires linking the GitHub repo to Vercel. Two options:

**Option A — Vercel CLI:** `cd /Users/terryturner/Projects/thesis && vercel link` (Terry logs in once via browser). Then every push to a feature branch auto-deploys a preview.

**Option B — Vercel web UI (Terry's hands):**
1. Open <https://vercel.com/new>
2. "Import Git Repository" → search `terry-zero-in/thesis`
3. Import → keep defaults (framework: Next.js detected, root: /, build: `pnpm build`)
4. Deploy

Either way, Terry needs to authorize the Vercel-GitHub app for the new private repo (one-time browser step).

## Supabase state (deferred to THS-2)

- No `supabase init` yet
- No `supabase start` yet (Docker is running, ready when needed)
- Cloud Supabase Pro project: NOT YET CREATED (deferred to step 14 deploy — Phase 1 dev is local-only)

## Memory rules touched this session

- **Added:** `feedback_linear_mcp_responsibility.md` — Claude operates Linear via MCP; explicit clicks for Terry on UI-only steps
- **MEMORY.md index:** added one line under Feedback section

---

## Continuation note for Terry to paste to next Claude

> Refer to `HANDOFF.md` and `PROGRESS.md` in `/Users/terryturner/Projects/thesis/` for full session context, locked decisions, and your first 5 tasks. Do NOT run `create-next-app` or write any UI/CSS until Terry has shared his exact theme + formatting references — work is paused mid-THS-1 awaiting them.
