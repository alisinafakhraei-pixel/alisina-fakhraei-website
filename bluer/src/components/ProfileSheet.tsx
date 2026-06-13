"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Share2, Check } from "lucide-react"
import { useProfile, AVATAR_COLORS, getInitials } from "@/lib/useProfile"

type Props = {
  open: boolean
  onClose: () => void
  onShare: () => void
}

export function ProfileSheet({ open, onClose, onShare }: Props) {
  const { profile, update } = useProfile()
  const [nameInput, setNameInput] = useState(profile.name)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    update({ name: nameInput.trim() || "My Portfolio" })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  function handleColorPick(color: string) {
    update({ avatarColor: color })
  }

  if (!open) return null

  const previewInitials = getInitials(nameInput || "My Portfolio")

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="animate-backdrop-in absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:w-[360px] animate-slide-up sm:animate-scale-in">
        <div className="bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">

          {/* Drag pill (mobile) */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2 sm:pt-5">
            <p className="font-semibold text-base">Profile</p>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="px-5 pb-6 space-y-5">

            {/* Avatar preview */}
            <div className="flex flex-col items-center gap-3 pt-1">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg transition-all duration-200"
                style={{ background: profile.avatarColor }}
              >
                {previewInitials}
              </div>
              <p className="text-xs text-muted-foreground">Your avatar updates as you type</p>
            </div>

            {/* Name input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Name</label>
              <div className="flex gap-2">
                <Input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="My Portfolio"
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
                <Button
                  size="sm"
                  variant={saved ? "outline" : "default"}
                  onClick={handleSave}
                  className="shrink-0 gap-1.5 min-w-[72px]"
                >
                  {saved ? <><Check className="w-3.5 h-3.5 text-emerald-500" /> Saved</> : "Save"}
                </Button>
              </div>
            </div>

            {/* Color picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Avatar Color</label>
              <div className="flex gap-2.5 flex-wrap">
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorPick(color)}
                    className="w-8 h-8 rounded-full transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                    style={{ background: color, boxShadow: profile.avatarColor === color ? `0 0 0 3px white, 0 0 0 5px ${color}` : "none" }}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Share button */}
            <Button
              className="w-full gap-2"
              onClick={() => { onClose(); setTimeout(onShare, 150) }}
            >
              <Share2 className="w-4 h-4" />
              Share My Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
