/**
 * Represents a specialization of a healthcare worker.
 */
export interface Specialization {
  id: string
  name: string
}

/**
 * Represents the geographical location of a healthcare worker.
 */
export interface Location {
  name: string
  // A score from 0-10 indicating how remote/hard-to-reach the location is.
  accessibilityScore: number
}

/**
 * Encapsulates the performance and impact metrics for a healthcare worker.
 */
export interface ImpactMetrics {
  // Unix timestamp of the last recorded activity.
  lastActiveTimestamp: number
  patientsServed: number
  criticalCases: number
  // Average response time in minutes.
  responseTimeAvg: number
}

/**
 * Defines the comprehensive structure for a Healthcare Worker profile.
 */
export interface HealthcareWorker {
  // Unique identifier for the worker in the database.
  id: string
  // Wallet address for receiving donations.
  address: string
  name: string
  // Professional credentials (e.g., "Cardiologist, Board Certified").
  credentials: string
  // URL to the worker's profile image.
  profileImage?: string
  // A short biography or description of the worker.
  bio: string
  // Indicates if the worker's credentials have been verified on-chain.
  isVerified: boolean
  location: Location
  specializations: Specialization[]
  impactMetrics: ImpactMetrics
  // The worker's share of distributed donations, calculated based on impact.
  distributionPercentage?: number
}
