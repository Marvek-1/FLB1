"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import { ArrowRight, Wallet, CreditCard, Coins, Shield, Heart, Users } from "lucide-react"

export function TokenRegistrationFlow() {
  const [step, setStep] = useState(1)
  const [registrationType, setRegistrationType] = useState<"guardian" | "healer" | null>(null)
  const [tokenAmount, setTokenAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "card" | "bank" | null>(null)

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="bg-ash-gray/30 border border-flame/20">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-flame">Flameborn Registration & Token Flow</CardTitle>
          <CardDescription>Join the movement to support healthcare workers across Africa</CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading text-white">Choose Your Role</h3>
              <p className="text-gray-300">How would you like to participate in the Flameborn ecosystem?</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card
                  className={`cursor-pointer transition-all hover:border-guardian/50 ${registrationType === "guardian" ? "border-2 border-guardian" : "border border-gray-700"}`}
                  onClick={() => setRegistrationType("guardian")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-guardian/20">
                        <Shield className="h-8 w-8 text-guardian" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">Guardian</h4>
                        <p className="text-sm text-gray-400">Support healthcare workers with resources</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all hover:border-flame/50 ${registrationType === "healer" ? "border-2 border-flame" : "border border-gray-700"}`}
                  onClick={() => setRegistrationType("healer")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-flame/20">
                        <Heart className="h-8 w-8 text-flame" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">Healer</h4>
                        <p className="text-sm text-gray-400">Register as a healthcare worker to receive support</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  onClick={nextStep}
                  disabled={!registrationType}
                  className={registrationType === "guardian" ? "bg-guardian text-black" : "bg-flame text-white"}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && registrationType === "guardian" && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading text-white">Guardian Registration</h3>
              <p className="text-gray-300">
                As a Guardian, you'll support healthcare workers with resources and verify their credentials.
              </p>

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="tokenAmount">Contribution Amount</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tokenAmount"
                      type="number"
                      min="10"
                      placeholder="100"
                      value={tokenAmount}
                      onChange={(e) => setTokenAmount(e.target.value)}
                      className="flame-input"
                    />
                    <Select>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
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
                      className={`cursor-pointer transition-all hover:border-guardian/50 ${paymentMethod === "crypto" ? "border-2 border-guardian" : "border border-gray-700"}`}
                      onClick={() => setPaymentMethod("crypto")}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-guardian" />
                        <span>Crypto Wallet</span>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all hover:border-guardian/50 ${paymentMethod === "card" ? "border-2 border-guardian" : "border border-gray-700"}`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-guardian" />
                        <span>Credit Card</span>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all hover:border-guardian/50 ${paymentMethod === "bank" ? "border-2 border-guardian" : "border border-gray-700"}`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Coins className="h-5 w-5 text-guardian" />
                        <span>Bank Transfer</span>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="terms" />
                    <div>
                      <Label htmlFor="terms" className="text-sm font-medium">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">
                        By becoming a Guardian, you commit to supporting healthcare workers and the Flameborn mission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep} disabled={!tokenAmount || !paymentMethod} className="bg-guardian text-black">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && registrationType === "healer" && (
            <div className="space-y-6">
              <h3 className="text-xl font-heading text-white">Healthcare Worker Registration</h3>
              <p className="text-gray-300">
                Register as a healthcare worker to receive support from the Flameborn community.
              </p>

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Dr. Jane Doe" className="flame-input" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Healthcare Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="midwife">Midwife</SelectItem>
                      <SelectItem value="chw">Community Health Worker</SelectItem>
                      <SelectItem value="other">Other Healthcare Provider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Nairobi, Kenya" className="flame-input" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credentials">Medical Credentials</Label>
                  <Textarea
                    id="credentials"
                    placeholder="Describe your medical background, certifications, and experience..."
                    className="flame-input min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address (optional)</Label>
                  <Input id="walletAddress" placeholder="0x..." className="flame-input" />
                  <p className="text-xs text-gray-400">Where you'll receive support funds</p>
                </div>

                <div className="space-y-2 mt-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="terms" />
                    <div>
                      <Label htmlFor="terms" className="text-sm font-medium">
                        I confirm that I am a healthcare worker in Africa
                      </Label>
                      <p className="text-xs text-gray-400 mt-1">
                        Your application will be reviewed by Guardians for verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep} className="bg-flame text-white">
                  Submit Application <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && registrationType === "guardian" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-guardian/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-guardian" />
                </div>
                <h3 className="text-xl font-heading text-white">Guardian Registration Complete</h3>
                <p className="text-gray-300 mt-2">
                  Thank you for becoming a Guardian! Your contribution will directly support healthcare workers.
                </p>

                <div className="mt-8 p-6 bg-ash-gray/50 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-4">Your Guardian Benefits</h4>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-guardian mt-1" />
                      <span>Access to the Guardian's Sanctuary</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-guardian mt-1" />
                      <span>Ability to verify healthcare workers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-guardian mt-1" />
                      <span>Direct impact tracking of your contributions</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-400 mb-4">
                    Your FLB tokens will be minted and sent to your wallet shortly.
                  </p>
                  <Button className="bg-guardian text-black">Go to Guardian Dashboard</Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && registrationType === "healer" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-flame/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-flame" />
                </div>
                <h3 className="text-xl font-heading text-white">Application Submitted</h3>
                <p className="text-gray-300 mt-2">
                  Thank you for applying! Your application will be reviewed by our Guardian community.
                </p>

                <div className="mt-8 p-6 bg-ash-gray/50 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-4">Next Steps</h4>
                  <ol className="space-y-3 text-left list-decimal list-inside">
                    <li className="text-gray-300">
                      <span className="font-medium text-white">Verification:</span> Guardians will review your
                      credentials
                    </li>
                    <li className="text-gray-300">
                      <span className="font-medium text-white">Approval:</span> Once verified, you'll receive your
                      Healer status
                    </li>
                    <li className="text-gray-300">
                      <span className="font-medium text-white">Support:</span> You'll be eligible to receive direct
                      support from Guardians
                    </li>
                  </ol>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-400 mb-4">
                    We'll notify you once your application has been reviewed.
                  </p>
                  <Button className="bg-flame text-white">Check Application Status</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
