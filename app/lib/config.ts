// This is a placeholder until we fetch the real config
export const config = {
  tokenContract: "",
  healthRegistry: "",
  donationRouter: "",
  chainId: "56", // Default to BNB Chain
}

// Function to fetch contract addresses from server
export async function fetchContractConfig() {
  try {
    const response = await fetch("/api/contracts")
    if (!response.ok) {
      throw new Error("Failed to fetch contract configuration")
    }
    const data = await response.json()
    return {
      tokenContract: data.flbToken,
      healthRegistry: data.healthRegistry,
      donationRouter: data.donationRouter,
      chainId: data.chainId,
    }
  } catch (error) {
    console.error("Error fetching contract config:", error)
    return config // Return default config on error
  }
}
