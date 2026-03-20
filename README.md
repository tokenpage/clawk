# Clawk

## Hackathon Details

**Event:** AI London 2026 (Encode Club)
**URL:** https://www.encodeclub.com/my-programmes/ai-london-2026
**Location:** 41 Pitfield St, London N1 6DA, UK (Encode Hub, Shoreditch)

### Timeline

| Day | Time | Event |
|-----|------|-------|
| Fri 20 | 13:00 | Kick-Off Event (15 min) — intro to tracks, how the weekend works |
| Fri 20 | 13:15 | Civic Workshop (15 min) — identity stack, hackathon challenge |
| Fri 20 | 13:30 | Base Workshop (15 min) — onchain developer tools |
| Fri 20 | 13:45 | Luffa Workshop (15 min) — messaging platform, bots & mini apps |
| Fri 20 | 14:00 | Keynote: Designing AI Systems That Can Be Trusted (30 min) |
| Fri 20 | 14:30 | AWS Workshop (30 min) — AI/ML services for your project |
| Fri 20 | 15:00 | Flare: AI + Trusted Compute for Onchain Finance (30 min) |
| Fri 20 | 15:30 | Architect: Building the world's first agentic website (30 min) |
| Fri 20 | 16:30 | Vercel Workshop (30 min) — deploy, AI SDK, dev tools |
| Fri 20 | 17:00 | **Checkpoint 1 — Team & Project Creation** |
| Fri 20 | 17:30 | OpenAI Workshop (30 min) — OpenAI Codex |
| Fri 20 | 18:00 | Building Voice Agents w/ ElevenLabs (30 min) |
| Sat 21 | 12:00 | **Checkpoint 2 — Mid-Hackathon Submission** |
| Sun 22 | 12:00 | **Checkpoint 3 — Final Submissions** |
| Sun 22 | 16:00 | Demo Day (1 hour) |

### Submission Requirements (all tracks)

- Demo video: short pitch + live demo (3 min)
- Pitch deck (only part editable after deadline)
- GitHub repo (public)

### Main Tracks

#### 1. AI Agents

Agents are everywhere, but most of them still can't do anything useful without a human in the loop. Real autonomy means making decisions, recovering from errors, and getting things done across tools and services without being told every step.

**Challenge:** Create autonomous agents, multi-agent systems, or agent-powered applications. Your project should demonstrate AI acting independently — making decisions, using tools, executing workflows, or interacting with services on behalf of a user.

**Judging Criteria:**
- **Autonomy:** Does the agent act on its own, or does it need hand-holding?
- **Usefulness:** Would someone actually use this?
- **Technical depth:** How well does it handle tool use, memory, error recovery, and multi-step reasoning?
- **Creativity:** Is the use case interesting or novel?

**Submission:** Demo video (3 min), pitch deck, GitHub repo (public).

#### 2. Creative AI

Generative AI can produce images, video, music, code, and text — but most apps using it feel the same. The interesting question isn't what AI can generate, it's what you build around it. What does an application look like when generation isn't a feature but the entire experience?

**Challenge:** Build an application where AI generation is the core experience — not a feature bolted on but the reason the product exists. Image, video, audio, music, text, 3D, code — if AI is creating it, it belongs here.

**Judging Criteria:**
- **Output quality:** Is what the AI produces actually good?
- **User experience:** Is it intuitive and enjoyable to use?
- **Originality:** Does this feel like something new, or just another wrapper?
- **Technical execution:** How well are the generative models integrated?

**Submission:** Demo video, pitch deck (include examples of generated output), GitHub repo.

#### 3. Vibe Coding

AI has changed how software gets built. Entire apps are being shipped in hours by people who let AI handle the heavy lifting. But fast doesn't always mean good. Can you use AI-assisted development to build something genuinely impressive in a weekend?

**Challenge:** Build a complete project from scratch using AI-assisted development tools. The track is about the process as much as the output — how effectively you used AI to go from zero to shipped in a weekend. Your project can be anything: an app, a game, a tool, a site. This is the only challenge which doesn't require you to integrate AI within the application. You're being judged on the output of your build.

**Judging Criteria:**
- **What you shipped:** Does it work? Is it polished?
- **Speed and ambition:** How much did you get done in the time?
- **AI-assisted process:** How effectively did you use AI tools in development?
- **Creativity:** Is the idea interesting?

**Submission:** Demo video, pitch deck, GitHub repo (all commits must be over the weekend — 50,000 line initial commits not allowed, no existing work), project description including which AI tools you used and how they helped.

#### 4. Onchain AI

AI and blockchain have barely scratched the surface together. Verifiable compute, autonomous on-chain agents, decentralized training, AI-powered protocols — there's a lot of unexplored territory here. What happens when intelligence meets trustless infrastructure?

**Challenge:** Build at the intersection of AI and blockchain. Agents that transact, on-chain inference, AI-powered DeFi, autonomous treasuries, AI-driven governance — if your project combines AI with crypto, it lives here.

**Judging Criteria:**
- **Integration:** How meaningfully does the project combine AI and blockchain? Is the chain essential, or could this work without it?
- **Technical execution:** Does it actually work on-chain?
- **Innovation:** Is this pushing the space forward?
- **Practicality:** Could this become a real product?

**Submission:** Demo video, pitch deck, GitHub repo.

### Partner Challenges (judged separately, can enter alongside a main track)

- **Add Guardrails to Your AI Agent (Civic)** — integrate Civic guardrails to inspect inputs/outputs, block malicious prompts, prevent unsafe tool calls. Requires TS or Python. Optional: MCP & OAuth 2 knowledge.
- **Build on Luffa** — agentic bots or mini apps on Luffa's messaging platform (payments, identity, access on-chain). Also has a social media challenge.

---

## Project: Clawk

**Concept:** An autonomous AI agent (OpenClaw + Gemini) with a constrained onchain smart wallet (AgentWalletKit) that can trade on prediction markets — proving that even a fully autonomous agent *cannot* misuse funds thanks to onchain parameter-level validation.

### The Problem

AI agents that manage money are dangerous. If the agent's server is compromised, or the LLM hallucinates a bad action, traditional wallets will happily execute whatever they're told — send funds to the wrong address, approve unlimited token spending to an attacker, etc. Server-side guardrails aren't enough because they can be bypassed.

### The Solution

**Onchain guardrails that the agent physically cannot break.** AWK's AdapterRegistry validates every target address and parameter at the smart contract level. Even if the agent's LLM goes rogue or the server is fully compromised, the wallet will revert any transaction that doesn't match a pre-registered, audited interaction pattern.

### Architecture

```
┌─────────────────────────────────────────────────────┐
│                    OpenClaw Agent                     │
│              (Gemini 3.1 Pro as LLM)                 │
│                                                       │
│  Skills:                                              │
│  ┌─────────────────┐  ┌──────────────────────────┐   │
│  │ Market Research  │  │ Trading Skill            │   │
│  │ Skill            │  │ (place/cancel orders,    │   │
│  │ (fetch odds,     │  │  check positions)        │   │
│  │  news, analyze)  │  │                          │   │
│  └────────┬─────────┘  └────────────┬─────────────┘   │
│           │                         │                  │
└───────────┼─────────────────────────┼──────────────────┘
            │                         │
            ▼                         ▼
   ┌────────────────┐     ┌─────────────────────────┐
   │ Polymarket      │     │ AgentWalletKit (AWK)    │
   │ Gamma API       │     │ Smart Wallet on Polygon │
   │ (read-only      │     │                         │
   │  market data)   │     │ AdapterRegistry         │
   └────────────────┘     │  ├─ PolymarketAdapter   │
                           │  │   (CTF Exchange only) │
                           │  ├─ USDCAdapter          │
                           │  │   (approve CTF only)  │
                           │  └─ No other targets     │
                           │      allowed             │
                           └─────────────────────────┘
                                      │
                                      ▼
                           ┌─────────────────────────┐
                           │ Polymarket CTF Exchange  │
                           │ (Polygon)                │
                           │ - Fill orders             │
                           │ - Split/merge positions   │
                           │ - Redeem winnings         │
                           └─────────────────────────┘
```

### Components

#### 1. OpenClaw (Agent Runtime)
- Open-source agentic runtime that gives LLMs "hands" via a skills system
- Configured with **Gemini 3.1 Pro** as the LLM (`google/gemini-3.1-pro-preview`)
- Skills are directories with a `SKILL.md` (YAML frontmatter + instructions) that teach the agent how to use tools
- Skills load from `~/.openclaw/skills` or workspace `./skills` directory
- We create custom skills for market research and trading

#### 2. AgentWalletKit — AWK (Onchain Wallet)
- Smart wallet framework for autonomous AI agents (https://agentwalletkit.tokenpage.xyz)
- **Key innovation:** validates *parameters*, not just function signatures, at the contract level
- **AdapterRegistry** — immutable registry of approved protocol addresses. Any call to an unregistered address reverts immediately
- **Protocol Adapters** — dedicated, audited code for each protocol interaction (e.g., a PolymarketAdapter that can only interact with the CTF Exchange)
- ERC-4337 native, supports batch transactions, paymaster gas sponsorship
- Deployed on all EVM chains — we use **Polygon** (where Polymarket lives)
- Even with full server compromise, an attacker cannot redirect funds — vault/target addresses are locked in the onchain registry

#### 3. Polymarket (Prediction Market) — *or alternative*
- Prediction market on **Polygon** using Gnosis Conditional Tokens Framework (ERC-1155)
- Hybrid CLOB: off-chain order book matching + on-chain settlement via CTF Exchange contract
- Orders are EIP-712 signed messages submitted to the CLOB API (`clob.polymarket.com`), settled atomically on-chain
- Collateral: USDC.e on Polygon
- Supports EIP-1271 (smart contract wallet signatures) — AWK wallets can sign orders
- SDKs: `py-clob-client` (Python), `clob-client` (JS/TS)
- Market data via Gamma API (`gamma-api.polymarket.com`) — no auth needed for reads

### OpenClaw Skills We Need to Build

#### `market-research` skill
- Fetches market data from Polymarket's Gamma API (markets, odds, volume, liquidity)
- Pulls relevant news/context for the agent to reason about
- Read-only — no wallet interaction needed

#### `polymarket-trade` skill
- Places orders via the Polymarket CLOB API using the AWK wallet
- Signs EIP-712 orders via the smart wallet (EIP-1271)
- Can check positions, cancel orders, redeem winnings
- All on-chain interactions go through AWK adapters — the skill *cannot* send funds anywhere except the registered CTF Exchange

### How AWK Constrains the Agent (The Demo)

This is the core value proposition we're proving:

| Scenario | Without AWK | With AWK |
|----------|-------------|----------|
| Agent tries to send USDC to random address | Succeeds — funds gone | **Reverts** — address not in AdapterRegistry |
| Compromised server calls `approve(ATTACKER, MAX)` | Succeeds — attacker drains wallet | **Reverts** — only pre-registered spender addresses allowed |
| LLM hallucinates a withdraw to wrong address | Succeeds if server executes it | **Reverts** — adapter only allows CTF Exchange interactions |
| Agent tries to trade on unapproved protocol | Succeeds — unknown risk | **Reverts** — no adapter registered for that protocol |

The agent has full autonomy to research markets and place trades, but is *physically unable* to misuse funds. The guardrails are onchain and immutable.

### Polymarket Alternatives

If Polymarket proves too complex (CLOB API auth + EIP-1271 signing from a smart wallet is non-trivial), other exciting trading activities that show off AWK guardrails:

- **Perpetual futures** (e.g., GMX, Kwenta, Polynomial on Polygon/Optimism/Arbitrum) — agent opens long/short positions with leverage, AWK ensures it can only interact with the registered perp exchange and can't withdraw margin to a random address
- **Options trading** (e.g., Lyra, Dopex) — agent buys/sells options contracts, constrained to approved vaults only
- **Other prediction markets** (e.g., Azuro, SX Bet) — similar concept, different protocol

The key is the agent doing something that *looks risky and exciting* (trading with real money, autonomously) while being provably safe underneath.

### Reference: polymarket-sniper-bot

Open-source Polymarket trading bot by [@kylecwalden](https://github.com/kylecwalden/polymarket-sniper-bot) — useful reference for our CLOB integration.

**How it connects to Polymarket:**
```python
from py_clob_client.client import ClobClient
from py_clob_client.clob_types import OrderArgs, OrderType
from py_clob_client.order_builder.constants import BUY

client = ClobClient("https://clob.polymarket.com", key=PRIVATE_KEY, chain_id=137, signature_type=sig_type)
client.set_api_creds(client.create_or_derive_api_creds())

# Place an order in ~3 lines
order_args = OrderArgs(token_id=token_id, price=price, size=shares, side=BUY)
signed_order = client.create_order(order_args)
client.post_order(signed_order, OrderType.GTC)
```

**Market scanning** — queries `https://gamma-api.polymarket.com/events?active=true&closed=false` with pagination, parses outcomes/prices/token IDs from JSON string fields in the response. No auth needed.

**Key deps:** `py-clob-client>=0.34.0`, `requests`, `python-dotenv`, `websockets`, `rich`, `schedule`

**What we need to adapt:**
- Bot uses an EOA private key (`signature_type=0` or `1`). We need EIP-1271 smart wallet signing via AWK (`signatureType=2`)
- `py-clob-client` may need wrapping/extending to route signing through the AWK wallet contract
- USDC approvals need to go through AWK adapters instead of direct EOA approvals
- Scanner code (Gamma API reads) is reusable as-is for our `market-research` skill

### Tech Stack

- **Agent:** OpenClaw + Gemini 3.1 Pro
- **Wallet:** AgentWalletKit (Solidity, ERC-4337)
- **Chain:** Polygon
- **Market:** Polymarket CLOB API + Gamma API (or alternative)
- **Skills:** Custom OpenClaw skills (TypeScript)
- **New contracts:** PolymarketAdapter for AWK (Solidity) — registers CTF Exchange as the only valid target
