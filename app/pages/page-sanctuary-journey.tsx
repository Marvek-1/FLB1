"use client"

import { Suspense } from "react"
import { JourneyHero } from "@/components/journey/journey-hero"
import { JourneyFeatured } from "@/components/journey/journey-featured"
import { JourneyPosts } from "@/components/journey/journey-posts"
import { JourneySidebar } from "@/components/journey/journey-sidebar"
import { LoadingState } from "@/components/loading-state"
import dynamic from "next/dynamic"

const ParticleBackground = dynamic(
  () => import("@/components/particle-background").then((mod) => ({ default: mod.ParticleBackground })),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
  },
)

export default function FlamebornJourney() {
  return (
    <div className="min-h-screen bg-dusk relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Suspense fallback={<LoadingState message="Loading journey..." />}>
          <JourneyHero />
        </Suspense>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Suspense fallback={<LoadingState message="Loading featured content..." />}>
            <JourneyFeatured />
          </Suspense>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingState message="Loading posts..." />}>
                <JourneyPosts />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<LoadingState message="Loading sidebar..." />}>
                <JourneySidebar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
