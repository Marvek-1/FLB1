import { type NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

export async function POST(req: NextRequest) {
  try {
    const { credentials, location } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 })
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const prompt = `
      You are an AI assistant for Flameborn, a platform that verifies and supports healthcare workers in Africa.
      
      Analyze the following healthcare worker credentials and location information:
      
      Location: ${location}
      Credentials: ${credentials}
      
      Evaluate the credentials based on:
      1. Completeness of information
      2. Specificity of medical qualifications relevant to African healthcare systems
      3. Clarity of current role in the local healthcare context
      4. Relevance to healthcare challenges in Africa
      5. Experience with common health issues in the specified region
      
      Important guidelines:
      - Consider local healthcare systems and qualifications in the specified location
      - Focus on skills relevant to rural healthcare in Africa
      - Use simple, clear language in your feedback
      - Provide culturally appropriate recommendations
      - Consider local healthcare challenges specific to the region mentioned
      
      Provide:
      1. A verification score from 0-100
      2. Brief feedback explaining the score in simple, non-technical language
      3. 1-3 specific recommendations for improving the credential submission
      
      Format your response as a JSON object with properties: score (number), feedback (string), and recommendations (array of strings).
    `

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a credential verification specialist for healthcare workers in Africa. Your audience is exclusively in Africa, so ensure all feedback and recommendations are relevant to African healthcare systems.",
        },
        { role: "user", content: prompt },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1000,
    })

    // Extract and parse the JSON response
    const content = response.choices[0].message.content || ""
    const jsonMatch = content.match(/\{.*\}/s)

    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from response")
    }

    const parsedResponse = JSON.parse(jsonMatch[0])

    return NextResponse.json({
      score: parsedResponse.score || 0,
      feedback: parsedResponse.feedback || "No feedback provided",
      recommendations: parsedResponse.recommendations || [],
    })
  } catch (error) {
    console.error("Error in credential verification:", error)
    return NextResponse.json({ error: "Failed to verify credentials" }, { status: 500 })
  }
}
