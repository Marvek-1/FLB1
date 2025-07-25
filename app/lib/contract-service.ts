import { ethers } from "ethers"
import { FLB_TOKEN_ADDRESSES, DONATION_ROUTER_ADDRESSES } from "./constants"
import FLBTokenABI from "@/app/contracts/FLBToken.json"
import DonationRouterABI from "@/app/contracts/DonationRouter.json"

export interface DonationResult {
  hash: string
  transaction: ethers.providers.TransactionResponse
}

export async function donate(signer: ethers.Signer, recipientAddress: string, amount: string): Promise<DonationResult> {
  try {
    const network = await signer.provider?.getNetwork()
    if (!network) throw new Error("No network found")

    let donationRouterAddress: string
    if (network.chainId === 42220) {
      donationRouterAddress = DONATION_ROUTER_ADDRESSES.CELO_MAINNET
    } else if (network.chainId === 44787) {
      donationRouterAddress = DONATION_ROUTER_ADDRESSES.CELO_ALFAJORES
    } else {
      throw new Error("Unsupported network")
    }

    if (donationRouterAddress === "0x0000000000000000000000000000000000000000") {
      // Fallback to direct transfer for testing
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(amount),
      })

      return {
        hash: tx.hash,
        transaction: tx,
      }
    }

    const donationRouter = new ethers.Contract(donationRouterAddress, DonationRouterABI, signer)

    const tx = await donationRouter.donate(recipientAddress, {
      value: ethers.utils.parseEther(amount),
    })

    return {
      hash: tx.hash,
      transaction: tx,
    }
  } catch (error) {
    console.error("Donation failed:", error)
    throw error
  }
}

export async function mintFLBTokens(signer: ethers.Signer, amount: string): Promise<DonationResult> {
  try {
    const network = await signer.provider?.getNetwork()
    if (!network) throw new Error("No network found")

    let donationRouterAddress: string
    if (network.chainId === 42220) {
      donationRouterAddress = DONATION_ROUTER_ADDRESSES.CELO_MAINNET
    } else if (network.chainId === 44787) {
      donationRouterAddress = DONATION_ROUTER_ADDRESSES.CELO_ALFAJORES
    } else {
      throw new Error("Unsupported network")
    }

    if (donationRouterAddress === "0x0000000000000000000000000000000000000000") {
      throw new Error("FLB token contract not deployed on this network")
    }

    const donationRouter = new ethers.Contract(donationRouterAddress, DonationRouterABI, signer)

    const tx = await donationRouter.mintFLBToken({
      value: ethers.utils.parseEther(amount),
    })

    return {
      hash: tx.hash,
      transaction: tx,
    }
  } catch (error) {
    console.error("FLB minting failed:", error)
    throw error
  }
}

export async function getFLBBalance(address: string, provider: ethers.providers.Provider): Promise<string> {
  try {
    const network = await provider.getNetwork()

    let tokenAddress: string
    if (network.chainId === 42220) {
      tokenAddress = FLB_TOKEN_ADDRESSES.CELO_MAINNET
    } else if (network.chainId === 44787) {
      tokenAddress = FLB_TOKEN_ADDRESSES.CELO_ALFAJORES
    } else {
      return "0"
    }

    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      return "0" // Contract not deployed
    }

    const flbToken = new ethers.Contract(tokenAddress, FLBTokenABI, provider)
    const balance = await flbToken.balanceOf(address)

    return ethers.utils.formatEther(balance)
  } catch (error) {
    console.error("Failed to get FLB balance:", error)
    return "0"
  }
}

export async function transferFLBTokens(
  signer: ethers.Signer,
  toAddress: string,
  amount: string,
): Promise<DonationResult> {
  try {
    const network = await signer.provider?.getNetwork()
    if (!network) throw new Error("No network found")

    let tokenAddress: string
    if (network.chainId === 42220) {
      tokenAddress = FLB_TOKEN_ADDRESSES.CELO_MAINNET
    } else if (network.chainId === 44787) {
      tokenAddress = FLB_TOKEN_ADDRESSES.CELO_ALFAJORES
    } else {
      throw new Error("Unsupported network")
    }

    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      throw new Error("FLB token contract not deployed on this network")
    }

    const flbToken = new ethers.Contract(tokenAddress, FLBTokenABI, signer)
    const amountWei = ethers.utils.parseEther(amount)

    const tx = await flbToken.transfer(toAddress, amountWei)

    return {
      hash: tx.hash,
      transaction: tx,
    }
  } catch (error) {
    console.error("FLB transfer failed:", error)
    throw error
  }
}

// Function to check if address needs identity registration (based on your contract logic)
export async function checkIdentityRegistration(
  address: string,
  provider: ethers.providers.Provider,
): Promise<boolean> {
  try {
    const network = await provider.getNetwork()

    if (network.chainId !== 44787) {
      return false // Only check on Alfajores for now
    }

    const tokenAddress = FLB_TOKEN_ADDRESSES.CELO_ALFAJORES

    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      return false
    }

    // This would check if the address is registered in your identity system
    // For now, we'll assume all addresses need registration
    return false
  } catch (error) {
    console.error("Failed to check identity registration:", error)
    return false
  }
}
