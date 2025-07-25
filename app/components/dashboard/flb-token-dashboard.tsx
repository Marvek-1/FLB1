"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Badge } from "@/app/components/ui/badge"
import { Coins, Send, RefreshCw, ExternalLink, AlertCircle } from "lucide-react"
import { useWallet } from "@/app/components/smart-contracts/wallet-provider"
import { transferFLBTokens } from "@/app/lib/contract-service"
import { toast } from "@/app/hooks/use-toast"
import { FLB_TOKEN_ADDRESSES } from "@/app/lib/constants"

export function FLBTokenDashboard() {
  const { connected, address, balance, chainId, signer, updateBalance } = useWallet()
  const [transferTo, setTransferTo] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [transferring, setTransferring] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const isOnAlfajores = chainId === 44787
  const contractAddress = isOnAlfajores ? FLB_TOKEN_ADDRESSES.CELO_ALFAJORES : null

  const handleTransfer = async () => {
    if (!signer || !transferTo || !transferAmount) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid address and amount",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(transferAmount) > Number.parseFloat(balance.flb)) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough FLB tokens",
        variant: "destructive",
      })
      return
    }

    setTransferring(true)
    try {
      const result = await transferFLBTokens(signer, transferTo, transferAmount)

      toast({
        title: "Transfer Initiated",
        description: `Transaction hash: ${result.hash.slice(0, 10)}...`,
      })

      // Wait for transaction confirmation
      await result.transaction.wait()

      toast({
        title: "Transfer Successful",
        description: `Sent ${transferAmount} FLB to ${transferTo.slice(0, 10)}...`,
      })

      // Reset form and update balance
      setTransferTo("")
      setTransferAmount("")
      await updateBalance()
    } catch (error: any) {
      console.error("Transfer failed:", error)
      toast({
        title: "Transfer Failed",
        description: error.message || "Failed to transfer FLB tokens",
        variant: "destructive",
      })
    } finally {
      setTransferring(false)
    }
  }

  const handleRefreshBalance = async () => {
    setRefreshing(true)
    try {
      await updateBalance()
      toast({
        title: "Balance Updated",
        description: "Your token balance has been refreshed",
      })
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to update balance",
        variant: "destructive",
      })
    } finally {
      setRefreshing(false)
    }
  }

  const openContractOnExplorer = () => {
    if (contractAddress) {
      window.open(`https://alfajores.celoscan.io/address/${contractAddress}`, "_blank")
    }
  }

  if (!connected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            FLB Token Dashboard
          </CardTitle>
          <CardDescription>Connect your wallet to view and manage your FLB tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Please connect your wallet to continue</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              FLB Token Balance
            </div>
            <Button variant="outline" size="sm" onClick={handleRefreshBalance} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
          </CardTitle>
          <CardDescription>Your current FLB token holdings on Celo Alfajores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{Number.parseFloat(balance.flb).toFixed(4)}</div>
              <div className="text-muted-foreground">FLB Tokens</div>
            </div>

            {!isOnAlfajores && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  Switch to Celo Alfajores testnet to interact with FLB tokens
                </span>
              </div>
            )}

            {contractAddress && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Contract Address:</span>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    {contractAddress.slice(0, 10)}...{contractAddress.slice(-8)}
                  </code>
                  <Button variant="ghost" size="sm" onClick={openContractOnExplorer} className="h-6 w-6 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transfer Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Transfer FLB Tokens
          </CardTitle>
          <CardDescription>Send FLB tokens to another address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transfer-to">Recipient Address</Label>
              <Input
                id="transfer-to"
                placeholder="0x..."
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                disabled={!isOnAlfajores}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transfer-amount">Amount (FLB)</Label>
              <Input
                id="transfer-amount"
                type="number"
                placeholder="0.0"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                disabled={!isOnAlfajores}
              />
              <div className="text-xs text-muted-foreground">
                Available: {Number.parseFloat(balance.flb).toFixed(4)} FLB
              </div>
            </div>

            <Button
              onClick={handleTransfer}
              disabled={!isOnAlfajores || transferring || !transferTo || !transferAmount}
              className="w-full"
            >
              {transferring ? "Transferring..." : "Transfer FLB"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Network Info */}
      <Card>
        <CardHeader>
          <CardTitle>Network Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Network:</span>
              <Badge variant={isOnAlfajores ? "default" : "secondary"}>
                {isOnAlfajores ? "Celo Alfajores" : "Other Network"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Chain ID:</span>
              <span className="font-mono">{chainId}</span>
            </div>
            <div className="flex justify-between">
              <span>FLB Contract:</span>
              <span className="font-mono text-sm">{contractAddress ? "Deployed" : "Not Available"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
