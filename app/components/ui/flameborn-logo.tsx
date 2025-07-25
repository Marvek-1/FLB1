"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function FlamebornLogo() {
  return (
    <Link href="/">
      <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <h1
          className="text-2xl font-bold"
          style={{
            background: "linear-gradient(135deg, #ff3a2f 0%, #ff7f41 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
          }}
        >
          FLAMEBORN
        </h1>
        <motion.span
          className="ml-1 h-2 w-2 rounded-full bg-flame-red"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </Link>
  )
}
