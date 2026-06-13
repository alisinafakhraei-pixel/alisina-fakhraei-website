"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Lock, User, Eye, EyeOff, X } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"

type Mode = "idle" | "login" | "signup"

export function AuthModal() {
  const { signUp, logIn } = useAuth()
  const [mode, setMode] = useState<Mode>("idle")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function reset(next: Mode) {
    setPhone(""); setName(""); setPassword(""); setError(""); setShowPw(false); setMode(next)
  }

  async function handleSubmit() {
    setError("")
    if (!phone.trim() || !password.trim()) { setError("Fill in all fields"); return }
    if (mode === "signup" && !name.trim()) { setError("Enter your name"); return }
    if (password.length < 4) { setError("Password must be at least 4 characters"); return }
    setLoading(true)
    const err = mode === "signup"
      ? await signUp(phone.trim(), password, name.trim())
      : await logIn(phone.trim(), password)
    setLoading(false)
    if (err) setError(err)
  }

  /* ── Idle banner ─────────────────────────────────────────────────── */
  if (mode === "idle") {
    return (
      <div className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-4 pb-5">
        <div className="w-full max-w-sm animate-slide-up">
          <div className="bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-snug">Save your portfolio</p>
              <p className="text-xs opacity-75 mt-0.5 leading-snug">Create a free account to keep your trades</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 px-3 text-xs font-semibold"
                onClick={() => reset("login")}
              >
                Log in
              </Button>
              <Button
                size="sm"
                className="h-8 px-3 text-xs font-semibold bg-white text-primary hover:bg-white/90"
                onClick={() => reset("signup")}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── Login / Signup form ─────────────────────────────────────────── */
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
      <div className="w-full max-w-lg bg-card border-t border-border rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.15)] animate-slide-up">

        {/* Drag pill */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between px-5 pt-4 pb-1">
          <div>
            <p className="font-bold text-base">{mode === "signup" ? "Create account" : "Welcome back"}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {mode === "signup" ? "Your data stays on your device" : "Log in to your portfolio"}
            </p>
          </div>
          <button
            onClick={() => reset("idle")}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 pt-3 pb-8 space-y-3">

          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="pl-9" autoFocus />
            </div>
          )}

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="pl-9"
              autoFocus={mode === "login"}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPw ? "text" : "password"}
              className="pl-9 pr-10"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {mode === "signup" ? "Creating account…" : "Logging in…"}
              </span>
            ) : (
              mode === "signup" ? "Create Account" : "Log In"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {mode === "signup" ? (
              <>Already have an account?{" "}
                <button className="text-primary font-medium underline-offset-2 hover:underline" onClick={() => reset("login")}>Log in</button>
              </>
            ) : (
              <>No account?{" "}
                <button className="text-primary font-medium underline-offset-2 hover:underline" onClick={() => reset("signup")}>Sign up free</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
