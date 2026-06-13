"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type AuthUser = { phone: string; name: string }
type AuthStore = { users: Record<string, string>; current: AuthUser | null; isNew: boolean }

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

type AuthCtx = {
  user: AuthUser | null
  isLoggedIn: boolean
  isNew: boolean
  hydrated: boolean
  signUp: (phone: string, password: string, name: string) => string | null
  logIn: (phone: string, password: string) => string | null
  logOut: () => void
  completeOnboarding: () => void
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<AuthStore>({ users: {}, current: null, isNew: false })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setStore(load())
    setHydrated(true)
  }, [])

  function signUp(phone: string, password: string, name: string): string | null {
    const s = load()
    if (s.users[phone]) return "Phone already registered"
    const next: AuthStore = { users: { ...s.users, [phone]: password }, current: { phone, name }, isNew: true }
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
    save({ ...s, current: null })
    setStore({ ...s, current: null })
  }

  function completeOnboarding() {
    const s = load()
    save({ ...s, isNew: false })
    setStore({ ...s, isNew: false })
  }

  return (
    <AuthContext.Provider value={{
      user: store.current,
      isLoggedIn: !!store.current,
      isNew: store.isNew,
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
