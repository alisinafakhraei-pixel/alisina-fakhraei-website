"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { UserCard } from "@/components/UserCard"
import { ThemeToggle } from "@/components/ThemeToggle"
import { BottomNav } from "@/components/BottomNav"
import { useSocialUsers, useFollows } from "@/lib/useSocial"
import { Search, Users } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { users, loading } = useSocialUsers()
  const { following, toggleFollow } = useFollows()

  const q = query.trim().toLowerCase()
  const followedUsers = users.filter((u) => following.has(u.id))
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

  return (
    <div className="min-h-screen bg-background text-foreground">

      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-primary">social</span>
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 pb-24 lg:pb-12 pt-4 space-y-4 lg:space-y-6">

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
                    user={{
                      id: user.id,
                      username: user.username ?? user.id,
                      name: user.display_name ?? user.name,
                      bio: user.bio ?? "",
                      avatarColor: user.avatar_color ?? "#3b82f6",
                      avatarInitials: (user.display_name ?? user.name).split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2),
                      followersCount: user.followers_count,
                      followingCount: user.following_count,
                      coins: [],
                    }}
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
              <div className="text-center py-12 space-y-2 animate-fade-up">
                <Users className="w-10 h-10 text-muted-foreground/40 mx-auto" />
                <p className="text-sm text-muted-foreground">Follow traders to see their portfolios here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {followedUsers.map((user, i) => (
                  <UserCard
                    key={user.id}
                    user={{
                      id: user.id,
                      username: user.username ?? user.id,
                      name: user.display_name ?? user.name,
                      bio: user.bio ?? "",
                      avatarColor: user.avatar_color ?? "#3b82f6",
                      avatarInitials: (user.display_name ?? user.name).split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2),
                      followersCount: user.followers_count,
                      followingCount: user.following_count,
                      coins: [],
                    }}
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

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur border-t border-border z-10">
        <BottomNav />
      </div>
    </div>
  )
}
