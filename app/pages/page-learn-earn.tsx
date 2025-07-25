"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Play,
  CheckCircle,
  Star,
  Globe,
  Brain,
  Stethoscope,
  Cpu,
  Users,
  Coins,
  HandHeart,
  GraduationCap,
  MessageSquare,
  Wallet,
  Download,
  Wifi,
  WifiOff,
  Clock,
  Target,
  Heart,
  Shield,
  Zap,
} from "lucide-react"
import { ClipboardManager } from "@/lib/clipboard-utils"

interface Module {
  id: string
  title: string
  description: string
  type: "interactive" | "quiz" | "story" | "video"
  category: "Cultural Heritage" | "Philosophy" | "Health Advocacy" | "Technology" | "Ubuntu Wisdom"
  difficulty: "easy" | "medium" | "hard"
  duration: number
  flbReward: number
  xpReward: number
  completed: boolean
  content: any
}

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface WalletInfo {
  address: string
  flbBalance: number
  celoBalance: number
  connected: boolean
}

interface Transaction {
  id: string
  type: "earned" | "donated" | "transferred"
  amount: number
  description: string
  timestamp: Date
  status: "completed" | "pending" | "failed"
}

const modules: Module[] = [
  {
    id: "ubuntu-wisdom-1",
    title: "Ubuntu Philosophy: I Am Because We Are",
    description: "Deep dive into Ubuntu philosophy and its relevance in modern African healing",
    type: "interactive",
    category: "Ubuntu Wisdom",
    difficulty: "easy",
    duration: 20,
    flbReward: 50,
    xpReward: 100,
    completed: false,
    content: {
      concepts: [
        {
          concept: "Umuntu ngumuntu ngabantu",
          translation: "A person is a person through other persons",
          explanation: "The fundamental concept of Ubuntu - our humanity is interconnected",
          modernApplication: "In healthcare, this guides collaborative approaches to healing",
        },
        {
          concept: "Ubuntu ngumuntu",
          translation: "Ubuntu is humanity",
          explanation: "Ubuntu represents the essence of being human through community",
          modernApplication: "In conflict resolution, Ubuntu provides framework for healing",
        },
      ],
    },
  },
  {
    id: "addiction-africa-1",
    title: "Understanding Addiction in Africa",
    description: "Explore cultural and social aspects of addiction across African communities",
    type: "quiz",
    category: "Health Advocacy",
    difficulty: "medium",
    duration: 25,
    flbReward: 75,
    xpReward: 150,
    completed: false,
    content: {
      questions: [
        {
          question: "What role do traditional healers play in addiction recovery in Africa?",
          options: [
            "They should be completely replaced by modern medicine",
            "They complement modern treatment with cultural understanding",
            "They only use harmful practices",
            "They have no role in recovery",
          ],
          correct: 1,
          explanation:
            "Traditional healers provide cultural context and community support that enhances modern treatment approaches",
        },
        {
          question: "How does Ubuntu philosophy apply to addiction recovery?",
          options: [
            "Individual treatment is most important",
            "Community healing and collective support",
            "Isolation from community",
            "Western approaches only",
          ],
          correct: 1,
          explanation: "Ubuntu emphasizes that healing happens through community support and collective responsibility",
        },
      ],
    },
  },
  {
    id: "community-prevention-1",
    title: "Community Prevention Strategies",
    description: "Learn effective prevention methods within African community structures",
    type: "video",
    category: "Health Advocacy",
    difficulty: "medium",
    duration: 30,
    flbReward: 60,
    xpReward: 120,
    completed: false,
    content: {
      videoUrl: "/videos/community-prevention.mp4",
      keyPoints: [
        "School-based prevention programs",
        "Faith-based community approaches",
        "Elder and traditional leader involvement",
        "Youth peer education networks",
        "Economic empowerment as prevention",
      ],
    },
  },
  {
    id: "akan-proverbs-1",
    title: "Akan Proverbs: Wisdom for Healing",
    description: "Explore Akan proverbs and their applications in community healing",
    type: "interactive",
    category: "Cultural Heritage",
    difficulty: "easy",
    duration: 15,
    flbReward: 40,
    xpReward: 80,
    completed: false,
    content: {
      proverbs: [
        {
          akan: "Se wo were fi na wosan kofa a, yenkyiri",
          english: "It is not taboo to go back for what you forgot",
          meaning: "There's no shame in correcting mistakes or seeking help",
          healing: "Encourages people to seek treatment without stigma",
        },
        {
          akan: "Obi nkyere abofra Nyame",
          english: "No one teaches a child about God",
          meaning: "Some knowledge is innate and universal",
          healing: "Natural understanding of right and wrong guides recovery",
        },
      ],
    },
  },
  {
    id: "treatment-centers-1",
    title: "Treatment Center Operations in Africa",
    description: "Understand how treatment centers operate in resource-limited settings",
    type: "video",
    category: "Health Advocacy",
    difficulty: "hard",
    duration: 40,
    flbReward: 100,
    xpReward: 200,
    completed: false,
    content: {
      videoUrl: "/videos/treatment-centers.mp4",
      keyPoints: [
        "Staffing with limited resources",
        "Integrating traditional and modern approaches",
        "Community-based aftercare programs",
        "Sustainable funding models",
        "Measuring success in African contexts",
      ],
    },
  },
  {
    id: "youth-leadership-1",
    title: "Youth Leadership in Health Advocacy",
    description: "Develop skills to become a health advocate in your community",
    type: "story",
    category: "Health Advocacy",
    difficulty: "medium",
    duration: 25,
    flbReward: 65,
    xpReward: 130,
    completed: false,
    content: {
      prompt:
        "Share a story about how you've seen young people make a difference in health issues in your community, or describe how you would lead a health initiative using Ubuntu principles.",
      minWords: 150,
      maxWords: 500,
    },
  },
]

const categoryIcons = {
  "Cultural Heritage": Globe,
  Philosophy: Brain,
  "Health Advocacy": Stethoscope,
  Technology: Cpu,
  "Ubuntu Wisdom": Heart,
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
}

const redemptionKits = [
  {
    id: "mama-wellness",
    name: "Mama Wellness Pack",
    cost: 4,
    currency: "FLB",
    items: ["Clinic voucher", "Basic medicines", "Transport allowance"],
    color: "bg-green-50 border-green-200",
  },
  {
    id: "school-starter",
    name: "School Starter Kit",
    cost: 6,
    currency: "FLB",
    items: ["School uniform", "Books and supplies", "Lunch pass"],
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "community-builder",
    name: "Community Builder Pack",
    cost: 10,
    currency: "FLB",
    items: ["Seed packs", "Toolkit", "Training session"],
    color: "bg-purple-50 border-purple-200",
  },
]

export default function LearnEarnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [activeModule, setActiveModule] = useState<Module | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [storyContent, setStoryContent] = useState("")
  const [moduleProgress, setModuleProgress] = useState<{ [key: string]: boolean }>({})
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [wallet, setWallet] = useState<WalletInfo>({
    address: "",
    flbBalance: 0,
    celoBalance: 0,
    connected: false,
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [userStats, setUserStats] = useState({
    totalFLB: 0,
    totalXP: 0,
    completedModules: 0,
    currentStreak: 7,
    learnerLevel: "Beginner",
    impactScore: 0,
  })
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Module | null>(null)

  // Initialize with mock data for demo
  useEffect(() => {
    // Simulate some completed modules and transactions
    const mockTransactions: Transaction[] = [
      {
        id: "tx1",
        type: "earned",
        amount: 50,
        description: "Completed Ubuntu Philosophy course",
        timestamp: new Date(Date.now() - 86400000),
        status: "completed",
      },
      {
        id: "tx2",
        type: "donated",
        amount: 20,
        description: "Donated to Community Health Center",
        timestamp: new Date(Date.now() - 172800000),
        status: "completed",
      },
    ]
    setTransactions(mockTransactions)
  }, [])

  const filteredModules = modules.filter((module) => {
    const categoryMatch = selectedCategory === "all" || module.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "all" || module.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const connectWallet = async (walletType: string) => {
    // Mock wallet connection
    const mockAddresses = [
      "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
      "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    ]

    const randomAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)]
    const randomFLB = Math.floor(Math.random() * 500) + 50
    const randomCELO = Math.random() * 5

    setWallet({
      address: randomAddress,
      flbBalance: randomFLB,
      celoBalance: randomCELO,
      connected: true,
    })

    setUserStats((prev) => ({
      ...prev,
      totalFLB: randomFLB,
    }))

    setShowWalletModal(false)
  }

  const startModule = (module: Module) => {
    setActiveModule(module)
    setCurrentStep(0)
    setUserAnswers([])
    setStoryContent("")
    setShowCourseModal(false)
  }

  const completeModule = async (moduleId: string, score = 100) => {
    const module = modules.find((m) => m.id === moduleId)
    if (!module) return

    // Calculate rewards based on score
    const flbReward = Math.floor((score / 100) * module.flbReward)
    const xpReward = Math.floor((score / 100) * module.xpReward)

    // Update user stats
    setUserStats((prev) => ({
      ...prev,
      totalFLB: prev.totalFLB + flbReward,
      totalXP: prev.totalXP + xpReward,
      completedModules: prev.completedModules + 1,
      impactScore: prev.impactScore + Math.floor(flbReward / 10),
    }))

    // Update wallet balance
    setWallet((prev) => ({
      ...prev,
      flbBalance: prev.flbBalance + flbReward,
    }))

    // Add transaction
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      type: "earned",
      amount: flbReward,
      description: `Completed ${module.title}`,
      timestamp: new Date(),
      status: "completed",
    }
    setTransactions((prev) => [newTransaction, ...prev])

    // Mark module as completed
    setModuleProgress((prev) => ({
      ...prev,
      [moduleId]: true,
    }))

    // Close module
    setActiveModule(null)

    // Show success message
    alert(`🔥 Ubuntu wisdom earned! ${flbReward} FLB and ${xpReward} XP added to your account!`)
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[questionIndex] = answerIndex
    setUserAnswers(newAnswers)
  }

  const calculateQuizScore = () => {
    if (!activeModule || activeModule.type !== "quiz") return 0
    const questions = activeModule.content.questions as QuizQuestion[]
    const correctAnswers = userAnswers.filter((answer, index) => answer === questions[index].correct).length
    return Math.round((correctAnswers / questions.length) * 100)
  }

  const redeemKit = async (kitId: string) => {
    const kit = redemptionKits.find((k) => k.id === kitId)
    if (!kit || wallet.flbBalance < kit.cost) {
      alert("Insufficient FLB balance for this redemption kit")
      return
    }

    // Deduct FLB
    setWallet((prev) => ({
      ...prev,
      flbBalance: prev.flbBalance - kit.cost,
    }))

    // Add transaction
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      type: "donated",
      amount: kit.cost,
      description: `Redeemed ${kit.name}`,
      timestamp: new Date(),
      status: "completed",
    }
    setTransactions((prev) => [newTransaction, ...prev])

    alert(`🎉 ${kit.name} redeemed successfully! Your impact is making a difference in African communities.`)
  }

  const toggleOfflineMode = () => {
    setIsOfflineMode(!isOfflineMode)
    if (!isOfflineMode) {
      alert("📱 Offline mode enabled! Course materials downloaded for offline access.")
    }
  }

  const exportProgress = async () => {
    const progressData = {
      userStats,
      completedModules: moduleProgress,
      transactions,
      wallet: wallet.connected ? { address: wallet.address, balance: wallet.flbBalance } : null,
      timestamp: new Date().toISOString(),
    }

    const progressText = JSON.stringify(progressData, null, 2)
    const result = await ClipboardManager.copyToClipboard(progressText)

    if (result.success) {
      alert("📋 Progress data copied to clipboard!")
    } else {
      // Fallback to download
      const blob = new Blob([progressText], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `flameborn-progress-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const renderModuleContent = () => {
    if (!activeModule) return null

    switch (activeModule.type) {
      case "interactive":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-orange-800 mb-2">{activeModule.title}</h2>
              <p className="text-gray-600">{activeModule.description}</p>
            </div>

            {activeModule.content.concepts &&
              activeModule.content.concepts.map((concept: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-xl font-semibold text-orange-800 mb-2">"{concept.concept}"</p>
                          <p className="text-lg text-gray-700 italic">"{concept.translation}"</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-2">Ubuntu Meaning:</h4>
                          <p className="text-gray-700">{concept.explanation}</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-amber-800 mb-2">Modern Application:</h4>
                          <p className="text-gray-700">{concept.modernApplication}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            {activeModule.content.proverbs &&
              activeModule.content.proverbs.map((proverb: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-xl font-semibold text-green-800 mb-2">"{proverb.akan}"</p>
                          <p className="text-lg text-gray-700 italic">"{proverb.english}"</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Wisdom:</h4>
                          <p className="text-gray-700">{proverb.meaning}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Healing Application:</h4>
                          <p className="text-gray-700">{proverb.healing}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            <div className="text-center pt-6">
              <Button onClick={() => completeModule(activeModule.id)} className="bg-orange-600 hover:bg-orange-700">
                Complete Module & Earn {activeModule.flbReward} FLB
              </Button>
            </div>
          </div>
        )

      case "quiz":
        const questions = activeModule.content.questions as QuizQuestion[]
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-orange-800 mb-2">{activeModule.title}</h2>
              <p className="text-gray-600">{activeModule.description}</p>
              <Progress value={(userAnswers.length / questions.length) * 100} className="mt-4" />
            </div>

            {questions.map((question, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Question {index + 1}: {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant={userAnswers[index] === optionIndex ? "default" : "outline"}
                        className="w-full text-left justify-start"
                        onClick={() => handleQuizAnswer(index, optionIndex)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {userAnswers[index] !== undefined && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Ubuntu Wisdom:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {userAnswers.length === questions.length && (
              <div className="text-center pt-6">
                <div className="mb-4">
                  <p className="text-lg font-semibold">Your Ubuntu Score: {calculateQuizScore()}%</p>
                </div>
                <Button
                  onClick={() => completeModule(activeModule.id, calculateQuizScore())}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Complete Quiz & Earn Rewards
                </Button>
              </div>
            )}
          </div>
        )

      case "story":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-orange-800 mb-2">{activeModule.title}</h2>
              <p className="text-gray-600">{activeModule.description}</p>
            </div>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Ubuntu Story Prompt:</h3>
                <p className="text-gray-700 mb-6">{activeModule.content.prompt}</p>

                <div className="space-y-4">
                  <Input placeholder="Story title (optional)" className="w-full" />
                  <Textarea
                    placeholder="Share your Ubuntu story here..."
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{storyContent.split(" ").filter((word) => word.length > 0).length} words</span>
                    <span>
                      Min: {activeModule.content.minWords} | Max: {activeModule.content.maxWords}
                    </span>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button
                    onClick={() => completeModule(activeModule.id)}
                    disabled={
                      storyContent.split(" ").filter((word) => word.length > 0).length < activeModule.content.minWords
                    }
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Share Ubuntu Story & Earn {activeModule.flbReward} FLB
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "video":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-orange-800 mb-2">{activeModule.title}</h2>
              <p className="text-gray-600">{activeModule.description}</p>
            </div>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Video: {activeModule.title}</p>
                    <p className="text-sm text-gray-500">Duration: {activeModule.duration} minutes</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Ubuntu Learning Points:</h3>
                  <ul className="space-y-2">
                    {activeModule.content.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center pt-6">
                  <Button onClick={() => completeModule(activeModule.id)} className="bg-green-600 hover:bg-green-700">
                    Mark as Watched & Earn {activeModule.flbReward} FLB
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  if (activeModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setActiveModule(null)} className="mb-4">
              ← Back to Learn & Earn
            </Button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            {renderModuleContent()}
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold mb-4">Learn. Earn. Heal Africa.</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Educate yourself on African healing wisdom, earn FLB tokens, and support real treatment centers across the
              continent through Ubuntu principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                Start Learning Ubuntu
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 text-lg bg-transparent"
              >
                How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{userStats.totalFLB}</div>
              <div className="text-sm text-gray-600">FLB Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{userStats.totalXP}</div>
              <div className="text-sm text-gray-600">Ubuntu XP</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{userStats.completedModules}</div>
              <div className="text-sm text-gray-600">Modules Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{userStats.impactScore}</div>
              <div className="text-sm text-gray-600">Impact Score</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ubuntu Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-green-50">
            <CardContent className="p-6 text-center">
              <Coins className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Earn FLB</h3>
              <p className="text-gray-600">Complete Ubuntu quests</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="p-6 text-center">
              <HandHeart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Heal</h3>
              <p className="text-gray-600">Support African healing</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50">
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Learn</h3>
              <p className="text-gray-600">Grow Ubuntu wisdom</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Connect</h3>
              <p className="text-gray-600">Community support</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wallet Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Your FLB Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!wallet.connected ? (
                <div className="text-center py-8">
                  <Wallet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Wallet Not Connected</h3>
                  <p className="text-gray-600 mb-4">
                    Connect your Celo-compatible wallet to earn and manage FLB tokens
                  </p>
                  <Button onClick={() => setShowWalletModal(true)} className="bg-green-600 hover:bg-green-700">
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-lg font-medium">Connected Wallet</h3>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="font-mono text-sm">
                        {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">FLB Balance:</span>
                      <span className="font-bold text-green-600">{wallet.flbBalance} FLB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CELO Balance:</span>
                      <span className="font-bold text-yellow-600">{wallet.celoBalance.toFixed(2)} CELO</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <HandHeart className="w-4 h-4 mr-2" />
                      Donate
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Transfer
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No transactions yet</p>
                  <p className="text-sm text-gray-400">Complete courses to earn FLB tokens</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p
                          className={`font-medium ${
                            tx.type === "earned"
                              ? "text-green-600"
                              : tx.type === "donated"
                                ? "text-blue-600"
                                : "text-purple-600"
                          }`}
                        >
                          {tx.type === "earned" ? "+" : "-"}
                          {tx.amount} FLB
                        </p>
                        <p className="text-sm text-gray-500">{tx.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{tx.timestamp.toLocaleDateString()}</p>
                        <Badge className="bg-green-100 text-green-800 text-xs">{tx.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Offline Mode Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isOfflineMode ? (
                <WifiOff className="h-6 w-6 text-yellow-500 mr-3" />
              ) : (
                <Wifi className="h-6 w-6 text-yellow-500 mr-3" />
              )}
              <div>
                <h3 className="text-lg font-medium text-yellow-800">
                  {isOfflineMode ? "Offline Mode Active" : "Offline Mode Available"}
                </h3>
                <p className="text-yellow-700">
                  {isOfflineMode
                    ? "Course materials downloaded. Progress will sync when online."
                    : "Download course materials for offline access in rural areas."}
                </p>
              </div>
            </div>
            <Button
              onClick={toggleOfflineMode}
              variant="outline"
              className="border-yellow-400 text-yellow-800 bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              {isOfflineMode ? "Disable" : "Enable"} Offline Mode
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-orange-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              <option value="Ubuntu Wisdom">Ubuntu Wisdom</option>
              <option value="Cultural Heritage">Cultural Heritage</option>
              <option value="Health Advocacy">Health Advocacy</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-white border border-orange-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <Button onClick={exportProgress} variant="outline" className="border-orange-300 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Progress
          </Button>
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          id="courses"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {filteredModules.map((module, index) => {
            const IconComponent = categoryIcons[module.category]
            const isCompleted = moduleProgress[module.id]

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    isCompleted ? "border-green-500 bg-green-50" : ""
                  }`}
                  onClick={() => {
                    setSelectedCourse(module)
                    setShowCourseModal(true)
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-6 w-6 text-orange-500" />
                        <Badge className={difficultyColors[module.difficulty]}>{module.difficulty}</Badge>
                      </div>
                      {isCompleted && <CheckCircle className="h-6 w-6 text-green-500" />}
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {module.duration} min
                        </span>
                        <span>{module.category}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-orange-600 font-medium">{module.flbReward} FLB</span>
                          <span className="text-gray-500"> + </span>
                          <span className="text-blue-600 font-medium">{module.xpReward} XP</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {module.type}
                        </Badge>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          startModule(module)
                        }}
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={isCompleted}
                      >
                        {isCompleted ? "Completed" : "Start Module"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* FLB Redemption Kits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">FLB Redemption Kits</h2>
          <p className="text-center text-gray-600 mb-8">Turn your Ubuntu tokens into real impact</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {redemptionKits.map((kit) => (
              <Card key={kit.id} className={`${kit.color} border-2`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{kit.name}</h3>
                  <div className="flex items-center mb-4">
                    <Badge className="bg-white text-gray-800">
                      {kit.cost} {kit.currency}
                    </Badge>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {kit.items.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => redeemKit(kit.id)}
                    disabled={!wallet.connected || wallet.flbBalance < kit.cost}
                    className="w-full"
                  >
                    {wallet.connected
                      ? wallet.flbBalance >= kit.cost
                        ? "Redeem Kit"
                        : "Insufficient FLB"
                      : "Connect Wallet"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Ubuntu Quest System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 rounded-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Ubuntu Quest System</h2>
          <p className="text-center text-gray-600 mb-8">Grow your impact through collective learning and action</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Youth Skill Path</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 text-green-800 rounded-full p-2">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Learner</p>
                      <p className="text-sm text-gray-500">Earn basic FLB</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full p-2">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Advocate</p>
                      <p className="text-sm text-gray-500">Gain DAO voting</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full p-2">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Mentor</p>
                      <p className="text-sm text-gray-500">Local visibility</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Circle of Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-100 text-yellow-800 rounded-full p-2 mt-1">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Clan-based rewards</p>
                      <p className="text-sm text-gray-500">Earn Ubuntu Points collectively</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-100 text-red-800 rounded-full p-2 mt-1">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Community Quests</p>
                      <p className="text-sm text-gray-500">Health Jams, Elder Interviews</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Revive a Clinic</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 text-green-800 rounded-full p-2 mt-1">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">Youth upload challenge</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full p-2 mt-1">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">DAO vote initiated</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full p-2 mt-1">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">FLB donation triggered</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Making a Difference Across Africa</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">1,200+</h3>
                <p className="text-gray-600">Ubuntu Learners</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Coins className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">250K+</h3>
                <p className="text-gray-600">FLB Tokens Earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Stethoscope className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">15</h3>
                <p className="text-gray-600">Healing Centers Supported</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900">8</h3>
                <p className="text-gray-600">African Countries</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Testnet Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gray-800 text-white rounded-lg p-6 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-yellow-400 mr-3" />
            <span className="text-xl font-medium">This is a TestNet environment</span>
          </div>
          <p className="text-gray-300">
            FLB tokens have no real monetary value. This platform demonstrates Ubuntu-based learning and healing
            principles.
          </p>
        </motion.div>
      </div>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </CardTitle>
              <CardDescription>Choose a wallet to connect to the Ubuntu Learn & Earn platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => connectWallet("valora")}
                className="w-full flex items-center justify-center"
                variant="outline"
              >
                <div className="w-5 h-5 mr-2 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  V
                </div>
                Valora
              </Button>
              <Button
                onClick={() => connectWallet("metamask")}
                className="w-full flex items-center justify-center"
                variant="outline"
              >
                <div className="w-5 h-5 mr-2 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                  M
                </div>
                MetaMask
              </Button>
              <Button
                onClick={() => connectWallet("walletconnect")}
                className="w-full flex items-center justify-center"
                variant="outline"
              >
                <div className="w-5 h-5 mr-2 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  WC
                </div>
                WalletConnect
              </Button>
            </CardContent>
            <div className="p-6 pt-0">
              <Button onClick={() => setShowWalletModal(false)} variant="outline" className="w-full">
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Course Details Modal */}
      {showCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                  <CardDescription className="mt-2">{selectedCourse.description}</CardDescription>
                </div>
                <Button onClick={() => setShowCourseModal(false)} variant="ghost" size="sm">
                  ✕
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {selectedCourse.type} Module
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedCourse.duration} Minutes
                </span>
                <span className="flex items-center">
                  <Coins className="w-4 h-4 mr-1 text-yellow-500" />
                  {selectedCourse.flbReward} FLB
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Ubuntu Learning Objectives</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Understand African healing wisdom and Ubuntu principles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Apply cultural knowledge to modern health challenges</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Contribute to community healing and support networks</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Requirements</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Basic understanding of African cultural values</li>
                    <li>• Internet connection (offline mode available)</li>
                    <li>• Celo-compatible wallet (for FLB token rewards)</li>
                    <li>• Commitment to Ubuntu principles of community healing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0 flex gap-4">
              <Button onClick={() => startModule(selectedCourse)} className="flex-1 bg-green-600 hover:bg-green-700">
                Start Ubuntu Learning
              </Button>
              <Button onClick={() => setShowCourseModal(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
