"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { MapPin, Info } from "lucide-react"

// Mock data for map points
const MAP_POINTS: any[] = []

export function PulseMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<(typeof MAP_POINTS)[0] | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  // Function to convert lat/lng to canvas coordinates
  const latLngToCanvas = (lat: number, lng: number) => {
    // Simple conversion for demonstration
    const x = ((lng + 180) / 360) * canvasSize.width
    const y = ((90 - lat) / 180) * canvasSize.height
    return { x, y }
  }

  // Initialize and draw the map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      const container = canvas.parentElement
      if (!container) return

      const { width, height } = container.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      setCanvasSize({ width, height })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Draw the map and points
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || canvasSize.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawMap = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw simplified Africa outline
      ctx.beginPath()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 1

      // Very simplified Africa outline - just for demonstration
      const africaOutline = [
        { lat: 35.9, lng: -5.8 }, // Morocco
        { lat: 37.3, lng: 9.8 }, // Tunisia
        { lat: 31.7, lng: 25.1 }, // Egypt
        { lat: 15.3, lng: 38.9 }, // Eritrea
        { lat: 11.8, lng: 43.1 }, // Djibouti
        { lat: 1.6, lng: 41.5 }, // Somalia
        { lat: -4.6, lng: 39.2 }, // Tanzania
        { lat: -34.8, lng: 20.0 }, // South Africa
        { lat: -22.9, lng: 14.5 }, // Namibia
        { lat: 6.4, lng: 3.4 }, // Nigeria
        { lat: 14.7, lng: -17.4 }, // Senegal
        { lat: 31.8, lng: -7.0 }, // Morocco (back to start)
      ]

      // Draw the outline
      ctx.beginPath()
      let firstPoint = true
      africaOutline.forEach((point) => {
        const { x, y } = latLngToCanvas(point.lat, point.lng)
        if (firstPoint) {
          ctx.moveTo(x, y)
          firstPoint = false
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.closePath()
      ctx.stroke()

      // Fill with a subtle gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )
      gradient.addColorStop(0, "rgba(255, 78, 0, 0.05)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw points
      MAP_POINTS.forEach((point) => {
        const { x, y } = latLngToCanvas(point.lat, point.lng)

        // Draw glow
        const isHovered = hoveredPoint?.id === point.id
        const radius = isHovered ? 15 : 10
        const alpha = isHovered ? 0.6 : 0.3

        // Glow effect
        ctx.beginPath()
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2)
        glowGradient.addColorStop(0, `rgba(255, 78, 0, ${alpha})`)
        glowGradient.addColorStop(1, "rgba(255, 78, 0, 0)")
        ctx.fillStyle = glowGradient
        ctx.fill()

        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, radius / 2, 0, Math.PI * 2)
        ctx.fillStyle = point.color
        ctx.fill()

        // Draw pulse animation
        if (isHovered) {
          ctx.beginPath()
          ctx.arc(x, y, radius * 3, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 78, 0, ${Math.sin(Date.now() / 200) * 0.2 + 0.2})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })
    }

    drawMap()

    // Animation frame
    const animationFrame = requestAnimationFrame(() => {
      if (hoveredPoint) {
        // Redraw only if there's a hovered point to animate
        drawMap()
      }
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [canvasSize, hoveredPoint])

  // Handle mouse movement to detect hovering over points
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if mouse is over any point
    let hoveredPoint = null
    for (const point of MAP_POINTS) {
      const canvasPoint = latLngToCanvas(point.lat, point.lng)
      const distance = Math.sqrt(Math.pow(x - canvasPoint.x, 2) + Math.pow(y - canvasPoint.y, 2))

      if (distance < 20) {
        // Detection radius
        hoveredPoint = point
        break
      }
    }

    setHoveredPoint(hoveredPoint)
  }

  return (
    <Card className="bg-ash-gray/30 border border-gray-700 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-heading flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-flame" />
          Flameborn Global Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div className="aspect-[4/3] w-full relative">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" onMouseMove={handleMouseMove} />

          {MAP_POINTS.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-500 opacity-30" />
                <p className="text-gray-500">No impact data available yet.</p>
                <p className="text-gray-500 text-sm">
                  Data will appear as health workers are verified and donations are made.
                </p>
              </div>
            </div>
          )}

          {hoveredPoint && (
            <div
              className="absolute bg-black/80 border border-flame/50 rounded-md p-3 z-10 pointer-events-none"
              style={{
                left: latLngToCanvas(hoveredPoint.lat, hoveredPoint.lng).x + 10,
                top: latLngToCanvas(hoveredPoint.lat, hoveredPoint.lng).y + 10,
              }}
            >
              <div className="font-bold text-white">{hoveredPoint.country}</div>
              <div className="text-flame">{hoveredPoint.chws} Verified CHWs</div>
            </div>
          )}

          <div className="absolute bottom-2 right-2 bg-black/50 text-xs text-gray-400 p-1 rounded flex items-center">
            <Info className="h-3 w-3 mr-1" /> Hover over points to see details
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
