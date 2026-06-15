"use client"

import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import { useAuth } from "./AuthContext"

export type Profile = {
  name: string
  avatarColor: string
  username?: string
}

export const AVATAR_COLORS = [
  "#3b82f6", "#6366f1", "#8b5cf6", "#ec4899",
  "#10b981", "#f59e0b", "#ef4444", "#06b6d4",
]

export function getInitials(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "ME"
}

const DEFAULT: Profile = { name: "My Portfolio", avatarColor: "#3b82f6" }

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile>(DEFAULT)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bluer-profile")
      if (stored) setProfile(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  // Load username from Supabase
  useEffect(() => {
    if (!user) return
    supabase.from("profiles").select("username, name, avatar_color").eq("id", user.id).single()
      .then(({ data }) => {
        if (!data) return
        setProfile((prev) => ({
          ...prev,
          username: data.username ?? undefined,
          name: data.name ?? prev.name,
          avatarColor: data.avatar_color ?? prev.avatarColor,
        }))
      })
  }, [user])

  function update(updates: Partial<Profile>) {
    const next = { ...profile, ...updates }
    setProfile(next)
    try { localStorage.setItem("bluer-profile", JSON.stringify(next)) } catch { /* ignore */ }
    // Sync name and avatarColor to Supabase
    if (user && (updates.name || updates.avatarColor)) {
      supabase.from("profiles").update({
        ...(updates.name ? { name: updates.name, display_name: updates.name } : {}),
        ...(updates.avatarColor ? { avatar_color: updates.avatarColor } : {}),
      }).eq("id", user.id)
    }
  }

  return { profile, initials: getInitials(profile.name), update }
}
