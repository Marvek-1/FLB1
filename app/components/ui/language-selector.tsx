"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
]

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0])

  const changeLanguage = (language: (typeof LANGUAGES)[0]) => {
    setCurrentLanguage(language)
    // In a real app, this would update the app's locale/translations
    console.log(`Language changed to ${language.name}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-400 hover:text-white">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{currentLanguage.name}</span>
          <span className="md:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-ash-gray/90 backdrop-blur-sm border border-gray-700">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLanguage.code === language.code ? "bg-flame/10 text-flame" : "text-gray-300"
            }`}
            onClick={() => changeLanguage(language)}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
