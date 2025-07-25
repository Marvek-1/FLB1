import type { DatabaseUser } from "./database"

export type UserRole = "guardian" | "healer"

export interface User {
  id: string
  type: UserRole
  fullName: string
  email: string
  registeredAt: string
  profileImage?: string | null
  // Guardian specific
  country?: string
  contributionAmount?: string
  currency?: string
  paymentMethod?: string
  motivation?: string
  // Healer specific
  role?: string
  specialization?: string
  region?: string
  city?: string
  facilityName?: string
  experience?: string
  credentials?: string
  walletAddress?: string
  bio?: string
  faceVerified?: boolean
  licenseVerified?: boolean
  verificationStatus?: "pending" | "verified" | "rejected"
  // Common
  impact?: {
    donationsCount?: number
    totalDonated?: number
    healthWorkersSupported?: number
    patientsServed?: number
    communitiesReached?: number
    donationsReceived?: number
  }
  achievements?: Array<{
    id: string
    title: string
    description: string
    icon: string
    awardedAt: string
  }>
}

// Transform database user to frontend user format
export function transformDatabaseUser(dbUser: DatabaseUser): User {
  return {
    id: dbUser.id,
    type: dbUser.raw_json.type,
    fullName: dbUser.name,
    email: dbUser.email,
    registeredAt: dbUser.created_at,
    profileImage: dbUser.raw_json.profileImage,
    country: dbUser.raw_json.country,
    contributionAmount: dbUser.raw_json.contributionAmount,
    currency: dbUser.raw_json.currency,
    paymentMethod: dbUser.raw_json.paymentMethod,
    motivation: dbUser.raw_json.motivation,
    role: dbUser.raw_json.role,
    specialization: dbUser.raw_json.specialization,
    region: dbUser.raw_json.region,
    city: dbUser.raw_json.city,
    facilityName: dbUser.raw_json.facilityName,
    experience: dbUser.raw_json.experience,
    credentials: dbUser.raw_json.credentials,
    walletAddress: dbUser.raw_json.walletAddress,
    bio: dbUser.raw_json.bio,
    faceVerified: dbUser.raw_json.faceVerified,
    licenseVerified: dbUser.raw_json.licenseVerified,
    verificationStatus: dbUser.raw_json.verificationStatus,
    impact: dbUser.raw_json.impact,
    achievements: dbUser.raw_json.achievements,
  }
}

// Client-side user service
export class UserService {
  private static currentUserId: string | null = null

  // Initialize from localStorage on client
  static init() {
    if (typeof window !== "undefined") {
      this.currentUserId = localStorage.getItem("flameborn_current_user_id")
    }
  }

  // Get current user ID
  static getCurrentUserId(): string | null {
    if (typeof window !== "undefined" && !this.currentUserId) {
      this.currentUserId = localStorage.getItem("flameborn_current_user_id")
    }
    return this.currentUserId
  }

  // Set current user ID
  static setCurrentUserId(id: string | null): void {
    this.currentUserId = id
    if (typeof window !== "undefined") {
      if (id) {
        localStorage.setItem("flameborn_current_user_id", id)
      } else {
        localStorage.removeItem("flameborn_current_user_id")
      }
    }
  }

  // Get current user from API
  static async getCurrentUser(): Promise<User | null> {
    const userId = this.getCurrentUserId()
    if (!userId) return null

    try {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) return null

      const { user } = await response.json()
      return transformDatabaseUser(user)
    } catch (error) {
      console.error("Error fetching current user:", error)
      return null
    }
  }

  // Login user (set as current)
  static async loginUser(email: string): Promise<User | null> {
    try {
      const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`)
      if (!response.ok) return null

      const { users } = await response.json()
      const user = users.find((u: DatabaseUser) => u.email === email)

      if (user) {
        this.setCurrentUserId(user.id)
        return transformDatabaseUser(user)
      }
      return null
    } catch (error) {
      console.error("Error logging in user:", error)
      return null
    }
  }

  // Logout user
  static logoutUser(): void {
    this.setCurrentUserId(null)
  }

  // Create new user
  static async createUser(userData: {
    name: string
    email: string
    type: UserRole
    profileData: any
  }): Promise<User | null> {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) return null

      const { user } = await response.json()
      return transformDatabaseUser(user)
    } catch (error) {
      console.error("Error creating user:", error)
      return null
    }
  }

  // Update user
  static async updateUser(
    id: string,
    updates: {
      name?: string
      email?: string
      profileData?: any
    },
  ): Promise<User | null> {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) return null

      const { user } = await response.json()
      return transformDatabaseUser(user)
    } catch (error) {
      console.error("Error updating user:", error)
      return null
    }
  }
}

// Initialize on import
if (typeof window !== "undefined") {
  UserService.init()
}
