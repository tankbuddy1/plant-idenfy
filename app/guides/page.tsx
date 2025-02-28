"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Droplets, Sun, Thermometer, Wind } from "lucide-react"

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const guides = [
    {
      title: "Watering Basics",
      category: "Essential Care",
      icon: <Droplets className="h-6 w-6" />,
      description: "Learn the fundamentals of proper plant watering techniques",
      tips: [
        "Check soil moisture before watering",
        "Water deeply but less frequently",
        "Consider plant type and season",
        "Use well-draining soil"
      ]
    },
    {
      title: "Light Requirements",
      category: "Essential Care",
      icon: <Sun className="h-6 w-6" />,
      description: "Understanding different light conditions for optimal plant growth",
      tips: [
        "Identify your light exposure",
        "Rotate plants regularly",
        "Protect from direct sunlight",
        "Use artificial lights when needed"
      ]
    },
    {
      title: "Temperature Control",
      category: "Environment",
      icon: <Thermometer className="h-6 w-6" />,
      description: "Managing temperature for healthy plant growth",
      tips: [
        "Monitor room temperature",
        "Avoid cold drafts",
        "Maintain consistent temperature",
        "Consider seasonal changes"
      ]
    },
    {
      title: "Humidity Management",
      category: "Environment",
      icon: <Wind className="h-6 w-6" />,
      description: "Tips for maintaining proper humidity levels",
      tips: [
        "Use humidity trays",
        "Group plants together",
        "Mist regularly",
        "Consider using a humidifier"
      ]
    }
  ]

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Plant Care Guides</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about taking care of your plants, from basic care to advanced techniques.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search guides..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredGuides.map((guide, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">{guide.icon}</div>
                <Badge variant="secondary">{guide.category}</Badge>
              </div>
              <CardTitle className="text-xl">{guide.title}</CardTitle>
              <p className="text-muted-foreground">{guide.description}</p>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">Key Tips:</h3>
              <ul className="space-y-2">
                {guide.tips.map((tip, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <span className="mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No guides found matching your search.</p>
        </div>
      )}
    </div>
  )
}