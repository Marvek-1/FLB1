"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { UserCheck, HeartHandshake, DollarSign, Users } from "lucide-react"
import { Skeleton } from "@/app/components/ui/skeleton"

// Type for stats
type PulseStatsData = {
  verifiedCHWs: number
  activeGuardians: number
  totalSupport: number
  livesImpacted: number
  totalUsers: number
  lastUpdated: string
}

export function PulseStats() {
  const [stats, setStats] = useState<Partial<PulseStatsData>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats")
        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError("Failed to load statistics")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Stat card component
  const StatCard = ({
    title,
    value,
    icon: Icon,
    isLoading,
    isError,
    colorClass,
  }: {
    title: string
    value: number | string
    icon: React.ElementType
    isLoading: boolean
    isError: boolean
    colorClass?: string
  }) => (
    <Card
      className={`bg-gradient-to-br ${colorClass ? `${colorClass}/20 to-${colorClass}/5 border border-${colorClass}/20` : "from-background to-muted border"} shadow-lg rounded-xl overflow-hidden relative group`}
    >
      {colorClass && (
        <div
          className={`absolute inset-0 bg-${colorClass}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        ></div>
      )}
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${colorClass ? `text-${colorClass}` : "text-primary"}`} />
      </CardHeader>
      <CardContent className="relative z-10">
        {isError ? (
          <div className="text-red-500 text-sm">Data unavailable</div>
        ) : isLoading ? (
          <Skeleton className="h-8 w-3/4 bg-muted-foreground/20" />
        ) : (
          <div className={`text-2xl font-bold ${colorClass ? `text-${colorClass}` : "text-foreground"}`}>{value}</div>
        )}
        <p className="text-xs text-muted-foreground/80 mt-1">
          {isLoading
            ? "Loading..."
            : error
              ? "Update failed"
              : stats.lastUpdated
                ? `Updated: ${new Date(stats.lastUpdated).toLocaleString()}`
                : "Live data"}
        </p>
      </CardContent>
    </Card>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Verified CHWs"
        value={stats.verifiedCHWs?.toLocaleString() || "0"}
        icon={UserCheck}
        isLoading={loading}
        isError={!!error}
        colorClass="flame"
      />
      <StatCard
        title="Active Guardians"
        value={stats.activeGuardians?.toLocaleString() || "0"}
        icon={HeartHandshake}
        isLoading={loading}
        isError={!!error}
        colorClass="guardian"
      />
      <StatCard
        title="Total Support"
        value={`$${stats.totalSupport?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}`}
        icon={DollarSign}
        isLoading={loading}
        isError={!!error}
        colorClass="pulse"
      />
      <StatCard
        title="Lives Impacted"
        value={stats.livesImpacted?.toLocaleString() || "0"}
        icon={Users}
        isLoading={loading}
        isError={!!error}
        colorClass="neon"
      />
    </div>
  )
}
