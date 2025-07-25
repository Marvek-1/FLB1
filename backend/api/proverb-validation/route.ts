import { type NextRequest, NextResponse } from "next/server"
import { proverbValidator } from "@/lib/proverb-validator"

export async function POST(request: NextRequest) {
  try {
    const { proverb, action } = await request.json()

    if (!proverb) {
      return NextResponse.json({ error: "Proverb is required for cultural validation" }, { status: 400 })
    }

    // Validate proverb exists in database
    const isValid = proverbValidator.validateProverb(proverb)
    const proverbMeta = proverbValidator.getProverbMeta(proverb)
    const proverbHash = proverbValidator.getProverbHash(proverb)

    if (!isValid || !proverbMeta) {
      return NextResponse.json({
        isValid: false,
        message: "Proverb not found in verified African wisdom database",
        suggestedProverb: proverbValidator.getRandomProverb(),
      })
    }

    // If action provided, validate cultural context
    let culturalValidation = null
    if (action) {
      culturalValidation = proverbValidator.validateCulturalContext(action, proverb)
    }

    return NextResponse.json({
      isValid: true,
      proverb: proverbMeta,
      proverbHash,
      culturalValidation,
      message: `Ubuntu wisdom validated: "${proverbMeta.translated_meaning}" from ${proverbMeta.country}`,
    })
  } catch (error) {
    console.error("Proverb validation error:", error)
    return NextResponse.json({ error: "Failed to validate proverb" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get("region")
    const language = searchParams.get("language")
    const country = searchParams.get("country")
    const random = searchParams.get("random")

    if (random === "true") {
      return NextResponse.json({
        proverb: proverbValidator.getRandomProverb(),
      })
    }

    const filters: any = {}
    if (region) filters.region = region
    if (language) filters.language = language
    if (country) filters.country = country

    const proverbs = proverbValidator.searchProverbs(filters)

    return NextResponse.json({
      proverbs,
      total: proverbs.length,
      availableRegions: proverbValidator.getAvailableRegions(),
      availableLanguages: proverbValidator.getAvailableLanguages(),
      availableCountries: proverbValidator.getAvailableCountries(),
    })
  } catch (error) {
    console.error("Proverb search error:", error)
    return NextResponse.json({ error: "Failed to search proverbs" }, { status: 500 })
  }
}
