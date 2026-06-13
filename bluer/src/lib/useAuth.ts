"use client"

import { useEffect, useState } from "react"

export type AuthUser = {
  phone: string
  name: string
}

type AuthStore = {
  users: Record<string, string> // phone → password
  current: AuthUser | null
  isNew: boolean
}

function load(): AuthStore {
  try {
    const raw = localStorage.getItem("bluer-auth")
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { users: {}, current: null, isNew: false }
}

function save(store: AuthStore) {
  try { localStorage.setItem("bluer-auth", JSON.stringify(store)) } catch { /* ignore */ }
}

export function useAuth() {
  const [store, setStore] = useState<AuthStore>({ users: {}, current: null, isNew: false })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setStore(load())
    setHydrated(true)
  }, [])

  function signUp(phone: string, password: string, name: string): string | null {
    const s = load()
    if (s.users[phone]) return "Phone already registered"
    const next: AuthStore = {
      users: { ...s.users, [phone]: password },
      current: { phone, name },
      isNew: true,
    }
    save(next)
    setStore(next)
    return null
  }

  function logIn(phone: string, password: string): string | null {
    const s = load()
    if (!s.users[phone]) return "Phone not found"
    if (s.users[phone] !== password) return "Wrong password"
    const next: AuthStore = { ...s, current: { phone, name: phone }, isNew: false }
    save(next)
    setStore(next)
    return null
  }

  function logOut() {
    const s = load()
    const next: AuthStore = { ...s, current: null, isNew: false }
    save(next)
    setStore(next)
  }

  function completeOnboarding() {
    const s = load()
    const next: AuthStore = { ...s, isNew: false }
    save(next)
    setStore(next)
  }

  return {
    user: store.current,
    isNew: store.isNew,
    isLoggedIn: !!store.current,
    hydrated,
    signUp,
    logIn,
    logOut,
    completeOnboarding,
  }
}
