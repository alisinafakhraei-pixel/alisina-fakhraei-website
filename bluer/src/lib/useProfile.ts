"use client"

import { useEffect, useState } from "react"

export type Profile = {
  name: string
  avatarColor: string
}

export const AVATAR_COLORS = [
  "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899",
  "#10b981", "#f59e0b", "#ef4444", "#06b6d4",
]

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "ME"
}

const DEFAULT: Profile = { name: "My Portfolio", avatarColor: "#3b82f6" }

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(DEFAULT)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bluer-profile")
      if (stored) setProfile(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  function update(updates: Partial<Profile>) {
    const next = { ...profile, ...updates }
    setProfile(next)
    try { localStorage.setItem("bluer-profile", JSON.stringify(next)) } catch { /* ignore */ }
  }

  return { profile, initials: getInitials(profile.name), update }
}
