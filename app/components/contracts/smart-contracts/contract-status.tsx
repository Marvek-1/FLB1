"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { fetchContractConfig } from "@/lib/config"
import { getFLBTokenContract, getHealthRegistryContract, getDonationRouterContract } from "@/lib/contract-utils"

type ContractStatus = {
  name: string
  address: string
  connected: boolean
  error?: string
}

export function ContractStatus() {
  const [contracts, setContracts] = useState<ContractStatus[]>([
    { name: "FLB Token", address: "", connected: false },
    { name: "Health Registry", address: "", connected: false },
    { name: "Donation Router", address: "", connected: false },
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [chainId, setChainId] = useState("56")

  useEffect(() => {
    const checkContracts = async () => {
      try {
        // Fetch contract addresses from server
        const config = await fetchContractConfig()
        setChainId(config.chainId)

        // Check FLB Token
        const flbContract = await getFLBTokenContract()
        let flbConnected = false
        let flbError = ""

        try {
          if (flbContract) {
            const name = await flbContract.name()
            flbConnected = !!name
          }
        } catch (error: any) {
          flbError = error.message
        }

        // Check Health Registry
        const registryContract = await getHealthRegistryContract()
        let registryConnected = false
        let registryError = ""

        try {
          if (registryContract) {
            // Just try to call a view function to see if it's connected
            await registryContract.isVerifiedHealthActor("0x0000000000000000000000000000000000000000")
            registryConnected = true
          }
        } catch (error: any) {
          registryError = error.message
        }

        // Check Donation Router
        const routerContract = await getDonationRouterContract()
        let routerConnected = false
        let routerError = ""

        try {
          if (routerContract) {
            // Just try to access a public variable
            await routerContract.flbToken()
            routerConnected = true
          }
        } catch (error: any) {
          routerError = error.message
        }

        setContracts([
          {
            name: "FLB Token",
            address: config.tokenContract,
            connected: flbConnected,
            error: flbError,
          },
          {
            name: "Health Registry",
            address: config.healthRegistry,
            connected: registryConnected,
            error: registryError,
          },
          {
            name: "Donation Router",
            address: config.donationRouter,
            connected: routerConnected,
            error: routerError,
          },
        ])
      } catch (error) {
        console.error("Error checking contracts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkContracts()
  }, [])

  return (
    <Card className="flame-card">
      <CardHeader>
        <CardTitle className="flame-text">Contract Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center">Checking contract connectivity...</p>
        ) : (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.name} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{contract.name}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      contract.connected ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                    }`}
                  >
                    {contract.connected ? "Connected" : "Not Connected"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">{contract.address}</p>
                {!contract.connected && contract.error && (
                  <p className="text-xs text-red-400 mt-1">{contract.error.substring(0, 100)}...</p>
                )}
              </div>
            ))}
            <div className="mt-4 text-xs text-gray-400">
              <p>Chain ID: {chainId} (BNB Smart Chain)</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
