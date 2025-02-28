import { PlantIdentifier } from "@/components/plant-identifier"
import { HeroSection } from "@/components/blocks/hero-section-dark"
import { Waves } from "@/components/ui/waves-background"

export default function Home() {
  return (
    <main>
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Waves
            lineColor="rgba(0, 0, 0, 0.1)"
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        <div className="relative z-10">
          <HeroSection
            title="Online Plant Nursery"
            subtitle={{
              regular: "Your trusted source for ",
              gradient: "quality plants and expert care",
            }}
            description="Discover a wide variety of healthy plants, get expert care advice, and transform your space into a green paradise. We deliver happiness, one plant at a time."
            ctaText="Explore Plants"
            ctaHref="#plant-identifier"
          />
        </div>
      </div>
      <div id="plant-identifier" className="py-20">
        <PlantIdentifier />
      </div>
    </main>
  )
}