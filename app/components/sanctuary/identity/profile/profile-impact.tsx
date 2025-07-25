import type { User } from "@/app/lib/user-database"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Heart, Users, MapPin, DollarSign, Activity } from "lucide-react"

interface ProfileImpactProps {
  user: User
}

export function ProfileImpact({ user }: ProfileImpactProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user.type === "guardian" ? (
          <>
            <Card className="bg-dusk border border-guardian/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Donated</p>
                    <h3 className="text-2xl font-bold text-guardian">${user.impact.totalDonated}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-guardian/10">
                    <DollarSign className="h-6 w-6 text-guardian" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dusk border border-guardian/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Donations Made</p>
                    <h3 className="text-2xl font-bold text-guardian">{user.impact.donationsCount}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-guardian/10">
                    <Activity className="h-6 w-6 text-guardian" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dusk border border-guardian/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Healers Supported</p>
                    <h3 className="text-2xl font-bold text-guardian">{user.impact.healthWorkersSupported}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-guardian/10">
                    <Heart className="h-6 w-6 text-guardian" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="bg-dusk border border-flame/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Patients Served</p>
                    <h3 className="text-2xl font-bold text-flame">{user.impact.patientsServed}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-flame/10">
                    <Users className="h-6 w-6 text-flame" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dusk border border-flame/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Communities Reached</p>
                    <h3 className="text-2xl font-bold text-flame">{user.impact.communitiesReached}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-flame/10">
                    <MapPin className="h-6 w-6 text-flame" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dusk border border-flame/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Donations Received</p>
                    <h3 className="text-2xl font-bold text-flame">${user.impact.donationsReceived}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-flame/10">
                    <DollarSign className="h-6 w-6 text-flame" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card className="bg-dusk border border-gray-700">
        <CardHeader>
          <CardTitle>Impact Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Impact visualization will be displayed here</p>
              <p className="text-sm mt-2">As you make or receive contributions, your impact will be visualized here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
