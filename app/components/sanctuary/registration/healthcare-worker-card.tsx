"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
import { CheckCircle, MapPin, Clock, Users, AlertTriangle, Calendar, ChevronDown, ChevronUp, Heart } from "lucide-react"
import type { HealthcareWorker } from "@/app/lib/types/healthcare-worker" // Adjusted import path
import Image from "next/image"

interface HealthcareWorkerCardProps {
  worker: HealthcareWorker
  onDonate: (worker: HealthcareWorker) => void
  showDistribution?: boolean
}

export function HealthcareWorkerCard({ worker, onDonate, showDistribution = true }: HealthcareWorkerCardProps) {
  const [expanded, setExpanded] = useState(false)

  // Format percentage to 1 decimal place
  const formatPercentage = (percentage?: number) => {
    if (percentage === undefined || isNaN(percentage)) return "0.0%"
    return `${percentage.toFixed(1)}%`
  }

  // Calculate days since last active
  const daysSinceActive = worker.impactMetrics?.lastActiveTimestamp
    ? Math.floor((Date.now() - new Date(worker.impactMetrics.lastActiveTimestamp).getTime()) / (1000 * 60 * 60 * 24))
    : Number.POSITIVE_INFINITY // Handle cases where lastActiveTimestamp might be missing or invalid

  // Get activity status
  const getActivityStatus = () => {
    if (daysSinceActive === Number.POSITIVE_INFINITY || daysSinceActive < 0)
      return { label: "Activity N/A", color: "text-gray-400" }
    if (daysSinceActive === 0) return { label: "Active today", color: "text-green-400" }
    if (daysSinceActive === 1) return { label: "Active yesterday", color: "text-green-400" }
    if (daysSinceActive <= 7) return { label: `Active ${daysSinceActive} days ago`, color: "text-yellow-400" }
    return { label: `Last active ${daysSinceActive} days ago`, color: "text-red-400" }
  }

  const activityStatus = getActivityStatus()

  return (
    <Card className="border-blue-500/30 bg-black/60 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col h-full">
      <CardHeader className="pb-2 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {worker.profileImage && (
              <div className="h-12 w-12 rounded-full overflow-hidden border border-blue-500/30 flex-shrink-0">
                <Image
                  src={worker.profileImage || `/placeholder.svg?width=48&height=48&text=${worker.name[0]}`}
                  alt={worker.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-bold text-blue-100">{worker.name}</h3>
              <p className="text-sm text-blue-100/70">{worker.credentials}</p>
            </div>
          </div>

          {worker.isVerified && (
            <Badge
              variant="outline"
              className="bg-green-950/30 text-green-300 border-green-500/30 text-xs whitespace-nowrap"
            >
              <CheckCircle className="h-3 w-3 mr-1" /> Verified
            </Badge>
          )}
        </div>

        {showDistribution && worker.distributionPercentage !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-blue-100/70">Impact Score</span>
              <span className="text-blue-300 font-medium">{formatPercentage(worker.distributionPercentage)}</span>
            </div>
            <Progress value={worker.distributionPercentage || 0} max={100} className="h-1.5 bg-blue-950/50" />
          </div>
        )}
      </CardHeader>

      <CardContent className="pb-3 flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className="text-blue-100/70">{worker.location?.name || "N/A"}</span>
            {(worker.location?.accessibilityScore || 0) >= 7 && (
              <Badge variant="outline" className="bg-orange-950/30 text-orange-300 border-orange-500/30 text-xs">
                Remote Area
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className={`${activityStatus.color}`}>{activityStatus.label}</span>
          </div>

          {expanded && (
            <div className="mt-3 space-y-3 pt-3 border-t border-blue-500/20">
              <p className="text-sm text-blue-100/80">{worker.bio || "No bio available."}</p>

              {worker.impactMetrics && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-blue-100/70">{worker.impactMetrics.patientsServed || 0} patients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-blue-100/70">{worker.impactMetrics.criticalCases || 0} critical cases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-blue-100/70">{worker.impactMetrics.responseTimeAvg || 0}min response</span>
                  </div>
                </div>
              )}

              {worker.specializations && worker.specializations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {worker.specializations.map((spec, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-950/30 text-blue-300 border-blue-500/30">
                      {spec.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-0 mt-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-blue-300 hover:text-blue-100 hover:bg-blue-950/50"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" /> Less Info
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" /> More Info
            </>
          )}
        </Button>

        <Button size="sm" onClick={() => onDonate(worker)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Heart className="h-4 w-4 mr-1" /> Donate
        </Button>
      </CardFooter>
    </Card>
  )
}
