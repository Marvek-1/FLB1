"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { motion } from "framer-motion"
import { Camera, Upload, Check, AlertTriangle, Loader2 } from "lucide-react"

// Regions for the dropdown
const REGIONS = [
  { value: "eastern", label: "Eastern Africa" },
  { value: "western", label: "Western Africa" },
  { value: "northern", label: "Northern Africa" },
  { value: "southern", label: "Southern Africa" },
  { value: "central", label: "Central Africa" },
]

// License types
const LICENSE_TYPES = [
  { value: "medical", label: "Medical License (MD)" },
  { value: "nursing", label: "Nursing License" },
  { value: "midwife", label: "Midwifery Certificate" },
  { value: "chw", label: "Community Health Worker ID" },
  { value: "pharmacy", label: "Pharmacy License" },
  { value: "other", label: "Other Healthcare Credential" },
]

export function RegisterCHW() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    licenseNumber: "",
    licenseType: "",
    region: "",
    clinic: "",
    phone: "",
    additionalInfo: "",
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

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [africanAncestry, setAfricanAncestry] = useState(false)
  const [voiceMessage, setVoiceMessage] = useState<Blob | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [formStep, setFormStep] = useState(1)
  const [formError, setFormError] = useState<string | null>(null)

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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

  // Start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const audioChunks: BlobPart[] = []
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data)
      })

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
        setVoiceMessage(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      })

      mediaRecorder.start()
      setIsRecording(true)

      // Set up recording timer
      let time = 0
      const timerInterval = setInterval(() => {
        time += 1
        setRecordingTime(time)
        if (time >= 30) {
          // Max 30 seconds
          stopRecording()
          clearInterval(timerInterval)
        }
      }, 1000)

      // Store the interval ID to clear it when stopping
      mediaRecorderRef.current.timerInterval = timerInterval
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  // Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
      if (mediaRecorderRef.current.timerInterval) {
        clearInterval(mediaRecorderRef.current.timerInterval)
      }
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (formStep === 1) {
      if (!formData.fullName || !formData.role || !formData.region) {
        setFormError("Please fill in all required fields")
        return
      }
      setFormStep(2)
      setFormError(null)
      return
    }

    if (formStep === 2) {
      if (!licenseFile || !formData.licenseNumber || !formData.licenseType) {
        setFormError("Please upload your license and provide license details")
        return
      }
      setFormStep(3)
      setFormError(null)
      return
    }

    if (formStep === 3) {
      // For testing purposes, we'll consider the face ID verification successful
      setFaceIdState("success")
      setFormStep(4)
      setFormError(null)
      return
    }

    if (formStep === 4) {
      if (!africanAncestry) {
        setFormError("Please confirm your African ancestry")
        return
      }

      // Final submission
      setIsSubmitting(true)

      try {
        // In a real implementation, this would submit to an API
        // For testing, we'll simulate a successful submission

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Move to success step
        setFormStep(5)
      } catch (error) {
        console.error("Error submitting form:", error)
        setFormError("An error occurred while submitting your application. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Format recording time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="flame-card border-flame-red">
        <CardHeader>
          <CardTitle className="flame-text text-center text-2xl">
            {formStep === 5 ? "Registration Complete" : "Health Worker Registration"}
          </CardTitle>
          <CardDescription className="text-center">
            {formStep === 5
              ? "Your application has been submitted for Guardian verification"
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

          {formStep === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="flame-input mt-1"
                    placeholder="Dr. Jane Doe"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role">Healthcare Role</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="flame-input mt-1"
                    placeholder="Doctor, Nurse, Midwife, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select value={formData.region} onValueChange={(value) => handleSelectChange("region", value)}>
                    <SelectTrigger className="flame-input mt-1">
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

                <div>
                  <Label htmlFor="clinic">Clinic/Hospital Name</Label>
                  <Input
                    id="clinic"
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleChange}
                    className="flame-input mt-1"
                    placeholder="Nairobi General Hospital"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flame-input mt-1"
                    placeholder="+254..."
                  />
                </div>
              </div>

              <Button type="submit" className="flame-button w-full">
                Continue to License Information
              </Button>
            </form>
          )}

          {formStep === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="licenseType">License Type</Label>
                  <Select
                    value={formData.licenseType}
                    onValueChange={(value) => handleSelectChange("licenseType", value)}
                  >
                    <SelectTrigger className="flame-input mt-1">
                      <SelectValue placeholder="Select license type" />
                    </SelectTrigger>
                    <SelectContent>
                      {LICENSE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="licenseNumber">License/ID Number</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="flame-input mt-1"
                    placeholder="KMPDC-12345"
                    required
                  />
                </div>

                <div>
                  <Label>Upload License Document</Label>
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

                <div>
                  <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="flame-input mt-1"
                    placeholder="Any additional information about your practice or credentials"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setFormStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="flame-button">
                  Continue to Face Verification
                </Button>
              </div>
            </form>
          )}

          {formStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                        <video
                          ref={videoRef}
                          className="absolute inset-0 w-full h-full object-cover"
                          muted
                          playsInline
                        />
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

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setFormStep(2)}>
                  Back
                </Button>
                <Button type="submit" className="flame-button" disabled={faceIdState !== "success"}>
                  Continue to Final Step
                </Button>
              </div>
            </form>
          )}

          {formStep === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg">
                  <Checkbox
                    id="africanAncestry"
                    checked={africanAncestry}
                    onCheckedChange={(checked) => setAfricanAncestry(checked as boolean)}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="africanAncestry" className="text-base font-medium">
                      African Ancestry Declaration
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      I confirm that I am of African descent and actively serve my community as a healthcare worker.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <Label className="text-base font-medium">Voice Introduction (Optional)</Label>
                  <p className="text-sm text-gray-400 mt-1 mb-4">
                    Record a brief introduction about yourself and your work. This helps Guardians verify your
                    application.
                  </p>

                  <div className="flex items-center justify-center space-x-4">
                    {!voiceMessage ? (
                      <>
                        <Button
                          type="button"
                          className={`flame-button ${isRecording ? "bg-red-600 hover:bg-red-700" : ""}`}
                          onClick={isRecording ? stopRecording : startRecording}
                        >
                          {isRecording ? `Stop (${formatTime(recordingTime)})` : "Start Recording"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <audio src={URL.createObjectURL(voiceMessage)} controls className="w-full" />
                        <Button type="button" variant="outline" size="sm" onClick={() => setVoiceMessage(null)}>
                          Re-record
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setFormStep(3)}>
                  Back
                </Button>
                <Button type="submit" className="flame-button" disabled={isSubmitting || !africanAncestry}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          )}

          {formStep === 5 && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-green-900 mx-auto flex items-center justify-center">
                <Check className="h-12 w-12 text-green-400" />
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 flame-text">Your Application Has Been Submitted</h3>
                <p className="text-gray-300">
                  Your scroll has entered the Guardian verification chamber. Guardians from your region will review your
                  application.
                </p>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg text-left">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-flame-red text-white text-xs mr-2">
                      1
                    </span>
                    <span>Guardians will review your credentials and verify your identity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-flame-red text-white text-xs mr-2">
                      2
                    </span>
                    <span>You'll receive a notification when your scroll is activated</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-flame-red text-white text-xs mr-2">
                      3
                    </span>
                    <span>Once verified, you'll be eligible to receive support through Flameborn</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Application ID: FLB-CHW-
                  {Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}
                </p>
              </div>

              <Button className="flame-button" onClick={() => (window.location.href = "/")}>
                Return to Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
