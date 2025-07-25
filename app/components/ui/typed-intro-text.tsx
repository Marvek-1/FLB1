"use client"

import { useState, useEffect } from "react"

interface TypedIntroTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypedIntroText({ text, speed = 50, className = "" }: TypedIntroTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text, speed])

  return (
    <div className={`${className} ${isComplete ? "after:content-['|'] after:animate-pulse" : ""}`}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </div>
  )
}
