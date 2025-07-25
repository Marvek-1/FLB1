"use client"

import { Suspense } from "react"
import { PulseHero } from "@/components/pulse/pulse-hero"
import { PulseActivity } from "@/components/pulse/pulse-activity"
import { PulseStats } from "@/components/pulse/pulse-stats"
import { PulseMap } from "@/components/pulse/pulse-map"
import { LoadingState } from "@/components/loading-state"
import dynamic from "next/dynamic"

const ParticleBackground = dynamic(
  () => import("@/components/particle-background").then((mod) => ({ default: mod.ParticleBackground })),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
  },
)

export default function CommunityPulse() {
  return (
    <div className="min-h-screen bg-dusk relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Suspense fallback={<LoadingState message="Loading community pulse..." />}>
          <PulseHero />
        </Suspense>

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingState message="Loading activity feed..." />}>
                <PulseActivity />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<LoadingState message="Loading statistics..." />}>
                <PulseStats />
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<LoadingState message="Loading community map..." />}>
            <PulseMap />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
