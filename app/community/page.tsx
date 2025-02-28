"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, ThumbsUp } from "lucide-react"

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787",
        username: "@sarahj"
      },
      content: "Just repotted my Monstera and it's thriving! Here's a tip: Always use well-draining soil and ensure the new pot has drainage holes.",
      image: "https://images.unsplash.com/photo-1614594075929-b23f4798a05e?q=80&w=2072",
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787",
        username: "@mikechen"
      },
      content: "My indoor jungle is coming along nicely! Started with one plant last year, and now I have 15! Anyone else caught the plant bug? 🌿",
      image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=2070",
      likes: 45,
      comments: 12,
      shares: 5,
      timestamp: "5 hours ago"
    }
  ])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Plant Community</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow plant enthusiasts, share your experiences, and learn from others.
        </p>
      </div>

      {/* Create Post */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea placeholder="Share your plant journey..." />
            <div className="flex justify-between items-center">
              <Button variant="outline">Add Photo</Button>
              <Button>Post</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.author.username} • {post.timestamp}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post image"
                  className="rounded-lg w-full mb-4"
                />
              )}
              <div className="flex items-center space-x-6">
                <Button variant="ghost" className="space-x-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" className="space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </Button>
                <Button variant="ghost" className="space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>{post.shares}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}