"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap, Heart, Pickaxe, Target } from "lucide-react"

const ImpactMining = () => {
  const [selectedCause, setSelectedCause] = useState("health")

  const causes = [
    { id: "health", title: "Health Clinics", icon: "🩺" },
    { id: "education", title: "Digital Schools", icon: "💻" },
    { id: "agriculture", title: "Farm Support", icon: "🌱" },
    { id: "orphanage", title: "Orphan Care", icon: "🧒" },
  ]

  const miningActivities = [
    { id: 1, title: "Complete Digital Literacy Course", personal: 50, impact: 10 },
    { id: 2, title: "Participate in DAO Vote", personal: 10, impact: 5 },
    { id: 3, title: "Achieve Quiz Mastery", personal: 20, impact: 3 },
    { id: 4, title: "7-Day Learning Streak", personal: 30, impact: 10 },
  ]

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Pickaxe className="w-6 h-6 text-orange-400 mr-3" />
        <h2 className="text-xl font-bold text-orange-400">Impact Mining</h2>
      </div>

      <div className="text-center mb-6">
        <div className="text-lg font-bold text-gray-200 mb-2">Your Actions Build Africa</div>
        <p className="text-sm text-orange-300">Every achievement generates FLB for you AND for African causes</p>
      </div>

      {/* Cause Selection */}
      <div className="flex items-center mb-4">
        <Target className="w-5 h-5 text-orange-400 mr-2" />
        <h3 className="font-bold text-gray-200">Your Impact Focus</h3>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {causes.map((cause) => (
          <motion.button
            key={cause.id}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
              selectedCause === cause.id
                ? "bg-gradient-to-r from-blue-500 to-purple-500 border border-blue-500"
                : "bg-white/5 border border-gray-700 hover:border-orange-500/50"
            }`}
            onClick={() => setSelectedCause(cause.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">{cause.icon}</div>
            <div
              className={`text-xs text-center ${selectedCause === cause.id ? "text-white font-bold" : "text-gray-400"}`}
            >
              {cause.title}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Mining Activities */}
      <h3 className="font-bold text-gray-200 mb-4">Action Opportunities</h3>
      <div className="space-y-3">
        {miningActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="bg-white/5 p-4 rounded-lg border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="font-medium text-gray-200 mb-3">{activity.title}</div>
            <div className="flex justify-between mb-3">
              <div className="text-sm flex items-center">
                <Zap className="w-4 h-4 text-blue-400 mr-1" />
                <span className="text-blue-400 font-bold">+{activity.personal} FLB</span>
                <span className="text-gray-400 ml-1">for you</span>
              </div>
              <div className="text-sm flex items-center">
                <Heart className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 font-bold">+{activity.impact} FLB</span>
                <span className="text-gray-400 ml-1">for {causes.find((c) => c.id === selectedCause)?.title}</span>
              </div>
            </div>
            <motion.button
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-sm font-bold text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Mining
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ImpactMining
