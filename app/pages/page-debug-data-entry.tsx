import { TestDataEntry } from "@/components/test-data-entry"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DebugDataEntryPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="text-4xl font-bold flame-text">FLAMEBORN</h1>
        </Link>
        <Link href="/debug">
          <Button variant="outline">Back to Debug</Button>
        </Link>
      </header>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Data Entry Testing</h2>
        <p className="text-center mb-8 text-gray-400">
          Use this page to test data entry functionality without mock data. Any data entered here will be stored in
          memory for the current session.
        </p>

        <TestDataEntry />

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button className="flame-button">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
