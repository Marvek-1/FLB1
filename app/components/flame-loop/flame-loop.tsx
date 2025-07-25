"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Zap, Heart, Users, Award } from "lucide-react"

const FlameLoop = () => {
  const [feedItems, setFeedItems] = useState<any[]>([])
  const [userProgress, setUserProgress] = useState({
    level: 4,
    title: "Community Builder",
    xp: 720,
    nextLevel: 1000,
  })

  // Simulated real-time feed
  useEffect(() => {
    const mockFeed = [
      {
        id: 1,
        user: "Fatima_K",
        action: "completed HealthID course",
        flb: 50,
        location: "🇳🇬",
        time: "2 min ago",
      },
      {
        id: 2,
        user: "Kwame_T",
        action: "donated to Lagos Health Clinic",
        flb: 100,
        location: "🇬🇭",
        time: "5 min ago",
      },
      {
        id: 3,
        user: "Lerato_M",
        action: "started Solar Tech certification",
        flb: 0,
        location: "🇿🇦",
        time: "8 min ago",
      },
      {
        id: 4,
        user: "You",
        action: "earned 30 FLB from DAO vote",
        flb: 30,
        location: "📍 Your Location",
        time: "Just now",
      },
      {
        id: 5,
        user: "Chinwe_O",
        action: "formed new Tribe: Digital Farmers",
        flb: 0,
        location: "🇳🇬",
        time: "15 min ago",
      },
    ]
    setFeedItems(mockFeed)
  }, [])

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
      {/* XP Progress Header */}
      <div className="flex items-center justify-between mb-6 p-4 bg-white/5 rounded-lg">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
            <Award className="text-white text-xl" />
          </div>
          <div>
            <div className="text-sm text-blue-400">Level {userProgress.level}</div>
            <div className="font-bold text-blue-400 text-lg">{userProgress.title}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-blue-400">
            {userProgress.xp}/{userProgress.nextLevel} XP
          </div>
          <div className="w-32 h-3 bg-gray-800 rounded-full mt-2">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${(userProgress.xp / userProgress.nextLevel) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Infinite Achievement Feed */}
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {feedItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`p-4 rounded-xl bg-white/5 ${
              item.user === "You"
                ? "border border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/10"
                : "border border-gray-700"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start">
              <div className="text-2xl mr-4">{item.location}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className={`font-semibold ${item.user === "You" ? "text-blue-400" : "text-gray-200"}`}>
                    {item.user}
                  </span>
                  {item.flb > 0 && (
                    <span className="flex items-center bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full text-xs font-bold text-white">
                      <span className="mr-1">+{item.flb} FLB</span>
                      <Zap className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-2">{item.action}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-3">{item.time}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-4 gap-3 mt-6">
        <motion.button
          className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="text-blue-400 text-xl mb-1" />
          <span className="text-xs text-gray-300">Earn Now</span>
        </motion.button>
        <motion.button
          className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="text-red-400 text-xl mb-1" />
          <span className="text-xs text-gray-300">Impact</span>
        </motion.button>
        <motion.button
          className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="text-green-400 text-xl mb-1" />
          <span className="text-xs text-gray-300">Tribe</span>
        </motion.button>
        <motion.button
          className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Award className="text-blue-400 text-xl mb-1" />
          <span className="text-xs text-gray-300">Quests</span>
        </motion.button>
      </div>
    </div>
  )
}

export default FlameLoop
