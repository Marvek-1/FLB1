"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, PieChart, BarChart, Users } from "lucide-react"
// Assuming HealthcareWorker type is defined in a central types file
import type { HealthcareWorker } from "@/lib/types/healthcare-worker"

interface DonationDistributionChartProps {
  workers: HealthcareWorker[]
  isLoading?: boolean
}

export function DonationDistributionChart({ workers, isLoading = false }: DonationDistributionChartProps) {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie")
  const [sortedWorkers, setSortedWorkers] = useState<HealthcareWorker[]>([])

  // Sort workers by distribution percentage
  useEffect(() => {
    if (workers) {
      const sorted = [...workers].sort((a, b) => (b.distributionPercentage || 0) - (a.distributionPercentage || 0))
      setSortedWorkers(sorted)
    }
  }, [workers])

  // Generate random colors for chart segments
  const getColor = (index: number) => {
    const colors = [
      "rgb(59, 130, 246)", // blue-500
      "rgb(16, 185, 129)", // emerald-500
      "rgb(239, 68, 68)", // red-500
      "rgb(245, 158, 11)", // amber-500
      "rgb(139, 92, 246)", // violet-500
      "rgb(20, 184, 166)", // teal-500
      "rgb(236, 72, 153)", // pink-500
      "rgb(251, 146, 60)", // orange-400
      "rgb(129, 140, 248)", // indigo-400
      "rgb(52, 211, 153)", // emerald-400
    ]
    return colors[index % colors.length]
  }

  // Render pie chart segments
  const renderPieSegments = () => {
    const total = 100
    let cumulativePercentage = 0

    return sortedWorkers.map((worker, index) => {
      const percentage = worker.distributionPercentage || 0
      if (percentage === 0) return null // Don't render segment for 0%

      const startAngle = (cumulativePercentage / total) * 360
      cumulativePercentage += percentage
      const endAngle = (cumulativePercentage / total) * 360

      // Calculate SVG arc path
      const radius = 80
      const centerX = 100
      const centerY = 100

      // Convert angles to radians
      const startRad = ((startAngle - 90) * Math.PI) / 180
      const endRad = ((endAngle - 90) * Math.PI) / 180

      // Calculate points
      const x1 = centerX + radius * Math.cos(startRad)
      const y1 = centerY + radius * Math.sin(startRad)
      const x2 = centerX + radius * Math.cos(endRad)
      const y2 = centerY + radius * Math.sin(endRad)

      // Determine if the arc should be drawn as a large arc
      const largeArcFlag = endAngle - startAngle >= 180 ? 1 : 0 // Use >= for full circle segment

      // Create the arc path
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ")

      return (
        <path
          key={worker.id}
          d={pathData}
          fill={getColor(index)}
          stroke="#0F172A" // Use a dark stroke for better contrast on light segments
          strokeWidth="1"
        >
          <title>
            {worker.name}: {percentage.toFixed(1)}%
          </title>
        </path>
      )
    })
  }

  // Render bar chart
  const renderBarChart = () => {
    const maxBarHeight = 150
    const barWidth = 30
    const gap = 15
    const totalWidth = sortedWorkers.length * (barWidth + gap) - gap

    if (sortedWorkers.length === 0) return <p className="text-center text-blue-100/70">No data for bar chart.</p>

    return (
      <svg width="100%" height="200" viewBox={`0 0 ${Math.max(totalWidth, 200)} ${maxBarHeight + 30}`} className="mt-4">
        {/* X-axis */}
        <line
          x1="0"
          y1={maxBarHeight}
          x2={totalWidth > 0 ? totalWidth : 200}
          y2={maxBarHeight}
          stroke="rgba(147, 197, 253, 0.3)"
          strokeWidth="1"
        />

        {/* Bars */}
        {sortedWorkers.map((worker, index) => {
          const percentage = worker.distributionPercentage || 0
          const barHeight = (percentage / 100) * maxBarHeight
          const x = index * (barWidth + gap)
          const y = maxBarHeight - barHeight

          return (
            <g key={worker.id}>
              <rect x={x} y={y} width={barWidth} height={barHeight} fill={getColor(index)} rx="2" ry="2">
                <title>
                  {worker.name}: {percentage.toFixed(1)}%
                </title>
              </rect>

              {/* Percentage label */}
              <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="10" fill="rgba(147, 197, 253, 0.8)">
                {percentage.toFixed(1)}%
              </text>

              {/* Name label (abbreviated) */}
              <text
                x={x + barWidth / 2}
                y={maxBarHeight + 15}
                textAnchor="middle"
                fontSize="8"
                fill="rgba(147, 197, 253, 0.8)"
                transform={`rotate(45, ${x + barWidth / 2}, ${maxBarHeight + 15})`}
              >
                {worker.name.split(" ")[1]?.substring(0, 5) || worker.name.split(" ")[0].substring(0, 5)}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <Card className="border-blue-500/30 bg-black/60 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-300">Donation Distribution</CardTitle>
          <Tabs value={chartType} onValueChange={(value) => setChartType(value as "pie" | "bar")}>
            <TabsList className="bg-blue-950/30 border border-blue-500/30">
              <TabsTrigger value="pie" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <PieChart className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="bar" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <BarChart className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 mr-2 animate-spin text-blue-400" />
            <span className="text-blue-100/70">Calculating distribution...</span>
          </div>
        ) : sortedWorkers.length === 0 ? (
          <div className="text-center py-8 text-blue-100/70">No healthcare worker data available for distribution.</div>
        ) : (
          <>
            <TabsContent value="pie" className="mt-0">
              <div className="flex justify-center py-4">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {renderPieSegments()}
                  <circle cx="100" cy="100" r="40" fill="#0F172A" /> {/* Center circle to match dark bg */}
                </svg>
              </div>
            </TabsContent>

            <TabsContent value="bar" className="mt-0">
              {renderBarChart()}
            </TabsContent>

            <div className="mt-4 space-y-2">
              <div className="text-sm text-blue-100/70 flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Healthcare Worker Distribution</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {sortedWorkers.map((worker, index) => (
                  <Badge
                    key={worker.id}
                    variant="outline"
                    className="flex items-center gap-1 bg-blue-950/20 border-blue-500/30 text-blue-100/80"
                  >
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: getColor(index) }} />
                    <span>
                      {worker.name.split(" ")[1]?.substring(0, 10) || worker.name.split(" ")[0].substring(0, 10)}
                    </span>
                    <span className="text-blue-300">{worker.distributionPercentage?.toFixed(1)}%</span>
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
