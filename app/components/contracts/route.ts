import { NextResponse } from "next/server"

export async function GET() {
  // Provide contract addresses from server-side
  return NextResponse.json({
    flbToken: process.env.NEXT_PUBLIC_FLB_TOKEN || "",
    healthRegistry: process.env.NEXT_PUBLIC_HEALTH_REGISTRY || "",
    donationRouter: process.env.NEXT_PUBLIC_ROUTER || "",
    chainId: process.env.CHAIN_ID || "56",
  })
}
