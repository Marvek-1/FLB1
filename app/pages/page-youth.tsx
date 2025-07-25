"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Flame, Users, BookOpen, Star, Target, Heart, Award, TrendingUp, Zap, Calendar } from "lucide-react"

interface UserData {
  wallet: string
  level: number
  xp: number
  flbBalance: number
  streak: number
  tribe?: string
  achievements: string[]
  completedModules: string[]
  dailyChallenges: Challenge[]
  storiesShared: number
}

interface Challenge {
  id: string
  title: string
  description: string
  category: "learn" | "earn" | "connect" | "create"
  difficulty: "easy" | "medium" | "hard"
  rewardFLB: number
  rewardXP: number
  completed: boolean
  progress: number
  total: number
  timeLeft: string
}

const mockUserData: UserData = {
  wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  level: 3,
  xp: 1250,
  flbBalance: 350,
  streak: 7,
  tribe: "yoruba-learners",
  achievements: ["first-steps", "streak-starter", "wisdom-seeker"],
  completedModules: ["akan-1", "health-1", "ubuntu-1"],
  storiesShared: 5,
  dailyChallenges: [
    {
      id: "daily-1",
      title: "Share Ubuntu Wisdom Story",
      description: "Tell how you helped someone today using Ubuntu philosophy",
      category: "create",
      difficulty: "medium",
      rewardFLB: 25,
      rewardXP: 50,
      completed: false,
      progress: 0,
      total: 1,
      timeLeft: "18h",
    },
    {
      id: "daily-2",
      title: "Master 3 Yoruba Proverbs",
      description: "Learn and understand the cultural context of Yoruba wisdom",
      category: "learn",
      difficulty: "easy",
      rewardFLB: 15,
      rewardXP: 30,
      completed: false,
      progress: 1,
      total: 3,
      timeLeft: "18h",
    },
    {
      id: "daily-3",
      title: "Connect with 2 Tribe Members",
      description: "Build your African network and share knowledge",
      category: "connect",
      difficulty: "easy",
      rewardFLB: 20,
      rewardXP: 25,
      completed: true,
      progress: 2,
      total: 2,
      timeLeft: "18h",
    },
    {
      id: "weekly-1",
      title: "Complete Health Advocacy Course",
      description: "Master community health principles for African communities",
      category: "learn",
      difficulty: "hard",
      rewardFLB: 100,
      rewardXP: 200,
      completed: false,
      progress: 2,
      total: 5,
      timeLeft: "4d",
    },
  ],
}

const tribes = [
  {
    id: "yoruba-learners",
    name: "Yoruba Wisdom Keepers",
    members: 234,
    region: "West Africa",
    description: "Preserving and sharing Yoruba cultural wisdom",
    activity: "high",
  },
  {
    id: "akan-heritage",
    name: "Akan Heritage Circle",
    members: 189,
    region: "Ghana",
    description: "Sankofa philosophy and Akan traditions",
    activity: "high",
  },
  {
    id: "ubuntu-philosophy",
    name: "Ubuntu Philosophy",
    members: 156,
    region: "Southern Africa",
    description: "Living the principle: I am because we are",
    activity: "medium",
  },
  {
    id: "health-heroes",
    name: "Health Heroes",
    members: 298,
    region: "Pan-African",
    description: "Young Africans advancing community health",
    activity: "high",
  },
  {
    id: "tech-innovators",
    name: "Digital Innovators",
    members: 445,
    region: "Pan-African",
    description: "Building Africa's digital future",
    activity: "high",
  },
  {
    id: "eco-warriors",
    name: "Eco Warriors",
    members: 167,
    region: "Pan-African",
    description: "Fighting climate change with African solutions",
    activity: "medium",
  },
]

const achievements = [
  { id: "first-steps", name: "First Steps", description: "Complete your first challenge", icon: "👶", earned: true },
  {
    id: "streak-starter",
    name: "Streak Starter",
    description: "Maintain 7-day learning streak",
    icon: "🔥",
    earned: true,
  },
  { id: "wisdom-seeker", name: "Wisdom Seeker", description: "Learn 10 African proverbs", icon: "🧠", earned: true },
  {
    id: "community-builder",
    name: "Community Builder",
    description: "Join your first tribe",
    icon: "🏗️",
    earned: false,
  },
  { id: "story-teller", name: "Story Teller", description: "Share 10 Ubuntu stories", icon: "📚", earned: false },
  {
    id: "health-champion",
    name: "Health Champion",
    description: "Complete health advocacy course",
    icon: "🩺",
    earned: false,
  },
  {
    id: "culture-keeper",
    name: "Culture Keeper",
    description: "Master 3 different African languages",
    icon: "🌍",
    earned: false,
  },
  { id: "flame-bearer", name: "Flame Bearer", description: "Earn 500 FLB tokens", icon: "🔥", earned: false },
  { id: "ubuntu-master", name: "Ubuntu Master", description: "Embody Ubuntu in 50 actions", icon: "❤️", earned: false },
]

export default function YouthPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("challenges")

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setUserData(mockUserData)
      } catch (error) {
        console.error("Error loading user data:", error)
        setUserData(mockUserData)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  const completeChallenge = async (challengeId: string) => {
    if (!userData) return

    setUserData((prev) => {
      if (!prev) return null

      const challenge = prev.dailyChallenges.find((c) => c.id === challengeId)
      if (!challenge || challenge.completed) return prev

      return {
        ...prev,
        dailyChallenges: prev.dailyChallenges.map((c) =>
          c.id === challengeId ? { ...c, completed: true, progress: c.total } : c,
        ),
        flbBalance: prev.flbBalance + challenge.rewardFLB,
        xp: prev.xp + challenge.rewardXP,
      }
    })
  }

  const joinTribe = async (tribeId: string) => {
    if (!userData) return

    setUserData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        tribe: tribeId,
      }
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "learn":
        return <BookOpen className="w-4 h-4" />
      case "earn":
        return <Zap className="w-4 h-4" />
      case "connect":
        return <Users className="w-4 h-4" />
      case "create":
        return <Star className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "learn":
        return "bg-blue-500"
      case "earn":
        return "bg-yellow-500"
      case "connect":
        return "bg-green-500"
      case "create":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "hard":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-orange-400 font-medium text-lg">Loading your FlameBorn journey...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-orange-400">Welcome to FlameBorn Youth</CardTitle>
            <CardDescription className="text-center text-slate-300">
              Connect your wallet to start your African wisdom journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">Connect Wallet</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const nextLevelXP = userData.level * 1000
  const progressPercentage = (userData.xp / nextLevelXP) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 py-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Young <span className="text-yellow-300">FlameBorn</span> Rising
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8">
              Learn African Wisdom • Earn FLB Tokens • Build Ubuntu Community
            </p>

            {/* User Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <motion.div className="bg-white/10 backdrop-blur-sm rounded-lg p-4" whileHover={{ scale: 1.05 }}>
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-yellow-300 mr-2" />
                  <span className="text-2xl font-bold">Level {userData.level}</span>
                </div>
                <div className="text-sm text-orange-200">
                  {userData.xp}/{nextLevelXP} XP
                </div>
                <Progress value={progressPercentage} className="mt-2 h-2" />
              </motion.div>

              <motion.div className="bg-white/10 backdrop-blur-sm rounded-lg p-4" whileHover={{ scale: 1.05 }}>
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-yellow-300 mr-2" />
                  <span className="text-2xl font-bold">{userData.flbBalance}</span>
                </div>
                <div className="text-sm text-orange-200">FLB Earned</div>
              </motion.div>

              <motion.div className="bg-white/10 backdrop-blur-sm rounded-lg p-4" whileHover={{ scale: 1.05 }}>
                <div className="flex items-center justify-center mb-2">
                  <Flame className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-2xl font-bold">{userData.streak}</span>
                </div>
                <div className="text-sm text-orange-200">Day Streak</div>
              </motion.div>

              <motion.div className="bg-white/10 backdrop-blur-sm rounded-lg p-4" whileHover={{ scale: 1.05 }}>
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-green-400 mr-2" />
                  <span className="text-2xl font-bold">{userData.achievements.length}</span>
                </div>
                <div className="text-sm text-orange-200">Achievements</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="challenges" className="data-[state=active]:bg-orange-600">
              <Target className="w-4 h-4 mr-2" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="learn-earn" className="data-[state=active]:bg-orange-600">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn & Earn
            </TabsTrigger>
            <TabsTrigger value="tribes" className="data-[state=active]:bg-orange-600">
              <Users className="w-4 h-4 mr-2" />
              Tribes
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-orange-600">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Daily Challenges */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-400">
                    <Calendar className="w-5 h-5 mr-2" />
                    Daily Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.dailyChallenges
                    .filter((c) => c.timeLeft.includes("h"))
                    .map((challenge) => (
                      <motion.div
                        key={challenge.id}
                        className="bg-slate-700 rounded-lg p-4"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${getCategoryColor(challenge.category)} mr-3`}>
                              {getCategoryIcon(challenge.category)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{challenge.title}</h3>
                              <p className="text-sm text-slate-300">{challenge.description}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-yellow-400">
                            <Zap className="w-4 h-4 mr-1" />
                            <span className="font-bold">+{challenge.rewardFLB} FLB</span>
                          </div>
                          <div className="text-sm text-slate-400">{challenge.timeLeft} left</div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>
                              {challenge.progress}/{challenge.total}
                            </span>
                          </div>
                          <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                        </div>

                        <Button
                          className="w-full bg-orange-600 hover:bg-orange-700"
                          disabled={challenge.completed}
                          onClick={() => completeChallenge(challenge.id)}
                        >
                          {challenge.completed ? "Completed!" : "Start Challenge"}
                        </Button>
                      </motion.div>
                    ))}
                </CardContent>
              </Card>

              {/* Weekly Challenges */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-400">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Weekly Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.dailyChallenges
                    .filter((c) => c.timeLeft.includes("d"))
                    .map((challenge) => (
                      <motion.div
                        key={challenge.id}
                        className="bg-slate-700 rounded-lg p-4"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${getCategoryColor(challenge.category)} mr-3`}>
                              {getCategoryIcon(challenge.category)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{challenge.title}</h3>
                              <p className="text-sm text-slate-300">{challenge.description}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-yellow-400">
                            <Zap className="w-4 h-4 mr-1" />
                            <span className="font-bold">+{challenge.rewardFLB} FLB</span>
                          </div>
                          <div className="text-sm text-slate-400">{challenge.timeLeft} left</div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>
                              {challenge.progress}/{challenge.total}
                            </span>
                          </div>
                          <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                        </div>

                        <Button
                          className="w-full bg-red-600 hover:bg-red-700"
                          disabled={challenge.completed}
                          onClick={() => completeChallenge(challenge.id)}
                        >
                          {challenge.completed ? "Completed!" : "Continue Challenge"}
                        </Button>
                      </motion.div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Learn & Earn Tab */}
          <TabsContent value="learn-earn">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-orange-400">Learn & Earn Portal</CardTitle>
                <p className="text-center text-slate-300">Master African wisdom and earn FLB tokens</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div
                    className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                    <h3 className="text-xl font-bold mb-2">Interactive Modules</h3>
                    <p className="text-blue-200 mb-4">Explore African proverbs with cultural context</p>
                    <Button
                      className="w-full bg-blue-700 hover:bg-blue-800"
                      onClick={() => (window.location.href = "/learn-earn")}
                    >
                      Start Learning
                    </Button>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Target className="w-12 h-12 mx-auto mb-4 text-green-200" />
                    <h3 className="text-xl font-bold mb-2">Quiz Challenges</h3>
                    <p className="text-green-200 mb-4">Test your knowledge and earn FLB</p>
                    <Button
                      className="w-full bg-green-700 hover:bg-green-800"
                      onClick={() => (window.location.href = "/learn-earn?tab=quiz")}
                    >
                      Take Quiz
                    </Button>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Heart className="w-12 h-12 mx-auto mb-4 text-purple-200" />
                    <h3 className="text-xl font-bold mb-2">Story Sharing</h3>
                    <p className="text-purple-200 mb-4">Share your Ubuntu philosophy stories</p>
                    <Button
                      className="w-full bg-purple-700 hover:bg-purple-800"
                      onClick={() => (window.location.href = "/learn-earn?tab=stories")}
                    >
                      Share Story
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tribes Tab */}
          <TabsContent value="tribes" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tribes.map((tribe) => (
                <motion.div
                  key={tribe.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{tribe.name}</h3>
                      <p className="text-slate-300 mb-2">{tribe.description}</p>
                      <div className="flex items-center text-sm text-slate-400">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{tribe.members} members</span>
                        <span className="mx-2">•</span>
                        <span className="text-orange-400">{tribe.region}</span>
                        <span className="mx-2">•</span>
                        <span
                          className={`${
                            tribe.activity === "high"
                              ? "text-green-400"
                              : tribe.activity === "medium"
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {tribe.activity} activity
                        </span>
                      </div>
                    </div>
                    {userData.tribe === tribe.id && <Badge className="bg-green-600">Your Tribe</Badge>}
                  </div>

                  <Button
                    className={`w-full ${
                      userData.tribe === tribe.id
                        ? "bg-slate-600 hover:bg-slate-700"
                        : "bg-orange-600 hover:bg-orange-700"
                    }`}
                    onClick={() => userData.tribe !== tribe.id && joinTribe(tribe.id)}
                  >
                    {userData.tribe === tribe.id ? "View Tribe" : "Join Tribe"}
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-yellow-400">Your Achievements</CardTitle>
                <p className="text-center text-slate-300">Unlock badges as you grow in the FlameBorn community</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      className={`p-6 rounded-lg text-center ${
                        achievement.earned
                          ? "bg-gradient-to-br from-yellow-600 to-orange-600"
                          : "bg-slate-700 opacity-50"
                      }`}
                      whileHover={{ scale: achievement.earned ? 1.05 : 1 }}
                    >
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <h3 className={`font-bold mb-1 ${achievement.earned ? "text-white" : "text-slate-400"}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${achievement.earned ? "text-yellow-100" : "text-slate-500"}`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && <Badge className="mt-2 bg-yellow-500 text-black">Earned!</Badge>}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
