"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export function SoundEffects() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const pathname = usePathname()
  const [audioEnabled, setAudioEnabled] = useState(false)

  // Function to create and play audio
  const setupAudio = (src: string) => {
    if (!audioEnabled) return

    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = 0.2 // Set volume to 20%
      audioRef.current.loop = true
    }

    if (audioRef.current.src !== src) {
      audioRef.current.src = src
      audioRef.current.play().catch((e) => console.log("Audio play prevented:", e))
    }
  }

  // Handle user interaction to enable audio
  useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true)
      // Remove event listeners after first interaction
      document.removeEventListener("click", enableAudio)
      document.removeEventListener("touchstart", enableAudio)
    }

    document.addEventListener("click", enableAudio)
    document.addEventListener("touchstart", enableAudio)

    return () => {
      document.removeEventListener("click", enableAudio)
      document.removeEventListener("touchstart", enableAudio)
    }
  }, [])

  // Play different sounds based on the route
  useEffect(() => {
    if (!audioEnabled) return

    if (pathname === "/verify-scroll") {
      setupAudio("/sounds/heartbeat.mp3")
    } else if (pathname === "/register-chw") {
      setupAudio("/sounds/whispers.mp3")
    } else {
      // Stop audio on other routes
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [pathname, audioEnabled])

  return null // This component doesn't render anything
}
