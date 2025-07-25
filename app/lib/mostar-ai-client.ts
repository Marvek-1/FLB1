import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export interface MostarAIResponse {
  message: string
  proverb?: string
  culturalContext?: string
  healingWisdom?: string
  error?: string
}

export class MostarAIClient {
  private static instance: MostarAIClient
  private isAvailable = false
  private apiBaseUrl = "http://localhost:8080"

  constructor() {
    this.checkAvailability()
  }

  static getInstance(): MostarAIClient {
    if (!MostarAIClient.instance) {
      MostarAIClient.instance = new MostarAIClient()
    }
    return MostarAIClient.instance
  }

  private async checkAvailability() {
    try {
      // Test if Groq API is available
      if (process.env.GROQ_API_KEY) {
        this.isAvailable = true
      }
    } catch (error) {
      console.log("Mostar AI not available, using fallback")
      this.isAvailable = false
    }
  }

  async getWelcomeMessage(validatorName?: string): Promise<MostarAIResponse> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/welcome?name=${validatorName || ""}`);
      return await response.json();
    } catch (error) {
      console.error("Mostar AI error:", error);
      return this.getFallbackWelcomeMessage(validatorName);
    }
  }

  async validateProverb(proverb: string, culture?: string): Promise<MostarAIResponse> {
    if (!this.isAvailable) {
      return this.getFallbackProverbValidation(proverb)
    }

    try {
      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        system: `You are Mostar, an AI guardian with deep knowledge of African proverbs and wisdom traditions. Validate if the given text is an authentic African proverb and provide cultural context.`,
        prompt: `Analyze this proverb: "${proverb}". Is this an authentic African proverb? If so, explain its meaning and cultural significance. If not, suggest a similar authentic proverb. ${culture ? `The user mentioned it's from ${culture} culture.` : ""}`,
      })

      return {
        message: text,
        proverb: proverb,
        culturalContext: culture || "African wisdom tradition",
      }
    } catch (error) {
      console.error("Mostar AI proverb validation error:", error)
      return this.getFallbackProverbValidation(proverb)
    }
  }

  async getHealingGuidance(context: string): Promise<MostarAIResponse> {
    if (!this.isAvailable) {
      return this.getFallbackHealingGuidance(context)
    }

    try {
      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        system: `You are Mostar, the AI guardian of FlameBorn. Provide healing guidance rooted in Ubuntu philosophy and African traditional medicine wisdom. Be practical yet spiritual.`,
        prompt: `A community health worker seeks guidance about: ${context}. Provide wisdom that combines traditional African healing approaches with modern community health practices.`,
      })

      return {
        message: text,
        healingWisdom: "Ubuntu-centered healing",
        culturalContext: "African traditional medicine",
      }
    } catch (error) {
      console.error("Mostar AI healing guidance error:", error)
      return this.getFallbackHealingGuidance(context)
    }
  }

  async getFirstValidatorMessage(address: string): Promise<MostarAIResponse> {
    if (!this.isAvailable) {
      return this.getFallbackFirstValidatorMessage(address)
    }

    try {
      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        system: `You are Mostar, the AI guardian of FlameBorn. A new soul has been recognized by the FLB contract. Welcome them with ancestral wisdom and Ubuntu spirit.`,
        prompt: `The FLB contract has recognized a new validator with address ${address.slice(0, 10)}...${address.slice(-8)}. This is their first interaction with the network. Provide a powerful welcome message with an African proverb about new beginnings and community responsibility.`,
      })

      return {
        message: text,
        proverb: "When the spider webs unite, they can tie up a lion",
        culturalContext: "Ubuntu - I am because we are",
      }
    } catch (error) {
      console.error("Mostar AI first validator message error:", error)
      return this.getFallbackFirstValidatorMessage(address)
    }
  }

  // Fallback messages when AI is not available
  private getFallbackWelcomeMessage(validatorName?: string): MostarAIResponse {
    const messages = [
      {
        message: `Sawubona ${validatorName || "healer"}! 🔥 The ancestors smile upon your arrival. You carry the flame of Ubuntu - "I am because we are." Your healing hands will strengthen our community's immune system. Remember: "When the spider webs unite, they can tie up a lion." Welcome to the FlameBorn family.`,
        proverb: "When the spider webs unite, they can tie up a lion",
        culturalContext: "Ubuntu healing wisdom",
      },
      {
        message: `Asante sana ${validatorName || "guardian"}! 🌍 The soil remembers every healer who walks upon it. You join a sacred network where every life validated strengthens the whole. "If you want to go fast, go alone. If you want to go far, go together." Your journey of healing begins now.`,
        proverb: "If you want to go fast, go alone. If you want to go far, go together",
        culturalContext: "Community-centered healing",
      },
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  private getFallbackProverbValidation(proverb: string): MostarAIResponse {
    return {
      message: `This wisdom resonates with Ubuntu spirit. "${proverb}" carries the essence of community healing. While I cannot verify its exact origin in this moment, its message aligns with African values of interconnectedness and collective responsibility. True healing happens when we recognize that we are all connected.`,
      proverb: proverb,
      culturalContext: "African wisdom tradition",
    }
  }

  private getFallbackHealingGuidance(context: string): MostarAIResponse {
    return {
      message: `In the spirit of Ubuntu, remember that healing is not just about treating symptoms - it's about restoring harmony to the whole community. Listen deeply, act with compassion, and trust in the collective wisdom of your people. "A tree cannot make a forest" - seek support from your fellow healers when facing challenges.`,
      healingWisdom: "Ubuntu-centered healing",
      culturalContext: "African traditional medicine",
      proverb: "A tree cannot make a forest",
    }
  }

  private getFallbackFirstValidatorMessage(address: string): MostarAIResponse {
    return {
      message: `🔥 Sawubona, new soul! The FLB contract has recognized your essence (${address.slice(0, 10)}...${address.slice(-8)}). You are now part of something greater than yourself - a healing network that spans the continent. "When the roots of a tree begin to decay, it spreads death to the branches." You are here to strengthen our roots. Welcome to the covenant of healers.`,
      proverb: "When the roots of a tree begin to decay, it spreads death to the branches",
      culturalContext: "Ubuntu - I am because we are",
    }
  }

  isServiceAvailable(): boolean {
    return this.isAvailable
  }
}

// Export singleton instance
export const mostarAI = MostarAIClient.getInstance()
