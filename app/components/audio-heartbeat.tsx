"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function AudioHeartbeat() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioSupported, setAudioSupported] = useState(true)

  // Initialize audio context
  useEffect(() => {
    try {
      // Check if AudioContext is supported
      if (typeof window !== "undefined" && window.AudioContext) {
        audioContextRef.current = new AudioContext()
        setAudioSupported(true)
      } else {
        console.warn("Web Audio API is not supported in this browser")
        setAudioSupported(false)
      }
    } catch (error) {
      console.error("Error initializing audio context:", error)
      setAudioSupported(false)
    }

    // Cleanup
    return () => {
      stopHeartbeat()
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(console.error)
      }
    }
  }, [])

  const startHeartbeat = () => {
    if (!audioContextRef.current || !audioSupported) return

    try {
      // Create oscillator for the heartbeat sound
      oscillatorRef.current = audioContextRef.current.createOscillator()
      oscillatorRef.current.type = "sine"
      oscillatorRef.current.frequency.value = 2 // Very low frequency for heartbeat rhythm

      // Create gain node for volume control
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.gain.value = 0.3

      // Connect nodes
      oscillatorRef.current.connect(gainNodeRef.current)
      gainNodeRef.current.connect(audioContextRef.current.destination)

      // Start oscillator
      oscillatorRef.current.start()

      // Create heartbeat effect with gain automation
      const now = audioContextRef.current.currentTime
      const heartbeatInterval = 1.2 // seconds between heartbeats

      // Schedule heartbeats
      for (let i = 0; i < 100; i++) {
        // Schedule many heartbeats ahead
        const beatTime = now + i * heartbeatInterval

        // First beat
        gainNodeRef.current.gain.setValueAtTime(0.01, beatTime)
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.3, beatTime + 0.1)
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.01, beatTime + 0.3)

        // Second beat (slightly softer)
        gainNodeRef.current.gain.setValueAtTime(0.01, beatTime + 0.4)
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.2, beatTime + 0.5)
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.01, beatTime + 0.7)
      }

      setIsPlaying(true)
    } catch (error) {
      console.error("Error starting heartbeat:", error)
      setAudioSupported(false)
    }
  }

  const stopHeartbeat = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
        oscillatorRef.current = null
      }

      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect()
        gainNodeRef.current = null
      }

      setIsPlaying(false)
    } catch (error) {
      console.error("Error stopping heartbeat:", error)
    }
  }

  const toggleAudio = () => {
    if (!audioSupported) return

    if (isPlaying) {
      stopHeartbeat()
    } else {
      // Resume audio context if it's suspended (needed for browsers that require user interaction)
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch(console.error)
      }
      startHeartbeat()
    }
  }

  // Don't render the button if audio is not supported
  if (!audioSupported) return null

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-4 left-4 z-50 bg-dusk/80 hover:bg-dusk p-2 rounded-full backdrop-blur-sm"
      aria-label={isPlaying ? "Mute heartbeat" : "Play heartbeat"}
    >
      {isPlaying ? <Volume2 className="h-5 w-5 text-flame" /> : <VolumeX className="h-5 w-5 text-gray-400" />}
    </button>
  )
}
