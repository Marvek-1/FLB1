import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AppHeader from "@/app/components/core/app-header"
import { Toaster } from "@/app/components/ui/toaster"
import { WalletProvider } from "@/app/components/smart-contracts/wallet-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FlameBorn - Ubuntu Healthcare Tokenization",
  description:
    "Bridging traditional African Ubuntu philosophy with modern healthcare tokenization. I am because we are.",
  keywords: ["Ubuntu", "healthcare", "tokenization", "blockchain", "Celo", "Africa", "community"],
  authors: [{ name: "FlameBorn Team" }],
  openGraph: {
    title: "FlameBorn - Ubuntu Healthcare Tokenization",
    description: "I am because we are. Ubuntu-powered healthcare tokenization for a connected world.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlameBorn - Ubuntu Healthcare Tokenization",
    description: "I am because we are. Ubuntu-powered healthcare tokenization for a connected world.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#f97316",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased african-sunset`}>
        <WalletProvider>
          <div className="african-sunset min-h-screen">
            <div className="backdrop-blur-sm bg-black/30 min-h-screen">
              <AppHeader />
              <main>{children}</main>
            </div>
          </div>
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  )
}
