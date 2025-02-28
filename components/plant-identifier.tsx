"use client"

import React, { useState, useRef, useEffect } from "react"
import { Upload, Camera, X, Loader2, Leaf, Info, Sun, Droplets, Thermometer, Home } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { storeApiKey, getApiKey, removeApiKey } from "@/lib/api-key"
import { identifyPlantWithGemini, GeminiApiError } from "@/lib/gemini-api"

interface PlantInfo {
  name: string
  scientificName: string
  confidence: number
  overview: string
  features: string[]
  care: {
    light: string
    water: string
    humidity: string
    temperature: string
  }
  potSizes: string[]
  idealFor: string[]
}

const PlantIdentifier = () => {
  const [apiKey, setApiKey] = useState("")
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const savedApiKey = getApiKey()
    if (!savedApiKey) {
      setIsApiKeyModalOpen(true)
    }
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [mediaStream])

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      try {
        storeApiKey(apiKey.trim())
        setIsApiKeyModalOpen(false)
        setApiKey("")
      } catch (error) {
        setError("Failed to securely store API key")
      }
    }
  }

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setMediaStream(stream)
        setIsCameraActive(true)
      }
    } catch (err) {
      setError("Unable to access camera. Please ensure you've granted camera permissions.")
    }
  }

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
      setMediaStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraActive(false)
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" })
            setSelectedImage(file)
            setImagePreview(canvas.toDataURL("image/jpeg"))
            stopCamera()
          }
        }, "image/jpeg", 0.9)
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setSelectedImage(file)
        setError("")
      }
      reader.readAsDataURL(file)
    }
  }

  const identifyPlant = async () => {
    if (!selectedImage) {
      setError("Please select an image first")
      return
    }

    setLoading(true)
    setError("")

    try {
      const reader = new FileReader()
      reader.readAsDataURL(selectedImage)
      reader.onloadend = async () => {
        const base64Image = reader.result as string
        const base64Data = base64Image.split(',')[1]

        const savedApiKey = getApiKey()
        if (!savedApiKey) {
          setError("API key not found. Please enter your API key.")
          setIsApiKeyModalOpen(true)
          setLoading(false)
          return
        }

        try {
          const result = await identifyPlantWithGemini(savedApiKey, base64Data)
          setPlantInfo(result)
        } catch (error) {
          if (error instanceof GeminiApiError) {
            if (error.status === 401 || error.status === 403) {
              removeApiKey()
              setIsApiKeyModalOpen(true)
              setError("Invalid API key. Please enter a valid key.")
            } else {
              setError(`API Error: ${error.message}`)
            }
          } else {
            setError("Failed to identify plant. Please try again.")
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image")
    } finally {
      setLoading(false)
    }
  }

  const resetIdentification = () => {
    setSelectedImage(null)
    setImagePreview("")
    setPlantInfo(null)
    setError("")
  }

  const howToCards = [
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Take or Upload a Photo",
      description: "Capture a clear photo of your plant or upload an existing one. Ensure good lighting and focus on the leaves."
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Get Instant Identification",
      description: "Our AI will analyze the image and provide detailed information about your plant species."
    },
    {
      icon: <Info className="h-8 w-8 text-primary" />,
      title: "Learn & Care",
      description: "Receive comprehensive care instructions and tips to help your plant thrive."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Dialog open={isApiKeyModalOpen} onOpenChange={setIsApiKeyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Gemini API Key</DialogTitle>
            <DialogDescription>
              Please enter your Gemini API key to use the plant identification feature
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Save API Key
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Plant Identifier</h1>
          <p className="text-muted-foreground">
            Identify and learn about any plant instantly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howToCards.map((card, index) => (
            <Card key={index} className="bg-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">{card.icon}</div>
                <CardTitle className="text-lg">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!selectedImage && !isCameraActive ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <div className="relative border-2 border-dashed rounded-lg p-8 text-center bg-background hover:border-green-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="h-12 w-12 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold text-green-600">Upload an image</span>
                  <span className="text-sm text-muted-foreground mt-2">
                    Max file size: 5MB
                  </span>
                </label>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <div className="relative border-2 border-dashed rounded-lg p-8 text-center bg-background hover:border-purple-500 transition-colors">
                <button
                  onClick={startCamera}
                  className="w-full h-full flex flex-col items-center"
                >
                  <Camera className="h-12 w-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold text-purple-600">Take a photo</span>
                  <span className="text-sm text-muted-foreground mt-2">
                    Using your camera
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isCameraActive ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-4">
                  <Button onClick={capturePhoto} variant="secondary">
                    <Camera className="mr-2 h-4 w-4" />
                    Capture
                  </Button>
                  <Button onClick={stopCamera} variant="secondary">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Selected plant"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={resetIdentification}
                  className="absolute top-2 right-2 p-1 bg-background rounded-full shadow-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {!plantInfo && !isCameraActive && (
              <Button
                onClick={identifyPlant}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Identifying Plant...
                  </>
                ) : (
                  <>
                    <Leaf className="mr-2 h-4 w-4" />
                    Identify Plant
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {plantInfo && (
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">{plantInfo.name}</h2>
                  <p className="text-muted-foreground italic">
                    {plantInfo.scientificName}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm">
                  {plantInfo.confidence}% Match
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Key Features</TabsTrigger>
                  <TabsTrigger value="care">Care Instructions</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <p>{plantInfo.overview}</p>
                </TabsContent>

                <TabsContent value="features">
                  <ul className="space-y-2">
                    {plantInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">✅</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="care">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Sun className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Light</p>
                        <p className="text-sm text-muted-foreground">
                          {plantInfo.care.light}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Droplets className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Water</p>
                        <p className="text-sm text-muted-foreground">
                          {plantInfo.care.water}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Thermometer className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Temperature</p>
                        <p className="text-sm text-muted-foreground">
                          {plantInfo.care.temperature}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Droplets className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Humidity</p>
                        <p className="text-sm text-muted-foreground">
                          {plantInfo.care.humidity}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">🪴 Pot Size Options</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {plantInfo.potSizes.map((size, index) => (
                        <li key={index}>{size}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">🏡 Ideal For</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {plantInfo.idealFor.map((location, index) => (
                        <li key={index} className="flex items-center">
                          <Home className="h-4 w-4 mr-2" />
                          {location}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { PlantIdentifier }