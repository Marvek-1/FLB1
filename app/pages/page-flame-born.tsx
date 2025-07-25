"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { WalletConnector } from "@/components/wallet-connector"
import { HealthActorRegistration } from "@/components/health-actor-registration"
import { TokenMinting } from "@/components/token-minting"
import { DonationForm } from "@/components/donation-form"
import { IkoIkang } from "@/components/ai/ai-assistant"
import { ImpactAnalysis } from "@/components/impact-analysis"
import { VerificationAssistant } from "@/components/verification-assistant"
import Link from "next/link"

export default function FlamebornLanding() {
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("mint")

  // Listen for wallet connection events
  useEffect(() => {
    const handleWalletConnect = (event: CustomEvent) => {
      setWalletAddress(event.detail.address)
    }

    window.addEventListener("walletConnected" as any, handleWalletConnect)
    window.addEventListener("walletDisconnected" as any, () => setWalletAddress(null))

    return () => {
      window.removeEventListener("walletConnected" as any, handleWalletConnect)
      window.removeEventListener("walletDisconnected" as any, () => {})
    }
  }, [])

  const handleSignup = () => {
    console.log("User email:", email)
    // This would be connected to Supabase function later
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold flame-text">FLAMEBORN</h1>
        <div className="flex items-center gap-4">
          <Link href="/debug" className="text-sm text-gray-400 hover:text-white">
            Debug
          </Link>
          <WalletConnector />
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Life is Simple. Only Decide.</h2>
          <p className="text-xl mb-6">We are not responding to crises. We are eradicating them.</p>
        </div>

        <Card className="bg-gray-900 border border-gray-700 mb-12">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold flame-text">🌍 Mission</h2>
            <p>
              Flameborn is a life-saving token project funding real-time eradication of diseases in Africa through
              direct empowerment, AI tools, and blockchain transparency.
            </p>

            <h2 className="text-xl font-semibold flame-text">🔥 Genesis Token Drop</h2>
            <p>100 Flameborn Genesis Tokens will grant holders:</p>
            <ul className="list-disc list-inside">
              <li>Governance rights in the Flameborn DAO</li>
              <li>Access to Mostar AI for impact ops</li>
              <li>Proof of Eradication Contribution</li>
            </ul>

            <h2 className="text-xl font-semibold flame-text">🕯️ Be First</h2>
            <p>
              Sign up to be among the first Flameborn and change the narrative of health injustice across the continent.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flame-input"
              />
              <Button onClick={handleSignup} className="flame-button">
                Join
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="mint" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8 bg-gray-800">
            <TabsTrigger value="mint" className="text-white data-[state=active]:bg-gray-700">
              Mint Tokens
            </TabsTrigger>
            <TabsTrigger value="donate" className="text-white data-[state=active]:bg-gray-700">
              Donate
            </TabsTrigger>
            <TabsTrigger value="register" className="text-white data-[state=active]:bg-gray-700">
              Register
            </TabsTrigger>
            <TabsTrigger value="impact" className="text-white data-[state=active]:bg-gray-700">
              Impact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mint">
            <TokenMinting address={walletAddress} />
          </TabsContent>

          <TabsContent value="donate">
            <DonationForm address={walletAddress} />
          </TabsContent>

          <TabsContent value="register">
            <div className="grid md:grid-cols-2 gap-6">
              <HealthActorRegistration />
              <VerificationAssistant />
            </div>
          </TabsContent>

          <TabsContent value="impact">
            <ImpactAnalysis />
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center text-sm text-gray-400">
          <div className="mb-4">
            <Link href="/legal" className="hover:underline">
              Legal Documents
            </Link>
            <span className="mx-2">•</span>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
          </div>
          <p> {new Date().getFullYear()} Flameborn. All rights reserved.</p>
          <p className="mt-2">Built with  for Africa</p>
        </footer>
      </motion.div>

      {/* AI Assistant is always available */}
      <IkoIkang />
    </div>
  )
}
