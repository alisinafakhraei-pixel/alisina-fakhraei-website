"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { supabase } from "./supabase"
import type { User } from "@supabase/supabase-js"

type AuthCtx = {
  user: User | null
  isLoggedIn: boolean
  isNew: boolean
  hydrated: boolean
  signUp: (phone: string, password: string, name: string) => Promise<string | null>
  logIn: (phone: string, password: string) => Promise<string | null>
  logOut: () => Promise<void>
  completeOnboarding: () => void
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setHydrated(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function signUp(phone: string, password: string, name: string): Promise<string | null> {
    const email = `${phone.replace(/\s+/g, "")}@bluer.app`
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return error.message
    if (data.user) {
      const base = name.toLowerCase().replace(/[^a-z0-9]/g, "")
      const username = `${base}${Math.floor(1000 + Math.random() * 9000)}`
      await supabase.from("profiles").upsert({
        id: data.user.id,
        phone,
        name,
        username,
        avatar_color: "#3b82f6",
        display_name: name,
        email,
      })
      setIsNew(true)
    }
    return null
  }

  async function logIn(phone: string, password: string): Promise<string | null> {
    const email = `${phone.replace(/\s+/g, "")}@bluer.app`
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return "Phone or password incorrect"
    return null
  }

  async function logOut() {
    await supabase.auth.signOut()
    setIsNew(false)
  }

  function completeOnboarding() {
    setIsNew(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isNew,
      hydrated,
      signUp, logIn, logOut, completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
