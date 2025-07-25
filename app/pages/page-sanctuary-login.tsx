"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserDatabase, type User } from "@/lib/user-database"
import { Shield, Heart } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get all users
    const allUsers = UserDatabase.getAllUsers()
    setUsers(allUsers)
    setLoading(false)

    // Check if user is already logged in
    const currentUser = UserDatabase.getCurrentUser()
    if (currentUser) {
      router.push("/profile")
    }
  }, [router])

  const handleLogin = (userId: string) => {
    // Set current user
    localStorage.setItem("flameborn_current_user", userId)

    // Redirect to profile
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-dusk flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-flame mb-2">FLAMEBORN</h1>
          <p className="text-gray-400">Log in to your account</p>
        </div>

        <Card className="bg-dusk border border-gray-700">
          <CardHeader>
            <CardTitle>Select Your Account</CardTitle>
            <CardDescription>Choose an account to log in or register a new one</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-gray-400">Loading accounts...</p>
            ) : users.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-4">No accounts found</p>
                <p className="text-sm text-gray-500 mb-6">Register as a Guardian or Healer to get started</p>

                <div className="grid grid-cols-2 gap-4">
                  <Link href="/register/guardian">
                    <Button className="w-full bg-guardian text-black hover:bg-guardian/80">
                      <Shield className="h-4 w-4 mr-2" /> Guardian
                    </Button>
                  </Link>
                  <Link href="/register/healer">
                    <Button className="w-full bg-flame text-white hover:bg-flame/80">
                      <Heart className="h-4 w-4 mr-2" /> Healer
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 rounded-lg border ${
                      user.type === "guardian"
                        ? "border-guardian/30 hover:border-guardian"
                        : "border-flame/30 hover:border-flame"
                    } cursor-pointer transition-all`}
                    onClick={() => handleLogin(user.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${user.type === "guardian" ? "bg-guardian/20" : "bg-flame/20"}`}
                      >
                        {user.type === "guardian" ? (
                          <Shield className="h-5 w-5 text-guardian" />
                        ) : (
                          <Heart className="h-5 w-5 text-flame" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{user.fullName}</h3>
                        <p className="text-sm text-gray-400">
                          {user.type === "guardian" ? "Guardian" : "Healer"} • {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/register/guardian" className="text-flame hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
