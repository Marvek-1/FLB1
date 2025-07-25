"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Heart, Baby, Shield, Activity } from "lucide-react"
import { useToast } from "@/app/hooks/use-toast"

interface BabyInfo {
  birthTimestamp: number
  mother: string
  facility: string
  lastHeartbeat: number
  isAlive: boolean
  escrowAmount: string
}

export function MaternalHealthPortal() {
  const [babies, setBabies] = useState<Array<{ id: string; info: BabyInfo }>>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Mock data for demonstration
  const mockBabies = [
    {
      id: "1",
      info: {
        birthTimestamp: Date.now() - 86400000 * 7, // 7 days ago
        mother: "0x742d35Cc6634C0532925a3b8D0f5e5d7c3c6D33f",
        facility: "Lagos University Teaching Hospital",
        lastHeartbeat: Date.now() - 3600000, // 1 hour ago
        isAlive: true,
        escrowAmount: "250",
      },
    },
    {
      id: "2",
      info: {
        birthTimestamp: Date.now() - 86400000 * 30, // 30 days ago
        mother: "0x456789abcdef123456789abcdef123456789abcdef",
        facility: "Kenyatta National Hospital",
        lastHeartbeat: Date.now() - 1800000, // 30 minutes ago
        isAlive: true,
        escrowAmount: "180",
      },
    },
  ]

  useEffect(() => {
    setBabies(mockBabies)
  }, [])

  const handleCreateBabyNFT = async () => {
    setLoading(true)
    try {
      // Mock creation for demonstration
      toast({
        title: "BabyNFT Created",
        description: "Life-bond established successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create BabyNFT",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  const getHeartbeatStatus = (lastHeartbeat: number) => {
    const hoursSince = (Date.now() - lastHeartbeat) / (1000 * 60 * 60)
    if (hoursSince < 2) return { color: "text-emerald-400", text: "Active" }
    if (hoursSince < 12) return { color: "text-yellow-400", text: "Recent" }
    return { color: "text-red-400", text: "Delayed" }
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-orange-400">👶 Maternal Health Portal</h2>
        <p className="text-gray-300">Life-bond tracking and guardian verification system</p>
      </div>

      <Tabs defaultValue="babies" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-orange-500/30">
          <TabsTrigger
            value="babies"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            BabyNFTs
          </TabsTrigger>
          <TabsTrigger
            value="facilities"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Facilities
          </TabsTrigger>
          <TabsTrigger
            value="guardians"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Guardians
          </TabsTrigger>
          <TabsTrigger
            value="milestones"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Milestones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="babies" className="space-y-4">
          {/* Create New BabyNFT */}
          <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Baby className="h-5 w-5" />
                Create New Life-Bond
              </CardTitle>
              <CardDescription className="text-gray-300">
                Register a new birth and establish BabyNFT life-bond tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleCreateBabyNFT}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {loading ? "Creating..." : "Create BabyNFT"}
              </Button>
            </CardContent>
          </Card>

          {/* Existing BabyNFTs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {babies.map((baby) => {
              const heartbeatStatus = getHeartbeatStatus(baby.info.lastHeartbeat)
              return (
                <Card key={baby.id} className="bg-white/10 backdrop-blur-sm border-blue-500/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white">Baby #{baby.id}</CardTitle>
                      <Badge
                        variant={baby.info.isAlive ? "default" : "destructive"}
                        className="bg-green-500 text-white"
                      >
                        {baby.info.isAlive ? "Alive" : "Critical"}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300">
                      Born: {formatDate(baby.info.birthTimestamp)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Facility:</span>
                        <span className="font-medium text-white">{baby.info.facility}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Escrow:</span>
                        <span className="font-medium text-white">{baby.info.escrowAmount} FLB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Heartbeat:</span>
                        <span className={`font-medium ${heartbeatStatus.color}`}>
                          <Activity className="h-3 w-3 inline mr-1" />
                          {heartbeatStatus.text}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-700">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-orange-500 text-orange-400 hover:bg-orange-500/20 bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Shield className="h-5 w-5" />
                Health Facilities
              </CardTitle>
              <CardDescription className="text-gray-300">
                Registered healthcare facilities in the FlameBorn network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Lagos University Teaching Hospital",
                    location: "Lagos, Nigeria",
                    activeBirths: 23,
                    successRate: 98.5,
                    totalCommitted: "12,450",
                  },
                  {
                    name: "Kenyatta National Hospital",
                    location: "Nairobi, Kenya",
                    activeBirths: 18,
                    successRate: 97.2,
                    totalCommitted: "8,750",
                  },
                ].map((facility, index) => (
                  <Card key={index} className="p-4 bg-white/5 border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">{facility.name}</h3>
                        <p className="text-sm text-gray-400">{facility.location}</p>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        {facility.successRate}% Success
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-gray-400">Active Births:</span>
                        <span className="ml-2 font-medium text-white">{facility.activeBirths}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Committed:</span>
                        <span className="ml-2 font-medium text-white">{facility.totalCommitted} FLB</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guardians" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Shield className="h-5 w-5" />
                Guardian Councils
              </CardTitle>
              <CardDescription className="text-gray-300">
                Community elders and FLB representatives overseeing facility verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-400">Guardian Council management coming soon...</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Heart className="h-5 w-5" />
                Payment Milestones
              </CardTitle>
              <CardDescription className="text-gray-300">
                Track facility payment milestones: Commitment → Delivery → Postnatal → Bonus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-400">Milestone tracking interface coming soon...</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
