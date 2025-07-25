"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { UserDatabase, type User, type Guardian, type Healer } from "@/lib/user-database"
import { LoadingState } from "@/components/loading-state"
import { ArrowLeft, Save } from "lucide-react"

export default function ProfileEditPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>({})

  useEffect(() => {
    // Get current user
    const currentUser = UserDatabase.getCurrentUser()

    if (!currentUser) {
      // Redirect to login if no user is found
      router.push("/login")
      return
    }

    setUser(currentUser)
    setFormData(currentUser)
    setLoading(false)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)

    try {
      // Update user
      const updatedUser = UserDatabase.updateUser(user.id, formData)

      if (updatedUser) {
        setUser(updatedUser)

        // Redirect back to profile
        router.push("/profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return <LoadingState message="Loading your profile..." />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dusk flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-medium mb-4">No User Found</h2>
              <p className="text-gray-400 mb-6">Please log in or register to edit your profile.</p>
              <Button className="bg-flame text-white hover:bg-flame/80" onClick={() => router.push("/login")}>
                Log In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dusk py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" className="mr-4" onClick={() => router.push("/profile")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-heading text-white">Edit Profile</h1>
        </div>

        <Card className="bg-dusk border border-gray-700">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="bg-gray-800/50 border-gray-700"
              />
            </div>

            {user.type === "guardian" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={(formData as Guardian).country || ""}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Why I became a Guardian</Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={(formData as Guardian).motivation || ""}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 min-h-[100px]"
                  />
                </div>
              </>
            )}

            {user.type === "healer" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town</Label>
                    <Input
                      id="city"
                      name="city"
                      value={(formData as Healer).city || ""}
                      onChange={handleChange}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={(formData as Healer).country || ""}
                      onChange={handleChange}
                      className="bg-gray-800/50 border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facilityName">Facility Name</Label>
                  <Input
                    id="facilityName"
                    name="facilityName"
                    value={(formData as Healer).facilityName || ""}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={(formData as Healer).bio || ""}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 min-h-[100px]"
                    placeholder="Tell us about your work, your community, and the challenges you face..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    name="walletAddress"
                    value={(formData as Healer).walletAddress || ""}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700"
                    placeholder="0x..."
                  />
                  <p className="text-xs text-gray-400">Where you'll receive support funds</p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              className={`${user.type === "guardian" ? "bg-guardian text-black" : "bg-flame text-white"}`}
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
