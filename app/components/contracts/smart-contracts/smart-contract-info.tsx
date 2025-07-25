"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Shield, Users, Coins, FileText, ExternalLink, Copy } from "lucide-react"
import { toast } from "sonner"

const SmartContractInfo = () => {
  const [selectedContract, setSelectedContract] = useState("token")

  const contracts = {
    token: {
      name: "FlameBornToken",
      address: "0xf0a903D809bB10B73ed438ac055C0F0D0D712c71",
      description: "BEP-20 governance token with minting capabilities",
      functions: [
        "mint(address to, uint256 amount)",
        "burn(uint256 amount)",
        "transfer(address to, uint256 amount)",
        "approve(address spender, uint256 amount)",
      ],
    },
    registry: {
      name: "HealthActorRegistry",
      address: "0x8E9A2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
      description: "Manages verification of health actors and funding eligibility",
      functions: [
        "registerActor(address actor, string memory details)",
        "verifyActor(address actor)",
        "revokeVerification(address actor)",
        "getActorInfo(address actor)",
      ],
    },
    router: {
      name: "DonationRouter",
      address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      description: "Handles donations, fund routing, and FLB token minting",
      functions: [
        "donate(address healthActor)",
        "batchDonate(address[] memory actors, uint256[] memory amounts)",
        "calculateFLBReward(uint256 donationAmount)",
        "claimRewards()",
      ],
    },
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Address copied to clipboard!")
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-orange-500" />
            Smart Contract Architecture
          </CardTitle>
          <CardDescription className="text-gray-300">
            Flameborn's decentralized infrastructure built on BNB Smart Chain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedContract} onValueChange={setSelectedContract}>
            <TabsList className="grid w-full grid-cols-3 bg-white/10">
              <TabsTrigger value="token" className="text-white data-[state=active]:bg-orange-500">
                <Coins className="w-4 h-4 mr-2" />
                Token
              </TabsTrigger>
              <TabsTrigger value="registry" className="text-white data-[state=active]:bg-orange-500">
                <Users className="w-4 h-4 mr-2" />
                Registry
              </TabsTrigger>
              <TabsTrigger value="router" className="text-white data-[state=active]:bg-orange-500">
                <Shield className="w-4 h-4 mr-2" />
                Router
              </TabsTrigger>
            </TabsList>

            {Object.entries(contracts).map(([key, contract]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{contract.name}</h3>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-4">{contract.description}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <code className="bg-black/30 px-3 py-1 rounded text-sm text-orange-300 flex-1">
                      {contract.address}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(contract.address)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Key Functions:</h4>
                    {contract.functions.map((func, index) => (
                      <div key={index} className="bg-black/20 p-2 rounded">
                        <code className="text-blue-300 text-sm">{func}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Security Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-white">Role-based Access Control</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-white">Reentrancy Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-white">Multi-signature Governance</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-white">Pausable Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-white">Upgrade Mechanisms</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-white">Audit Trail</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SmartContractInfo
