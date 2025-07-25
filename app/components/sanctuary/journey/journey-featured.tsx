import { Card } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function JourneyFeatured() {
  return (
    <div className="relative">
      <h2 className="text-2xl font-heading text-white mb-6">Featured Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-ash-gray/40 to-ash-gray/20 border-0 overflow-hidden group relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img
            src="/placeholder.svg?height=400&width=600&query=African%20nurse%20with%20patient%20sunset"
            alt="Featured story"
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
          />

          <div className="relative z-20 p-6 h-full flex flex-col justify-end min-h-[350px]">
            <Badge className="bg-flame text-white self-start mb-3">Featured</Badge>
            <h3 className="text-xl font-heading text-white mb-2 group-hover:text-flame transition-colors">
              The Midnight Miracle: How One Nurse Changed a Village
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-2">
              When cholera struck at midnight, Nurse Amina had only her knowledge and a kerosene lamp. By dawn, she had
              saved 12 lives and changed her community forever.
            </p>
            <Link
              href="#"
              className="text-flame flex items-center text-sm font-medium hover:text-pulse transition-colors"
            >
              Read the full story <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-ash-gray/40 to-ash-gray/20 border-0 overflow-hidden group relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img
            src="/placeholder.svg?height=400&width=600&query=African%20community%20health%20worker%20with%20digital%20device"
            alt="Featured story"
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
          />

          <div className="relative z-20 p-6 h-full flex flex-col justify-end min-h-[350px]">
            <Badge className="bg-neon text-black self-start mb-3">Technology</Badge>
            <h3 className="text-xl font-heading text-white mb-2 group-hover:text-neon transition-colors">
              From Scrolls to Blockchain: A Digital Revolution in Rural Care
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-2">
              How blockchain verification is bringing recognition and resources to invisible healthcare heroes in the
              most remote regions of Tanzania.
            </p>
            <Link
              href="#"
              className="text-neon flex items-center text-sm font-medium hover:text-pulse transition-colors"
            >
              Read the full story <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-ash-gray/40 to-ash-gray/20 border-0 overflow-hidden group relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img
            src="/placeholder.svg?height=400&width=600&query=African%20village%20celebration%20healthcare%20workers"
            alt="Featured story"
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
          />

          <div className="relative z-20 p-6 h-full flex flex-col justify-end min-h-[350px]">
            <Badge className="bg-guardian text-black self-start mb-3">Community</Badge>
            <h3 className="text-xl font-heading text-white mb-2 group-hover:text-guardian transition-colors">
              The Village That Refused to Let Their Healer Go Unrecognized
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-2">
              After 30 years of service without recognition, see how one community used Flameborn to ensure their
              beloved midwife received her due honor and support.
            </p>
            <Link
              href="#"
              className="text-guardian flex items-center text-sm font-medium hover:text-pulse transition-colors"
            >
              Read the full story <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
