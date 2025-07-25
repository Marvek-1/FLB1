"use client"

import type { ReactNode } from "react"

interface ShellProps {
  children: ReactNode
}

export function Shell({ children }: ShellProps) {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
}
