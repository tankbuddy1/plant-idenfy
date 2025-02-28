import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react"

export default function CareersPage() {
  const positions = [
    {
      title: "Plant Care Specialist",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "We're looking for an experienced plant care specialist to join our team and help maintain our vast collection of plants while providing expert advice to customers.",
      requirements: [
        "3+ years of experience in plant care",
        "Deep knowledge of indoor and outdoor plants",
        "Excellent customer service skills",
        "Ability to work weekends when needed"
      ]
    },
    {
      title: "E-commerce Manager",
      location: "Remote",
      type: "Full-time",
      description: "Join us in managing and growing our online presence. You'll be responsible for our e-commerce operations and digital marketing strategies.",
      requirements: [
        "5+ years of e-commerce experience",
        "Strong analytical and problem-solving skills",
        "Experience with digital marketing",
        "Knowledge of SEO and content marketing"
      ]
    },
    {
      title: "Customer Support Representative",
      location: "Hybrid",
      type: "Full-time",
      description: "Help our customers have the best experience possible by providing exceptional support through email, chat, and phone.",
      requirements: [
        "2+ years of customer service experience",
        "Excellent communication skills",
        "Basic knowledge of plants is a plus",
        "Problem-solving mindset"
      ]
    }
  ]

  const benefits = [
    {
      icon: "🌱",
      title: "Plant Allowance",
      description: "Monthly allowance for plants and gardening supplies"
    },
    {
      icon: "🏥",
      title: "Health Benefits",
      description: "Comprehensive health, dental, and vision coverage"
    },
    {
      icon: "💰",
      title: "401(k) Match",
      description: "Generous 401(k) matching program"
    },
    {
      icon: "🎓",
      title: "Learning Budget",
      description: "Annual budget for professional development"
    }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Help us make the world a greener place, one plant at a time. We're always looking for passionate individuals to join our growing team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
          <p className="text-muted-foreground mb-6">
            At Onlen Nursery, we're more than just a plant shop. We're a community of passionate individuals dedicated to spreading the joy of plants and sustainable living.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="text-3xl mb-2">{benefit.icon}</div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074"
            alt="Team working together"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
      <div className="space-y-6">
        {positions.map((position, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>{position.title}</CardTitle>
                </div>
                <Button>
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {position.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {position.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{position.description}</p>
              <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {position.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}