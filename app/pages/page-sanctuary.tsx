"use client"

import { Suspense } from "react"
import { SanctuaryHero } from "@/components/sanctuary/sanctuary-hero"
import { SanctuaryFeed } from "@/components/sanctuary/sanctuary-feed"
import { SanctuaryMembers } from "@/components/sanctuary/sanctuary-members"
import { LoadingState } from "@/components/loading-state"
import dynamic from "next/dynamic"

const ParticleBackground = dynamic(
  () => import("@/components/particle-background").then((mod) => ({ default: mod.ParticleBackground })),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
  },
)

export default function GuardiansSanctuary() {
  return (
    <div className="min-h-screen bg-dusk relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Suspense fallback={<LoadingState message="Loading sanctuary..." />}>
          <SanctuaryHero />
        </Suspense>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingState message="Loading sanctuary feed..." />}>
                <SanctuaryFeed />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<LoadingState message="Loading members..." />}>
                <SanctuaryMembers />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
