---
name: polymarket-market-research
description: Fetch live prediction market data from Polymarket. Use this to discover active markets, current odds, trading volume, and market details from the Polymarket Gamma API. Supports football/soccer market discovery. Read-only — no wallet or trading involved.
metadata: {"openclaw": {"requires": {"env": ["POLYMARKET_GAMMA_API_URL"]}, "primaryEnv": "POLYMARKET_GAMMA_API_URL"}}
---

## Polymarket Market Research

**IMPORTANT: Always fetch live data from the Polymarket Gamma API. Never use market prices, odds, or outcomes from memory or training data — Polymarket prices update in real time and any cached values will be stale. Every time the user asks about a market, you MUST call the API to get current prices.**

You have access to the Polymarket Gamma API for reading live prediction market data.

Base URL: use the `POLYMARKET_GAMMA_API_URL` environment variable (default: `https://gamma-api.polymarket.com`).

### Available endpoints

**List active markets**
```
GET /markets?active=true&closed=false&limit=20&order=volume24hr&ascending=false
```
Returns markets sorted by 24h volume. Each market has: `id`, `question`, `slug`, `endDate`, `volume`, `liquidity`, `outcomes`, `outcomePrices` (current probabilities as decimals).

**Search markets by keyword**
```
GET /markets?active=true&closed=false&_c={keyword}&limit=20&order=volume24hr&ascending=false
```

**Get a specific market**
```
GET /markets/{conditionId}
```

**List events (grouped markets)**
```
GET /events?active=true&closed=false&limit=10&order=volume&ascending=false
```

**Search events by keyword**
```
GET /events?active=true&closed=false&_c={keyword}&limit=20&order=volume&ascending=false
```

### Discovering football (soccer) markets

Football markets on Polymarket use both "soccer" and "football" terminology. To find them:

**Step 1 — search by keyword (run both):**
```bash
curl "https://gamma-api.polymarket.com/markets?active=true&closed=false&_c=soccer&limit=50&order=volume24hr&ascending=false" | jq '[.[] | {id, question, slug, endDate, volume, outcomePrices, outcomes}]'

curl "https://gamma-api.polymarket.com/markets?active=true&closed=false&_c=football&limit=50&order=volume24hr&ascending=false" | jq '[.[] | {id, question, slug, endDate, volume, outcomePrices, outcomes}]'
```

**Step 2 — search events for tournaments/competitions:**
```bash
curl "https://gamma-api.polymarket.com/events?active=true&closed=false&_c=soccer&limit=20&order=volume&ascending=false" | jq '[.[] | {id, title, slug, markets: [.markets[]? | {question, outcomePrices, outcomes, volume}]}]'
```

Common football search terms to try: `soccer`, `football`, `premier league`, `champions league`, `world cup`, `la liga`, `bundesliga`, `serie a`, `mls`, `euro`.

**Step 3 — deduplicate and rank by volume:**
Combine results from both keyword searches, deduplicate by `id`, and sort by `volume` descending to surface the most liquid markets.

### Presenting results to the user

For each market show:
- Market question
- Current odds as percentages (`outcomePrices: ["0.72", "0.28"]` → "Yes 72% / No 28%", or for multi-outcome markets list each outcome with its probability)
- 24h volume in USD
- End date (when the market resolves)
- Liquidity in USD

No authentication required for Gamma API read calls.
