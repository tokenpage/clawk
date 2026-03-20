---
name: polymarket-trade
description: Place, cancel, and check positions on Polymarket via the CLOB API using an AgentWalletKit smart wallet. Use this to execute trades on prediction markets.
metadata: {"openclaw": {"requires": {"env": ["POLYMARKET_CLOB_API_URL", "AWK_WALLET_ADDRESS"]}, "primaryEnv": "AWK_WALLET_ADDRESS"}}
---

## Polymarket Trading (stub)

This skill is a stub. Trading via the Polymarket CLOB API with an AgentWalletKit smart wallet will be implemented in Step 4.

When fully implemented, this skill will support:
- **Place order**: Buy or sell shares on a market outcome
- **Cancel order**: Cancel an open order by ID
- **Get positions**: List current open positions and P&L
- **Get orders**: List open orders

For now, if asked to place a trade, respond: "Trading is not yet enabled. I can research markets but cannot execute trades yet."
