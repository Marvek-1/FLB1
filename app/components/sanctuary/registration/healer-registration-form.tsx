"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Heart, ArrowRight, ArrowLeft, Camera, Upload, Check, AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Regions for the dropdown
const REGIONS = [
  { value: "eastern", label: "Eastern Africa" },
  { value: "western", label: "Western Africa" },
  { value: "northern", label: "Northern Africa" },
  { value: "southern", label: "Southern Africa" },
  { value: "central", label: "Central Africa" },
]

// Healthcare roles
const ROLES = [
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "midwife", label: "Midwife" },
  { value: "chw", label: "Community Health Worker" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "other", label: "Other Healthcare Provider" },
]

export function HealerRegistrationForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    specialization: "",
    region: "",
    country: "",
    city: "",
    facilityName: "",
    experience: "",
    credentials: "",
    walletAddress: "",
    bio: "",
    agreeToTerms: false,
  })

  // Face ID state
  const [faceIdState, setFaceIdState] = useState<"idle" | "capturing" | "processing" | "success" | "error">("idle")
  const [faceCaptures, setFaceCaptures] = useState<string[]>([])
  const [capturePrompt, setCapturePrompt] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // License upload state
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [licensePreview, setLicensePreview] = useState<string | null>(null)

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

  // Handle license file upload
  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLicenseFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setLicensePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Start face ID verification
  const startFaceId = async () => {
    try {
      setFaceIdState("capturing")
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      // Set up capture sequence
      const captureSequence = [
        "Please look straight at the camera",
        "Please blink slowly",
        "Please turn your head slightly to the right",
        "Please turn your head slightly to the left",
        "Please nod your head",
      ]

      let captureIndex = 0
      setCapturePrompt(captureSequence[captureIndex])

      const captureInterval = setInterval(() => {
        if (captureIndex < captureSequence.length - 1) {
          captureFrame()
          captureIndex++
          setCapturePrompt(captureSequence[captureIndex])
        } else {
          captureFrame()
          clearInterval(captureInterval)
          finishFaceCapture(stream)
        }
      }, 2000)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setFaceIdState("error")
    }
  }

  // Capture a frame from the video
  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        const captureDataUrl = canvasRef.current.toDataURL("image/png")
        setFaceCaptures((prev) => [...prev, captureDataUrl])
      }
    }
  }

  // Finish face capture process
  const finishFaceCapture = (stream: MediaStream) => {
    stream.getTracks().forEach((track) => track.stop())
    setFaceIdState("processing")

    // Simulate processing (in a real app, you'd send these to your backend)
    setTimeout(() => {
      setFaceIdState("success")
    }, 2000)
  }

  const nextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.role || !formData.region) {
        setFormError("Please fill in all required fields")
        return
      }
    } else if (step === 2) {
      if (!formData.credentials || !licenseFile) {
        setFormError("Please provide your credentials and upload your license")
        return
      }
    } else if (step === 3) {
      if (faceIdState !== "success") {
        setFormError("Please complete the face verification process")
        return
      }
    }

    setFormError(null)
    setStep((prev) => prev + 1)
  }

  const prevStep = () => setStep((prev) => prev - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step < 4) {
      nextStep()
      return
    }

    if (!formData.agreeToTerms) {
      setFormError("Please agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real implementation, this would submit to an API
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a random user ID
      const userId = `healer-${Math.random().toString(36).substring(2, 10)}`

      // Store in localStorage for demo purposes
      // In a real app, this would be stored in a database
      const userData = {
        id: userId,
        type: "healer",
        ...formData,
        faceVerified: true,
        licenseVerified: false, // Requires Guardian verification
        registeredAt: new Date().toISOString(),
        verificationStatus: "pending",
        profileImage: faceCaptures[0] || null,
        impact: {
          patientsServed: 0,
          communitiesReached: 0,
          donationsReceived: 0,
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
      setFormError("An error occurred while submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-dusk border border-flame/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-flame flex items-center gap-2">
          <Heart className="h-5 w-5" />
          {step === 5 ? "Registration Complete" : "Healer Registration"}
        </CardTitle>
        <CardDescription>
          {step === 5
            ? "Your application has been submitted for verification"
            : "Join the Flameborn community of verified healthcare workers"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {formError && (
          <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-300">{formError}</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 focus:border-flame"
                placeholder="Dr. Jane Doe"
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
                className="bg-gray-800/50 border-gray-700 focus:border-flame"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Healthcare Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization (if applicable)</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 focus:border-flame"
                  placeholder="e.g., Pediatrics, Maternal Health"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={formData.region} onValueChange={(value) => handleSelectChange("region", value)}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-700">
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 focus:border-flame"
                  placeholder="e.g., Kenya, Nigeria"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City/Town</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 focus:border-flame"
                  placeholder="e.g., Nairobi, Lagos"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facilityName">Facility Name</Label>
                <Input
                  id="facilityName"
                  name="facilityName"
                  value={formData.facilityName}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 focus:border-flame"
                  placeholder="Hospital, Clinic, or Community Center"
                />
              </div>
            </div>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 focus:border-flame"
                placeholder="e.g., 5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentials">Medical Credentials</Label>
              <Textarea
                id="credentials"
                name="credentials"
                value={formData.credentials}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 focus:border-flame min-h-[100px]"
                placeholder="Describe your medical background, certifications, and experience..."
                required
              />
              <p className="text-xs text-gray-400">
                Include your license number, certification details, and any relevant qualifications
              </p>
            </div>

            <div className="space-y-2">
              <Label>Upload License/Certification</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-600 rounded-md">
                <div className="space-y-1 text-center">
                  {licensePreview ? (
                    <div className="relative">
                      <img
                        src={licensePreview || "/placeholder.svg"}
                        alt="License preview"
                        className="mx-auto h-32 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setLicenseFile(null)
                          setLicensePreview(null)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-400">
                        <label
                          htmlFor="license-upload"
                          className="relative cursor-pointer rounded-md font-medium text-flame-red hover:text-ember-orange"
                        >
                          <span>Upload a file</span>
                          <input
                            id="license-upload"
                            name="license-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*,.pdf"
                            onChange={handleLicenseUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="walletAddress">Wallet Address (optional)</Label>
              <Input
                id="walletAddress"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 focus:border-flame"
                placeholder="0x..."
              />
              <p className="text-xs text-gray-400">Where you'll receive support funds</p>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Face ID Verification</h3>
                <p className="text-sm text-gray-400 mb-4">
                  This helps us verify your identity and prevent fraud. Your face data is encrypted and only used for
                  verification.
                </p>

                <div className="relative mx-auto w-full max-w-sm h-64 bg-gray-800 rounded-lg overflow-hidden">
                  {faceIdState === "idle" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Camera className="h-16 w-16 text-gray-500 mb-4" />
                      <Button type="button" className="flame-button" onClick={startFaceId}>
                        Start Face Verification
                      </Button>
                    </div>
                  )}

                  {faceIdState === "capturing" && (
                    <div className="relative h-full">
                      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
                      <div className="absolute inset-0 border-4 border-flame-red rounded-lg" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-center">
                        <p className="text-white">{capturePrompt}</p>
                      </div>
                    </div>
                  )}

                  {faceIdState === "processing" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Loader2 className="h-12 w-12 text-flame-red animate-spin mb-4" />
                      <p className="text-white">Processing verification...</p>
                    </div>
                  )}

                  {faceIdState === "success" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-900 bg-opacity-20">
                      <Check className="h-16 w-16 text-green-500 mb-4" />
                      <p className="text-green-400 font-medium">Verification Successful</p>
                    </div>
                  )}

                  {faceIdState === "error" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900 bg-opacity-20">
                      <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
                      <p className="text-red-400 font-medium">Verification Failed</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => setFaceIdState("idle")}
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>

                <canvas ref={canvasRef} className="hidden" />
              </div>
            </div>
          </motion.form>
        )}

        {step === 4 && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">About You</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700 focus:border-flame min-h-[100px]"
                placeholder="Tell us about your work, your community, and the challenges you face..."
              />
              <p className="text-xs text-gray-400">
                This information helps Guardians understand your work and how they can support you
              </p>
            </div>

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
                  <p className="text-gray-400">Role:</p>
                  <p className="text-white">{formData.role}</p>
                </div>
                <div>
                  <p className="text-gray-400">Location:</p>
                  <p className="text-white">
                    {formData.city}, {formData.country}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Facility:</p>
                  <p className="text-white">{formData.facilityName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Experience:</p>
                  <p className="text-white">{formData.experience} years</p>
                </div>
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
                  I confirm that all information provided is accurate
                </Label>
                <p className="text-xs text-gray-400">
                  By registering, you agree to the Flameborn Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </motion.form>
        )}

        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <div className="w-20 h-20 bg-flame/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-flame" />
            </div>

            <h3 className="text-xl font-medium text-flame mb-4">Application Submitted Successfully!</h3>
            <p className="text-gray-300 mb-6">
              Thank you for applying to join the Flameborn community. Your application will be reviewed by our Guardian
              community.
            </p>

            <div className="bg-gray-800/50 p-4 rounded-lg mb-6 text-left">
              <h4 className="font-medium mb-2">What happens next?</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-flame text-white text-xs mr-2">
                    1
                  </span>
                  <span>Guardians will review your credentials and verify your identity</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-flame text-white text-xs mr-2">
                    2
                  </span>
                  <span>You'll receive a notification when your verification is complete</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-flame text-white text-xs mr-2">
                    3
                  </span>
                  <span>Once verified, you'll be eligible to receive support through Flameborn</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-flame text-white hover:bg-flame/80" onClick={() => router.push("/profile")}>
                Go to My Profile
              </Button>
              <Button
                variant="outline"
                className="border-flame text-flame hover:bg-flame/10"
                onClick={() => router.push("/")}
              >
                Return to Home
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>

      {step < 5 && (
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}

          <Button className="bg-flame text-white hover:bg-flame/80" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              "Processing..."
            ) : step === 4 ? (
              "Submit Application"
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
