"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ExternalLink } from "lucide-react"
import { useWalletContext } from "@/providers/wallet-provider"
import { ethers } from "ethers"
import { CONTRACT_ADDRESSES, NETWORKS } from "@/lib/constants"
// Assuming DonationRouterABI is correctly defined and exported from this path
import { DonationRouterABI } from "@/lib/abis/DonationRouterABI"

interface Donation {
  recipient: string
  amount: string // Keep as string as it's formatted ethers
  timestamp: number
  transactionHash?: string
}

export function DonationHistory() {
  const { address, isConnected, provider, chainId } = useWalletContext()
  const [donations, setDonations] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchDonationHistory = async () => {
    if (!isConnected || !provider || !address || !chainId) {
      // Added chainId check for CONTRACT_ADDRESSES
      setDonations([])
      return
    }

    setIsLoading(true)
    try {
      // Ensure CONTRACT_ADDRESSES[chainId] and CONTRACT_ADDRESSES[chainId].DONATION_ROUTER exist
      const routerAddress = CONTRACT_ADDRESSES[chainId]?.DONATION_ROUTER
      if (!routerAddress) {
        console.error(`DonationRouter contract address not found for chainId: ${chainId}`)
        setDonations([]) // Or handle with mock data as before
        // For demo purposes, show mock data if contract address is missing
        setDonations([
          {
            recipient: "0xf39Fd6e51aad88F6F4ce6aB8829539c652746fF0",
            amount: "0.1",
            timestamp: Date.now() - 86400000,
            transactionHash: "0x123...def123",
          },
          {
            recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            amount: "0.05",
            timestamp: Date.now() - 172800000,
            transactionHash: "0xabc...cde",
          },
        ])
        setIsLoading(false)
        return
      }

      const donationRouter = new ethers.Contract(routerAddress, DonationRouterABI, provider)

      // Get donation history from contract
      // Ensure getDonationHistory method exists on the contract and returns expected structure
      const history = await donationRouter.getDonationHistory(address)

      // Format the donation history
      const formattedHistory: Donation[] = history.map((item: any) => ({
        recipient: item[0], // Assuming item[0] is address string
        amount: ethers.formatEther(item[1]), // Assuming item[1] is BigNumberish
        timestamp: Number(item[2]), // Assuming item[2] is BigNumberish or number
        transactionHash: item[3] || undefined, // Assuming item[3] is string or undefined
      }))

      setDonations(formattedHistory)
    } catch (error) {
      console.error("Error fetching donation history:", error)
      // For demo purposes, show mock data if contract call fails
      setDonations([
        {
          recipient: "0xf39Fd6e51aad88F6F4ce6aB8829539c652746fF0",
          amount: "0.1",
          timestamp: Date.now() - 86400000, // 1 day ago
          transactionHash: "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234",
        },
        {
          recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          amount: "0.05",
          timestamp: Date.now() - 172800000, // 2 days ago
          transactionHash: "0xabcdef123456789abcdef123456789abcdef123456789abcdef123456789abcde",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDonationHistory()
  }, [isConnected, provider, address, chainId]) // Added chainId dependency

  // Get transaction explorer URL
  const getExplorerUrl = (hash: string) => {
    if (!hash || !chainId) return ""

    const network = Object.values(NETWORKS).find((n) => n.chainId === chainId)
    if (!network || !network.blockExplorer) return ""

    return `${network.blockExplorer}/tx/${hash}`
  }

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString() // Assuming timestamp is in seconds
  }

  return (
    <Card className="border-blue-500/30 bg-black/60 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-300">Your Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 mr-2 animate-spin text-blue-400" />
            <span className="text-blue-100/70">Loading donation history...</span>
          </div>
        ) : !isConnected ? (
          <div className="text-center py-4 text-blue-100/70">Connect your wallet to view donation history</div>
        ) : donations.length === 0 ? (
          <div className="text-center py-4 text-blue-100/70">No donations found</div>
        ) : (
          <div className="space-y-4">
            {donations.map((donation, index) => (
              <div key={index} className="p-3 rounded-lg border border-blue-500/20 bg-blue-950/20">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="bg-blue-600 text-white mb-2">{donation.amount} BNB</Badge>
                    <p className="text-sm text-blue-100/70">
                      To: {donation.recipient.substring(0, 6)}...
                      {donation.recipient.substring(donation.recipient.length - 4)}
                    </p>
                    <p className="text-xs text-blue-100/50">{formatDate(donation.timestamp)}</p>
                  </div>

                  {donation.transactionHash && (
                    <a
                      href={getExplorerUrl(donation.transactionHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
