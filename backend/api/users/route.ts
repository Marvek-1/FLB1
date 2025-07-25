import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"
import { v4 as uuidv4 } from "uuid"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const type = searchParams.get("type") as "guardian" | "healer" | null

    if (email) {
      const user = await DatabaseService.getUserByEmail(email)
      return NextResponse.json({ user })
    }

    if (type) {
      const users = await DatabaseService.getUsersByType(type)
      return NextResponse.json({ users })
    }

    const users = await DatabaseService.getAllUsers()
    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error in GET /api/users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, type, profileData } = body

    if (!name || !email || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await DatabaseService.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const userId = uuidv4()
    const user = await DatabaseService.createUser({
      id: userId,
      name,
      email,
      type,
      profileData,
    })

    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/users:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
