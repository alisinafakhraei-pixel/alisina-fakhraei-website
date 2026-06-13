# Bluer — Project Reference

## What This Is
A mobile-first coin/asset tracker called **bluer**. Prototype only — no backend, all mock data. Tracks crypto + commodities P/L.

## Dev Commands
```bash
cd bluer
npm run dev          # http://localhost:3333 (use --port 3333)
npm run build        # production build check
npx shadcn@latest add <component>   # add shadcn components
```

## Stack
- **Next.js 16.2.9** (App Router) — note: this version has breaking changes, always check `node_modules/next/dist/docs/` before writing new Next.js patterns
- **React 19**
- **Tailwind CSS v4** — uses `@theme inline` and CSS custom properties, NOT the old `tailwind.config.js` pattern
- **shadcn/ui** — preset `b1au7YpGy`, initialized via `npx shadcn@latest init --preset b1au7YpGy --template next --rtl`
- **lucide-react** for icons
- **canvas-confetti** for buy/sell celebration

## File Map
```
src/
  app/
    page.tsx          — home page (hero card, transactions, coins list, buy/sell bar)
    layout.tsx        — root layout
    globals.css       — CSS vars, theme tokens, custom keyframes
  components/
    CoinCard.tsx      — individual coin card with live price ticking + P/L badge
    MiniChart.tsx     — SVG line chart with clip-rect draw animation, min/max tags
    BuySellModal.tsx  — dialog with buy/sell tabs, coin select, amount ↔ USD sync, confetti
    ThemeToggle.tsx   — dark/light toggle, persists to localStorage
    ui/               — shadcn primitives (button, card, badge, dialog, input, label, select, sheet, tabs)
  lib/
    mock-data.ts      — all mock coins, transactions, chart data, and helper fns
    utils.ts          — shadcn cn() utility
```

## Data Model (`mock-data.ts`)
```ts
Coin { id, symbol, name, price, change24h, holdings, avgBuyPrice, color }
Transaction { id, coinId, coinSymbol, type:"buy"|"sell", amount, priceAtTime, total, date }
CHART_DATA [{ date: "Jan"…"Jul", value: number }]
```

**Current coins:** BTC, ETH, USDT, XAG (Silver), XAU (Gold), WTI (Oil)

Helper functions exported: `getTotalValue`, `getTotalPL`, `getCoinPL`, `getCoinPLPercent`, `getBreakEven`

## Design System
- **Theme:** shadcn blue preset — primary is `oklch(0.488 0.243 264.376)` (blue)
- **Dark/light toggle** — class-based (`.dark` on `<html>`), stored in `localStorage`
- **Layout:** mobile-first, max-width `max-w-md` centered, sticky header + fixed bottom bar
- **Colors:** emerald-500 for gains, red-500 for losses
- **Coin brand colors** stored per coin in mock-data, used as left strip + avatar bg in CoinCard
- **Border radius:** shadcn uses `rounded-[min(var(--radius-4xl),24px)]` on cards
- **Animations:**
  - `animate-fade-up` — staggered fade-in for coin cards (defined in globals.css)
  - `price-flash-up` / `price-flash-down` — 0.8s color flash on price tick (globals.css)
  - Chart draw — clip rect animated via `requestAnimationFrame` in MiniChart
  - Confetti — canvas-confetti, colorful burst on buy, gray shower on sell

## UI Patterns / Preferences
- Mobile-first, no desktop sidebar
- Terse code, no comments unless non-obvious
- No extra abstractions — keep components flat
- All data is mock/static for now; when adding backend use Supabase (MCP available)
- `fmtCompact(n)` already adds `+`/`-` prefix — don't prepend manually
- Coin cards: color strip on left, symbol+name+live price on top row, My Value + P/L badge on bottom row
- Hero card contains: total value → all-time P/L → chart → weekly/monthly P/L → History expand
- Buy/sell bottom bar is fixed, opens `BuySellModal` with `defaultType` prop

## MCPs Available
- **Supabase** — for future DB (tables, migrations, edge functions)
- **shadcn** — component registry (`npx shadcn@latest add <name>`)
- **Canva, Slack, Linear, Intercom** — also connected but not used in this project yet

## What's Still Mock
- Prices tick randomly in `CoinCard` (±0.3% every 1.8–3s) — not real API
- Chart data is hardcoded 7-month array
- Transactions are static — no persistence
- No auth, no user accounts

## Next Feature Ideas (backlog)
- Real price feed (CoinGecko API or websocket)
- Supabase persistence for transactions
- Coin detail page with full chart + transaction history
- Portfolio allocation pie chart
- Push notifications for price alerts
