import { type NextRequest, NextResponse } from "next/server"

const TESTNET_API_URL = process.env.TESTNET_API_URL || "http://localhost:8000"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get("endpoint") || "ping"

    const response = await fetch(`${TESTNET_API_URL}/${endpoint}`)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Testnet API proxy error:", error)
    return NextResponse.json({ error: "Failed to connect to testnet" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get("endpoint") || ""
    const body = await request.json()

    const response = await fetch(`${TESTNET_API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Testnet API proxy error:", error)
    return NextResponse.json({ error: "Failed to connect to testnet" }, { status: 500 })
  }
}
