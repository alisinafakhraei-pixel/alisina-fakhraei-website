"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Copy, Share2, Check, Loader2 } from "lucide-react"
import { generateShareImage, type ShareCardData } from "@/lib/generateShareImage"

type Props = {
  open: boolean
  onClose: () => void
  data: ShareCardData
  shareUrl?: string
}

export function ShareModal({ open, onClose, data, shareUrl }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sharing, setSharing] = useState(false)
  const generated = useRef(false)

  useEffect(() => {
    if (!open) return
    if (generated.current) return
    generated.current = true
    setLoading(true)
    // rAF to let the modal paint first
    requestAnimationFrame(() => {
      setTimeout(() => {
        generateShareImage(data)
          .then((url) => { setImageUrl(url); setLoading(false) })
          .catch(() => setLoading(false))
      }, 80)
    })
  }, [open, data])

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setImageUrl(null)
      setLoading(false)
      setCopied(false)
      generated.current = false
    }
  }, [open])

  async function handleCopy() {
    const url = shareUrl ?? window.location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleShare() {
    if (!imageUrl) return
    setSharing(true)
    try {
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      const file = new File([blob], "bluer-portfolio.png", { type: "image/png" })
      const url = shareUrl ?? window.location.href

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${data.name}'s portfolio on bluer`,
          text: `Check out ${data.name}'s portfolio on bluer — ${url}`,
          url,
        })
      } else {
        // Fallback: download
        const a = document.createElement("a")
        a.href = imageUrl
        a.download = "bluer-portfolio.png"
        a.click()
      }
    } catch {
      // user cancelled or not supported — silent
    } finally {
      setSharing(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="animate-backdrop-in absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel — slides up on mobile, scales in on desktop */}
      <div className="relative w-full sm:w-auto sm:max-w-sm animate-slide-up sm:animate-scale-in">
        <div className="bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">

          {/* Drag pill (mobile) */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2 sm:pt-5">
            <div>
              <p className="font-semibold text-base">Share Portfolio</p>
              <p className="text-xs text-muted-foreground mt-0.5">Preview your share card</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full shrink-0" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Image preview */}
          <div className="px-5 pb-2">
            <div className="relative w-full aspect-[420/580] rounded-2xl overflow-hidden bg-[#0f172a] border border-white/[0.07]">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 text-primary animate-spin" />
                </div>
              )}
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Share preview"
                  className="w-full h-full object-contain animate-fade-up"
                />
              )}
            </div>
          </div>

          {/* Link row */}
          <div className="px-5 pb-3">
            <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-3 py-2.5 border border-border">
              <span className="text-xs text-muted-foreground truncate flex-1 font-mono">
                {shareUrl ?? (typeof window !== "undefined" ? window.location.href : "bluer.app")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 h-7 px-2 gap-1.5 text-xs"
                onClick={handleCopy}
              >
                {copied ? (
                  <><Check className="w-3 h-3 text-emerald-500" /> Copied</>
                ) : (
                  <><Copy className="w-3 h-3" /> Copy</>
                )}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 pb-6 sm:pb-5 grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              className="gap-2"
              onClick={handleShare}
              disabled={!imageUrl || sharing}
            >
              {sharing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
