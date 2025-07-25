"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Flame, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function HomeHero() {
  const [currentText, setCurrentText] = useState(0)
  const texts = [
    "I am because we are",
    "Ubuntu healing network",
    "Community-owned healthcare",
    "Blockchain meets tradition",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-red-900 to-orange-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20" />
      </div>

      {/* Floating Flames */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Flame
            key={i}
            className={`absolute text-orange-400 opacity-20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Flame className="h-16 w-16 text-orange-400 mr-4" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              FlameBorn
            </h1>
          </div>

          {/* Animated Tagline */}
          <div className="h-16 mb-8">
            <p className="text-2xl md:text-3xl font-medium text-orange-200 transition-all duration-500">
              {texts[currentText]}
            </p>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Africa's first community-owned healing network. Where traditional Ubuntu philosophy meets blockchain
            technology, and every validated life strengthens our collective immunity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/testnet">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Explore Testnet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/manifesto">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-4 text-lg bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Read Manifesto
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">1B</div>
              <div className="text-gray-300">FLAME Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">Ubuntu</div>
              <div className="text-gray-300">Philosophy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">∞</div>
              <div className="text-gray-300">Community Impact</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
