import SmartContractInfo from "@/components/smart-contract-info"

export default function SmartContractsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Smart Contract <span className="text-orange-500">Architecture</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the decentralized infrastructure powering Africa's health sovereignty revolution
          </p>
        </div>
        <SmartContractInfo />
      </div>
    </div>
  )
}
