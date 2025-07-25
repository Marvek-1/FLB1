"use client"

import { useState } from "react"
import { Bell, X, Check, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"

// Mock notifications for demonstration
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "success",
    title: "Donation Successful",
    message: "Your donation of $50 to Dr. Amara Okafor has been processed successfully.",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "New Guardian Verified",
    message: "A new Guardian has been verified in your region. Connect to expand your network.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Verification Pending",
    message: "Your Guardian application is still pending. We'll notify you once it's reviewed.",
    time: "1 day ago",
    read: true,
  },
]

export function NotificationSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />
      default:
        return <Info className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-gray-400" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-flame text-white">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 md:w-96 bg-ash-gray/90 backdrop-blur-sm border border-gray-700 shadow-xl z-50">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-medium text-white">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-gray-400 hover:text-white"
              >
                Mark all as read
              </Button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-800/50 ${notification.read ? "opacity-70" : ""}`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">{getIconForType(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-white">{notification.title}</p>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-500 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-flame hover:text-flame-red"
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
