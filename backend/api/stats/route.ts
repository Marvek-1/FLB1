import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    // Get all users to calculate statistics
    const allUsers = await DatabaseService.getAllUsers()

    // Calculate verified CHWs (Community Health Workers)
    const verifiedCHWs = allUsers.filter(
      (user) => user.raw_json.type === "healer" && user.raw_json.verificationStatus === "verified",
    ).length

    // Calculate active Guardians
    const activeGuardians = allUsers.filter((user) => user.raw_json.type === "guardian").length

    // Calculate total support (sum of all Guardian contributions)
    const totalSupport = allUsers
      .filter((user) => user.raw_json.type === "guardian")
      .reduce((sum, user) => {
        const contribution = user.raw_json.contributionAmount
        const amount = typeof contribution === "string" ? Number.parseFloat(contribution) : contribution
        return sum + (amount || 0)
      }, 0)

    // Calculate lives impacted (sum of patients served by verified healers)
    const livesImpacted = allUsers
      .filter((user) => user.raw_json.type === "healer" && user.raw_json.verificationStatus === "verified")
      .reduce((sum, user) => {
        return sum + (user.raw_json.impact?.patientsServed || 0)
      }, 0)

    // Total users count
    const totalUsers = allUsers.length

    const stats = {
      verifiedCHWs,
      activeGuardians,
      totalSupport,
      livesImpacted,
      totalUsers,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
