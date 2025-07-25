import { Shield } from "lucide-react"
import { PageIntro } from "@/app/components/page-intro"
import { Button } from "@/app/components/ui/button"

export function SanctuaryHero() {
  return (
    <PageIntro
      title="Where Guardians Unite"
      subtitle="Guardian's Sanctuary"
      icon={<Shield className="h-6 w-6 text-guardian" />}
      color="guardian"
    >
      <p className="mb-6">
        Welcome to the Guardian's Sanctuary, a sacred space reserved exclusively for our most valued supporters. Here,
        verified Guardians connect, share wisdom, and strengthen the flame of care across Africa.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-flame hover:bg-pulse px-6 py-3 rounded-md text-white font-medium transition-all hover:shadow-[0_0_15px_rgba(255,78,0,0.5)]">
          Share Your Story
        </Button>
        <Button className="bg-transparent border border-guardian hover:bg-guardian/10 px-6 py-3 rounded-md text-guardian font-medium transition-all">
          Connect with Guardians
        </Button>
      </div>
    </PageIntro>
  )
}
