"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
}

interface YouthContextType {
  userData: UserData | null
  isLoading: boolean
  completeChallenge: (challengeId: string) => Promise<void>
  completeModule: (moduleId: string, score: number) => Promise<void>
  joinTribe: (tribeId: string) => Promise<void>
  shareStory: (content: string) => Promise<void>
  claimReward: (type: "challenge" | "module", id: string) => Promise<void>
  updateStreak: () => void
}

const YouthContext = createContext<YouthContextType | null>(null)

export function YouthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        // In production: Fetch from backend API
        const mockData: UserData = {
          wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          level: 3,
          xp: 1250,
          flbBalance: 350,
          streak: 7,
          tribe: "yoruba-learners",
          achievements: ["first-steps", "streak-starter"],
          completedModules: ["akan-1", "health-1"],
          storiesShared: 5,
          dailyChallenges: [
            {
              id: "daily-1",
              title: "Share a wisdom story",
              description: "Contribute to our community knowledge base",
              category: "create",
              difficulty: "medium",
              rewardFLB: 10,
              rewardXP: 30,
              completed: false,
              progress: 0,
              total: 1,
            },
            {
              id: "daily-2",
              title: "Learn 3 proverbs",
              description: "Discover African wisdom",
              category: "learn",
              difficulty: "easy",
              rewardFLB: 15,
              rewardXP: 25,
              completed: false,
              progress: 1,
              total: 3,
            },
          ],
        }
        setUserData(mockData)
      } catch (error) {
        console.error("Failed to load user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const completeChallenge = async (challengeId: string) => {
    if (!userData) return

    // Update local state immediately for UX
    setUserData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        dailyChallenges: prev.dailyChallenges.map((c) =>
          c.id === challengeId ? { ...c, completed: true, progress: c.total } : c,
        ),
      }
    })

    // Backend integration would happen here
    console.log(`Challenge ${challengeId} completed`)
  }

  const completeModule = async (moduleId: string, score: number) => {
    if (!userData) return

    // Calculate rewards based on score
    const baseReward = 25
    const bonusReward = Math.floor((score / 100) * baseReward)
    const totalFLBReward = baseReward + bonusReward
    const totalXPReward = Math.floor(totalFLBReward * 1.5)

    setUserData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        flbBalance: prev.flbBalance + totalFLBReward,
        xp: prev.xp + totalXPReward,
        completedModules: [...prev.completedModules, moduleId],
      }
    })

    console.log(`Module ${moduleId} completed with score ${score}%`)
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

    console.log(`Joined tribe ${tribeId}`)
  }

  const shareStory = async (content: string) => {
    if (!userData) return

    const storyReward = 20
    const xpReward = 35

    setUserData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        flbBalance: prev.flbBalance + storyReward,
        xp: prev.xp + xpReward,
        storiesShared: prev.storiesShared + 1,
      }
    })

    console.log("Story shared successfully")
  }

  const claimReward = async (type: "challenge" | "module", id: string) => {
    console.log(`Claiming reward for ${type}: ${id}`)
    // Blockchain interaction would happen here
  }

  const updateStreak = () => {
    if (!userData) return

    const today = new Date().toDateString()
    const lastActivity = localStorage.getItem("lastActivity")

    if (lastActivity !== today) {
      setUserData((prev) => {
        if (!prev) return null
        return {
          ...prev,
          streak: prev.streak + 1,
        }
      })
      localStorage.setItem("lastActivity", today)
    }
  }

  return (
    <YouthContext.Provider
      value={{
        userData,
        isLoading,
        completeChallenge,
        completeModule,
        joinTribe,
        shareStory,
        claimReward,
        updateStreak,
      }}
    >
      {children}
    </YouthContext.Provider>
  )
}

export const useYouth = () => {
  const context = useContext(YouthContext)
  if (!context) {
    throw new Error("useYouth must be used within a YouthProvider")
  }
  return context
}
