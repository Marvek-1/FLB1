"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Progress } from "@/app/components/ui/progress"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Gavel,
  Eye,
  TrendingUp,
  Clock,
  ShieldCheck,
  ExternalLink,
  UserPlus,
} from "lucide-react"
import { useToast } from "@/app/hooks/use-toast"

interface FraudAlert {
  id: string
  facilityName: string
  facilityAddress: string
  alertType: "fake_birth" | "duplicate_claim" | "missing_heartbeat" | "suspicious_activity"
  description: string
  evidence: string[]
  reportedBy: string
  timestamp: number
  severity: "low" | "medium" | "high" | "critical"
  status: "pending" | "investigating" | "confirmed" | "dismissed"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  requiredVotes: number
}

interface Guardian {
  address: string
  name: string
  region: string
  reputation: number
  votingPower: number
  facilitiesMonitored: number
  successfulDetections: number
  verified: boolean
}

export type RoleOption = "ALL" | "Doctor" | "Nurse" | "Outreach"
export type RegistrationStep = "welcome" | "form" | "verify" | "success"

// Verification Badge Component
function VerificationBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded-md text-xs font-medium">
      <ShieldCheck className="w-3 h-3" /> Verified
    </span>
  )
}

// NFT Link Component
function NFTLink({ wallet }: { wallet: string }) {
  const url = `https://testnet.bscscan.com/address/${wallet}`
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-300 hover:text-blue-400 transition-colors"
      title="View NFT contract"
    >
      <ExternalLink className="w-4 h-4" />
    </a>
  )
}

// Role Filter Tabs Component
function RoleFilterTabs({
  value,
  onChange,
}: {
  value: RoleOption
  onChange: (v: RoleOption) => void
}) {
  const roles: RoleOption[] = ["ALL", "Doctor", "Nurse", "Outreach"]

  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as RoleOption)} className="w-full">
      <TabsList className="grid grid-cols-4 bg-white/10 backdrop-blur-sm border border-orange-500/30">
        {roles.map((r) => (
          <TabsTrigger
            key={r}
            value={r}
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white capitalize transition-all"
          >
            {r === "ALL" ? "All" : r}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

// Healer Registration Canvas Component
function HealerRegistrationCanvas({
  onComplete,
}: {
  onComplete?: () => void
}) {
  const [step, setStep] = useState<RegistrationStep>("welcome")
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    credentials: "",
    role: "Doctor" as RoleOption,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const next = () => {
    if (step === "welcome") setStep("form")
    else if (step === "form") setStep("verify")
    else if (step === "verify") setStep("success")
    else if (step === "success" && onComplete) onComplete()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registration Submitted",
        description: "Your application has been submitted for Guardian review.",
      })
      setIsSubmitting(false)
      setStep("success")
    }, 1500)
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 text-3xl text-center mb-2">Welcome, Healer!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-center mb-6 text-gray-300">
                  Begin your journey to join the Flameborn network. Click below to start registration.
                </p>
                <div className="flex justify-center">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3" onClick={next}>
                    Start Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl flex flex-col lg:flex-row gap-8 items-start"
          >
            {/* Registration Form */}
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30 flex-1">
              <CardHeader>
                <CardTitle className="text-orange-400 text-2xl mb-2">Health Actor Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-800/50 border-gray-700 focus:border-orange-500 text-white"
                      placeholder="Dr. Jane Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium text-white">
                      Location
                    </label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="bg-gray-800/50 border-gray-700 focus:border-orange-500 text-white"
                      placeholder="Nairobi, Kenya"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="credentials" className="block text-sm font-medium text-white">
                      Medical Credentials
                    </label>
                    <Textarea
                      id="credentials"
                      name="credentials"
                      value={formData.credentials}
                      onChange={handleChange}
                      required
                      className="bg-gray-800/50 border-gray-700 focus:border-orange-500 text-white min-h-[100px]"
                      placeholder="Describe your medical background, certifications, and experience..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Role Selection */}
            <div className="flex-1 flex flex-col items-center pt-4 min-w-[280px]">
              <h3 className="text-xl font-bold text-blue-400 mb-6 text-center">Select Your Role</h3>
              <div className="w-full">
                <RoleFilterTabs value={formData.role} onChange={(role) => setFormData((prev) => ({ ...prev, role }))} />
              </div>
              <div className="mt-8 space-y-4 w-full">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Role Benefits</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Access to Guardian voting system</li>
                    <li>• Participate in fraud detection</li>
                    <li>• Earn reputation tokens</li>
                    <li>• Monitor health facilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === "verify" && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 text-2xl text-center mb-2">Verification Process</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-10 w-10 text-orange-400" />
                  </div>
                  <p className="text-gray-300">
                    Your credentials are being verified by the Guardian network. This process ensures the integrity of
                    the Flameborn health system.
                  </p>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Verification Steps</h4>
                    <ul className="text-sm text-gray-300 space-y-1 text-left">
                      <li>✅ Application submitted</li>
                      <li>🔄 Guardian review in progress</li>
                      <li>⏳ Credential verification</li>
                      <li>⏳ Community voting</li>
                    </ul>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-6" onClick={next}>
                  Continue
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 text-2xl text-center mb-2">Registration Complete!</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <p className="text-gray-300 mb-6">
                  Thank you for registering. Your credentials will be reviewed and you will be notified upon
                  verification.
                </p>
                <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={onComplete}>
                  Back to Healers
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main Guardian Voting Interface Component
export const GuardianVotingInterface: React.FC = () => {
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([])
  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null)
  const [userVotes, setUserVotes] = useState<{ [alertId: string]: boolean }>({})
  const [showRegistration, setShowRegistration] = useState(false)
  const [roleFilter, setRoleFilter] = useState<RoleOption>("ALL")
  const { toast } = useToast()

  useEffect(() => {
    loadFraudAlerts()
    loadGuardians()
  }, [])

  const loadFraudAlerts = () => {
    const mockAlerts: FraudAlert[] = [
      {
        id: "ALERT001",
        facilityName: "Suspicious Health Center",
        facilityAddress: "0x789abc...def123",
        alertType: "fake_birth",
        description: "Multiple BabyNFTs minted without corresponding heartbeat data",
        evidence: [
          "5 babies minted in 1 hour",
          "No IoT heartbeat signals detected",
          "Same biometric hash used twice",
          "USSD confirmations missing",
        ],
        reportedBy: "Guardian Network AI",
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        severity: "critical",
        status: "pending",
        votesFor: 8,
        votesAgainst: 1,
        totalVotes: 9,
        requiredVotes: 15,
      },
      {
        id: "ALERT002",
        facilityName: "Rural Health Post",
        facilityAddress: "0x456def...789abc",
        alertType: "missing_heartbeat",
        description: "BabyNFT shows no heartbeat activity for 48+ hours",
        evidence: [
          "Last heartbeat: 52 hours ago",
          "No device malfunction reported",
          "Mother unreachable via USSD",
          "Guardian unable to verify in person",
        ],
        reportedBy: "0xguardian123...abc",
        timestamp: Date.now() - 4 * 60 * 60 * 1000,
        severity: "high",
        status: "investigating",
        votesFor: 3,
        votesAgainst: 2,
        totalVotes: 5,
        requiredVotes: 15,
      },
    ]
    setFraudAlerts(mockAlerts)
    if (mockAlerts.length > 0) setSelectedAlert(mockAlerts[0])
  }

  const loadGuardians = () => {
    const mockGuardians: Guardian[] = [
      {
        address: "0xguardian1...abc",
        name: "Elder Chioma",
        region: "Lagos, Nigeria",
        reputation: 95,
        votingPower: 100,
        facilitiesMonitored: 12,
        successfulDetections: 8,
        verified: true,
      },
      {
        address: "0xguardian2...def",
        name: "Dr. Kwame",
        region: "Accra, Ghana",
        reputation: 88,
        votingPower: 85,
        facilitiesMonitored: 8,
        successfulDetections: 5,
        verified: true,
      },
      {
        address: "0xguardian3...ghi",
        name: "Nurse Amara",
        region: "Nairobi, Kenya",
        reputation: 92,
        votingPower: 90,
        facilitiesMonitored: 6,
        successfulDetections: 4,
        verified: false,
      },
    ]
    setGuardians(mockGuardians)
  }

  const handleVote = async (alertId: string, support: boolean) => {
    try {
      setUserVotes((prev) => ({ ...prev, [alertId]: support }))

      setFraudAlerts((prev) =>
        prev.map((alert) =>
          alert.id === alertId
            ? {
                ...alert,
                votesFor: support ? alert.votesFor + 1 : alert.votesFor,
                votesAgainst: !support ? alert.votesAgainst + 1 : alert.votesAgainst,
                totalVotes: alert.totalVotes + 1,
              }
            : alert,
        ),
      )

      toast({
        title: "Vote Recorded",
        description: `Your ${support ? "GUILTY" : "INNOCENT"} vote has been recorded`,
      })
    } catch (error: any) {
      toast({
        title: "Voting Failed",
        description: error.message || "Failed to record vote",
        variant: "destructive",
      })
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-500/20"
      case "high":
        return "text-orange-400 bg-orange-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20"
      case "low":
        return "text-blue-400 bg-blue-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "investigating":
        return <Eye className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-red-400" />
      case "dismissed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const filteredGuardians = guardians.filter((guardian) => {
    if (roleFilter === "ALL") return true
    // This would be based on actual role data in a real implementation
    return guardian.name.toLowerCase().includes(roleFilter.toLowerCase())
  })

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
        <HealerRegistrationCanvas onComplete={() => setShowRegistration(false)} />
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-orange-400">Guardian Council</h2>
          <p className="text-gray-300">Community-driven fraud detection and facility accountability system.</p>
        </div>
        <Button
          onClick={() => setShowRegistration(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Join as Healer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Guardians</CardTitle>
            <Shield className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{guardians.length}</div>
            <p className="text-xs text-gray-400">Community validators</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Pending Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">
              {fraudAlerts.filter((a) => a.status === "pending").length}
            </div>
            <p className="text-xs text-gray-400">Require voting</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Cases Resolved</CardTitle>
            <Gavel className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {fraudAlerts.filter((a) => a.status === "confirmed" || a.status === "dismissed").length}
            </div>
            <p className="text-xs text-gray-400">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Fraud Prevention</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">98.7%</div>
            <p className="text-xs text-gray-400">Accuracy rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="bg-white/10 backdrop-blur-sm border border-orange-500/30">
          <TabsTrigger
            value="alerts"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Fraud Alerts
          </TabsTrigger>
          <TabsTrigger
            value="guardians"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Guardian Network
          </TabsTrigger>
          <TabsTrigger
            value="slashing"
            className="text-gray-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Slashing Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Alert List */}
            <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <AlertTriangle className="h-5 w-5" />
                  Active Fraud Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fraudAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAlert?.id === alert.id
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-gray-700 hover:bg-white/5"
                    }`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(alert.status)}
                        <h4 className="font-medium text-white">{alert.facilityName}</h4>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>{alert.description}</div>
                      <div className="flex items-center gap-4">
                        <span>
                          Votes: {alert.totalVotes}/{alert.requiredVotes}
                        </span>
                        <span>For: {alert.votesFor}</span>
                        <span>Against: {alert.votesAgainst}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alert Details */}
            {selectedAlert && (
              <Card className="bg-white/10 backdrop-blur-sm border-orange-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Gavel className="h-5 w-5" />
                    Case #{selectedAlert.id}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {selectedAlert.facilityName} • {selectedAlert.alertType.replace("_", " ")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-orange-500/30 bg-orange-500/10">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <AlertDescription className="text-gray-300">{selectedAlert.description}</AlertDescription>
                  </Alert>

                  <div>
                    <h4 className="font-medium mb-2 text-white">Evidence</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedAlert.evidence.map((evidence, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <div className="w-1 h-1 bg-orange-400 rounded-full mt-2" />
                          {evidence}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>Voting Progress</span>
                      <span>
                        {selectedAlert.totalVotes}/{selectedAlert.requiredVotes}
                      </span>
                    </div>
                    <Progress
                      value={(selectedAlert.totalVotes / selectedAlert.requiredVotes) * 100}
                      className="bg-gray-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-green-500/20 rounded">
                      <div className="text-sm text-gray-300">Innocent</div>
                      <div className="text-lg font-bold text-green-400">{selectedAlert.votesAgainst}</div>
                    </div>
                    <div className="text-center p-2 bg-red-500/20 rounded">
                      <div className="text-sm text-gray-300">Guilty</div>
                      <div className="text-lg font-bold text-red-400">{selectedAlert.votesFor}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <NFTLink wallet={selectedAlert.facilityAddress} />
                    <span className="text-xs text-gray-400">View on blockchain</span>
                  </div>

                  {!userVotes[selectedAlert.id] && selectedAlert.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleVote(selectedAlert.id, false)}
                        className="flex-1 border-green-500 text-green-400 hover:bg-green-500/20"
                      >
                        Vote Innocent
                      </Button>
                      <Button
                        onClick={() => handleVote(selectedAlert.id, true)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      >
                        Vote Guilty
                      </Button>
                    </div>
                  )}

                  {userVotes[selectedAlert.id] !== undefined && (
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="font-medium text-white">
                        You voted: {userVotes[selectedAlert.id] ? "GUILTY" : "INNOCENT"}
                      </div>
                      <div className="text-sm text-gray-400">Thank you for participating in community governance</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="guardians" className="space-y-6">
          <div className="mb-6">
            <RoleFilterTabs value={roleFilter} onChange={setRoleFilter} />
          </div>

          <div className="grid gap-6">
            {filteredGuardians.map((guardian) => (
              <Card key={guardian.address} className="bg-white/10 backdrop-blur-sm border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      {guardian.name}
                      {guardian.verified && <VerificationBadge />}
                    </div>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {guardian.region}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="font-mono text-gray-400">{guardian.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Reputation</div>
                      <div className="text-2xl font-bold text-green-400">{guardian.reputation}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Voting Power</div>
                      <div className="text-2xl font-bold text-white">{guardian.votingPower}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Facilities</div>
                      <div className="text-2xl font-bold text-white">{guardian.facilitiesMonitored}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Detections</div>
                      <div className="text-2xl font-bold text-blue-400">{guardian.successfulDetections}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="slashing" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Slashing Mechanism
              </CardTitle>
              <CardDescription className="text-gray-300">
                Automatic penalties for facilities that fail community verification.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                  <h4 className="font-medium mb-2 text-white">Slashing Conditions</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• 3/5 Guardian votes confirm fraud → 50% FLB slashed</li>
                    <li>• Fake BabyNFT detected → 100% vesting forfeited</li>
                    <li>• Missing heartbeat data → 25% penalty</li>
                    <li>• USSD mother denial → Immediate investigation</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <h4 className="font-medium mb-2 text-white">Protection Mechanisms</h4>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• 48-hour appeal window for all slashing events</li>
                    <li>• Independent elder review for major penalties</li>
                    <li>• Technology failure exceptions (proven device malfunction)</li>
                    <li>• Community rehabilitation programs for first-time offenses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
