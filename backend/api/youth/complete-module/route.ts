import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { calculateFLBReward } from "@/lib/gamification"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, moduleId, score, timeTaken } = await request.json()

    if (!walletAddress || !moduleId || score === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get module details
    const moduleResult = await sql`
      SELECT * FROM learning_modules WHERE id = ${moduleId}
    `

    if (moduleResult.length === 0) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 })
    }

    const module = moduleResult[0]

    // Get user's current streak
    const userResult = await sql`
      SELECT streak FROM user_profiles WHERE wallet_address = ${walletAddress}
    `

    const currentStreak = userResult.length > 0 ? userResult[0].streak : 0

    // Calculate rewards
    const flbReward = calculateFLBReward(module.difficulty, timeTaken || 30, score, currentStreak)
    const xpReward = Math.floor(flbReward * 1.5)

    // Record module completion
    await sql`
      INSERT INTO user_completed_modules (user_id, module_id, score, flb_earned, xp_earned, completed_at)
      VALUES (
        (SELECT id FROM user_profiles WHERE wallet_address = ${walletAddress}),
        ${moduleId},
        ${score},
        ${flbReward},
        ${xpReward},
        NOW()
      )
      ON CONFLICT (user_id, module_id) DO UPDATE SET
        score = EXCLUDED.score,
        flb_earned = EXCLUDED.flb_earned,
        xp_earned = EXCLUDED.xp_earned,
        completed_at = EXCLUDED.completed_at
    `

    // Update user profile
    await sql`
      UPDATE user_profiles 
      SET 
        xp = xp + ${xpReward},
        flb_balance = flb_balance + ${flbReward},
        level = FLOOR((xp + ${xpReward}) / 1000) + 1,
        updated_at = NOW()
      WHERE wallet_address = ${walletAddress}
    `

    return NextResponse.json({
      success: true,
      rewards: {
        flb: flbReward,
        xp: xpReward,
      },
      message: "Module completed successfully",
    })
  } catch (error) {
    console.error("Error completing module:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
