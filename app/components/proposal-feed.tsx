"use client"

import { useState } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Scrolls } from "@/app/lib/scrolls" // Assuming this path is correct and Scrolls is an object/array

// Mock data for proposals - consider moving to a separate file or fetching
const mockProposals = [
  {
    id: "prop-001",
    title: "Fund for Eid care kits in Mombasa",
    description: "Provide medical care kits to underserved communities during Eid celebrations in Mombasa.",
    scrollId: "SDQ-004", // Swahili Digital Quill
    status: "pending",
    createdAt: "2024-04-16T14:30:00Z",
    author: "0x8d45...b2c7",
    votes: { yes: 12, no: 3, abstain: 2 },
    link: "/proposals/prop-001", // Example link
  },
  {
    id: "prop-002",
    title: "Expand healthcare worker network to rural areas in Nigeria",
    description: "Create a program to recruit and train healthcare workers in rural communities across Nigeria.",
    scrollId: "AKWA-001", // Akwa Ibom Scroll
    status: "approved",
    createdAt: "2024-04-15T09:45:00Z",
    author: "0x2f19...d8e3",
    votes: { yes: 24, no: 1, abstain: 3 },
    link: "/proposals/prop-002",
  },
  {
    id: "prop-003",
    title: "Emergency fund for flood-affected clinics in East Africa",
    description: "Establish an emergency fund to support clinics affected by recent flooding in East Africa.",
    scrollId: "GIO-003", // Gikuyu Oral Traditions Scroll
    status: "active",
    createdAt: "2024-04-14T16:20:00Z",
    author: "0x6a23...c4f1",
    votes: { yes: 18, no: 5, abstain: 1 },
    link: "/proposals/prop-003",
  },
  {
    id: "prop-004",
    title: "Midwife training program in Nairobi",
    description: "Fund a training program for midwives in Nairobi to improve maternal care.",
    scrollId: "YRBA-002", // Yoruba Ancestral Scroll
    status: "completed",
    createdAt: "2024-03-13T11:10:00Z",
    author: "0x3b92...a1d4",
    votes: { yes: 30, no: 2, abstain: 0 },
    link: "/proposals/prop-004",
  },
]

type ProposalStatus = "all" | "pending" | "approved" | "active" | "completed" | "rejected" // Added rejected

export default function ProposalFeed() {
  const [filter, setFilter] = useState<ProposalStatus>("all")
  const [scrollFilter, setScrollFilter] = useState<string>("all") // scrollId or "all"

  const filteredProposals = mockProposals.filter((proposal) => {
    const statusMatch = filter === "all" || proposal.status === filter
    const scrollMatch = scrollFilter === "all" || proposal.scrollId === scrollFilter
    return statusMatch && scrollMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-300 bg-yellow-900/50 border-yellow-700/60"
      case "approved":
        return "text-green-300 bg-green-900/50 border-green-700/60"
      case "active":
        return "text-cyan-300 bg-cyan-900/50 border-cyan-700/60"
      case "completed":
        return "text-purple-300 bg-purple-900/50 border-purple-700/60"
      case "rejected":
        return "text-red-300 bg-red-900/50 border-red-700/60"
      default:
        return "text-gray-300 bg-gray-900/50 border-gray-700/60"
    }
  }

  // Assuming Scrolls is an object where keys are scroll IDs and values are scroll objects
  const scrollObjects = Object.values(Scrolls)

  return (
    <Card className="w-full bg-black/40 border-cyan-700/50 backdrop-blur-md">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6">📋 Proposal Feed</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Filter by Status:</h3>
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "active", "approved", "completed", "rejected"] as ProposalStatus[]).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={`${
                    filter === status
                      ? "bg-flame-orange text-white hover:bg-flame-orange/90"
                      : "text-cyan-200 border-cyan-700/50 hover:bg-cyan-900/30"
                  } transition-colors`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-400 mb-1">Filter by Scroll:</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={scrollFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setScrollFilter("all")}
                className={`${
                  scrollFilter === "all"
                    ? "bg-flame-orange text-white hover:bg-flame-orange/90"
                    : "text-cyan-200 border-cyan-700/50 hover:bg-cyan-900/30"
                } transition-colors`}
              >
                All Scrolls
              </Button>
              {scrollObjects.map((scroll) => (
                <Button
                  key={scroll.scrollId}
                  variant={scrollFilter === scroll.scrollId ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScrollFilter(scroll.scrollId)}
                  className={`${
                    scrollFilter === scroll.scrollId
                      ? "bg-flame-orange text-white hover:bg-flame-orange/90"
                      : "text-cyan-200 border-cyan-700/50 hover:bg-cyan-900/30"
                  } transition-colors`}
                  title={scroll.name}
                >
                  {scroll.scrollId}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No proposals match your current filters.</div>
          ) : (
            filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="p-4 rounded-lg border border-gray-800/70 bg-gray-900/50 hover:border-cyan-700/70 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                  <h3 className="text-lg font-medium text-flame-orange group-hover:text-cyan-300 transition-colors">
                    {/* <a href={proposal.link} target="_blank" rel="noopener noreferrer" className="hover:underline"> */}
                    {proposal.title}
                    {/* </a> */}
                  </h3>
                  <div
                    className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap border ${getStatusColor(
                      proposal.status,
                    )}`}
                  >
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-3">{proposal.description}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                  <span
                    className={`px-1.5 py-0.5 rounded border text-xs ${
                      Scrolls[proposal.scrollId]?.colorClassBadge || "text-gray-300 bg-gray-700/30 border-gray-600"
                    }`}
                    title={Scrolls[proposal.scrollId]?.name || "Unknown Scroll"}
                  >
                    {proposal.scrollId}
                  </span>

                  <span>Created: {new Date(proposal.createdAt).toLocaleDateString()}</span>

                  <span>By: {proposal.author}</span>

                  <div className="flex items-center gap-2 sm:ml-auto">
                    <span className="text-green-400">Yes: {proposal.votes.yes}</span>
                    <span className="text-red-400">No: {proposal.votes.no}</span>
                    <span className="text-gray-400">Abstain: {proposal.votes.abstain}</span>
                  </div>
                </div>
                {/* Placeholder for a "View Details" or "Vote" button */}
                {/* <div className="mt-3 text-right">
                  <Button variant="link" size="sm" className="text-cyan-400 hover:text-cyan-300">
                    View Details
                  </Button>
                </div> */}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
