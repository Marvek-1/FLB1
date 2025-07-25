import { Activity } from "lucide-react"
import { PageIntro } from "@/app/components/pages/page-intro"
import { Button } from "@/app/components/ui/button"

export function PulseHero() {
  return (
    <PageIntro
      title="Feel the Heartbeat of Flameborn"
      subtitle="Pulse of the Community"
      icon={<Activity className="h-6 w-6 text-neon" />}
      color="neon"
    >
      <p className="mb-6">
        Experience the living ecosystem of care in real-time. Watch as the flame spreads across Africa, connecting
        healers and communities in a sacred bond of support and transformation.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-neon hover:bg-flame px-6 py-3 rounded-md text-black font-medium transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]">
          Explore Impact Data
        </Button>
        <Button className="bg-transparent border border-neon hover:bg-neon/10 px-6 py-3 rounded-md text-neon font-medium transition-all">
          Join the Movement
        </Button>
      </div>
    </PageIntro>
  )
}
