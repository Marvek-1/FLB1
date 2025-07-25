import * as ethers from "ethers"
import { config, fetchContractConfig } from "./config"
import FLBTokencontracts from "@/contracts/FLBToken.json"
import HealthActorsRegistrycontracts from "@/contracts/HealthActorsRegistry.json"
import DonationRoutercontracts from "@/contracts/DonationRouter.json"

// Types
export type HealthActor = {
  name: string
  location: string
  credentials: string
  isVerified: boolean
}

// Cache for contract addresses
let contractConfig = { ...config }

// Initialize contract config
export const initializeContractConfig = async () => {
  if (typeof window !== "undefined") {
    contractConfig = await fetchContractConfig()
  }
  return contractConfig
}

// Get provider
export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum)
  }
  return null
}

// Get signer
export const getSigner = () => {
  const provider = getProvider()
  if (!provider) return null
  try {
    return provider.getSigner()
  } catch (error) {
    console.error("Error getting signer:", error)
    return null
  }
}

// Get FLB Token contract
export const getFLBTokenContract = async (withSigner = false) => {
  const provider = getProvider()
  if (!provider) return null

  // Ensure we have the latest contract config
  await initializeContractConfig()

  if (!contractConfig.tokenContract) return null

  try {
    const contract = new ethers.Contract(contractConfig.tokenContract, FLBTokencontracts, provider)

    if (withSigner) {
      const signer = getSigner()
      if (!signer) return null
      return contract.connect(signer)
    }

    return contract
  } catch (error) {
    console.error("Error getting FLB token contract:", error)
    return null
  }
}

// Get Health Actors Registry contract
export const getHealthRegistryContract = async (withSigner = false) => {
  const provider = getProvider()
  if (!provider) return null

  // Ensure we have the latest contract config
  await initializeContractConfig()

  if (!contractConfig.healthRegistry) return null

  try {
    const contract = new ethers.Contract(contractConfig.healthRegistry, HealthActorsRegistrycontracts, provider)

    if (withSigner) {
      const signer = getSigner()
      if (!signer) return null
      return contract.connect(signer)
    }

    return contract
  } catch (error) {
    console.error("Error getting health registry contract:", error)
    return null
  }
}

// Get Donation Router contract
export const getDonationRouterContract = async (withSigner = false) => {
  const provider = getProvider()
  if (!provider) return null

  // Ensure we have the latest contract config
  await initializeContractConfig()

  if (!contractConfig.donationRouter) return null

  try {
    const contract = new ethers.Contract(contractConfig.donationRouter, DonationRoutercontracts, provider)

    if (withSigner) {
      const signer = getSigner()
      if (!signer) return null
      return contract.connect(signer)
    }

    return contract
  } catch (error) {
    console.error("Error getting donation router contract:", error)
    return null
  }
}

// Check if an address is a verified health actor
export const isVerifiedHealthActor = async (address: string): Promise<boolean> => {
  try {
    const contract = await getHealthRegistryContract()
    if (!contract) throw new Error("Contract not available")

    return await contract.isVerifiedHealthActor(address)
  } catch (error) {
    console.error("Error checking health actor verification:", error)
    return false
  }
}

// Get health actor information
export const getHealthActorInfo = async (address: string): Promise<HealthActor | null> => {
  try {
    const contract = await getHealthRegistryContract()
    if (!contract) throw new Error("Contract not available")

    const info = await contract.getHealthActorInfo(address)
    return {
      name: info.name,
      location: info.location,
      credentials: info.credentials,
      isVerified: info.isVerified,
    }
  } catch (error) {
    console.error("Error getting health actor info:", error)
    return null
  }
}

// Register as a health actor
export const registerHealthActor = async (name: string, location: string, credentials: string): Promise<boolean> => {
  try {
    const contract = await getHealthRegistryContract(true)
    if (!contract) throw new Error("Contract not available")

    const tx = await contract.registerHealthActor(name, location, credentials)
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error registering health actor:", error)
    return false
  }
}

// Get FLB token balance
export const getFLBBalance = async (address: string): Promise<string> => {
  try {
    const contract = await getFLBTokenContract()
    if (!contract) throw new Error("Contract not available")

    const balance = await contract.balanceOf(address)
    return ethers.formatUnits(balance, 18)
  } catch (error) {
    console.error("Error getting FLB balance:", error)
    return "0"
  }
}

// Donate to a health actor
export const donateToHealthActor = async (recipientAddress: string, amount: string): Promise<boolean> => {
  try {
    const contract = await getDonationRouterContract(true)
    if (!contract) throw new Error("Donation Router contract not available")

    const amountWei = ethers.parseEther(amount)
    const tx = await contract.donate(recipientAddress, { value: amountWei })
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error donating to health actor:", error)
    return false
  }
}

// Mint FLB tokens
export const mintFLBTokens = async (amount: string): Promise<boolean> => {
  try {
    const contract = await getDonationRouterContract(true)
    if (!contract) throw new Error("Donation Router contract not available")

    const amountWei = ethers.parseEther(amount)
    const tx = await contract.mintFLBToken({ value: amountWei })
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error minting FLB tokens:", error)
    return false
  }
}
