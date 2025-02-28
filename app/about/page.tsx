import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Heart, Globe, Users } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Quality First",
      description: "We source and nurture only the healthiest, highest-quality plants for our customers."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Customer Care",
      description: "Our dedicated team provides expert advice and support throughout your plant journey."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Sustainability",
      description: "We're committed to environmentally responsible practices in all our operations."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Community",
      description: "Building a thriving community of plant enthusiasts and sharing knowledge."
    }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Onlen Nursery</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Founded in 2012, Onlen Nursery has grown from a small local plant shop to a trusted online destination for plant enthusiasts worldwide.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            What started as a passion project has blossomed into a comprehensive online plant nursery. Our journey began with a simple mission: to make quality plants accessible to everyone while providing expert guidance for plant care.
          </p>
          <p className="text-muted-foreground">
            Today, we serve thousands of customers globally, offering a carefully curated selection of plants and comprehensive care resources to ensure your green companions thrive.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070"
            alt="Nursery garden"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {values.map((value, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="mb-2">{value.icon}</div>
              <CardTitle>{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Mission</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          To inspire and enable everyone to create their own green sanctuary, promoting well-being and environmental consciousness through the joy of plant care.
        </p>
      </div>
    </div>
  )
}