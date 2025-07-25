"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { motion } from "framer-motion"
import { Sparkles, Heart, BookOpen, MessageCircle, Volume2, VolumeX } from "lucide-react"
import { useWallet } from "@/app/components/smart-contracts/wallet-provider"
import { mostarAI, type MostarAIResponse } from "@/app/lib/mostar-ai-client"
import { toast } from "@/app/hooks/use-toast"

interface MostarWelcomeProps {
  validatorName?: string
  onComplete?: () => void
}

export function MostarAIWelcome({ validatorName, onComplete }: MostarWelcomeProps) {
  const { address } = useWallet()
  const [response, setResponse] = useState<MostarAIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullMessage, setShowFullMessage] = useState(false)

  useEffect(() => {
    loadWelcomeMessage()
  }, [validatorName, address])

  const loadWelcomeMessage = async () => {
    setIsLoading(true)
    try {
      let welcomeResponse: MostarAIResponse

      if (address) {
        // First validator message if they have an address
        welcomeResponse = await mostarAI.getFirstValidatorMessage(address)
      } else {
        // General welcome message
        welcomeResponse = await mostarAI.getWelcomeMessage(validatorName)
      }

      setResponse(welcomeResponse)
    } catch (error) {
      console.error("Failed to load welcome message:", error)
      // Fallback message
      setResponse({
        message: `Welcome to FlameBorn, ${validatorName || "healer"}! 🔥 You are now part of Africa's healing network. The ancestors guide your path, and Ubuntu flows through your actions. "I am because we are" - together we heal.`,
        proverb: "I am because we are",
        culturalContext: "Ubuntu philosophy",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const speakMessage = () => {
    if (!response?.message) return

    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(response.message)
    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.volume = 0.8

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => {
      setIsPlaying(false)
      toast({
        title: "Speech Error",
        description: "Unable to play audio. Please check your browser settings.",
        variant: "destructive",
      })
    }

    speechSynthesis.speak(utterance)
  }

  const handleContinue = () => {
    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    }
    onComplete?.()
  }

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Mostar is awakening...</h3>
              <p className="text-purple-200">Channeling ancestral wisdom for your journey</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!response) {
    return (
      <Card className="bg-red-900/30 border-red-500/30">
        <CardContent className="text-center py-8">
          <p className="text-red-200">Unable to connect with Mostar AI. Please try again.</p>
          <Button onClick={loadWelcomeMessage} className="mt-4 bg-red-600 hover:bg-red-700">
            Retry Connection
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 overflow-hidden">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  Mostar AI
                  <Badge className="bg-purple-600 text-white">Guardian</Badge>
                </CardTitle>
                <CardDescription className="text-purple-200">AI Guardian of FlameBorn Network</CardDescription>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={speakMessage}
              className="text-purple-300 hover:text-white hover:bg-purple-800/50"
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 animate-pulse"></div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main Message */}
          <div className="space-y-4">
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-white leading-relaxed">
                    {showFullMessage ? response.message : `${response.message.slice(0, 200)}...`}
                  </p>
                  {response.message.length > 200 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFullMessage(!showFullMessage)}
                      className="text-purple-300 hover:text-white p-0 h-auto"
                    >
                      {showFullMessage ? "Show less" : "Read more"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Proverb */}
            {response.proverb && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 p-4 rounded-lg border border-orange-500/30"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-orange-300 mb-1">Ancestral Wisdom</h4>
                    <p className="text-orange-100 italic">"{response.proverb}"</p>
                    {response.culturalContext && (
                      <p className="text-orange-200/70 text-sm mt-2">— {response.culturalContext}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Healing Wisdom */}
            {response.healingWisdom && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-green-900/20 to-teal-900/20 p-4 rounded-lg border border-green-500/30"
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-300 mb-1">Healing Guidance</h4>
                    <p className="text-green-100">{response.healingWisdom}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Service Status */}
          <div className="flex items-center justify-between pt-4 border-t border-purple-500/30">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${mostarAI.isServiceAvailable() ? "bg-green-500" : "bg-yellow-500"}`}
              ></div>
              <span className="text-sm text-purple-200">
                {mostarAI.isServiceAvailable() ? "AI Service Active" : "Fallback Mode"}
              </span>
            </div>

            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
            >
              Continue Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
