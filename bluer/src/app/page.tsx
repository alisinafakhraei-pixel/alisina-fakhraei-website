"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MiniChart } from "@/components/MiniChart"
import { BuySellModal } from "@/components/BuySellModal"
import { ShareModal } from "@/components/ShareModal"
import { ProfileSheet } from "@/components/ProfileSheet"
import { AuthModal } from "@/components/AuthModal"
import { OnboardingTour } from "@/components/OnboardingTour"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useProfile, getInitials } from "@/lib/useProfile"
import { useAuth } from "@/lib/AuthContext"
import { CoinCard } from "@/components/CoinCard"
import { BottomNav } from "@/components/BottomNav"
import {
  COINS,
  TRANSACTIONS,
} from "@/lib/mock-data"
import { useWallexPrices } from "@/lib/useWallexPrices"
import { WALLEX_SYMBOL } from "@/lib/wallex"
import { TrendingUp, TrendingDown, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react"

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtCompact(n: number) {
  const abs = Math.abs(n)
  if (abs >= 1000) return `${n < 0 ? "-" : "+"}$${(abs / 1000).toFixed(1)}k`
  return `${n < 0 ? "-" : "+"}$${abs.toFixed(2)}`
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"buy" | "sell">("buy")
  const [showTransactions, setShowTransactions] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { profile, initials } = useProfile()
  const { isLoggedIn, isNew, hydrated, completeOnboarding } = useAuth()

  const livePrices = useWallexPrices(COINS.map((c) => c.symbol))

  function getLivePrice(symbol: string, fallback: number): number {
    const ws = WALLEX_SYMBOL[symbol]
    return ws ? (livePrices.get(ws)?.price ?? fallback) : fallback
  }

  const totalValue = COINS.reduce((sum, c) => sum + getLivePrice(c.symbol, c.price) * c.holdings, 0)
  const totalPL    = COINS.reduce((sum, c) => sum + (getLivePrice(c.symbol, c.price) - c.avgBuyPrice) * c.holdings, 0)
  const cost       = totalValue - totalPL
  const totalPLPercent = cost > 0 ? (totalPL / cost) * 100 : 0
  const isPositive = totalPL >= 0

  const weeklyPL = totalPL * 0.18
  const weeklyPLPct = cost > 0 ? (weeklyPL / cost) * 100 : 0
  const monthlyPL = totalPL * 0.62
  const monthlyPLPct = cost > 0 ? (monthlyPL / cost) * 100 : 0

  function openBuy() { setModalType("buy"); setModalOpen(true) }
  function openSell() { setModalType("sell"); setModalOpen(true) }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        <span className="text-xl font-bold tracking-tight text-primary lg:hidden">bluer</span>
        <span className="hidden lg:block text-lg font-semibold text-foreground">My Portfolio</span>
        <div className="flex items-center gap-2">
          {/* Buy/Sell in header on desktop */}
          <div className="hidden lg:flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={openSell}>
              <ArrowUpRight className="w-3.5 h-3.5" /> Sell
            </Button>
            <Button data-tour="buy" size="sm" className="gap-1.5" onClick={openBuy}>
              <Plus className="w-3.5 h-3.5" /> Buy
            </Button>
          </div>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
          {/* Profile avatar */}
          <button
            data-tour="profile"
            onClick={() => setProfileOpen(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 hover:opacity-90 active:scale-95 transition-all"
            style={{ background: profile.avatarColor }}
          >
            {initials}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 pb-36 lg:pb-12 pt-4 space-y-4 lg:space-y-6">

        {/* Hero + Transactions row on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

          {/* Hero Card */}
          <Card className="lg:col-span-2">
            <CardContent className="pt-5 pb-4 space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Total Portfolio Value</p>
              <p className="text-3xl lg:text-4xl font-bold">${fmt(totalValue)}</p>
              <div className="flex items-center gap-2">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-semibold ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                  {isPositive ? "+" : ""}{fmt(totalPL)} ({isPositive ? "+" : ""}{totalPLPercent.toFixed(2)}%)
                </span>
                <span className="text-xs text-muted-foreground ml-auto">All time P/L</span>
              </div>

              <div className="pt-2 lg:pt-3" data-tour="chart">
                <MiniChart height={148} />
              </div>

              <div
                className="flex gap-3 pt-2 border-t border-border mt-1 cursor-pointer"
                onClick={() => setShowTransactions(!showTransactions)}
              >
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Weekly</p>
                  <p className={`text-sm font-semibold ${weeklyPL >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {fmtCompact(weeklyPL)}
                    <span className="text-xs font-normal ml-1 opacity-70">
                      ({weeklyPL >= 0 ? "+" : ""}{weeklyPLPct.toFixed(1)}%)
                    </span>
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Monthly</p>
                  <p className={`text-sm font-semibold ${monthlyPL >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {fmtCompact(monthlyPL)}
                    <span className="text-xs font-normal ml-1 opacity-70">
                      ({monthlyPL >= 0 ? "+" : ""}{monthlyPLPct.toFixed(1)}%)
                    </span>
                  </p>
                </div>
                <p className="lg:hidden text-xs text-muted-foreground self-end">History →</p>
              </div>
            </CardContent>
          </Card>

          {/* Transactions — sidebar card on desktop, expandable on mobile */}
          <div className="lg:col-span-1">
            {/* Mobile: expandable */}
            {showTransactions && (
              <Card className="lg:hidden">
                <CardContent className="pt-4 pb-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Past Transactions</p>
                  {TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                      <div className="flex items-center gap-2">
                        {tx.type === "buy" ? (
                          <ArrowDownLeft className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{tx.coinSymbol}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${fmt(tx.total)}</p>
                        <p className="text-xs text-muted-foreground">{tx.amount} {tx.coinSymbol}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Desktop: always visible transactions card */}
            <Card className="hidden lg:block h-full">
              <CardContent className="pt-4 pb-3 space-y-2 h-full">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Transactions</p>
                <div className="space-y-0.5">
                  {TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-2">
                        {tx.type === "buy" ? (
                          <ArrowDownLeft className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{tx.coinSymbol}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${fmt(tx.total)}</p>
                        <p className="text-xs text-muted-foreground">{tx.amount} {tx.coinSymbol}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coins Grid */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">Your Coins</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {COINS.map((coin, idx) => {
              const ws = WALLEX_SYMBOL[coin.symbol]
              const lp = ws ? livePrices.get(ws)?.price : undefined
              return <CoinCard key={coin.id} coin={coin} delay={idx} livePrice={lp} />
            })}
          </div>
        </div>
      </main>

      {/* Mobile-only fixed bottom bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur border-t border-border z-10">
        <div className="px-4 pt-3 pb-2 flex gap-3">
          <Button variant="outline" className="flex-1 gap-2" onClick={openSell}>
            <ArrowUpRight className="w-4 h-4" /> Sell
          </Button>
          <Button data-tour="buy" className="flex-1 gap-2" onClick={openBuy}>
            <Plus className="w-4 h-4" /> Buy
          </Button>
        </div>
        <BottomNav />
      </div>

      {hydrated && !isLoggedIn && <AuthModal />}
      {hydrated && isLoggedIn && isNew && <OnboardingTour onComplete={completeOnboarding} />}

      <BuySellModal open={modalOpen} onClose={() => setModalOpen(false)} defaultType={modalType} />
      <ProfileSheet
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onShare={() => setShareOpen(true)}
      />
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        data={{
          name: profile.name,
          username: "me",
          avatarColor: profile.avatarColor,
          avatarInitials: initials,
          totalValue,
          totalPL,
          plPercent: totalPLPercent,
          coins: COINS,
        }}
      />
    </div>
  )
}
