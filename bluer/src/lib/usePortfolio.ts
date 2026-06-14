"use client"

import { useMemo } from "react"
import type { DbTransaction } from "./supabase"
import type { Coin } from "./mock-data"

// Static metadata for each supported coin
export const COIN_META: Record<string, { symbol: string; name: string; color: string }> = {
  btc:   { symbol: "BTC",   name: "Bitcoin",     color: "#F7931A" },
  eth:   { symbol: "ETH",   name: "Ethereum",    color: "#627EEA" },
  usdt:  { symbol: "USDT",  name: "Tether",      color: "#26A17B" },
  sol:   { symbol: "SOL",   name: "Solana",      color: "#9945FF" },
  bnb:   { symbol: "BNB",   name: "BNB",         color: "#F0B90B" },
  xrp:   { symbol: "XRP",   name: "XRP",         color: "#346AA9" },
  xaut:  { symbol: "XAUT",  name: "Tether Gold", color: "#D4AF37" },
  slvon: { symbol: "SLVON", name: "Silver",      color: "#A8A9AD" },
  usoon: { symbol: "USOON", name: "Crude Oil",   color: "#7C5C3B" },
}

export function usePortfolio(transactions: DbTransaction[], fallbackPrices: Record<string, number> = {}): Coin[] {
  return useMemo(() => {
    const map: Record<string, { buyTotal: number; buyAmount: number; holdings: number }> = {}

    for (const tx of transactions) {
      const id = tx.coin_id
      if (!map[id]) map[id] = { buyTotal: 0, buyAmount: 0, holdings: 0 }
      if (tx.type === "buy") {
        map[id].buyTotal += tx.total
        map[id].buyAmount += tx.amount
        map[id].holdings += tx.amount
      } else {
        map[id].holdings -= tx.amount
      }
    }

    return Object.entries(map)
      .filter(([, v]) => v.holdings > 0)
      .map(([id, v]) => {
        const meta = COIN_META[id] ?? { symbol: id.toUpperCase(), name: id, color: "#6366f1" }
        const avgBuyPrice = v.buyAmount > 0 ? v.buyTotal / v.buyAmount : 0
        const price = fallbackPrices[id] ?? avgBuyPrice
        return {
          id,
          symbol: meta.symbol,
          name: meta.name,
          color: meta.color,
          price,
          change24h: 0,
          holdings: v.holdings,
          avgBuyPrice,
        } satisfies Coin
      })
  }, [transactions, fallbackPrices])
}
