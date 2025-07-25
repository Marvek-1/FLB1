"use client"

import { useState } from "react"
import { Card } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { MessageCircle, Heart, Share2, MoreHorizontal, MapPin } from "lucide-react"
import { Button } from "@/app/components/ui/button"

// Mock data for sanctuary posts
const INITIAL_POSTS: any[] = []

export function SanctuaryFeed() {
  const [posts, setPosts] = useState(INITIAL_POSTS)

  const handleLike = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading text-white">Guardian Wisdom</h2>
        <select className="bg-ash-gray/30 border border-gray-700 rounded-md px-3 py-2 text-sm text-white">
          <option>Most Recent</option>
          <option>Most Popular</option>
          <option>My Region</option>
        </select>
      </div>

      {/* Create post card */}
      <Card className="bg-ash-gray/30 border border-gray-700 p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <img src="/anonymous-profile.png" alt="Your avatar" />
          </Avatar>
          <div className="flex-1">
            <textarea
              className="w-full bg-ash-gray/50 border border-gray-700 rounded-md p-3 text-white placeholder-gray-400 min-h-[100px]"
              placeholder="Share your wisdom with fellow Guardians..."
            />
            <div className="flex justify-between mt-3">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <MapPin className="h-4 w-4 mr-1" /> Add Location
                </Button>
              </div>
              <Button className="bg-flame hover:bg-pulse text-white">Share</Button>
            </div>
          </div>
        </div>
      </Card>

      {posts.length === 0 && (
        <div className="text-center py-12 bg-dusk rounded-lg">
          <div className="mx-auto w-16 h-16 rounded-full bg-ember flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-heading mb-2 text-guardian">No Guardian Posts Yet</h3>
          <p className="text-gray-400">Be the first to share wisdom with fellow Guardians.</p>
        </div>
      )}

      {/* Posts feed */}
      {posts.map((post) => (
        <Card key={post.id} className="bg-ash-gray/30 border border-gray-700 p-4 overflow-hidden">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <img src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-white">{post.author.name}</h3>
                  <div className="flex items-center text-xs text-gray-400">
                    <span className="text-flame">{post.author.role}</span>
                    <span className="mx-1">•</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-3">
                <p className="text-gray-200">{post.content}</p>

                {post.image && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-auto object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                  <div className="flex gap-6">
                    <button
                      className="flex items-center text-gray-400 hover:text-flame transition-colors"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className="h-4 w-4 mr-1" /> {post.likes}
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-neon transition-colors">
                      <MessageCircle className="h-4 w-4 mr-1" /> {post.comments}
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-guardian transition-colors">
                      <Share2 className="h-4 w-4 mr-1" /> {post.shares}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {post.author.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="border-flame text-flame hover:bg-flame/10">
          Load More Wisdom
        </Button>
      </div>
    </div>
  )
}
