"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { config } from "@/lib/config"
import { AlertTriangle } from "lucide-react"

type WalletState = {
  connected: boolean
  address: string | null
  chainId: number | null
  balance: string | null
}

export function WalletConnector() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    chainId: null,
    balance: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          // Get connected accounts
          const accounts = await window.ethereum.request({ method: "eth_accounts" })

          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: "eth_chainId" })
            const balance = await window.ethereum.request({
              method: "eth_getBalance",
              params: [accounts[0], "latest"],
            })

            setWallet({
              connected: true,
              address: accounts[0],
              chainId: Number.parseInt(chainId, 16),
              balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
            })

            // Emit wallet connected event
            const event = new CustomEvent("walletConnected", {
              detail: { address: accounts[0] },
            })
            window.dispatchEvent(event)
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  // Handle account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // Disconnected
          setWallet({
            connected: false,
            address: null,
            chainId: null,
            balance: null,
          })

          // Emit wallet disconnected event
          const event = new CustomEvent("walletDisconnected")
          window.dispatchEvent(event)
        } else {
          // Account changed
          setWallet((prev) => ({
            ...prev,
            connected: true,
            address: accounts[0],
          }))

          // Emit wallet connected event
          const event = new CustomEvent("walletConnected", {
            detail: { address: accounts[0] },
          })
          window.dispatchEvent(event)
        }
      }

      const handleChainChanged = (chainId: string) => {
        window.location.reload()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const connectWallet = async () => {
    setError(null)

    if (typeof window === "undefined" || !window.ethereum) {
      setError("Please install a Celo-compatible wallet like Valora or MetaMask")
      return false
    }

    setIsLoading(true)
    try {
      // Request accounts - this will open the wallet UI
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts",
        params: [{ eth_chainId: "0xaef3" }] // Alfajores chain ID
      })

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found")
      }

      // Get chain ID
      const chainId = await window.ethereum.request({ method: "eth_chainId" })

      // Check if on Celo network (Mainnet or Alfajores)
      const isCeloNetwork = ["0xaef3", "0xa4ec"].includes(chainId)
      
      if (!isCeloNetwork) {
        try {
          // Try to switch to Celo Alfajores
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaef3" }], // Alfajores
          })
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0xaef3",
                    chainName: "Celo Alfajores Testnet",
                    nativeCurrency: {
                      name: "CELO",
                      symbol: "CELO",
                      decimals: 18,
                    },
                    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
                    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
                  },
                ],
              })
            } catch (addError) {
              throw new Error("Failed to add Celo network to wallet")
            }
          } else {
            throw switchError
          }
        }
      }

      // Get balance
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      setWallet({
        connected: true,
        address: accounts[0],
        chainId: Number.parseInt(chainId, 16),
        balance: (Number.parseInt(balance, 16) / 1e18).toFixed(4),
      })

      // Emit wallet connected event
      const event = new CustomEvent("walletConnected", {
        detail: { address: accounts[0] },
      })
      window.dispatchEvent(event)
      
      return true
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      setError(error.message || "Failed to connect wallet")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setWallet({
      connected: false,
      address: null,
      chainId: null,
      balance: null,
    })

    // Emit wallet disconnected event
    const event = new CustomEvent("walletDisconnected")
    window.dispatchEvent(event)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined"
  const hasEthereum = isBrowser && !!window.ethereum

  return (
    <div className="flex flex-col items-center gap-2">
      {wallet.connected ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flame-card p-4 flex flex-col items-center gap-2">
            <p className="text-sm text-white">Connected: {formatAddress(wallet.address!)}</p>
            <p className="text-sm text-white">Balance: {wallet.balance} CELO</p>
            <Button onClick={disconnectWallet} variant="outline" size="sm" className="flame-button">
              Disconnect
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button onClick={connectWallet} disabled={isLoading || !hasEthereum} className="flame-button ember-pulse">
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>

          {error && (
            <div className="bg-red-900/30 p-2 rounded text-xs text-red-300 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
              {error}
            </div>
          )}

          {!hasEthereum && (
            <div className="bg-yellow-900/30 p-2 rounded text-xs text-yellow-300 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
              Please install a Celo-compatible wallet like Valora or MetaMask
            </div>
          )}
        </div>
      )}
    </div>
  )
}
