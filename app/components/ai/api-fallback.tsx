"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

export function APIFallback({ message, retry }: { message: string; retry?: () => void }) {
  return (
    <div className="p-6 bg-dusk rounded-lg border border-flame-red text-center">
      <AlertTriangle className="h-12 w-12 text-flame-red mx-auto mb-4" />
      <h3 className="text-xl font-heading mb-2">Connection Issue</h3>
      <p className="text-gray-300 mb-4">{message}</p>
      <div className="flex justify-center gap-4">
        {retry && (
          <Button onClick={retry} className="flame-button">
            Try Again
          </Button>
        )}
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    </div>
  )
}
