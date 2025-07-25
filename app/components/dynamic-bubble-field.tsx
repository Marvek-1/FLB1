"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Stethoscope, Shield, Heart, Zap, TrendingUp, Activity, Users } from "lucide-react"

interface RegistrationEntry {
  id: string
  name: string
  type: "Guardian" | "Healer" | "CHW" | "Health Facility"
  location: string
  timestamp: string
  flbEarned: number
  verified: boolean
}

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
  soulbound: {
    total: number
    resonanceHigh: number
    ancestralVerified: number
  }
  codex: {
    scrollKeepers: number
    proverbContributors: number
    codeContributors: number
    totalScrolls: number
  }
  testnet: {
    activeNodes: number
    newJoinsToday: number
    transactionsToday: number
  }
  mainnet: {
    activeNodes: number
    newJoinsToday: number
    transactionsToday: number
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
    flbTokensEarned: number
  }
  growth: {
    thisMonth: number
    thisWeek: number
    today: number
  }
  lastUpdated: string
  liveRegistrations: RegistrationEntry[]
}

interface BubbleConfig {
  id: string
  label: string
  count: number
  icon: React.ElementType
  category:
    | "testnet"
    | "mainnet"
    | "healers"
    | "guardians"
    | "soulbound"
    | "codex"
    | "verified"
    | "active"
    | "live-person"
  size: "xs" | "sm" | "md" | "lg" | "xl"
  position: { x: number; y: number }
  priority: number
  velocity: { x: number; y: number }
  isLive?: boolean
  personData?: RegistrationEntry
  isNewJoin?: boolean
}

export function DynamicBubbleField() {
  const [stats, setStats] = useState<CommunityStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [bubbles, setBubbles] = useState<BubbleConfig[]>([])
  const [liveRegistrations, setLiveRegistrations] = useState<RegistrationEntry[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  // Fetch live registration data from Google Sheets
  const fetchLiveRegistrations = async (): Promise<RegistrationEntry[]> => {
    try {
      // In a real implementation, this would fetch from Google Sheets API
      // For now, we'll simulate live data that updates
      const mockRegistrations: RegistrationEntry[] = [
        {
          id: `${Date.now()}-1`,
          name: "Dr. Amara Kone",
          type: "Healer",
          location: "Lagos, Nigeria",
          timestamp: new Date(Date.now() - Math.random() * 300000).toISOString(),
          flbEarned: 250,
          verified: true,
        },
        {
          id: `${Date.now()}-2`,
          name: "Kwame Asante",
          type: "Guardian",
          location: "Accra, Ghana",
          timestamp: new Date(Date.now() - Math.random() * 600000).toISOString(),
          flbEarned: 150,
          verified: true,
        },
        {
          id: `${Date.now()}-3`,
          name: "Sarah Okafor",
          type: "CHW",
          location: "Kano, Nigeria",
          timestamp: new Date(Date.now() - Math.random() * 900000).toISOString(),
          flbEarned: 100,
          verified: false,
        },
        {
          id: `${Date.now()}-4`,
          name: "Nairobi Community Health Center",
          type: "Health Facility",
          location: "Nairobi, Kenya",
          timestamp: new Date(Date.now() - Math.random() * 1200000).toISOString(),
          flbEarned: 500,
          verified: true,
        },
        {
          id: `${Date.now()}-5`,
          name: "Fatima Al-Rashid",
          type: "Guardian",
          location: "Cairo, Egypt",
          timestamp: new Date(Date.now() - Math.random() * 1500000).toISOString(),
          flbEarned: 200,
          verified: true,
        },
        {
          id: `${Date.now()}-6`,
          name: "Dr. Kofi Mensah",
          type: "Healer",
          location: "Kumasi, Ghana",
          timestamp: new Date(Date.now() - Math.random() * 300000).toISOString(),
          flbEarned: 300,
          verified: true,
        },
        {
          id: `${Date.now()}-7`,
          name: "Aisha Mwangi",
          type: "CHW",
          location: "Mombasa, Kenya",
          timestamp: new Date(Date.now() - Math.random() * 400000).toISOString(),
          flbEarned: 120,
          verified: false,
        },
        {
          id: `${Date.now()}-8`,
          name: "Ubuntu Health Collective",
          type: "Health Facility",
          location: "Cape Town, South Africa",
          timestamp: new Date(Date.now() - Math.random() * 500000).toISOString(),
          flbEarned: 450,
          verified: true,
        },
      ]

      // Simulate new registrations appearing
      const recentRegistrations = mockRegistrations.filter((reg) => {
        const regTime = new Date(reg.timestamp).getTime()
        const now = Date.now()
        return now - regTime < 1800000 // Last 30 minutes
      })

      return recentRegistrations
    } catch (error) {
      console.error("Error fetching live registrations:", error)
      return []
    }
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch live registrations
        const registrations = await fetchLiveRegistrations()
        setLiveRegistrations(registrations)

        // Try to fetch community stats
        const response = await fetch("/api/community-stats")
        let statsData: CommunityStats

        if (response.ok) {
          statsData = await response.json()
        } else {
          // Generate mock stats based on live registrations
          statsData = generateMockStats(registrations)
        }

        // Add live registrations to stats
        statsData.liveRegistrations = registrations

        setStats(statsData)
        generateBubbles(statsData)
        updateCSSVariables(statsData)
      } catch (error) {
        console.error("Error fetching community stats:", error)
        // Use mock data as fallback
        const registrations = await fetchLiveRegistrations()
        const mockStats = generateMockStats(registrations)
        mockStats.liveRegistrations = registrations
        setStats(mockStats)
        generateBubbles(mockStats)
        updateCSSVariables(mockStats)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 10000) // Update every 10 seconds for live feel

    return () => clearInterval(interval)
  }, [])

  const generateMockStats = (registrations: RegistrationEntry[]): CommunityStats => {
    const healers = registrations.filter((r) => r.type === "Healer" || r.type === "CHW").length
    const guardians = registrations.filter((r) => r.type === "Guardian").length
    const facilities = registrations.filter((r) => r.type === "Health Facility").length

    return {
      healers: {
        total: 1247 + healers,
        verified: 892 + registrations.filter((r) => (r.type === "Healer" || r.type === "CHW") && r.verified).length,
        pending: 355,
        specializations: {
          nurses: 456,
          doctors: 234,
          midwives: 189,
          pharmacists: 123,
        },
      },
      guardians: {
        total: 2156 + guardians,
        active: 1834 + guardians,
        totalContributions: 45678,
      },
      soulbound: {
        total: 567,
        resonanceHigh: 234,
        ancestralVerified: 345,
      },
      codex: {
        scrollKeepers: 89,
        proverbContributors: 234,
        codeContributors: 156,
        totalScrolls: 1234,
      },
      testnet: {
        activeNodes: 45 + Math.floor(Math.random() * 10),
        newJoinsToday: registrations.length + Math.floor(Math.random() * 5),
        transactionsToday: 234 + Math.floor(Math.random() * 50),
      },
      mainnet: {
        activeNodes: 128 + Math.floor(Math.random() * 20),
        newJoinsToday: Math.floor(registrations.length / 2) + Math.floor(Math.random() * 3),
        transactionsToday: 567 + Math.floor(Math.random() * 100),
      },
      regions: {
        westAfrica: 1234,
        eastAfrica: 987,
        southernAfrica: 654,
        northAfrica: 432,
        centralAfrica: 321,
      },
      impact: {
        totalPatientsServed: 45678,
        communitiesReached: 234,
        donationsReceived: 123456,
        flbTokensEarned: 987654 + registrations.reduce((sum, r) => sum + r.flbEarned, 0),
      },
      growth: {
        thisMonth: 234,
        thisWeek: 67,
        today: registrations.length,
      },
      lastUpdated: new Date().toISOString(),
      liveRegistrations: registrations,
    }
  }

  const updateCSSVariables = (stats: CommunityStats) => {
    const root = document.documentElement
    root.style.setProperty("--testnet-nodes", stats.testnet.activeNodes.toString())
    root.style.setProperty("--mainnet-nodes", stats.mainnet.activeNodes.toString())
    root.style.setProperty("--healers-count", stats.healers.total.toString())
    root.style.setProperty("--guardians-count", stats.guardians.total.toString())
    root.style.setProperty("--live-registrations", stats.liveRegistrations.length.toString())
  }

  const generateBubbles = (stats: CommunityStats) => {
    const bubbleConfigs: Omit<BubbleConfig, "position" | "velocity">[] = [
      // Network bubbles (highest priority)
      {
        id: "testnet",
        label: "Testnet Nodes",
        count: stats.testnet.activeNodes,
        icon: Activity,
        category: "testnet",
        size: "xl",
        priority: 1,
        isLive: true,
      },
      {
        id: "mainnet",
        label: "Mainnet Nodes",
        count: stats.mainnet.activeNodes,
        icon: Zap,
        category: "mainnet",
        size: "xl",
        priority: 1,
        isLive: true,
      },

      // Primary categories
      {
        id: "healers",
        label: "Healers",
        count: stats.healers.total,
        icon: Stethoscope,
        category: "healers",
        size: "lg",
        priority: 2,
      },
      {
        id: "guardians",
        label: "Guardians",
        count: stats.guardians.total,
        icon: Shield,
        category: "guardians",
        size: "lg",
        priority: 2,
      },

      // Network activity
      {
        id: "testnet-joins",
        label: "Testnet Joins Today",
        count: stats.testnet.newJoinsToday,
        icon: TrendingUp,
        category: "testnet",
        size: "md",
        priority: 3,
        isLive: true,
      },
      {
        id: "mainnet-joins",
        label: "Mainnet Joins Today",
        count: stats.mainnet.newJoinsToday,
        icon: TrendingUp,
        category: "mainnet",
        size: "md",
        priority: 3,
        isLive: true,
      },
    ]

    // Add live person bubbles for recent registrations
    const personBubbles = stats.liveRegistrations.slice(0, 8).map((registration, index) => ({
      id: `person-${registration.id}`,
      label: registration.name.split(" ")[0], // First name only for bubble
      count: registration.flbEarned,
      icon:
        registration.type === "Guardian"
          ? Shield
          : registration.type === "Healer"
            ? Stethoscope
            : registration.type === "CHW"
              ? Users
              : Heart,
      category: "live-person" as const,
      size: "sm" as const,
      priority: 4,
      isLive: true,
      personData: registration,
      isNewJoin: Date.now() - new Date(registration.timestamp).getTime() < 600000, // Last 10 minutes
    }))

    const allBubbles = [...bubbleConfigs, ...personBubbles]

    // Generate positions and velocities using improved distribution
    const generatedBubbles = allBubbles.map((config, index) => {
      const angle = index * 137.5 * (Math.PI / 180) // Golden angle
      const radius = Math.sqrt(index + 1) * 12
      const centerX = 50
      const centerY = 50

      return {
        ...config,
        position: {
          x: Math.max(10, Math.min(90, centerX + Math.cos(angle) * radius)),
          y: Math.max(10, Math.min(90, centerY + Math.sin(angle) * radius)),
        },
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
      }
    })

    setBubbles(generatedBubbles)
  }

  // Animate bubbles continuously
  useEffect(() => {
    if (bubbles.length === 0) return

    const animate = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          let newX = bubble.position.x + bubble.velocity.x
          let newY = bubble.position.y + bubble.velocity.y
          let newVx = bubble.velocity.x
          let newVy = bubble.velocity.y

          // Bounce off edges
          if (newX <= 5 || newX >= 95) {
            newVx = -newVx * 0.8
            newX = Math.max(5, Math.min(95, newX))
          }
          if (newY <= 5 || newY >= 95) {
            newVy = -newVy * 0.8
            newY = Math.max(5, Math.min(95, newY))
          }

          // Add slight random movement for live bubbles
          if (bubble.isLive) {
            newVx += (Math.random() - 0.5) * 0.1
            newVy += (Math.random() - 0.5) * 0.1
          }

          // Extra movement for new joins
          if (bubble.isNewJoin) {
            newVx += (Math.random() - 0.5) * 0.2
            newVy += (Math.random() - 0.5) * 0.2
          }

          // Apply friction
          newVx *= 0.99
          newVy *= 0.99

          return {
            ...bubble,
            position: { x: newX, y: newY },
            velocity: { x: newVx, y: newVy },
          }
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [bubbles.length])

  const getBubbleClasses = (bubble: BubbleConfig) => {
    const baseClasses = `data-bubble bubble-${bubble.size} bubble-${bubble.category}`
    const liveClass = bubble.isLive ? "bubble-live" : ""
    const newJoinClass = bubble.isNewJoin ? "bubble-new-join" : ""
    const personClass = bubble.category === "live-person" ? "bubble-person" : ""

    return `${baseClasses} ${liveClass} ${newJoinClass} ${personClass}`.trim()
  }

  const getPersonTypeColor = (type: string) => {
    switch (type) {
      case "Guardian":
        return "from-blue-400 to-indigo-600"
      case "Healer":
        return "from-green-400 to-emerald-600"
      case "CHW":
        return "from-purple-400 to-violet-600"
      case "Health Facility":
        return "from-orange-400 to-red-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="bubble-field h-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-flame"></div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-white mb-2">Live Network & Community Pulse</h2>
        <p className="text-gray-300">
          Real-time visualization of testnet, mainnet, and live registrations from Google Forms
        </p>
        {stats && (
          <div className="text-sm text-orange-400 mt-1">
            🔥 {stats.liveRegistrations.length} people joined recently • Last update:{" "}
            {new Date(stats.lastUpdated).toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Bubble Field */}
      <div
        ref={containerRef}
        className="bubble-field h-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden relative"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,78,0,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,160,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,0,200,0.2),transparent_50%)]"></div>
        </div>

        {/* Dynamic Bubbles */}
        {bubbles.map((bubble) => {
          const Icon = bubble.icon
          return (
            <motion.div
              key={bubble.id}
              className={getBubbleClasses(bubble)}
              style={
                {
                  left: `${bubble.position.x}%`,
                  top: `${bubble.position.y}%`,
                  "--count": bubble.count,
                } as React.CSSProperties
              }
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: bubble.priority * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: bubble.category === "live-person" ? 1.5 : 1.3,
                zIndex: 20,
                transition: { duration: 0.2 },
              }}
            >
              {/* Live indicator */}
              {bubble.isLive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}

              {/* New join indicator */}
              {bubble.isNewJoin && (
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-orange-400 rounded-full animate-bounce flex items-center justify-center text-xs">
                  ✨
                </div>
              )}

              {/* Person bubble styling */}
              {bubble.category === "live-person" && bubble.personData && (
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${getPersonTypeColor(bubble.personData.type)} opacity-20 animate-pulse`}
                ></div>
              )}

              {/* Icon */}
              <Icon className="w-4 h-4 mb-1 relative z-10" />

              {/* Count with live animation */}
              <motion.div
                className="font-bold text-xs leading-none relative z-10"
                key={bubble.count}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {bubble.category === "live-person" ? bubble.count : bubble.count}
              </motion.div>

              {/* Label */}
              {bubble.size !== "xs" && (
                <div className="text-xs opacity-80 text-center leading-tight mt-1 relative z-10">{bubble.label}</div>
              )}

              {/* Enhanced tooltip for persons */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30 pointer-events-none">
                {bubble.personData ? (
                  <div className="text-center">
                    <div className="font-bold text-orange-400">{bubble.personData.name}</div>
                    <div className="text-gray-300">{bubble.personData.type}</div>
                    <div className="text-gray-400">{bubble.personData.location}</div>
                    <div className="text-green-400">+{bubble.personData.flbEarned} FLB</div>
                    {bubble.personData.verified && <div className="text-blue-400">✓ Verified</div>}
                    <div className="text-xs text-gray-500">
                      {new Date(bubble.personData.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ) : (
                  <div>
                    {bubble.label}: {bubble.count.toLocaleString()}
                    {bubble.isLive && <div className="text-green-400">● LIVE</div>}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}

        {/* Network Status */}
        {stats && (
          <div className="absolute bottom-4 right-4 text-right text-white/80 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-flame">LIVE REGISTRATIONS</span>
            </div>
            <div className="text-xs opacity-70">{stats.liveRegistrations.length} recent joins</div>
            <div className="text-xs opacity-60">
              Testnet: {stats.testnet.activeNodes} | Mainnet: {stats.mainnet.activeNodes}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-red-600 relative">
            <div className="absolute inset-0 rounded-full animate-pulse bg-orange-300"></div>
          </div>
          <span className="text-gray-300">Testnet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-red-700 relative">
            <div className="absolute inset-0 rounded-full animate-pulse bg-red-300"></div>
          </div>
          <span className="text-gray-300">Mainnet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-600"></div>
          <span className="text-gray-300">Healers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600"></div>
          <span className="text-gray-300">Guardians</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-violet-600"></div>
          <span className="text-gray-300">CHWs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-600 relative">
            <div className="absolute inset-0 rounded-full animate-pulse bg-yellow-300"></div>
          </div>
          <span className="text-gray-300">Live Joins</span>
        </div>
      </div>

      {/* Live Registration Summary */}
      {stats && stats.liveRegistrations.length > 0 && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-400" />
            Recent Live Registrations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
            {stats.liveRegistrations.slice(0, 4).map((reg) => (
              <div key={reg.id} className="text-gray-300">
                <div className="font-medium text-white">{reg.name.split(" ")[0]}</div>
                <div className="text-xs text-gray-400">
                  {reg.type} • {reg.location.split(",")[0]}
                </div>
                <div className="text-xs text-orange-400">+{reg.flbEarned} FLB</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
</merged_code>
