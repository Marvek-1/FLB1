"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

export function VisualHeartbeat() {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className="fixed bottom-4 left-4 z-50 bg-dusk/80 hover:bg-dusk p-2 rounded-full backdrop-blur-sm"
      aria-label={isActive ? "Stop heartbeat" : "Start heartbeat"}
    >
      <Heart
        className={`h-5 w-5 ${isActive ? "text-flame animate-[heartbeat_1.2s_ease-in-out_infinite]" : "text-gray-400"}`}
      />
    </button>
  )
}
