import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get("wallet")

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 })
    }

    // Get user profile
    const userResult = await sql`
      SELECT * FROM user_profiles WHERE wallet_address = ${walletAddress}
    `

    if (userResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = userResult[0]

    // Get completed modules
    const completedModules = await sql`
      SELECT ucm.*, lm.title, lm.category
      FROM user_completed_modules ucm
      JOIN learning_modules lm ON ucm.module_id = lm.id
      WHERE ucm.user_id = ${user.id}
      ORDER BY ucm.completed_at DESC
    `

    // Get achievements
    const achievements = await sql`
      SELECT ua.*, a.title, a.description, a.icon
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ${user.id}
      ORDER BY ua.achieved_at DESC
    `

    // Get daily challenges
    const dailyChallenges = await sql`
      SELECT c.*, COALESCE(ucc.completed_at IS NOT NULL, false) as completed
      FROM challenges c
      LEFT JOIN user_completed_challenges ucc ON c.id = ucc.challenge_id AND ucc.user_id = ${user.id}
      WHERE c.type = 'daily' AND c.active = true
      ORDER BY c.created_at DESC
      LIMIT 5
    `

    // Calculate next level XP
    const nextLevelXp = user.level * 1000 * 1.2 - user.xp

    return NextResponse.json({
      user: {
        ...user,
        nextLevelXp: Math.max(0, nextLevelXp),
      },
      completedModules,
      achievements,
      dailyChallenges,
      stats: {
        totalModules: completedModules.length,
        totalFLBEarned: completedModules.reduce(
          (sum: number, module: any) => sum + Number.parseFloat(module.flb_earned),
          0,
        ),
        totalXPEarned: completedModules.reduce(
          (sum: number, module: any) => sum + Number.parseInt(module.xp_earned),
          0,
        ),
        achievementsCount: achievements.length,
      },
    })
  } catch (error) {
    console.error("Error fetching user progress:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
