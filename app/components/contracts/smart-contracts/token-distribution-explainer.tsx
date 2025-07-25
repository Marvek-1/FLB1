import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Heart, Coins, ArrowRight, BarChart3 } from "lucide-react"

export function TokenDistributionExplainer() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-heading text-flame mb-8 text-center">How Flameborn Tokens Work</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-ash-gray/30 border border-flame/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-guardian" />
              <span>For Guardians (Supporters)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Guardians contribute resources to the Flameborn ecosystem and receive FLB tokens as proof of their
              support.
            </p>

            <div className="bg-ash-gray/50 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Token Acquisition</h4>
              <ol className="space-y-2 list-decimal list-inside text-gray-300">
                <li>Make a contribution in cryptocurrency or fiat</li>
                <li>Receive FLB tokens proportional to your contribution</li>
                <li>Tokens represent your stake in the ecosystem</li>
              </ol>
            </div>

            <div className="bg-ash-gray/50 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Token Utility</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Governance rights in the Flameborn DAO</li>
                <li>• Verification privileges for healthcare workers</li>
                <li>• Access to exclusive Guardian features</li>
                <li>• Proof of impact for your contributions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ash-gray/30 border border-flame/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-flame" />
              <span>For Healers (Healthcare Workers)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Healers are verified healthcare workers who receive support through the Flameborn ecosystem.
            </p>

            <div className="bg-ash-gray/50 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Registration Process</h4>
              <ol className="space-y-2 list-decimal list-inside text-gray-300">
                <li>Register with your credentials and location</li>
                <li>Get verified by Guardians through the DAO</li>
                <li>Receive your Healer status on the blockchain</li>
              </ol>
            </div>

            <div className="bg-ash-gray/50 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Benefits</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Direct financial support from Guardians</li>
                <li>• Recognition of your healthcare work</li>
                <li>• Access to resources and community</li>
                <li>• Immutable proof of your service</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-ash-gray/30 border border-flame/20 mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-flame" />
            <span>Token Flow & Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative py-8">
            {/* Flow diagram */}
            <div className="flex flex-col md:flex-row items-center justify-between relative">
              <div className="bg-guardian/20 p-4 rounded-lg text-center mb-8 md:mb-0 md:w-1/4">
                <Shield className="h-8 w-8 text-guardian mx-auto mb-2" />
                <h4 className="font-medium text-white">Guardians</h4>
                <p className="text-sm text-gray-400">Contribute resources</p>
              </div>

              <ArrowRight className="hidden md:block h-8 w-8 text-flame mx-4" />

              <div className="bg-flame/20 p-4 rounded-lg text-center mb-8 md:mb-0 md:w-1/4">
                <Coins className="h-8 w-8 text-flame mx-auto mb-2" />
                <h4 className="font-medium text-white">FLB Tokens</h4>
                <p className="text-sm text-gray-400">Minted & distributed</p>
              </div>

              <ArrowRight className="hidden md:block h-8 w-8 text-flame mx-4" />

              <div className="bg-pulse/20 p-4 rounded-lg text-center md:w-1/4">
                <Heart className="h-8 w-8 text-pulse mx-auto mb-2" />
                <h4 className="font-medium text-white">Healers</h4>
                <p className="text-sm text-gray-400">Receive support</p>
              </div>
            </div>

            {/* Distribution breakdown */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-flame" />
                <span>Token Distribution Breakdown</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-ash-gray/50 p-4 rounded-lg">
                  <h5 className="font-medium text-white mb-2">70%</h5>
                  <p className="text-sm text-gray-300">Direct support for verified healthcare workers</p>
                </div>

                <div className="bg-ash-gray/50 p-4 rounded-lg">
                  <h5 className="font-medium text-white mb-2">20%</h5>
                  <p className="text-sm text-gray-300">Community treasury for emergency response</p>
                </div>

                <div className="bg-ash-gray/50 p-4 rounded-lg">
                  <h5 className="font-medium text-white mb-2">10%</h5>
                  <p className="text-sm text-gray-300">Platform maintenance and development</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Flameborn tokens are not speculative assets. They represent real impact and support for healthcare workers
          across Africa.
        </p>
      </div>
    </div>
  )
}
