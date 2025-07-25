import { TestnetStatus } from "@/components/testnet-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Code, Database, Network } from "lucide-react"
import { address } from "@/utils/address" // Declare the variable here

export default function TestnetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Flame className="h-8 w-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-900">FlameBorn Testnet</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ubuntu-powered healthcare tokenization testnet. Where traditional African philosophy meets modern blockchain
            technology.
          </p>
          <div className="mt-4 text-lg font-medium text-orange-600">"I am because we are" - Ubuntu Philosophy</div>
        </div>

        {/* Testnet Status */}
        <TestnetStatus />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-blue-500" />
                <span>FastAPI Backend</span>
              </CardTitle>
              <CardDescription>High-performance Python API with SQLAlchemy ORM</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• RESTful API endpoints</li>
                <li>• User & validator management</li>
                <li>• Transaction processing</li>
                <li>• Healthcare action tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-green-500" />
                <span>Ubuntu Database</span>
              </CardTitle>
              <CardDescription>Community-focused data models and relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Ubuntu member profiles</li>
                <li>• Healthcare worker roles</li>
                <li>• Impact scoring system</li>
                <li>• Community verification</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-purple-500" />
                <span>Validator Network</span>
              </CardTitle>
              <CardDescription>Decentralized validation with Ubuntu consensus</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Proof-of-Ubuntu consensus</li>
                <li>• Validator heartbeats</li>
                <li>• Community governance</li>
                <li>• Impact-based rewards</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* API Documentation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Key endpoints for interacting with the FlameBorn testnet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Core Endpoints</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code>GET /ping</code> - Network heartbeat
                  </li>
                  <li>
                    <code>GET /.well-known/manifest.json</code> - Protocol manifest
                  </li>
                  <li>
                    <code>GET /health</code> - Health check
                  </li>
                  <li>
                    <code>GET /stats</code> - Network statistics
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">User Management</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code>POST /users</code> - Register Ubuntu member
                  </li>
                  <li>
                    <code>GET /users</code> - List all members
                  </li>
                  <li>
                    <code>GET /users/{address}</code> - Get member details
                  </li>
                  <li>
                    <code>PUT /users/{address}/verify</code> - Verify member
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Validators</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code>POST /validators</code> - Register validator
                  </li>
                  <li>
                    <code>GET /validators</code> - List validators
                  </li>
                  <li>
                    <code>POST /validators/{address}/heartbeat</code> - Send heartbeat
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Healthcare Actions</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>
                    <code>POST /healthcare-actions</code> - Record action
                  </li>
                  <li>
                    <code>GET /healthcare-actions</code> - List actions
                  </li>
                  <li>
                    <code>GET /oracle/price</code> - Get FLAME price
                  </li>
                  <li>
                    <code>GET /oracle/network</code> - Network oracle data
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
