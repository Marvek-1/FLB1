// donation-feed-teq3AEqutHJ4rcQm5bWUnf90VqJqsn.tsx
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Zap, Gift } from "lucide-react"

// Assuming a websocket hook similar to the one in your plan
// For now, let's define a placeholder if not available
// import { useWebSocket } from '@/lib/websocket';

// Placeholder for websocket hook if not yet implemented
const useWebSocket = (url: string) => {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // This is a mock implementation. Replace with actual WebSocket logic.
    // console.log(`Mock WebSocket connecting to ${url}`);
    setIsConnected(true)
    const mockDonations = [
      { id: "1", donor: "0xAlice", amount: "10", token: "FLB", timestamp: Date.now() - 10000, type: "direct" },
      { id: "2", donor: "0xBob", amount: "5", token: "ETH", timestamp: Date.now() - 20000, type: "genesis" },
      { id: "3", donor: "0xCharlie", amount: "25", token: "FLB", timestamp: Date.now() - 30000, type: "impact" },
    ]
    // Simulate receiving data
    let intervalId: NodeJS.Timeout
    if (url.includes("/api/ws/donations")) {
      // Only mock for donations feed
      setData(mockDonations)
      intervalId = setInterval(() => {
        const newDonation = {
          id: Math.random().toString(36).substring(7),
          donor: `0xUser${Math.floor(Math.random() * 1000)}`,
          amount: (Math.random() * 50).toFixed(2),
          token: Math.random() > 0.5 ? "FLB" : "ETH",
          timestamp: Date.now(),
          type: ["direct", "genesis", "impact"][Math.floor(Math.random() * 3)] as "direct" | "genesis" | "impact",
        }
        setData((prevData) => [newDonation, ...prevData.slice(0, 9)]) // Keep last 10
      }, 5000)
    }

    return () => {
      // console.log(`Mock WebSocket disconnecting from ${url}`);
      setIsConnected(false)
      if (intervalId) clearInterval(intervalId)
    }
  }, [url])

  return { data, error, isConnected }
}

interface Donation {
  id: string
  donor: string // Wallet address
  amount: string
  token: string // e.g., FLB, ETH
  timestamp: number
  type?: "direct" | "genesis" | "impact" // Optional: to style differently
  beneficiary?: string // Optional: if direct to a specific healer
  message?: string // Optional: donor's message
}

const DonationCard: React.FC<Donation> = ({
  donor,
  amount,
  token,
  timestamp,
  type = "direct",
  beneficiary,
  message,
}) => {
  const timeAgo = new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const getIcon = () => {
    switch (type) {
      case "genesis":
        return <Zap className="h-5 w-5 text-yellow-400" />
      case "impact":
        return <Heart className="h-5 w-5 text-pink-500" />
      case "direct":
      default:
        return <Gift className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700 mb-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <p className="text-sm font-semibold text-sky-400">
              <span className="truncate max-w-[100px] inline-block align-middle">
                {donor.slice(0, 6)}...{donor.slice(-4)}
              </span>
              <span className="text-gray-400"> donated </span>
              <span className="text-flame-red font-bold">
                {amount} {token}
              </span>
            </p>
            {beneficiary && (
              <p className="text-xs text-gray-500">
                To:{" "}
                <span className="font-medium text-gray-400">
                  {beneficiary.slice(0, 6)}...{beneficiary.slice(-4)}
                </span>
              </p>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500">{timeAgo}</p>
      </div>
      {message && <p className="text-xs text-gray-300 mt-2 italic">"{message}"</p>}
    </motion.div>
  )
}

export default function DonationFeed({ maxItems = 10 }: { maxItems?: number }) {
  // Assuming your websocket hook is in '@/lib/websocket'
  // If not, you'll need to implement or import it.
  // For now, using the placeholder defined above.
  const {
    data: donations,
    error,
    isConnected,
  } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL ? `${process.env.NEXT_PUBLIC_WS_URL}/api/ws/donations` : "/api/ws/donations-mock",
  )

  if (error) {
    return <div className="text-red-500 p-4 bg-red-900/50 rounded-md">Error loading donation feed: {error.message}</div>
  }

  if (!isConnected && !donations.length) {
    return <div className="p-4 text-center text-gray-500">Connecting to donation feed...</div>
  }

  if (donations.length === 0) {
    return <div className="p-4 text-center text-gray-500">No recent donations. Be the first to light a flame!</div>
  }

  return (
    <div className="h-full overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800/50">
      <AnimatePresence initial={false}>
        {donations.slice(0, maxItems).map((donation: Donation) => (
          <DonationCard key={donation.id} {...donation} />
        ))}
      </AnimatePresence>
    </div>
  )
}
