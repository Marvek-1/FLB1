"use client"

import { motion } from "framer-motion"
import { TrendingUp, Heart, Calendar } from "lucide-react"

const JourneyDashboard = () => {
  const stats = {
    flbEarned: 1250,
    flbDonated: 320,
    livesImpacted: 42,
    learningHours: 28,
    coursesCompleted: 7,
    streak: 14,
  }

  const achievements = [
    { id: 1, title: "Digital Pioneer", icon: "💻", earned: true },
    { id: 2, title: "Health Guardian", icon: "🩺", earned: true },
    { id: 3, title: "Eco Warrior", icon: "🌱", earned: false },
    { id: 4, title: "Flame Leader", icon: "🔥", earned: false },
  ]

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-6 text-blue-400">My Sovereign Journey</h2>

      {/* Wallet & Impact Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div className="bg-white/5 p-4 rounded-lg border border-blue-500/20" whileHover={{ scale: 1.02 }}>
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400 mr-2" />
            <div className="text-xs text-blue-300">FLB Earned</div>
          </div>
          <div className="text-2xl font-bold text-blue-400">{stats.flbEarned}</div>
        </motion.div>
        <motion.div className="bg-white/5 p-4 rounded-lg border border-green-400/20" whileHover={{ scale: 1.02 }}>
          <div className="flex items-center mb-2">
            <Heart className="w-4 h-4 text-green-400 mr-2" />
            <div className="text-xs text-green-300">FLB Donated</div>
          </div>
          <div className="text-2xl font-bold text-green-400">{stats.flbDonated}</div>
        </motion.div>
        <motion.div className="bg-white/5 p-4 rounded-lg border border-gray-400/20" whileHover={{ scale: 1.02 }}>
          <div className="flex items-center mb-2">
            <Heart className="w-4 h-4 text-gray-400 mr-2" />
            <div className="text-xs text-gray-300">Lives Impacted</div>
          </div>
          <div className="text-2xl font-bold text-gray-200">{stats.livesImpacted}</div>
        </motion.div>
        <motion.div className="bg-white/5 p-4 rounded-lg border border-orange-400/20" whileHover={{ scale: 1.02 }}>
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 text-orange-400 mr-2" />
            <div className="text-xs text-orange-300">Learning Streak</div>
          </div>
          <div className="text-2xl font-bold text-orange-400">{stats.streak} days</div>
        </motion.div>
      </div>

      {/* Achievements */}
      <h3 className="font-bold text-gray-200 mb-4">My Achievements</h3>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className={`p-3 rounded-lg flex flex-col items-center ${
              achievement.earned
                ? "bg-gradient-to-r from-blue-500 to-purple-500 border border-blue-500"
                : "bg-white/5 border border-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">{achievement.icon}</div>
            <div className={`text-xs text-center ${achievement.earned ? "text-white font-bold" : "text-gray-500"}`}>
              {achievement.title}
            </div>
            {!achievement.earned && <div className="text-[8px] text-gray-500 mt-1">Locked</div>}
          </motion.div>
        ))}
      </div>

      {/* Impact Timeline */}
      <h3 className="font-bold text-gray-200 mb-4">My Impact Timeline</h3>
      <div className="space-y-4">
        {[
          {
            date: "Today",
            action: "Earned 50 FLB from Health Course",
            impact: "Funded health supplies for 2 people",
          },
          {
            date: "Yesterday",
            action: "Completed Digital Literacy Certification",
            impact: "Increased earning potential by 40%",
          },
          {
            date: "1 week ago",
            action: "Donated 100 FLB to Kano Orphanage",
            impact: "Provided meals for 5 children",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="flex flex-col items-center mr-4">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent"></div>
            </div>
            <div className="pb-4 flex-1">
              <div className="text-xs text-blue-400">{item.date}</div>
              <div className="font-medium text-gray-200">{item.action}</div>
              <div className="text-xs text-green-400">{item.impact}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default JourneyDashboard
