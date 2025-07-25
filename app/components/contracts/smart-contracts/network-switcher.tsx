"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Badge } from "@/app/components/ui/badge"
import { ChevronDown, WifiOff } from "lucide-react"
import { useWallet } from "@/app/components/smart-contracts/wallet-provider"
import { CELO_NETWORKS } from "@/app/components/smart-contracts/celo-wallet"

export function NetworkSwitcher() {
  const { chainId, connected, switchNetwork } = useWallet()
  const [switching, setSwitching] = useState(false)

  const getCurrentNetwork = () => {
    if (!chainId) return null
    return Object.values(CELO_NETWORKS).find((network) => network.chainId === chainId)
  }

  const handleNetworkSwitch = async (network: "mainnet" | "alfajores") => {
    setSwitching(true)
    try {
      await switchNetwork(network)
    } catch (error) {
      console.error("Failed to switch network:", error)
    } finally {
      setSwitching(false)
    }
  }

  const currentNetwork = getCurrentNetwork()
  const isCeloNetwork = chainId === 42220 || chainId === 44787

  if (!connected) {
    return (
      <Badge variant="outline" className="gap-1">
        <WifiOff className="h-3 w-3" />
        Not Connected
      </Badge>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`gap-2 ${isCeloNetwork ? "border-green-500/50" : "border-red-500/50"}`}
          disabled={switching}
        >
          <div className={`h-2 w-2 rounded-full ${isCeloNetwork ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-xs">{switching ? "Switching..." : currentNetwork?.name || "Unknown"}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleNetworkSwitch("alfajores")} disabled={switching || chainId === 44787}>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${chainId === 44787 ? "bg-green-500" : "bg-gray-400"}`} />
            <span>Celo Alfajores</span>
            {chainId === 44787 && (
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            )}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleNetworkSwitch("mainnet")} disabled={switching || chainId === 42220}>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${chainId === 42220 ? "bg-green-500" : "bg-gray-400"}`} />
            <span>Celo Mainnet</span>
            {chainId === 42220 && (
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
