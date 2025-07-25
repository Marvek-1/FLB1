"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Activity, Shield, Heart, Clock } from "lucide-react"

// Mock data for activity feed
const INITIAL_ACTIVITIES: any[] = []

// Helper function to get badge color based on activity type
const getActivityColor = (type: string) => {
  switch (type) {
    case "verification":
      return "bg-guardian/20 text-guardian hover:bg-guardian/30"
    case "donation":
      return "bg-pulse/20 text-pulse hover:bg-pulse/30"
    case "registration":
      return "bg-flame/20 text-flame hover:bg-flame/30"
    case "achievement":
      return "bg-neon/20 text-neon hover:bg-neon/30"
    default:
      return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
  }
}

export function PulseActivity() {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES)
  const [filter, setFilter] = useState("all")

  // Simulate real-time updates
  useEffect(() => {
    // In a real implementation, this would connect to a WebSocket or polling API
    // For now, we'll leave it empty to allow manual data entry

    return () => {} // Empty cleanup function
  }, [])

  // Filter activities
  const filteredActivities = filter === "all" ? activities : activities.filter((activity) => activity.type === filter)

  return (
    <Card className="bg-ash-gray/30 border border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-heading flex items-center">
            <Activity className="h-5 w-5 mr-2 text-neon" />
            Live Activity Feed
          </CardTitle>

          <div className="flex gap-1">
            <Badge
              className={`cursor-pointer ${filter === "all" ? "bg-neon text-black" : "bg-gray-800 text-gray-400"}`}
              onClick={() => setFilter("all")}
            >
              All
            </Badge>
            <Badge
              className={`cursor-pointer ${filter === "verification" ? "bg-guardian text-black" : "bg-gray-800 text-gray-400"}`}
              onClick={() => setFilter("verification")}
            >
              <Shield className="h-3 w-3 mr-1" /> Verifications
            </Badge>
            <Badge
              className={`cursor-pointer ${filter === "donation" ? "bg-pulse text-white" : "bg-gray-800 text-gray-400"}`}
              onClick={() => setFilter("donation")}
            >
              <Heart className="h-3 w-3 mr-1" /> Donations
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-md bg-black/20 hover:bg-black/30 transition-colors"
            >
              <div className={`p-2 rounded-full bg-gray-800 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{activity.user}</span>
                  <span className="text-gray-400">{activity.action}</span>
                  <span className="font-medium text-white">{activity.target}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{activity.time}</span>
                  <span className="mx-1">•</span>
                  <span>{activity.location}</span>
                </div>
              </div>

              <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
            </div>
          ))}

          {filteredActivities.length === 0 && (
            <div className="text-center py-12 bg-dusk rounded-lg">
              <Activity className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />
              <h3 className="text-xl font-heading mb-2 text-white">No Activity Yet</h3>
              <p className="text-gray-400">Activities will appear here as users interact with the platform.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
