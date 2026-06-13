"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, UserCheck, UserPlus } from "lucide-react"
import { type SocialUser, getUserTotalValue, getUserTotalPL, getUserPLPercent } from "@/lib/social-data"
import Link from "next/link"

function fmt(n: number) {
  const abs = Math.abs(n)
  if (abs >= 1000) return `${n < 0 ? "-" : "+"}$${(abs / 1000).toFixed(1)}k`
  return `${n < 0 ? "-" : "+"}$${abs.toFixed(2)}`
}

function fmtValue(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n.toFixed(2)}`
}

type Props = {
  user: SocialUser
  followed: boolean
  onToggleFollow: (id: string) => void
  delay?: number
}

export function UserCard({ user, followed, onToggleFollow, delay = 0 }: Props) {
  const totalValue = getUserTotalValue(user)
  const totalPL = getUserTotalPL(user)
  const plPct = getUserPLPercent(user)
  const isPos = totalPL >= 0

  return (
    <Card
      className="animate-fade-up overflow-hidden active:scale-[0.99] transition-transform"
      style={{ animationDelay: `${delay * 60}ms` }}
    >
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Link href={`/profile/${user.username}`} className="shrink-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
              style={{ background: user.avatarColor }}
            >
              {user.avatarInitials}
            </div>
          </Link>

          {/* Name + bio */}
          <Link href={`/profile/${user.username}`} className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-tight truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
          </Link>

          {/* Follow button */}
          <Button
            size="sm"
            variant={followed ? "outline" : "default"}
            className="shrink-0 gap-1.5 text-xs h-8 px-3"
            onClick={(e) => { e.preventDefault(); onToggleFollow(user.id) }}
          >
            {followed ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
            {followed ? "Following" : "Follow"}
          </Button>
        </div>

        {/* P/L row */}
        <Link href={`/profile/${user.username}`}>
          <div className="mt-3 flex items-center justify-between bg-muted/40 rounded-xl px-3 py-2">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Portfolio</p>
              <p className="text-sm font-bold">{fmtValue(totalValue)}</p>
            </div>
            <div className="flex items-center gap-2">
              {isPos ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <div className="text-right">
                <p className={`text-sm font-bold ${isPos ? "text-emerald-500" : "text-red-500"}`}>
                  {fmt(totalPL)}
                </p>
                <p className={`text-[11px] ${isPos ? "text-emerald-500" : "text-red-500"} opacity-80`}>
                  {isPos ? "+" : ""}{plPct.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Asset chips */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {user.coins.slice(0, 4).map((coin) => (
            <span
              key={coin.id}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
              style={{ background: coin.color }}
            >
              {coin.symbol}
            </span>
          ))}
          {user.coins.length > 4 && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              +{user.coins.length - 4}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
