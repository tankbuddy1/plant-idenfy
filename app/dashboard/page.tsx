"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Leaf,
  ShoppingCart,
  Heart,
  Bell,
  Settings,
  Calendar,
  AlertCircle,
} from "lucide-react"

export default function DashboardPage() {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-04-01",
      status: "Delivered",
      items: ["Monstera Deliciosa", "Snake Plant"],
      total: "$89.98"
    },
    {
      id: "ORD-002",
      date: "2024-03-28",
      status: "In Transit",
      items: ["Peace Lily", "Potting Soil"],
      total: "$45.99"
    }
  ]

  const wishlist = [
    {
      name: "Fiddle Leaf Fig",
      price: "$65.99",
      image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?q=80&w=2070"
    },
    {
      name: "Bird of Paradise",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1599685315640-9ceab2f58944?q=80&w=2069"
    }
  ]

  const notifications = [
    {
      title: "Order Delivered",
      message: "Your order #ORD-001 has been delivered",
      time: "2 hours ago"
    },
    {
      title: "Plant Care Reminder",
      message: "Time to water your Monstera!",
      time: "1 day ago"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plants Owned</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">All healthy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 back in stock</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Badge
                  variant={order.status === "Delivered" ? "default" : "secondary"}
                >
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items:</span>
                    <span>{order.items.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">{order.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map((item, index) => (
              <Card key={index}>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                    <Button>Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          {notifications.map((notification, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-lg">{notification.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{notification.time}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{notification.message}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Care Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Water Monstera</p>
                  <p className="text-sm text-muted-foreground">Tomorrow at 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Fertilize Peace Lily</p>
                  <p className="text-sm text-muted-foreground">In 3 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}