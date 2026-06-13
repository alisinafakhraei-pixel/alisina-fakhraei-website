"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase, type DbTransaction } from "./supabase"
import { useAuth } from "./AuthContext"

export function useTransactions() {
  const { user, isLoggedIn } = useAuth()
  const [transactions, setTransactions] = useState<DbTransaction[]>([])
  const [loading, setLoading] = useState(false)

  const fetch = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data } = await supabase
      .from("bluer_transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
    setTransactions(data ?? [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (isLoggedIn) fetch()
    else setTransactions([])
  }, [isLoggedIn, fetch])

  async function addTransaction(tx: Omit<DbTransaction, "id" | "user_id" | "created_at">) {
    if (!user) return
    const { data } = await supabase
      .from("bluer_transactions")
      .insert({ ...tx, user_id: user.id })
      .select()
      .single()
    if (data) setTransactions((prev) => [data, ...prev])
  }

  async function deleteTransaction(id: string) {
    await supabase.from("bluer_transactions").delete().eq("id", id)
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  return { transactions, loading, addTransaction, deleteTransaction, refresh: fetch }
}
