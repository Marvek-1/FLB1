import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Become a Guardian - Safe Haven",
  description: "Join Safe Haven as a Guardian and help protect children online.",
}

const BecomeGuardianPage = () => {
  return (
    <div className="container mx-auto py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Become a Guardian</h1>
        <p className="text-lg text-gray-600">
          Join our community of dedicated individuals committed to creating a safer online environment for children.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="/guardian-hero.png"
            alt="Guardian Hero"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why Become a Guardian?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Make a real difference in the lives of children.</li>
            <li>Help protect them from online threats and harmful content.</li>
            <li>Join a supportive community of like-minded individuals.</li>
            <li>Gain valuable skills and knowledge in online safety.</li>
          </ul>
        </div>
      </section>

      <section className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8">Sign up today and begin your journey as a Safe Haven Guardian.</p>
        <Link href="/register/guardian">
          <Button className="bg-guardian hover:bg-flame text-black px-8 py-4 text-lg rounded-md transition-all hover:shadow-[0_0_20px_rgba(0,255,160,0.3)]">
            Become a Guardian Today
          </Button>
        </Link>
      </section>
    </div>
  )
}

export default BecomeGuardianPage
