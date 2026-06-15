"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ThemeToggle"
import { MiniChart } from "@/components/MiniChart"
import { BottomNav } from "@/components/BottomNav"
import { ShareModal } from "@/components/ShareModal"
import { SocialCoinCard } from "@/components/SocialCoinCard"
import { usePublicProfile, useFollows, getInitials } from "@/lib/useSocial"
import { supabase, type DbTransaction } from "@/lib/supabase"
import { usePortfolio, COIN_META } from "@/lib/usePortfolio"
import { ArrowLeft, TrendingUp, TrendingDown, UserCheck, UserPlus, Share2 } from "lucide-react"

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtFollowers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const router = useRouter()
  const [shareOpen, setShareOpen] = useState(false)
  const [transactions, setTransactions] = useState<DbTransaction[]>([])

  const { profile, loading } = usePublicProfile(username)
  const { following, toggleFollow } = useFollows()

  // Load this user's transactions
  useEffect(() => {
    if (!profile?.id) return
    supabase
      .from("bluer_transactions")
      .select("*")
      .eq("user_id", profile.id)
      .order("date", { ascending: true })
      .then(({ data }) => setTransactions(data ?? []))
  }, [profile?.id])

  const coins = usePortfolio(transactions, {})

  const totalValue = coins.reduce((sum, c) => sum + c.price * c.holdings, 0)
  const totalPL    = coins.reduce((sum, c) => sum + (c.price - c.avgBuyPrice) * c.holdings, 0)
  const cost       = totalValue - totalPL
  const plPct      = cost > 0 ? (totalPL / cost) * 100 : 0
  const isPos      = totalPL >= 0

  // Chart data from transactions
  const chartData = useMemo(() => {
    if (transactions.length === 0) return []
    const holdings: Record<string, number> = {}
    const avgPrice: Record<string, number> = {}
    const buyTotal: Record<string, number> = {}
    const buyAmt: Record<string, number> = {}
    const points: { date: string; value: number }[] = []
    for (const tx of transactions) {
      const id = tx.coin_id
      if (!holdings[id]) { holdings[id] = 0; buyTotal[id] = 0; buyAmt[id] = 0; avgPrice[id] = 0 }
      if (tx.type === "buy") {
        holdings[id] += tx.amount
        buyTotal[id] += tx.total
        buyAmt[id] += tx.amount
        avgPrice[id] = buyAmt[id] > 0 ? buyTotal[id] / buyAmt[id] : tx.price_at_time
      } else {
        holdings[id] = Math.max(0, holdings[id] - tx.amount)
      }
      let value = 0
      for (const [cid, held] of Object.entries(holdings)) {
        value += held * (cid === id ? tx.price_at_time : (avgPrice[cid] ?? 0))
      }
      const d = new Date(tx.date)
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      points.push({ date: label, value: Math.round(value * 100) / 100 })
    }
    return points
  }, [transactions])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Trader not found.</p>
      </div>
    )
  }

  const displayName = profile.display_name ?? profile.name
  const avatarInitials = getInitials(displayName)
  const isFollowing = following.has(profile.id)
  const followerCount = profile.followers_count + (isFollowing ? 1 : 0)

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
        <span className="text-sm font-semibold">@{profile.username}</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShareOpen(true)}>
            <Share2 className="w-4 h-4" />
          </Button>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 pb-24 lg:pb-12 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-10">

          {/* Left column */}
          <div className="space-y-4 lg:space-y-5">
            <div className="animate-fade-up flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <div
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl lg:text-3xl shadow-lg"
                style={{ background: profile.avatar_color ?? "#3b82f6" }}
              >
                {avatarInitials}
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold">{displayName}</h1>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
              {profile.bio && (
                <p className="text-sm text-muted-foreground max-w-xs lg:max-w-none leading-relaxed">{profile.bio}</p>
              )}
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-base font-bold">{fmtFollowers(followerCount)}</p>
                  <p className="text-[11px] text-muted-foreground">Followers</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-base font-bold">{fmtFollowers(profile.following_count)}</p>
                  <p className="text-[11px] text-muted-foreground">Following</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-base font-bold">{coins.length}</p>
                  <p className="text-[11px] text-muted-foreground">Assets</p>
                </div>
              </div>
              <Button
                className="w-full gap-2"
                variant={isFollowing ? "outline" : "default"}
                onClick={() => toggleFollow(profile.id)}
              >
                {isFollowing ? <><UserCheck className="w-4 h-4" /> Following</> : <><UserPlus className="w-4 h-4" /> Follow</>}
              </Button>
            </div>

            {/* Portfolio card */}
            <Card className="animate-fade-up" style={{ animationDelay: "60ms" }}>
              <CardContent className="pt-5 pb-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Portfolio Value</p>
                <p className="text-3xl font-bold">${fmt(totalValue)}</p>
                {totalValue > 0 && (
                  <div className="flex items-center gap-2">
                    {isPos ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                    <span className={`text-sm font-semibold ${isPos ? "text-emerald-500" : "text-red-500"}`}>
                      {isPos ? "+" : ""}{fmt(totalPL)} ({isPos ? "+" : ""}{plPct.toFixed(2)}%)
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">All time P/L</span>
                  </div>
                )}
                <div className="pt-2">
                  <MiniChart data={chartData} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: assets */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">
              {displayName.split(" ")[0]}&apos;s Assets · {coins.length}
            </p>
            {coins.length === 0 ? (
              <p className="text-sm text-muted-foreground">No assets yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {coins.map((coin, i) => (
                  <SocialCoinCard key={coin.id} coin={coin} delay={i + 2} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur border-t border-border z-10">
        <BottomNav />
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={typeof window !== "undefined" ? window.location.href : ""}
        data={{
          name: displayName,
          username: profile.username ?? "",
          avatarColor: profile.avatar_color ?? "#3b82f6",
          avatarInitials,
          totalValue,
          totalPL,
          plPercent: plPct,
          coins,
        }}
      />
    </div>
  )
}
