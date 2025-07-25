"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Shield, ArrowRight, ArrowLeft, Wallet, CreditCard, Coins, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export function GuardianRegistrationForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    contributionAmount: "",
    currency: "usd",
    paymentMethod: "",
    motivation: "",
    receiveUpdates: true,
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step < 3) {
      nextStep()
      return
    }

    setIsSubmitting(true)

    try {
      // In a real implementation, this would submit to an API
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a random user ID
      const userId = `guardian-${Math.random().toString(36).substring(2, 10)}`

      // Store in localStorage for demo purposes
      // In a real app, this would be stored in a database
      const userData = {
        id: userId,
        type: "guardian",
        ...formData,
        registeredAt: new Date().toISOString(),
        impact: {
          donationsCount: 0,
          totalDonated: 0,
          healthWorkersSupported: 0,
        },
      }

      // Save to localStorage
      localStorage.setItem(`flameborn_user_${userId}`, JSON.stringify(userData))

      // Save current user ID
      localStorage.setItem("flameborn_current_user", userId)

      // Move to success step
      nextStep()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-dusk border border-guardian/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-guardian flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {step === 4 ? "Registration Complete" : "Guardian Registration"}
        </CardTitle>
        <CardDescription>
          {step === 4
            ? "Welcome to the Flameborn community"
            : "Join the movement to support healthcare workers across Africa"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {step === 1 && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 focus:border-guardian"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 focus:border-guardian"
                placeholder="your.email@example.com"
                required
              />
              <p className="text-xs text-gray-400">We'll send updates about your impact to this email</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  <SelectItem value="ke">Kenya</SelectItem>
                  <SelectItem value="za">South Africa</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">What motivated you to become a Guardian?</Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 focus:border-guardian min-h-[100px]"
                placeholder="Share your story..."
              />
            </div>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contributionAmount">Contribution Amount</Label>
              <div className="flex gap-2">
                <Input
                  id="contributionAmount"
                  name="contributionAmount"
                  type="number"
                  min="10"
                  value={formData.contributionAmount}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 focus:border-guardian"
                  placeholder="100"
                  required
                />
                <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
                  <SelectTrigger className="w-[120px] bg-gray-800/50 border-gray-700">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="bnb">BNB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-400">Minimum contribution: 10 USD</p>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  className={`cursor-pointer transition-all hover:border-guardian/50 ${formData.paymentMethod === "crypto" ? "border-2 border-guardian" : "border border-gray-700"} bg-gray-800/50`}
                  onClick={() => handleSelectChange("paymentMethod", "crypto")}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-guardian" />
                    <span>Crypto Wallet</span>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all hover:border-guardian/50 ${formData.paymentMethod === "card" ? "border-2 border-guardian" : "border border-gray-700"} bg-gray-800/50`}
                  onClick={() => handleSelectChange("paymentMethod", "card")}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-guardian" />
                    <span>Credit Card</span>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all hover:border-guardian/50 ${formData.paymentMethod === "bank" ? "border-2 border-guardian" : "border border-gray-700"} bg-gray-800/50`}
                  onClick={() => handleSelectChange("paymentMethod", "bank")}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <Coins className="h-5 w-5 text-guardian" />
                    <span>Bank Transfer</span>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium text-white mb-2">Review Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Name:</p>
                  <p className="text-white">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Email:</p>
                  <p className="text-white">{formData.email}</p>
                </div>
                <div>
                  <p className="text-gray-400">Country:</p>
                  <p className="text-white">{formData.country}</p>
                </div>
                <div>
                  <p className="text-gray-400">Contribution:</p>
                  <p className="text-white">
                    {formData.contributionAmount} {formData.currency.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Payment Method:</p>
                  <p className="text-white capitalize">{formData.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onCheckedChange={(checked) => handleCheckboxChange("receiveUpdates", checked as boolean)}
                />
                <div>
                  <Label htmlFor="receiveUpdates" className="text-sm font-medium">
                    Receive impact updates
                  </Label>
                  <p className="text-xs text-gray-400">We'll send you updates about the impact of your contributions</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked as boolean)}
                  required
                />
                <div>
                  <Label htmlFor="agreeToTerms" className="text-sm font-medium">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                  <p className="text-xs text-gray-400">
                    By becoming a Guardian, you commit to supporting healthcare workers and the Flameborn mission
                  </p>
                </div>
              </div>
            </div>
          </motion.form>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <div className="w-20 h-20 bg-guardian/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-guardian" />
            </div>

            <h3 className="text-xl font-medium text-guardian mb-4">Welcome to Flameborn, {formData.fullName}!</h3>
            <p className="text-gray-300 mb-6">
              Your Guardian journey has begun. Your contribution will directly support healthcare workers across Africa.
            </p>

            <div className="bg-gray-800/50 p-4 rounded-lg mb-6 text-left">
              <h4 className="font-medium mb-2">What happens next?</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-guardian text-black text-xs mr-2">
                    1
                  </span>
                  <span>Complete your payment using your selected method</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-guardian text-black text-xs mr-2">
                    2
                  </span>
                  <span>Set up your Guardian profile to track your impact</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-guardian text-black text-xs mr-2">
                    3
                  </span>
                  <span>Start supporting and verifying healthcare workers</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-guardian text-black hover:bg-guardian/80" onClick={() => router.push("/profile")}>
                Go to My Profile
              </Button>
              <Button
                variant="outline"
                className="border-guardian text-guardian hover:bg-guardian/10"
                onClick={() => router.push("/")}
              >
                Return to Home
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>

      {step < 4 && (
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}

          <Button
            className="bg-guardian text-black hover:bg-guardian/80"
            onClick={handleSubmit}
            disabled={isSubmitting || (step === 3 && !formData.agreeToTerms)}
          >
            {isSubmitting ? (
              "Processing..."
            ) : step === 3 ? (
              "Complete Registration"
            ) : (
              <>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
