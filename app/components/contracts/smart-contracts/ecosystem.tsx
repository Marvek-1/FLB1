"use client"
import { motion } from "framer-motion"

const cards = [
  {
    title: "🔥 FLB Token",
    desc: "Soulbound proof-of-impact. Not bought — only earned by healing.",
    icon: "💠", // Using emoji as icon
    bg: "bg-gradient-to-r from-pink-600 to-fuchsia-700",
  },
  {
    title: "🧑🏾‍⚕️ Health Actor Registry",
    desc: "Doctors, clinics, and outreach workers — verified on-chain.",
    icon: "🏥", // Using emoji as icon
    bg: "bg-gradient-to-r from-cyan-700 to-blue-700",
  },
  {
    title: "🗳️ DAO Governance",
    desc: "Every scroll can be a vote. Every voter is a flamekeeper.",
    icon: "🌀", // Using emoji as icon
    bg: "bg-gradient-to-r from-yellow-600 to-amber-500",
  },
  {
    title: "👩🏾‍💻 Flameborn Youth Circle",
    desc: "Unemployed grads earn FLB for tasks, outreach, and AI roles.",
    icon: "🌍", // Using emoji as icon
    bg: "bg-gradient-to-r from-green-700 to-emerald-600",
  },
  {
    title: "📜 Scroll Engine",
    desc: "Inject culture into code. Each scroll activates a loop of justice.",
    icon: "📖", // Using emoji as icon
    bg: "bg-gradient-to-r from-purple-600 to-indigo-700",
  },
]

export default function Ecosystem() {
  return (
    <section className="relative z-10 px-4 pb-20 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-cyan-300 mb-10"
      >
        ⚙️ The Flameborn Ecosystem
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} // Added viewport for whileInView
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-6 shadow-lg ${c.bg} bg-opacity-30 border border-white/10 backdrop-blur-md`}
          >
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="text-xl font-bold text-white">{c.title}</h3>
            <p className="text-sm text-gray-200 mt-2">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
