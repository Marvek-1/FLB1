import type { User } from "@/app/lib/user-database"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Award } from "lucide-react"

interface ProfileAchievementsProps {
  user: User
}

export function ProfileAchievements({ user }: ProfileAchievementsProps) {
  const achievements = user.achievements || []

  return (
    <Card className="bg-dusk border border-gray-700">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Award className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No achievements yet</p>
              <p className="text-sm mt-2">
                {user.type === "guardian"
                  ? "As you support healthcare workers, you'll earn achievements"
                  : "As you serve your community, you'll earn achievements"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="bg-gray-800/50 border border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-yellow-500/20">
                      <Award className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{achievement.title}</h3>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Awarded on {new Date(achievement.awardedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
