"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, Flag, FileText, Shield } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for pending applications
// Replace this:
// const MOCK_APPLICATIONS = [
//   {
//     id: "FLB-CHW-0034",
//     name: "Dr. Amina Okafor",
//     role: "Medical Doctor",
//     region: "Western Africa",
//     location: "Lagos, Nigeria",
//     licenseNumber: "MDCN-12345",
//     licenseType: "Medical License (MD)",
//     submittedAt: "2023-04-15T10:30:00Z",
//     faceIdScore: 95,
//     hasVoiceMessage: true,
//   },
//   {
//     id: "FLB-CHW-0035",
//     name: "Nurse Kwame Mensah",
//     role: "Registered Nurse",
//     region: "Western Africa",
//     location: "Accra, Ghana",
//     licenseNumber: "NMC-GH-78901",
//     licenseType: "Nursing License",
//     submittedAt: "2023-04-16T09:15:00Z",
//     faceIdScore: 88,
//     hasVoiceMessage: false,
//   },
//   {
//     id: "FLB-CHW-0036",
//     name: "Midwife Fatima Abdi",
//     role: "Midwife",
//     region: "Eastern Africa",
//     location: "Nairobi, Kenya",
//     licenseNumber: "KMP-5678",
//     licenseType: "Midwifery Certificate",
//     submittedAt: "2023-04-16T14:45:00Z",
//     faceIdScore: 92,
//     hasVoiceMessage: true,
//   },
// ]

// With:
const MOCK_APPLICATIONS: Application[] = []

// Types for application and votes
type Application = (typeof MOCK_APPLICATIONS)[0]
type Vote = "yes" | "no" | "flag"

function GuardianCard({ actor }: { actor: Application }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-dusk p-4 rounded-lg border border-flame hover:border-guardian transition-all"
    >
      <div className="flex justify-between">
        <h3 className="font-heading text-guardian">{actor.name}</h3>
        <Badge className="bg-pulse">{actor.id}</Badge>
      </div>
      <p className="text-sm text-gray-300">
        {actor.role} • {actor.location}
      </p>
      <div className="mt-2 flex items-center text-xs">
        <FileText className="h-3 w-3 mr-1 text-flame" />
        <span>{actor.licenseType}</span>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-400">Face ID: {actor.faceIdScore}%</span>
        <Button size="sm" className="bg-guardian text-black hover:bg-neon">
          Verify
        </Button>
      </div>
    </motion.div>
  )
}

export function VerifyScroll() {
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS)
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null)
  const [voteNote, setVoteNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")
  const [completedApplications, setCompletedApplications] = useState<
    Array<Application & { status: string; votes: Array<{ guardian: string; vote: Vote; note: string }> }>
  >([])

  // Set the first application as current when component mounts
  useEffect(() => {
    if (applications.length > 0 && !currentApplication) {
      setCurrentApplication(applications[0])
    }
  }, [applications, currentApplication])

  // Handle voting on an application
  const handleVote = async (vote: Vote) => {
    if (!currentApplication) return

    setIsSubmitting(true)

    try {
      // In a real app, you would send this to your backend
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      const updatedApplications = applications.filter((app) => app.id !== currentApplication.id)
      setApplications(updatedApplications)

      // Add to completed applications
      setCompletedApplications((prev) => [
        ...prev,
        {
          ...currentApplication,
          status: vote === "yes" ? "approved" : vote === "no" ? "rejected" : "flagged",
          votes: [{ guardian: "FLB-GRD-0011", vote, note: voteNote }],
        },
      ])

      // Set next application as current
      if (updatedApplications.length > 0) {
        setCurrentApplication(updatedApplications[0])
      } else {
        setCurrentApplication(null)
      }

      // Clear vote note
      setVoteNote("")
    } catch (error) {
      console.error("Error submitting vote:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-ember p-8 rounded-lg shadow ring-1 ring-flame">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-2xl text-guardian mb-2">Guardian Verification Circle</h2>
            <p className="text-gray-300">You now stand at the gate. Review lives. Verify hope.</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-dusk border-guardian">
            <Shield className="h-4 w-4 text-guardian" />
            <span>Guardian Access</span>
          </Badge>
        </div>

        <Tabs defaultValue="pending" onValueChange={setActiveTab}>
          <TabsList className="bg-dusk border border-flame mb-6">
            <TabsTrigger
              value="pending"
              className="text-white data-[state=active]:bg-flame data-[state=active]:text-white"
            >
              Pending ({applications.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="text-white data-[state=active]:bg-flame data-[state=active]:text-white"
            >
              Completed ({completedApplications.length})
            </TabsTrigger>
            <TabsTrigger
              value="flagged"
              className="text-white data-[state=active]:bg-flame data-[state=active]:text-white"
            >
              Flagged ({completedApplications.filter((app) => app.status === "flagged").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {applications.length === 0 ? (
              <div className="text-center py-12 bg-dusk rounded-lg">
                <div className="mx-auto w-16 h-16 rounded-full bg-ember flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-guardian" />
                </div>
                <h3 className="text-xl font-heading mb-2 text-guardian">No Pending Applications</h3>
                <p className="text-gray-400">There are currently no healthcare worker applications to review.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {applications.map((actor) => (
                  <GuardianCard key={actor.id} actor={actor} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              <h3 className="text-lg font-heading text-guardian">Completed Verifications</h3>

              {completedApplications.length === 0 ? (
                <div className="text-center py-12 bg-dusk rounded-lg">
                  <div className="mx-auto w-16 h-16 rounded-full bg-ember flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-heading mb-2 text-guardian">No Completed Verifications</h3>
                  <p className="text-gray-400">You haven't verified any applications yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {completedApplications
                    .filter((app) => app.status !== "flagged")
                    .map((app) => (
                      <div key={app.id} className="p-4 bg-dusk rounded-lg border border-flame">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-heading text-guardian">{app.name}</h4>
                            <p className="text-sm text-gray-400">
                              {app.role} • {app.location}
                            </p>
                          </div>
                          <Badge
                            className={app.status === "approved" ? "bg-guardian text-black" : "bg-pulse text-white"}
                          >
                            {app.status === "approved" ? "Approved" : "Rejected"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="flagged">
            <div className="space-y-4">
              <h3 className="text-lg font-heading text-pulse">Flagged Applications</h3>

              {completedApplications.filter((app) => app.status === "flagged").length === 0 ? (
                <div className="text-center py-12 bg-dusk rounded-lg">
                  <div className="mx-auto w-16 h-16 rounded-full bg-ember flex items-center justify-center mb-4">
                    <Flag className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-heading mb-2 text-pulse">No Flagged Applications</h3>
                  <p className="text-gray-400">There are no applications that require additional review.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {completedApplications
                    .filter((app) => app.status === "flagged")
                    .map((app) => (
                      <div key={app.id} className="p-4 bg-dusk rounded-lg border border-pulse">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-heading text-white">{app.name}</h4>
                            <p className="text-sm text-gray-400">
                              {app.role} • {app.location}
                            </p>
                          </div>
                          <Badge className="bg-pulse text-white">Flagged for Review</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">Guardian ID: FLB-GRD-0011 • Verification Protocol v1.0</p>
        </div>
      </div>
    </div>
  )
}
