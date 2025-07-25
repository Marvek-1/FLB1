"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Textarea } from "@/app/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, AlertTriangle } from "lucide-react"

// Predefined responses for common questions
const FALLBACK_RESPONSES = {
  default: "I'm here to help with information about Flameborn. Please ask me a question.",
}

export function AIFallback() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: FALLBACK_RESPONSES.default },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message to conversation
    setConversation((prev) => [...prev, { role: "user", content: query }])

    // Generate a simple response
    const response =
      "Thank you for your question. This is a placeholder response as the AI service is currently in development."

    // Add assistant response
    setConversation((prev) => [...prev, { role: "assistant", content: response }])

    // Clear input
    setQuery("")
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flame-button fixed bottom-4 right-4 rounded-full p-4 z-50"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-80 md:w-96 z-50"
          >
            <Card className="flame-card border-flame-red shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flame-text text-lg flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Flame Assistant
                </CardTitle>
                <div className="bg-yellow-900/30 p-2 rounded-md flex items-start mt-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-300">AI services are currently limited. Using basic responses.</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto mb-4 space-y-4 p-1">
                  {conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg ${
                        message.role === "assistant" ? "bg-gray-800 text-white" : "bg-ember-orange/20 text-white ml-4"
                      }`}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <Textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about Flameborn..."
                    className="flame-input min-h-[60px] resize-none"
                  />
                  <Button type="submit" className="flame-button w-full" disabled={!query.trim()}>
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
