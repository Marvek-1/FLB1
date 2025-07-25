"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, Loader2, Flame, Heart, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Badge } from "@/app/components/ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "ubuntu" | "technical" | "cultural"
}

const MostarAIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        'Sawubona! I am Mostar, your Ubuntu AI guide for the FlameBorn ecosystem. I embody the spirit of "I am because we are" and can help you understand our healthcare tokenization platform, African wisdom, and community-driven development. How can I assist you today?',
      timestamp: new Date(),
      type: "ubuntu",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch("/api/mostar-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input.trim(),
          context: "flameborn-ubuntu-healthcare",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        type: data.type || "ubuntu",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          'Ngiyaxolisa (I apologize). I am experiencing technical difficulties. Like the Ubuntu saying goes, "When the spider webs unite, they can tie up a lion" - our community will help resolve this together. Please try again in a moment.',
        timestamp: new Date(),
        type: "cultural",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const getMessageTypeIcon = (type?: string) => {
    switch (type) {
      case "ubuntu":
        return <Heart className="w-4 h-4 text-red-500" />
      case "technical":
        return <Flame className="w-4 h-4 text-orange-500" />
      case "cultural":
        return <Globe className="w-4 h-4 text-blue-500" />
      default:
        return <Bot className="w-4 h-4 text-gray-500" />
    }
  }

  const getMessageTypeBadge = (type?: string) => {
    switch (type) {
      case "ubuntu":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Ubuntu Wisdom
          </Badge>
        )
      case "technical":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Technical
          </Badge>
        )
      case "cultural":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Cultural
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="w-8 h-8 text-orange-600" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <CardTitle className="text-xl">Mostar AI Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">Ubuntu-powered AI for FlameBorn healthcare ecosystem</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 mt-1">{getMessageTypeIcon(message.type)}</div>
                    )}
                    <div className="flex-1">
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</div>
                        {message.role === "assistant" && message.type && (
                          <div className="ml-2">{getMessageTypeBadge(message.type)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-gray-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Ubuntu philosophy, FlameBorn tokens, healthcare, or African wisdom..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Powered by Ubuntu philosophy • Ask about healthcare tokenization, African proverbs, or community wisdom
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MostarAIAssistant
