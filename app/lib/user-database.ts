// lib/user-database.ts

export type UserRole = "guardian" | "healer" // Keep it simple as per original user DB

export interface BaseUser {
  id: string
  type: UserRole
  fullName: string
  email: string
  registeredAt: string // ISO date string
  profileImage?: string | null
}

export interface Guardian extends BaseUser {
  type: "guardian"
  country: string
  contributionAmount: string // Stored as string, might need parsing
  currency: string
  paymentMethod: string
  motivation: string
  impact: {
    donationsCount: number
    totalDonated: number // Sum of contributionAmounts
    healthWorkersSupported: number // Count of distinct healers supported
  }
  achievements?: Achievement[]
}

export interface Healer extends BaseUser {
  type: "healer"
  role: string // e.g., "Doctor", "Nurse", "Midwife"
  specialization?: string
  region: string // e.g., "East Africa"
  country: string
  city: string
  facilityName?: string
  experience: string // e.g., "5 years"
  credentials: string // Link or description
  walletAddress?: string
  bio?: string
  faceVerified: boolean
  licenseVerified: boolean
  verificationStatus: "pending" | "verified" | "rejected"
  impact: {
    patientsServed: number
    communitiesReached: number
    donationsReceived: number // Sum of donations from Guardians
  }
  achievements?: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string // Lucide icon name or path to image
  awardedAt: string // ISO date string
}

export type User = Guardian | Healer

// User database service using localStorage
export const UserDatabase = {
  // Get all users
  getAllUsers: (): User[] => {
    if (typeof window === "undefined") return []
    const users: User[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("flameborn_user_")) {
        try {
          const userData = JSON.parse(localStorage.getItem(key) || "")
          users.push(userData)
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error)
        }
      }
    }
    return users
  },

  // Get user by ID
  getUserById: (id: string): User | null => {
    if (typeof window === "undefined") return null
    try {
      const userData = localStorage.getItem(`flameborn_user_${id}`)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("Error getting user by ID from localStorage:", error)
      return null
    }
  },

  // Get current user ID from localStorage
  getCurrentUserId: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("flameborn_current_user_id")
  },

  // Get current user
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null
    const currentUserId = UserDatabase.getCurrentUserId()
    if (!currentUserId) return null
    return UserDatabase.getUserById(currentUserId)
  },

  // Set current user ID in localStorage
  setCurrentUserId: (id: string | null): void => {
    if (typeof window === "undefined") return
    if (id) {
      localStorage.setItem("flameborn_current_user_id", id)
    } else {
      localStorage.removeItem("flameborn_current_user_id")
    }
  },

  // Save user
  saveUser: (user: User): boolean => {
    if (typeof window === "undefined") return false
    try {
      localStorage.setItem(`flameborn_user_${user.id}`, JSON.stringify(user))
      return true
    } catch (error) {
      console.error("Error saving user to localStorage:", error)
      return false
    }
  },

  // Update user
  updateUser: (id: string, updates: Partial<User>): User | null => {
    if (typeof window === "undefined") return null
    const user = UserDatabase.getUserById(id)
    if (!user) return null
    const updatedUser = { ...user, ...updates }
    UserDatabase.saveUser(updatedUser)
    // If current user is updated, reflect this if needed (though usually re-fetched)
    return updatedUser
  },

  // Delete user
  deleteUser: (id: string): boolean => {
    if (typeof window === "undefined") return false
    try {
      localStorage.removeItem(`flameborn_user_${id}`)
      if (UserDatabase.getCurrentUserId() === id) {
        UserDatabase.setCurrentUserId(null)
      }
      return true
    } catch (error) {
      console.error("Error deleting user from localStorage:", error)
      return false
    }
  },

  // Get all healers
  getAllHealers: (): Healer[] => {
    return UserDatabase.getAllUsers().filter((user) => user.type === "healer") as Healer[]
  },

  // Get all guardians
  getAllGuardians: (): Guardian[] => {
    return UserDatabase.getAllUsers().filter((user) => user.type === "guardian") as Guardian[]
  },

  // Add achievement to user
  addAchievement: (userId: string, achievement: Achievement): User | null => {
    const user = UserDatabase.getUserById(userId)
    if (!user) return null
    const achievements = user.achievements || []
    const updatedUser = {
      ...user,
      achievements: [...achievements, achievement],
    }
    UserDatabase.saveUser(updatedUser)
    return updatedUser
  },

  // Update user impact
  updateUserImpact: (userId: string, impact: Partial<Guardian["impact"] | Healer["impact"]>): User | null => {
    const user = UserDatabase.getUserById(userId)
    if (!user) return null
    const updatedUser = {
      ...user,
      impact: {
        ...user.impact,
        ...impact,
      },
    }
    UserDatabase.saveUser(updatedUser)
    return updatedUser
  },

  // Verify healer
  verifyHealer: (healerId: string, verified: boolean): Healer | null => {
    const healer = UserDatabase.getUserById(healerId) as Healer | null
    if (!healer || healer.type !== "healer") return null
    const updatedHealer = {
      ...healer,
      licenseVerified: verified, // Assuming licenseVerified is the primary flag
      verificationStatus: verified ? "verified" : "rejected", // Or "pending" if it's a step
    }
    UserDatabase.saveUser(updatedHealer)
    return updatedHealer
  },

  // Simulate login
  loginUser: (email: string /* password?: string */): User | null => {
    if (typeof window === "undefined") return null
    const users = UserDatabase.getAllUsers()
    const user = users.find((u) => u.email === email)
    // In a real app, you'd verify password here
    if (user) {
      UserDatabase.setCurrentUserId(user.id)
      return user
    }
    return null
  },

  // Simulate logout
  logoutUser: (): void => {
    if (typeof window === "undefined") return
    UserDatabase.setCurrentUserId(null)
  },
}
