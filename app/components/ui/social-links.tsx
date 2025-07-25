import { Twitter, Facebook, MessageSquare } from "lucide-react"
import Link from "next/link"

interface SocialLinksProps {
  className?: string
  iconSize?: number
  showLabels?: boolean
  variant?: "default" | "footer" | "header"
}

export function SocialLinks({
  className = "",
  iconSize = 20,
  showLabels = false,
  variant = "default",
}: SocialLinksProps) {
  const socialLinks = [
    {
      name: "X (Twitter)",
      handle: "@flameBorn DAO",
      url: "https://twitter.com/flameBornDAO",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Facebook",
      handle: "FlameBorn Dao",
      url: "https://facebook.com/FlameBornDao",
      icon: Facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "Discord",
      handle: "@flameBornDAO",
      url: "https://discord.gg/flameBornDAO",
      icon: MessageSquare,
      color: "hover:text-indigo-500",
    },
  ]

  // Different styling based on variant
  const getContainerClasses = () => {
    switch (variant) {
      case "footer":
        return "flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      case "header":
        return "flex items-center gap-4"
      default:
        return "flex items-center gap-4"
    }
  }

  const getLinkClasses = () => {
    switch (variant) {
      case "footer":
        return "flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      case "header":
        return "flex items-center gap-2 text-gray-400 hover:text-flame transition-colors"
      default:
        return "flex items-center gap-2 text-gray-400 hover:text-flame transition-colors"
    }
  }

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${getLinkClasses()} ${social.color}`}
          aria-label={`Follow Flameborn on ${social.name}`}
        >
          <social.icon size={iconSize} />
          {showLabels && <span>{social.handle}</span>}
        </Link>
      ))}
    </div>
  )
}
