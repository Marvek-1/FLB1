import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await DatabaseService.getUserById(params.id)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error in GET /api/users/[id]:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, email, profileData } = body

    const user = await DatabaseService.updateUser(params.id, {
      name,
      email,
      profileData,
    })

    if (!user) {
      return NextResponse.json({ error: "User not found or update failed" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error in PUT /api/users/[id]:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await DatabaseService.deleteUser(params.id)
    if (!success) {
      return NextResponse.json({ error: "User not found or delete failed" }, { status: 404 })
    }
    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error in DELETE /api/users/[id]:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
