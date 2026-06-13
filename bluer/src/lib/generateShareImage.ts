import type { Coin } from "./mock-data"

export type ShareCardData = {
  name: string
  username: string
  avatarColor: string
  avatarInitials: string
  totalValue: number
  totalPL: number
  plPercent: number
  coins: Coin[]
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "")
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]
}

function rgba(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r},${g},${b},${a})`
}

function lighten(hex: string, amt: number) {
  const [r, g, b] = hexToRgb(hex)
  return `rgb(${Math.min(255, r + amt)},${Math.min(255, g + amt)},${Math.min(255, b + amt)})`
}

export async function generateShareImage(data: ShareCardData): Promise<string> {
  const W = 420, H = 580, DPR = 2
  const canvas = document.createElement("canvas")
  canvas.width = W * DPR
  canvas.height = H * DPR
  const ctx = canvas.getContext("2d")!
  ctx.scale(DPR, DPR)

  const isPos = data.totalPL >= 0
  const plColor = isPos ? "#10b981" : "#ef4444"
  const gainColor = "#10b981"
  const lossColor = "#ef4444"

  // ── Background ──────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W * 0.6, H)
  bg.addColorStop(0, "#f8f6ff")
  bg.addColorStop(0.5, "#ffffff")
  bg.addColorStop(1, "#f0f8ff")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Dot grid
  for (let gx = 18; gx < W; gx += 22) {
    for (let gy = 18; gy < H; gy += 22) {
      ctx.beginPath()
      ctx.arc(gx, gy, 0.8, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(100,130,200,0.07)"
      ctx.fill()
    }
  }

  // Card outline
  rr(ctx, 1, 1, W - 2, H - 2, 28)
  ctx.strokeStyle = "rgba(0,0,0,0.06)"
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Top avatar-color wash
  const topWash = ctx.createLinearGradient(0, 0, W, 160)
  topWash.addColorStop(0, rgba(data.avatarColor, 0.18))
  topWash.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = topWash
  ctx.fillRect(0, 0, W, 200)

  // Top-right color blob
  const blob1 = ctx.createRadialGradient(W - 40, 30, 0, W - 40, 30, 70)
  blob1.addColorStop(0, rgba(data.avatarColor, 0.22))
  blob1.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = blob1
  ctx.fillRect(W - 120, 0, 120, 120)

  // Bottom-left blue blob
  const blob2 = ctx.createRadialGradient(30, H - 60, 0, 30, H - 60, 80)
  blob2.addColorStop(0, "rgba(59,130,246,0.12)")
  blob2.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = blob2
  ctx.fillRect(0, H - 130, 130, 130)

  // Confetti dots
  const confColors = [data.avatarColor, "#3b82f6", "#f59e0b", "#10b981", "#ec4899"]
  const confetti = [
    { x: 32,     y: 52,     r: 5,   c: 0 },
    { x: W - 42, y: 44,     r: 3.5, c: 1 },
    { x: W - 26, y: 68,     r: 5,   c: 2 },
    { x: 22,     y: 480,    r: 4,   c: 3 },
    { x: W - 30, y: 490,    r: 6,   c: 4 },
    { x: 50,     y: H - 30, r: 3,   c: 0 },
    { x: W - 60, y: H - 24, r: 3.5, c: 1 },
    { x: 200,    y: 30,     r: 3,   c: 2 },
  ]
  confetti.forEach(({ x, y, r, c }) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = rgba(confColors[c], 0.45)
    ctx.fill()
  })

  // ── Header logo ──────────────────────────────────────────────────────
  ctx.font = "bold 18px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#3b82f6"
  ctx.textAlign = "left"
  ctx.textBaseline = "alphabetic"
  ctx.fillText("bluer", 26, 38)
  ;[0, 1].forEach((i) => {
    ctx.beginPath()
    ctx.arc(82 + i * 10, 32, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = rgba("#3b82f6", 0.35 + i * 0.2)
    ctx.fill()
  })

  // ── Avatar ───────────────────────────────────────────────────────────
  const ax = W / 2, ay = 112, ar = 42

  const halo = ctx.createRadialGradient(ax, ay, ar, ax, ay, ar + 18)
  halo.addColorStop(0, rgba(data.avatarColor, 0.3))
  halo.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(ax, ay, ar + 18, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(ax, ay, ar + 4, 0, Math.PI * 2)
  ctx.fillStyle = "#ffffff"
  ctx.fill()

  ctx.beginPath()
  ctx.arc(ax, ay, ar + 4, 0, Math.PI * 2)
  ctx.strokeStyle = rgba(data.avatarColor, 0.6)
  ctx.lineWidth = 3
  ctx.stroke()

  const avGrad = ctx.createRadialGradient(ax - 8, ay - 8, 0, ax, ay, ar)
  avGrad.addColorStop(0, lighten(data.avatarColor, 20))
  avGrad.addColorStop(1, data.avatarColor)
  ctx.beginPath()
  ctx.arc(ax, ay, ar, 0, Math.PI * 2)
  ctx.fillStyle = avGrad
  ctx.fill()

  ctx.font = "bold 19px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#ffffff"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(data.avatarInitials, ax, ay + 1)

  // ── Name + username ──────────────────────────────────────────────────
  ctx.textBaseline = "alphabetic"
  ctx.font = "bold 20px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#0f172a"
  ctx.textAlign = "center"
  ctx.fillText(data.name, W / 2, 182)

  ctx.font = "13px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#94a3b8"
  ctx.fillText("@" + data.username, W / 2, 202)

  // Separator
  ctx.beginPath()
  ctx.moveTo(60, 216)
  ctx.lineTo(W - 60, 216)
  ctx.strokeStyle = "rgba(0,0,0,0.06)"
  ctx.lineWidth = 1
  ctx.stroke()

  // ── Portfolio card ───────────────────────────────────────────────────
  const bx = 22, by = 228, bw = W - 44, bh = 118, br = 20

  ctx.save()
  ctx.shadowColor = "rgba(0,0,0,0.07)"
  ctx.shadowBlur = 18
  ctx.shadowOffsetY = 4
  rr(ctx, bx, by, bw, bh, br)
  ctx.fillStyle = "#ffffff"
  ctx.fill()
  ctx.restore()

  rr(ctx, bx, by, bw, bh, br)
  ctx.strokeStyle = rgba(data.avatarColor, 0.2)
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Colored corner accent
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(bx + bw - 50, by)
  ctx.lineTo(bx + bw, by)
  ctx.arcTo(bx + bw, by, bx + bw, by + br, br)
  ctx.lineTo(bx + bw, by + 44)
  ctx.closePath()
  ctx.fillStyle = rgba(data.avatarColor, 0.12)
  ctx.fill()
  ctx.restore()

  ctx.font = "10px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#94a3b8"
  ctx.textAlign = "left"
  ctx.textBaseline = "alphabetic"
  ctx.fillText("PORTFOLIO VALUE", bx + 18, by + 24)

  const valStr = "$" + data.totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  ctx.font = "bold 30px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#0f172a"
  ctx.fillText(valStr, bx + 18, by + 64)

  // P/L pill
  const plAbs = Math.abs(data.totalPL)
  const plStr = (isPos ? "+" : "−") + "$" + (plAbs >= 1000 ? (plAbs / 1000).toFixed(1) + "k" : plAbs.toFixed(2))
  const pctStr = (isPos ? "+" : "") + data.plPercent.toFixed(2) + "%"
  const badgeLabel = `${plStr}  ${pctStr}`

  ctx.font = "bold 11.5px 'Inter', system-ui, sans-serif"
  const pdW = ctx.measureText(badgeLabel).width + 20
  const pdH = 24, pdX = bx + 18, pdY = by + 78

  rr(ctx, pdX, pdY, pdW, pdH, 12)
  ctx.fillStyle = isPos ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)"
  ctx.fill()
  ctx.fillStyle = plColor
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillText(badgeLabel, pdX + 10, pdY + pdH / 2)

  // ── Top holdings label ───────────────────────────────────────────────
  const coinsLabelY = 366
  ctx.font = "bold 9.5px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#cbd5e1"
  ctx.textAlign = "left"
  ctx.textBaseline = "alphabetic"
  ctx.fillText("TOP HOLDINGS", 26, coinsLabelY)

  // ── Coin chips ───────────────────────────────────────────────────────
  const topCoins = data.coins.slice(0, 5)
  const chipH = 30, chipGap = 8
  const chipW = Math.min(68, (W - 44 - (topCoins.length - 1) * chipGap) / topCoins.length)
  const totalChipsW = topCoins.length * chipW + (topCoins.length - 1) * chipGap
  let chipX = (W - totalChipsW) / 2
  const chipY = coinsLabelY + 12

  topCoins.forEach((coin) => {
    const [cr, cg, cb] = hexToRgb(coin.color)

    ctx.save()
    ctx.shadowColor = `rgba(${cr},${cg},${cb},0.2)`
    ctx.shadowBlur = 8
    ctx.shadowOffsetY = 2
    rr(ctx, chipX, chipY, chipW, chipH, 10)
    ctx.fillStyle = `rgba(${cr},${cg},${cb},0.1)`
    ctx.fill()
    ctx.restore()

    rr(ctx, chipX, chipY, chipW, chipH, 10)
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.35)`
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(chipX + 12, chipY + chipH / 2, 5, 0, Math.PI * 2)
    ctx.fillStyle = coin.color
    ctx.fill()

    ctx.font = "bold 9.5px 'Inter', system-ui, sans-serif"
    ctx.fillStyle = "#334155"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText(coin.symbol, chipX + 21, chipY + chipH / 2)

    chipX += chipW + chipGap
  })

  // ── Return stats ─────────────────────────────────────────────────────
  const statY = 428, statW = (W - 44 - 10) / 2, statH = 52, statR = 14
  const stats = [
    { label: "7D RETURN", value: data.totalPL * 0.18 },
    { label: "30D RETURN", value: data.totalPL * 0.62 },
  ]

  stats.forEach((s, i) => {
    const sx = 22 + i * (statW + 10)
    const sPos = s.value >= 0
    const sColor = sPos ? gainColor : lossColor
    const [sr, sg, sb] = hexToRgb(sColor)

    ctx.save()
    ctx.shadowColor = "rgba(0,0,0,0.05)"
    ctx.shadowBlur = 12
    ctx.shadowOffsetY = 2
    rr(ctx, sx, statY, statW, statH, statR)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.restore()

    rr(ctx, sx, statY, statW, statH, statR)
    ctx.strokeStyle = `rgba(${sr},${sg},${sb},0.2)`
    ctx.lineWidth = 1.2
    ctx.stroke()

    ctx.font = "9px 'Inter', system-ui, sans-serif"
    ctx.fillStyle = "#94a3b8"
    ctx.textAlign = "left"
    ctx.textBaseline = "alphabetic"
    ctx.fillText(s.label, sx + 14, statY + 18)

    const vAbs = Math.abs(s.value)
    const vStr = (s.value >= 0 ? "+" : "−") + "$" + (vAbs >= 1000 ? (vAbs / 1000).toFixed(1) + "k" : vAbs.toFixed(2))
    ctx.font = "bold 15px 'Inter', system-ui, sans-serif"
    ctx.fillStyle = sColor
    ctx.fillText(vStr, sx + 14, statY + 40)
  })

  // ── Footer ───────────────────────────────────────────────────────────
  const fy = 500
  ctx.beginPath()
  ctx.moveTo(40, fy)
  ctx.lineTo(W - 40, fy)
  ctx.strokeStyle = "rgba(0,0,0,0.05)"
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.font = "11px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#cbd5e1"
  ctx.textAlign = "center"
  ctx.textBaseline = "alphabetic"
  ctx.fillText("Track your portfolio on", W / 2, fy + 22)

  ctx.font = "bold 16px 'Inter', system-ui, sans-serif"
  ctx.fillStyle = "#3b82f6"
  ctx.fillText("bluer", W / 2, fy + 46)

  ;[-38, 38].forEach((dx) => {
    ctx.beginPath()
    ctx.arc(W / 2 + dx, fy + 42, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(59,130,246,0.3)"
    ctx.fill()
  })

  return canvas.toDataURL("image/png")
}
