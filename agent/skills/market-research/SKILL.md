---
name: polymarket-market-research
description: Fetch live prediction market data from Polymarket. Use this to look up active markets, current odds, trading volume, and market details from the Polymarket Gamma API. Read-only — no wallet or trading involved.
metadata: {"openclaw": {"requires": {"env": ["POLYMARKET_GAMMA_API_URL"]}, "primaryEnv": "POLYMARKET_GAMMA_API_URL"}}
---

## Polymarket Market Research

You have access to the Polymarket Gamma API for reading live prediction market data.

Base URL: use the `POLYMARKET_GAMMA_API_URL` environment variable (default: `https://gamma-api.polymarket.com`).

### Available endpoints

**List active markets**
```
GET /markets?active=true&closed=false&limit=20&order=volume24hr&ascending=false
```
Returns markets sorted by 24h volume. Each market has: `id`, `question`, `slug`, `endDate`, `volume`, `liquidity`, `outcomes` (array of outcome names), `outcomePrices` (array of current probabilities as decimals).

**Get a specific market**
```
GET /markets/{conditionId}
```

**Search markets by keyword**
```
GET /markets?active=true&closed=false&_c={keyword}
```

**List events (grouped markets)**
```
GET /events?active=true&closed=false&limit=10&order=volume&ascending=false
```

### How to use

Use `curl` or `fetch` to call these endpoints. No authentication required for read-only Gamma API calls.

Example — top markets by volume:
```bash
curl "https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=10&order=volume24hr&ascending=false" | jq '[.[] | {question, volume, outcomePrices, outcomes}]'
```

When presenting markets to the user:
- Show the market question
- Show current odds as percentages (e.g. `outcomePrices: ["0.72", "0.28"]` → "Yes 72% / No 28%")
- Show 24h volume in USD
- Show end date
