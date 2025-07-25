"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getCeloWalletManager, type WalletState } from "@/lib/celo-wallet"

interface WalletContextType extends WalletState {
  connectWallet: () => Promise<boolean>
  disconnect: () => void
  switchNetwork: (network: "mainnet" | "alfajores") => Promise<boolean>
  updateBalance: () => Promise<void>
  mintFLBTokens: (amount?: string) => Promise<string>
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>(() => ({
    connected: false,
    address: null,
    chainId: null,
    balance: { celo: "0", flb: "0" },
    provider: null,
    signer: null,
    isConnecting: false,
    error: null,
  }))

  const [walletManager] = useState(() => getCeloWalletManager())

  useEffect(() => {
    if (typeof window === "undefined") return

    setWalletState(walletManager.getState())

    const unsubscribe = walletManager.subscribe(setWalletState)

    return unsubscribe
  }, [walletManager])

  const contextValue: WalletContextType = {
    ...walletState,
    connectWallet: walletManager.connectWallet.bind(walletManager),
    disconnect: walletManager.disconnect.bind(walletManager),
    switchNetwork: walletManager.switchToCeloNetwork.bind(walletManager),
    updateBalance: walletManager.updateBalance.bind(walletManager),
    mintFLBTokens: walletManager.mintFLBTokens.bind(walletManager),
  }

  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export const useWalletContext = useWallet
