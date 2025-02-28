import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "support@onlennursery.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: "123 Garden Street",
      description: "Green Valley, CA 94123"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: "Mon-Sat: 8am - 6pm",
      description: "Sunday: 10am - 4pm"
    }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about plant care? Need help with an order? We're here to help!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">First Name</label>
                <Input placeholder="John" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input type="email" placeholder="john@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Input placeholder="How can we help?" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Message</label>
              <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[150px]" />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="grid gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">{info.icon}</div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0679336772384!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1635786994800!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}