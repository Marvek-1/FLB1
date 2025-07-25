// Safe clipboard utilities with fallback mechanisms
export class ClipboardManager {
  private static async checkClipboardPermission(): Promise<boolean> {
    if (typeof window === "undefined" || !navigator.clipboard) {
      return false
    }

    try {
      const permission = await navigator.permissions.query({ name: "clipboard-write" as PermissionName })
      return permission.state === "granted" || permission.state === "prompt"
    } catch {
      return false
    }
  }

  private static fallbackCopy(text: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        const successful = document.execCommand("copy")
        document.body.removeChild(textArea)
        resolve(successful)
      } catch (error) {
        console.error("Fallback copy failed:", error)
        resolve(false)
      }
    })
  }

  static async copyToClipboard(text: string): Promise<{ success: boolean; method: string }> {
    // Only attempt clipboard operations after user gesture
    if (typeof window === "undefined") {
      return { success: false, method: "server-side" }
    }

    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return { success: true, method: "clipboard-api" }
      } catch (error) {
        console.warn("Clipboard API failed, trying fallback:", error)
      }
    }

    // Fallback to execCommand
    const fallbackSuccess = await this.fallbackCopy(text)
    return {
      success: fallbackSuccess,
      method: fallbackSuccess ? "execCommand" : "failed",
    }
  }

  static async readFromClipboard(): Promise<string | null> {
    if (typeof window === "undefined" || !navigator.clipboard) {
      return null
    }

    try {
      const text = await navigator.clipboard.readText()
      return text
    } catch (error) {
      console.warn("Clipboard read failed:", error)
      return null
    }
  }
}
