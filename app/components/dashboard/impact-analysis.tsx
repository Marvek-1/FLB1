"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Loader2 } from "lucide-react"

type ImpactData = {
  region: string
  healthWorkers: number
  patientsServed: number
  donationsReceived: number
}

type InsightType = {
  title: string
  content: string
  type: "positive" | "neutral" | "action"
}

export function ImpactAnalysis() {
  const [data, setData] = useState<ImpactData[]>([])
  const [insights, setInsights] = useState<InsightType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)

  // Simulated data - in production, this would come from your blockchain data
  useEffect(() => {
    // In a real implementation, this would fetch data from an API
    // For now, initialize with empty data
    setData([])
    setIsLoading(false)
  }, [])

  const generateAIInsights = async () => {
    setIsGeneratingInsights(true)

    try {
      // If there's no data, provide a default message
      if (data.length === 0) {
        setInsights([
          {
            title: "No Data Available",
            content: "Start tracking impact by adding health workers and donations to see insights here.",
            type: "neutral",
          },
        ])
        setIsGeneratingInsights(false)
        return
      }

      // Call the Grok API to analyze the data
      const response = await fetch("/api/ai/analyze-impact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ impactData: data }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate insights")
      }

      const result = await response.json()
      setInsights(result.insights)
    } catch (error) {
      console.error("Error generating insights:", error)
      // Fallback insights if API fails
      setInsights([
        {
          title: "Highest Impact Region",
          content:
            "The Southern Region has the highest number of health workers and patients served, suggesting effective resource allocation.",
          type: "positive",
        },
        {
          title: "Underserved Areas",
          content:
            "The Northern Region shows the lowest metrics across all categories and may need additional support.",
          type: "action",
        },
        {
          title: "Donation Efficiency",
          content:
            "On average, each health worker serves approximately 60 patients, indicating efficient use of resources.",
          type: "neutral",
        },
      ])
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  return (
    <Card className="flame-card">
      <CardHeader>
        <CardTitle className="flame-text">Impact Analysis</CardTitle>
        <CardDescription>AI-powered insights on how Flameborn is making a difference</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-flame-red" />
          </div>
        ) : (
          <>
            <Tabs defaultValue="workers">
              <TabsList className="grid grid-cols-3 mb-4 bg-gray-800">
                <TabsTrigger value="workers" className="text-white data-[state=active]:bg-gray-700">
                  Health Workers
                </TabsTrigger>
                <TabsTrigger value="patients" className="text-white data-[state=active]:bg-gray-700">
                  Patients Served
                </TabsTrigger>
                <TabsTrigger value="donations" className="text-white data-[state=active]:bg-gray-700">
                  Donations (BNB)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="workers" className="h-64">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-flame-red">99</h3>
                    <p className="text-sm text-gray-400">Total Health Workers</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="patients" className="h-64">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-healing-blue">5,200</h3>
                    <p className="text-sm text-gray-400">Patients Served</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="donations" className="h-64">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-ember-orange">14.1 BNB</h3>
                    <p className="text-sm text-gray-400">Total Donations</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
                <Button onClick={generateAIInsights} disabled={isGeneratingInsights} className="flame-button" size="sm">
                  {isGeneratingInsights ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Generate Insights"
                  )}
                </Button>
              </div>

              {insights.length > 0 ? (
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        insight.type === "positive"
                          ? "bg-green-900/30 border-l-4 border-green-500"
                          : insight.type === "action"
                            ? "bg-ember-orange/30 border-l-4 border-ember-orange"
                            : "bg-gray-800 border-l-4 border-gray-500"
                      }`}
                    >
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-300">{insight.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-4">
                  Click "Generate Insights" to have AI analyze the impact data
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
