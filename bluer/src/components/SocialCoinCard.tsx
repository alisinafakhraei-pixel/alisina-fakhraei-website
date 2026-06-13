"use client"

import { Card, CardContent } from "@/components/ui/card"
import { type Coin, getCoinPL, getCoinPLPercent } from "@/lib/mock-data"

function fmtPrice(price: number) {
  if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (price >= 1) return price.toFixed(2)
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
}

export function SocialCoinCard({ coin, delay }: Props) {
  const pl = getCoinPL(coin)
  const plPct = getCoinPLPercent(coin)
  const holdVal = coin.price * coin.holdings
  const pos = pl >= 0

  return (
    <Card
      className="animate-fade-up overflow-hidden"
      style={{ animationDelay: `${delay * 70}ms` }}
    >
      <CardContent className="py-0 px-0">
        <div className="flex items-stretch">
          <div className="w-1 shrink-0 rounded-l-xl" style={{ background: coin.color }} />
          <div className="flex-1 px-4 py-3 min-w-0">
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
              <span className="text-sm font-semibold tabular-nums shrink-0">
                ${fmtPrice(coin.price)}
              </span>
            </div>

            <div className="border-t border-border/50 my-2" />

            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Holding Value</p>
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
