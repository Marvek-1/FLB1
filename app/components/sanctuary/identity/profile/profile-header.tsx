import type { User, Healer } from "@/app/lib/user-database"
import { Card, CardContent } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Shield, Heart, MapPin, Briefcase, Calendar } from "lucide-react"

interface ProfileHeaderProps {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getVerificationBadge = (user: Healer) => {
    if (user.verificationStatus === "verified") {
      return <Badge className="bg-green-600">Verified</Badge>
    } else if (user.verificationStatus === "rejected") {
      return <Badge className="bg-red-600">Rejected</Badge>
    } else {
      return <Badge className="bg-yellow-600">Pending Verification</Badge>
    }
  }

  return (
    <Card className={`bg-dusk border border-${user.type === "guardian" ? "guardian" : "flame"}/20`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="h-24 w-24 border-2 border-gray-700">
            {user.profileImage ? (
              <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.fullName} />
            ) : (
              <AvatarFallback
                className={`bg-${user.type === "guardian" ? "guardian" : "flame"}/20 text-${user.type === "guardian" ? "guardian" : "flame"}`}
              >
                {getInitials(user.fullName)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h2 className="text-2xl font-heading text-white">{user.fullName}</h2>
              <Badge className={`${user.type === "guardian" ? "bg-guardian text-black" : "bg-flame text-white"}`}>
                {user.type === "guardian" ? (
                  <>
                    <Shield className="h-3 w-3 mr-1" /> Guardian
                  </>
                ) : (
                  <>
                    <Heart className="h-3 w-3 mr-1" /> Healer
                  </>
                )}
              </Badge>
              {user.type === "healer" && getVerificationBadge(user)}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
              {user.type === "guardian" ? (
                <>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{user.country}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span className="capitalize">{user.role}</span>
                    {user.specialization && <span> • {user.specialization}</span>}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {user.city}, {user.country}
                    </span>
                  </div>
                </>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined {new Date(user.registeredAt).toLocaleDateString()}</span>
              </div>
            </div>

            {user.type === "healer" && user.bio && <p className="text-gray-300 mt-2">{user.bio}</p>}

            {user.type === "guardian" && user.motivation && (
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-400 mb-1">Why I became a Guardian:</h3>
                <p className="text-gray-300 italic">"{user.motivation}"</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
