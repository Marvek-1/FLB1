"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { motion } from "framer-motion"

export function HealthActorRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    credentials: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    // Add form validation
    if (!formData.name.trim()) {
      setResult({
        success: false,
        message: "Please enter your full name.",
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.location.trim()) {
      setResult({
        success: false,
        message: "Please enter your location.",
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.credentials.trim() || formData.credentials.length < 20) {
      setResult({
        success: false,
        message: "Please provide detailed credentials (at least 20 characters).",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // In a real implementation, this would call the contract
      // For testing data entry, we'll simulate a successful registration

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate success
      const success = true

      if (success) {
        setResult({
          success: true,
          message: "Registration successful! Your application will be reviewed by the Flameborn DAO.",
        })
        setFormData({
          name: "",
          location: "",
          credentials: "",
        })
      } else {
        setResult({
          success: false,
          message: "Registration failed. Please try again or contact support.",
        })
      }
    } catch (error) {
      console.error("Error during registration:", error)
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-4 sm:px-0"
    >
      <Card className="flame-card">
        <CardHeader>
          <CardTitle className="flame-text text-center">Health Actor Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="flame-input"
                placeholder="Dr. Jane Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-white">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="flame-input"
                placeholder="Nairobi, Kenya"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="credentials" className="block text-sm font-medium text-white">
                Medical Credentials
              </label>
              <Textarea
                id="credentials"
                name="credentials"
                value={formData.credentials}
                onChange={handleChange}
                required
                className="flame-input min-h-[100px]"
                placeholder="Describe your medical background, certifications, and experience..."
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="flame-button w-full">
              {isSubmitting ? "Submitting..." : "Register as Health Actor"}
            </Button>

            {result && (
              <div
                className={`p-3 rounded text-center ${
                  result.success ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                }`}
              >
                {result.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
