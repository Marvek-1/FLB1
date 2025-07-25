"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Code,
  Network,
  Play,
  RefreshCw,
  Shield,
  TestTube,
  Zap,
} from "lucide-react"

interface TestResult {
  id: string
  name: string
  status: "passed" | "failed" | "running" | "pending"
  description: string
  duration?: number
  error?: string
  category: "sovereignty" | "generative" | "cultural" | "technical"
}

interface NetworkMetrics {
  blockHeight: number
  gasPrice: number
  tps: number
  validators: number
  uptime: number
  lastBlockTime: number
}

const mockNetworkMetrics: NetworkMetrics = {
  blockHeight: 15847,
  gasPrice: 0.000001,
  tps: 45,
  validators: 12,
  uptime: 99.8,
  lastBlockTime: 2.1,
}

const mockTestResults: TestResult[] = [
  {
    id: "sovereignty-1",
    name: "African Sovereignty Enforcement",
    status: "passed",
    description: "Verify no outsider transactions are processed",
    duration: 1.2,
    category: "sovereignty",
  },
  {
    id: "generative-1",
    name: "Generative Minting Validation",
    status: "passed",
    description: "Ensure FLB tokens only mint with valid actions",
    duration: 0.8,
    category: "generative",
  },
  {
    id: "cultural-1",
    name: "Proverb Anchoring System",
    status: "passed",
    description: "Test African wisdom validation pipeline",
    duration: 0.5,
    category: "cultural",
  },
  {
    id: "technical-1",
    name: "Smart Contract Deployment",
    status: "running",
    description: "Deploy and verify all FlameBorn contracts",
    category: "technical",
  },
  {
    id: "sovereignty-2",
    name: "Ubuntu Philosophy Enforcement",
    status: "passed",
    description: "Validate community-first transaction logic",
    duration: 1.5,
    category: "sovereignty",
  },
  {
    id: "generative-2",
    name: "Action-Based Token Flow",
    status: "failed",
    description: "Test contribution-to-token conversion",
    error: "Proverb validation timeout",
    category: "generative",
  },
  {
    id: "cultural-2",
    name: "Multi-Language Proverb Support",
    status: "pending",
    description: "Test Akan, Yoruba, Swahili, and Zulu proverbs",
    category: "cultural",
  },
  {
    id: "technical-2",
    name: "Network Performance Stress Test",
    status: "pending",
    description: "Simulate high-load African community usage",
    category: "technical",
  },
]

export function TestnetSuite() {
  const [testResults, setTestResults] = useState<TestResult[]>(mockTestResults)
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics>(mockNetworkMetrics)
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    // Simulate real-time network updates
    const interval = setInterval(() => {
      setNetworkMetrics((prev) => ({
        ...prev,
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3),
        tps: Math.max(20, prev.tps + Math.floor(Math.random() * 10) - 5),
        lastBlockTime: Math.max(1.5, prev.lastBlockTime + (Math.random() - 0.5) * 0.5),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const runAllTests = async () => {
    setIsRunningTests(true)

    // Reset all tests to pending
    setTestResults((prev) =>
      prev.map((test) => ({
        ...test,
        status: "pending" as const,
        duration: undefined,
        error: undefined,
      })),
    )

    // Run tests sequentially with delays
    for (let i = 0; i < testResults.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setTestResults((prev) =>
        prev.map((test, index) =>
          index === i
            ? {
                ...test,
                status: "running" as const,
              }
            : test,
        ),
      )

      await new Promise((resolve) => setTimeout(resolve, 2000))

      setTestResults((prev) =>
        prev.map((test, index) =>
          index === i
            ? {
                ...test,
                status: Math.random() > 0.15 ? ("passed" as const) : ("failed" as const),
                duration: Math.random() * 3 + 0.5,
                error: Math.random() > 0.15 ? undefined : "Test failed due to network conditions",
              }
            : test,
        ),
      )
    }

    setIsRunningTests(false)
  }

  const runSingleTest = async (testId: string) => {
    setTestResults((prev) =>
      prev.map((test) =>
        test.id === testId
          ? {
              ...test,
              status: "running" as const,
              duration: undefined,
              error: undefined,
            }
          : test,
      ),
    )

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setTestResults((prev) =>
      prev.map((test) =>
        test.id === testId
          ? {
              ...test,
              status: Math.random() > 0.2 ? ("passed" as const) : ("failed" as const),
              duration: Math.random() * 3 + 0.5,
              error: Math.random() > 0.2 ? undefined : "Test execution failed",
            }
          : test,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case "pending":
        return <Clock className="w-4 h-4 text-gray-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "text-green-500"
      case "failed":
        return "text-red-500"
      case "running":
        return "text-blue-500"
      case "pending":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sovereignty":
        return <Shield className="w-4 h-4" />
      case "generative":
        return <Zap className="w-4 h-4" />
      case "cultural":
        return <Activity className="w-4 h-4" />
      case "technical":
        return <Code className="w-4 h-4" />
      default:
        return <TestTube className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sovereignty":
        return "bg-red-600"
      case "generative":
        return "bg-orange-600"
      case "cultural":
        return "bg-blue-600"
      case "technical":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const filteredTests =
    selectedCategory === "all" ? testResults : testResults.filter((test) => test.category === selectedCategory)

  const testStats = {
    total: testResults.length,
    passed: testResults.filter((t) => t.status === "passed").length,
    failed: testResults.filter((t) => t.status === "failed").length,
    running: testResults.filter((t) => t.status === "running").length,
    pending: testResults.filter((t) => t.status === "pending").length,
  }

  return (
    <div className="space-y-6">
      {/* Network Status Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-400">
            <Network className="w-5 h-5 mr-2" />
            FlameBorn Testnet Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{networkMetrics.blockHeight.toLocaleString()}</div>
              <div className="text-sm text-slate-400">Block Height</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{networkMetrics.tps}</div>
              <div className="text-sm text-slate-400">TPS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{networkMetrics.validators}</div>
              <div className="text-sm text-slate-400">Validators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{networkMetrics.uptime}%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{networkMetrics.lastBlockTime.toFixed(1)}s</div>
              <div className="text-sm text-slate-400">Block Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{networkMetrics.gasPrice.toFixed(6)}</div>
              <div className="text-sm text-slate-400">Gas Price</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Test Suite</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-400">✓ {testStats.passed} Passed</span>
            <span className="text-red-400">✗ {testStats.failed} Failed</span>
            <span className="text-blue-400">⟳ {testStats.running} Running</span>
            <span className="text-gray-400">○ {testStats.pending} Pending</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="all">All Categories</option>
            <option value="sovereignty">African Sovereignty</option>
            <option value="generative">Generative Minting</option>
            <option value="cultural">Cultural Anchoring</option>
            <option value="technical">Technical</option>
          </select>

          <Button onClick={runAllTests} disabled={isRunningTests} className="bg-blue-600 hover:bg-blue-700">
            {isRunningTests ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run All Tests
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Test Results */}
      <div className="grid gap-4">
        {filteredTests.map((test) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getCategoryColor(test.category)}`}>
                  {getCategoryIcon(test.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{test.name}</h3>
                  <p className="text-sm text-slate-400">{test.description}</p>
                  {test.error && <p className="text-sm text-red-400 mt-1">Error: {test.error}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {test.duration && <span className="text-sm text-slate-400">{test.duration.toFixed(1)}s</span>}
                <div className="flex items-center space-x-2">
                  {getStatusIcon(test.status)}
                  <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                </div>
                <Button
                  onClick={() => runSingleTest(test.id)}
                  disabled={test.status === "running" || isRunningTests}
                  variant="outline"
                  size="sm"
                >
                  <Play className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {test.status === "running" && (
              <div className="mt-3">
                <Progress value={Math.random() * 100} className="h-2" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Test Categories Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["sovereignty", "generative", "cultural", "technical"].map((category) => {
          const categoryTests = testResults.filter((t) => t.category === category)
          const passed = categoryTests.filter((t) => t.status === "passed").length
          const total = categoryTests.length

          return (
            <Card key={category} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <div className={`p-1 rounded ${getCategoryColor(category)} mr-2`}>{getCategoryIcon(category)}</div>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">
                  {passed}/{total}
                </div>
                <Progress value={(passed / total) * 100} className="h-2" />
                <div className="text-xs text-slate-400 mt-1">{Math.round((passed / total) * 100)}% passing</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
