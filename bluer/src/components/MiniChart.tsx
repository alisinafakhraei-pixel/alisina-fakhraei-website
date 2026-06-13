"use client"

import { useEffect, useRef } from "react"
import { CHART_DATA } from "@/lib/mock-data"

function fmtK(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`
}

// Nudge tag x so it doesn't overflow the SVG edges
function tagX(dotX: number, tagW: number, W: number) {
  const half = tagW / 2
  return Math.max(half + 2, Math.min(W - half - 2, dotX))
}

export function MiniChart({ height = 96 }: { height?: number }) {
  const clipRef = useRef<SVGRectElement>(null)

  const values = CHART_DATA.map((d) => d.value)
  const labels = CHART_DATA.map((d) => d.date)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const minIdx = values.indexOf(min)
  const maxIdx = values.indexOf(max)

  const W = 300
  const H = 80
  const padL = 4
  const padR = 4
  const padT = 18
  const padB = 22  // room for min tag below line

  const cx = (i: number) => padL + (i / (values.length - 1)) * (W - padL - padR)
  const cy = (v: number) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB)

  const points = values.map((v, i) => `${cx(i)},${cy(v)}`).join(" ")

  // Animate chart drawing left→right via clip rect width
  useEffect(() => {
    const el = clipRef.current
    if (!el) return
    el.setAttribute("width", "0")
    const start = performance.now()
    const duration = 900
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      el!.setAttribute("width", String(W * ease))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [])

  const TAG_W = 34
  const maxTX = tagX(cx(maxIdx), TAG_W, W)
  const minTX = tagX(cx(minIdx), TAG_W, W)

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height, overflow: "visible" }} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
          <clipPath id="chartClip">
            <rect ref={clipRef} x="0" y="0" width={W} height={H} />
          </clipPath>
        </defs>

        {/* Clipped group animates left→right */}
        <g clipPath="url(#chartClip)">
          <polygon
            points={`${cx(0)},${H} ${points} ${cx(values.length - 1)},${H}`}
            fill="url(#chartGrad2)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* Max dot + tag (primary color) */}
        <circle cx={cx(maxIdx)} cy={cy(max)} r="3.5" fill="var(--color-primary)" />
        <rect x={maxTX - TAG_W / 2} y={cy(max) - 18} width={TAG_W} height={14} rx="4" fill="var(--color-primary)" opacity="0.18" />
        <text x={maxTX} y={cy(max) - 8} textAnchor="middle" fontSize="8.5" fill="var(--color-primary)" fontWeight="700">
          {fmtK(max)}
        </text>

        {/* Min dot + tag (muted, not red) */}
        <circle cx={cx(minIdx)} cy={cy(min)} r="3.5" fill="var(--color-muted-foreground)" />
        <rect x={minTX - TAG_W / 2} y={cy(min) + 5} width={TAG_W} height={14} rx="4" fill="var(--color-muted-foreground)" opacity="0.15" />
        <text x={minTX} y={cy(min) + 15} textAnchor="middle" fontSize="8.5" fill="var(--color-muted-foreground)" fontWeight="700">
          {fmtK(min)}
        </text>
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between px-1 -mt-1">
        {labels.map((l) => (
          <span key={l} className="text-[10px] text-muted-foreground">{l}</span>
        ))}
      </div>
    </div>
  )
}
