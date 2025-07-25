"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { useMobile } from "@/hooks/use-mobile"

type Node = {
  id: string
  name: string
  val: number
  color: string
  group?: string
  x: number
  y: number
  vx: number
  vy: number
  fx?: number
  fy?: number
  isNew?: boolean
  joinedAt?: number
  networkType: "testnet" | "mainnet"
}

type Link = {
  source: string
  target: string
  value: number
  strength: number
}

type GraphData = {
  nodes: Node[]
  links: Link[]
}

type NetworkGraphProps = {
  centerNodeId?: string
  segment?: string
}

const TESTNET_COLORS = {
  center: "#FF6B35", // FlameBorn orange
  healer: "#00A86B", // Medical green
  guardian: "#0077B5", // Professional blue
  chw: "#9B59B6", // Community purple
  facility: "#E74C3C", // Emergency red
  new: "#F39C12", // New member gold
}

const MAINNET_COLORS = {
  center: "#FF4500", // Deeper orange for mainnet
  healer: "#228B22", // Forest green
  guardian: "#4169E1", // Royal blue
  chw: "#8A2BE2", // Blue violet
  facility: "#DC143C", // Crimson
  new: "#FFD700", // Gold
}

const generateLiveNodes = (count: number, centerNodeId: string, networkType: "testnet" | "mainnet"): Node[] => {
  const colors = networkType === "testnet" ? TESTNET_COLORS : MAINNET_COLORS

  const nodes: Node[] = [
    {
      id: centerNodeId,
      name: `FlameBorn ${networkType === "testnet" ? "Testnet" : "Mainnet"} Hub`,
      val: 8,
      color: colors.center,
      group: "center",
      x: 400,
      y: 300,
      vx: 0,
      vy: 0,
      fx: 400,
      fy: 300,
      networkType,
    },
  ]

  const nodeTypes = [
    {
      type: "healer",
      color: colors.healer,
      names: ["Dr. Amara Kone", "Dr. Kwame Asante", "Dr. Fatima Al-Rashid", "Dr. John Mwangi"],
    },
    {
      type: "guardian",
      color: colors.guardian,
      names: ["Guardian Sarah", "Guardian Ahmed", "Guardian Zara", "Guardian Kofi"],
    },
    { type: "chw", color: colors.chw, names: ["CHW Aisha", "CHW Babatunde", "CHW Naledi", "CHW Kemi"] },
    {
      type: "facility",
      color: colors.facility,
      names: ["Lagos General", "Nairobi Health Center", "Accra Medical", "Cairo Clinic"],
    },
  ]

  const locations = [
    "Lagos, Nigeria",
    "Nairobi, Kenya",
    "Accra, Ghana",
    "Cairo, Egypt",
    "Kano, Nigeria",
    "Kampala, Uganda",
    "Dakar, Senegal",
    "Addis Ababa, Ethiopia",
    "Casablanca, Morocco",
    "Cape Town, South Africa",
    "Abidjan, Ivory Coast",
    "Dar es Salaam, Tanzania",
  ]

  for (let i = 1; i <= count; i++) {
    const nodeType = nodeTypes[i % nodeTypes.length]
    const angle = (i / count) * 2 * Math.PI + Math.sin(Date.now() * 0.001 + i) * 0.1
    const radius = 150 + Math.sin(Date.now() * 0.0005 + i) * 50
    const baseX = 400 + Math.cos(angle) * radius
    const baseY = 300 + Math.sin(angle) * radius

    const isNewNode = Math.random() > 0.95 // 5% chance of being a new node
    const joinedRecently = Date.now() - Math.random() * 300000 // Joined within last 5 minutes

    nodes.push({
      id: `${networkType}-node-${i}`,
      name: `${nodeType.names[i % nodeType.names.length]} ${Math.ceil(i / nodeType.names.length)}`,
      val: isNewNode ? 5 : 2 + Math.random() * 3,
      color: isNewNode ? colors.new : nodeType.color,
      group: nodeType.type,
      x: baseX + (Math.random() - 0.5) * 100,
      y: baseY + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      isNew: isNewNode,
      joinedAt: joinedRecently,
      networkType,
    })
  }

  return nodes
}

const generateLiveLinks = (nodes: Node[], centerNodeId: string): Link[] => {
  const links: Link[] = []

  // Connect all nodes to center with varying strength
  nodes.forEach((node) => {
    if (node.id !== centerNodeId) {
      const distance = Math.sqrt(Math.pow(node.x - 400, 2) + Math.pow(node.y - 300, 2))
      const strength = Math.max(0.1, 1 - distance / 300)

      links.push({
        source: centerNodeId,
        target: node.id,
        value: node.isNew ? 3 : 1,
        strength,
      })
    }
  })

  // Create dynamic connections between nodes
  const nonCenterNodes = nodes.filter((node) => node.id !== centerNodeId)
  for (let i = 0; i < nonCenterNodes.length; i++) {
    for (let j = i + 1; j < nonCenterNodes.length; j++) {
      const node1 = nonCenterNodes[i]
      const node2 = nonCenterNodes[j]

      // Higher chance of connection if nodes are of same type or nearby
      const sameType = node1.group === node2.group
      const distance = Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2))

      const connectionChance = sameType ? 0.15 : 0.05
      const distanceBonus = distance < 100 ? 0.1 : 0

      if (Math.random() < connectionChance + distanceBonus) {
        links.push({
          source: node1.id,
          target: node2.id,
          value: 1,
          strength: 0.3,
        })
      }
    }
  }

  return links
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ centerNodeId = "flameborn-hub", segment }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const isMobile = useMobile()

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [testnetData, setTestnetData] = useState<GraphData>({ nodes: [], links: [] })
  const [mainnetData, setMainnetData] = useState<GraphData>({ nodes: [], links: [] })
  const [activeNetwork, setActiveNetwork] = useState<"testnet" | "mainnet">("testnet")
  const [stats, setStats] = useState({
    testnet: { nodes: 0, newJoins: 0 },
    mainnet: { nodes: 0, newJoins: 0 },
  })

  // Physics simulation parameters
  const forceStrength = 0.03
  const centerForce = 0.02
  const repelForce = 30
  const dampening = 0.95

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width: Math.max(width, 400), height: Math.max(height, 300) })
    }
  }, [])

  // Initialize and update network data
  useEffect(() => {
    const initializeNetworks = () => {
      // Generate testnet data
      const testnetNodes = generateLiveNodes(25, `${centerNodeId}-testnet`, "testnet")
      const testnetLinks = generateLiveLinks(testnetNodes, `${centerNodeId}-testnet`)
      setTestnetData({ nodes: testnetNodes, links: testnetLinks })

      // Generate mainnet data
      const mainnetNodes = generateLiveNodes(40, `${centerNodeId}-mainnet`, "mainnet")
      const mainnetLinks = generateLiveLinks(mainnetNodes, `${centerNodeId}-mainnet`)
      setMainnetData({ nodes: mainnetNodes, links: mainnetLinks })

      // Update stats
      setStats({
        testnet: {
          nodes: testnetNodes.length - 1,
          newJoins: testnetNodes.filter((n) => n.isNew).length,
        },
        mainnet: {
          nodes: mainnetNodes.length - 1,
          newJoins: mainnetNodes.filter((n) => n.isNew).length,
        },
      })
    }

    initializeNetworks()
    updateDimensions()

    // Update networks every 10 seconds to simulate live joining
    const networkInterval = setInterval(() => {
      initializeNetworks()
    }, 10000)

    // Resize listener
    window.addEventListener("resize", updateDimensions)

    return () => {
      clearInterval(networkInterval)
      window.removeEventListener("resize", updateDimensions)
    }
  }, [centerNodeId, updateDimensions])

  // Physics simulation and rendering
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const currentData = activeNetwork === "testnet" ? testnetData : mainnetData
    if (currentData.nodes.length === 0) return

    const nodes = [...currentData.nodes]
    const links = currentData.links

    const simulate = () => {
      // Apply forces
      nodes.forEach((node, i) => {
        if (node.fx !== undefined && node.fy !== undefined) return // Skip fixed nodes

        let fx = 0,
          fy = 0

        // Center attraction
        const centerX = dimensions.width / 2
        const centerY = dimensions.height / 2
        const dcx = centerX - node.x
        const dcy = centerY - node.y
        const centerDistance = Math.sqrt(dcx * dcx + dcy * dcy)

        if (centerDistance > 0) {
          fx += (dcx / centerDistance) * centerForce * centerDistance * 0.01
          fy += (dcy / centerDistance) * centerForce * centerDistance * 0.01
        }

        // Node repulsion
        nodes.forEach((other, j) => {
          if (i === j) return
          const dx = node.x - other.x
          const dy = node.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 0 && distance < 100) {
            const force = repelForce / (distance * distance)
            fx += (dx / distance) * force
            fy += (dy / distance) * force
          }
        })

        // Link forces
        links.forEach((link) => {
          if (link.source === node.id) {
            const target = nodes.find((n) => n.id === link.target)
            if (target) {
              const dx = target.x - node.x
              const dy = target.y - node.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const targetDistance = 80

              if (distance > 0) {
                const force = (distance - targetDistance) * link.strength * forceStrength
                fx += (dx / distance) * force
                fy += (dy / distance) * force
              }
            }
          }
          if (link.target === node.id) {
            const source = nodes.find((n) => n.id === link.source)
            if (source) {
              const dx = source.x - node.x
              const dy = source.y - node.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const targetDistance = 80

              if (distance > 0) {
                const force = (distance - targetDistance) * link.strength * forceStrength
                fx += (dx / distance) * force
                fy += (dy / distance) * force
              }
            }
          }
        })

        // Apply forces to velocity
        node.vx += fx
        node.vy += fy

        // Apply dampening
        node.vx *= dampening
        node.vy *= dampening

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Boundary constraints
        const margin = 50
        if (node.x < margin) {
          node.x = margin
          node.vx = 0
        }
        if (node.x > dimensions.width - margin) {
          node.x = dimensions.width - margin
          node.vx = 0
        }
        if (node.y < margin) {
          node.y = margin
          node.vy = 0
        }
        if (node.y > dimensions.height - margin) {
          node.y = dimensions.height - margin
          node.vy = 0
        }
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      const time = Date.now() * 0.001

      // Draw links with animation
      ctx.strokeStyle = activeNetwork === "testnet" ? "rgba(255,107,53,0.3)" : "rgba(255,69,0,0.4)"
      ctx.lineWidth = 1

      links.forEach((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source)
        const targetNode = nodes.find((n) => n.id === link.target)

        if (sourceNode && targetNode) {
          const opacity = 0.2 + Math.sin(time * 2 + link.value) * 0.1
          ctx.strokeStyle = activeNetwork === "testnet" ? `rgba(255,107,53,${opacity})` : `rgba(255,69,0,${opacity})`

          ctx.beginPath()
          ctx.moveTo(sourceNode.x, sourceNode.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.stroke()
        }
      })

      // Draw nodes with enhanced animation
      nodes.forEach((node) => {
        const isPulseNode = node.group === "center"
        const isNewNode = node.isNew

        let pulseIntensity = 1
        let glowIntensity = 5

        if (isPulseNode) {
          pulseIntensity = 1 + Math.sin(time * 3) * 0.3
          glowIntensity = 20 + Math.sin(time * 4) * 10
        } else if (isNewNode) {
          pulseIntensity = 1 + Math.sin(time * 5) * 0.4
          glowIntensity = 10 + Math.sin(time * 6) * 5
        } else {
          pulseIntensity = 1 + Math.sin(time * 0.5 + Number.parseInt(node.id.slice(-2) || "0")) * 0.1
          glowIntensity = 3 + Math.sin(time * 0.3) * 2
        }

        const baseSize = node.val * 3
        const size = baseSize * pulseIntensity

        // Enhanced glow effect
        ctx.shadowColor = node.color
        ctx.shadowBlur = glowIntensity

        // Main node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI)
        ctx.fillStyle = node.color
        ctx.fill()

        // Additional rings for special nodes
        if (isPulseNode) {
          ctx.beginPath()
          const ringRadius = size + 10 + Math.sin(time * 4) * 5
          ctx.arc(node.x, node.y, ringRadius, 0, 2 * Math.PI)
          ctx.strokeStyle = node.color + "60"
          ctx.lineWidth = 2
          ctx.stroke()
        }

        if (isNewNode) {
          ctx.beginPath()
          const newRingRadius = size + 5 + Math.sin(time * 8) * 3
          ctx.arc(node.x, node.y, newRingRadius, 0, 2 * Math.PI)
          ctx.strokeStyle = "#FFD700" + "80"
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        ctx.shadowBlur = 0
      })
    }

    const animate = () => {
      simulate()
      render()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [testnetData, mainnetData, activeNetwork, dimensions])

  return (
    <div className="relative">
      {/* Network Toggle */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => setActiveNetwork("testnet")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeNetwork === "testnet"
              ? "bg-orange-500 text-white shadow-lg"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          Testnet ({stats.testnet.nodes})
        </button>
        <button
          onClick={() => setActiveNetwork("mainnet")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeNetwork === "mainnet"
              ? "bg-red-500 text-white shadow-lg"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          Mainnet ({stats.mainnet.nodes})
        </button>
      </div>

      {/* Live Stats */}
      <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <div className="flex items-center gap-2 mb-1">
          <div
            className={`w-2 h-2 rounded-full ${activeNetwork === "testnet" ? "bg-orange-500" : "bg-red-500"} animate-pulse`}
          ></div>
          <span className="font-medium">{activeNetwork.toUpperCase()} LIVE</span>
        </div>
        <div className="text-xs text-gray-300">
          New joins: {activeNetwork === "testnet" ? stats.testnet.newJoins : stats.mainnet.newJoins}
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="w-full h-full bg-black rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full cursor-pointer" style={{ display: "block" }} />
      </div>

      {/* Network Info */}
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">
              FlameBorn {activeNetwork === "testnet" ? "Testnet" : "Mainnet"} Network
            </h3>
            <p className="text-sm text-gray-300">
              Live visualization of {activeNetwork === "testnet" ? "testing" : "production"} network participants
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-400">
              {activeNetwork === "testnet" ? stats.testnet.nodes : stats.mainnet.nodes}
            </div>
            <div className="text-xs text-gray-400">Active Nodes</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkGraph
