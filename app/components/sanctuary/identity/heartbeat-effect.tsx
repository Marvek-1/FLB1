"use client"

import { useEffect, useState } from "react"
import { AudioHeartbeat } from "./audio-heartbeat"
import { VisualHeartbeat } from "./visual-heartbeat"

export function HeartbeatEffect() {
  const [audioSupported, setAudioSupported] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if Web Audio API is supported
    const isAudioSupported =
      typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)
    setAudioSupported(!!isAudioSupported)
  }, [])

  // During SSR or before we check, don't render anything
  if (audioSupported === null) return null

  // Render the appropriate component based on browser support
  return audioSupported ? <AudioHeartbeat /> : <VisualHeartbeat />
}
