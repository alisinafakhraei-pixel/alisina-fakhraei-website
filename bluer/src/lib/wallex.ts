type PriceUpdate = { symbol: string; price: string; "24h_ch": number }
type Listener = (update: PriceUpdate) => void

export const WALLEX_SYMBOL: Record<string, string> = {
  BTC:   "BTCUSDT",
  ETH:   "ETHUSDT",
  SOL:   "SOLUSDT",
  BNB:   "BNBUSDT",
  XRP:   "XRPUSDT",
  XAUT:  "XAUTUSDT",
  SLVON: "SLVONUSDT",
  USOON: "USOONUSDT",
}

export async function fetchCurrentPrices(): Promise<Map<string, PriceUpdate>> {
  const res = await fetch("/api/prices")
  const json = await res.json()
  const symbols: Record<string, { stats: { lastPrice: string; "24h_ch": number } }> =
    json?.result?.symbols ?? {}
  const map = new Map<string, PriceUpdate>()
  for (const [sym, data] of Object.entries(symbols)) {
    map.set(sym, { symbol: sym, price: data.stats.lastPrice, "24h_ch": data.stats["24h_ch"] })
  }
  return map
}

let ws: WebSocket | null = null
const listeners = new Set<Listener>()
let reconnectTimer: ReturnType<typeof setTimeout> | null = null

function connect() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return

  ws = new WebSocket("wss://api.wallex.ir/ws")

  ws.onopen = () => {
    ws!.send(JSON.stringify(["subscribe", { channel: "all@price" }]))
  }

  ws.onmessage = (e: MessageEvent) => {
    try {
      const msg = JSON.parse(e.data as string)
      if (Array.isArray(msg) && msg[0] === "all@price") {
        listeners.forEach((l) => l(msg[1] as PriceUpdate))
      }
    } catch { /* ignore parse errors */ }
  }

  ws.onclose = () => {
    ws = null
    reconnectTimer = setTimeout(connect, 3000)
  }

  ws.onerror = () => {
    ws?.close()
  }
}

export function subscribeToAllPrices(listener: Listener): () => void {
  listeners.add(listener)
  if (typeof window !== "undefined") connect()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      ws?.close()
      ws = null
      if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
      }
    }
  }
}
