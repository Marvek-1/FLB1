export function Manifesto() {
  return (
    <div className="py-6 md:py-12">
      <h2 className="text-2xl md:text-3xl font-heading text-flame glow mb-4 md:mb-6 text-center">Our Sacred Mission</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-ash-gray/30 p-4 md:p-6 rounded-lg border border-flame/20 hover:border-flame/40 transition-all duration-300">
          <h3 className="text-lg md:text-xl font-heading text-neon mb-3">Recognition</h3>
          <p className="text-sm md:text-base">
            We believe in recognizing the invisible heroes of healthcare. Through blockchain verification, we create
            immutable proof of service for those who work in the shadows.
          </p>
        </div>
        <div className="bg-ash-gray/30 p-4 md:p-6 rounded-lg border border-flame/20 hover:border-flame/40 transition-all duration-300">
          <h3 className="text-lg md:text-xl font-heading text-pulse mb-3">Support</h3>
          <p className="text-sm md:text-base">
            Direct support without intermediaries. Our token system ensures that resources flow directly to those who
            provide care, not to administrative overhead.
          </p>
        </div>
        <div className="bg-ash-gray/30 p-4 md:p-6 rounded-lg border border-flame/20 hover:border-flame/40 transition-all duration-300">
          <h3 className="text-lg md:text-xl font-heading text-guardian mb-3">Community</h3>
          <p className="text-sm md:text-base">
            We are building a global community of care. Guardians verify health workers, creating a trusted network that
            spans continents and transcends borders.
          </p>
        </div>
      </div>
    </div>
  )
}
