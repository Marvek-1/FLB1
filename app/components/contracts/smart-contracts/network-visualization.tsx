"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Users, Heart, Activity, TrendingUp, Shield, Stethoscope } from "lucide-react"
import NetworkGraph from "./network-graph"

interface NetworkStats {
  healthActors: number
  guardians: number
  connections: number
  flbCirculation: number
  weeklyGrowth: {
    healthActors: number
    guardians: number
    connections: number
    flbGrowth: number
  }
}

interface HealthCategory {
  id: string
  name: string
  count: number
  color: string
  icon: React.ReactNode
  description: string
}

const NetworkVisualization: React.FC = () => {
  const [stats, setStats] = useState<NetworkStats>({
    healthActors: 2847,
    guardians: 1203,
    connections: 5691,
    flbCirculation: 847000,
    weeklyGrowth: {
      healthActors: 127,
      guardians: 89,
      connections: 234,
      flbGrowth: 12.3,
    },
  })

  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const healthCategories: HealthCategory[] = [
    {
      id: "primary-care",
      name: "Primary Healthcare Centers",
      count: 1247,
      color: "#00A86B",
      icon: <Stethoscope className="w-4 h-4" />,
      description: "Community health centers providing primary care",
    },
    {
      id: "hospitals",
      name: "District Hospitals",
      count: 423,
      color: "#0077B5",
      icon: <Heart className="w-4 h-4" />,
      description: "Regional hospitals with specialized services",
    },
    {
      id: "chw",
      name: "Community Health Workers",
      count: 892,
      color: "#9B59B6",
      icon: <Users className="w-4 h-4" />,
      description: "Trained community health advocates",
    },
    {
      id: "mobile",
      name: "Mobile Health Units",
      count: 156,
      color: "#E74C3C",
      icon: <Activity className="w-4 h-4" />,
      description: "Mobile clinics reaching remote areas",
    },
    {
      id: "maternal",
      name: "Maternal Health Clinics",
      count: 89,
      color: "#F39C12",
      icon: <Heart className="w-4 h-4" />,
      description: "Specialized maternal and child health",
    },
    {
      id: "vaccination",
      name: "Vaccination Centers",
      count: 234,
      color: "#27AE60",
      icon: <Shield className="w-4 h-4" />,
      description: "Immunization and prevention centers",
    },
  ]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        healthActors: prev.healthActors + Math.floor(Math.random() * 3),
        guardians: prev.guardians + Math.floor(Math.random() * 2),
        connections: prev.connections + Math.floor(Math.random() * 5),
        flbCirculation: prev.flbCirculation + Math.floor(Math.random() * 1000),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live Network <span className="text-orange-500">Pulse</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch Africa's health sovereignty network grow in real-time. Every connection represents lives being
            transformed.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-green-400" />
                <Badge className="bg-green-500/20 text-green-300">+{stats.weeklyGrowth.healthActors}</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{formatNumber(stats.healthActors)}</div>
              <div className="text-sm text-gray-400">Health Actors</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Shield className="w-8 h-8 text-blue-400" />
                <Badge className="bg-blue-500/20 text-blue-300">+{stats.weeklyGrowth.guardians}</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{formatNumber(stats.guardians)}</div>
              <div className="text-sm text-gray-400">Active Guardians</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-8 h-8 text-purple-400" />
                <Badge className="bg-purple-500/20 text-purple-300">+{stats.weeklyGrowth.connections}</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{formatNumber(stats.connections)}</div>
              <div className="text-sm text-gray-400">Live Connections</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-orange-400" />
                <Badge className="bg-orange-500/20 text-orange-300">+{stats.weeklyGrowth.flbGrowth}%</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{formatNumber(stats.flbCirculation)}</div>
              <div className="text-sm text-gray-400">FLB Circulation</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Network Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-white text-center">Interactive Health Network Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 w-full">
                <NetworkGraph
                  centerNodeId="flameborn-hub"
                  segment={
                    selectedCategory !== "all"
                      ? healthCategories.find((c) => c.id === selectedCategory)?.name
                      : undefined
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Health Network Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthCategories.map((category) => (
              <motion.div key={category.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-white/20 border-orange-500/50"
                      : "bg-white/10 border-white/20 hover:bg-white/15"
                  } backdrop-blur-lg`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: category.color + "20" }}>
                        <div style={{ color: category.color }}>{category.icon}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{formatNumber(category.count)}</div>
                        <div className="text-xs text-gray-400">Active</div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-white mb-1">{category.name}</h4>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-8 border border-orange-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Join Africa's Health Revolution</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Become part of the growing network of health sovereignty advocates. Every connection strengthens our
              collective power to heal Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSfuxO0SEkiGhuvYqP5fE4c5RgqdyZc76rppeC70rDsu67ssgw/viewform?usp=sharing&ouid=117857227348165727286",
                    "_blank",
                  )
                }
              >
                <Shield className="w-5 h-5 mr-2" />
                Become a Guardian
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSfuxO0SEkiGhuvYqP5fE4c5RgqdyZc76rppeC70rDsu67ssgw/viewform?usp=sharing&ouid=117857227348165727286",
                    "_blank",
                  )
                }
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Register as Health Actor
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NetworkVisualization
