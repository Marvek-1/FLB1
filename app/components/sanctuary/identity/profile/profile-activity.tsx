import type { User } from "@/app/lib/user-database"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Activity } from "lucide-react"

interface ProfileActivityProps {
  user: User
}

export function ProfileActivity({ user }: ProfileActivityProps) {
  return (
    <Card className="bg-dusk border border-gray-700">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No activity yet</p>
            <p className="text-sm mt-2">
              {user.type === "guardian"
                ? "Your donations and verification activities will appear here"
                : "Your received donations and updates will appear here"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
