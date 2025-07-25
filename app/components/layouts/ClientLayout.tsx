"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "../../../globals.css"
import Link from "next/link"
import { Shield, UserPlus, Home, Menu, X, BookOpen, Activity, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Heart className="h-6 w-6 text-primary" />
            <span>HealthDAO</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className={`text-sm font-medium ${pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <Home className="h-5 w-5 mr-1 inline" />
              Dashboard
            </Link>
            <Link href="/learn" className={`text-sm font-medium ${pathname === '/learn' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <BookOpen className="h-5 w-5 mr-1 inline" />
              Learn
            </Link>
            <Link href="/activity" className={`text-sm font-medium ${pathname === '/activity' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <Activity className="h-5 w-5 mr-1 inline" />
              Activity
            </Link>
            <Link href="/sanctuary" className={`text-sm font-medium ${pathname === '/sanctuary' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              <Shield className="h-5 w-5 mr-1 inline" />
              Sanctuary
            </Link>
          </nav>
          
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>
      
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b bg-background"
        >
          <nav className="container py-4 flex flex-col gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/learn" className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-5 w-5" />
              Learn
            </Link>
            <Link href="/activity" className="flex items-center gap-2 text-sm font-medium">
              <Activity className="h-5 w-5" />
              Activity
            </Link>
            <Link href="/sanctuary" className="flex items-center gap-2 text-sm font-medium">
              <Shield className="h-5 w-5" />
              Sanctuary
            </Link>
          </nav>
        </motion.div>
      )}
      
      <main className="container py-6">
        {children}
      </main>
    </div>
  )
}
