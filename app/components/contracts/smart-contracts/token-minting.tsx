"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getFLBBalance } from "@/lib/contract-utils"
import { motion } from "framer-motion"

export function TokenMinting({ address }: { address: string | null }) {
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [balance, setBalance] = useState<string | null>(null)
  const [result, setResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address || !amount) return

    setIsSubmitting(true)
    setResult(null)

    try {
      // In a real implementation, this would call the contract
      // For testing data entry, we'll simulate a successful mint

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate success
      const success = true

      if (success) {
        setResult({
          success: true,
          message: `Successfully minted FLB tokens for ${amount} BNB! Thank you for supporting Flameborn.`,
        })

        // Update balance - in a real implementation, this would fetch from the blockchain
        const newBalance = Number.parseFloat(balance || "0") + Number.parseFloat(amount) * 100 // Simulate 100 FLB per BNB
        setBalance(newBalance.toFixed(2))

        // Clear form
        setAmount("")
      } else {
        setResult({
          success: false,
          message: "Minting failed. Please try again or contact support.",
        })
      }
    } catch (error) {
      console.error("Error during minting:", error)
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fetch balance when address changes
  const fetchBalance = async () => {
    if (!address) return

    try {
      const balance = await getFLBBalance(address)
      setBalance(balance)
    } catch (error) {
      console.error("Error fetching balance:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="flame-card">
        <CardHeader>
          <CardTitle className="flame-text text-center">Mint FLB Tokens</CardTitle>
          <CardDescription className="text-center">Support the Flameborn mission by minting FLB tokens</CardDescription>
        </CardHeader>
        <CardContent>
          {address ? (
            <>
              <div className="mb-4 text-center">
                <button onClick={fetchBalance} className="text-sm underline text-healing-blue hover:text-flame-red">
                  Check FLB Balance
                </button>
                {balance !== null && (
                  <p className="mt-2 text-white">
                    Current Balance: <span className="font-bold">{balance} FLB</span>
                  </p>
                )}
              </div>

              <form onSubmit={handleMint} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="amount" className="block text-sm font-medium text-white">
                    Amount (BNB)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="flame-input"
                    placeholder="0.1"
                  />
                  <p className="text-xs text-gray-400">Minimum contribution: 0.01 BNB</p>
                </div>

                <Button type="submit" disabled={isSubmitting || !amount} className="flame-button w-full">
                  {isSubmitting ? "Processing..." : "Mint FLB Tokens"}
                </Button>

                {result && (
                  <div
                    className={`p-3 rounded text-center ${
                      result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.message}
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-white">Please connect your wallet to mint FLB tokens</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
