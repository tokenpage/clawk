---
name: odds-comparison
description: Get live football odds by browsing OddsPortal (no API key needed), then compare against Polymarket implied probabilities to identify arbitrage and value opportunities. Uses the browser tool to scrape odds from real bookmakers.
metadata: {"openclaw": {"tools": ["browser"]}}
---

## Odds Comparison & Arbitrage

**IMPORTANT: Always fetch live data. Never use odds, scores, kick-off times, or match details from memory or training data — these change constantly and will be wrong. Every time the user asks about odds or a match, you MUST browse OddsPortal to get the current data before responding.**

Scrape live bookmaker odds from OddsPortal using the browser tool, then cross-reference with Polymarket prices.

No API key required. OddsPortal aggregates odds from 20+ bookmakers (Bet365, William Hill, Unibet, Pinnacle, etc.) and is publicly accessible.

---

### Step 1 — find upcoming football fixtures on OddsPortal

Navigate to the football section for the relevant league. Use the browser tool to open the page and read the odds table.

Key OddsPortal URLs:
- EPL: `https://www.oddsportal.com/football/england/premier-league/`
- Champions League: `https://www.oddsportal.com/football/europe/champions-league/`
- La Liga: `https://www.oddsportal.com/football/spain/la-liga/`
- Bundesliga: `https://www.oddsportal.com/football/germany/bundesliga/`
- Serie A: `https://www.oddsportal.com/football/italy/serie-a/`
- All football today: `https://www.oddsportal.com/matches/football/`

Use the browser tool to navigate to the page and extract:
- Match name (home team vs away team)
- Kick-off date and time
- 1x2 odds columns (Home / Draw / Away) — shown as the best available decimal odds across all bookmakers

---

### Step 2 — get detailed odds for a specific match

Click into a specific match to see odds from all individual bookmakers. The match page URL format is:
`https://www.oddsportal.com/football/{country}/{league}/{home-team}-{away-team}-{match-id}/`

On the match page, extract the odds table which shows each bookmaker's Home / Draw / Away prices side by side.

---

### Step 3 — convert to implied probabilities and compare with Polymarket

Decimal odds → implied probability: `1 / decimal_odds`

Then use the market research skill to search Polymarket for the same match by team names and compare implied probabilities.

**Value bet**: if Polymarket's implied probability for an outcome differs from the bookmaker consensus by >5 percentage points, flag it.

**Arbitrage**: if the sum of the best available implied probabilities across all outcomes (from any combination of bookmakers + Polymarket) is less than 1.0, a risk-free profit exists.

```
arb_margin = (1/best_home_odds) + (1/best_draw_odds) + (1/best_away_odds)
profit_pct = (1 - arb_margin) * 100  [only valid if arb_margin < 1.0]
```

---

### Workflow: scan for value/arb across this weekend's matches

1. Browse `https://www.oddsportal.com/matches/football/` to get today's/this weekend's fixtures
2. For each match of interest, note the best available 1x2 odds
3. Search Polymarket for matching markets (use market research skill)
4. Convert all odds to implied probabilities
5. Calculate divergence and arb margin
6. Report the top opportunities sorted by divergence

---

### Presenting results

For each match show:
- Teams, league, kick-off time
- Best bookmaker odds per outcome (Home / Draw / Away) + implied probability
- Which bookmaker offers the best price for each outcome
- Polymarket equivalent market + implied probability (if found)
- Divergence in percentage points
- Arb margin (flag if < 1.0 = pure arb; flag if 1.0–1.05 = potential value)

---

### Notes

- OddsPortal may load odds dynamically via JavaScript. If the page content appears empty or incomplete, try scrolling or waiting briefly before reading.
- Pinnacle odds on OddsPortal are particularly useful as a "sharp" reference — Pinnacle has very low margins and their prices are considered the most accurate reflection of true probability.
- For in-play odds, check `https://www.oddsportal.com/matches/football/` which shows live matches at the top.
