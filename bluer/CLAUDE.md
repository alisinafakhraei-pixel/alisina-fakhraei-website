# Bluer — Project Reference

## What This Is
A mobile-first crypto portfolio tracker deployed at **https://bluer.alisinafakhraei.site/**. Real Supabase backend, Wallex live prices, full auth, social features.

## Dev Commands
```bash
cd "/Users/alisinafakhraei/Documents/[1] Work /[3] Claude/[3] Price tracker/bluer"
npm run dev          # http://localhost:3333
npm run build        # production build check
```

## Deploy Flow
```bash
# After changes, sync to the website repo and push — Vercel auto-deploys
rsync -a --exclude='.next' --exclude='node_modules' --exclude='.git' \
  "/Users/alisinafakhraei/Documents/[1] Work /[3] Claude/[3] Price tracker/bluer/" \
  "/Users/alisinafakhraei/Documents/[1] Work /[3] Claude/[100] Website design/alisina-fakhraei-website/bluer/"

cd "/Users/alisinafakhraei/Documents/[1] Work /[3] Claude/[100] Website design/alisina-fakhraei-website"
git add bluer/ && git commit -m "..." && git push
```

## Stack
- **Next.js 16.2.9** App Router, `"use client"` on all pages
- **React 19**
- **Tailwind CSS v4** — `@theme inline` in globals.css, no tailwind.config.js
- **shadcn/ui** — preset `b1au7YpGy`
- **Supabase** — project ref `erdfgmydfcgdjwvkzvkl`, URL `https://yeslswkxcruvaytljayr.supabase.co`
- **Wallex WebSocket** — `wss://api.wallex.ir/ws`, proxied via `/api/prices`
- **Vercel** — root directory: `bluer`, domain: `bluer.alisinafakhraei.site`

## File Map
```
src/
  app/
    page.tsx                    — portfolio home (hero card, chart, coins grid, buy/sell)
    layout.tsx                  — root layout with AuthProvider
    globals.css                 — CSS vars, theme tokens, keyframes
    api/prices/route.ts         — Wallex REST proxy (CORS workaround)
    search/page.tsx             — social tab (suggested + following + search)
    profile/[username]/page.tsx — public profile page (loads from Supabase by username)
  components/
    AuthModal.tsx               — idle banner → expandable login/signup sheet
    OnboardingTour.tsx          — 4-step tour with box-shadow spotlight + position-aware tooltip
    BuySellModal.tsx            — buy/sell dialog, coin select, amount↔USD sync, confetti
    CoinCard.tsx                — coin card with live price tick + P/L badge
    MiniChart.tsx               — SVG line chart, accepts real data prop, animated draw
    ProfileSheet.tsx            — edit display name, avatar color, shows @username
    UserCard.tsx                — full social user card (portfolio value, P/L, coin chips)
    SocialCoinCard.tsx          — coin card for other users' profiles
    ShareModal.tsx              — share portfolio as image
    BottomNav.tsx               — mobile bottom navigation
    ThemeToggle.tsx             — dark/light toggle
  lib/
    AuthContext.tsx             — React Context, Supabase auth, phone→email trick
    supabase.ts                 — supabase client + DbTransaction / DbProfile types
    useTransactions.ts          — fetch/add/delete from bluer_transactions
    usePortfolio.ts             — derive Coin[] from DbTransaction[], COIN_META
    useSocial.ts                — useSocialUsers, useFollows, usePublicProfile hooks
    useProfile.ts               — local profile + Supabase username sync
    useWallexPrices.ts          — WebSocket + REST seed for live prices
    wallex.ts                   — WS singleton, WALLEX_SYMBOL map, fetchCurrentPrices
    mock-data.ts                — Coin/Transaction types, CHART_DATA fallback
    social-data.ts              — SocialUser type (used by UserCard)
    utils.ts                    — shadcn cn()
```

## Supabase Schema

### `profiles`
```
id uuid PK (= auth.users.id)
phone text
name text
username text UNIQUE        — generated on signup: base + 4 random digits
display_name text
avatar_color text
email text
bio text
followers_count int default 0
following_count int default 0
```

### `bluer_transactions`
```
id uuid PK
user_id uuid FK → profiles.id
coin_id text          — lowercase key: "btc", "eth", "usdt"…
coin_symbol text      — uppercase: "BTC", "ETH"…
type "buy"|"sell"
amount numeric
price_at_time numeric
total numeric
date date
created_at timestamptz
```
RLS: INSERT/DELETE require `auth.uid() = user_id`; SELECT is public (all portfolios are public).

### `bluer_follows`
```
follower_id uuid FK → profiles.id
following_id uuid FK → profiles.id
PRIMARY KEY (follower_id, following_id)
```
RLS: INSERT/DELETE require `auth.uid() = follower_id`; SELECT is public.

## Coin Support
```ts
export const COIN_META = {
  btc:   { symbol: "BTC",   name: "Bitcoin",     color: "#F7931A" },
  eth:   { symbol: "ETH",   name: "Ethereum",    color: "#627EEA" },
  usdt:  { symbol: "USDT",  name: "Tether",      color: "#26A17B" },  // price = $1.00 static
  sol:   { symbol: "SOL",   name: "Solana",      color: "#9945FF" },
  bnb:   { symbol: "BNB",   name: "BNB",         color: "#F0B90B" },
  xrp:   { symbol: "XRP",   name: "XRP",         color: "#346AA9" },
  xaut:  { symbol: "XAUT",  name: "Tether Gold", color: "#D4AF37" },
  slvon: { symbol: "SLVON", name: "Silver",      color: "#A8A9AD" },
  usoon: { symbol: "USOON", name: "Crude Oil",   color: "#7C5C3B" },
}
```
USDT always returns $1.00 (no Wallex feed). All others via `WALLEX_SYMBOL` → WebSocket.

## Auth Pattern
- Phone number stored as `{phone}@bluer.app` in Supabase auth (email field)
- On signup: creates `auth.users` entry + inserts into `profiles` with generated username
- `AuthModal` has 3 states: `idle` (slim bottom banner) → `login` | `signup` (expanded sheet)
- `AuthContext` exposes: `user, isLoggedIn, isNew, hydrated, signUp, logIn, logOut, completeOnboarding`

## Onboarding Tour
- Triggered after signup (`isNew === true`)
- 4 steps targeting: `[data-tour="buy"]`, `[data-tour="chart"]`, `[data-tour="profile"]`, social tab
- Spotlight: `box-shadow: 0 0 0 9999px rgba(0,0,0,0.65)` on a fixed positioned div
- Tooltip: position-aware — appears at top when spotlight is in bottom half of screen (`rect.top > vh * 0.45`)

## Portfolio Derivation
`usePortfolio(transactions, fallbackPrices)` → `Coin[]`
- Groups transactions by `coin_id`
- `holdings = Σ buy.amount − Σ sell.amount` (only coins with holdings > 0 returned)
- `avgBuyPrice = Σ buy.total / Σ buy.amount`
- `price = fallbackPrices[id] ?? avgBuyPrice`

## Chart Data
`MiniChart` accepts optional `data?: {date: string, value: number}[]`.  
In `page.tsx`, `chartData` is computed via `useMemo` — one point per transaction, running portfolio value using `price_at_time` for the transacted coin and `avgPrice` for others. Falls back to mock `CHART_DATA` when < 2 points.

## Design System
- **Theme:** shadcn blue — primary `oklch(0.488 0.243 264.376)`
- **Dark/light:** class-based (`.dark` on `<html>`), stored in `localStorage`
- **Gains:** `text-emerald-500` / **Losses:** `text-red-500`
- **Animations:** `animate-fade-up` (staggered), `price-flash-up/down` (CoinCard), chart draw animation
- Mobile-first layout, `max-w-6xl` on desktop, sticky header, fixed bottom bar + `BottomNav`

## Mock Users (Supabase)
8 sample profiles with transactions:
- `alexchen4821` — BTC, ETH, SOL
- `saramoradi7312` — SOL, USDT, BTC
- `mikejohnson3391` — ETH, XRP
- `lenavolkov5528` — BTC, BNB, ETH, SOL
- `jinpark2294` — USDT, BTC
- `omaralrashid9871` — XRP, BNB, SOL
- `yukitanaka6640` — SOL, BTC, ETH
- `nadiapetrov1183` — XAUT (gold), BTC, ETH

## MCPs Available
- **Supabase** — DB queries, migrations, edge functions
- **shadcn** — component registry
