"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { UserDatabase, type User } from "@/lib/user-database"
import { Shield, Heart, Edit, LogOut } from "lucide-react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileImpact } from "@/components/profile/profile-impact"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { ProfileAchievements } from "@/components/profile/profile-achievements"
import { LoadingState } from "@/components/loading-state"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current user
    const currentUser = UserDatabase.getCurrentUser()

    if (!currentUser) {
      // Redirect to login if no user is found
      router.push("/login")
      return
    }

    setUser(currentUser)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    // Clear current user
    localStorage.removeItem("flameborn_current_user")

    // Redirect to home
    router.push("/")
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
              <p className="text-gray-400 mb-6">Please log in or register to view your profile.</p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-flame text-white hover:bg-flame/80" onClick={() => router.push("/login")}>
                  Log In
                </Button>
                <Button
                  variant="outline"
                  className="border-guardian text-guardian hover:bg-guardian/10"
                  onClick={() => router.push("/register/guardian")}
                >
                  Register
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dusk py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-heading text-white mb-4 md:mb-0">My Profile</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => router.push("/profile/edit")}
            >
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
            <Button
              variant="outline"
              className="border-red-700 text-red-400 hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" /> Log Out
            </Button>
          </div>
        </div>

        <ProfileHeader user={user} />

        <Tabs defaultValue="impact" className="mt-8">
          <TabsList className="bg-gray-800 border border-gray-700">
            <TabsTrigger value="impact" className="text-white data-[state=active]:bg-gray-700">
              Impact
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-white data-[state=active]:bg-gray-700">
              Activity
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-white data-[state=active]:bg-gray-700">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="details" className="text-white data-[state=active]:bg-gray-700">
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="impact">
            <ProfileImpact user={user} />
          </TabsContent>

          <TabsContent value="activity">
            <ProfileActivity user={user} />
          </TabsContent>

          <TabsContent value="achievements">
            <ProfileAchievements user={user} />
          </TabsContent>

          <TabsContent value="details">
            <Card className="bg-dusk border border-gray-700">
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Full Name</h3>
                      <p className="text-white">{user.fullName}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Email</h3>
                      <p className="text-white">{user.email}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Member Since</h3>
                      <p className="text-white">{new Date(user.registeredAt).toLocaleDateString()}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Role</h3>
                      <p className="text-white flex items-center">
                        {user.type === "guardian" ? (
                          <>
                            <Shield className="h-4 w-4 mr-2 text-guardian" /> Guardian
                          </>
                        ) : (
                          <>
                            <Heart className="h-4 w-4 mr-2 text-flame" /> Healer
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {user.type === "guardian" && (
                      <>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Country</h3>
                          <p className="text-white">{user.country}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Contribution</h3>
                          <p className="text-white">
                            {user.contributionAmount} {user.currency.toUpperCase()}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Payment Method</h3>
                          <p className="text-white capitalize">{user.paymentMethod}</p>
                        </div>
                      </>
                    )}

                    {user.type === "healer" && (
                      <>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Healthcare Role</h3>
                          <p className="text-white capitalize">{user.role}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Location</h3>
                          <p className="text-white">
                            {user.city}, {user.country}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-400">Verification Status</h3>
                          <p
                            className={`capitalize ${
                              user.verificationStatus === "verified"
                                ? "text-green-400"
                                : user.verificationStatus === "rejected"
                                  ? "text-red-400"
                                  : "text-yellow-400"
                            }`}
                          >
                            {user.verificationStatus}
                          </p>
                        </div>

                        {user.walletAddress && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-400">Wallet Address</h3>
                            <p className="text-white text-sm truncate">{user.walletAddress}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
