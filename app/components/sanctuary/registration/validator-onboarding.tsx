"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Wallet, CheckCircle, AlertTriangle, Flame, BookOpen, Users, Globe } from "lucide-react"
import { useWallet } from "@/app/components/smart-contracts/wallet-provider"
import { toast } from "@/app/hooks/use-toast"
import { FLB_TOKEN_ADDRESSES } from "@/app/lib/constants"

interface ValidatorProfile {
  name: string
  location: string
  expertise: string
  proverb: string
  commitment: string
}

type OnboardingStep = "connect" | "profile" | "proverb" | "stake" | "complete"

export function ValidatorOnboarding() {
  const { connected, address, chainId, balance, connectWallet, switchNetwork, isConnecting } = useWallet()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("connect")
  const [profile, setProfile] = useState<ValidatorProfile>({
    name: "",
    location: "",
    expertise: "",
    proverb: "",
    commitment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)

  const isOnAlfajores = chainId === 44787
  const hasMinimumCelo = Number.parseFloat(balance.celo) >= 0.1

  useEffect(() => {
    if (connected && isOnAlfajores) {
      if (currentStep === "connect") {
        setCurrentStep("profile")
        setProgress(25)
      }
    }
  }, [connected, isOnAlfajores, currentStep])

  const handleConnect = async () => {
    const success = await connectWallet()
    if (success) {
      await switchNetwork("alfajores")
      toast({
        title: "Wallet Connected",
        description: "Welcome to the FlameBorn validator network",
      })
    }
  }

  const handleProfileSubmit = () => {
    if (!profile.name || !profile.location || !profile.expertise) {
      toast({
        title: "Incomplete Profile",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    setCurrentStep("proverb")
    setProgress(50)
  }

  const handleProverbSubmit = () => {
    if (!profile.proverb || profile.proverb.length < 20) {
      toast({
        title: "Proverb Required",
        description: "Please share an African proverb that guides your healing work",
        variant: "destructive",
      })
      return
    }
    setCurrentStep("stake")
    setProgress(75)
  }

  const handleStakeSubmit = async () => {
    if (!hasMinimumCelo) {
      toast({
        title: "Insufficient Balance",
        description: "You need at least 0.1 CELO to become a validator",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate validator registration
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Validator Registration Successful",
        description: "You are now part of the FlameBorn healing network",
      })

      setCurrentStep("complete")
      setProgress(100)
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "connect":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center mx-auto">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h3>
              <p className="text-gray-300">
                Join the FlameBorn validator network and help secure African healthcare sovereignty
              </p>
            </div>
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
            {!isOnAlfajores && connected && (
              <Alert className="border-yellow-500/30 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-200">
                  Please switch to Celo Alfajores testnet to continue
                </AlertDescription>
              </Alert>
            )}
          </motion.div>
        )

      case "profile":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Validator Profile</h3>
              <p className="text-gray-300">Tell us about your healing journey and expertise</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Dr. Amara Okafor"
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Location *
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Lagos, Nigeria"
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertise" className="text-white">
                  Medical Expertise *
                </Label>
                <Textarea
                  id="expertise"
                  value={profile.expertise}
                  onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
                  placeholder="Community health, maternal care, traditional healing..."
                  className="bg-gray-800/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>
            </div>

            <Button onClick={handleProfileSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
              Continue to Wisdom Sharing
            </Button>
          </motion.div>
        )

      case "proverb":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Share Your Wisdom</h3>
              <p className="text-gray-300">Every validator must anchor their practice in African wisdom</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="proverb" className="text-white">
                  African Proverb or Wisdom *
                </Label>
                <Textarea
                  id="proverb"
                  value={profile.proverb}
                  onChange={(e) => setProfile({ ...profile, proverb: e.target.value })}
                  placeholder="Share a proverb from your culture that guides your healing work..."
                  className="bg-gray-800/50 border-gray-600 text-white min-h-[120px]"
                />
                <p className="text-sm text-gray-400">
                  Example: "When the spider webs unite, they can tie up a lion" - Ethiopian proverb about community
                  strength
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commitment" className="text-white">
                  Your Commitment to Ubuntu Healing
                </Label>
                <Textarea
                  id="commitment"
                  value={profile.commitment}
                  onChange={(e) => setProfile({ ...profile, commitment: e.target.value })}
                  placeholder="How will you embody 'I am because we are' in your validator role?"
                  className="bg-gray-800/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>
            </div>

            <Button onClick={handleProverbSubmit} className="w-full bg-green-600 hover:bg-green-700">
              Continue to Staking
            </Button>
          </motion.div>
        )

      case "stake":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Stake Your Reputation</h3>
              <p className="text-gray-300">Commit to the network with your reputation and resources</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-white mb-3">Validator Requirements</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Minimum CELO Balance:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white">0.1 CELO</span>
                      {hasMinimumCelo ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Your Balance:</span>
                    <span className="text-white">{Number.parseFloat(balance.celo).toFixed(4)} CELO</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Network:</span>
                    <Badge className={isOnAlfajores ? "bg-green-600" : "bg-red-600"}>
                      {isOnAlfajores ? "Alfajores ✓" : "Wrong Network"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="font-semibold text-orange-300 mb-2">Validator Responsibilities</h4>
                <ul className="text-sm text-orange-200 space-y-1">
                  <li>• Validate health worker registrations</li>
                  <li>• Monitor facility authenticity</li>
                  <li>• Participate in governance decisions</li>
                  <li>• Uphold Ubuntu principles</li>
                </ul>
              </div>

              {!hasMinimumCelo && (
                <Alert className="border-red-500/30 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">
                    You need more CELO to become a validator. Visit the{" "}
                    <a
                      href="https://faucet.celo.org/alfajores"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Celo faucet
                    </a>{" "}
                    to get test tokens.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <Button
              onClick={handleStakeSubmit}
              disabled={!hasMinimumCelo || isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? "Registering Validator..." : "Become a Validator"}
            </Button>
          </motion.div>
        )

      case "complete":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome, Validator!</h3>
              <p className="text-gray-300">You are now part of the FlameBorn healing network</p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 p-6 rounded-lg border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-3">Your Validator Profile</h4>
              <div className="text-left space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Name:</span> <span className="text-white">{profile.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Location:</span>{" "}
                  <span className="text-white">{profile.location}</span>
                </div>
                <div>
                  <span className="text-gray-400">Wallet:</span>{" "}
                  <span className="text-white font-mono text-xs">
                    {address?.slice(0, 10)}...{address?.slice(-8)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Wisdom:</span>{" "}
                  <span className="text-white italic">"{profile.proverb.slice(0, 100)}..."</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                <Globe className="w-4 h-4 mr-2" />
                View Dashboard
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                <Flame className="w-4 h-4 mr-2" />
                Start Validating
              </Button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900/50 backdrop-blur-sm border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-white">FlameBorn Validator</CardTitle>
              <CardDescription className="text-gray-400">Join the healing network</CardDescription>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="bg-gray-800" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

          {connected && (
            <div className="text-center pt-4 border-t border-gray-700">
              <div className="text-xs text-gray-400 space-y-1">
                <div>Contract: {FLB_TOKEN_ADDRESSES.CELO_ALFAJORES.slice(0, 10)}...</div>
                <div>Network: Celo Alfajores Testnet</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
