"use client"

import type React from "react" // Ensure React is imported

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import {
  Heart,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Loader2,
  Users,
  ArrowRight,
  ChevronLeft,
  Info,
} from "lucide-react"
import { useWalletContext } from "@/app/components/smart-contracts/wallet-provider"
// Assuming these services and types are correctly defined
import { donate } from "@/app/lib/contract-service"
import { distributeDonation } from "@/app/lib/distribution-service"
import { MIN_DONATION_AMOUNT, NETWORKS, TransactionStatus } from "@/app/lib/constants"
import { ethers } from "ethers"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs"
import { getHealthcareWorkersWithDistribution } from "@/app/lib/mock-healthcare-data"
import type { HealthcareWorker } from "@/app/lib/types/healthcare-worker"
import { HealthcareWorkersGrid } from "@/app/components/healthcare-workers-grid" // Add Conponents
import { Progress } from "@/app/components/ui/progress"

export default function EnhancedDonationForm() {
  const { address, isConnected, signer, connectWallet, chainId } = useWalletContext() // Removed provider
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [donationType, setDonationType] = useState<"direct" | "distributed">("distributed")
  const [selectedWorker, setSelectedWorker] = useState<HealthcareWorker | null>(null)
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.NONE)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(true)
  const [step, setStep] = useState<"select" | "confirm">("select")
  const [distributionPreview, setDistributionPreview] = useState<Record<string, number>>({})
  const [workers, setWorkers] = useState<HealthcareWorker[]>([])

  // Load healthcare workers with distribution scores
  useEffect(() => {
    try {
      const workersWithDistribution = getHealthcareWorkersWithDistribution()
      setWorkers(workersWithDistribution)
    } catch (error) {
      console.error("Error loading healthcare workers:", error)
      // Optionally set an error state to inform the user
    }
  }, [])

  // Check if on the correct network
  useEffect(() => {
    if (chainId) {
      const targetNetwork = NETWORKS.BNB_CHAIN // Assuming BNB_CHAIN is the target
      const isSupported = chainId === targetNetwork.chainId
      setIsCorrectNetwork(isSupported)
    }
  }, [chainId])

  // Calculate distribution preview when amount changes
  useEffect(() => {
    if (donationType === "distributed" && amount && isValidAmount() && workers.length > 0) {
      try {
        const amountValue = Number.parseFloat(amount)
        const distribution = distributeDonation(amountValue, workers)
        setDistributionPreview(distribution)
      } catch (err) {
        console.error("Error calculating distribution:", err)
        // Optionally set an error state
      }
    }
  }, [amount, workers, donationType])

  // Handle worker selection
  const handleSelectWorker = (worker: HealthcareWorker) => {
    setSelectedWorker(worker)
    setDonationType("direct") // Ensure donationType is set to direct
    setStep("confirm")
  }

  // Handle network switch
  const switchNetwork = async () => {
    if (!window.ethereum) return
    const targetNetwork = NETWORKS.BNB_CHAIN // Assuming BNB_CHAIN is the target
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetNetwork.chainIdHex }],
      })
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: targetNetwork.chainIdHex,
                chainName: targetNetwork.name,
                nativeCurrency: targetNetwork.nativeCurrency,
                rpcUrls: [targetNetwork.rpcUrl],
                blockExplorerUrls: [targetNetwork.blockExplorer],
              },
            ],
          })
        } catch (addError) {
          console.error("Error adding network:", addError)
        }
      }
      console.error("Error switching network:", switchError)
    }
  }

  // Validate donation amount
  const isValidAmount = () => {
    if (!amount) return false
    try {
      const amountBN = ethers.parseEther(amount)
      const minAmountBN = ethers.parseEther(MIN_DONATION_AMOUNT)
      return amountBN.gte(minAmountBN)
    } catch (error) {
      return false
    }
  }

  // Format BNB amount
  const formatBNB = (value: number) => {
    if (isNaN(value)) return "0.0000"
    return value.toFixed(value < 0.01 && value !== 0 ? 6 : 4)
  }

  // Handle donation
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected || !signer) {
      try {
        await connectWallet()
        return
      } catch (err) {
        setError("Failed to connect wallet. Please try again.")
        return
      }
    }

    if (!isCorrectNetwork) {
      // setError("Please switch to the correct network (BNB Smart Chain).");
      return
    }

    if (donationType === "direct" && !selectedWorker) {
      setError("Please select a healthcare worker to donate to.")
      return
    }

    if (!isValidAmount()) {
      setError(`Minimum donation amount is ${MIN_DONATION_AMOUNT} BNB.`)
      return
    }

    setError(null)
    setTransactionStatus(TransactionStatus.PENDING)

    try {
      let txHash: string
      if (donationType === "direct" && selectedWorker) {
        const result = await donate(signer, selectedWorker.address, amount)
        txHash = result.hash
        const receipt = await result.transaction.wait()
        if (!receipt || receipt.status !== 1) {
          throw new Error("Direct transaction failed or was reverted.")
        }
      } else {
        // Distributed donation
        // This part is simulated as per original code.
        // In a real app, this would call a contract function for distribution.
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate delay
        txHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
      }

      setTransactionHash(txHash)
      setTransactionStatus(TransactionStatus.SUCCESS)

      if (message && donationType === "direct" && selectedWorker) {
        // Only store message for direct donations for now
        try {
          await fetch("/api/donations/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionHash: txHash,
              message,
              senderAddress: address,
              recipientAddress: selectedWorker.address,
            }),
          })
        } catch (fetchError) {
          console.error("Error storing message:", fetchError)
        }
      }
    } catch (err: any) {
      console.error("Error donating:", err)
      setTransactionStatus(TransactionStatus.ERROR)
      setError(err.reason || err.message || "Failed to process donation. Please try again.")
    }
  }

  // Reset form
  const resetForm = () => {
    setAmount("")
    setMessage("")
    setTransactionStatus(TransactionStatus.NONE)
    setTransactionHash(null)
    setError(null)
    setStep("select")
    setSelectedWorker(null)
    setDonationType("distributed") // Reset to default tab
  }

  // Get transaction explorer URL
  const getExplorerUrl = () => {
    if (!transactionHash || !chainId) return ""
    const network = Object.values(NETWORKS).find((n) => n.chainId === chainId)
    if (!network || !network.blockExplorer) return ""
    return `${network.blockExplorer}/tx/${transactionHash}`
  }

  // Render success state
  if (transactionStatus === TransactionStatus.SUCCESS) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="text-center p-6 rounded-lg border border-green-500/30 bg-green-950/30">
          <CardContent className="pt-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-300 mb-2">Donation Successful!</h3>

            {donationType === "direct" && selectedWorker ? (
              <p className="text-green-100/70 mb-4">
                Your donation to {selectedWorker.name} has been processed successfully.
              </p>
            ) : (
              <div className="mb-4">
                <p className="text-green-100/70 mb-2">
                  Your donation has been distributed among healthcare workers based on their impact scores.
                </p>
                <div className="max-w-md mx-auto mt-4 p-4 rounded-lg border border-green-500/20 bg-green-950/20">
                  <h4 className="text-green-300 mb-2 flex items-center justify-center gap-1">
                    <Users className="h-4 w-4" /> Distribution Summary
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(distributionPreview).map(([workerAddress, distributedAmount]) => {
                      const worker = workers.find((w) => w.address === workerAddress)
                      if (!worker || distributedAmount === 0) return null
                      return (
                        <div key={workerAddress} className="flex justify-between text-sm">
                          <span className="text-green-100/70">{worker.name}</span>
                          <span className="text-green-300 font-medium">{formatBNB(distributedAmount)} BNB</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {transactionHash && (
              <div className="mb-4">
                <a
                  href={getExplorerUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1"
                >
                  View Transaction <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={resetForm}>
              Make Another Donation
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render confirmation step
  if (step === "confirm") {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="border-blue-500/30 bg-black/60 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-300">Confirm Donation</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep("select")}
                className="text-blue-300 hover:text-blue-100 hover:bg-blue-950/50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDonate} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-950/30 border-red-500/30 text-red-300">
                  <AlertCircle className="h-4 w-4" /> <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {!isCorrectNetwork && isConnected && (
                <Alert className="bg-yellow-950/30 border-yellow-500/30 text-yellow-300">
                  <AlertCircle className="h-4 w-4" /> <AlertTitle>Wrong Network</AlertTitle>
                  <AlertDescription>
                    Please switch to {NETWORKS.BNB_CHAIN.name} to make a donation.
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={switchNetwork}
                      className="mt-2 border-yellow-500/30 text-yellow-300 hover:bg-yellow-950/50"
                    >
                      Switch Network
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {donationType === "direct" && selectedWorker && (
                <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-950/20 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-blue-500/30">
                      <img
                        src={
                          selectedWorker.profileImage ||
                          `/placeholder.svg?width=40&height=40&text=${selectedWorker.name[0]}`
                        }
                        alt={selectedWorker.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-100">{selectedWorker.name}</h3>
                      <p className="text-sm text-blue-100/70">{selectedWorker.credentials}</p>
                    </div>
                  </div>
                  <p className="text-sm text-blue-100/70">{selectedWorker.location.name}</p>
                </div>
              )}

              {donationType === "distributed" && (
                <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-950/20 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    {" "}
                    <Users className="h-5 w-5 text-blue-400" />
                    <h3 className="font-bold text-blue-100">Distributed Donation</h3>
                  </div>
                  <p className="text-sm text-blue-100/70 mb-3">
                    Your donation will be distributed among verified healthcare workers based on impact scores.
                  </p>
                  {amount && isValidAmount() && Object.keys(distributionPreview).length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-blue-300">Distribution Preview:</h4>
                      {Object.entries(distributionPreview)
                        .slice(0, 3)
                        .map(([addr, amt]) => {
                          const worker = workers.find((w) => w.address === addr)
                          if (!worker || amt === 0) return null
                          return (
                            <div key={addr} className="flex justify-between text-sm">
                              <span className="text-blue-100/70">{worker.name}</span>
                              <span className="text-blue-300 font-medium">{formatBNB(amt)} BNB</span>
                            </div>
                          )
                        })}
                      {Object.keys(distributionPreview).filter((key) => distributionPreview[key] > 0).length > 3 && (
                        <div className="text-sm text-blue-100/70 text-center">
                          And{" "}
                          {Object.keys(distributionPreview).filter((key) => distributionPreview[key] > 0).length - 3}{" "}
                          more...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="amountConfirm" className="block text-sm font-medium text-blue-300 mb-1">
                  Donation Amount (BNB)
                </label>
                <Input
                  id="amountConfirm"
                  type="number"
                  step="0.001"
                  min={MIN_DONATION_AMOUNT}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="bg-blue-950/30 border-blue-500/30 text-blue-100"
                  placeholder={MIN_DONATION_AMOUNT}
                  disabled={transactionStatus === TransactionStatus.PENDING}
                />
                <p className="text-xs text-blue-100/70 mt-1">Minimum: {MIN_DONATION_AMOUNT} BNB</p>
              </div>
              <div>
                <label htmlFor="messageConfirm" className="block text-sm font-medium text-blue-300 mb-1">
                  Message (Optional)
                </label>
                <Textarea
                  id="messageConfirm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-blue-950/30 border-blue-500/30 text-blue-100"
                  placeholder="Leave a message..."
                  rows={3}
                  disabled={transactionStatus === TransactionStatus.PENDING}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={
                  transactionStatus === TransactionStatus.PENDING ||
                  (isConnected && !isCorrectNetwork) ||
                  !isValidAmount()
                }
              >
                {transactionStatus === TransactionStatus.PENDING ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : !isConnected ? (
                  <>
                    <Heart className="mr-2 h-5 w-5" /> Connect Wallet to Donate
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" /> Confirm Donation
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render selection step (default)
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-blue-500/30 bg-black/60 backdrop-blur-xl mb-8">
        <CardHeader>
          {" "}
          <CardTitle className="text-blue-300">Choose Donation Method</CardTitle>{" "}
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="distributed"
            value={donationType}
            onValueChange={(value) => setDonationType(value as "direct" | "distributed")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-blue-950/30 border border-blue-500/30">
              <TabsTrigger
                value="distributed"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4 mr-2" /> Distributed Impact
              </TabsTrigger>
              <TabsTrigger value="direct" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Heart className="h-4 w-4 mr-2" /> Direct Support
              </TabsTrigger>
            </TabsList>
            <TabsContent value="distributed" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg border border-blue-500/20 bg-blue-950/20">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    {" "}
                    <p className="text-blue-100 mb-1">Equitable Distribution System</p>
                    <p className="text-sm text-blue-100/70">
                      Your donation will be automatically distributed among verified healthcare workers based on impact
                      scores.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {workers.slice(0, 3).map((worker) => (
                    <div key={worker.id} className="p-3 rounded-lg border border-blue-500/20 bg-blue-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden border border-blue-500/30">
                          <img
                            src={worker.profileImage || `/placeholder.svg?width=32&height=32&text=${worker.name[0]}`}
                            alt={worker.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          {" "}
                          <p className="font-medium text-blue-100 text-sm">{worker.name}</p>
                          <p className="text-xs text-blue-100/70">{worker.location.name}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-blue-100/70">Impact Score</span>
                          <span className="text-blue-300 font-medium">
                            {worker.distributionPercentage?.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={worker.distributionPercentage} max={100} className="h-1.5 bg-blue-950/50" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() => {
                      setDonationType("distributed")
                      setStep("confirm")
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Continue with Distributed Donation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="direct" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg border border-blue-500/20 bg-blue-950/20">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    {" "}
                    <p className="text-blue-100 mb-1">Direct Support</p>
                    <p className="text-sm text-blue-100/70">Choose a specific healthcare worker to support directly.</p>
                  </div>
                </div>
                <div>
                  <p className="text-blue-100 mb-4">Select a healthcare worker to support:</p>
                  <HealthcareWorkersGrid workers={workers} onSelectWorker={handleSelectWorker} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
