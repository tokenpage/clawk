# Clawk — Implementation Plan

Deliverable-ordered. Each step should be shippable and demeable on its own.

---

## Step 1 — Project Skeleton

Get a running app + API with nothing in it, just the plumbing.

**App** (`clawk/app/`)
- React app using `@kibalabs/ui-react`, `@tanstack/react-query`, `wagmi`, `@kibalabs/core-react` router
- Single `HomePage` placeholder
- `ClawkClient` extending `ServiceClient` (same pattern as `YieldSeekerClient`)
- Dockerized, same build setup as agent-hack/app

**API** (`clawk/api/`)
- Python + `kiba-core`, same structure as agent-hack/api
- Postgres DB with Alembic migrations
- One health-check endpoint to confirm it's alive
- Dockerized

**Deliverable:** App loads in browser, API returns 200 on `/health`

> **TODO:** DB not yet set up — need to provision Postgres, create credentials, and populate `~/.clawk-api.vars` on the appbox before the API can be deployed and run.

## Step 2 — OpenClaw Agent Running

Get the OpenClaw runtime installed, configured, and deployed — with state persisted across redeployments.

**Local setup**
- Install OpenClaw globally (`npm install -g @openclaw/cli` or equivalent)
- Configure Gemini as the LLM in `~/.openclaw/config.yml` (verify correct model ID)
- Create `clawk/skills/market-research/SKILL.md` — teaches the agent to fetch Polymarket Gamma API data (markets, odds, volume). Read-only, no wallet.
- Create `clawk/skills/polymarket-trade/SKILL.md` — stub for now, just describes the trading intent
- Confirm agent can answer questions about live Polymarket markets locally

**Deployment**
- Add a GitHub Actions workflow `openclaw-deploy.yml` that SSHes to the appbox and restarts the OpenClaw process
- OpenClaw state (conversation history, skill state) lives in a named volume / persistent directory on the appbox (`~/clawk-agent-data/`) — mounted at the same path on every deploy so redeployment never wipes it
- Skills are copied from the repo into the container/process on deploy; config and state dirs are excluded from the copy and always read from the persistent volume

**Deliverable:** OpenClaw running on the appbox, agent answers questions about live Polymarket markets, redeployment doesn't wipe state

---

## Step 3 — Agent ↔ API Integration

Connect the agent to our backend so the frontend can talk to it.

- `conversation_manager.py` — stores chat history in DB (mirrors agent-hack pattern)
- API endpoints: `POST /v1/conversations/{id}/message`, `GET /v1/conversations/{id}/history`
- Wire OpenClaw agent execution into the API request handler
- Frontend `ChatPage` — basic chat UI (reuse `ChatView` component pattern from agent-hack)

**Deliverable:** Type a message in the browser, agent responds, history persists across refreshes

---

## Step 4 — AWK Wallet + Polymarket Trading

Wire up the onchain bits.

- Deploy AWK smart wallet on Polygon (or testnet first)
- `polymarket_smart_wallet.py` — mirrors `yieldseeker_smart_wallet_v1.py`, routes calls through AWK adapters
- Wrap `py-clob-client` to sign EIP-712 orders via EIP-1271 (smart wallet signing) — this is the hard part
- Update `polymarket-trade` skill with real tool implementations: place order, cancel order, check positions
- `polymarket_client.py` — thin wrapper around Gamma API + CLOB API

**Deliverable:** Agent can autonomously place a real (small) order on Polymarket via the AWK wallet

---

## Step 5 — Guardrail Demo + UI Polish

Make the demo story land.

- Deploy `PolymarketAdapter` + `USDCAdapter` contracts, register in AWK `AdapterRegistry`
- `OnchainStatusPage` — shows registered adapters, proves guardrails are active
- `AgentPage` — live positions, P&L, recent agent actions (mirrors `AgentOverviewPage`)
- Demo script: agent places trade → attempt rogue USDC transfer → show onchain revert
- Record demo video

**Deliverable:** Full end-to-end demo ready for submission

---

## Notes

- Steps 1–3 can be done without any crypto/wallet setup — good for early momentum
- Step 4 is the highest-risk step; if Polymarket CLOB + EIP-1271 proves too painful, swap in GMX/Kwenta perps (same AWK story, different protocol)
- Contracts (PolymarketAdapter) are intentionally last — they're needed for the demo story but not for building the agent itself
