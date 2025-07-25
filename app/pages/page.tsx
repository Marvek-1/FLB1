import { HomeHero } from "@/components/home-hero"
import { TestnetStatus } from "@/components/testnet-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Heart, Users, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SoundEffects } from "@/components/sound-effects"
import { ParticleBackground } from "@/components/particle-background"
import { FlameAnimation } from "@/components/flame-animation"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <SoundEffects />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <FlameAnimation />
          </div>

          <Badge variant="outline" className="mb-6 bg-black/30 backdrop-blur-sm border-sunset-gold text-sunset-gold">
            <Sparkles className="w-4 h-4 mr-2" />
            Ubuntu-Powered Healthcare Tokenization
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Bridging Worlds of <span className="text-sunset-gold">Healing</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
            Where ancient African wisdom meets modern healthcare solutions through blockchain technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-sunset-gold hover:bg-savannah-orange text-white">
              Join the Flame <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-sunset-gold text-sunset-gold hover:bg-black/30">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Ubuntu Philosophy Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ubuntu Philosophy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              "I am because we are" - The ancient African philosophy that guides our approach to healthcare tokenization
              and community building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Collective Healing</CardTitle>
                <CardDescription>Healthcare as a community responsibility, not individual burden</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every verified birth, every healed patient, every trained community health worker strengthens our
                  collective immunity and prosperity.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Shared Prosperity</CardTitle>
                <CardDescription>Tokenizing healthcare impact to create sustainable value</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  FLAME tokens represent real healthcare impact, creating economic incentives aligned with community
                  health outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Global Ubuntu</CardTitle>
                <CardDescription>Connecting African wisdom with global healthcare challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bridging traditional healing practices with modern technology to create a more inclusive and effective
                  healthcare system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testnet Status Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Testnet Status</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor the FlameBorn testnet in real-time. See Ubuntu community growth, validator activity, and
              healthcare impact metrics.
            </p>
          </div>

          <TestnetStatus />

          <div className="text-center mt-8">
            <Link href="/testnet">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Explore Full Testnet Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Flame className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Join the Ubuntu Healthcare Revolution</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the first community-owned healing network where traditional wisdom meets blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/healer">
              <Button size="lg" variant="secondary">
                Register as Healer
              </Button>
            </Link>
            <Link href="/register/guardian">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                Become Guardian
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
