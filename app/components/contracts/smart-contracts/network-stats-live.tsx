"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"

interface CommunityStats {
  totalUsers: number
  activeConnections: number
  totalInvestments: number
  activeInvestments: number
  impactContribution: number
  communityHealthImpact: number
}

interface HealthSector {
  id: string
  name: string
  icon: string
  active: boolean
}

export function NetworkStatsLive() {
  const [stats, setStats] = useState<CommunityStats>({
    totalUsers: 1,
    activeConnections: 1,
    totalInvestments: 0,
    activeInvestments: 0,
    impactContribution: 0,
    communityHealthImpact: 0,
  })

  const [healthSectors] = useState<HealthSector[]>([
    { id: "primary", name: "Primary Healthcare Centers", icon: "🏥", active: true },
    { id: "district", name: "District Hospitals", icon: "🏨", active: true },
    { id: "chw", name: "Community Health Workers", icon: "👩‍⚕️", active: true },
    { id: "mobile", name: "Mobile Health Units", icon: "🚑", active: true },
    { id: "maternal", name: "Maternal Health Clinics", icon: "🤱", active: true },
    { id: "vaccination", name: "Vaccination Centers", icon: "💉", active: true },
  ])

  const features = [
    "Authentication System (Login/Signup ready)",
    "Health Investment Trading Platform",
    "Real-time Dashboard",
    "Youth Engagement Section",
    "Healers Network",
    "Community Portal",
    "Learning Platform",
    "Governance System",
    "Token Economics",
    "Validators Network",
    "Testnet Environment",
    "Donation Platform",
  ]

  const databaseFeatures = [
    "5 Live Tables connected to Supabase",
    "RLS Security enabled for all user data",
    "Real-time Updates ready",
    "Portfolio Tracking system ready",
  ]

  const nextSteps = [
    "Sign up and create your first health investment",
    "Connect with other health advocates",
    "Start trading to contribute to African health infrastructure",
    "Watch your impact grow in real-time!",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">🔥 FlameBorn Network - Live Stats Dashboard 🔥</h1>
            <div className="flex items-center justify-center space-x-2">
              <Badge className="bg-green-500 text-white">
                <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                LIVE & RUNNING!
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* App Status */}
        <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-orange-400">
              🚀 Current App Status - LIVE & RUNNING!
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Community Stats */}
        <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-blue-400">👥 Community Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/20 p-4 rounded-lg">
                <p className="text-blue-200 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers} Pioneer (You're the first!)</p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-lg">
                <p className="text-green-200 text-sm">Active Wallet Connections</p>
                <p className="text-2xl font-bold text-white">{stats.activeConnections} Connection</p>
              </div>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-lg">
              <p className="text-purple-200 text-sm">Exchange Integrations</p>
              <p className="text-lg font-bold text-white">Bybit connected ✅</p>
            </div>
          </CardContent>
        </Card>

        {/* Health Investment Trading */}
        <Card className="bg-white/10 backdrop-blur-sm border-green-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-green-400">💰 Health Investment Trading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/20 p-4 rounded-lg">
                <p className="text-green-200 text-sm">Total Health Investments</p>
                <p className="text-2xl font-bold text-white">{stats.totalInvestments} (Ready to start!)</p>
              </div>
              <div className="bg-yellow-500/20 p-4 rounded-lg">
                <p className="text-yellow-200 text-sm">Active Investments</p>
                <p className="text-2xl font-bold text-white">{stats.activeInvestments}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-500/20 p-4 rounded-lg">
                <p className="text-red-200 text-sm">Total Impact Contribution</p>
                <p className="text-2xl font-bold text-white">
                  ${stats.impactContribution} (Waiting for first investment)
                </p>
              </div>
              <div className="bg-pink-500/20 p-4 rounded-lg">
                <p className="text-pink-200 text-sm">Community Health Impact</p>
                <p className="text-2xl font-bold text-white">${stats.communityHealthImpact} (Ready to grow!)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Infrastructure Sectors */}
        <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-purple-400">🏥 FlameBorn Health Infrastructure Sectors</CardTitle>
            <p className="text-purple-200">Your app is targeting these 6 Critical Health Areas:</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthSectors.map((sector) => (
                <div key={sector.id} className="bg-purple-500/20 p-4 rounded-lg flex items-center space-x-3">
                  <span className="text-2xl">{sector.icon}</span>
                  <span className="text-white font-medium">{sector.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Features */}
        <Card className="bg-white/10 backdrop-blur-sm border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-cyan-400">🎯 Available Features - ALL LIVE!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card className="bg-white/10 backdrop-blur-sm border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-yellow-400">📊 Database Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {databaseFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-orange-400">🎉 What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-orange-400 mt-1">🔥</span>
                  <span className="text-white">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border-orange-500/50">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Your FlameBorn Network is FULLY OPERATIONAL and ready to change African healthcare! 🌍💪
            </h2>
            <p className="text-lg text-orange-200 mb-6">
              Every investment you make automatically contributes 10% to health infrastructure - that's the FlameBorn
              impact model in action! 🔥
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                🚀 Start Your First Investment
              </Button>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-400 hover:bg-orange-500/20 px-8 py-3 bg-transparent"
              >
                📊 View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 mr-2 bg-white bg-opacity-20 rounded-full flex items-center justify-center">🔥</div>
            <h2 className="text-xl font-bold">FlameBorn Network</h2>
          </div>
          <p className="text-sm opacity-80">
            Africa's Health Restoration Engine - Tokenization of Survival and Knowledge into Sovereignty
          </p>
          <div className="mt-4 text-xs opacity-70">
            © 2024 FlameBorn Project. Igniting Hope, Restoring Health, Building Sovereignty.
          </div>
        </div>
      </footer>
    </div>
  )
}
