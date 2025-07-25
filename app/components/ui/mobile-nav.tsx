"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Shield, BookOpen, Activity, User, Menu, X, Heart, UserPlus, LogIn } from "lucide-react"
import { motion } from "framer-motion"
import { UserDatabase } from "@/app/lib/user-database"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<{ id: string; type: string } | null>(null)

  // Check for logged in user
  useEffect(() => {
    const user = UserDatabase.getCurrentUser()
    if (user) {
      setCurrentUser({
        id: user.id,
        type: user.type,
      })
    } else {
      setCurrentUser(null)
    }
  }, [pathname])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  // Navigation items with their icons, tooltips, and colors
  const navItems = [
    { path: "/", icon: Home, label: "Home", color: "#ff3a2f" },
    { path: "/healers", icon: Heart, label: "Healers", color: "#ff7f41" },
    { path: "/become-guardian", icon: Shield, label: "Guardians", color: "#00ffa0" },
    { path: "/guardians-sanctuary", icon: Shield, label: "Sanctuary", color: "#ff4e00" },
    { path: "/flameborn-journey", icon: BookOpen, label: "Journey", color: "#ff00c8" },
    { path: "/community-pulse", icon: Activity, label: "Pulse", color: "#00f3ff" },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        className="md:hidden fixed bottom-4 right-4 z-50 bg-flame text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Mobile navigation overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/95 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="text-2xl font-bold text-flame-red" style={{ textShadow: "none" }}>
                FLAMEBORN
              </Link>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <nav className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={
                        isActive(item.path)
                          ? {
                              scale: [1, 1.2, 1],
                              transition: { repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 2 },
                            }
                          : { scale: 1 }
                      }
                      className="mb-2"
                    >
                      <item.icon className="h-8 w-8" style={{ color: isActive(item.path) ? item.color : "#9ca3af" }} />
                    </motion.div>
                    <span className="text-sm" style={{ color: isActive(item.path) ? item.color : "#9ca3af" }}>
                      {item.label}
                    </span>
                  </Link>
                ))}

                {currentUser ? (
                  <Link
                    href="/profile"
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={
                        isActive("/profile")
                          ? {
                              scale: [1, 1.2, 1],
                              transition: { repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 2 },
                            }
                          : { scale: 1 }
                      }
                      className="mb-2"
                    >
                      <User
                        className="h-8 w-8"
                        style={{
                          color: isActive("/profile")
                            ? currentUser.type === "guardian"
                              ? "#00ffa0"
                              : "#ff3a2f"
                            : "#9ca3af",
                        }}
                      />
                    </motion.div>
                    <span
                      className="text-sm"
                      style={{
                        color: isActive("/profile")
                          ? currentUser.type === "guardian"
                            ? "#00ffa0"
                            : "#ff3a2f"
                          : "#9ca3af",
                      }}
                    >
                      Profile
                    </span>
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div className="mb-2">
                        <LogIn className="h-8 w-8 text-gray-400" />
                      </motion.div>
                      <span className="text-sm text-gray-400">Log In</span>
                    </Link>

                    <Link
                      href="/register/guardian"
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-flame/20 hover:bg-flame/30 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{
                          scale: [1, 1.2, 1],
                          transition: { repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 2 },
                        }}
                        className="mb-2"
                      >
                        <UserPlus className="h-8 w-8 text-flame" />
                      </motion.div>
                      <span className="text-sm text-flame">Register</span>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </>
  )
}
