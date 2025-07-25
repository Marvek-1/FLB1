"use client"

import { useState } from "react"
import Link from "next/link" // Keep this import
import { usePathname } from "next/navigation"
import { useWallet } from "@/app/components/smart-contracts/wallet-provider"
import { Flame, Menu, X, Bell, User, Settings, LogOut, Badge, Wallet } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"
import { useIsMobile } from "@/app/hooks/use-mobile"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

const AppHeader = () => { // Keep this line
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { connected, address, connectWallet, disconnect } = useWallet()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Testnet", href: "/testnet" },
    { name: "Analytics", href: "/analytics" },
    { name: "Community", href: "/community-pulse" },
    { name: "Journey", href: "/flameborn-journey" },
    { name: "Guardians", href: "/guardians-sanctuary" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <span className="hidden font-bold sm:inline-block">FlameBorn</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-orange-600 border-b-2 border-orange-600 pb-1"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                3
              </Badge>
            </Button>

            {/* Wallet Connection */}
            <Button
              onClick={connected ? disconnect : connectWallet}
              variant={connected ? "outline" : "default"}
              size="sm"
              className={connected ? "border-green-500 text-green-700" : "bg-orange-500 hover:bg-orange-600"}
            >
              <Wallet className="h-4 w-4 mr-2" />
              {connected ? "Connected" : "Connect"}
            </Button>

            {/* User Menu */}
            {connected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Ubuntu Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={disconnect}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div> {/* This closes the md:flex div */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0"> {/* This is the mobile menu content */}
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <Flame className="h-6 w-6 text-orange-500" />
              <span className="font-bold">FlameBorn</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground/60 transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent> {/* Closes SheetContent */}
        </Sheet> {/* Closes Sheet */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end"> {/* This is the right side of the header for desktop */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Flame className="h-6 w-6 text-orange-500" />
              <span className="font-bold">FlameBorn</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2"> {/* This nav is for the desktop wallet connect button */}
            <Button variant="outline" size="sm">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </nav>
        </div>
      </div>
    </header> // Closes header
  )
}

export default AppHeader
