import type { HealthcareWorker } from "./types/healthcare-worker"

export function distributeDonation(totalAmount: number, workers: HealthcareWorker[]): Record<string, number> {
  const distribution: Record<string, number> = {}

  // Calculate total distribution percentage
  const totalPercentage = workers.reduce((sum, worker) => sum + (worker.distributionPercentage || 0), 0)

  if (totalPercentage === 0) {
    // Equal distribution if no percentages set
    const equalAmount = totalAmount / workers.length
    workers.forEach((worker) => {
      distribution[worker.address] = equalAmount
    })
  } else {
    // Distribute based on percentages
    workers.forEach((worker) => {
      const percentage = (worker.distributionPercentage || 0) / totalPercentage
      distribution[worker.address] = totalAmount * percentage
    })
  }

  return distribution
}
