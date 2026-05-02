#!/usr/bin/env node
import { chromium } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

const phase = process.argv[2] || 'pre-ths-ds-1';
const OUT = path.resolve(process.cwd(), 'docs/design/screenshots', phase);
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  { name: 'login', path: '/login' },
  { name: 'root', path: '/' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'watchlist', path: '/watchlist' },
  { name: 'tokens', path: '/tokens' },
  { name: 'memos', path: '/memos' },
  { name: 'decisions', path: '/decisions' },
  { name: 'opportunities', path: '/opportunities' },
  { name: 'portfolio', path: '/portfolio' },
  { name: 'research-queue', path: '/research-queue' },
  { name: 'settings', path: '/settings' },
  { name: 'triggers', path: '/triggers' },
  { name: 'workflows', path: '/workflows' },
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

const results = [];
for (const r of ROUTES) {
  const url = `http://localhost:3000${r.path}`;
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(900);
    const file = path.join(OUT, `${r.name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    results.push(`${r.name.padEnd(18)} ${String(resp?.status() ?? '?').padEnd(4)} -> ${page.url().replace('http://localhost:3000', '')}`);
  } catch (e) {
    results.push(`${r.name.padEnd(18)} ERR  ${e.message.slice(0, 100)}`);
  }
}

await browser.close();
console.log(`\nWrote screenshots to: ${OUT}\n`);
console.log(results.join('\n'));
