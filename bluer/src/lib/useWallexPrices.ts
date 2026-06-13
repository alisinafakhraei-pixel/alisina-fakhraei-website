"use client"

import { useEffect, useRef, useState } from "react"
import { subscribeToAllPrices, fetchCurrentPrices, WALLEX_SYMBOL } from "@/lib/wallex"

export type LivePrice = { price: number; change24h: number }

export function useWallexPrices(coinSymbols: string[]): Map<string, LivePrice> {
  const [prices, setPrices] = useState<Map<string, LivePrice>>(new Map())
  const wanted = useRef(new Set<string>())

  useEffect(() => {
    wanted.current = new Set(coinSymbols.map((s) => WALLEX_SYMBOL[s]).filter(Boolean))
  })

  // Seed with current prices from REST, then keep live via WebSocket
  useEffect(() => {
    let cancelled = false

    fetchCurrentPrices().then((snapshot) => {
      if (cancelled) return
      setPrices((prev) => {
        const next = new Map(prev)
        for (const [sym, update] of snapshot) {
          if (wanted.current.has(sym)) {
            next.set(sym, { price: parseFloat(update.price), change24h: update["24h_ch"] })
          }
        }
        return next
      })
    }).catch(() => { /* use mock fallback silently */ })

    const unsub = subscribeToAllPrices((update) => {
      if (!wanted.current.has(update.symbol)) return
      setPrices((prev) => {
        const next = new Map(prev)
        next.set(update.symbol, {
          price: parseFloat(update.price),
          change24h: update["24h_ch"],
        })
        return next
      })
    })

    return () => {
      cancelled = true
      unsub()
    }
  }, [])

  return prices
}
