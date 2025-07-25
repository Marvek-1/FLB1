import { type NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

export async function POST(req: NextRequest) {
  try {
    const { impactData } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 })
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    // Format the data for analysis
    const dataDescription = impactData
      .map(
        (item) =>
          `Region: ${item.region}, Health Workers: ${item.healthWorkers}, Patients Served: ${item.patientsServed}, Donations Received: ${item.donationsReceived} BNB`,
      )
      .join("\n")

    const prompt = `
      Analyze the following impact data from the Flameborn platform, which supports rural healthcare workers in Africa:
      
      ${dataDescription}
      
      Generate 3-5 insightful observations about this data. For each insight, provide:
      1. A short, descriptive title
      2. A 1-2 sentence explanation of the insight that is easy to understand for non-technical users
      3. Categorize each insight as either "positive" (highlighting success), "action" (suggesting improvements), or "neutral" (general observation)
      
      Important guidelines:
      - Use simple, clear language without technical jargon
      - Focus specifically on African healthcare contexts and challenges
      - Consider local cultural factors in your analysis
      - Ensure insights are relevant to rural healthcare in Africa
      - Avoid Western-centric perspectives or solutions
      
      Format your response as a JSON array of objects with properties: title, content, and type.
    `

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a data analyst specializing in African healthcare impact metrics. Your audience is exclusively in Africa, so ensure all insights are relevant to African communities.",
        },
        { role: "user", content: prompt },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 1000,
    })

    // Extract and parse the JSON response
    const content = response.choices[0].message.content || ""
    const jsonMatch = content.match(/\[.*\]/s)

    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from response")
    }

    const insights = JSON.parse(jsonMatch[0])

    return NextResponse.json({
      insights: insights || [],
    })
  } catch (error) {
    console.error("Error in AI impact analysis:", error)
    return NextResponse.json({ error: "Failed to analyze impact data" }, { status: 500 })
  }
}
