"use client"

import { useState, useEffect, useCallback } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Flame,
  RefreshCw,
  Eye,
  EyeOff,
  AlertCircle,
  BarChart3,
  Globe,
  Shield,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Alert, AlertDescription } from "@/app/components/ui/alert"

const FlameBornAnalyticsDashboard = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [tokenData, setTokenData] = useState({
    price: 0.0,
    priceChange24h: 0,
    volume24h: 0,
    marketCap: 0,
    totalSupply: 1000000000,
    circulatingSupply: 750000000,
    holders: 0,
    transactions24h: 0,
    burnedTokens: 25000000,
    stakingRewards: 15000000,
  })

  const [priceHistory, setPriceHistory] = useState([])
  const [volumeHistory, setVolumeHistory] = useState([])
  const [holderDistribution, setHolderDistribution] = useState([])
  const [topHolders, setTopHolders] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [healthcareMetrics, setHealthcareMetrics] = useState({
    registeredWorkers: 0,
    verifiedBirths: 0,
    donationsDistributed: 0,
    impactScore: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showAddresses, setShowAddresses] = useState(false)
  const [alerts, setAlerts] = useState([])

  // Simulated Celo Web3 connection with FlameBorn-specific data
  const connectToCelo = useCallback(async () => {
    setIsLoading(true)
    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsConnected(true)

      // Generate realistic FlameBorn token data
      const basePrice = 0.00125
      const priceVariation = (Math.random() - 0.5) * 0.0002
      const currentPrice = basePrice + priceVariation

      const mockTokenData = {
        price: currentPrice,
        priceChange24h: (Math.random() - 0.5) * 20,
        volume24h: Math.random() * 50000 + 10000,
        marketCap: currentPrice * 750000000,
        totalSupply: 1000000000,
        circulatingSupply: 750000000,
        holders: Math.floor(Math.random() * 1000) + 5000,
        transactions24h: Math.floor(Math.random() * 500) + 200,
        burnedTokens: 25000000,
        stakingRewards: 15000000,
      }

      setTokenData(mockTokenData)

      // Generate healthcare-specific metrics
      setHealthcareMetrics({
        registeredWorkers: Math.floor(Math.random() * 500) + 1200,
        verifiedBirths: Math.floor(Math.random() * 100) + 450,
        donationsDistributed: Math.floor(Math.random() * 50000) + 125000,
        impactScore: Math.floor(Math.random() * 20) + 85,
      })

      // Generate price history (24 hours)
      const priceData = []
      for (let i = 23; i >= 0; i--) {
        const hour = new Date()
        hour.setHours(hour.getHours() - i)
        priceData.push({
          time: hour.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          price: basePrice + (Math.random() - 0.5) * 0.0003,
          volume: Math.random() * 5000 + 1000,
          impact: Math.random() * 100 + 50,
        })
      }
      setPriceHistory(priceData)
      setVolumeHistory(priceData)

      // Generate holder distribution with Ubuntu philosophy focus
      setHolderDistribution([
        {
          range: "Community (1-100)",
          holders: 3500,
          percentage: 70,
          color: "#ff6b6b",
          description: "Grassroots supporters",
        },
        {
          range: "Advocates (100-1K)",
          holders: 1000,
          percentage: 20,
          color: "#4ecdc4",
          description: "Active participants",
        },
        {
          range: "Guardians (1K-10K)",
          holders: 400,
          percentage: 8,
          color: "#45b7d1",
          description: "Community leaders",
        },
        {
          range: "Healers (10K-100K)",
          holders: 80,
          percentage: 1.6,
          color: "#f9ca24",
          description: "Healthcare workers",
        },
        { range: "Elders (100K+)", holders: 20, percentage: 0.4, color: "#6c5ce7", description: "Core contributors" },
      ])

      // Generate top holders with role-based addresses
      const holders = []
      const roles = ["Guardian", "Healer", "Community", "Validator", "Foundation"]
      for (let i = 0; i < 10; i++) {
        holders.push({
          address: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
          balance: Math.floor(Math.random() * 10000000) + 100000,
          percentage: ((Math.floor(Math.random() * 1000) + 100) / 100).toFixed(2),
          role: roles[Math.floor(Math.random() * roles.length)],
          verified: Math.random() > 0.3,
        })
      }
      setTopHolders(holders.sort((a, b) => b.balance - a.balance))

      // Generate recent transactions with Ubuntu context
      const transactions = []
      const txTypes = ["Birth Registration", "Donation", "Staking Reward", "Community Vote", "Healthcare Payment"]
      for (let i = 0; i < 20; i++) {
        const date = new Date()
        date.setMinutes(date.getMinutes() - Math.random() * 60)
        transactions.push({
          hash: `0x${Math.random().toString(16).substring(2, 10)}...`,
          type: txTypes[Math.floor(Math.random() * txTypes.length)],
          amount: Math.floor(Math.random() * 100000) + 1000,
          price: basePrice + (Math.random() - 0.5) * 0.0001,
          time: date.toLocaleTimeString(),
          from: `0x${Math.random().toString(16).substring(2, 6)}...`,
          to: `0x${Math.random().toString(16).substring(2, 6)}...`,
          impact: Math.random() > 0.5,
        })
      }
      setRecentTransactions(transactions)

      // Check for alerts
      const newAlerts = []
      if (mockTokenData.priceChange24h > 10) {
        newAlerts.push({ type: "positive", message: "FlameBorn price surged over 10% - Ubuntu spirit rising!" })
      }
      if (mockTokenData.volume24h > 40000) {
        newAlerts.push({ type: "info", message: "High trading volume - Community engagement strong" })
      }
      if (healthcareMetrics.verifiedBirths > 500) {
        newAlerts.push({ type: "positive", message: "Milestone reached: 500+ births verified this period!" })
      }
      setAlerts(newAlerts)
    } catch (error) {
      console.error("Connection failed:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshData = useCallback(() => {
    if (isConnected) {
      connectToCelo()
    }
  }, [isConnected, connectToCelo])

  useEffect(() => {
    connectToCelo()
  }, [connectToCelo])

  useEffect(() => {
    let interval
    if (autoRefresh && isConnected) {
      interval = setInterval(refreshData, 30000) // Refresh every 30 seconds
    }
    return () => clearInterval(interval)
  }, [autoRefresh, isConnected, refreshData])

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"
    return num.toFixed(2)
  }

  const formatCurrency = (num) => "$" + formatNumber(num)

  const StatCard = ({ title, value, change, icon: Icon, color = "blue", description }) => (
    <Card className="border-l-4" style={{ borderLeftColor: color }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            {change !== undefined && (
              <div className={`flex items-center mt-2 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1 text-sm font-medium">{Math.abs(change).toFixed(2)}%</span>
              </div>
            )}
          </div>
          <Icon size={32} style={{ color }} className="opacity-70" />
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Connecting to Celo Network</h2>
          <p className="text-gray-500">Loading FlameBorn Ubuntu analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Flame className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FlameBorn Analytics</h1>
                <p className="text-sm text-gray-500">Ubuntu-powered healthcare tokenomics on Celo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                <span>{isConnected ? "Connected to Celo" : "Disconnected"}</span>
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? "bg-orange-100 text-orange-600" : ""}
              >
                <RefreshCw size={16} className={autoRefresh ? "animate-spin mr-2" : "mr-2"} />
                Auto Refresh
              </Button>
              <Button onClick={refreshData} className="bg-orange-500 hover:bg-orange-600">
                <RefreshCw size={16} className="mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-2">
            {alerts.map((alert, index) => (
              <Alert
                key={index}
                className={
                  alert.type === "positive"
                    ? "border-green-200 bg-green-50"
                    : alert.type === "negative"
                      ? "border-red-200 bg-red-50"
                      : "border-blue-200 bg-blue-50"
                }
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="FLAME Token Price"
            value={`$${tokenData.price.toFixed(6)}`}
            change={tokenData.priceChange24h}
            icon={DollarSign}
            color="#f59e0b"
            description="Ubuntu value exchange"
          />
          <StatCard
            title="24h Volume"
            value={formatCurrency(tokenData.volume24h)}
            icon={Activity}
            color="#10b981"
            description="Community trading"
          />
          <StatCard
            title="Market Cap"
            value={formatCurrency(tokenData.marketCap)}
            icon={BarChart3}
            color="#3b82f6"
            description="Total network value"
          />
          <StatCard
            title="Ubuntu Holders"
            value={formatNumber(tokenData.holders)}
            icon={Users}
            color="#8b5cf6"
            description="Connected community"
          />
        </div>

        {/* Healthcare Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Healthcare Workers"
            value={formatNumber(healthcareMetrics.registeredWorkers)}
            icon={Shield}
            color="#06b6d4"
            description="Verified healers"
          />
          <StatCard
            title="Births Verified"
            value={formatNumber(healthcareMetrics.verifiedBirths)}
            icon={Zap}
            color="#84cc16"
            description="New life celebrated"
          />
          <StatCard
            title="Donations Distributed"
            value={formatCurrency(healthcareMetrics.donationsDistributed)}
            icon={Globe}
            color="#f97316"
            description="Ubuntu in action"
          />
          <StatCard
            title="Impact Score"
            value={`${healthcareMetrics.impactScore}/100`}
            icon={Flame}
            color="#dc2626"
            description="Community health"
          />
        </div>

        {/* Tabs for detailed analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holders">Ubuntu Holders</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="impact">Impact Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>FLAME Price History (24h)</CardTitle>
                  <CardDescription>Ubuntu value flow over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis tickFormatter={(value) => `$${value.toFixed(4)}`} />
                      <Tooltip formatter={(value) => [`$${value.toFixed(6)}`, "Price"]} />
                      <Area type="monotone" dataKey="price" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Volume Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Trading Volume (24h)</CardTitle>
                  <CardDescription>Community engagement levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={volumeHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis tickFormatter={formatNumber} />
                      <Tooltip formatter={(value) => [formatCurrency(value), "Volume"]} />
                      <Bar dataKey="volume" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Token Information */}
              <Card>
                <CardHeader>
                  <CardTitle>FLAME Token Details</CardTitle>
                  <CardDescription>Ubuntu tokenomics overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Supply:</span>
                    <span className="font-medium">{formatNumber(tokenData.totalSupply)} FLAME</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Circulating Supply:</span>
                    <span className="font-medium">{formatNumber(tokenData.circulatingSupply)} FLAME</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Burned Tokens:</span>
                    <span className="font-medium text-red-600">{formatNumber(tokenData.burnedTokens)} FLAME</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Staking Rewards:</span>
                    <span className="font-medium text-green-600">{formatNumber(tokenData.stakingRewards)} FLAME</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Transactions:</span>
                    <span className="font-medium">{tokenData.transactions24h.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Network Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Information</CardTitle>
                  <CardDescription>Celo blockchain details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blockchain:</span>
                    <span className="font-medium">Celo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token Standard:</span>
                    <span className="font-medium">ERC-20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Decimals:</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Philosophy:</span>
                    <span className="font-medium text-orange-600">Ubuntu</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="holders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Holder Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Ubuntu Community Distribution</CardTitle>
                  <CardDescription>How FLAME tokens are distributed across roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={holderDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="percentage"
                        label={({ range, percentage }) => `${percentage}%`}
                      >
                        {holderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value}%`, props.payload.description]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Distribution Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Role-Based Distribution</CardTitle>
                  <CardDescription>Ubuntu community structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {holderDistribution.map((dist, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dist.color }}></div>
                        <div>
                          <span className="font-medium">{dist.range}</span>
                          <p className="text-xs text-muted-foreground">{dist.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{dist.holders.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{dist.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Holders */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Ubuntu Leaders</CardTitle>
                      <CardDescription>Top FLAME token holders by role</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowAddresses(!showAddresses)}>
                      {showAddresses ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span className="ml-2">{showAddresses ? "Hide" : "Show"} Addresses</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Rank</th>
                          <th className="text-left py-3 px-4 font-medium">Address</th>
                          <th className="text-left py-3 px-4 font-medium">Role</th>
                          <th className="text-right py-3 px-4 font-medium">Balance</th>
                          <th className="text-right py-3 px-4 font-medium">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topHolders.map((holder, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">#{index + 1}</td>
                            <td className="py-3 px-4 font-mono text-sm">
                              {showAddresses ? holder.address : "•••••••••••••••"}
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className={holder.verified ? "border-green-500 text-green-700" : ""}
                              >
                                {holder.role}
                                {holder.verified && " ✓"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right font-medium">{formatNumber(holder.balance)} FLAME</td>
                            <td className="py-3 px-4 text-right">{holder.percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Ubuntu Transactions</CardTitle>
                <CardDescription>Latest community activities on the FlameBorn network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Hash</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-right py-3 px-4 font-medium">Amount</th>
                        <th className="text-right py-3 px-4 font-medium">Impact</th>
                        <th className="text-right py-3 px-4 font-medium">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((tx, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-mono text-sm text-blue-600">{tx.hash}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                tx.type.includes("Birth")
                                  ? "default"
                                  : tx.type.includes("Donation")
                                    ? "secondary"
                                    : tx.type.includes("Staking")
                                      ? "outline"
                                      : "default"
                              }
                            >
                              {tx.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">{formatNumber(tx.amount)} FLAME</td>
                          <td className="py-3 px-4 text-right">
                            {tx.impact ? (
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                High
                              </Badge>
                            ) : (
                              <Badge variant="outline">Standard</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right text-sm text-muted-foreground">{tx.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Impact Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Ubuntu Impact Metrics</CardTitle>
                  <CardDescription>Healthcare and community impact over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="impact" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Impact Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Health Metrics</CardTitle>
                  <CardDescription>Real-world Ubuntu impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600 mb-1">Lives Touched</div>
                    <div className="text-2xl font-bold text-green-800">
                      {formatNumber(healthcareMetrics.verifiedBirths * 3.2)} people
                    </div>
                    <div className="text-xs text-green-600">Through birth registrations</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600 mb-1">Healthcare Access</div>
                    <div className="text-2xl font-bold text-blue-800">
                      {formatNumber(healthcareMetrics.registeredWorkers * 150)} patients
                    </div>
                    <div className="text-xs text-blue-600">Monthly reach capacity</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-sm text-orange-600 mb-1">Economic Impact</div>
                    <div className="text-2xl font-bold text-orange-800">
                      {formatCurrency(healthcareMetrics.donationsDistributed * 2.1)}
                    </div>
                    <div className="text-xs text-orange-600">Total economic value created</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-600 mb-1">Ubuntu Network Effect</div>
                    <div className="text-2xl font-bold text-purple-800">
                      {((healthcareMetrics.impactScore / 100) * tokenData.holders).toFixed(0)} connections
                    </div>
                    <div className="text-xs text-purple-600">Active community bonds</div>
                  </div>
                </CardContent>
              </Card>

              {/* Ubuntu Philosophy Impact */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Ubuntu Philosophy in Action</CardTitle>
                  <CardDescription>"I am because we are" - Measuring collective impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                      <div className="text-4xl mb-3">🤝</div>
                      <div className="font-semibold text-lg mb-2">Community Bonds</div>
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {Math.floor(tokenData.holders * 0.73)}
                      </div>
                      <div className="text-sm text-muted-foreground">Active connections</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <div className="text-4xl mb-3">🌱</div>
                      <div className="font-semibold text-lg mb-2">Growth Together</div>
                      <div className="text-2xl font-bold text-green-600 mb-1">{healthcareMetrics.impactScore}%</div>
                      <div className="text-sm text-muted-foreground">Collective progress</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                      <div className="text-4xl mb-3">💫</div>
                      <div className="font-semibold text-lg mb-2">Shared Prosperity</div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {formatNumber(tokenData.volume24h / tokenData.holders)}
                      </div>
                      <div className="text-sm text-muted-foreground">Value per person</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default FlameBornAnalyticsDashboard
