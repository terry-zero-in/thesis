# Thesis

AI-powered investment research portal — a personal institutional-grade research and decision command center for a hybrid long/occasional-swing US equity portfolio.

The system monitors a watchlist of tickers with scheduled AI agents, fires structured triggers when valuation, momentum, or catalyst conditions are met, synthesizes research into investment memos, and routes every memo through a mandatory human approval gate. No automated trade execution.

## Stack

- **Next.js 16** — App Router, React 19, Server Components default
- **TypeScript 5.7** — strict mode
- **Tailwind CSS 4** — CSS-first via `@theme`
- **shadcn/ui** — primitives
- **Supabase** — Postgres + Auth (magic-link)
- **Inngest** — durable workflow engine
- **Vitest** — unit and integration tests
- **Resend** — transactional approval emails

## Local development

```bash
pnpm install
supabase start
pnpm dev
```

App boots at <http://localhost:3000>.

## Project status

Phase 1 — MVP. See Linear team **Thesis**, project **Phase 1 — MVP** (THS-1 through THS-14).

## Disclaimer

This system is for personal investment research. All output is analytical, not advisory. Nothing in this system constitutes investment advice; human judgment is required at every decision point by design.
