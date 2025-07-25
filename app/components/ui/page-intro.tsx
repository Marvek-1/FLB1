"use client"

import type React from "react"

import { motion } from "framer-motion"

interface PageIntroProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  children?: React.ReactNode
}

export function PageIntro({ title, subtitle, icon, color, children }: PageIntroProps) {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background glow effect */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-${color}/20 rounded-full blur-[100px] opacity-60`}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center justify-center p-2 bg-${color}/10 rounded-full mb-6`}
        >
          {icon}
          <span className={`text-sm font-medium text-${color} ml-2`}>{subtitle}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6"
        >
          {title.split(" ").map((word, i) => (
            <span key={i}>{i % 2 === 1 ? <span className={`text-${color}`}>{word} </span> : <span>{word} </span>}</span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
