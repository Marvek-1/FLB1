"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Flame, Server, Users, Activity, Heart, RefreshCw } from "lucide-react"
import { apiClient, type NetworkStats } from "@/app/lib/api-client"

export function TestnetStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null)
  const [manifest, setManifest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const checkConnection = async () => {
    try {
      const pingResponse = await apiClient.ping()
      setIsConnected(pingResponse.status === "alive")

      const [statsResponse, manifestResponse] = await Promise.all([
        apiClient.getNetworkStats(),
        apiClient.getManifest(),
      ])

      setNetworkStats(statsResponse)
      setManifest(manifestResponse)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to connect to testnet:", error)
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Connecting to FlameBorn Testnet...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span>FlameBorn Testnet Status</span>
          </CardTitle>
          <CardDescription>Ubuntu Philosophy: "I am because we are"</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant={isConnected ? "default" : "destructive"}>
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>
              {manifest && (
                <div className="text-sm text-muted-foreground">
                  Network: {manifest.network} v{manifest.version}
                </div>
              )}
            </div>
            <Button onClick={checkConnection} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</div>
        </CardContent>
      </Card>

      {/* Network Statistics */}
      {networkStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{networkStats.total_users}</div>
                  <div className="text-xs text-muted-foreground">Ubuntu Members</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{networkStats.total_validators}</div>
                  <div className="text-xs text-muted-foreground">Validators</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{networkStats.total_transactions}</div>
                  <div className="text-xs text-muted-foreground">Transactions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <div>
                  <div className="text-2xl font-bold">{networkStats.total_healthcare_actions}</div>
                  <div className="text-xs text-muted-foreground">Healthcare Actions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ubuntu Score */}
      {networkStats && (
        <Card>
          <CardHeader>
            <CardTitle>Ubuntu Community Score</CardTitle>
            <CardDescription>Measuring collective prosperity and community health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Ubuntu Score</span>
                  <span>{networkStats.ubuntu_score.toFixed(1)}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${networkStats.ubuntu_score}%` }}
                  />
                </div>
              </div>
              <Badge variant={networkStats.ubuntu_score > 50 ? "default" : "secondary"}>
                {networkStats.ubuntu_score > 75 ? "Thriving" : networkStats.ubuntu_score > 50 ? "Growing" : "Emerging"}
              </Badge>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Network Health: <span className="capitalize">{networkStats.network_health}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Protocol Information */}
      {manifest && (
        <Card>
          <CardHeader>
            <CardTitle>Protocol Manifest</CardTitle>
            <CardDescription>FlameBorn testnet configuration and capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Network:</span> {manifest.network}
              </div>
              <div>
                <span className="font-medium">Version:</span> {manifest.version}
              </div>
              <div>
                <span className="font-medium">Oracle:</span> {manifest.oracle ? "Enabled" : "Disabled"}
              </div>
              <div>
                <span className="font-medium">Validator:</span> {manifest.validator ? "Enabled" : "Disabled"}
              </div>
              {manifest.ubuntu_philosophy && (
                <div className="col-span-2">
                  <span className="font-medium">Philosophy:</span> {manifest.ubuntu_philosophy}
                </div>
              )}
              {manifest.consensus && (
                <div>
                  <span className="font-medium">Consensus:</span> {manifest.consensus}
                </div>
              )}
              {manifest.token && (
                <div>
                  <span className="font-medium">Token:</span> {manifest.token}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
