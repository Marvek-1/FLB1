// XP calculations
const XP_PER_LEVEL = 1000
const XP_GROWTH_FACTOR = 1.2

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export const xpToNextLevel = (xp: number): number => {
  const currentLevel = calculateLevel(xp)
  return currentLevel * XP_PER_LEVEL * XP_GROWTH_FACTOR - xp
}

// FLB reward algorithm
export const calculateFLBReward = (
  difficulty: "easy" | "medium" | "hard" | "expert",
  timeTaken: number, // in minutes
  accuracy: number, // 0-100%
  streakBonus: number,
): number => {
  const baseRewards = {
    easy: 10,
    medium: 25,
    hard: 50,
    expert: 100,
  }

  // Time bonus (faster completion = higher bonus)
  const timeFactor = Math.max(0, 1 - timeTaken / 30)

  // Accuracy multiplier
  const accuracyMultiplier = accuracy / 100

  // Streak bonus (2% per consecutive day)
  const streakMultiplier = 1 + streakBonus * 0.02

  return Math.round(baseRewards[difficulty] * timeFactor * accuracyMultiplier * streakMultiplier)
}

// Streak management
export const updateStreak = (lastActivity: Date): number => {
  const today = new Date()
  const lastDate = new Date(lastActivity)
  const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

  // If last activity was yesterday, increment streak
  if (diffDays === 1) {
    const currentStreak = Number.parseInt(localStorage.getItem("currentStreak") || "0")
    const newStreak = currentStreak + 1
    localStorage.setItem("currentStreak", newStreak.toString())
    return newStreak
  }

  // If last activity was today, maintain streak
  if (diffDays === 0) {
    return Number.parseInt(localStorage.getItem("currentStreak") || "1")
  }

  // If more than 1 day gap, reset streak
  localStorage.setItem("currentStreak", "1")
  return 1
}

// Achievement checking
export const checkAchievements = (userStats: {
  completedModules: number
  streak: number
  storiesShared: number
  flbEarned: number
  tribesJoined: number
}): string[] => {
  const achievements: string[] = []

  // First Steps - Complete first module
  if (userStats.completedModules >= 1) {
    achievements.push("first-steps")
  }

  // Streak Starter - 7 day streak
  if (userStats.streak >= 7) {
    achievements.push("streak-starter")
  }

  // Wisdom Seeker - Complete 10 modules
  if (userStats.completedModules >= 10) {
    achievements.push("wisdom-seeker")
  }

  // Community Builder - Join a tribe
  if (userStats.tribesJoined >= 1) {
    achievements.push("community-builder")
  }

  // Story Teller - Share 5 stories
  if (userStats.storiesShared >= 5) {
    achievements.push("story-teller")
  }

  // FLB Collector - Earn 100 FLB
  if (userStats.flbEarned >= 100) {
    achievements.push("flb-collector")
  }

  // Streak Master - 30 day streak
  if (userStats.streak >= 30) {
    achievements.push("streak-master")
  }

  // Ubuntu Spirit - Share 50 stories
  if (userStats.storiesShared >= 50) {
    achievements.push("ubuntu-spirit")
  }

  return achievements
}

// Level benefits calculation
export const getLevelBenefits = (level: number) => {
  return {
    flbMultiplier: 1 + (level - 1) * 0.1, // 10% bonus per level
    xpMultiplier: 1 + (level - 1) * 0.05, // 5% bonus per level
    dailyChallenges: Math.min(3 + Math.floor(level / 5), 10), // More challenges at higher levels
    specialAccess: level >= 10, // Special content access at level 10+
  }
}

// Progress tracking utilities
export const calculateProgress = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100)
}

export const getNextMilestone = (current: number, milestones: number[]): number | null => {
  return milestones.find((milestone) => milestone > current) || null
}

// Reward distribution logic
export const distributeRewards = async (
  walletAddress: string,
  flbAmount: number,
  xpAmount: number,
  achievementIds: string[] = [],
) => {
  try {
    // In a real implementation, this would interact with smart contracts
    console.log(`Distributing rewards to ${walletAddress}:`)
    console.log(`- FLB: ${flbAmount}`)
    console.log(`- XP: ${xpAmount}`)
    console.log(`- Achievements: ${achievementIds.join(", ")}`)

    // Mock API call
    const response = await fetch("/api/youth/distribute-rewards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletAddress,
        flbAmount,
        xpAmount,
        achievementIds,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to distribute rewards")
    }

    return await response.json()
  } catch (error) {
    console.error("Error distributing rewards:", error)
    throw error
  }
}
