"use client"

import { useEffect, useRef } from "react"
import { useMobile } from "@/app/hooks/use-mobile"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
  alphaSpeed: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)
  const isMobile = useMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Initialize particles - reduce particle count to improve performance
    function initParticles() {
      // Even fewer particles on mobile
      const particleCount = isMobile
        ? Math.min(Math.floor(window.innerWidth / 40), 25)
        : Math.min(Math.floor(window.innerWidth / 20), 50)

      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (isMobile ? 1.5 : 2) + 1,
          speedX: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3), // Even slower on mobile
          speedY: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3), // Even slower on mobile
          color: getParticleColor(),
          alpha: Math.random() * 0.5 + 0.3,
          alphaSpeed: Math.random() * 0.01 + 0.005,
        })
      }
    }

    function getParticleColor() {
      // Enhanced flame theme colors with new vibrant palette
      const colors = ["#FF4E00", "#ff00c8", "#00f3ff", "#00FFA0", "#FF7F41"]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation loop - enhanced for spiritual vibe
    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(10, 10, 10, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Update alpha for pulsing effect
        particle.alpha += particle.alphaSpeed
        if (particle.alpha > 0.8 || particle.alpha < 0.3) {
          particle.alphaSpeed *= -1
        }

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw particle with glow effect
        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ background: "#0A0A0A" }}
    />
  )
}

export default ParticleBackground
