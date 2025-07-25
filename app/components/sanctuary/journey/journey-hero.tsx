import { BookOpen } from "lucide-react"
import { PageIntro } from "@/app/components/page-intro"
import { Button } from "@/app/components/ui/button"

export function JourneyHero() {
  return (
    <PageIntro
      title="Stories of Hope and Transformation"
      subtitle="Flameborn's Journey"
      icon={<BookOpen className="h-6 w-6 text-pulse" />}
      color="pulse"
    >
      <p className="mb-6">
        Step into the Chronicles of Courage - powerful stories from the frontlines of African healthcare. These
        narratives illuminate the path forward and inspire our collective mission to end health injustice.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-pulse hover:bg-flame px-6 py-3 rounded-md text-white font-medium transition-all hover:shadow-[0_0_15px_rgba(255,0,200,0.5)]">
          Read Latest Stories
        </Button>
        <Button className="bg-transparent border border-pulse hover:bg-pulse/10 px-6 py-3 rounded-md text-pulse font-medium transition-all">
          Submit Your Story
        </Button>
      </div>
    </PageIntro>
  )
}
