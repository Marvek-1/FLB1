"use client"

import type React from "react" // Ensure React is imported if JSX is used

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, ExternalLink, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useWalletContext } from "@/providers/wallet-provider"
// Assuming donate function is correctly defined in contract-service
import { donate } from "@/lib/contract-service"
import { MIN_DONATION_AMOUNT, NETWORKS, TransactionStatus } from "@/lib/constants"
import { ethers } from "ethers"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
// Assuming HealthcareWorker type is defined
import type { HealthcareWorker } from "@/lib/types/healthcare-worker"

// Mock healthcare workers data - in production, this would come from your backend or contract
const HEALTHCARE_WORKERS: HealthcareWorker[] = [
  {
    id: "1", // Added id for key prop
    address: "0xf39Fd6e51aad88F6F4ce6aB8829539c652746fF0",
    name: "Dr. Alice Smith",
    credentials: "Cardiologist, Board Certified",
    isVerified: true,
    // Add other required fields from HealthcareWorker type if necessary
    location: { name: "City Hospital", countryCode: "US" },
    profileImage: "/placeholder.svg?width=40&height=40",
    impactScore: 85,
    distributionPercentage: 30,
  },
  {
    id: "2",
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    name: "Dr. Bob Johnson",
    credentials: "General Practitioner, Rural Health Specialist",
    isVerified: true,
    location: { name: "Rural Clinic", countryCode: "CA" },
    profileImage: "/placeholder.svg?width=40&height=40",
    impactScore: 90,
    distributionPercentage: 40,
  },
  {
    id: "3",
    address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    name: "Nurse Carol Williams",
    credentials: "Registered Nurse, Community Health",
    isVerified: true,
    location: { name: "Community Center", countryCode: "GB" },
    profileImage: "/placeholder.svg?width=40&height=40",
    impactScore: 75,
    distributionPercentage: 30,
  },
]

export default function DonationForm() {
  const { address, isConnected, signer, connectWallet, chainId } = useWalletContext() // Removed provider as signer is used
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [selectedRecipient, setSelectedRecipient] = useState<HealthcareWorker | null>(HEALTHCARE_WORKERS[0])
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.NONE)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(true)

  // Check if on the correct network
  useEffect(() => {
    if (chainId) {
      // Check if the current chainId is in our supported networks
      const targetNetwork = NETWORKS.BNB_CHAIN // Assuming BNB_CHAIN is the target
      const isSupported = chainId === targetNetwork.chainId
      setIsCorrectNetwork(isSupported)
    }
  }, [chainId])

  // Handle network switch
  const switchNetwork = async () => {
    if (!window.ethereum) return

    const targetNetwork = NETWORKS.BNB_CHAIN // Assuming BNB_CHAIN is the target

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetNetwork.chainIdHex }],
      })
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
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
      console.error("Error switching network:", error)
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

  // Handle donation
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected || !signer) {
      try {
        await connectWallet()
        // After connectWallet, context values (isConnected, signer) will update,
        // and the user can try submitting again.
        return
      } catch (err) {
        setError("Failed to connect wallet. Please try again.")
        return
      }
    }

    if (!isCorrectNetwork) {
      // setError("Please switch to the correct network (BNB Smart Chain) to make a donation.");
      // No need to set error here as the specific alert for network switch is shown
      return
    }

    if (!selectedRecipient) {
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
      // Assuming donate function takes signer, recipientAddress, amount
      const result = await donate(signer, selectedRecipient.address, amount)
      setTransactionHash(result.hash)

      // Wait for transaction confirmation
      const receipt = await result.transaction.wait()

      if (receipt && receipt.status === 1) {
        setTransactionStatus(TransactionStatus.SUCCESS)

        // Store message in database if needed (off-chain)
        if (message) {
          try {
            await fetch("/api/donations/message", {
              // Ensure this API route exists
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                transactionHash: result.hash,
                message,
                senderAddress: address,
                recipientAddress: selectedRecipient.address,
              }),
            })
          } catch (fetchError) {
            console.error("Error storing message:", fetchError)
            // Non-critical error, don't show to user
          }
        }
      } else {
        setTransactionStatus(TransactionStatus.ERROR)
        setError("Transaction failed. Please check your wallet and try again.")
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
      <div className="w-full max-w-md mx-auto">
        <Card className="text-center p-6 rounded-lg border border-green-500/30 bg-green-950/30">
          <CardContent className="pt-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-300 mb-2">Donation Successful!</h3>
            <p className="text-green-100/70 mb-4">
              Your donation to {selectedRecipient?.name} has been processed successfully.
            </p>

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

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleDonate} className="space-y-4">
        {error && (
          <Alert variant="destructive" className="bg-red-950/30 border-red-500/30 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isCorrectNetwork && isConnected && (
          <Alert className="bg-yellow-950/30 border-yellow-500/30 text-yellow-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wrong Network</AlertTitle>
            <AlertDescription>
              Please switch to {NETWORKS.BNB_CHAIN.name} to make a donation.
              <Button
                type="button" // Important: type="button" to prevent form submission
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

        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-blue-300 mb-1">
            Select Healthcare Worker
          </label>
          <select
            id="recipient"
            value={selectedRecipient?.address || ""}
            onChange={(e) => {
              const selected = HEALTHCARE_WORKERS.find((worker) => worker.address === e.target.value)
              setSelectedRecipient(selected || null)
            }}
            className="w-full rounded-md bg-blue-950/30 border-blue-500/30 text-blue-100 p-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={transactionStatus === TransactionStatus.PENDING}
          >
            {HEALTHCARE_WORKERS.map((worker) => (
              <option key={worker.id} value={worker.address}>
                {worker.name} - {worker.credentials}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-blue-300 mb-1">
            Donation Amount (BNB)
          </label>
          <Input
            id="amount"
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
          <p className="text-xs text-blue-100/70 mt-1">Minimum donation: {MIN_DONATION_AMOUNT} BNB</p>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-blue-300 mb-1">
            Message (Optional)
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-blue-950/30 border-blue-500/30 text-blue-100"
            placeholder="Leave a message of support..."
            rows={3}
            disabled={transactionStatus === TransactionStatus.PENDING}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={
            transactionStatus === TransactionStatus.PENDING || (isConnected && !isCorrectNetwork) // Disable if connected but on wrong network
          }
        >
          {transactionStatus === TransactionStatus.PENDING ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : !isConnected ? (
            <>
              <Heart className="mr-2 h-5 w-5" /> Connect Wallet to Donate
            </>
          ) : (
            <>
              <Heart className="mr-2 h-5 w-5" /> Donate Now
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
