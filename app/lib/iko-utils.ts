/**
 * Utility functions for the Iko Ikang assistant
 */

/**
 * Enhances Flameborn references in text
 */
export const enhanceFlambornReferences = (text: string): string => {
  return text.replace(/Flameborn/gi, "🔥 Flameborn")
}

/**
 * Detects repetition in AI responses
 */
export const detectRepetition = (prevMessages: { role: string; content: string }[], newResponse: string): boolean => {
  const lastAssistantMessage = [...prevMessages].reverse().find((msg) => msg.role === "assistant")

  if (!lastAssistantMessage) return false

  // Check for substantial overlap
  const similarity = getSimilarity(lastAssistantMessage.content, newResponse)
  return similarity > 0.7 // 70% similarity threshold
}

/**
 * Calculate text similarity (simple version)
 */
const getSimilarity = (str1: string, str2: string): number => {
  const words1 = new Set(str1.toLowerCase().split(/\s+/))
  const words2 = new Set(str2.toLowerCase().split(/\s+/))

  // Calculate Jaccard similarity
  const intersection = new Set([...words1].filter((x) => words2.has(x)))
  const union = new Set([...words1, ...words2])

  return intersection.size / union.size
}

/**
 * Inject African wisdom quotes randomly
 */
export const injectAfricanWisdom = (text: string): string => {
  // Only inject wisdom occasionally
  if (Math.random() > 0.25) return text

  const wisdomQuotes = [
    "As our ancestors say: 'If you want to go fast, go alone. If you want to go far, go together.'",
    "In the spirit of Ubuntu: 'I am because we are.'",
    "Remember the wisdom: 'Until the lion tells his side of the story, the tale of the hunt will always glorify the hunter.'",
    "As we say in Africa: 'When spider webs unite, they can tie up a lion.'",
    "The elders teach us: 'Cross the river in a crowd and the crocodile won't eat you.'",
  ]

  const selectedQuote = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)]

  // Add the quote as a postscript
  return `${text}\n\n${selectedQuote}`
}
