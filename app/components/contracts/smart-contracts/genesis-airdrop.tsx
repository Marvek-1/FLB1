"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { Gift, CheckCircle, Clock, AlertTriangle, ExternalLink, Copy, Flame, Users, Zap } from "lucide-react"
import { useWallet } from "@/providers/wallet-provider"
import { toast } from "@/hooks/use-toast"
import { GENESIS_VALIDATORS, FLB_TOKEN_ADDRESSES, TESTNET_CONFIG } from "@/lib/constants"

interface AirdropStatus {
  address: string
  status: "pending" | "processing" | "completed" | "failed"
  amount: string
  txHash?: string
  timestamp?: number
}

export function GenesisAirdrop() {
  const { connected, address, chainId, balance, updateBalance } = useWallet()
  const [airdropStatuses, setAirdropStatuses] = useState<AirdropStatus[]>([])
  const [isEligible, setIsEligible] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimStatus, setClaimStatus] = useState<"none" | "processing" | "completed" | "failed">("none")

  const isOnAlfajores = chainId === 44787

  useEffect(() => {
    // Initialize airdrop statuses for genesis validators
    const initialStatuses: AirdropStatus[] = GENESIS_VALIDATORS.map((addr) => ({
      address: addr,
      status: "pending",
      amount: TESTNET_CONFIG.AIRDROP_AMOUNT,
    }))
    setAirdropStatuses(initialStatuses)

    // Check if current user is eligible
    if (address && GENESIS_VALIDATORS.includes(address)) {
      setIsEligible(true)
    }
  }, [address])

  const handleClaimAirdrop = async () => {
    if (!address || !isEligible) return

    setIsClaiming(true)
    setClaimStatus("processing")

    try {
      // Simulate airdrop claim process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Update status for this address
      setAirdropStatuses((prev) =>
        prev.map((status) =>
          status.address === address
            ? {
                ...status,
                status: "completed",
                txHash: "0x" + Math.random().toString(16).substr(2, 64),
                timestamp: Date.now(),
              }
            : status,
        ),
      )

      setClaimStatus("completed")
      await updateBalance()

      toast({
        title: "Airdrop Claimed Successfully",
        description: `You received ${TESTNET_CONFIG.AIRDROP_AMOUNT} FLB tokens`,
      })
    } catch (error) {
      setClaimStatus("failed")
      setAirdropStatuses((prev) =>
        prev.map((status) => (status.address === address ? { ...status, status: "failed" } : status)),
      )

      toast({
        title: "Airdrop Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      })
    } finally {
      setIsClaiming(false)
    }
  }

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr)
    toast({
      title: "Address Copied",
      description: "Address copied to clipboard",
    })
  }

  const openTxOnExplorer = (txHash: string) => {
    window.open(`https://alfajores.celoscan.io/tx/${txHash}`, "_blank")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500"
      case "processing":
        return "text-yellow-500"
      case "failed":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const completedCount = airdropStatuses.filter((s) => s.status === "completed").length
  const totalCount = airdropStatuses.length
  const progressPercentage = (completedCount / totalCount) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-white">Genesis Airdrop</CardTitle>
              <CardDescription className="text-orange-200">
                Initial token distribution to founding validators
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{TESTNET_CONFIG.AIRDROP_AMOUNT}</div>
              <div className="text-sm text-orange-200">FLB per Validator</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalCount}</div>
              <div className="text-sm text-orange-200">Genesis Validators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{completedCount}</div>
              <div className="text-sm text-orange-200">Tokens Distributed</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-orange-200 mb-2">
              <span>Distribution Progress</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={progressPercentage} className="bg-orange-900/50" />
          </div>
        </CardContent>
      </Card>

      {/* User Eligibility */}
      {connected && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Your Eligibility Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isOnAlfajores ? (
              <Alert className="border-yellow-500/30 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-200">
                  Please switch to Celo Alfajores testnet to participate in the genesis airdrop
                </AlertDescription>
              </Alert>
            ) : isEligible ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400 font-semibold">You are eligible for the genesis airdrop!</span>
                </div>

                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300">Airdrop Amount:</span>
                    <span className="text-white font-bold">{TESTNET_CONFIG.AIRDROP_AMOUNT} FLB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-300">Your Address:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-800 px-2 py-1 rounded">
                        {address?.slice(0, 10)}...{address?.slice(-8)}
                      </code>
                      <Button variant="ghost" size="sm" onClick={() => copyAddress(address!)} className="h-6 w-6 p-0">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleClaimAirdrop}
                  disabled={isClaiming || claimStatus === "completed"}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  {isClaiming ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Claiming Airdrop...
                    </>
                  ) : claimStatus === "completed" ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Airdrop Claimed
                    </>
                  ) : (
                    <>
                      <Gift className="w-4 h-4 mr-2" />
                      Claim Genesis Airdrop
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Alert className="border-gray-500/30 bg-gray-500/10">
                <AlertTriangle className="h-4 w-4 text-gray-400" />
                <AlertDescription className="text-gray-300">
                  Your address is not eligible for the genesis airdrop. Only founding validators receive initial tokens.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Airdrop Status List */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Flame className="w-5 h-5" />
            Genesis Validator Airdrops
          </CardTitle>
          <CardDescription className="text-gray-400">
            Real-time status of token distribution to founding validators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {airdropStatuses.map((status, index) => (
              <motion.div
                key={status.address}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(status.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-white">
                        {status.address.slice(0, 10)}...{status.address.slice(-8)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyAddress(status.address)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-400">
                      {status.timestamp && new Date(status.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-white font-semibold">{status.amount} FLB</div>
                    <div className={`text-xs capitalize ${getStatusColor(status.status)}`}>{status.status}</div>
                  </div>

                  {status.txHash && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openTxOnExplorer(status.txHash!)}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contract Information */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Contract Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">FLB Token Contract:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-gray-800 px-2 py-1 rounded text-white">
                  {FLB_TOKEN_ADDRESSES.CELO_ALFAJORES.slice(0, 10)}...
                  {FLB_TOKEN_ADDRESSES.CELO_ALFAJORES.slice(-8)}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open(`https://alfajores.celoscan.io/address/${FLB_TOKEN_ADDRESSES.CELO_ALFAJORES}`, "_blank")
                  }
                  className="h-6 w-6 p-0"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network:</span>
              <Badge className="bg-blue-600">Celo Alfajores</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Supply:</span>
              <span className="text-white">{TESTNET_CONFIG.GENESIS_SUPPLY} FLB</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
