"use client"

import { TokenRegistrationFlow } from "@/components/token-registration-flow"
import { TokenDistributionExplainer } from "@/components/token-distribution-explainer"
import { Coins } from "lucide-react"
import dynamic from "next/dynamic"

const ParticleBackground = dynamic(
  () => import("@/components/particle-background").then((mod) => ({ default: mod.ParticleBackground })),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
  },
)

export default function TokenSystemPage() {
  return (
    <div className="min-h-screen bg-dusk relative">
      <ParticleBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="py-20 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-orange-500/20 rounded-full">
                <Coins className="w-12 h-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">FLB Token System</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Empowering African healthcare through blockchain technology. Join the revolution that rewards impact and
              builds sustainable health systems.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
          <TokenRegistrationFlow />
          <TokenDistributionExplainer />
        </div>
      </div>
    </div>
  )
}
