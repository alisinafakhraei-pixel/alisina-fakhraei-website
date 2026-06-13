import { createClient } from "@supabase/supabase-js"

const url = "https://yeslswkxcruvaytljayr.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllc2xzd2t4Y3J1dmF5dGxqYXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MjgyNTYsImV4cCI6MjA5NjMwNDI1Nn0.zPDSu3afDoQ5MiipQ_iMM-0qLzSllghpMHTLBuCfUF4"

export const supabase = createClient(url, key)

export type DbTransaction = {
  id: string
  user_id: string
  coin_id: string
  coin_symbol: string
  type: "buy" | "sell"
  amount: number
  price_at_time: number
  total: number
  date: string
  created_at: string
}

export type DbProfile = {
  id: string
  phone: string | null
  name: string
  avatar_color: string
  display_name: string | null
  email: string | null
  created_at: string
}
