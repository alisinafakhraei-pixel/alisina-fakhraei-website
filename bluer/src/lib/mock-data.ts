export type Coin = {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  holdings: number
  avgBuyPrice: number
  color: string
}

export type Transaction = {
  id: string
  coinId: string
  coinSymbol: string
  type: "buy" | "sell"
  amount: number
  priceAtTime: number
  total: number
  date: string
}

export const COINS: Coin[] = [
  { id: "btc",   symbol: "BTC",   name: "Bitcoin",     price: 105000, change24h: 2.4,  holdings: 0.34, avgBuyPrice: 52000, color: "#F7931A" },
  { id: "eth",   symbol: "ETH",   name: "Ethereum",    price: 2500,   change24h: -1.2, holdings: 2.5,  avgBuyPrice: 1800,  color: "#627EEA" },
  { id: "usdt",  symbol: "USDT",  name: "Tether",      price: 1.00,   change24h: 0.01, holdings: 1500, avgBuyPrice: 1.00,  color: "#26A17B" },
  { id: "sol",   symbol: "SOL",   name: "Solana",      price: 175,    change24h: 3.1,  holdings: 12,   avgBuyPrice: 95,    color: "#9945FF" },
  { id: "bnb",   symbol: "BNB",   name: "BNB",         price: 680,    change24h: 0.8,  holdings: 2.2,  avgBuyPrice: 320,   color: "#F0B90B" },
  { id: "xrp",   symbol: "XRP",   name: "XRP",         price: 2.50,   change24h: -0.6, holdings: 3000, avgBuyPrice: 0.80,  color: "#346AA9" },
  { id: "xaut",  symbol: "XAUT",  name: "Tether Gold", price: 3300,   change24h: 0.3,  holdings: 0.5,  avgBuyPrice: 2600,  color: "#D4AF37" },
  { id: "slvon", symbol: "SLVON", name: "Silver",      price: 33,     change24h: -0.4, holdings: 30,   avgBuyPrice: 25,    color: "#A8A9AD" },
  { id: "usoon", symbol: "USOON", name: "Crude Oil",   price: 75,     change24h: -1.1, holdings: 15,   avgBuyPrice: 82,    color: "#7C5C3B" },
]

export const TRANSACTIONS: Transaction[] = [
  { id: "t1", coinId: "btc",  coinSymbol: "BTC",  type: "buy",  amount: 0.1,  priceAtTime: 88000, total: 8800,  date: "2025-01-10" },
  { id: "t2", coinId: "eth",  coinSymbol: "ETH",  type: "buy",  amount: 1.0,  priceAtTime: 2200,  total: 2200,  date: "2025-01-18" },
  { id: "t3", coinId: "sol",  coinSymbol: "SOL",  type: "buy",  amount: 5,    priceAtTime: 140,   total: 700,   date: "2025-02-05" },
  { id: "t4", coinId: "btc",  coinSymbol: "BTC",  type: "sell", amount: 0.05, priceAtTime: 97000, total: 4850,  date: "2025-02-20" },
  { id: "t5", coinId: "bnb",  coinSymbol: "BNB",  type: "buy",  amount: 1.0,  priceAtTime: 580,   total: 580,   date: "2025-03-08" },
  { id: "t6", coinId: "usdt", coinSymbol: "USDT", type: "buy",  amount: 1500, priceAtTime: 1.00,  total: 1500,  date: "2025-03-15" },
  { id: "t7", coinId: "xrp",  coinSymbol: "XRP",  type: "buy",  amount: 1000, priceAtTime: 1.20,  total: 1200,  date: "2025-04-02" },
]

export const CHART_DATA = [
  { date: "Jan", value: 12000 },
  { date: "Feb", value: 14500 },
  { date: "Mar", value: 11200 },
  { date: "Apr", value: 16800 },
  { date: "May", value: 19400 },
  { date: "Jun", value: 22100 },
  { date: "Jul", value: 18900 },
]

export function getTotalValue(coins: Coin[]) {
  return coins.reduce((sum, c) => sum + c.price * c.holdings, 0)
}

export function getTotalPL(coins: Coin[]) {
  return coins.reduce((sum, c) => sum + (c.price - c.avgBuyPrice) * c.holdings, 0)
}

export function getCoinPL(coin: Coin) {
  return (coin.price - coin.avgBuyPrice) * coin.holdings
}

export function getCoinPLPercent(coin: Coin) {
  return ((coin.price - coin.avgBuyPrice) / coin.avgBuyPrice) * 100
}

export function getBreakEven(coin: Coin) {
  return coin.avgBuyPrice
}
