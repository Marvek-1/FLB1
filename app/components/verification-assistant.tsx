"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function VerificationAssistant() {
  const [credentials, setCredentials] = useState("")
  const [location, setLocation] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    score: number
    feedback: string
    recommendations: string[]
  } | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)

    try {
      // In a real implementation, this would call an API
      // For now, provide basic validation feedback

      // Simple validation
      const credentialsLength = credentials.trim().length
      const locationProvided = location.trim().length > 0

      let score = 0
      const recommendations = []

      // Score based on credentials length
      if (credentialsLength > 100) {
        score += 50
      } else if (credentialsLength > 50) {
        score += 30
        recommendations.push("Provide more details about your medical background and experience.")
      } else {
        score += 10
        recommendations.push(
          "Your credentials description is too brief. Please provide comprehensive details about your qualifications and experience.",
        )
      }

      // Score based on location
      if (locationProvided) {
        score += 30
      } else {
        recommendations.push("Please specify your location to help us verify your credentials.")
      }

      // Additional points for specific keywords
      const medicalKeywords = [
        "doctor",
        "nurse",
        "hospital",
        "clinic",
        "patient",
        "medical",
        "health",
        "care",
        "treatment",
      ]
      const keywordsFound = medicalKeywords.filter((keyword) => credentials.toLowerCase().includes(keyword)).length

      score += keywordsFound * 2 // 2 points per keyword

      if (keywordsFound < 3) {
        recommendations.push("Include specific details about your medical role, workplace, and responsibilities.")
      }

      // Cap score at 100
      score = Math.min(score, 100)

      // Generate feedback based on score
      let feedback = ""
      if (score >= 70) {
        feedback = "Your credentials appear strong and detailed. This will help in the verification process."
      } else if (score >= 40) {
        feedback = "Your credentials provide a good foundation, but could benefit from more specific details."
      } else {
        feedback = "Your credentials need significant improvement to meet our verification standards."
      }

      setResult({
        score,
        feedback,
        recommendations,
      })
    } catch (error) {
      console.error("Error analyzing credentials:", error)
      setResult({
        score: 0,
        feedback: "An error occurred while analyzing the credentials. Please try again.",
        recommendations: ["Ensure you've provided detailed information about your medical background."],
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="flame-card">
      <CardHeader>
        <CardTitle className="flame-text">Credential Verification Assistant</CardTitle>
        <CardDescription>Get AI-powered feedback on your health worker credentials before submitting</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-white">
              Location
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="flame-input"
              placeholder="e.g., Nairobi, Kenya"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="credentials" className="block text-sm font-medium text-white">
              Medical Credentials
            </label>
            <Textarea
              id="credentials"
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
              required
              className="flame-input min-h-[120px]"
              placeholder="Describe your medical background, certifications, experience, and current role in detail..."
            />
          </div>

          <Button
            type="submit"
            disabled={isAnalyzing || !credentials.trim() || !location.trim()}
            className="flame-button w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Credentials"
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Verification Score</h3>
              <div className="flex items-center">
                <span
                  className={`text-lg font-bold ${
                    result.score >= 70 ? "text-green-400" : result.score >= 40 ? "text-yellow-400" : "text-red-400"
                  }`}
                >
                  {result.score}/100
                </span>
                {result.score >= 70 ? (
                  <CheckCircle className="ml-2 h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="ml-2 h-5 w-5 text-yellow-400" />
                )}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-gray-800">
              <h4 className="font-medium mb-1">Feedback</h4>
              <p className="text-sm text-gray-300">{result.feedback}</p>
            </div>

            {result.recommendations.length > 0 && (
              <div className="p-3 rounded-lg bg-ember-orange/20">
                <h4 className="font-medium mb-1">Recommendations</h4>
                <ul className="text-sm text-gray-300 list-disc list-inside">
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
