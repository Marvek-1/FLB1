// African Proverb Validation System for Cultural Anchoring
// Ensures all FlameBorn actions are rooted in authentic African wisdom

import crypto from "crypto"

export interface AfricanProverb {
  proverb: string
  language: string
  country: string
  region: string
  translated_meaning: string
  cultural_notes: string
  themes: string[]
  hash: string
}

interface ProverbChallenge {
  question: string
  options: string[]
  correctAnswer: number
  proverb: AfricanProverb
}

interface CulturalValidation {
  isValid: boolean
  culturalRelevance: number
  message: string
}

class ProverbValidator {
  private proverbs: AfricanProverb[] = []
  private proverbMap: Map<string, AfricanProverb> = new Map()
  private hashMap: Map<string, AfricanProverb> = new Map()

  constructor() {
    this.initializeProverbs()
  }

  private initializeProverbs() {
    const rawProverbs = [
      {
        proverb: "When spider webs unite, they can tie up a lion",
        language: "Akan",
        country: "Ghana",
        region: "West Africa",
        translated_meaning: "Unity and cooperation can overcome any challenge",
        cultural_notes:
          "This proverb teaches the power of collective action in African communities. It emphasizes that even the smallest individuals, when united, can achieve great things.",
        themes: ["unity", "cooperation", "strength", "community"],
      },
      {
        proverb: "Ubuntu ngumuntu ngabantu",
        language: "Zulu",
        country: "South Africa",
        region: "Southern Africa",
        translated_meaning: "I am because we are",
        cultural_notes:
          "Ubuntu is the foundational African philosophy emphasizing our interconnectedness and shared humanity. Individual well-being is tied to community well-being.",
        themes: ["ubuntu", "community", "humanity", "interconnectedness"],
      },
      {
        proverb: "Se wo were fi na wosankofa a yenkyi",
        language: "Akan",
        country: "Ghana",
        region: "West Africa",
        translated_meaning: "It is not wrong to go back for that which you have forgotten",
        cultural_notes:
          "Sankofa teaches us to learn from the past to move forward wisely. The symbol shows a bird looking backward while moving forward.",
        themes: ["wisdom", "learning", "past", "progress"],
      },
      {
        proverb: "Haraka haraka haina baraka",
        language: "Swahili",
        country: "Kenya",
        region: "East Africa",
        translated_meaning: "Hurry hurry has no blessings",
        cultural_notes:
          "This proverb warns against rushing through life without taking time to do things properly. Patience and deliberation lead to better outcomes.",
        themes: ["patience", "wisdom", "quality", "deliberation"],
      },
      {
        proverb: "Omo ti a ba so fun pe baba re ku, ti o ba gbagbe, ojo kan ni yio ri baba re",
        language: "Yoruba",
        country: "Nigeria",
        region: "West Africa",
        translated_meaning: "A child who forgets that his father is dead will one day see his father",
        cultural_notes:
          "This teaches that we cannot escape our roots and heritage. Our ancestors live on through us and their wisdom guides us.",
        themes: ["ancestry", "heritage", "memory", "guidance"],
      },
      {
        proverb: "Umuntu ngumuntu ngabantu",
        language: "Xhosa",
        country: "South Africa",
        region: "Southern Africa",
        translated_meaning: "A person is a person through other persons",
        cultural_notes:
          "Similar to Ubuntu, this emphasizes that our humanity is affirmed by recognizing the humanity in others. We become fully human through our relationships.",
        themes: ["ubuntu", "humanity", "relationships", "community"],
      },
      {
        proverb: "Mti hauendi ila kwa nyenzo",
        language: "Swahili",
        country: "Tanzania",
        region: "East Africa",
        translated_meaning: "A tree does not go anywhere without its roots",
        cultural_notes:
          "This proverb emphasizes the importance of staying connected to one's origins, culture, and community while growing and developing.",
        themes: ["roots", "culture", "growth", "identity"],
      },
      {
        proverb: "Agbara eniyan ni eniyan",
        language: "Yoruba",
        country: "Nigeria",
        region: "West Africa",
        translated_meaning: "The strength of a person is other people",
        cultural_notes:
          "This highlights that individual strength comes from community support. No one succeeds alone; we are strengthened by our connections to others.",
        themes: ["strength", "community", "support", "interdependence"],
      },
      {
        proverb: "Motho ke motho ka batho",
        language: "Sotho",
        country: "Lesotho",
        region: "Southern Africa",
        translated_meaning: "A person is a person because of other people",
        cultural_notes:
          "Another expression of Ubuntu philosophy, emphasizing that our identity and humanity are shaped by our relationships and community interactions.",
        themes: ["ubuntu", "identity", "community", "relationships"],
      },
      {
        proverb: "Baobab tree does not grow in one day",
        language: "Shona",
        country: "Zimbabwe",
        region: "Southern Africa",
        translated_meaning: "Great achievements take time and patience",
        cultural_notes:
          "The baobab tree is sacred in African culture, living for thousands of years. This proverb teaches patience and persistence in pursuing meaningful goals.",
        themes: ["patience", "growth", "achievement", "persistence"],
      },
      {
        proverb: "Inyama yegomo rinofa nemombe",
        language: "Shona",
        country: "Zimbabwe",
        region: "Southern Africa",
        translated_meaning: "The meat of a cow dies with the cow",
        cultural_notes:
          "This teaches that material possessions are temporary, but wisdom, character, and relationships endure beyond physical life.",
        themes: ["wisdom", "legacy", "materialism", "values"],
      },
      {
        proverb: "Akoko nan tia ba na enkum nan tia ba",
        language: "Akan",
        country: "Ghana",
        region: "West Africa",
        translated_meaning: "The hen's foot treads on the chick, but it does not kill the chick",
        cultural_notes:
          "This proverb speaks to the protective nature of community elders and the understanding that discipline comes from love, not harm.",
        themes: ["protection", "discipline", "love", "community"],
      },
      {
        proverb: "Munhu haasi chikoro",
        language: "Shona",
        country: "Zimbabwe",
        region: "Southern Africa",
        translated_meaning: "A person is not a school",
        cultural_notes:
          "This means that learning never ends. Unlike a school which you can graduate from, a person continues learning throughout life.",
        themes: ["learning", "growth", "humility", "wisdom"],
      },
      {
        proverb: "Ukweli hauogopi upelelezi",
        language: "Swahili",
        country: "Kenya",
        region: "East Africa",
        translated_meaning: "Truth does not fear investigation",
        cultural_notes:
          "This proverb emphasizes the power of truth and honesty. When something is true, it can withstand any scrutiny or questioning.",
        themes: ["truth", "honesty", "integrity", "investigation"],
      },
      {
        proverb: "Eni ti o ba gbo ohun ti agba so, yio so ohun ti omo so",
        language: "Yoruba",
        country: "Nigeria",
        region: "West Africa",
        translated_meaning: "He who listens to what the elder says will say what the child says",
        cultural_notes:
          "This teaches the importance of respecting elders and learning from their wisdom. Those who ignore elder wisdom often speak foolishly.",
        themes: ["respect", "wisdom", "elders", "learning"],
      },
    ]

    this.proverbs = rawProverbs.map((p) => {
      const hash = this.generateHash(p.proverb)
      const proverb: AfricanProverb = { ...p, hash }
      this.proverbMap.set(p.translated_meaning.toLowerCase(), proverb)
      this.proverbMap.set(p.proverb.toLowerCase(), proverb)
      this.hashMap.set(hash, proverb)
      return proverb
    })
  }

  private generateHash(text: string): string {
    return crypto.createHash("sha256").update(text.toLowerCase().trim()).digest("hex").substring(0, 16)
  }

  validateProverb(input: string): boolean {
    const normalized = input.toLowerCase().trim()
    return this.proverbMap.has(normalized)
  }

  getProverbMeta(input: string): AfricanProverb | null {
    const normalized = input.toLowerCase().trim()
    return this.proverbMap.get(normalized) || null
  }

  getProverbHash(input: string): string {
    const proverb = this.getProverbMeta(input)
    return proverb ? proverb.hash : this.generateHash(input)
  }

  validateProverbHash(hash: string): boolean {
    return this.hashMap.has(hash)
  }

  getProverbByHash(hash: string): AfricanProverb | null {
    return this.hashMap.get(hash) || null
  }

  getRandomProverb(): AfricanProverb {
    const randomIndex = Math.floor(Math.random() * this.proverbs.length)
    return this.proverbs[randomIndex]
  }

  searchProverbs(criteria: { theme?: string; region?: string; language?: string }): AfricanProverb[] {
    return this.proverbs.filter((proverb) => {
      if (criteria.theme && !proverb.themes.includes(criteria.theme)) return false
      if (criteria.region && proverb.region !== criteria.region) return false
      if (criteria.language && proverb.language !== criteria.language) return false
      return true
    })
  }

  generateProverbChallenge(): ProverbChallenge {
    const correctProverb = this.getRandomProverb()
    const wrongProverbs = this.proverbs
      .filter((p) => p.hash !== correctProverb.hash)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const allOptions = [correctProverb, ...wrongProverbs].sort(() => Math.random() - 0.5)

    const correctAnswer = allOptions.findIndex((p) => p.hash === correctProverb.hash)

    return {
      question: `What does this ${correctProverb.language} proverb mean: "${correctProverb.proverb}"?`,
      options: allOptions.map((p) => p.translated_meaning),
      correctAnswer,
      proverb: correctProverb,
    }
  }

  validateCulturalContext(content: string, anchoringProverb: string): CulturalValidation {
    const proverb = this.getProverbMeta(anchoringProverb)

    if (!proverb) {
      return {
        isValid: false,
        culturalRelevance: 0,
        message: "Anchoring proverb not found in verified African wisdom database",
      }
    }

    // Simple relevance scoring based on theme alignment
    const contentLower = content.toLowerCase()
    const relevantThemes = proverb.themes.filter(
      (theme) => contentLower.includes(theme) || contentLower.includes(theme.substring(0, 4)),
    )

    const culturalRelevance = relevantThemes.length / proverb.themes.length

    if (culturalRelevance >= 0.3) {
      return {
        isValid: true,
        culturalRelevance,
        message: `Content aligns with ${proverb.language} wisdom themes: ${relevantThemes.join(", ")}`,
      }
    } else {
      return {
        isValid: false,
        culturalRelevance,
        message: `Content does not align with the cultural themes of the anchoring proverb: ${proverb.themes.join(", ")}`,
      }
    }
  }

  getAvailableLanguages(): string[] {
    return [...new Set(this.proverbs.map((p) => p.language))]
  }

  getAvailableRegions(): string[] {
    return [...new Set(this.proverbs.map((p) => p.region))]
  }

  getAvailableCountries(): string[] {
    return [...new Set(this.proverbs.map((p) => p.country))]
  }

  getProverbsByTheme(theme: string): AfricanProverb[] {
    return this.proverbs.filter((p) => p.themes.includes(theme.toLowerCase()))
  }

  getAllThemes(): string[] {
    const themes = new Set<string>()
    this.proverbs.forEach((p) => p.themes.forEach((theme) => themes.add(theme)))
    return Array.from(themes)
  }
}

// Export singleton instance
export const proverbValidator = new ProverbValidator()

// Export types
export type { ProverbChallenge, CulturalValidation }
