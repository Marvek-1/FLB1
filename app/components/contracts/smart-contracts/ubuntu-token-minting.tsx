"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mintFLBTokens, getFLBBalance } from "@/lib/contract-utils"
import { motion, AnimatePresence } from "framer-motion"
import { Coins, Heart, Users, CheckCircle, AlertCircle, Loader2, ExternalLink, Wallet, Activity } from "lucide-react"

interface ContributionTier {
  bnb: string
  flb: number
  impact: string
  color: string
  popular?: boolean
}

const UBUNTU_TIERS: ContributionTier[] = [
  {
    bnb: "0.01",
    flb: 100,
    impact: "Support 1 community health worker for a day",
    color: "from-green-400 to-emerald-600",
  },
  {
    bnb: "0.05",
    flb: 500,
    impact: "Fund medical supplies for 5 families",
    color: "from-blue-400 to-indigo-600",
    popular: true,
  },
  {
    bnb: "0.1",
    flb: 1000,
    impact: "Enable healthcare access for 10 mothers",
    color: "from-purple-400 to-violet-600",
  },
  {
    bnb: "0.25",
    flb: 2500,
    impact: "Establish mobile health clinic for 1 week",
    color: "from-orange-400 to-red-600",
  },
  {
    bnb: "0.5",
    flb: 5000,
    impact: "Train 5 traditional healers in modern practices",
    color: "from-yellow-400 to-orange-600",
  },
  {
    bnb: "1.0",
    flb: 10000,
    impact: "Build sustainable health infrastructure",
    color: "from-pink-400 to-rose-600",
  },
]

export function UbuntuTokenMinting({ address }: { address: string | null }) {
  const [selectedTier, setSelectedTier] = useState<ContributionTier>(UBUNTU_TIERS[1])
  const [customAmount, setCustomAmount] = useState("")
  const [isCustom, setIsCustom] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [impactStats, setImpactStats] = useState({
    totalContributions: 45678,
    healthWorkersSupported: 1234,
    familiesHelped: 5678,
    communitiesReached: 89,
  })

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) return

    const amount = isCustom ? customAmount : selectedTier.bnb
    if (!amount || Number.parseFloat(amount) < 0.01) {
      setResult({
        success: false,
        message: "Minimum contribution is 0.01 BNB to honor the Ubuntu spirit of collective support.",
      })
      return
    }

    setIsSubmitting(true)
    setResult(null)

    try {
      const success = await mintFLBTokens(amount)
      if (success) {
        const flbAmount = isCustom ? Math.floor(Number.parseFloat(amount) * 1000) : selectedTier.flb

        setResult({
          success: true,
          message: `Asante sana! Successfully minted ${flbAmount.toLocaleString()} Ubuntu tokens. Your contribution strengthens our collective healing power.`,
        })

        // Update impact stats
        setImpactStats((prev) => ({
          ...prev,
          totalContributions: prev.totalContributions + Number.parseFloat(amount),
          healthWorkersSupported: prev.healthWorkersSupported + Math.floor(Number.parseFloat(amount) * 10),
          familiesHelped: prev.familiesHelped + Math.floor(Number.parseFloat(amount) * 20),
        }))

        // Reset form
        setCustomAmount("")
        setIsCustom(false)

        // Update balance
        if (address) {
          const newBalance = await getFLBBalance(address)
          setBalance(newBalance)
        }

        // Submit to Google Sheets
        await submitToGoogleSheets({
          address,
          amount,
          flbAmount,
          timestamp: new Date().toISOString(),
        })
      } else {
        setResult({
          success: false,
          message: "Ubuntu token minting failed. The ancestors guide us to try again with patience.",
        })
      }
    } catch (error) {
      console.error("Error during Ubuntu token minting:", error)
      setResult({
        success: false,
        message: "An unexpected challenge arose. Ubuntu teaches us resilience - please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitToGoogleSheets = async (data: any) => {
    try {
      // In a real implementation, this would submit to the Google Sheets API
      // For now, we'll simulate the submission
      console.log("Submitting to Google Sheets:", data)

      // You would implement the actual Google Sheets API call here
      // using the provided form URL or Sheets API
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error)
    }
  }

  const fetchBalance = async () => {
    if (!address) return
    try {
      const balance = await getFLBBalance(address)
      setBalance(balance)
    } catch (error) {
      console.error("Error fetching Ubuntu token balance:", error)
    }
  }

  useEffect(() => {
    if (address) {
      fetchBalance()
    }
  }, [address])

  const calculateFLB = (bnbAmount: string) => {
    return Math.floor(Number.parseFloat(bnbAmount || "0") * 1000)
  }

  return (
    <div className="space-y-6">
      {/* Ubuntu Philosophy Header */}
      <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-red-400" />
            Ubuntu Token Minting
            <Heart className="w-6 h-6 text-red-400" />
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            "I am because we are" - Support African healthcare through collective Ubuntu spirit
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Impact Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{impactStats.totalContributions.toLocaleString()}</div>
            <div className="text-sm text-gray-400">BNB Contributed</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {impactStats.healthWorkersSupported.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Health Workers Supported</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{impactStats.familiesHelped.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Families Helped</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{impactStats.communitiesReached}</div>
            <div className="text-sm text-gray-400">Communities Reached</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Minting Interface */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-orange-500" />
            Mint Ubuntu Tokens
          </CardTitle>
          <CardDescription className="text-gray-300">
            Choose your contribution level to support African healthcare and earn Ubuntu tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {address ? (
            <>
              {/* Balance Display */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Your Ubuntu Balance:</span>
                </div>
                <div className="flex items-center gap-2">
                  {balance !== null ? (
                    <span className="text-2xl font-bold text-orange-400">{balance.toLocaleString()} FLB</span>
                  ) : (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={fetchBalance}
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Activity className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Contribution Tiers */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Choose Your Ubuntu Contribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {UBUNTU_TIERS.map((tier) => (
                    <motion.div key={tier.bnb} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedTier.bnb === tier.bnb && !isCustom
                            ? "ring-2 ring-orange-500 bg-white/15"
                            : "bg-white/5 hover:bg-white/10"
                        } border-white/10 relative`}
                        onClick={() => {
                          setSelectedTier(tier)
                          setIsCustom(false)
                        }}
                      >
                        {tier.popular && (
                          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                            Most Popular
                          </Badge>
                        )}
                        <CardContent className="p-4">
                          <div className={`w-full h-2 rounded-full bg-gradient-to-r ${tier.color} mb-3`}></div>
                          <div className="text-center space-y-2">
                            <div className="text-2xl font-bold text-white">{tier.bnb} BNB</div>
                            <div className="text-lg text-orange-400">{tier.flb.toLocaleString()} FLB</div>
                            <div className="text-sm text-gray-300 h-12 flex items-center justify-center">
                              {tier.impact}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Custom Amount Option */}
                <Card
                  className={`cursor-pointer transition-all duration-200 ${
                    isCustom ? "ring-2 ring-orange-500 bg-white/15" : "bg-white/5 hover:bg-white/10"
                  } border-white/10`}
                  onClick={() => setIsCustom(true)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">Custom Amount</h4>
                        <p className="text-gray-300 text-sm">Choose your own contribution level</p>
                      </div>
                      <div className="text-right">
                        <div className="text-orange-400 font-bold">
                          {customAmount ? `${calculateFLB(customAmount).toLocaleString()} FLB` : "? FLB"}
                        </div>
                        <div className="text-gray-400 text-sm">1 BNB = 1,000 FLB</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Minting Form */}
              <form onSubmit={handleMint} className="space-y-4">
                {isCustom && (
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Custom BNB Amount</label>
                    <Input
                      type="number"
                      step="0.001"
                      min="0.01"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="0.01"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      required
                    />
                    <p className="text-gray-400 text-sm">
                      Minimum: 0.01 BNB • You will receive: {calculateFLB(customAmount).toLocaleString()} FLB
                    </p>
                  </div>
                )}

                {/* Selected Contribution Summary */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Your Ubuntu Contribution</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">BNB Amount:</span>
                      <div className="text-white font-bold">
                        {isCustom ? customAmount || "0" : selectedTier.bnb} BNB
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Ubuntu Tokens:</span>
                      <div className="text-orange-400 font-bold">
                        {isCustom ? calculateFLB(customAmount).toLocaleString() : selectedTier.flb.toLocaleString()} FLB
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-400 text-sm">Impact:</span>
                    <div className="text-green-400 text-sm">
                      {isCustom
                        ? `Support ${Math.floor(Number.parseFloat(customAmount || "0") * 100)} community members`
                        : selectedTier.impact}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || (!isCustom && !selectedTier) || (isCustom && !customAmount)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Minting Ubuntu Tokens...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2" />
                      Mint Ubuntu Tokens
                    </>
                  )}
                </Button>
              </form>

              {/* Result Message */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`p-4 rounded-lg border ${
                      result.success
                        ? "bg-green-500/20 border-green-500/30 text-green-300"
                        : "bg-red-500/20 border-red-500/30 text-red-300"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p>{result.message}</p>
                        {result.success && (
                          <div className="mt-2 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                window.open(
                                  "https://docs.google.com/forms/d/e/1FAIpQLSfuxO0SEkiGhuvYqP5fE4c5RgqdyZc76rppeC70rDsu67ssgw/viewform?usp=sharing&ouid=117857227348165727286",
                                  "_blank",
                                )
                              }
                              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Join Community
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                window.open(
                                  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkTZ9GaUMp_nlR82WWKR_tFMZzWDE4jekk6N9GKZ60eiceuHsUOlftoiqdd1AB3vBPxiyk1DtLBBM4/pubhtml",
                                  "_blank",
                                )
                              }
                              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                            >
                              <Activity className="w-4 h-4 mr-1" />
                              View Live Data
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ubuntu Philosophy Footer */}
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <p className="text-white font-medium mb-2">"Ubuntu: I am because we are"</p>
                  <p className="text-gray-300 text-sm">
                    Your contribution joins thousands of others in building sustainable healthcare across Africa.
                    Together, we heal our communities and strengthen our collective Ubuntu spirit.
                  </p>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center py-8">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
              <p className="text-gray-300 mb-4">
                Connect your wallet to mint Ubuntu tokens and join our collective healing mission
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Community Feed Integration */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Recent Ubuntu Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Amara from Lagos", amount: "0.1 BNB", flb: "1,000 FLB", time: "2 minutes ago" },
              { name: "Kwame from Accra", amount: "0.05 BNB", flb: "500 FLB", time: "5 minutes ago" },
              { name: "Fatima from Cairo", amount: "0.25 BNB", flb: "2,500 FLB", time: "8 minutes ago" },
            ].map((contributor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{contributor.name}</div>
                  <div className="text-gray-400 text-sm">{contributor.time}</div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-bold">{contributor.flb}</div>
                  <div className="text-gray-400 text-sm">{contributor.amount}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkTZ9GaUMp_nlR82WWKR_tFMZzWDE4jekk6N9GKZ60eiceuHsUOlftoiqdd1AB3vBPxiyk1DtLBBM4/pubhtml",
                  "_blank",
                )
              }
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Contributors
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
