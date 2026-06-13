"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type Step = {
  target: string
  title: string
  description: string
  emoji: string
}

const STEPS: Step[] = [
  {
    target: "buy",
    title: "Add your first trade",
    description: "Tap Buy to record a new position. Your portfolio value updates instantly.",
    emoji: "💸",
  },
  {
    target: "chart",
    title: "Watch your portfolio grow",
    description: "This chart tracks your total value over time with live prices from Wallex.",
    emoji: "📈",
  },
  {
    target: "profile",
    title: "Make it yours",
    description: "Set your name, pick a color, and generate a shareable portfolio card.",
    emoji: "✨",
  },
  {
    target: "social",
    title: "Follow top traders",
    description: "See what the best traders are holding and benchmark your performance.",
    emoji: "🤝",
  },
]

type Props = { onComplete: () => void }

export function OnboardingTour({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)

  const current = STEPS[step]

  useEffect(() => {
    function measure() {
      const candidates = document.querySelectorAll(`[data-tour="${current.target}"]`)
      let best: Element | null = null
      candidates.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.height > 0) best = el
      })
      if (!best) return
      ;(best as Element).scrollIntoView({ behavior: "smooth", block: "nearest" })
      setTimeout(() => setRect((best as Element).getBoundingClientRect()), 300)
    }

    setRect(null)
    const t = setTimeout(measure, 100)
    return () => clearTimeout(t)
  }, [step, current.target])

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1)
    else onComplete()
  }

  const PAD = 10

  return (
    <>
      {/* Dark overlay + spotlight hole via box-shadow trick */}
      {rect && (
        <div
          className="fixed z-40 rounded-2xl transition-all duration-300"
          style={{
            top: rect.top - PAD,
            left: rect.left - PAD,
            width: rect.width + PAD * 2,
            height: rect.height + PAD * 2,
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.62)",
            outline: "2.5px solid rgba(99,102,241,0.9)",
            outlineOffset: 2,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Tooltip — always fixed at bottom, never overlaps spotlight */}
      <div className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-4 pb-6 pt-2">
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-4 space-y-3 animate-slide-up">

          {/* Progress dots */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? "w-5 bg-primary" : i < step ? "w-1.5 bg-primary/40" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">{step + 1} / {STEPS.length}</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none mt-0.5">{current.emoji}</span>
            <div className="space-y-0.5 flex-1 min-w-0">
              <p className="font-bold text-sm leading-snug">{current.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{current.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-xs h-9 px-4" onClick={onComplete}>
              Skip
            </Button>
            <Button size="sm" className="flex-1 h-9 text-xs font-semibold" onClick={next}>
              {step === STEPS.length - 1 ? "Let's go 🚀" : "Next →"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
