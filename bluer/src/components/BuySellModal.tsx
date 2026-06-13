"use client"

import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { COINS } from "@/lib/mock-data"

type Props = {
  open: boolean
  onClose: () => void
  defaultType?: "buy" | "sell"
}

export function BuySellModal({ open, onClose, defaultType = "buy" }: Props) {
  const [type, setType] = useState<"buy" | "sell">(defaultType)
  const [coinId, setCoinId] = useState("")
  const [amount, setAmount] = useState("")
  const [usd, setUsd] = useState("")

  useEffect(() => { setType(defaultType) }, [defaultType])

  const selectedCoin = COINS.find((c) => c.id === coinId)

  function handleAmountChange(val: string) {
    setAmount(val)
    if (selectedCoin && val) {
      setUsd((parseFloat(val) * selectedCoin.price).toFixed(2))
    } else {
      setUsd("")
    }
  }

  function handleUsdChange(val: string) {
    setUsd(val)
    if (selectedCoin && val) {
      setAmount((parseFloat(val) / selectedCoin.price).toFixed(6))
    } else {
      setAmount("")
    }
  }

  function handleSave() {
    if (type === "buy") {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#4f8ef7", "#a78bfa", "#34d399", "#fbbf24"],
      })
    } else {
      // Subtle shower from top for sell
      confetti({
        particleCount: 60,
        angle: 270,
        spread: 60,
        origin: { x: 0.5, y: 0 },
        colors: ["#94a3b8", "#cbd5e1", "#e2e8f0"],
        gravity: 1.2,
      })
    }
    onClose()
    setAmount("")
    setUsd("")
    setCoinId("")
  }

  const isBuy = type === "buy"

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">Add Transaction</DialogTitle>
        </DialogHeader>

        <Tabs value={type} onValueChange={(v) => setType(v as "buy" | "sell")} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="buy" className="flex-1">Buy</TabsTrigger>
            <TabsTrigger value="sell" className="flex-1">Sell</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label>Coin</Label>
            <Select value={coinId} onValueChange={setCoinId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a coin" />
              </SelectTrigger>
              <SelectContent>
                {COINS.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
                      <span className="font-medium">{c.symbol}</span>
                      <span className="text-muted-foreground text-xs">{c.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Coin Amount</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="pr-16"
              />
              {selectedCoin && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                  {selectedCoin.symbol}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>USD Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
              <Input
                type="number"
                placeholder="0.00"
                value={usd}
                onChange={(e) => handleUsdChange(e.target.value)}
                className="pl-7"
              />
            </div>
            {selectedCoin && (
              <p className="text-xs text-muted-foreground">
                Current price: ${selectedCoin.price.toLocaleString()}
              </p>
            )}
          </div>

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={!coinId || !amount || !usd}
            variant={isBuy ? "default" : "destructive"}
          >
            {isBuy ? "Buy" : "Sell"} {selectedCoin?.symbol ?? "Coin"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
