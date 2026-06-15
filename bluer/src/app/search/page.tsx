"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserCard } from "@/components/UserCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { BottomNav } from "@/components/BottomNav"
import { useSocialUsers, useFollows, type PublicProfile } from "@/lib/useSocial"
import { Search, Users, Sparkles, UserPlus, UserCheck } from "lucide-react"
import Link from "next/link"

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
}

function SuggestRow({ user, followed, onToggle }: { user: PublicProfile; followed: boolean; onToggle: (id: string) => void }) {
  const name = user.display_name ?? user.name
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      <Link href={`/profile/${user.username}`} className="shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
          style={{ background: user.avatar_color ?? "#3b82f6" }}
        >
          {getInitials(name)}
        </div>
      </Link>
      <Link href={`/profile/${user.username}`} className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
      </Link>
      <Button
        size="sm"
        variant={followed ? "outline" : "default"}
        className="shrink-0 gap-1 text-xs h-8 px-3"
        onClick={() => onToggle(user.id)}
      >
        {followed ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
        {followed ? "Following" : "Follow"}
      </Button>
    </div>
  )
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { users, loading } = useSocialUsers()
  const { following, toggleFollow } = useFollows()

  const q = query.trim().toLowerCase()
  const followedUsers = users.filter((u) => following.has(u.id))

  // Suggested: not followed, max 4
  const suggested = users.filter((u) => !following.has(u.id)).slice(0, 4)

  const searchResults = q
    ? users.filter(
        (u) =>
          !following.has(u.id) &&
          (u.name.toLowerCase().includes(q) ||
            (u.username ?? "").toLowerCase().includes(q) ||
            (u.bio ?? "").toLowerCase().includes(q))
      )
    : users.filter((u) => !following.has(u.id))

  const showResults = q.length > 0 || focused

  function toUserCardShape(user: PublicProfile) {
    const name = user.display_name ?? user.name
    return {
      id: user.id,
      username: user.username ?? user.id,
      name,
      bio: user.bio ?? "",
      avatarColor: user.avatar_color ?? "#3b82f6",
      avatarInitials: getInitials(name),
      followersCount: user.followers_count,
      followingCount: user.following_count,
      coins: [],
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-primary">social</span>
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 pb-24 lg:pb-12 pt-4 space-y-5 lg:space-y-6">

        {/* Search bar */}
        <div className="relative animate-fade-up max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            ref={inputRef}
            placeholder="Search traders by name or @username…"
            className="pl-9 pr-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
          />
        </div>

        {/* Suggested section — always visible when not searching */}
        {!showResults && suggested.length > 0 && (
          <div className="animate-fade-up" style={{ animationDelay: "40ms" }}>
            <div className="flex items-center gap-2 px-1 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Suggested for you</p>
            </div>
            <Card>
              <CardContent className="px-4 py-1">
                {suggested.map((user) => (
                  <SuggestRow
                    key={user.id}
                    user={user}
                    followed={following.has(user.id)}
                    onToggle={toggleFollow}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search results */}
        {showResults && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">
              {q ? "Results" : "Discover Traders"}
            </p>
            {loading ? (
              <p className="text-sm text-muted-foreground text-center py-6">Loading…</p>
            ) : searchResults.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No traders found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {searchResults.map((user, i) => (
                  <UserCard
                    key={user.id}
                    user={toUserCardShape(user)}
                    followed={following.has(user.id)}
                    onToggleFollow={toggleFollow}
                    delay={i}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Following section */}
        {!showResults && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Following · {followedUsers.length}
              </p>
            </div>
            {followedUsers.length === 0 ? (
              <div className="text-center py-10 space-y-2 animate-fade-up">
                <Users className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                <p className="text-sm text-muted-foreground">Follow traders to see their portfolios here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {followedUsers.map((user, i) => (
                  <UserCard
                    key={user.id}
                    user={toUserCardShape(user)}
                    followed={true}
                    onToggleFollow={toggleFollow}
                    delay={i}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur border-t border-border z-10">
        <BottomNav />
      </div>
    </div>
  )
}
