"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { LineChart, BarChart, PieChart, Heart, Users, Calendar, MapPin, Download, Share2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"

// Mock data for demonstration
const IMPACT_DATA = {
  donations: [],
  impact: {
    livesImpacted: 0,
    communitiesReached: 0,
    healthWorkersSupported: 0,
    totalDonated: 0,
  },
  transactions: [],
}

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading text-white mb-2">Your Impact Dashboard</h1>
          <p className="text-gray-400">Track your contributions and see the real-world impact of your support</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Data
          </Button>
          <Button className="bg-flame hover:bg-pulse flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Share Impact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-ash-gray/30 border border-flame/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Donated</p>
                <h3 className="text-2xl font-bold text-flame">${IMPACT_DATA.impact.totalDonated}</h3>
              </div>
              <div className="p-3 rounded-full bg-flame/10">
                <Heart className="h-6 w-6 text-flame" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ash-gray/30 border border-guardian/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Lives Impacted</p>
                <h3 className="text-2xl font-bold text-guardian">{IMPACT_DATA.impact.livesImpacted}</h3>
              </div>
              <div className="p-3 rounded-full bg-guardian/10">
                <Users className="h-6 w-6 text-guardian" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ash-gray/30 border border-pulse/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Health Workers</p>
                <h3 className="text-2xl font-bold text-pulse">{IMPACT_DATA.impact.healthWorkersSupported}</h3>
              </div>
              <div className="p-3 rounded-full bg-pulse/10">
                <Users className="h-6 w-6 text-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ash-gray/30 border border-neon/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Communities</p>
                <h3 className="text-2xl font-bold text-neon">{IMPACT_DATA.impact.communitiesReached}</h3>
              </div>
              <div className="p-3 rounded-full bg-neon/10">
                <MapPin className="h-6 w-6 text-neon" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 bg-gray-800">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-gray-700">
            <LineChart className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-gray-700">
            <BarChart className="h-4 w-4 mr-2" /> Transactions
          </TabsTrigger>
          <TabsTrigger value="impact" className="text-white data-[state=active]:bg-gray-700">
            <PieChart className="h-4 w-4 mr-2" /> Impact Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-ash-gray/30 border border-gray-700">
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Interactive chart would display here showing donation history over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="bg-ash-gray/30 border border-gray-700">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {IMPACT_DATA.transactions.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-500">No transactions yet. Make a donation to see your transaction history.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Transaction</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Recipient</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {IMPACT_DATA.transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="py-3 px-4 text-white">{tx.id}</td>
                          <td className="py-3 px-4 text-gray-300 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" /> {tx.date}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={tx.type === "Donation" ? "bg-flame/20 text-flame" : "bg-neon/20 text-neon"}
                            >
                              {tx.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-white font-medium">${tx.amount}</td>
                          <td className="py-3 px-4 text-gray-300">{tx.recipient}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-900/30 text-green-400">{tx.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-ash-gray/30 border border-gray-700">
              <CardHeader>
                <CardTitle>Impact Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Interactive chart would display here showing impact distribution by region</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-ash-gray/30 border border-gray-700">
              <CardHeader>
                <CardTitle>Impact Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Interactive chart would display here showing impact growth over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
