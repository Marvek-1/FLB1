"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { Plus, Heart, Activity } from "lucide-react"
import { toast } from "sonner"

interface HealthActor {
  id: string
  name: string
  location: string
  type: string
  verified: boolean
  flbEarned: number
}

interface Donation {
  id: string
  donor: string
  recipient: string
  amount: number
  timestamp: string
}

interface ImpactData {
  id: string
  actor: string
  metric: string
  value: number
  date: string
}

export function TestDataEntry() {
  const [healthActors, setHealthActors] = useState<HealthActor[]>([
    {
      id: "1",
      name: "Dr. Amara Kone",
      location: "Lagos, Nigeria",
      type: "Community Health Worker",
      verified: true,
      flbEarned: 250,
    },
    {
      id: "2",
      name: "Nairobi Health Center",
      location: "Nairobi, Kenya",
      type: "Health Facility",
      verified: false,
      flbEarned: 0,
    },
  ])

  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "1",
      donor: "0x1234...5678",
      recipient: "Dr. Amara Kone",
      amount: 0.5,
      timestamp: new Date().toISOString(),
    },
  ])

  const [impactData, setImpactData] = useState<ImpactData[]>([
    {
      id: "1",
      actor: "Dr. Amara Kone",
      metric: "Patients Treated",
      value: 45,
      date: new Date().toISOString().split("T")[0],
    },
  ])

  const [newActor, setNewActor] = useState({
    name: "",
    location: "",
    type: "Community Health Worker",
  })

  const [newDonation, setNewDonation] = useState({
    donor: "",
    recipient: "",
    amount: "",
  })

  const [newImpact, setNewImpact] = useState({
    actor: "",
    metric: "",
    value: "",
    date: "",
  })

  const addHealthActor = () => {
    if (!newActor.name || !newActor.location) {
      toast.error("Please fill in all required fields")
      return
    }

    const actor: HealthActor = {
      id: Date.now().toString(),
      name: newActor.name,
      location: newActor.location,
      type: newActor.type,
      verified: false,
      flbEarned: 0,
    }

    setHealthActors([...healthActors, actor])
    setNewActor({ name: "", location: "", type: "Community Health Worker" })
    toast.success("Health actor added successfully!")
  }

  const addDonation = () => {
    if (!newDonation.donor || !newDonation.recipient || !newDonation.amount) {
      toast.error("Please fill in all required fields")
      return
    }

    const donation: Donation = {
      id: Date.now().toString(),
      donor: newDonation.donor,
      recipient: newDonation.recipient,
      amount: Number.parseFloat(newDonation.amount),
      timestamp: new Date().toISOString(),
    }

    setDonations([...donations, donation])
    setNewDonation({ donor: "", recipient: "", amount: "" })
    toast.success("Donation recorded successfully!")
  }

  const addImpactData = () => {
    if (!newImpact.actor || !newImpact.metric || !newImpact.value || !newImpact.date) {
      toast.error("Please fill in all required fields")
      return
    }

    const impact: ImpactData = {
      id: Date.now().toString(),
      actor: newImpact.actor,
      metric: newImpact.metric,
      value: Number.parseInt(newImpact.value),
      date: newImpact.date,
    }

    setImpactData([...impactData, impact])
    setNewImpact({ actor: "", metric: "", value: "", date: "" })
    toast.success("Impact data added successfully!")
  }

  return (
    <Card className="bg-ash-gray/30 border border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-heading text-white">Test Data Entry</CardTitle>
        <CardDescription className="text-gray-300">Add test data to verify the system functionality</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="actors" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="actors">Health Actors</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="impact">Impact Data</TabsTrigger>
          </TabsList>

          <TabsContent value="actors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Add New Health Actor</h3>
                <div className="space-y-2">
                  <Label htmlFor="actorName" className="text-white">
                    Name
                  </Label>
                  <Input
                    id="actorName"
                    value={newActor.name}
                    onChange={(e) => setNewActor({ ...newActor, name: e.target.value })}
                    placeholder="Dr. Amara Kone"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actorLocation" className="text-white">
                    Location
                  </Label>
                  <Input
                    id="actorLocation"
                    value={newActor.location}
                    onChange={(e) => setNewActor({ ...newActor, location: e.target.value })}
                    placeholder="Lagos, Nigeria"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actorType" className="text-white">
                    Type
                  </Label>
                  <select
                    id="actorType"
                    value={newActor.type}
                    onChange={(e) => setNewActor({ ...newActor, type: e.target.value })}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  >
                    <option value="Community Health Worker">Community Health Worker</option>
                    <option value="Health Facility">Health Facility</option>
                    <option value="Mobile Health Unit">Mobile Health Unit</option>
                    <option value="Maternal Health Clinic">Maternal Health Clinic</option>
                  </select>
                </div>
                <Button onClick={addHealthActor} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Health Actor
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Current Health Actors</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {healthActors.map((actor) => (
                    <div key={actor.id} className="p-3 bg-gray-800 rounded border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-white">{actor.name}</h4>
                          <p className="text-sm text-gray-400">{actor.location}</p>
                          <p className="text-xs text-gray-500">{actor.type}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={actor.verified ? "default" : "secondary"}>
                            {actor.verified ? "Verified" : "Pending"}
                          </Badge>
                          <p className="text-sm text-flame-red mt-1">{actor.flbEarned} FLB</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Record New Donation</h3>
                <div className="space-y-2">
                  <Label htmlFor="donorAddress" className="text-white">
                    Donor Address
                  </Label>
                  <Input
                    id="donorAddress"
                    value={newDonation.donor}
                    onChange={(e) => setNewDonation({ ...newDonation, donor: e.target.value })}
                    placeholder="0x1234...5678"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-white">
                    Recipient
                  </Label>
                  <Input
                    id="recipient"
                    value={newDonation.recipient}
                    onChange={(e) => setNewDonation({ ...newDonation, recipient: e.target.value })}
                    placeholder="Dr. Amara Kone"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-white">
                    Amount (BNB)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={newDonation.amount}
                    onChange={(e) => setNewDonation({ ...newDonation, amount: e.target.value })}
                    placeholder="0.5"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button onClick={addDonation} className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Record Donation
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Recent Donations</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {donations.map((donation) => (
                    <div key={donation.id} className="p-3 bg-gray-800 rounded border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-white">To: {donation.recipient}</p>
                          <p className="text-xs text-gray-400">From: {donation.donor}</p>
                          <p className="text-xs text-gray-500">{new Date(donation.timestamp).toLocaleDateString()}</p>
                        </div>
                        <p className="text-lg font-bold text-healing-blue">{donation.amount} BNB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Add Impact Data</h3>
                <div className="space-y-2">
                  <Label htmlFor="impactActor" className="text-white">
                    Health Actor
                  </Label>
                  <Input
                    id="impactActor"
                    value={newImpact.actor}
                    onChange={(e) => setNewImpact({ ...newImpact, actor: e.target.value })}
                    placeholder="Dr. Amara Kone"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metric" className="text-white">
                    Metric
                  </Label>
                  <Input
                    id="metric"
                    value={newImpact.metric}
                    onChange={(e) => setNewImpact({ ...newImpact, metric: e.target.value })}
                    placeholder="Patients Treated"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value" className="text-white">
                    Value
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={newImpact.value}
                    onChange={(e) => setNewImpact({ ...newImpact, value: e.target.value })}
                    placeholder="45"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-white">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newImpact.date}
                    onChange={(e) => setNewImpact({ ...newImpact, date: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button onClick={addImpactData} className="w-full">
                  <Activity className="w-4 h-4 mr-2" />
                  Add Impact Data
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Impact Records</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {impactData.map((impact) => (
                    <div key={impact.id} className="p-3 bg-gray-800 rounded border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-white">{impact.actor}</p>
                          <p className="text-xs text-gray-400">{impact.metric}</p>
                          <p className="text-xs text-gray-500">{impact.date}</p>
                        </div>
                        <p className="text-lg font-bold text-forest-green">{impact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
