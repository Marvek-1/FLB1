import { ethers } from "ethers"
import { FLB_TOKEN_ADDRESSES } from "./constants"

// Celo network configuration
export const CELO_NETWORKS = {
  mainnet: {
    chainId: 42220,
    chainIdHex: "0xa4ec",
    name: "Celo Mainnet",
    rpcUrl: "https://forno.celo.org",
    blockExplorer: "https://celoscan.io",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
  },
  alfajores: {
    chainId: 44787,
    chainIdHex: "0xaef3",
    name: "Celo Alfajores Testnet",
    rpcUrl: "https://alfajores-forno.celo-testnet.org",
    blockExplorer: "https://alfajores.celoscan.io",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
  },
}

export interface WalletState {
  connected: boolean
  address: string | null
  chainId: number | null
  balance: {
    celo: string
    flb: string
  }
  provider: ethers.providers.Web3Provider | null
  signer: ethers.Signer | null
  isConnecting: boolean
  error: string | null
}

export class CeloWalletManager {
  private state: WalletState = {
    connected: false,
    address: null,
    chainId: null,
    balance: { celo: "0", flb: "0" },
    provider: null,
    signer: null,
    isConnecting: false,
    error: null,
  }

  private listeners: ((state: WalletState) => void)[] = []
  private initialized = false

  constructor() {
    if (typeof window !== "undefined") {
      this.initialize()
    }
  }

  private async initialize() {
    if (this.initialized) return
    this.initialized = true

    if (document.readyState === "loading") {
      await new Promise((resolve) => {
        document.addEventListener("DOMContentLoaded", resolve)
      })
    }

    await new Promise((resolve) => setTimeout(resolve, 100))

    this.initializeEventListeners()
    await this.checkExistingConnection()
  }

  private async checkExistingConnection() {
    if (!this.isWalletAvailable()) return

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      })

      if (accounts && accounts.length > 0) {
        await this.reconnectWallet(accounts[0])
      }
    } catch (error) {
      console.log("No existing connection found:", error)
    }
  }

  private async reconnectWallet(account: string) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const network = await provider.getNetwork()

      this.state = {
        ...this.state,
        connected: true,
        address: account,
        chainId: network.chainId,
        provider,
        signer,
        error: null,
      }

      await this.updateBalance()
      this.notifyListeners()
    } catch (error) {
      console.error("Failed to reconnect wallet:", error)
    }
  }

  private isWalletAvailable(): boolean {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  }

  private initializeEventListeners() {
    if (!this.isWalletAvailable()) return

    try {
      window.ethereum.on("accountsChanged", this.handleAccountsChanged.bind(this))
      window.ethereum.on("chainChanged", this.handleChainChanged.bind(this))
      window.ethereum.on("disconnect", this.handleDisconnect.bind(this))
    } catch (error) {
      console.error("Failed to initialize event listeners:", error)
    }
  }

  private handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      this.disconnect()
    } else if (accounts[0] !== this.state.address) {
      this.state.address = accounts[0]
      this.updateBalance()
      this.notifyListeners()
    }
  }

  private handleChainChanged(chainId: string) {
    const newChainId = Number.parseInt(chainId, 16)
    if (newChainId !== this.state.chainId) {
      this.state.chainId = newChainId
      this.updateBalance()
      this.notifyListeners()
    }
  }

  private handleDisconnect() {
    this.disconnect()
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener({ ...this.state })
      } catch (error) {
        console.error("Error in wallet state listener:", error)
      }
    })
  }

  public subscribe(listener: (state: WalletState) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  public async connectWallet(): Promise<boolean> {
    if (this.state.isConnecting) return false

    this.state.isConnecting = true
    this.state.error = null
    this.notifyListeners()

    try {
      if (!this.isWalletAvailable()) {
        throw new Error("No wallet found. Please install MetaMask, Valora, or another Web3 wallet.")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your wallet.")
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const network = await provider.getNetwork()

      this.state = {
        ...this.state,
        connected: true,
        address: accounts[0],
        chainId: network.chainId,
        provider,
        signer,
        isConnecting: false,
        error: null,
      }

      await this.switchToCeloNetwork()
      await this.updateBalance()

      this.notifyListeners()
      return true
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)
      this.state.isConnecting = false
      this.state.error = error.message || "Failed to connect wallet"
      this.notifyListeners()
      return false
    }
  }

  public async switchToCeloNetwork(network: "mainnet" | "alfajores" = "alfajores"): Promise<boolean> {
    if (!this.isWalletAvailable()) return false

    try {
      const targetNetwork = CELO_NETWORKS[network]

      if (this.state.chainId === targetNetwork.chainId) {
        return true
      }

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: targetNetwork.chainIdHex }],
        })
        return true
      } catch (switchError: any) {
        if (switchError.code === 4902) {
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
          return true
        }
        throw switchError
      }
    } catch (error) {
      console.error("Failed to switch network:", error)
      return false
    }
  }

  public async updateBalance(): Promise<void> {
    if (!this.state.provider || !this.state.address) return

    try {
      const celoBalance = await this.state.provider.getBalance(this.state.address)
      this.state.balance.celo = ethers.utils.formatEther(celoBalance)

      const flbBalance = await this.getFLBBalance()
      this.state.balance.flb = flbBalance

      this.notifyListeners()
    } catch (error) {
      console.error("Failed to update balance:", error)
    }
  }

  private async getFLBBalance(): Promise<string> {
    if (!this.state.provider || !this.state.address) return "0"

    try {
      const network = await this.state.provider.getNetwork()

      let tokenAddress: string
      if (network.chainId === 42220) {
        tokenAddress = FLB_TOKEN_ADDRESSES.CELO_MAINNET
      } else if (network.chainId === 44787) {
        tokenAddress = FLB_TOKEN_ADDRESSES.CELO_ALFAJORES
      } else {
        return "0"
      }

      if (tokenAddress === "0x0000000000000000000000000000000000000000") {
        return "0"
      }

      const contract = new ethers.Contract(
        tokenAddress,
        ["function balanceOf(address) view returns (uint256)"],
        this.state.provider,
      )

      const balance = await contract.balanceOf(this.state.address)
      return ethers.utils.formatEther(balance)
    } catch (error) {
      console.error("Failed to get FLB balance:", error)
      return "0"
    }
  }

  public disconnect(): void {
    this.state = {
      connected: false,
      address: null,
      chainId: null,
      balance: { celo: "0", flb: "0" },
      provider: null,
      signer: null,
      isConnecting: false,
      error: null,
    }
    this.notifyListeners()
  }

  public getState(): WalletState {
    return { ...this.state }
  }

  public async sendTransaction(to: string, value: string, data?: string): Promise<string> {
    if (!this.state.signer) {
      throw new Error("Wallet not connected")
    }

    try {
      const tx = await this.state.signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(value),
        data: data || "0x",
      })

      return tx.hash
    } catch (error) {
      console.error("Transaction failed:", error)
      throw error
    }
  }

  public async mintFLBTokens(amount = "100"): Promise<string> {
    if (!this.state.signer || !this.state.address) {
      throw new Error("Wallet not connected")
    }

    try {
      const network = await this.state.provider?.getNetwork()
      if (!network || network.chainId !== 44787) {
        throw new Error("Please switch to Celo Alfajores testnet")
      }

      const tokenAddress = FLB_TOKEN_ADDRESSES.CELO_ALFAJORES

      // For now, this is a placeholder - actual minting would require contract owner
      throw new Error(
        "Minting functionality requires validator registration. Please use the validator onboarding flow.",
      )
    } catch (error) {
      console.error("Failed to mint FLB tokens:", error)
      throw error
    }
  }
}

let celoWalletManager: CeloWalletManager | null = null

export function getCeloWalletManager(): CeloWalletManager {
  if (typeof window === "undefined") {
    return {
      getState: () => ({
        connected: false,
        address: null,
        chainId: null,
        balance: { celo: "0", flb: "0" },
        provider: null,
        signer: null,
        isConnecting: false,
        error: null,
      }),
      subscribe: () => () => {},
      connectWallet: async () => false,
      switchToCeloNetwork: async () => false,
      updateBalance: async () => {},
      disconnect: () => {},
      sendTransaction: async () => {
        throw new Error("Not available on server")
      },
      mintFLBTokens: async () => {
        throw new Error("Not available on server")
      },
    } as any
  }

  if (!celoWalletManager) {
    celoWalletManager = new CeloWalletManager()
  }

  return celoWalletManager
}
