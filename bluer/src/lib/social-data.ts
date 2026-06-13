import { type Coin, getTotalValue, getTotalPL } from "./mock-data"

export type SocialUser = {
  id: string
  username: string
  name: string
  bio: string
  avatarColor: string
  avatarInitials: string
  followersCount: number
  followingCount: number
  coins: Coin[]
}

const ALEX_COINS: Coin[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin",  price: 105000, change24h: 2.4,  holdings: 1.2,  avgBuyPrice: 41000, color: "#F7931A" },
  { id: "eth", symbol: "ETH", name: "Ethereum", price: 2500,   change24h: -1.2, holdings: 8.5,  avgBuyPrice: 1200,  color: "#627EEA" },
  { id: "sol", symbol: "SOL", name: "Solana",   price: 175,    change24h: 3.1,  holdings: 20,   avgBuyPrice: 50,    color: "#9945FF" },
]

const SARA_COINS: Coin[] = [
  { id: "btc",  symbol: "BTC",  name: "Bitcoin", price: 105000, change24h: 2.4,  holdings: 0.05, avgBuyPrice: 92000, color: "#F7931A" },
  { id: "sol",  symbol: "SOL",  name: "Solana",  price: 175,    change24h: 3.1,  holdings: 30,   avgBuyPrice: 110,   color: "#9945FF" },
  { id: "usdt", symbol: "USDT", name: "Tether",  price: 1.00,   change24h: 0.01, holdings: 5000, avgBuyPrice: 1.00,  color: "#26A17B" },
]

const MIKE_COINS: Coin[] = [
  { id: "eth", symbol: "ETH", name: "Ethereum", price: 2500, change24h: -1.2, holdings: 15,   avgBuyPrice: 800,  color: "#627EEA" },
  { id: "xrp", symbol: "XRP", name: "XRP",      price: 2.50, change24h: -0.6, holdings: 8000, avgBuyPrice: 0.50, color: "#346AA9" },
]

const LENA_COINS: Coin[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin",  price: 105000, change24h: 2.4,  holdings: 0.75, avgBuyPrice: 55000, color: "#F7931A" },
  { id: "bnb", symbol: "BNB", name: "BNB",      price: 680,    change24h: 0.8,  holdings: 4,    avgBuyPrice: 280,   color: "#F0B90B" },
  { id: "eth", symbol: "ETH", name: "Ethereum", price: 2500,   change24h: -1.2, holdings: 3.2,  avgBuyPrice: 2800,  color: "#627EEA" },
  { id: "sol", symbol: "SOL", name: "Solana",   price: 175,    change24h: 3.1,  holdings: 15,   avgBuyPrice: 130,   color: "#9945FF" },
]

const JIN_COINS: Coin[] = [
  { id: "usdt", symbol: "USDT", name: "Tether",  price: 1.00,   change24h: 0.01, holdings: 25000, avgBuyPrice: 1.00,  color: "#26A17B" },
  { id: "btc",  symbol: "BTC",  name: "Bitcoin", price: 105000, change24h: 2.4,  holdings: 0.18,  avgBuyPrice: 48000, color: "#F7931A" },
]

const OMAR_COINS: Coin[] = [
  { id: "xrp", symbol: "XRP", name: "XRP",    price: 2.50, change24h: -0.6, holdings: 15000, avgBuyPrice: 0.35, color: "#346AA9" },
  { id: "bnb", symbol: "BNB", name: "BNB",    price: 680,  change24h: 0.8,  holdings: 6,     avgBuyPrice: 200,  color: "#F0B90B" },
  { id: "sol", symbol: "SOL", name: "Solana", price: 175,  change24h: 3.1,  holdings: 25,    avgBuyPrice: 40,   color: "#9945FF" },
]

export const SOCIAL_USERS: SocialUser[] = [
  {
    id: "alex",
    username: "alextrader",
    name: "Alex Chen",
    bio: "Long-term BTC & ETH holder. DCA every month.",
    avatarColor: "#6366f1",
    avatarInitials: "AC",
    followersCount: 1284,
    followingCount: 203,
    coins: ALEX_COINS,
  },
  {
    id: "sara",
    username: "sarahodls",
    name: "Sara Kim",
    bio: "SOL stacker & stablecoin base. Macro enthusiast.",
    avatarColor: "#ec4899",
    avatarInitials: "SK",
    followersCount: 876,
    followingCount: 142,
    coins: SARA_COINS,
  },
  {
    id: "mike",
    username: "mikedefi",
    name: "Mike Russo",
    bio: "ETH maxi. XRP on the side.",
    avatarColor: "#f59e0b",
    avatarInitials: "MR",
    followersCount: 2341,
    followingCount: 89,
    coins: MIKE_COINS,
  },
  {
    id: "lena",
    username: "lenaportfolio",
    name: "Lena Kovacs",
    bio: "Diversified across BTC, ETH & altcoins.",
    avatarColor: "#10b981",
    avatarInitials: "LK",
    followersCount: 512,
    followingCount: 310,
    coins: LENA_COINS,
  },
  {
    id: "jin",
    username: "jinhodl",
    name: "Jin Park",
    bio: "Stablecoin base, BTC spikes.",
    avatarColor: "#0ea5e9",
    avatarInitials: "JP",
    followersCount: 430,
    followingCount: 77,
    coins: JIN_COINS,
  },
  {
    id: "omar",
    username: "omarcommod",
    name: "Omar Farouk",
    bio: "Altcoin trader. XRP, BNB, SOL.",
    avatarColor: "#ef4444",
    avatarInitials: "OF",
    followersCount: 3102,
    followingCount: 56,
    coins: OMAR_COINS,
  },
]

export const INITIALLY_FOLLOWED = new Set(["alex", "sara", "mike"])

export function getUserTotalValue(user: SocialUser) {
  return getTotalValue(user.coins)
}

export function getUserTotalPL(user: SocialUser) {
  return getTotalPL(user.coins)
}

export function getUserPLPercent(user: SocialUser) {
  const pl = getUserTotalPL(user)
  const cost = getUserTotalValue(user) - pl
  return cost > 0 ? (pl / cost) * 100 : 0
}
