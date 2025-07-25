"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-dusk flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-ember rounded-lg border border-flame-red text-center">
        <h2 className="text-2xl font-heading text-flame-red mb-4">Something went wrong</h2>
        <p className="text-white mb-6">
          We apologize for the inconvenience. The Flameborn system encountered an unexpected error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="flame-button">
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
