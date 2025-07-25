"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Shield, Users, Globe, Stethoscope, HandHeart, Award, TrendingUp } from "lucide-react"

interface CommunityStats {
  healers: {
    total: number
    verified: number
    pending: number
    specializations: {
      nurses: number
      doctors: number
      midwives: number
      pharmacists: number
    }
  }
  guardians: {
    total: number
    active: number
    totalContributions: number
  }
  regions: {
    westAfrica: number
    eastAfrica: number
    southernAfrica: number
    northAfrica: number
    centralAfrica: number
  }
  impact: {
    totalPatientsServed: number
    communitiesReached: number
    donationsReceived: number
  }
  growth: {
    thisMonth: number
    thisWeek: number
  }
  lastUpdated: string
}

interface BubbleData {
  id: string
  label: string
  count: number
  icon: React.ElementType
  color: string
  gradient: string
  size: "small" | "medium" | "large"
  position: { x: number; y: number }
  delay: number
}

export function CommunityBubbles() {
  const [stats, setStats] = useState<CommunityStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [bubbles, setBubbles] = useState<BubbleData[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/community-stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
          generateBubbles(data)
        }
      } catch (error) {
        console.error("Error fetching community stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const generateBubbles = (stats: CommunityStats) => {
    const bubbleConfigs: Omit<BubbleData, "position" | "delay">[] = [
      {
        id: "healers",
        label: "Healers",
        count: stats.healers.total,
        icon: Stethoscope,
        color: "#00C853",
        gradient: "from-green-400 to-emerald-600",
        size: "large",
      },
      {
        id: "verified-healers",
        label: "Verified",
        count: stats.healers.verified,
        icon: Award,
        color: "#FFD600",
        gradient: "from-yellow-400 to-amber-600",
        size: "medium",
      },
      {
        id: "guardians",
        label: "Guardians",
        count: stats.guardians.total,
        icon: Shield,
        color: "#1E88E5",
        gradient: "from-blue-400 to-indigo-600",
        size: "large",
      },
      {
        id: "active-guardians",
        label: "Active",
        count: stats.guardians.active,
        icon: HandHeart,
        color: "#FF6B00",
        gradient: "from-orange-400 to-red-500",
        size: "medium",
      },
      {
        id: "nurses",
        label: "Nurses",
        count: stats.healers.specializations.nurses,
        icon: Heart,
        color: "#E91E63",
        gradient: "from-pink-400 to-rose-600",
        size: "medium",
      },
      {
        id: "doctors",
        label: "Doctors",
        count: stats.healers.specializations.doctors,
        icon: Users,
        color: "#9C27B0",
        gradient: "from-purple-400 to-violet-600",
        size: "medium",
      },
      {
        id: "west-africa",
        label: "West Africa",
        count: stats.regions.westAfrica,
        icon: Globe,
        color: "#FF9800",
        gradient: "from-amber-400 to-orange-600",
        size: "small",
      },
      {
        id: "east-africa",
        label: "East Africa",
        count: stats.regions.eastAfrica,
        icon: Globe,
        color: "#4CAF50",
        gradient: "from-green-400 to-teal-600",
        size: "small",
      },
      {
        id: "southern-africa",
        label: "Southern Africa",
        count: stats.regions.southernAfrica,
        icon: Globe,
        color: "#2196F3",
        gradient: "from-blue-400 to-cyan-600",
        size: "small",
      },
      {
        id: "growth-month",
        label: "New This Month",
        count: stats.growth.thisMonth,
        icon: TrendingUp,
        color: "#00BCD4",
        gradient: "from-cyan-400 to-teal-600",
        size: "small",
      },
    ]

    // Generate random positions for bubbles
    const generatedBubbles = bubbleConfigs.map((config, index) => ({
      ...config,
      position: {
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: Math.random() * 70 + 15, // 15% to 85% of container height
      },
      delay: index * 0.2,
    }))

    setBubbles(generatedBubbles)
  }

  const getBubbleSize = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "w-16 h-16 md:w-20 md:h-20"
      case "medium":
        return "w-20 h-20 md:w-24 md:h-24"
      case "large":
        return "w-24 h-24 md:w-28 md:h-28"
    }
  }

  const getTextSize = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "text-xs"
      case "medium":
        return "text-sm"
      case "large":
        return "text-base"
    }
  }

  if (loading) {
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-flame"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,78,0,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,160,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,0,200,0.2),transparent_50%)]"></div>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-6 z-10">
        <h3 className="text-2xl font-bold text-white mb-1">Flameborn Community</h3>
        <p className="text-sm text-gray-300">The Soul & Codex of Everyone</p>
      </div>

      {/* Animated bubbles */}
      {bubbles.map((bubble) => {
        const Icon = bubble.icon
        return (
          <motion.div
            key={bubble.id}
            className={`absolute ${getBubbleSize(bubble.size)} cursor-pointer group`}
            style={{
              left: `${bubble.position.x}%`,
              top: `${bubble.position.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: bubble.delay,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Bubble container */}
            <motion.div
              className={`w-full h-full rounded-full bg-gradient-to-br ${bubble.gradient} shadow-lg border border-white/20 flex flex-col items-center justify-center text-white relative overflow-hidden`}
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle, ${bubble.color}40, transparent)`,
                  filter: "blur(8px)",
                }}
              />

              {/* Icon */}
              <Icon className="w-6 h-6 md:w-8 md:h-8 mb-1" />

              {/* Count */}
              <motion.div
                className={`font-bold ${getTextSize(bubble.size)} leading-none`}
                key={bubble.count} // Re-animate when count changes
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {bubble.count.toLocaleString()}
              </motion.div>

              {/* Label */}
              <div className={`${getTextSize(bubble.size)} opacity-90 text-center leading-tight`}>{bubble.label}</div>

              {/* Pulse effect for new additions */}
              {bubble.id === "growth-month" && bubble.count > 0 && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              )}
            </motion.div>

            {/* Tooltip on hover */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
              {bubble.label}: {bubble.count.toLocaleString()}
            </div>
          </motion.div>
        )
      })}

      {/* Stats summary in corner */}
      {stats && (
        <div className="absolute bottom-4 right-6 text-right text-white/80">
          <div className="text-sm">
            Total Community:{" "}
            <span className="font-bold text-flame">
              {(stats.healers.total + stats.guardians.total).toLocaleString()}
            </span>
          </div>
          <div className="text-xs opacity-70">Updated: {new Date(stats.lastUpdated).toLocaleTimeString()}</div>
        </div>
      )}
    </div>
  )
}
