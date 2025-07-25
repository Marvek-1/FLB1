"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/app/components/ui/card"

interface RegistrationLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  type: "guardian" | "healer"
}

export function RegistrationLayout({ children, title, subtitle, type }: RegistrationLayoutProps) {
  // Define colors based on type
  const gradientColors = type === "guardian" ? "from-guardian/40 to-guardian/5" : "from-flame/40 to-flame/5"

  const accentColor = type === "guardian" ? "guardian" : "flame"

  return (
    <div className="min-h-screen bg-dusk py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${gradientColors} opacity-20 z-0`}></div>

      {/* Animated light orbs */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-${accentColor}/20 blur-3xl z-0`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-${accentColor}/10 blur-3xl z-0`}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <motion.h1
            className={`text-3xl md:text-4xl font-heading text-${accentColor} mb-2`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side - Image and info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className={`bg-dusk border border-${accentColor}/20 overflow-hidden h-full`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={type === "guardian" ? "/BridgingWorldsOfHealing.png" : "/connected-care-africa.png"}
                  alt={type === "guardian" ? "Guardian" : "Healer"}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-dusk to-transparent`}></div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-heading text-${accentColor} mb-4`}>
                  {type === "guardian" ? "Join as a Guardian" : "Register as a Healer"}
                </h3>

                <div className="space-y-4 text-gray-300">
                  {type === "guardian" ? (
                    <>
                      <p>As a Guardian, you'll:</p>
                      <ul className="space-y-2 list-disc list-inside text-sm">
                        <li>Support healthcare workers directly</li>
                        <li>Track your impact in real-time</li>
                        <li>Join a community of like-minded supporters</li>
                        <li>Help verify healthcare workers</li>
                        <li>Receive updates on the impact of your contributions</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>As a Healer, you'll:</p>
                      <ul className="space-y-2 list-disc list-inside text-sm">
                        <li>Receive direct support for your healthcare work</li>
                        <li>Connect with a global community of supporters</li>
                        <li>Get recognition for your essential work</li>
                        <li>Access resources and training opportunities</li>
                        <li>Share your impact and stories</li>
                      </ul>
                    </>
                  )}

                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-sm italic">"The flame burns brightest when carried by many hands."</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
