"use client"
// Removed Card, CardContent as they are not directly used for the grid container itself
import { Button } from "@/app/components/ui/button"
import { Loader2, Info, RefreshCw } from "lucide-react"
import { HealthcareWorkerCard } from "@/app/components/healthcare-worker-card"
import type { HealthcareWorker } from "@/app/lib/types/healthcare-worker" // Adjusted import path
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { Card, CardContent } from "@/app/components/ui/card" // Re-added for the "No workers found" case

interface HealthcareWorkersGridProps {
  workers: HealthcareWorker[] // Accept workers as a prop
  onSelectWorker: (worker: HealthcareWorker) => void
  isLoading?: boolean // Accept isLoading as a prop
  onRefresh?: () => void // Optional refresh callback
}

export function HealthcareWorkersGrid({
  workers,
  onSelectWorker,
  isLoading = false, // Default isLoading to false
  onRefresh,
}: HealthcareWorkersGridProps) {
  // Removed local state for workers and isLoading as they are now props
  // Removed loadWorkers and useEffect for fetching as data is passed via props

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Healthcare Workers</h2>

        <div className="flex items-center gap-2">
          {onRefresh && ( // Only show refresh button if onRefresh is provided
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="border-blue-500/30 text-blue-300 hover:bg-blue-950/50"
              aria-label="Refresh healthcare workers list"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-300 hover:bg-blue-950/50"
                aria-label="Information about impact-based distribution"
              >
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-blue-950/90 backdrop-blur-md border-blue-500/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-blue-300">About Impact-Based Distribution</DialogTitle>
                <DialogDescription className="text-blue-100/70">
                  Flameborn uses an equitable distribution algorithm to ensure donations are allocated fairly based on
                  real-world impact.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                <Alert className="bg-blue-950/30 border-blue-500/30">
                  <AlertTitle className="text-blue-300">How It Works</AlertTitle>
                  <AlertDescription className="text-blue-100/70">
                    <p className="mb-2">
                      Our algorithm considers multiple factors to calculate each healthcare worker&apos;s impact score:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Number of patients served</li>
                      <li>Critical cases handled</li>
                      <li>Response time</li>
                      <li>Location accessibility</li>
                      <li>Specialization criticality</li>
                      <li>Recent activity</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <p className="text-sm text-blue-100/70">
                  When you opt for a distributed donation, your contribution is automatically allocated among all
                  verified healthcare workers based on their impact scores. This ensures that those making the biggest
                  difference receive proportional support.
                </p>

                <p className="text-sm text-blue-100/70">
                  The system also includes an equity adjustment to prevent extreme disparities, ensuring that all
                  healthcare workers receive meaningful support. You can also choose to donate directly to a specific
                  worker.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* DonationDistributionChart is now part of EnhancedDonationForm or a separate section if needed */}
      {/* <DonationDistributionChart workers={workers} isLoading={isLoading} /> */}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 mr-3 animate-spin text-blue-400" />
          <span className="text-lg text-blue-100/70">Loading healthcare workers...</span>
        </div>
      ) : workers.length === 0 ? (
        <Card className="border-blue-500/30 bg-black/60 backdrop-blur-xl">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-blue-100/70 mb-4">No healthcare workers found.</p>
            {onRefresh && (
              <Button onClick={onRefresh} className="bg-blue-600 hover:bg-blue-700 text-white">
                <RefreshCw className="h-4 w-4 mr-2" /> Try Refreshing
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workers.map((worker) => (
            <HealthcareWorkerCard key={worker.id} worker={worker} onDonate={onSelectWorker} />
          ))}
        </div>
      )}
    </div>
  )
}
