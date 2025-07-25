"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, TrendingUp } from "lucide-react"

export default function DonationStats() {
  const [totalDonations, setTotalDonations] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null) // Error state was declared but not used

  useEffect(() => {
    // Use mock data instead of fetching
    const mockData = {
      totalDonations: 12,
      totalAmount: 0.75,
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setTotalDonations(mockData.totalDonations)
      setTotalAmount(mockData.totalAmount)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [])

  return (
    <Card className="border-blue-500/30 bg-black/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-blue-300">Donation Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-blue-500/20 bg-blue-950/20">
            <Heart className="h-8 w-8 text-pink-500 mb-2" />
            <p className="text-sm text-blue-100/70">Total Donations</p>
            {loading ? (
              <div className="h-6 w-16 animate-pulse bg-blue-900/30 rounded mt-1"></div>
            ) : (
              <p className="text-2xl font-bold text-blue-100">{totalDonations}</p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-blue-500/20 bg-blue-950/20">
            <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-blue-100/70">Total Amount</p>
            {loading ? (
              <div className="h-6 w-16 animate-pulse bg-blue-900/30 rounded mt-1"></div>
            ) : (
              <p className="text-2xl font-bold text-blue-100">{totalAmount} BNB</p>
            )}
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg border border-blue-500/20 bg-blue-950/20">
          <p className="text-center text-sm text-blue-100/70">Donations go directly to the BNB wallet:</p>
          <p className="text-center text-xs font-mono text-blue-300 mt-1 break-all">
            0xaa4202d69E6c9ddE7De2885B9DDe88c7baA240f8
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
