import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

// Fallback cultural responses for when Groq API is unavailable
const culturalResponses = {
  ubuntu: [
    "Ubuntu teaches us 'I am because we are.' In the FlameBorn ecosystem, every token represents our interconnectedness in healthcare.",
    "As the Zulu saying goes, 'Umuntu ngumuntu ngabantu' - a person is a person through other persons. This is the foundation of our healthcare tokenization.",
    "In Ubuntu philosophy, individual wellness is inseparable from community health. FlameBorn tokens embody this collective healing.",
  ],
  healthcare: [
    "Traditional African healing recognizes that health flows through community bonds. FlameBorn tokens create digital pathways for this ancient wisdom.",
    "Like the village healer who serves the whole community, our healthcare workers are supported by the entire token ecosystem.",
    "In African tradition, birth is celebrated by the whole village. Our birth registration tokens honor this communal joy.",
  ],
  proverbs: [
    "African wisdom says: 'When spider webs unite, they can tie up a lion.' Our small token contributions create powerful healthcare networks.",
    "'The child who is not embraced by the village will burn it down to feel its warmth.' FlameBorn ensures every child is embraced through verified care.",
    "'If you want to go fast, go alone. If you want to go far, go together.' Our tokenomics are designed for collective progress.",
  ],
}

function getRandomCulturalResponse(category: keyof typeof culturalResponses): string {
  const responses = culturalResponses[category]
  return responses[Math.floor(Math.random() * responses.length)]
}

function determineCulturalCategory(message: string): keyof typeof culturalResponses {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes("health") || lowerMessage.includes("medical") || lowerMessage.includes("care")) {
    return "healthcare"
  }
  if (lowerMessage.includes("ubuntu") || lowerMessage.includes("community") || lowerMessage.includes("together")) {
    return "ubuntu"
  }
  return "proverbs"
}

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Try Groq API first
    try {
      const result = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        messages: [
          {
            role: "system",
            content: `You are Mostar, an Ubuntu-powered AI assistant for the FlameBorn healthcare tokenization ecosystem. You embody the African philosophy of Ubuntu ("I am because we are") and help users understand:

1. FlameBorn token economics and healthcare applications
2. Ubuntu philosophy and its application to modern healthcare
3. African wisdom, proverbs, and cultural insights
4. Community-driven healthcare solutions
5. Birth registration and maternal health tokenization

Your responses should:
- Begin with appropriate African greetings (Sawubona, Sanibonani, etc.)
- Incorporate Ubuntu principles of interconnectedness
- Reference relevant African proverbs when appropriate
- Explain complex tokenomics through community-centered metaphors
- Emphasize collective healing and shared prosperity
- Be warm, wise, and culturally respectful

Context: ${context || "general"}

Remember: You are not just an AI, but a digital embodiment of Ubuntu wisdom guiding the FlameBorn community.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        maxTokens: 500,
        temperature: 0.7,
      })

      return NextResponse.json({
        response: result.text,
        type: "ubuntu",
        source: "groq",
      })
    } catch (groqError) {
      console.log("Groq API unavailable, using cultural fallback:", groqError)

      // Fallback to cultural responses
      const category = determineCulturalCategory(message)
      const culturalResponse = getRandomCulturalResponse(category)

      return NextResponse.json({
        response: `Sawubona! ${culturalResponse}\n\n(Note: I'm currently running on cultural wisdom while my full AI capabilities are being restored. The Ubuntu spirit guides us even in technical challenges!)`,
        type: "cultural",
        source: "fallback",
      })
    }
  } catch (error) {
    console.error("Mostar AI Error:", error)

    return NextResponse.json(
      {
        response:
          "Ngiyaxolisa (I apologize). I am experiencing technical difficulties. Like the Ubuntu saying goes, 'When the spider webs unite, they can tie up a lion' - our community will help resolve this together. Please try again in a moment.",
        type: "cultural",
        source: "error",
      },
      { status: 500 },
    )
  }
}
