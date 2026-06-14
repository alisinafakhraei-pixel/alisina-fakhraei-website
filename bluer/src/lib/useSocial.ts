"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "./supabase"
import { useAuth } from "./AuthContext"

export type PublicProfile = {
  id: string
  username: string
  name: string
  display_name: string | null
  avatar_color: string
  bio: string | null
  followers_count: number
  following_count: number
}

export function useSocialUsers() {
  const [users, setUsers] = useState<PublicProfile[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    supabase
      .from("profiles")
      .select("id, username, name, display_name, avatar_color, bio, followers_count, following_count")
      .not("username", "is", null)
      .order("followers_count", { ascending: false })
      .then(({ data }) => {
        setUsers(data ?? [])
        setLoading(false)
      })
  }, [])

  return { users, loading }
}

export function useFollows() {
  const { user, isLoggedIn } = useAuth()
  const [following, setFollowing] = useState<Set<string>>(new Set())

  const load = useCallback(async () => {
    if (!user) return
    const { data } = await supabase
      .from("bluer_follows")
      .select("following_id")
      .eq("follower_id", user.id)
    setFollowing(new Set((data ?? []).map((r: { following_id: string }) => r.following_id)))
  }, [user])

  useEffect(() => {
    if (isLoggedIn) load()
    else setFollowing(new Set())
  }, [isLoggedIn, load])

  async function toggleFollow(targetId: string) {
    if (!user) return
    if (following.has(targetId)) {
      await supabase.from("bluer_follows").delete().match({ follower_id: user.id, following_id: targetId })
      setFollowing((prev) => { const next = new Set(prev); next.delete(targetId); return next })
    } else {
      await supabase.from("bluer_follows").insert({ follower_id: user.id, following_id: targetId })
      setFollowing((prev) => new Set([...prev, targetId]))
    }
  }

  return { following, toggleFollow }
}

export function usePublicProfile(username: string) {
  const [profile, setProfile] = useState<PublicProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) return
    supabase
      .from("profiles")
      .select("id, username, name, display_name, avatar_color, bio, followers_count, following_count")
      .eq("username", username)
      .single()
      .then(({ data }) => {
        setProfile(data ?? null)
        setLoading(false)
      })
  }, [username])

  return { profile, loading }
}

export function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
}
