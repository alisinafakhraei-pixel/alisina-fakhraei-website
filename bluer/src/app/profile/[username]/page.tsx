"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SocialCoinCard } from "@/components/SocialCoinCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { MiniChart } from "@/components/MiniChart"
import { BottomNav } from "@/components/BottomNav"
import { ShareModal } from "@/components/ShareModal"
import { SOCIAL_USERS, INITIALLY_FOLLOWED, getUserTotalValue, getUserTotalPL, getUserPLPercent } from "@/lib/social-data"
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
  const [followed, setFollowed] = useState(() =>
    INITIALLY_FOLLOWED.has(SOCIAL_USERS.find((u) => u.username === username)?.id ?? "")
  )
  const [shareOpen, setShareOpen] = useState(false)

  const user = SOCIAL_USERS.find((u) => u.username === username)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Trader not found.</p>
      </div>
    )
  }

  const totalValue = getUserTotalValue(user)
  const totalPL = getUserTotalPL(user)
  const plPct = getUserPLPercent(user)
  const isPos = totalPL >= 0

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
        <span className="text-sm font-semibold">@{user.username}</span>
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

        {/* Desktop: 2-column. Mobile: stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-10">

          {/* ── Left column: profile + portfolio card ── */}
          <div className="space-y-4 lg:space-y-5">

            {/* Profile hero */}
            <div className="animate-fade-up flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <div
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl lg:text-3xl shadow-lg"
                style={{ background: user.avatarColor }}
              >
                {user.avatarInitials}
              </div>

              <div>
                <h1 className="text-xl lg:text-2xl font-bold">{user.name}</h1>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>

              {user.bio && (
                <p className="text-sm text-muted-foreground max-w-xs lg:max-w-none leading-relaxed">{user.bio}</p>
              )}

              {/* Stats row */}
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-base font-bold">{fmtFollowers(user.followersCount + (followed ? 1 : 0))}</p>
                  <p className="text-[11px] text-muted-foreground">Followers</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-base font-bold">{fmtFollowers(user.followingCount)}</p>
                  <p className="text-[11px] text-muted-foreground">Following</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-base font-bold">{user.coins.length}</p>
                  <p className="text-[11px] text-muted-foreground">Assets</p>
                </div>
              </div>

              {/* Follow button */}
              <Button
                className="w-full gap-2"
                variant={followed ? "outline" : "default"}
                onClick={() => setFollowed((f) => !f)}
              >
                {followed ? (
                  <><UserCheck className="w-4 h-4" /> Following</>
                ) : (
                  <><UserPlus className="w-4 h-4" /> Follow</>
                )}
              </Button>
            </div>

            {/* Portfolio summary card */}
            <Card className="animate-fade-up" style={{ animationDelay: "60ms" }}>
              <CardContent className="pt-5 pb-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Portfolio Value</p>
                <p className="text-3xl font-bold">${fmt(totalValue)}</p>
                <div className="flex items-center gap-2">
                  {isPos ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${isPos ? "text-emerald-500" : "text-red-500"}`}>
                    {isPos ? "+" : ""}{fmt(totalPL)} ({isPos ? "+" : ""}{plPct.toFixed(2)}%)
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">All time P/L</span>
                </div>
                <div className="pt-2">
                  <MiniChart />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Right column: assets grid ── */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">
              {user.name.split(" ")[0]}&apos;s Assets
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {user.coins.map((coin, i) => (
                <SocialCoinCard key={coin.id} coin={coin} delay={i + 2} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur border-t border-border z-10">
        <BottomNav />
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={typeof window !== "undefined" ? window.location.href : ""}
        data={{
          name: user.name,
          username: user.username,
          avatarColor: user.avatarColor,
          avatarInitials: user.avatarInitials,
          totalValue,
          totalPL,
          plPercent: plPct,
          coins: user.coins,
        }}
      />
    </div>
  )
}
