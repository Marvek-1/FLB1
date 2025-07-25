import { Card } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { CalendarDays, Clock, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

// Replace this:
// const BLOG_POSTS = [
//   {
//     id: 1,
//     title: "The Sacred Flame: Ancient Wisdom in Modern Healthcare",
//     excerpt:
//       "Exploring how traditional African healing practices are being integrated with modern medicine to create holistic care systems that honor cultural heritage while embracing innovation.",
//     image: "/BridgingWorldsOfHealing.png",
//     category: "Tradition",
//     author: {
//       name: "Dr. Kofi Mensah",
//       avatar: "/confident-african-doctor.png",
//     },
//     date: "May 15, 2023",
//     readTime: "8 min read",
//   },
//   {
//     id: 2,
//     title: "Guardians of the Scroll: Stories from the Verification Process",
//     excerpt:
//       "Meet the dedicated Guardians who verify healthcare workers and learn about the profound connections being formed through the blockchain verification process.",
//     image: "/connected-care-africa.png",
//     category: "Community",
//     author: {
//       name: "Amina Diallo",
//       avatar: "/focused-african-journalist.png",
//     },
//     date: "April 28, 2023",
//     readTime: "6 min read",
//   },
//   {
//     id: 3,
//     title: "From Recognition to Resources: The Economic Impact of Flameborn",
//     excerpt:
//       "How blockchain verification is creating economic opportunities for rural healthcare workers and transforming local economies through direct support mechanisms.",
//     image: "/placeholder.svg?height=300&width=600&query=African%20rural%20healthcare%20economy",
//     category: "Impact",
//     author: {
//       name: "Tendai Moyo",
//       avatar: "/placeholder.svg?height=40&width=40&query=African%20economist",
//     },
//     date: "April 10, 2023",
//     readTime: "10 min read",
//   },
//   {
//     id: 4,
//     title: "The Digital Hearth: Building Virtual Communities of Care",
//     excerpt:
//       "How technology is enabling healthcare workers across Africa to connect, share knowledge, and support each other despite vast geographical distances.",
//     image: "/placeholder.svg?height=300&width=600&query=African%20healthcare%20digital%20community",
//     category: "Technology",
//     author: {
//       name: "Zainab Osei",
//       avatar: "/placeholder.svg?height=40&width=40&query=African%20female%20tech%20specialist",
//     },
//     date: "March 22, 2023",
//     readTime: "7 min read",
//   },
// ]

// With:
const BLOG_POSTS: any[] = []

// Helper function to get badge color based on category
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "tradition":
      return "bg-flame/20 text-flame hover:bg-flame/30"
    case "community":
      return "bg-guardian/20 text-guardian hover:bg-guardian/30"
    case "impact":
      return "bg-pulse/20 text-pulse hover:bg-pulse/30"
    case "technology":
      return "bg-neon/20 text-neon hover:bg-neon/30"
    default:
      return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
  }
}

export function JourneyPosts() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading text-white">Latest Stories</h2>
        <select className="bg-ash-gray/30 border border-gray-700 rounded-md px-3 py-2 text-sm text-white">
          <option>All Categories</option>
          <option>Tradition</option>
          <option>Community</option>
          <option>Impact</option>
          <option>Technology</option>
        </select>
      </div>

      {BLOG_POSTS.length === 0 ? (
        <div className="text-center py-12 bg-ash-gray/30 border border-gray-700 rounded-lg">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-500 opacity-50" />
          <h3 className="text-xl font-heading mb-2 text-white">No Stories Yet</h3>
          <p className="text-gray-400 mb-6">Be the first to share your Flameborn journey.</p>
          <Button className="bg-pulse hover:bg-flame text-white">Submit Your Story</Button>
        </div>
      ) : (
        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <Card key={post.id} className="bg-ash-gray/30 border border-gray-700 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    style={{ minHeight: "200px" }}
                  />
                </div>

                <div className="p-6 md:w-2/3">
                  <Badge className={`mb-3 ${getCategoryColor(post.category)}`}>{post.category}</Badge>

                  <h3 className="text-xl font-heading text-white mb-3 hover:text-flame transition-colors">
                    <Link href="#">{post.title}</Link>
                  </h3>

                  <p className="text-gray-300 mb-4">{post.excerpt}</p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <img src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      </Avatar>
                      <span className="text-sm text-gray-400">{post.author.name}</span>
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      <span className="mr-3">{post.date}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link
                    href="#"
                    className="inline-flex items-center text-flame hover:text-pulse transition-colors mt-4 text-sm font-medium"
                  >
                    Continue reading <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <button className="bg-transparent border border-pulse text-pulse hover:bg-pulse/10 px-6 py-3 rounded-md font-medium transition-all">
          Load More Stories
        </button>
      </div>
    </div>
  )
}
