import { ContractStatus } from "@/components/contract-status"
import { WalletConnector } from "@/components/wallet-connector"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="text-4xl font-bold flame-text">FLAMEBORN</h1>
        </Link>
        <WalletConnector />
      </header>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Debug Dashboard</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <ContractStatus />
          <Card className="bg-ash-gray/30 border border-gray-700">
            <CardHeader>
              <CardTitle className="flame-text">Debug Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/debug/data-entry">
                  <Button className="w-full">Data Entry Testing</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button className="flame-button">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
