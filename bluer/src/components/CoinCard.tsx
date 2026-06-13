"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { type Coin, getCoinPL, getCoinPLPercent } from "@/lib/mock-data"

function fmtPrice(price: number) {
  if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (price >= 1)    return price.toFixed(2)
  return price.toFixed(4)
}

function fmtUSD(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtCompact(n: number) {
  const abs = Math.abs(n)
  if (abs >= 1000) return `${n < 0 ? "-" : "+"}$${(abs / 1000).toFixed(1)}k`
  return `${n < 0 ? "-" : "+"}$${abs.toFixed(2)}`
}

type Props = {
  coin: Coin
  delay: number
  livePrice?: number
}

export function CoinCard({ coin, delay, livePrice }: Props) {
  const price                 = livePrice ?? coin.price
  const [flash, setFlash]     = useState<"up" | "down" | null>(null)
  const prevPrice             = useRef(coin.price)

  useEffect(() => {
    if (livePrice === undefined || livePrice === prevPrice.current) return
    const dir = livePrice > prevPrice.current ? "up" : "down"
    prevPrice.current = livePrice
    setFlash(dir)
    const t = setTimeout(() => setFlash(null), 820)
    return () => clearTimeout(t)
  }, [livePrice])

  const pl       = getCoinPL({ ...coin, price })
  const plPct    = getCoinPLPercent({ ...coin, price })
  const holdVal  = price * coin.holdings
  const pos      = pl >= 0

  return (
    <Card
      className="active:scale-[0.99] transition-transform animate-fade-up overflow-hidden"
      style={{ animationDelay: `${delay * 60}ms` }}
    >
      <CardContent className="py-0 px-0">
        <div className="flex items-stretch">

          {/* Color strip */}
          <div className="w-1 shrink-0 rounded-l-xl" style={{ background: coin.color }} />

          <div className="flex-1 px-4 py-3 min-w-0">
            {/* Row 1: symbol/name + live price */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ background: coin.color }}
                >
                  {coin.symbol.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm">{coin.symbol}</span>
                  <span className="text-muted-foreground text-xs ml-1.5 truncate">{coin.name}</span>
                </div>
              </div>

              {/* Live price */}
              <span
                className={`text-sm font-semibold tabular-nums transition-none shrink-0 ${
                  flash === "up" ? "price-flash-up" : flash === "down" ? "price-flash-down" : ""
                }`}
              >
                ${fmtPrice(price)}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 my-2" />

            {/* Row 2: my USD value (left) + P/L badge (right) */}
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">My Value</p>
                <p className="text-base font-bold leading-tight">${fmtUSD(holdVal)}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {coin.holdings} {coin.symbol}
                </p>
              </div>

              <div className={`text-right shrink-0 px-2 py-1.5 rounded-xl ${pos ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                <p className={`text-sm font-bold leading-tight ${pos ? "text-emerald-500" : "text-red-500"}`}>
                  {fmtCompact(pl)}
                </p>
                <p className={`text-[11px] font-medium ${pos ? "text-emerald-500" : "text-red-500"} opacity-80`}>
                  {pos ? "+" : ""}{plPct.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
