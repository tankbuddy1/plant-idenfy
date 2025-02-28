"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Droplets, Sun, Thermometer } from "lucide-react"

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const plants = [
    {
      name: "Snake Plant",
      scientificName: "Sansevieria trifasciata",
      category: "Indoor",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?q=80&w=2070",
      care: {
        water: "Low",
        light: "Low to Bright",
        temperature: "60-85°F"
      }
    },
    {
      name: "Monstera",
      scientificName: "Monstera deliciosa",
      category: "Indoor",
      difficulty: "Moderate",
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=2074",
      care: {
        water: "Moderate",
        light: "Bright Indirect",
        temperature: "65-85°F"
      }
    },
    {
      name: "Peace Lily",
      scientificName: "Spathiphyllum",
      category: "Indoor",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?q=80&w=2070",
      care: {
        water: "Moderate",
        light: "Low to Bright",
        temperature: "65-80°F"
      }
    },
    {
      name: "Fiddle Leaf Fig",
      scientificName: "Ficus lyrata",
      category: "Indoor",
      difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?q=80&w=2070",
      care: {
        water: "Moderate",
        light: "Bright Indirect",
        temperature: "60-75°F"
      }
    }
  ]

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || plant.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || plant.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Plant Library</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive collection of plants and learn about their characteristics and care requirements.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Indoor">Indoor</SelectItem>
            <SelectItem value="Outdoor">Outdoor</SelectItem>
            <SelectItem value="Succulent">Succulent</SelectItem>
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Moderate">Moderate</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredPlants.map((plant, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl">{plant.name}</CardTitle>
                <Badge
                  variant={
                    plant.difficulty === "Easy"
                      ? "success"
                      : plant.difficulty === "Moderate"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {plant.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <Droplets className="h-5 w-5 mb-1 text-blue-500" />
                  <span className="text-sm text-muted-foreground">{plant.care.water}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Sun className="h-5 w-5 mb-1 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">{plant.care.light}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Thermometer className="h-5 w-5 mb-1 text-red-500" />
                  <span className="text-sm text-muted-foreground">{plant.care.temperature}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No plants found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}