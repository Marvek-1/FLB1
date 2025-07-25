import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json()

    // Get the last user message for language detection
    const lastUserMessage = messages.findLast((msg: any) => msg.role === "user")?.content || ""

    // Simplified language detection
    const detectLanguage = (text: string): string => {
      // Basic detection based on common words
      if (/jambo|habari|asante|karibu/i.test(text)) return "swahili"
      if (/bawo|pẹlẹ|jọwọ|ẹ|ṣeun/i.test(text)) return "yoruba"
      if (/sawubona|unjani|ngiyabonga|yebo/i.test(text)) return "zulu"
      if (/ሰላም|እንደምን|አመሰግናለሁ|እባክህ/i.test(text)) return "amharic"
      return "english" // Default
    }

    const detectedLanguage = detectLanguage(lastUserMessage)

    // Simple system prompts
    const systemPrompt = context || `You are Iko Ikang, the 'Talk of Fire' — the voice of Flameborn.`

    // Fallback response if AI services are not available
    const fallbackResponses = {
      english: "I'm here to help with information about Flameborn and healthcare challenges in Africa.",
      swahili: "Niko hapa kusaidia na habari kuhusu Flameborn na changamoto za afya barani Afrika.",
      yoruba: "Mo wà níbí láti ràn ọ́ lọ́wọ́ pẹ̀lú ìròyìn nípa Flameborn àti àwọn ìṣòro ìtọ́jú ìlera ní Áfríkà.",
      zulu: "Ngilapha ukusiza ngolwazi mayelana ne-Flameborn nezinselelo zezempilo e-Afrika.",
      amharic: "ስለ ፍሌምቦርን እና በአፍሪካ ስላሉ የጤና እንክብካቤ ችግሮች መረጃ ለመስጠት እዚህ አለሁ።",
    }

    // Try to use Groq if available
    try {
      if (process.env.GROQ_API_KEY) {
        const { Groq } = await import("groq-sdk")
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

        const conversation = [
          { role: "system", content: systemPrompt },
          ...messages.slice(-5), // Keep conversation history manageable
        ]

        const response = await groq.chat.completions.create({
          messages: conversation,
          model: "llama3-8b-8192", // Using a smaller model for better performance
          temperature: 0.7,
          max_tokens: 500,
        })

        return NextResponse.json({
          response: response.choices[0].message.content,
          detectedLanguage,
        })
      }
    } catch (error) {
      console.error("Error with Groq:", error)
      // Continue to fallback
    }

    // Fallback response
    return NextResponse.json({
      response: fallbackResponses[detectedLanguage as keyof typeof fallbackResponses] || fallbackResponses.english,
      detectedLanguage,
    })
  } catch (error) {
    console.error("Error in AI chat:", error)
    return NextResponse.json(
      {
        error: "Failed to process AI request",
        response: "I apologize, but I encountered an error processing your request. Please try again later.",
      },
      { status: 500 },
    )
  }
}
