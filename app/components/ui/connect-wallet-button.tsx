"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Wallet, Copy, ExternalLink, LogOut, Coins, AlertCircle } from "lucide-react"
import { useWallet } from "@/app/providers/wallet-provider"
import { NetworkSwitcher } from "./network-switcher"
import { toast } from "@/app/hooks/use-toast"

export function ConnectWalletButton() {
  const { connected, address, balance, chainId, isConnecting, error, connectWallet, disconnect, requestFLBTokens } =
    useWallet()
  const [requesting, setRequesting] = useState(false)

  const handleConnect = async () => {
    try {
      const success = await connectWallet()
      if (success) {
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to your Celo wallet",
        })
      } else {
        throw new Error("Connection failed")
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleRequestTokens = async () => {
    setRequesting(true)
    try {
      await requestFLBTokens("100")
      toast({
        title: "Tokens Requested",
        description: "FLB tokens have been requested. Please check your balance.",
      })
    } catch (error: any) {
      toast({
        title: "Request Failed",
        description: error.message || "Failed to request FLB tokens. Please contact the team.",
        variant: "destructive",
      })
    } finally {
      setRequesting(false)
    }
  }

  const openBlockExplorer = () => {
    if (address) {
      const explorerUrl =
        chainId === 42220
          ? `https://celoscan.io/address/${address}`
          : `https://alfajores.celoscan.io/address/${address}`
      window.open(explorerUrl, "_blank")
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: string) => {
    const num = Number.parseFloat(bal)
    return num > 0 ? num.toFixed(4) : "0"
  }

  const isCeloNetwork = chainId === 42220 || chainId === 44787

  if (!connected) {
    return (
      <div className="space-y-2">
        <Button onClick={handleConnect} disabled={isConnecting} className="gap-2 w-full" size="lg">
          <Wallet className="h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>

        {error && (
          <div className="text-sm text-red-400 bg-red-950/30 p-2 rounded border border-red-500/30 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <NetworkSwitcher />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Wallet className="h-4 w-4" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{address ? formatAddress(address) : "Connected"}</span>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>{formatBalance(balance.celo)} CELO</span>
                <span>•</span>
                <span>{formatBalance(balance.flb)} FLB</span>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Wallet Address</span>
              <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="h-6 w-6 p-0">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <code className="text-xs bg-muted p-2 rounded block break-all">{address}</code>
          </div>

          <DropdownMenuSeparator />

          <div className="p-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">CELO Balance:</span>
                <Badge variant="outline">{formatBalance(balance.celo)} CELO</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">FLB Balance:</span>
                <Badge variant="outline">{formatBalance(balance.flb)} FLB</Badge>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />

          {isCeloNetwork && (
            <DropdownMenuItem onClick={handleRequestTokens} disabled={requesting}>
              <Coins className="h-4 w-4 mr-2" />
              {requesting ? "Requesting..." : "Request Test FLB"}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={openBlockExplorer}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
