"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Heart, Shield, Stethoscope, ExternalLink, RefreshCw } from "lucide-react"

interface RegistrationEntry {
  id: string
  name: string
  type: "Guardian" | "Healer" | "CHW" | "Health Facility"
  location: string
  timestamp: string
  flbEarned: number
  verified: boolean
}

const LiveRegistrationFeed: React.FC = () => {
  const [registrations, setRegistrations] = useState<RegistrationEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data that simulates real Google Sheets data
  const mockRegistrations: RegistrationEntry[] = [
    {
      id: "1",
      name: "Dr. Amara Kone",
      type: "Healer",
      location: "Lagos, Nigeria",
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      flbEarned: 250,
      verified: true,
    },
    {
      id: "2",
      name: "Kwame Asante",
      type: "Guardian",
      location: "Accra, Ghana",
      timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
      flbEarned: 150,
      verified: true,
    },
    {
      id: "3",
      name: "Sarah Okafor",
      type: "CHW",
      location: "Kano, Nigeria",
      timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      flbEarned: 100,
      verified: false,
    },
    {
      id: "4",
      name: "Nairobi Community Health Center",
      type: "Health Facility",
      location: "Nairobi, Kenya",
      timestamp: new Date(Date.now() - 1200000).toISOString(), // 20 minutes ago
      flbEarned: 500,
      verified: true,
    },
    {
      id: "5",
      name: "Fatima Al-Rashid",
      type: "Guardian",
      location: "Cairo, Egypt",
      timestamp: new Date(Date.now() - 1500000).toISOString(), // 25 minutes ago
      flbEarned: 200,
      verified: true,
    },
  ]

  // Simulate fetching data from Google Sheets
  const fetchRegistrations = async () => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, this would fetch from the Google Sheets API
    // For now, we'll use mock data with some randomization
    const shuffled = [...mockRegistrations].sort(() => Math.random() - 0.5)
    setRegistrations(shuffled.slice(0, 4))

    setIsLoading(false)
  }

  // Simulate real-time updates
  useEffect(() => {
    fetchRegistrations()

    // Update every 30 seconds to simulate live feed
    const interval = setInterval(() => {
      // Add a new random registration
      const newRegistration: RegistrationEntry = {
        id: Date.now().toString(),
        name: `New Member ${Math.floor(Math.random() * 1000)}`,
        type: ["Guardian", "Healer", "CHW", "Health Facility"][Math.floor(Math.random() * 4)] as any,
        location: ["Lagos, Nigeria", "Nairobi, Kenya", "Accra, Ghana", "Cairo, Egypt"][Math.floor(Math.random() * 4)],
        timestamp: new Date().toISOString(),
        flbEarned: Math.floor(Math.random() * 300) + 50,
        verified: Math.random() > 0.3,
      }

      setRegistrations((prev) => [newRegistration, ...prev.slice(0, 3)])
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Guardian":
        return <Shield className="w-4 h-4" />
      case "Healer":
        return <Stethoscope className="w-4 h-4" />
      case "CHW":
        return <Users className="w-4 h-4" />
      case "Health Facility":
        return <Heart className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Guardian":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Healer":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "CHW":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "Health Facility":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Live Registration Feed
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchRegistrations}
            disabled={isLoading}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <p className="text-gray-300 text-sm">Real-time updates from our community registration system</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="popLayout">
          {registrations.map((registration, index) => (
            <motion.div
              key={registration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(registration.type)}`}>
                    {getTypeIcon(registration.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{registration.name}</h4>
                    <p className="text-sm text-gray-400">{registration.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getTypeColor(registration.type)}>{registration.type}</Badge>
                  {registration.verified && <div className="text-xs text-green-400 mt-1">✓ Verified</div>}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{formatTimeAgo(registration.timestamp)}</span>
                <span className="text-orange-400 font-medium">+{registration.flbEarned} FLB</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {registrations.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-400">No recent registrations. Check back soon!</div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-gray-400">Loading latest registrations...</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSfuxO0SEkiGhuvYqP5fE4c5RgqdyZc76rppeC70rDsu67ssgw/viewform?usp=sharing&ouid=117857227348165727286",
                "_blank",
              )
            }
          >
            <Users className="w-4 h-4 mr-2" />
            Join FlameBorn Network
          </Button>

          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
            onClick={() =>
              window.open(
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkTZ9GaUMp_nlR82WWKR_tFMZzWDE4jekk6N9GKZ60eiceuHsUOlftoiqdd1AB3vBPxiyk1DtLBBM4/pubhtml",
                "_blank",
              )
            }
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Registration Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LiveRegistrationFeed
