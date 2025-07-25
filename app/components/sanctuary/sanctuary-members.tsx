import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Shield, Users, MapPin, Award } from "lucide-react"

// Mock data for guardian members
const GUARDIAN_MEMBERS: any[] = []

export function SanctuaryMembers() {
  return (
    <Card className="bg-ash-gray/30 border border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-heading flex items-center">
            <Shield className="h-5 w-5 mr-2 text-flame" />
            Active Guardians
          </CardTitle>
          <Badge className="bg-flame text-white">24 Online</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {GUARDIAN_MEMBERS.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-400">No active Guardians yet. Join to become the first Guardian.</p>
            <Button className="mt-4 bg-flame hover:bg-pulse text-white">Become a Guardian</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {GUARDIAN_MEMBERS.map((member) => (
              <div
                key={member.id}
                className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                  member.active ? "bg-flame/10 hover:bg-flame/20" : "hover:bg-gray-800"
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-gray-700">
                    <img src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  </Avatar>
                  {member.active && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h3 className="font-medium text-white truncate">{member.name}</h3>
                    {member.verified && <Badge className="ml-2 bg-guardian/20 text-guardian text-xs">Verified</Badge>}
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <span className="text-flame truncate">{member.role}</span>
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-flame">
                  <Users className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-medium text-white mb-3 flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-flame" />
            Guardian Regions
          </h3>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-ash-gray hover:bg-ash-gray/50 text-white">West Africa</Badge>
            <Badge className="bg-ash-gray hover:bg-ash-gray/50 text-white">East Africa</Badge>
            <Badge className="bg-ash-gray hover:bg-ash-gray/50 text-white">Southern Africa</Badge>
            <Badge className="bg-ash-gray hover:bg-ash-gray/50 text-white">Central Africa</Badge>
            <Badge className="bg-ash-gray hover:bg-ash-gray/50 text-white">North Africa</Badge>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-medium text-white mb-3 flex items-center">
            <Award className="h-4 w-4 mr-1 text-flame" />
            Guardian Roles
          </h3>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-flame/20 hover:bg-flame/30 text-flame">Healer</Badge>
            <Badge className="bg-neon/20 hover:bg-neon/30 text-neon">Elder</Badge>
            <Badge className="bg-guardian/20 hover:bg-guardian/30 text-guardian">Midwife</Badge>
            <Badge className="bg-pulse/20 hover:bg-pulse/30 text-pulse">Protector</Badge>
            <Badge className="bg-flame/20 hover:bg-flame/30 text-flame">Teacher</Badge>
          </div>
        </div>

        <Button className="w-full mt-6 bg-flame hover:bg-pulse text-white">Join as Guardian</Button>
      </CardContent>
    </Card>
  )
}
