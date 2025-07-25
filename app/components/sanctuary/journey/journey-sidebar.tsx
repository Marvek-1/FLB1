import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Search, Tag, TrendingUp, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"

// Mock data for popular tags
const POPULAR_TAGS = [
  { id: 1, name: "Rural Healthcare", count: 24 },
  { id: 2, name: "Traditional Wisdom", count: 18 },
  { id: 3, name: "Blockchain", count: 15 },
  { id: 4, name: "Community Support", count: 12 },
  { id: 5, name: "Digital Health", count: 10 },
  { id: 6, name: "Midwifery", count: 9 },
  { id: 7, name: "Guardian Stories", count: 8 },
  { id: 8, name: "African Medicine", count: 7 },
]

// Mock data for trending stories
const TRENDING_STORIES = [
  { id: 1, title: "How One CHW Transformed Maternal Care in Rural Kenya", views: 1245 },
  { id: 2, title: "The Ancient Healing Rituals Finding New Life in Modern Care", views: 982 },
  { id: 3, title: "From Isolation to Connection: The Digital Revolution in Rural Healthcare", views: 876 },
  { id: 4, title: "Guardian Voices: The Elders Preserving Medical Traditions", views: 754 },
]

export function JourneySidebar() {
  return (
    <div className="space-y-6">
      {/* Search Card */}
      <Card className="bg-ash-gray/30 border border-gray-700">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search stories..."
              className="w-full bg-ash-gray/50 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-white placeholder-gray-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags Card */}
      <Card className="bg-ash-gray/30 border border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-heading flex items-center">
            <Tag className="h-5 w-5 mr-2 text-pulse" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => (
              <Badge key={tag.id} className="bg-ash-gray/50 hover:bg-ash-gray text-white cursor-pointer">
                {tag.name} <span className="ml-1 text-gray-400">({tag.count})</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Stories Card */}
      <Card className="bg-ash-gray/30 border border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-heading flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-flame" />
            Trending Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {TRENDING_STORIES.map((story) => (
              <div key={story.id} className="group">
                <Link href="#" className="text-gray-300 group-hover:text-flame transition-colors">
                  {story.title}
                </Link>
                <div className="text-xs text-gray-500 mt-1">{story.views.toLocaleString()} views</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Archives Card */}
      <Card className="bg-ash-gray/30 border border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-heading flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-neon" />
            Archives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link href="#" className="block text-gray-300 hover:text-neon transition-colors">
              May 2023 <span className="text-gray-500">(12)</span>
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-neon transition-colors">
              April 2023 <span className="text-gray-500">(15)</span>
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-neon transition-colors">
              March 2023 <span className="text-gray-500">(9)</span>
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-neon transition-colors">
              February 2023 <span className="text-gray-500">(7)</span>
            </Link>
            <Link href="#" className="block text-gray-300 hover:text-neon transition-colors">
              January 2023 <span className="text-gray-500">(10)</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Resources Card */}
      <Card className="bg-gradient-to-br from-pulse/20 to-flame/20 border border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-heading flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-white" />
            Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">Access guides, research, and tools to support your healthcare journey.</p>
          <Link
            href="#"
            className="block w-full bg-pulse hover:bg-flame text-center text-white py-2 rounded-md transition-colors"
          >
            Explore Resources
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
