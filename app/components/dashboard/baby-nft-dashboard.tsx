"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from ""@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Progress } from "@/app/components/ui/progress"
import { Heart, Baby, Shield, CheckCircle, Clock, Users, Activity } from "lucide-react"
import { createBabyNFT } from "@/app/components/dashboard/baby-nft-dashboard"
import { useToast } from "@/app/hooks/use-toast"

interface BabyNFT {
  tokenId: string
  mother: string
  facility: string
  babyName: string
  birthTimestamp: number
  lastHeartbeat: number
  postnatalConfirmed: boolean
  oneYearAlive: boolean
  isAlive: boolean
  daysAlive: number
  status: "newborn" | "postnatal" | "milestone" | "at_risk"
}

interface HealthMilestone {
  id: string
  name: string
  description: string
  targetDays: number
  completed: boolean
  flbReward: number
  requirements: string[]
}

export const BabyNFTDashboard: React.FC = () => {
  const [babies, setBabies] = useState<BabyNFT[]>([])
  const [selectedBaby, setSelectedBaby] = useState<BabyNFT | null>(null)
  const [loading, setLoading] = useState(false)
  const [newBabyForm, setNewBabyForm] = useState({
    motherAddress: "",
    facilityAddress: "",
    babyName: "",
  })
  const { toast } = useToast()

  const healthMilestones: HealthMilestone[] = [
    {
      id: "birth",
      name: "Birth Verification",
      description: "Live birth confirmed with biometric data",
      targetDays: 0,
      completed: true,
      flbReward: 100,
      requirements: ["Facility verification", "Mother consent", "Biometric hash"],
    },
    {
      id: "postnatal",
      name: "6-Week Postnatal",
      description: "Mother and baby health checkup",
      targetDays: 42,
      completed: false,
      flbReward: 150,
      requirements: ["Guardian verification", "Health assessment", "Growth tracking"],
    },
    {
      id: "one_year",
      name: "One Year Milestone",
      description: "Baby survives first year of life",
      targetDays: 365,
      completed: false,
      flbReward: 500,
      requirements: ["Continuous heartbeat monitoring", "Growth milestones", "Vaccination records"],
    },
  ]

  useEffect(() => {
    loadBabyNFTs()
  }, [])

  const loadBabyNFTs = async () => {
    try {
      // Mock data for demonstration - replace with actual contract calls
      const mockBabies: BabyNFT[] = [
        {
          tokenId: "1",
          mother: "0x1234...5678",
          facility: "0xabcd...efgh",
          babyName: "Ọmọtúndé",
          birthTimestamp: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
          lastHeartbeat: Date.now() - 60 * 60 * 1000, // 1 hour ago
          postnatalConfirmed: false,
          oneYearAlive: false,
          isAlive: true,
          daysAlive: 30,
          status: "newborn",
        },
        {
          tokenId: "2",
          mother: "0x2345...6789",
          facility: "0xbcde...fghi",
          babyName: "Amara",
          birthTimestamp: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
          lastHeartbeat: Date.now() - 30 * 60 * 1000, // 30 minutes ago
          postnatalConfirmed: true,
          oneYearAlive: false,
          isAlive: true,
          daysAlive: 60,
          status: "postnatal",
        },
      ]
      setBabies(mockBabies)
      if (mockBabies.length > 0) setSelectedBaby(mockBabies[0])
    } catch (error) {
      console.error("Error loading BabyNFTs:", error)
    }
  }

  const handleMintBaby = async () => {
    if (!newBabyForm.motherAddress || !newBabyForm.facilityAddress || !newBabyForm.babyName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const tokenId = await createBabyNFT(newBabyForm.motherAddress, newBabyForm.facilityAddress, newBabyForm.babyName)

      if (tokenId) {
        toast({
          title: "BabyNFT Created Successfully!",
          description: `${newBabyForm.babyName} has been minted as Token ID: ${tokenId}`,
        })
        setNewBabyForm({ motherAddress: "", facilityAddress: "", babyName: "" })
        loadBabyNFTs()
      }
    } catch (error: any) {
      toast({
        title: "Minting Failed",
        description: error.message || "Failed to mint BabyNFT",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "newborn":
        return "bg-blue-500"
      case "postnatal":
        return "bg-green-500"
      case "milestone":
        return "bg-purple-500"
      case "at_risk":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getHeartbeatStatus = (lastHeartbeat: number) => {
    const hoursAgo = (Date.now() - lastHeartbeat) / (1000 * 60 * 60)
    if (hoursAgo < 1) return { status: "healthy", color: "text-green-500", text: "Active" }
    if (hoursAgo < 6) return { status: "normal", color: "text-yellow-500", text: "Normal" }
    return { status: "at_risk", color: "text-red-500", text: "At Risk" }
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6 min-h-screen">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-orange-400">BabyNFT Lifecycle Management</h2>
        <p className="text-gray-300">
          Automated health milestone verification ensuring every life is preserved and rewarded.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Babies</CardTitle>
            <Baby className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{babies.length}</div>
            <p className="text-xs text-gray-400">Lives preserved</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Alive & Healthy</CardTitle>
            <Heart className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{babies.filter((b) => b.isAlive).length}</div>
            <p className="text-xs text-gray-400">Active heartbeats</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Postnatal Complete</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {babies.filter((b) => b.postnatalConfirmed).length}
            </div>
            <p className="text-xs text-gray-400">6-week milestone</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-yellow-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">One Year Survivors</CardTitle>
            <Shield className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{babies.filter((b) => b.oneYearAlive).length}</div>
            <p className="text-xs text-gray-400">Major milestone</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white/10 backdrop-blur-sm border border-orange-500/30">
          <TabsTrigger
            value="overview"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="milestones"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Milestones
          </TabsTrigger>
          <TabsTrigger
            value="mint"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Mint New
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Baby List */}
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Users className="h-5 w-5" />
                  Active BabyNFTs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {babies.map((baby) => {
                  const heartbeatStatus = getHeartbeatStatus(baby.lastHeartbeat)
                  return (
                    <div
                      key={baby.tokenId}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedBaby?.tokenId === baby.tokenId
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-gray-700 hover:bg-white/5"
                      }`}
                      onClick={() => setSelectedBaby(baby)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{baby.babyName}</h4>
                        <Badge className={`${getStatusColor(baby.status)} text-white`}>
                          {baby.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>Token ID: #{baby.tokenId}</div>
                        <div>Days Alive: {baby.daysAlive}</div>
                        <div className={`flex items-center gap-2 ${heartbeatStatus.color}`}>
                          <Activity className="h-3 w-3" />
                          {heartbeatStatus.text}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Baby Details */}
            {selectedBaby && (
              <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Baby className="h-5 w-5" />
                    {selectedBaby.babyName}
                  </CardTitle>
                  <CardDescription className="text-gray-300">Token ID: #{selectedBaby.tokenId}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-400">Mother</Label>
                      <div className="font-mono text-sm text-white">{selectedBaby.mother}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Facility</Label>
                      <div className="font-mono text-sm text-white">{selectedBaby.facility}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Birth Date</Label>
                      <div className="text-sm text-white">
                        {new Date(selectedBaby.birthTimestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-400">Days Alive</Label>
                      <div className="text-sm font-medium text-white">{selectedBaby.daysAlive} days</div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-400">Milestone Progress</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span>Birth → Postnatal (42 days)</span>
                        <span>{Math.min(selectedBaby.daysAlive, 42)}/42</span>
                      </div>
                      <Progress value={(Math.min(selectedBaby.daysAlive, 42) / 42) * 100} className="bg-gray-700" />

                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <span>Postnatal → One Year (365 days)</span>
                        <span>{Math.min(selectedBaby.daysAlive, 365)}/365</span>
                      </div>
                      <Progress value={(Math.min(selectedBaby.daysAlive, 365) / 365) * 100} className="bg-gray-700" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-green-500 text-green-400 hover:bg-green-500/20 bg-transparent"
                    >
                      Record Heartbeat
                    </Button>
                    {selectedBaby.daysAlive >= 42 && !selectedBaby.postnatalConfirmed && (
                      <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                        Confirm Postnatal
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="grid gap-6">
            {healthMilestones.map((milestone) => (
              <Card key={milestone.id} className="bg-white/10 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {milestone.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-white">{milestone.name}</span>
                    </div>
                    <Badge variant={milestone.completed ? "default" : "outline"} className="bg-orange-500 text-white">
                      {milestone.flbReward} FLB
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">{milestone.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-300">
                      <strong>Target:</strong>{" "}
                      {milestone.targetDays === 0 ? "Immediate" : `${milestone.targetDays} days`}
                    </div>
                    <div>
                      <strong className="text-sm text-white">Requirements:</strong>
                      <ul className="text-sm text-gray-300 mt-1 space-y-1">
                        {milestone.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-orange-400 rounded-full" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mint" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Baby className="h-5 w-5" />
                Mint New BabyNFT
              </CardTitle>
              <CardDescription className="text-gray-300">
                Create a new BabyNFT to track a baby&apos;s health journey from birth.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="motherAddress" className="text-white">
                    Mother&apos;s Address
                  </Label>
                  <Input
                    id="motherAddress"
                    placeholder="0x..."
                    value={newBabyForm.motherAddress}
                    onChange={(e) => setNewBabyForm({ ...newBabyForm, motherAddress: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 focus:border-orange-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facilityAddress" className="text-white">
                    Health Facility Address
                  </Label>
                  <Input
                    id="facilityAddress"
                    placeholder="0x..."
                    value={newBabyForm.facilityAddress}
                    onChange={(e) => setNewBabyForm({ ...newBabyForm, facilityAddress: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 focus:border-orange-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="babyName" className="text-white">
                    Baby&apos;s Name
                  </Label>
                  <Input
                    id="babyName"
                    placeholder="Enter baby's name..."
                    value={newBabyForm.babyName}
                    onChange={(e) => setNewBabyForm({ ...newBabyForm, babyName: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 focus:border-orange-500 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleMintBaby}
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {loading ? "Minting..." : "Mint BabyNFT"}
                </Button>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-medium mb-2 text-white">What happens next?</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 100 FLB rewarded immediately upon minting</li>
                  <li>• IoT devices begin heartbeat monitoring</li>
                  <li>• 6-week postnatal milestone tracking starts</li>
                  <li>• Mother gains escrow control via *789# USSD</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
